import { Router } from 'express'
import { celebrate, Joi as joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { ListAlunosController } from '../userCase/listAlunos/ListAlunosController'
import { CreateAlunosController } from '../userCase/createAluno/CreateAlunoController'

const alunosRouter = Router() // Router => permite criar rotas em diferentes arquivos
const createAlunoController = container.resolve(CreateAlunosController) // resolve => injeta todas as dependências que essa classe precisa
const listAlunosController = container.resolve(ListAlunosController)

alunosRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: joi.number(),
      limit: joi.number(),
    },
  }),
  (request, response) => {
    return listAlunosController.handle(request, response)
  },
)

alunosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: joi.string().required(),
      name: joi.string().required(),
      email: joi.string().email().required(),
      dataNascimento: joi.date().required(),
    },
  }),
  (request, response) => {
    return createAlunoController.handle(request, response)
  },
)

export { alunosRouter }
