import { Repository } from 'typeorm'
import {
  CreateAlunoDTO,
  IAlunosRepository,
  PaginateParams,
  AlunosPaginateProperties,
} from './IAlunosRepository'

import { dataSource } from '@shared/typeorm'
import { Aluno } from '../entities/Aluno'

export class AlunoRepository implements IAlunosRepository {
  private repository: Repository<Aluno>
  constructor() {
    this.repository = dataSource.getRepository(Aluno)
  }
  async create({
    cpf,
    name,
    email,
    dataNascimento,
  }: CreateAlunoDTO): Promise<Aluno> {
    const aluno = this.repository.create({
      cpf,
      name,
      email,
      dataNascimento,
    })
    return this.repository.save(aluno)
  }

  async save(aluno: Aluno): Promise<Aluno> {
    return this.repository.save(aluno)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<AlunosPaginateProperties> {
    const [aluno, count] = await this.repository
      .createQueryBuilder()
      .skip(skip) // ex: 5 => começa a pegar a partir do quinto
      .take(take) // ex: 10 => pega os 10 registros depois do quinto
      .getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: aluno,
    }
    return result
  }

  async findByRm(rm: string): Promise<Aluno | null> {
    return this.repository.findOneBy({ rm })
  }

  async findByCpf(cpf: string): Promise<Aluno | null> {
    return this.repository.findOneBy({ cpf })
  }

  async findByName(name: string): Promise<Aluno | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<Aluno | null> {
    return this.repository.findOneBy({ email })
  }

  async delete(aluno: Aluno): Promise<void> {
    await this.repository.remove(aluno)
  }
}
