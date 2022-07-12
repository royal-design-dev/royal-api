import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BindsEntity } from 'src/binds/entity/binds.entity';
import { ServicesRo } from 'src/services/types/ro/services.ro';
import { TypesRo } from 'src/types/types/ro/types.ro';
import { UsersEntity } from 'src/users/entity/users.entity';
import { ShotsDto } from '../dto/shots.dto';

export class ShotsRo extends PickType(ShotsDto, [
  'id',
  'count',
  'price',
  'shotUrl',
  'status',
  'title',
  'executions',
]) {
  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty({ type: BindsEntity })
  user: BindsEntity;

  @ApiProperty({ type: TypesRo })
  type: TypesRo;

  @ApiProperty({ type: ServicesRo })
  service: ServicesRo;

  @ApiHideProperty()
  performeds: UsersEntity[];
}

export class ShotsListAndCountRo {
  @ApiProperty({ type: ShotsRo, isArray: true })
  data: ShotsRo[];

  @ApiProperty()
  count: number;
}
