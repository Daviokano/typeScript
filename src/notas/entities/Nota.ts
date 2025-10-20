import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm'

import { Aluno } from 'src/alunos/entities/Aluno'
import { Bimestre } from 'src/notas/entities/Bimestre'

@Entity('notas')
@Unique(['rm', 'idBimestre']) // impede duplicar nota para o mesmo aluno no mesmo bimestre
export class Nota {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  rm!: string // FK de alunos

  @Column()
  idBimestre!: string // FK de bimestres

  // @ManyToOne(() => Aluno > define um relacionament muitos para um com a entidade aluno
  // aluno => aluno.notas > lado inverso da relação (aponta para a propriedade @OneToMany que está no "aluno")
  // { onDelete: 'CASCADE' } > se o aluno for excluído, apaga automaticamente todas às notas relacionadas

  @ManyToOne(() => Aluno, aluno => aluno.notas, { onDelete: 'CASCADE' })

  // diz qual coluna é a fk, e a onde ela se refere
  @JoinColumn({ name: 'rm', referencedColumnName: 'rm' })
  aluno!: Aluno

  @ManyToOne(() => Bimestre, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idBimestre', referencedColumnName: 'id' })
  bimestre!: Bimestre

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  matematica!: number | null

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  portugues!: number | null

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  historia!: number | null
}
