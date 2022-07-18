import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpsProxyAgent } from 'https-proxy-agent';

// import {workerData} from 'worker_threads'

const viewsWorker = async (
  url: string,
  count: number,
  httpService: HttpService,
  configService: ConfigService,
) => {
  const proxys = await httpService
    .get(
      'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    )
    .pipe(
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();

  const apis = proxys.data.split(/\r?\n/).slice(0, 100);

  const apisList = await Promise.all(
    apis.map(async (api) => {
      const [host, port] = api.split(':');
      const agent = await new HttpsProxyAgent(`http://${host}:${port}`);

      try {
        await httpService
          .get(url, {
            httpsAgent: agent,
          })
          .pipe(
            catchError((e) => {
              throw new HttpException(e.response.data, e.response.status);
            }),
          )
          .toPromise();

        console.log(api);

        return Promise.resolve(api);
      } catch (_) {
        console.log('error ', api);
        return Promise.resolve(null);
      }
    }),
  );

  console.log(apisList.filter(Boolean), apisList.filter(Boolean).length);
  // const API_PROXYS = configService.get('API_PROXYS');
  // const {
  //   data: { results: proxys },
  // } = await httpService
  //   .get(API_PROXYS)
  //   .pipe(
  //     catchError((e) => {
  //       console.log(e);
  //       throw new HttpException(e.response.data, e.response.status);
  //     }),
  //   )
  //   .toPromise();

  // console.log(
  //   await Promise.all(
  //     proxys.map(async ({ ip: host, username, password, port_http: port }) => {
  // const agent = new HttpsProxyAgent(
  //   `http://${username}:${password}@${host}:${port}`,
  // );

  //       try {
  //         await httpService.get(url, { httpsAgent: agent }).pipe(
  //           catchError((e) => {
  //             throw new HttpException(e.response.data, e.response.status);
  //           }),
  //         );

  //         return Promise.resolve(true);
  //       } catch (_) {
  //         return Promise.resolve(null);
  //       }
  //     }),
  //   ),
  // );
  // const browser = await p.launch({
  //   args: [
  //     '--proxy-server=http://46.150.252.20:45214',
  //     '--no-sandbox',
  //     '--disable-setuid-sandbox',
  //   ],
  // });
  // const page = await browser.newPage();
  // await page.authenticate({
  //   username: 'mQrAjEdg',
  //   password: '5sqt4VCY',
  // });
  // await page.goto(url);
  // await page.waitForNavigation({ waitUntil: 'load' });
  // await page.waitForTimeout(1000);
  // await page.close();
};

export default viewsWorker;
