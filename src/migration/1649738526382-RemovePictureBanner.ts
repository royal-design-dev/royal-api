import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePictureBanner1649738526382 implements MigrationInterface {
  name = 'RemovePictureBanner1649738526382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "picture_banner"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "picture_banner" character varying(300) NOT NULL DEFAULT ''`,
    );
  }
}
