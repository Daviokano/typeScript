import { inject, injectable } from 'tsyringe'
import { IAlunosRepository } from 'src/alunos/repositories/IAlunosRepository'
import { Aluno } from 'src/alunos/entities/Aluno'

type CreateAlunosDTO = {
  cpf: string
  name: string
  email: string
  dataNascimento: Date
}

@injectable()
export class CreateAlunosUseCase {
  constructor(
    @inject('AlunosRepository') private alunosRepository: IAlunosRepository,
  ) {}
  async execute({
    cpf,
    name,
    email,
    dataNascimento,
  }: CreateAlunosDTO): Promise<Aluno> {
    const emailExists = await this.alunosRepository.findByEmail(email)
    if (emailExists) {
      throw new Error('This email is already registered')
    }
    const aluno = await this.alunosRepository.create({
      cpf,
      name,
      email,
      dataNascimento,
    })
    return aluno
  }
}
