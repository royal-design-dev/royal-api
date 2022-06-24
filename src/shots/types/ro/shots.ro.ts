import { ApiProperty, PickType } from '@nestjs/swagger';
import { ShotsDto } from '../dto/shots.dto';

export class ShotsRo extends PickType(ShotsDto, [
  'id',
  'picture',
  'shotUrl',
  'title',
  'price',
  'service',
  'type',
]) {}

export class ShotsListAndCountRo {
  @ApiProperty({ type: ShotsRo, isArray: true })
  data: ShotsRo[];

  @ApiProperty()
  count: number;
}
