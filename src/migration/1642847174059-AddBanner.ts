import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBanner1642847174059 implements MigrationInterface {
  name = 'AddBanner1642847174059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "picture_banner" character varying(300) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" ALTER COLUMN "picture_banner" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ALTER COLUMN "picture_banner" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "picture_banner"`);
  }
}
