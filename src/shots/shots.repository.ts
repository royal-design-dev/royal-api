import toArray from 'src/common/utils/toArray';
import { EntityRepository, Repository } from 'typeorm';
import { ShotEntity } from './entity/shots.entity';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsRo } from './types/ro/shots.ro';

@EntityRepository(ShotEntity)
export class ShotsRepository extends Repository<ShotEntity> {
  private readonly alias = 'shots';

  async findAllAndCount({ categories }: ShotsFilterDto) {
    const builder = this.createQueryBuilder(this.alias).leftJoinAndSelect(
      `${this.alias}.categories`,
      'categories',
    );

    if (categories?.length)
      builder.andWhere('categories.name IN (:...categories)', {
        categories: toArray(categories),
      });

    return (await builder.getManyAndCount()) as [ShotsRo[], number];
  }
}
