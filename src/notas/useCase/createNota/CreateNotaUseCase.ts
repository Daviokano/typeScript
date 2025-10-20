import { inject, injectable } from 'tsyringe'
import { INotasRepository } from 'src/notas/repositories/INotasRepository'
import { IAlunosRepository } from 'src/alunos/repositories/IAlunosRepository'
import { IBimestresRepository } from 'src/notas/repositories/IBimestresRepository'
import { Nota } from 'src/notas/entities/Nota'

type CreateNotaDTO = {
  rm: string
  year: number
  term: number
  matematica?: number
  portugues?: number
  historia?: number
}

@injectable()
export class CreateNotaUseCase {
  constructor(
    @inject('NotasRepository') private notasRepository: INotasRepository,
    @inject('AlunosRepository') private alunosRepository: IAlunosRepository,
    @inject('BimestresRepository')
    private bimestresRepository: IBimestresRepository,
  ) {}

  async execute({
    rm,
    year,
    term,
    matematica,
    portugues,
    historia,
  }: CreateNotaDTO): Promise<Nota> {
    const aluno = await this.alunosRepository.findByRm(rm)
    if (!aluno) {
      throw new Error('Aluno não encontrado')
    }

    const bimestre = await this.bimestresRepository.findOrCreate(year, term)

    try {
      const nota = await this.notasRepository.create({
        rm,
        idBimestre: bimestre.id,
        matematica,
        portugues,
        historia,
      })
      return nota
    } catch (error: any) {
      if (
        error.code === '23505' ||
        error.code === 'SQLITE_CONSTRAINT' ||
        error.message?.includes('UNIQUE constraint failed')
      ) {
        throw new Error('Já existe uma nota para este aluno neste bimestre')
      }
      throw error
    }
  }
}
