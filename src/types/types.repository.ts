import { EntityRepository, Repository } from 'typeorm';
import { TypesEntity } from './entity/types.entity';

@EntityRepository(TypesEntity)
export class TypesRepository extends Repository<TypesEntity> {
  private readonly alias = 'types';
}
