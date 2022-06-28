import { OmitType } from '@nestjs/swagger';
import { ShotsDto } from './shots.dto';

export class ShotsCreateDto extends OmitType(ShotsDto, ['id']) {}
