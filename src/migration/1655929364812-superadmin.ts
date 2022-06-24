import { MigrationInterface, QueryRunner } from 'typeorm';

import { hash } from 'bcryptjs';
import { UsersEntity } from 'src/users/entity/users.entity';

export class superadmin1655929364812 implements MigrationInterface {
  name = 'superadmin1655929364812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UsersEntity, {
      login: 'superadmin',
      password: await hash('super', 12),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UsersEntity, {
      login: 'superadmin',
    });
  }
}