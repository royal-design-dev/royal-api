import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoriesCreateRo } from 'src/categories/types/ro/categories-create.ro';

export class ShotsUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  picture_banner: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  shotUrl: string;

  @ApiProperty({ type: CategoriesCreateRo, isArray: true })
  @IsOptional()
  categories: CategoriesCreateRo[];
}
