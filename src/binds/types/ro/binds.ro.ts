import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ServicesCreateRo } from 'src/services/types/ro/services-create.ro';
import { UsersCreateRo } from 'src/users/types/ro/users-create.ro';

export class BindsRo implements Readonly<BindsRo> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ type: OmitType(ServicesCreateRo, ['status']) })
  service: ServicesCreateRo;

  @ApiProperty({ type: UsersCreateRo })
  user: UsersCreateRo;
}
