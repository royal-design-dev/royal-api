import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  private readonly alias = 'users';

  async findAllInfo(userId: string) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.binds`, 'binds')
      .leftJoinAndSelect('binds.service', 'service')
      .where({
        id: userId,
      })
      .select([
        'users.id',
        'users.login',
        'users.balance',
        'users.role',
        'binds.name',
        'binds.picture',
        'service.id',
        'service.name',
        'service.slug',
      ]);

    return await builder.getOne();
  }
}
