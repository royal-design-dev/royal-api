import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { CategoriesCreateRo } from 'src/categories/types/ro/categories-create.ro';

export class ShotsDto implements Readonly<ShotsDto> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shotUrl: string;

  @ApiProperty({ type: CategoriesCreateRo, isArray: true })
  categories: CategoriesCreateRo[];
}

export class ShotsFilterDto {
  @ApiProperty({
    format: 'uuid',
    description: 'Filter shots by categories uuids',
    required: false,
  })
  @IsOptional()
  @Validate(IsUUID, { each: true })
  categories: string[];
}
