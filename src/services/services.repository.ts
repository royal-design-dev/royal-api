import { EntityRepository, Repository } from 'typeorm';
import { ServiceEntity } from './entity/services.entity';

@EntityRepository(ServiceEntity)
export class ServicesRepository extends Repository<ServiceEntity> {
  private readonly alias = 'services';
}
