import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class RefreshTokensDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
