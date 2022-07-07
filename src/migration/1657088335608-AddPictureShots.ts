import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPictureShots1657088335608 implements MigrationInterface {
  name = 'AddPictureShots1657088335608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "picture" character varying(300) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "picture"`);
  }
}
