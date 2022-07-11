import { MigrationInterface, QueryRunner } from 'typeorm';

import { hash } from 'bcryptjs';
import { UsersEntity } from 'src/users/entity/users.entity';

export class superadmin1657203912220 implements MigrationInterface {
  name = 'superadmin1657203912220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UsersEntity, {
      login: 'admin',
      password: await hash('123', 12),
      role: 6,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UsersEntity, {
      login: 'admin',
    });
  }
}
