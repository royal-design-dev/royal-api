import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DribbbleShot, DribbbleUserRo } from './types/ro/dribbble-token.ro';

import { catchError } from 'rxjs';
import { BindsDto } from './types/dto/binds.dto';

@Injectable()
export class DribbbleService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getToken = async (code: string, serviceSlug: string) => {
    const client_id = this.configService.get('DRIBBBLE_CLIENT_ID');
    const client_secret = this.configService.get('DRIBBBLE_CLIENT_SECRET');
    const DRIBBBLE_REDIRECT_URL = this.configService.get(
      'DRIBBBLE_REDIRECT_URL',
    );

    const response = await this.httpService
      .post<DribbbleUserRo>('https://dribbble.com/oauth/token', {
        client_id,
        client_secret,
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

    return response?.data;
  };

  getDtoObject = async (
    userId: string,
    access_token: string,
    serviceId: string,
  ): Promise<BindsDto> => {
    const {
      data: { name, avatar_url, id },
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
      picture: avatar_url,
      token: access_token,
      service: { id: serviceId },
      user: { id: userId },
      userServiceId: id,
    };
  };

  getMyShotByUrl = async (shotUrl: string, access_token: string) => {
    const api = this.configService.get('DRIBBBLE_API');

    const shotId = shotUrl.split('/').pop().split('-')[0];

    const { data } = await this.httpService
      .get<DribbbleShot>(`${api}/shots/${shotId}`, {
        params: { access_token },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return data;
  };
}
