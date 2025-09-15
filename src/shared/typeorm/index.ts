import { Role } from '@roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1657974893356 } from './migrations/1657974893356-CreateRolesTable'
import { CreateUsersTable1757355218066 } from './migrations/1757355218066-CreateUsersTable'
import { AddRoleIdToUsersTable1757356292566 } from './migrations/1757356292566-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [
    CreateRolesTable1657974893356,
    CreateUsersTable1757355218066,
    AddRoleIdToUsersTable1757356292566,
  ],
})
