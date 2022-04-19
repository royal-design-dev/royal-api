import toArray from 'src/common/utils/toArray';
import { EntityRepository, Repository } from 'typeorm';
import { ShotEntity } from './entity/shots.entity';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsRo } from './types/ro/shots.ro';

@EntityRepository(ShotEntity)
export class ShotsRepository extends Repository<ShotEntity> {
  private readonly alias = 'shots';

  async findAllAndCount({ categories, type, offset, limit }: ShotsFilterDto) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.categories`, 'categories')
      .where({ ...(type && { type }) })
      .skip(offset)
      .take(limit)
      .orderBy(`${this.alias}.created_at`, 'DESC');

    if (categories?.length)
      builder.andWhere('categories.name IN (:...categories)', {
        categories: toArray(categories),
      });

    return (await builder.getManyAndCount()) as [ShotsRo[], number];
  }

  async findOneById(id: string) {
    const builder = this.createQueryBuilder(this.alias)
      .where({ id })
      .leftJoinAndSelect(`${this.alias}.categories`, 'categories');

    return (await builder.getOneOrFail()) as ShotsRo;
  }
}
