import { Role } from '@roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1657974893356 } from './migrations/1657974893356-CreateRolesTable'
import { CreateUsersTable1757355218066 } from './migrations/1757355218066-CreateUsersTable'
import { AddRoleIdToUsersTable1757356292566 } from './migrations/1757356292566-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'
import { CreateAlunosTable1759165109082 } from './migrations/1759165109082-CreateAlunosTable'
import { Aluno } from 'src/alunos/entities/Aluno'
import { DropAlunosTable1712345678900 } from './migrations/1759521664640-ApagarAlunos'
import { RecriarTabelaAluno1759521734352 } from './migrations/1759521734352-RecriarTabelaAluno'
import { ApagarAlunos2Table1759522422202 } from './migrations/1759522422202-ApagarAlunos2'
import { RecriandoTabelaAlunos21759522695534 } from './migrations/1759522695534-RecriandoTabelaAlunos2'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User, Aluno],
  migrations: [
    CreateRolesTable1657974893356,
    CreateUsersTable1757355218066,
    AddRoleIdToUsersTable1757356292566,
    CreateAlunosTable1759165109082,
    DropAlunosTable1712345678900,
    RecriarTabelaAluno1759521734352,
    ApagarAlunos2Table1759522422202,
    RecriandoTabelaAlunos21759522695534,
  ],
})
