import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServiceAuthLink1656579901564 implements MigrationInterface {
  name = 'ServiceAuthLink1656579901564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" ADD "authLink" character varying(300) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "authLink"`);
  }
}
