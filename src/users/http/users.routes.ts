import { Router } from 'express'
import { celebrate, Joi as joi, Segments } from 'celebrate'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { container } from 'tsyringe'

const usersRouter = Router() // Router => permite criar rotas em diferentes arquivos
const createUserController = container.resolve(CreateUserController)

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
