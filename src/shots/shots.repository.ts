import toArray from 'src/common/utils/toArray';
import { EntityRepository, Repository } from 'typeorm';
import { ShotsEntity } from './entity/shots.entity';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsStatusEnum } from './types/enums/shots';
import { ShotsRo } from './types/ro/shots.ro';

@EntityRepository(ShotsEntity)
export class ShotsRepository extends Repository<ShotsEntity> {
  private readonly alias = 'shots';

  async findAllAndCount({
    services,
    types,
    statuses,
    offset,
    limit,
  }: ShotsFilterDto) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.service`, 'service')
      .leftJoinAndSelect(`${this.alias}.type`, 'type')
      .leftJoinAndSelect(`${this.alias}.user`, 'user')
      .leftJoinAndSelect('user.binds', 'binds', 'binds.service = service.id')
      .select([
        `${this.alias}.id`,
        `${this.alias}.title`,
        `${this.alias}.shotUrl`,
        `${this.alias}.created_at`,
        `${this.alias}.id`,
        `${this.alias}.price`,
        `${this.alias}.count`,
        `${this.alias}.picture`,
        `${this.alias}.executions`,
        `${this.alias}.status`,
        'service.name',
        'service.status',
        'service.slug',
        'type.id',
        'type.name',
        'type.slug',
        'user.id',
        'binds.name',
        'binds.picture',
      ])
      .skip(offset)
      .take(limit)
      .orderBy(`${this.alias}.created_at`, 'DESC');

    if (services?.length)
      builder.andWhere('service.slug IN (:...services)', {
        services: toArray(services),
      });

    if (statuses?.length)
      builder.andWhere('shots.status IN (:...statuses)', {
        statuses: toArray(statuses).map((status) => ShotsStatusEnum[status]),
      });

    if (types?.length)
      builder.andWhere('type.slug IN (:...types)', {
        types: toArray(types),
      });

    const [data, count] = await builder.getManyAndCount();

    const formattData = data.map((item) => ({
      ...item,
      user: item.user.binds[0],
    }));

    return [formattData, count] as unknown as [ShotsRo[], number];
  }

  async findOneById(id: string) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.service`, 'service')
      .leftJoinAndSelect(`${this.alias}.user`, 'user')
      .leftJoinAndSelect(`${this.alias}.performeds`, 'performeds')
      .select([
        `${this.alias}.id`,
        `${this.alias}.title`,
        `${this.alias}.shotUrl`,
        `${this.alias}.picture`,
        `${this.alias}.created_at`,
        `${this.alias}.price`,
        `${this.alias}.count`,
        `${this.alias}.executions`,
        `${this.alias}.status`,
        'performeds',
        'service.id',
        'service.name',
        'service.slug',
        'user.id',
      ])
      .where({ id });

    return (await builder.getOneOrFail()) as unknown as ShotsRo;
  }
}
