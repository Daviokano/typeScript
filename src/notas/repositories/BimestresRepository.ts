import { Repository } from 'typeorm'
import { IBimestresRepository } from './IBimestresRepository'
import { dataSource } from '@shared/typeorm'
import { Bimestre } from '../entities/Bimestre'

export class BimestresRepository implements IBimestresRepository {
  private repository: Repository<Bimestre>

  constructor() {
    this.repository = dataSource.getRepository(Bimestre)
  }

  async findById(id: string): Promise<Bimestre | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findOrCreate(year: number, term: number): Promise<Bimestre> {
    let bimestre = await this.repository.findOne({ where: { year, term } })
    if (!bimestre) {
      bimestre = this.repository.create({ year, term })
      bimestre = await this.repository.save(bimestre)
    }
    return bimestre
  }
}
