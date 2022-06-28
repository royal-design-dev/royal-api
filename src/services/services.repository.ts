import { EntityRepository, Repository } from 'typeorm';
import { ServicesEntity } from './entity/services.entity';

@EntityRepository(ServicesEntity)
export class ServicesRepository extends Repository<ServicesEntity> {
  private readonly alias = 'services';
}
