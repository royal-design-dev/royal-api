import { PickType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class UsersCreateDto extends PickType(UsersDto, ['login', 'password']) {}
