import { HttpException, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError } from 'rxjs';
import { DribbbleUserRo } from './types/ro/dribbble-user.ro';
import { BindsService } from 'src/binds/binds.service';

@Injectable()
export class DribbbleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly bindsService: BindsService,
  ) {}

  async authDribbble(code: string, serviceId: string) {
    const client_id = this.configService.get('CLIENT_ID');
    const client_secret = this.configService.get('CLIENT_SECRET');

    const { data } = await this.httpService
      .post<DribbbleUserRo>('https://dribbble.com/oauth/token', {
        client_id,
        client_secret,
        code,
        redirect_uri: `http://localhost:5000/api?service=${serviceId}`,
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return data;
  }

  async authDribbbleByUser(
    userId: string,
    access_token: string,
    service: string,
  ) {
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

    return await this.bindsService.create({
      name,
      token: access_token,
      service: { id: service },
      user: { id: userId },
    });
  }
}
