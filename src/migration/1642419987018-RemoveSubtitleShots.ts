import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSubtitleShots1642419987018 implements MigrationInterface {
  name = 'RemoveSubtitleShots1642419987018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "subtitle"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "subtitle" character varying(300) NOT NULL`,
    );
  }
}
