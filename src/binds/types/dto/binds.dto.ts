import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ServicesCreateRo } from 'src/services/types/ro/services-create.ro';
import { UsersCreateRo } from 'src/users/types/ro/users-create.ro';

export class BindsDto implements Readonly<BindsDto> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userServiceId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ type: PickType(ServicesCreateRo, ['id']) })
  service: Pick<ServicesCreateRo, 'id'>;

  @ApiProperty({ type: PickType(UsersCreateRo, ['id']) })
  user: Pick<UsersCreateRo, 'id'>;
}
