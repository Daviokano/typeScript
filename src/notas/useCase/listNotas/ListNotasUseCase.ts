import {
  NotasPaginateProperties,
  INotasRepository,
} from 'src/notas/repositories/INotasRepository'
import { inject, injectable } from 'tsyringe'

type ListNotasUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListNotasUseCase {
  constructor(
    @inject('NotasRepository')
    private notasRepository: INotasRepository,
  ) {}

  async execute({
    limit,
    page,
  }: ListNotasUseCaseParams): Promise<NotasPaginateProperties> {
    const take = limit
    const skip = Number(page - 1) * take
    return this.notasRepository.findAll({ page, skip, take })
  }
}
