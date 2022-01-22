import { ApiProperty, PickType } from '@nestjs/swagger';
import { ShotsDto } from '../dto/shots.dto';

export class ShotsRo extends PickType(ShotsDto, [
  'id',
  'picture',
  'picture_banner',
  'shotUrl',
  'title',
  'categories',
]) {}

export class ShotsListAndCountRo {
  @ApiProperty({ type: ShotsRo, isArray: true })
  data: ShotsRo[];

  @ApiProperty()
  count: number;
}
