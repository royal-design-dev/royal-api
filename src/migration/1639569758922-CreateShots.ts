import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShots1639569758922 implements MigrationInterface {
  name = 'CreateShots1639569758922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "picture" character varying(300) NOT NULL, "title" character varying(300) NOT NULL, "subtitle" character varying(300) NOT NULL, "shotUrl" character varying(300) NOT NULL, CONSTRAINT "PK_270d8a54e9ae132b9368e0d93a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "shots"`);
  }
}
