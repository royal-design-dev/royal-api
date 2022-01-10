import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    description: 'User files',
    required: false,
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @IsArray()
  @IsOptional()
  files: Express.Multer.File[];

  @ApiProperty({ description: 'User information for mailer' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Subject for mailer' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Whom send email' })
  @IsEmail()
  @IsString()
  receiver: string;
}
