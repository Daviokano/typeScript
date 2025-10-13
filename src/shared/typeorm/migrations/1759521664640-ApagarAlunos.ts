import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropAlunosTable1712345678900 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    // ifExist = true, dropForeignKeys = true, dropIndices = true
    await q.dropTable('alunos', true, true, true)
  }

  public async down(q: QueryRunner): Promise<void> {
    // recrie a tabela aqui se quiser suportar rollback (ou deixe vazio)
  }
}
