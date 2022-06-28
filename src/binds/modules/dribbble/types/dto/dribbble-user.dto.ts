import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class DribbbleUserDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  service: string;
}
