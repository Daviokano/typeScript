import { Router } from 'express'
import { celebrate, Joi as joi, Segments } from 'celebrate'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { container } from 'tsyringe'
import { ListUsersController } from '@users/userCases/listUsers/listUsersController'

const usersRouter = Router() // Router => permite criar rotas em diferentes arquivos
const createUserController = container.resolve(CreateUserController) // resolve => injeta todas as dependências que essa classe precisa
const listUsersController = container.resolve(ListUsersController)

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: joi.number(),
      limit: joi.number(),
    },
  }),
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      isAdmin: joi.boolean().required(),
      roleId: joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

export { usersRouter }
