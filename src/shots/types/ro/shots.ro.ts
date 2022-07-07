import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ServicesRo } from 'src/services/types/ro/services.ro';
import { TypesRo } from 'src/types/types/ro/types.ro';
import { UsersRo } from 'src/users/types/ro/users.ro';
import { ShotsDto } from '../dto/shots.dto';

export class ShotsRo extends PickType(ShotsDto, [
  'id',
  'count',
  'price',
  'shotUrl',
  'status',
  'title',
]) {
  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty({ type: UsersRo })
  user: UsersRo;

  @ApiProperty({ type: TypesRo })
  type: TypesRo;

  @ApiProperty({ type: ServicesRo })
  service: ServicesRo;
}

export class ShotsListAndCountRo {
  @ApiProperty({ type: ShotsRo, isArray: true })
  data: ShotsRo[];

  @ApiProperty()
  count: number;
}
