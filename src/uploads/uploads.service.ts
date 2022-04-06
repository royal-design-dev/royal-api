import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';

import { v2 } from 'cloudinary';
import { UploadFilesRo } from './types/ro/uploads.ro';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: configService.get('CL_NAME'),
      api_key: configService.get('CL_API_KEY'),
      api_secret: configService.get('CL_API_SECRET'),
    });
  }

  async upload(files: Express.Multer.File[]): Promise<UploadFilesRo> {
    const promises = files.map((file) => v2.uploader.upload(file.path));

    return new Promise((resolve, reject) => {
      Promise.all(promises).then(
        (data) =>
          resolve({
            locations: data.map(({ url: location }) => ({ location })),
          }),
        (error) =>
          reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)),
      );
    });
  }
}
