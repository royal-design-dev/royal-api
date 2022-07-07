import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/roles/enum/roles.enum';

export class RolesDto implements Readonly<RolesDto> {
  @ApiProperty({
    description: 'Roles',
    enum: Roles,
    nullable: false,
    required: false,
    default: Roles.None,
  })
  @IsOptional()
  @IsEnum(Roles)
  status: Roles;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}
