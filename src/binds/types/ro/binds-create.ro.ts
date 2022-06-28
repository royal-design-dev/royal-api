import { PickType } from '@nestjs/swagger';
import { BindsRo } from './binds.ro';

export class BindsCreateRo extends PickType(BindsRo, [
  'name',
  'token',
  'service',
]) {}
