import { PickType } from '@nestjs/swagger';
import { ServicesCreateRo } from './services-create.ro';

export class ServicesRo extends PickType(ServicesCreateRo, [
  'id',
  'name',
  'slug',
]) {}
