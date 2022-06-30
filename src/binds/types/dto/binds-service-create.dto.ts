import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BindsServiceCreateDto implements Readonly<BindsServiceCreateDto> {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  service: string;
}
