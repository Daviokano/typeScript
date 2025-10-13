import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class RecriarTabelaAluno1759521734352 implements MigrationInterface {
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
