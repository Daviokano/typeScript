import { Request, Response } from 'express'
import { CreateAlunosUseCase } from './CreateAlunoUseCase'
import { container } from 'tsyringe'

export class CreateAlunosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAlunosCase = container.resolve(CreateAlunosUseCase)
    const { cpf, name, email, dataNascimento } = request.body
    const user = await createAlunosCase.execute({
      cpf,
      name,
      email,
      dataNascimento,
    })
    return response.status(201).json(user)
  }
}
