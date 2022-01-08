import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { DribbbleRo } from './types/ro/dribbble.ro';

@Injectable()
export class DribbbleService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<DribbbleRo[]> {
    const { data } = await this.httpService
      .get<DribbbleRo[]>('/shots')
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return data;
  }
}
