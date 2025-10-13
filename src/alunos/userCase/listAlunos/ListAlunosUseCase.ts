import {
  AlunosPaginateProperties,
  IAlunosRepository,
} from 'src/alunos/repositories/IAlunosRepository'
import { inject, injectable } from 'tsyringe'

type listAlunosUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListAlunosUseCase {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  async execute({
    limit,
    page,
  }: listAlunosUseCaseParams): Promise<AlunosPaginateProperties> {
    const take = limit
    const skip = Number(page - 1) * take
    return this.alunosRepository.findAll({ page, skip, take })
  }
}
