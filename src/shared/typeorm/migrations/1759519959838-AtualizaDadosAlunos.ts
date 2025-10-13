import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropUniqueFromAlunosName1759165109100
  implements MigrationInterface
{
  name = 'DropUniqueFromAlunosName1759165109100'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('alunos')
    if (!table) throw new Error('Tabela "alunos" não encontrada')

    const col = table.findColumnByName('name')
    if (!col) throw new Error('Coluna "name" não encontrada')

    if (col.isUnique) {
      const newCol = col.clone()
      newCol.isUnique = false
      await queryRunner.changeColumn('alunos', 'name', newCol)
    }

    // Caso tenha sido criado também um índice único manual:
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_alunos_name";`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('alunos')
    if (!table) throw new Error('Tabela "alunos" não encontrada')

    const col = table.findColumnByName('name')
    if (!col) throw new Error('Coluna "name" não encontrada')

    if (!col.isUnique) {
      const newCol = col.clone()
      newCol.isUnique = true
      await queryRunner.changeColumn('alunos', 'name', newCol)
    }
    // Ou, se preferir índice:
    // await queryRunner.query(`CREATE UNIQUE INDEX "IDX_alunos_name" ON "alunos" ("name");`);
  }
}
