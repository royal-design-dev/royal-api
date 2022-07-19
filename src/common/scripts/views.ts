import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { performance } from 'perf_hooks';
import Axios from 'axios';

const viewsWorker = async (
  url: string,
  count: number,
  httpService: HttpService,
  configService: ConfigService,
) => {
  const proxys = await firstValueFrom(
    httpService.get(
      'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    ),
  );
  const apis = proxys.data.split(/\r?\n/);

  const successApi = [];

  for await (const api of apis) {
    if (successApi.length === count) break;

    const [host, port] = api.split(':');

    const agent = new HttpsProxyAgent(`http://${host}:${port}`);
    // const API_PROXYS = configService.get('API_PROXYS');
    // const agent = new HttpsProxyAgent(`http://${username}:${password}@${host}:${port}`);

    const start = performance.now();

    const cancelToken = Axios.CancelToken.source();

    setTimeout(() => {
      cancelToken.cancel();
    }, 2000);

    await firstValueFrom(
      httpService.get(url, {
        httpsAgent: agent,
        cancelToken: cancelToken.token,
      }),
    )
      .then(() => {
        console.log('ok', host);
        successApi.push(`${host}:${port}`);
      })
      .catch(() => {
        console.log('no ok', host);
      })
      .finally(() => console.log(performance.now() - start));
  }

  console.log(successApi);
};

export default viewsWorker;
