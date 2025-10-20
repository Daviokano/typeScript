import { Router } from 'express'
import { celebrate, Joi as joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { CreateNotaController } from '../useCase/createNota/CreateNotaController'
import { ListNotasController } from '../useCase/listNotas/ListNotasController'

const notasRouter = Router() // Router => permite criar rotas em diferentes arquivos
const createNotasController = container.resolve(CreateNotaController) // resolve => injeta todas as dependências que essa classe precisa
const listNotasController = container.resolve(ListNotasController)

notasRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: joi.number(),
      limit: joi.number(),
    },
  }),
  (request, response) => {
    return listNotasController.handle(request, response)
  },
)

notasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      rm: joi.string().required(),
      year: joi.number().integer().min(2000).max(2100).required(),
      term: joi.number().integer().min(1).max(4).required(),
      matematica: joi.number().min(0).max(10).optional(),
      portugues: joi.number().min(0).max(10).optional(),
      historia: joi.number().min(0).max(10).optional(),
    },
  }),
  (request, response) => {
    return createNotasController.handle(request, response)
  },
)

export { notasRouter }
