import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class DribbbleImagesRo {
  @ApiProperty()
  @IsString()
  hidpi: string;

  @ApiProperty()
  @IsString()
  normal: string;

  @ApiProperty()
  @IsString()
  one_x: string;

  @ApiProperty()
  @IsString()
  two_x: string;

  @ApiProperty()
  @IsString()
  four_x: string;

  @ApiProperty()
  @IsString()
  teaser: string;
}

export class DribbbleRo {
  @ApiProperty()
  @IsBoolean()
  animated: boolean;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  @IsString()
  html_url: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: DribbbleImagesRo })
  images: DribbbleImagesRo;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  width: number;

  @ApiProperty()
  @IsDateString()
  published_at: Date;

  @ApiProperty()
  @IsDateString()
  updated_at: Date;
}
