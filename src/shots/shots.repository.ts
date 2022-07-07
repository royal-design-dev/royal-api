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
      .select([
        'shots.id',
        'shots.title',
        'shots.shotUrl',
        'shots.created_at',
        'shots.price',
        'shots.count',
        'shots.picture',
        'shots.executions',
        'shots.status',
        'service.name',
        'service.status',
        'service.slug',
        'type.name',
        'type.slug',
        'user.login',
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

    return (await builder.getManyAndCount()) as unknown as [ShotsRo[], number];
  }

  async findOneById(id: string) {
    const builder = this.createQueryBuilder(this.alias)
      .where({ id })
      .leftJoinAndSelect(`${this.alias}.services`, 'services');

    return (await builder.getOneOrFail()) as unknown as ShotsRo;
  }
}
