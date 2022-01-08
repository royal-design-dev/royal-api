import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesCreateDto implements Readonly<CategoriesCreateDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
