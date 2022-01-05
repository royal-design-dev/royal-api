import { PickType } from '@nestjs/swagger';
import { ShotsDto } from '../dto/shots.dto';

export class ShotsCreateRo extends PickType(ShotsDto, [
  'id',
  'picture',
  'shotUrl',
  'subtitle',
  'title',
]) {}
