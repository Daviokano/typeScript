import { container } from 'tsyringe'
import { INotasRepository } from '../repositories/INotasRepository'
import { NotasRepository } from '../repositories/NotasRepository'
import { IBimestresRepository } from '../repositories/IBimestresRepository'
import { BimestresRepository } from '../repositories/BimestresRepository'

container.registerSingleton<INotasRepository>(
  'NotasRepository',
  NotasRepository,
)

container.registerSingleton<IBimestresRepository>(
  'BimestresRepository',
  BimestresRepository,
)
