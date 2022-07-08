import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

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

  @ApiProperty({
    description: 'Role',
    enum: Role,
    nullable: true,
    required: false,
    default: Role.None,
  })
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  balance: number;
}
