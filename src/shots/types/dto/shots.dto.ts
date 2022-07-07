import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ServicesCreateRo } from 'src/services/types/ro/services-create.ro';
import { ServicesRo } from 'src/services/types/ro/services.ro';
import { TypesRo } from 'src/types/types/ro/types.ro';
import { ShotsStatusEnum } from '../enums/shots';

export class ShotsDto implements Readonly<ShotsDto> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shotUrl: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'Filter from type shots',
    enum: ShotsStatusEnum,
    nullable: true,
    required: false,
    default: ShotsStatusEnum.WORKING,
  })
  @IsOptional()
  @IsEnum(ShotsStatusEnum)
  status: ShotsStatusEnum;

  @ApiProperty({ type: PickType(ServicesRo, ['id']) })
  service: Pick<ServicesCreateRo, 'id'>;

  @ApiProperty({ type: PickType(TypesRo, ['id']) })
  type: Pick<TypesRo, 'id'>;
}

export class ShotsFilterDto {
  @ApiProperty({
    description: 'Filter shots by statuses enum',
    required: false,
    isArray: true,
    type: 'enum',
    enum: ShotsStatusEnum,
  })
  @IsEnum(ShotsStatusEnum)
  @IsOptional()
  statuses: string[];

  @ApiProperty({
    description: 'Filter shots by services slugs',
    required: false,
    isArray: true,
  })
  @IsString()
  @IsOptional()
  services: string[];

  @ApiProperty({
    description: 'Filter shots by types slugs',
    required: false,
    isArray: true,
  })
  @IsString()
  @IsOptional()
  types: string[];

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
