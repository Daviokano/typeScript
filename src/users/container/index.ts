import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UserRepository } from '@users/repositories/UsersRepository'
import { CreateUserController } from '@users/userCases/createUser/CreateUserController'
import { ListUsersController } from '@users/userCases/listUsers/listUsersController'
import { AlunoRepository } from 'src/alunos/repositories/AlunosRepository'
import { IAlunosRepository } from 'src/alunos/repositories/IAlunosRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<IAlunosRepository>(
  'AlunosRepository',
  AlunoRepository,
)

container.registerSingleton('CreateUserController', CreateUserController)

container.registerSingleton('ListUsersControllers', ListUsersController)
