import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ description: 'User information for mailer' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Subject for mailer' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Whom send email' })
  @IsString()
  receiver: string;
}
