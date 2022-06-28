import { PickType } from '@nestjs/swagger';
import { UsersRo } from './users.ro';

export class UsersCreateRo extends PickType(UsersRo, ['id', 'login']) {}
