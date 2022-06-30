import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DribbbleUserRo } from './types/ro/dribbble-token.ro';

import { catchError } from 'rxjs';
import { BindsDto } from './types/dto/binds.dto';

@Injectable()
export class DribbbleService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getToken = async (code: string, serviceSlug: string) => {
    const DRIBBBLE_CLIENT_ID = this.configService.get('DRIBBBLE_CLIENT_ID');
    const DRIBBBLE_CLIENT_SECRET = this.configService.get(
      'DRIBBBLE_CLIENT_SECRET',
    );
    const DRIBBBLE_REDIRECT_URL = this.configService.get(
      'DRIBBBLE_REDIRECT_URL',
    );

    const { data } = await this.httpService
      .post<DribbbleUserRo>('https://dribbble.com/oauth/token', {
        DRIBBBLE_CLIENT_ID,
        DRIBBBLE_CLIENT_SECRET,
        code,
        redirect_uri: `${DRIBBBLE_REDIRECT_URL}${serviceSlug}`,
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return data;
  };

  getDtoObject = async (
    userId: string,
    access_token: string,
    serviceId: string,
  ): Promise<BindsDto> => {
    const {
      data: { name },
    } = await this.httpService
      .get('https://api.dribbble.com/v2/user', { params: { access_token } })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return {
      name,
      token: access_token,
      service: { id: serviceId },
      user: { id: userId },
    };
  };
}
