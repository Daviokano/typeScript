import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity('bimestres')
@Unique(['year', 'term']) // impede duplicar o mesmo bimestre no mesmo ano
export class Bimestre {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('int')
  year!: number // ano

  @Column('int')
  term!: number // bimestre
}
