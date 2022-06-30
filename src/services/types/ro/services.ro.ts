import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ServicesStatusEnum } from '../enums/shots';

export class ServicesRo implements Readonly<ServicesRo> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiHideProperty()
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
