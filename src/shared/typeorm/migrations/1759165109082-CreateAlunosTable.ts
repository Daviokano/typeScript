import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAlunosTable1759165109082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'alunos',
        columns: [
          {
            name: 'rm',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cpf',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'dataNascimento',
            type: 'date',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles')
  }
}
