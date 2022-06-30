import { ApiProperty } from '@nestjs/swagger';

export class DribbbleUserRo {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  scope: string;
}
