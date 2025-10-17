import { Router } from 'express'
import { celebrate, Joi as joi, Segments } from 'celebrate'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { container } from 'tsyringe'
import { ListUsersController } from '@users/userCases/listUsers/listUsersController'
import { CreateLoginController } from '@users/userCases/createLogin/CreateLoginControler'
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'

const usersRouter = Router() // Router => permite criar rotas em diferentes arquivos
const createUserController = container.resolve(CreateUserController) // resolve => injeta todas as dependências que essa classe precisa
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

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
  isAuthenticated,
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

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

export { usersRouter }
