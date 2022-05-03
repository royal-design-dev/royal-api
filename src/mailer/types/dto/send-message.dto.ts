import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ description: 'User information for mailer' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Subject for mailer' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Whom send email' })
  @IsString()
  @IsNotEmpty()
  receiver: string;
}
