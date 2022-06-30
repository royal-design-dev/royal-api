import { EntityRepository, Repository } from 'typeorm';
import { ServicesEntity } from './entity/services.entity';

@EntityRepository(ServicesEntity)
export class ServicesRepository extends Repository<ServicesEntity> {
  private readonly alias = 'services';

  async findAllAndCount() {
    const builder = this.createQueryBuilder(this.alias).select([
      'services.id',
      'services.name',
      'services.slug',
      'services.status',
    ]);

    return await builder.getMany();
  }
}
