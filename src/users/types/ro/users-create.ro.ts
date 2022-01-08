import { PickType } from '@nestjs/swagger';
import { UsersDto } from '../dto/users.dto';

export class UsersCreateRo extends PickType(UsersDto, ['id', 'login']) {}
