import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListNotasUseCase } from './ListNotasUseCase'

export class ListNotasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listNotasUseCase = container.resolve(ListNotasUseCase)
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15
    const { rm, year, term } = request.query
    const notas = await listNotasUseCase.execute({
      page,
      limit,
      rm,
      year,
      term,
    })
    return response.json(notas)
  }
}
