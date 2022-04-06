import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShotsTypeEnum1649262009827 implements MigrationInterface {
  name = 'ShotsTypeEnum1649262009827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."shots_type_enum" AS ENUM('live', 'complete')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots" ADD "type" "public"."shots_type_enum" NOT NULL DEFAULT 'complete'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."shots_type_enum"`);
  }
}
