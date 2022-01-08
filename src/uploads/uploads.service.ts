import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v2 } from 'cloudinary';
import { UploadCloud, UploadFileRo } from './types/ro/uploads.ro';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: configService.get('CL_NAME'),
      api_key: configService.get('CL_API_KEY'),
      api_secret: configService.get('CL_API_SECRET'),
    });
  }

  async upload(file: Express.Multer.File): Promise<UploadFileRo> {
    return await new Promise((resolve, reject) => {
      v2.uploader.upload(file.path, (error, result: UploadCloud) => {
        if (error) return reject(error);

        resolve({ location: result.url });
      });
    });
  }
}
