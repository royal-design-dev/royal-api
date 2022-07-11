import {MigrationInterface, QueryRunner} from "typeorm";

export class AddServiceIdBinds1657533128329 implements MigrationInterface {
    name = 'AddServiceIdBinds1657533128329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "binds" ADD "userServiceId" character varying(300) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "binds" DROP COLUMN "userServiceId"`);
    }

}
