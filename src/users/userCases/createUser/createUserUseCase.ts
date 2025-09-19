import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { User } from '@users/entities/User'

type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('RolesRepository') private RolesRepository: IRolesRepository,
  ) {}
  async execute({
    name,
    email,
    password,
    isAdmin,
    roleId,
  }: CreateUserDTO): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) {
      throw new Error('This email is already registered')
    }
    const role = await this.RolesRepository.findById(roleId)
    if (!role) {
      throw new Error('Role does not exists')
    }
    const hashedPassWord = await hash(password, 10)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassWord,
      isAdmin,
      role,
    })
    return user
  }
}
