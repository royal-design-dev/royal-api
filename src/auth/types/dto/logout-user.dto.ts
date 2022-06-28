import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LogoutUserDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Remove all refresh tokens from the user',
    name: 'all',
    required: false,
  })
  all: boolean;
}
