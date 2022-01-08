import { PickType } from '@nestjs/swagger';
import { CategoriesCreateRo } from './categories-create.ro';

export class CategoriesRo extends PickType(CategoriesCreateRo, [
  'id',
  'name',
]) {}
