import {
  RolesPaginateProperties,
  RolesRepository,
} from '@roles/repositories/RolesRepository'

type listRolesUseCaseParams = {
  page: number
  limit: number
}
export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({
    limit,
    page,
  }: listRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit
    const skip = Number(page - 1) * take
    return this.rolesRepository.findAll({ page, skip, take })
  }
}
