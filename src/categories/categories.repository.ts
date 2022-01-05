import { EntityRepository, Repository } from 'typeorm';
import { CategoryEntity } from './entity/categories.entity';

@EntityRepository(CategoryEntity)
export class CategoriesRepository extends Repository<CategoryEntity> {
  private readonly alias = 'categories';
}
