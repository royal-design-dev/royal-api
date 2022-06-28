import { EntityRepository, Repository } from 'typeorm';
import { BindsEntity } from './entity/binds.entity';

@EntityRepository(BindsEntity)
export class BindsRepository extends Repository<BindsEntity> {
  private readonly alias = 'binds';
}
