import { Nota } from 'src/notas/entities/Nota'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('alunos')
export class Aluno {
  @PrimaryColumn()
  rm?: string

  @Column()
  cpf: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  dataNascimento: Date

  @OneToMany(() => Nota, nota => nota.aluno)
  notas!: Nota[]

  constructor() {
    if (!this.rm) {
      this.rm = uuidv4()
    }
  }
}
