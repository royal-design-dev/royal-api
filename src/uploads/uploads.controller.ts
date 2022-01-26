import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import Auth from 'src/auth/guards/auth.guard';
import { UploadFileDto } from './types/dto/uploads.dto';
import { UploadFilesRo } from './types/ro/uploads.ro';
import { UploadsService } from './uploads.service';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Upload image',
  })
  @ApiBody({
    type: UploadFileDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: UploadFilesRo,
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: './dist/upls',
        filename: (_, file, cb) => cb(null, file.originalname),
      }),
    }),
  )
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadFilesRo> {
    return this.uploadsService.upload(files);
  }
}
