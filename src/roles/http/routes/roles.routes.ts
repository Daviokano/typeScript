import { createRolesController } from '@roles/useCases/createRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRole' // nome minúsculo
import { updateRoleController } from '@roles/useCases/UpdateRole'
import { deleteRolesController } from '@roles/useCases/deleteRole'

import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return showRolesController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
  return updateRoleController.handle(request, response)
})

rolesRouter.delete('/:id', (request, response) => {
  return deleteRolesController.handle(request, response)
})

export { rolesRouter }
