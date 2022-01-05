import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategories1640781923133 implements MigrationInterface {
  name = 'AddCategories1640781923133';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shots_categories_categories" ("shotsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_03521f46d86b2f8ba72d30ee71c" PRIMARY KEY ("shotsId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8945008df8699d868a7f5068b" ON "shots_categories_categories" ("shotsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7f877ec1e393c76398f31bfe52" ON "shots_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_categories_categories" ADD CONSTRAINT "FK_c8945008df8699d868a7f5068b6" FOREIGN KEY ("shotsId") REFERENCES "shots"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_categories_categories" ADD CONSTRAINT "FK_7f877ec1e393c76398f31bfe522" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shots_categories_categories" DROP CONSTRAINT "FK_7f877ec1e393c76398f31bfe522"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shots_categories_categories" DROP CONSTRAINT "FK_c8945008df8699d868a7f5068b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7f877ec1e393c76398f31bfe52"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8945008df8699d868a7f5068b"`,
    );
    await queryRunner.query(`DROP TABLE "shots_categories_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
