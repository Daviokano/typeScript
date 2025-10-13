import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/users.routes'
import { authRouter } from '@auth/http/auth.routes'
import { alunosRouter } from '@alunos/http/alunos.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá Dev!' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)
routes.use('/alunos', alunosRouter)
routes.use('/auth', authRouter)

export { routes }
