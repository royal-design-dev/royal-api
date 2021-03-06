import { PickType } from '@nestjs/swagger';
import { ShotsDto } from './shots.dto';

export class ShotsCreateDto extends PickType(ShotsDto, [
  'picture',
  'shotUrl',
  'title',
  'categories',
  'type',
]) {}
