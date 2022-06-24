import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShotsPrice1655931590537 implements MigrationInterface {
  name = 'ShotsPrice1655931590537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "price" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "price"`);
  }
}
