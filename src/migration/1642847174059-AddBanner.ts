import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBanner1642847174059 implements MigrationInterface {
  name = 'AddBanner1642847174059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD COLUMN "picture_banner" character varying(300) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "picture_banner"`);
  }
}
