import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlunosRemoveUniqueFromNameRebuild1759165109300
  implements MigrationInterface
{
  name = 'AlunosRemoveUniqueFromNameRebuild1759165109300'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`PRAGMA foreign_keys=OFF;`)

    // 1) criar tabela nova SEM UNIQUE em "name" (mantém UNIQUE em cpf e email)
    await queryRunner.query(`
      CREATE TABLE "alunos_new" (
        "rm" TEXT PRIMARY KEY,
        "cpf" TEXT UNIQUE,
        "name" TEXT,
        "email" TEXT UNIQUE,
        "dataNascimento" TEXT
      );
    `)

    // 2) copiar dados
    await queryRunner.query(`
      INSERT INTO "alunos_new" ("rm","cpf","name","email","dataNascimento")
      SELECT "rm","cpf","name","email","dataNascimento" FROM "alunos";
    `)

    // 3) trocar as tabelas
    await queryRunner.query(`DROP TABLE "alunos";`)
    await queryRunner.query(`ALTER TABLE "alunos_new" RENAME TO "alunos";`)

    // 4) se existir algum índice extra que você usa, recrie aqui (não-único)
    // ex.: await queryRunner.query(`CREATE INDEX "IDX_ALUNOS_EMAIL" ON "alunos" ("email");`);

    await queryRunner.query(`PRAGMA foreign_keys=ON;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`PRAGMA foreign_keys=OFF;`)

    // recoloca UNIQUE em "name" (⚠️ falha se houver duplicatas após a sua mudança)
    await queryRunner.query(`
      CREATE TABLE "alunos_old" (
        "rm" TEXT PRIMARY KEY,
        "cpf" TEXT UNIQUE,
        "name" TEXT UNIQUE,
        "email" TEXT UNIQUE,
        "dataNascimento" TEXT
      );
    `)

    await queryRunner.query(`
      INSERT INTO "alunos_old" ("rm","cpf","name","email","dataNascimento")
      SELECT "rm","cpf","name","email","dataNascimento" FROM "alunos";
    `)

    await queryRunner.query(`DROP TABLE "alunos";`)
    await queryRunner.query(`ALTER TABLE "alunos_old" RENAME TO "alunos";`)

    await queryRunner.query(`PRAGMA foreign_keys=ON;`)
  }
}
