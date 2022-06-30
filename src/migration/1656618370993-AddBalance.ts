import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBalance1656618370993 implements MigrationInterface {
  name = 'AddBalance1656618370993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "balance" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
  }
}
