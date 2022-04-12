import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoriesCreateRo } from 'src/categories/types/ro/categories-create.ro';
import { ShotsTypeEnum } from '../enums/shots';

export class ShotsUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  picture: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  shotUrl: string;

  @ApiProperty({
    enum: ShotsTypeEnum,
  })
  @IsNotEmpty()
  @IsEnum(ShotsTypeEnum)
  @IsOptional()
  type: ShotsTypeEnum;

  @ApiProperty({ type: CategoriesCreateRo, isArray: true })
  @IsOptional()
  categories: CategoriesCreateRo[];
}
