import { ApiProperty } from '@nestjs/swagger';

export class LoginRo {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
