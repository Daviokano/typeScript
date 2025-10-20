import { Request, Response } from 'express'
import { CreateNotaUseCase } from './CreateNotaUseCase'
import { container } from 'tsyringe'

export class CreateNotaController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createNotaUseCase = container.resolve(CreateNotaUseCase)
      const { rm, year, term, matematica, portugues, historia } = request.body
      const nota = await createNotaUseCase.execute({
        rm,
        year,
        term,
        matematica,
        portugues,
        historia,
      })
      return response.status(201).json(nota)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}
