import { Repository } from 'typeorm'
import {
  CreateNotaRepositoryDTO,
  INotasRepository,
  PaginateParams,
  NotasPaginateProperties,
} from './INotasRepository'

import { dataSource } from '@shared/typeorm'
import { Nota } from '../entities/Nota'

export class NotasRepository implements INotasRepository {
  private repository: Repository<Nota>
  constructor() {
    this.repository = dataSource.getRepository(Nota)
  }

  async create({
    rm,
    idBimestre,
    matematica,
    portugues,
    historia,
  }: CreateNotaRepositoryDTO): Promise<Nota> {
    const nota = this.repository.create({
      rm,
      idBimestre,
      matematica,
      portugues,
      historia,
    })
    return this.repository.save(nota)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<NotasPaginateProperties> {
    const [notas, count] = await this.repository
      .createQueryBuilder('nota')
      .leftJoinAndSelect('nota.aluno', 'aluno')
      .leftJoinAndSelect('nota.bimestre', 'bimestre')
      .skip(skip)
      .take(take)
      .getManyAndCount()
    return {
      per_page: take,
      total: count,
      current_page: page,
      data: notas,
    }
  }
}
