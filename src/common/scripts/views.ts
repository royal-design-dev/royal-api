import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import p from 'puppeteer';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { catchError } from 'rxjs';
// import {workerData} from 'worker_threads'

const viewsWorker = async (
  url: string,
  count: number,
  httpService: HttpService,
) => {
  const proxys = await httpService
    .get(
      'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    )
    .pipe(
      catchError((e) => {
        console.log(e);
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();

  const apis = proxys.data.split(/\r?\n/);

  console.log(
    await Promise.all(
      apis.slice(0, 50).map(async (api) => {
        console.log(api);
        const agent = await new HttpsProxyAgent(api);

        try {
          const { data } = await httpService
            .get('https://api.ipify.org/', {
              httpsAgent: agent,
            })
            .pipe(
              catchError((e) => {
                console.log(e);
                throw new HttpException(e.response.data, e.response.status);
              }),
            )
            .toPromise();

          return Promise.resolve(data);
        } catch (error) {
          console.log(error);
          return Promise.resolve(error);
        }
      }),
    ),
  );
  //   const agent = new HttpsProxyAgent('http://67.79.93.5:3128');

  //   console.log(data);
  //   console.log(
  //     await Promise.all(
  //       Array.from({ length: count }).map(async () => {
  //         try {
  //           const { data } = await httpService
  //             .get('https://api.ipify.org/', {
  //               proxy: {
  //                 host: '46.150.252.20:45214',
  //                 port: 56100,
  //                 protocol: 'http',
  //                 auth: { username: 'mQrAjEdg', password: '5sqt4VCY' },
  //               },
  //             })
  //             .pipe(
  //               catchError((e) => {
  //                 console.log(e);
  //                 throw new HttpException(e.response.data, e.response.status);
  //               }),
  //             )
  //             .toPromise();

  //           return Promise.resolve(data);
  //         } catch (error) {
  //           return Promise.resolve(error);
  //         }
  //       }),
  //     ),
  //   );
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
