import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUseCase = container.resolve(CreateUserUseCase)
    const { name, email, password, isAdmin, roleId } = request.body
    const user = await createUseCase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return response.status(201).json(user)
  }
}
