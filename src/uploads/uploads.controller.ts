import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadFileDto } from './types/dto/uploads.dto';
import { UploadFileRo } from './types/ro/uploads.ro';
import { UploadsService } from './uploads.service';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiOperation({
    summary: 'Upload image',
  })
  @ApiBody({
    type: UploadFileDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: UploadFileRo,
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/upls',
        filename: (_, file, cb) => cb(null, file.originalname),
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileRo> {
    return this.uploadsService.upload(file);
  }
}
