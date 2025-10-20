import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueConstraintNotasSQLite1698200000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Identifica duplicados (apenas para conferência, opcional)
    // SELECT rm, idBimestre, COUNT(*) as total
    // FROM notas
    // GROUP BY rm, idBimestre
    // HAVING COUNT(*) > 1;

    // 2️⃣ Remove duplicados mantendo só a primeira ocorrência (menor id)
    await queryRunner.query(`
      DELETE FROM notas
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM notas
        GROUP BY rm, idBimestre
      )
    `)

    // 3️⃣ Cria tabela temporária com UNIQUE
    await queryRunner.query(`
      CREATE TABLE "temporary_notas" (
        "id" varchar PRIMARY KEY NOT NULL,
        "rm" varchar NOT NULL,
        "idBimestre" varchar NOT NULL,
        "matematica" decimal(4,2),
        "portugues" decimal(4,2),
        "historia" decimal(4,2),
        CONSTRAINT "UQ_rm_idBimestre" UNIQUE ("rm", "idBimestre")
      )
    `)

    // 4️⃣ Copia os dados limpos
    await queryRunner.query(`
      INSERT INTO "temporary_notas"("id","rm","idBimestre","matematica","portugues","historia")
      SELECT "id","rm","idBimestre","matematica","portugues","historia" FROM "notas"
    `)

    // 5️⃣ Remove a tabela antiga e renomeia a temporária
    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverte a UNIQUE removendo a constraint
    await queryRunner.query(`
      CREATE TABLE "temporary_notas" (
        "id" varchar PRIMARY KEY NOT NULL,
        "rm" varchar NOT NULL,
        "idBimestre" varchar NOT NULL,
        "matematica" decimal(4,2),
        "portugues" decimal(4,2),
        "historia" decimal(4,2)
      )
    `)

    await queryRunner.query(`
      INSERT INTO "temporary_notas"("id","rm","idBimestre","matematica","portugues","historia")
      SELECT "id","rm","idBimestre","matematica","portugues","historia" FROM "notas"
    `)

    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
  }
}
