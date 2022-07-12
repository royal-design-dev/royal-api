import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1657630348947 implements MigrationInterface {
  name = 'Init1657630348947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "binds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying(300) NOT NULL, "name" character varying(300) NOT NULL DEFAULT '', "picture" character varying(300) NOT NULL DEFAULT '', "userServiceId" character varying(300) NOT NULL DEFAULT '', "userId" uuid, "serviceId" uuid, CONSTRAINT "PK_1f1e31dd0b870446e3adf632149" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."services_status_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "slug" character varying(300) NOT NULL, "authLink" character varying(300) NOT NULL DEFAULT '', "status" "public"."services_status_enum" NOT NULL DEFAULT '1', CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "slug" character varying(300) NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."shots_status_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL, "shotUrl" character varying(300) NOT NULL, "picture" character varying(300) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL DEFAULT '0', "count" integer NOT NULL DEFAULT '0', "executions" integer NOT NULL DEFAULT '0', "status" "public"."shots_status_enum" NOT NULL DEFAULT '1', "serviceId" uuid, "typeId" uuid, "userId" uuid, CONSTRAINT "PK_40b52561334dcee2a4421b371d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('1', '2', '4', '6')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(300) NOT NULL, "password" character varying NOT NULL, "balance" integer NOT NULL DEFAULT '0', "role" "public"."users_role_enum" NOT NULL DEFAULT '1', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "token" character varying NOT NULL, "expiresIn" date NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shots_performeds_users" ("shotsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_51dc8825df1ff57ecd25fa8f210" PRIMARY KEY ("shotsId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ac1560f568cac8f420052a92b" ON "shots_performeds_users" ("shotsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fa3a3ea0fabbbd8dd5e1fb2f2" ON "shots_performeds_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "binds" ADD CONSTRAINT "FK_19d94fafe3cd3a9e0c4f1d7ef02" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "binds" ADD CONSTRAINT "FK_5e7ac0c8f6ff6224b62c938bfe6" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" ADD CONSTRAINT "FK_e901bcd33052aa3cf3b12bd3bc7" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" ADD CONSTRAINT "FK_a15ed3de4d33105d09e55a534da" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" ADD CONSTRAINT "FK_2039730be3a660940a9570fd6b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_performeds_users" ADD CONSTRAINT "FK_2ac1560f568cac8f420052a92ba" FOREIGN KEY ("shotsId") REFERENCES "shots"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_performeds_users" ADD CONSTRAINT "FK_2fa3a3ea0fabbbd8dd5e1fb2f28" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots_performeds_users" DROP CONSTRAINT "FK_2fa3a3ea0fabbbd8dd5e1fb2f28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_performeds_users" DROP CONSTRAINT "FK_2ac1560f568cac8f420052a92ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" DROP CONSTRAINT "FK_2039730be3a660940a9570fd6b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" DROP CONSTRAINT "FK_a15ed3de4d33105d09e55a534da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" DROP CONSTRAINT "FK_e901bcd33052aa3cf3b12bd3bc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "binds" DROP CONSTRAINT "FK_5e7ac0c8f6ff6224b62c938bfe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "binds" DROP CONSTRAINT "FK_19d94fafe3cd3a9e0c4f1d7ef02"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2fa3a3ea0fabbbd8dd5e1fb2f2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ac1560f568cac8f420052a92b"`,
    );
    await queryRunner.query(`DROP TABLE "shots_performeds_users"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "shots"`);
    await queryRunner.query(`DROP TYPE "public"."shots_status_enum"`);
    await queryRunner.query(`DROP TABLE "types"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TYPE "public"."services_status_enum"`);
    await queryRunner.query(`DROP TABLE "binds"`);
  }
}
