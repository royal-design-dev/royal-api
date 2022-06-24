import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Validate,
} from 'class-validator';
import { ServicesCreateRo } from 'src/services/types/ro/services-create.ro';
import { ShotsTypeEnum } from '../enums/shots';

export class ShotsDto implements Readonly<ShotsDto> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shotUrl: string;

  @ApiProperty({
    description: 'Filter from type shots',
    enum: ShotsTypeEnum,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(ShotsTypeEnum)
  type: ShotsTypeEnum;

  @ApiProperty({ type: ServicesCreateRo })
  service: ServicesCreateRo;
}

export class ShotsFilterDto {
  @ApiProperty({
    format: 'uuid',
    description: 'Filter shots by services uuids',
    required: false,
  })
  @IsOptional()
  @Validate(IsUUID, { each: true })
  services: string[];

  @ApiProperty({
    enum: ShotsTypeEnum,
    description: 'Filter from type shots',
    required: false,
  })
  @IsOptional()
  @IsEnum(ShotsTypeEnum)
  type: ShotsTypeEnum;

  @ApiProperty({
    description: 'Filter from offset',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiProperty({
    description: 'Filter from limit',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
