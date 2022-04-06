import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UploadFileDto {
  @ApiProperty({
    description: 'UsersEntity files',
    type: 'string',
    format: 'binary',
  })
  files: Express.Multer.File[];
}
