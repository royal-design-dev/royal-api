import { EntityRepository, Repository } from 'typeorm';
import { BindsEntity } from './entity/binds.entity';

@EntityRepository(BindsEntity)
export class BindsRepository extends Repository<BindsEntity> {
  private readonly alias = 'binds';

  getAllByUser = async (userId: string) => {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.service`, 'service')
      .leftJoinAndSelect(`${this.alias}.user`, 'user')
      .select([
        `${this.alias}.id`,
        `${this.alias}.name`,
        `${this.alias}.picture`,
        'service.id',
        'service.name',
        'service.slug',
      ])
      .where({ user: { id: userId } });

    return await builder.getMany();
  };
}
