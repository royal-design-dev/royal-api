import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'UsersEntity files',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
