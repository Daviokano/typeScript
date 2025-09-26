import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { AuthenticateUserController } from '@auth/useCases/authenticateUser/AuthenticateUserController'

const authRouter = Router()
const authenticateUserController = container.resolve(AuthenticateUserController)

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return authenticateUserController.handle(request, response)
  },
)

export { authRouter }
