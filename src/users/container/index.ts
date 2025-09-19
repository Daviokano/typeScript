import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UserRepository } from '@users/repositories/UsersRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)
