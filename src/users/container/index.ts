import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UserRepository } from '@users/repositories/UsersRepository'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { ListUsersController } from '@users/userCases/listUsers/listUsersController'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)

container.registerSingleton('ListUsersControllers', ListUsersController)
