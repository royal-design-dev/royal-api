import { PickType } from '@nestjs/swagger';
import { BindsRo } from './binds.ro';

export class BindsListRo extends PickType(BindsRo, [
  'id',
  'name',
  'service',
  'picture',
]) {}
