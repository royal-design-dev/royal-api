import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Roles } from 'src/roles/enum/roles.enum';
import { RolesEntity } from '../../entity/roles.entity';

export class RolesRo extends PickType(RolesEntity, ['id']) {
  @ApiProperty({
    description: 'Roles',
    enum: Roles,
    nullable: false,
    required: false,
    default: Roles.None,
  })
  @IsEnum(Roles)
  status: Roles;

  @ApiProperty()
  @IsString()
  value: string;
}
