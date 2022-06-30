import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ServicesStatusEnum } from '../enums/shots';

export class ServicesCreateDto implements Readonly<ServicesCreateDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  authLink: string;

  @ApiProperty({
    description: 'Status service',
    enum: ServicesStatusEnum,
    nullable: true,
    required: false,
    default: ServicesStatusEnum.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ServicesStatusEnum)
  status: ServicesStatusEnum;
}
