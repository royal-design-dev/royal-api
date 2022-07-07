import { EntityRepository, Repository } from 'typeorm';
import { RolesEntity } from './entity/roles.entity';

@EntityRepository(RolesEntity)
export class RolesRepository extends Repository<RolesEntity> {
  private readonly alias = 'roles';
}
