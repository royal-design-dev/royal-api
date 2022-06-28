import { PickType } from '@nestjs/swagger';
import { TypesDto } from './types.dto';

export class TypesCreateDto extends PickType(TypesDto, ['name', 'slug']) {}
