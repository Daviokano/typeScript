import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAlunosUseCase } from './ListAlunosUseCase'

export class ListAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAlunosUseCase = container.resolve(ListAlunosUseCase)
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15
    const alunos = await listAlunosUseCase.execute({ page, limit })
    return response.json(alunos)
  }
}
