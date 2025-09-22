import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UserRepository } from '@users/repositories/UsersRepository'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)
