import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ServicesCreateRo } from 'src/services/types/ro/services-create.ro';
import { ShotsTypeEnum } from '../enums/shots';

export class ShotsUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  price: number;

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

  @ApiProperty({ type: ServicesCreateRo, isArray: true })
  @IsOptional()
  services: ServicesCreateRo[];
}
