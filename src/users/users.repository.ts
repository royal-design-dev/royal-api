import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  private readonly alias = 'users';
}
