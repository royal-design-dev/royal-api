import { EntityRepository, Repository } from 'typeorm';
import { ShotEntity } from './entity/shots.entity';
import { ShotsRo } from './types/ro/shots.ro';

@EntityRepository(ShotEntity)
export class ShotsRepository extends Repository<ShotEntity> {
  private readonly alias = 'shots';

  async findAllAndCount() {
    const builder = this.createQueryBuilder(this.alias);

    return (await builder.getManyAndCount()) as [ShotsRo[], number];
  }
}
