import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ShowRoleController } from './DeleteRoleController'
import { ShowRoleUseCase } from './DeleteRoleUseCase'

const rolesRepository = RolesRepository.getInstance()
const showRoleUseCase = new ShowRoleUseCase(rolesRepository)
export const showRolesController = new ShowRoleController(showRoleUseCase)
