import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UsersDto implements Readonly<UsersDto> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
