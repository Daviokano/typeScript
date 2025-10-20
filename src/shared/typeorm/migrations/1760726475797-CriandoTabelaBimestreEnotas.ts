import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateBimestresENotas1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela: bimestres (ano + bimestre)
    await queryRunner.createTable(
      new Table({
        name: 'bimestres',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isNullable: false },
          { name: 'year', type: 'integer', isNullable: false },
          { name: 'term', type: 'integer', isNullable: false }, // 1..4
        ],
      }),
      true,
    )

    // Tabela: notas (uma linha por aluno × bimestre, com colunas de matérias)
    await queryRunner.createTable(
      new Table({
        name: 'notas',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isNullable: false },
          { name: 'rm', type: 'varchar', isNullable: false }, // FK → alunos.rm
          { name: 'idBimestre', type: 'uuid', isNullable: false }, // FK → bimestres.id
          { name: 'matematica', type: 'numeric', isNullable: true },
          { name: 'portugues', type: 'numeric', isNullable: true },
          { name: 'historia', type: 'numeric', isNullable: true },
        ],
      }),
      true,
    )

    // FK: notas.rm → alunos.rm
    await queryRunner.createForeignKey(
      'notas',
      new TableForeignKey({
        name: 'FK_notas_alunos_rm',
        columnNames: ['rm'],
        referencedTableName: 'alunos',
        referencedColumnNames: ['rm'],
        onDelete: 'CASCADE',
      }),
    )

    // FK: notas.idBimestre → bimestres.id
    await queryRunner.createForeignKey(
      'notas',
      new TableForeignKey({
        name: 'FK_notas_bimestres_id',
        columnNames: ['idBimestre'],
        referencedTableName: 'bimestres',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover FKs (ordem inversa ajuda no SQLite)
    await queryRunner.dropForeignKey('notas', 'FK_notas_bimestres_id')
    await queryRunner.dropForeignKey('notas', 'FK_notas_alunos_rm')

    // Dropar tabelas
    await queryRunner.dropTable('notas')
    await queryRunner.dropTable('bimestres')
  }
}
