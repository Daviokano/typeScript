import { inject, injectable } from 'tsyringe'
import {
  IUsersRepository,
  UsersPaginateProperties,
} from '@users/repositories/IUsersRepository'

type listUsersUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    limit,
    page,
  }: listUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = Number(page - 1) * take
    return this.usersRepository.findAll({ page, skip, take })
  }
}
