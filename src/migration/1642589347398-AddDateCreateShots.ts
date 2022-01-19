import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateCreateShots1642589347398 implements MigrationInterface {
    name = 'AddDateCreateShots1642589347398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shots" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shots" DROP COLUMN "created_at"`);
    }

}
