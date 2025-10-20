import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueConstraintNotas1760986996069
  implements MigrationInterface
{
  name = 'AddUniqueConstraintNotas1760986996069'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" uuid PRIMARY KEY NOT NULL, "name" string NOT NULL, "email" string NOT NULL, "password" string NOT NULL, "avatar" string, "isAdmin" boolean NOT NULL DEFAULT (false), "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "users"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_notas" ("id" uuid PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" uuid NOT NULL, "matematica" numeric, "portugues" numeric, "historia" numeric)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "notas"`,
    )
    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_bimestres" ("id" uuid PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "bimestres"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_bimestres" RENAME TO "bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_roles" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_roles"("id", "name", "created_at") SELECT "id", "name", "created_at" FROM "roles"`,
    )
    await queryRunner.query(`DROP TABLE "roles"`)
    await queryRunner.query(`ALTER TABLE "temporary_roles" RENAME TO "roles"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar NOT NULL, "isAdmin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "users"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_bimestres" ("id" varchar PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "bimestres"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_bimestres" RENAME TO "bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_notas" ("id" varchar PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" varchar NOT NULL, "matematica" decimal(4,2), "portugues" decimal(4,2), "historia" decimal(4,2))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "notas"`,
    )
    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_alunos" ("rm" varchar PRIMARY KEY NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "dataNascimento" datetime NOT NULL, CONSTRAINT "UQ_1c78ebc1eef67355aff554d8c67" UNIQUE ("cpf"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_alunos"("rm", "cpf", "name", "email", "dataNascimento") SELECT "rm", "cpf", "name", "email", "dataNascimento" FROM "alunos"`,
    )
    await queryRunner.query(`DROP TABLE "alunos"`)
    await queryRunner.query(`ALTER TABLE "temporary_alunos" RENAME TO "alunos"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_bimestres" ("id" varchar PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL, CONSTRAINT "UQ_ea0ac84b8032195dfb825363a30" UNIQUE ("year", "term"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "bimestres"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_bimestres" RENAME TO "bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_notas" ("id" varchar PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" varchar NOT NULL, "matematica" decimal(4,2), "portugues" decimal(4,2), "historia" decimal(4,2), CONSTRAINT "UQ_5bfdca5bbc23ba0dd6df1bb4dd0" UNIQUE ("rm", "idBimestre"))`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "notas"`,
    )
    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar NOT NULL, "isAdmin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "users"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_notas" ("id" varchar PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" varchar NOT NULL, "matematica" decimal(4,2), "portugues" decimal(4,2), "historia" decimal(4,2), CONSTRAINT "UQ_5bfdca5bbc23ba0dd6df1bb4dd0" UNIQUE ("rm", "idBimestre"), CONSTRAINT "FK_d44312103664fff15839c4639be" FOREIGN KEY ("rm") REFERENCES "alunos" ("rm") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_121f5860a98ee0c2d8cf03cfcf8" FOREIGN KEY ("idBimestre") REFERENCES "bimestres" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "notas"`,
    )
    await queryRunner.query(`DROP TABLE "notas"`)
    await queryRunner.query(`ALTER TABLE "temporary_notas" RENAME TO "notas"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notas" RENAME TO "temporary_notas"`)
    await queryRunner.query(
      `CREATE TABLE "notas" ("id" varchar PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" varchar NOT NULL, "matematica" decimal(4,2), "portugues" decimal(4,2), "historia" decimal(4,2), CONSTRAINT "UQ_5bfdca5bbc23ba0dd6df1bb4dd0" UNIQUE ("rm", "idBimestre"))`,
    )
    await queryRunner.query(
      `INSERT INTO "notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "temporary_notas"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_notas"`)
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "avatar" varchar NOT NULL, "isAdmin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "roleId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "temporary_users"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_users"`)
    await queryRunner.query(`ALTER TABLE "notas" RENAME TO "temporary_notas"`)
    await queryRunner.query(
      `CREATE TABLE "notas" ("id" varchar PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" varchar NOT NULL, "matematica" decimal(4,2), "portugues" decimal(4,2), "historia" decimal(4,2))`,
    )
    await queryRunner.query(
      `INSERT INTO "notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "temporary_notas"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_notas"`)
    await queryRunner.query(
      `ALTER TABLE "bimestres" RENAME TO "temporary_bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "bimestres" ("id" varchar PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "temporary_bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_bimestres"`)
    await queryRunner.query(`ALTER TABLE "alunos" RENAME TO "temporary_alunos"`)
    await queryRunner.query(
      `CREATE TABLE "alunos" ("rm" uuid PRIMARY KEY NOT NULL, "cpf" string NOT NULL, "name" string NOT NULL, "email" string NOT NULL, "dataNascimento" date NOT NULL, CONSTRAINT "UQ_1c78ebc1eef67355aff554d8c67" UNIQUE ("cpf"))`,
    )
    await queryRunner.query(
      `INSERT INTO "alunos"("rm", "cpf", "name", "email", "dataNascimento") SELECT "rm", "cpf", "name", "email", "dataNascimento" FROM "temporary_alunos"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_alunos"`)
    await queryRunner.query(`ALTER TABLE "notas" RENAME TO "temporary_notas"`)
    await queryRunner.query(
      `CREATE TABLE "notas" ("id" uuid PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" uuid NOT NULL, "matematica" numeric, "portugues" numeric, "historia" numeric)`,
    )
    await queryRunner.query(
      `INSERT INTO "notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "temporary_notas"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_notas"`)
    await queryRunner.query(
      `ALTER TABLE "bimestres" RENAME TO "temporary_bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "bimestres" ("id" uuid PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "temporary_bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_bimestres"`)
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "name" string NOT NULL, "email" string NOT NULL, "password" string NOT NULL, "avatar" string, "isAdmin" boolean NOT NULL DEFAULT (false), "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    )
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "temporary_users"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_users"`)
    await queryRunner.query(`ALTER TABLE "roles" RENAME TO "temporary_roles"`)
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid PRIMARY KEY NOT NULL, "name" string NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`,
    )
    await queryRunner.query(
      `INSERT INTO "roles"("id", "name", "created_at") SELECT "id", "name", "created_at" FROM "temporary_roles"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_roles"`)
    await queryRunner.query(
      `ALTER TABLE "bimestres" RENAME TO "temporary_bimestres"`,
    )
    await queryRunner.query(
      `CREATE TABLE "bimestres" ("id" uuid PRIMARY KEY NOT NULL, "year" integer NOT NULL, "term" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "bimestres"("id", "year", "term") SELECT "id", "year", "term" FROM "temporary_bimestres"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_bimestres"`)
    await queryRunner.query(`ALTER TABLE "notas" RENAME TO "temporary_notas"`)
    await queryRunner.query(
      `CREATE TABLE "notas" ("id" uuid PRIMARY KEY NOT NULL, "rm" varchar NOT NULL, "idBimestre" uuid NOT NULL, "matematica" numeric, "portugues" numeric, "historia" numeric, CONSTRAINT "FK_notas_bimestres_id" FOREIGN KEY ("idBimestre") REFERENCES "bimestres" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_notas_alunos_rm" FOREIGN KEY ("rm") REFERENCES "alunos" ("rm") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    )
    await queryRunner.query(
      `INSERT INTO "notas"("id", "rm", "idBimestre", "matematica", "portugues", "historia") SELECT "id", "rm", "idBimestre", "matematica", "portugues", "historia" FROM "temporary_notas"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_notas"`)
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "name" string NOT NULL, "email" string NOT NULL, "password" string NOT NULL, "avatar" string, "isAdmin" boolean NOT NULL DEFAULT (false), "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UsersRoles" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    )
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId") SELECT "id", "name", "email", "password", "avatar", "isAdmin", "created_at", "roleId" FROM "temporary_users"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_users"`)
  }
}
