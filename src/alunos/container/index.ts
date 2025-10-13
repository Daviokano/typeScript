import { AlunoRepository } from 'src/alunos/repositories/AlunosRepository'
import { IAlunosRepository } from 'src/alunos/repositories/IAlunosRepository'
import { container } from 'tsyringe'

container.registerSingleton<IAlunosRepository>(
  'AlunosRepository',
  AlunoRepository,
)
