import { ApiProperty } from '@nestjs/swagger';
import { LoginRo } from 'src/auth/types/ro/login.ro';
import { UsersRo } from './users.ro';

export class UsersCreateRo extends UsersRo {
  @ApiProperty({ type: LoginRo })
  tokens: LoginRo;
}
