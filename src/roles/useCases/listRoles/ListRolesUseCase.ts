import {
  IRolesRepository,
  RolesPaginateProperties,
} from '@roles/repositories/IRolesRepository'
import { inject, injectable } from 'tsyringe'

type listRolesUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    limit,
    page,
  }: listRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit
    const skip = Number(page - 1) * take
    return this.rolesRepository.findAll({ page, skip, take })
  }
}
