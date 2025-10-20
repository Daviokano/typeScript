import { Bimestre } from '../entities/Bimestre'

export interface IBimestresRepository {
  findById(id: string): Promise<Bimestre | null>
  findOrCreate(year: number, term: number): Promise<Bimestre>
}
