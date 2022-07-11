import { ConfigService } from '@nestjs/config';

import { writeFile } from 'fs/promises';
import { dirname } from 'path';
import p from 'puppeteer';

const getCookieAuth = async () => {
  const browser = await p.launch();
  const config = new ConfigService();

  const login = config.get('DRIBBBLE_AUTH_LOGIN');
  const pass = config.get('DRIBBBLE_AUTH_PASS');

  const page = await browser.newPage();

  await page.goto('https://dribbble.com/session/new');

  await page.type('input[id=login]', login);
  await page.type('input[id=password]', pass);

  await page.evaluate(() => {
    (document.querySelector('input[type=submit]') as HTMLButtonElement).click();
  });

  await page.waitForTimeout(5000);

  const cookies = await page.cookies();

  await browser.close();

  await writeFile(
    `${dirname(require.main.filename)}/cookies.json`,
    JSON.stringify(cookies, null, 2),
  );

  return true;
};

export default getCookieAuth;
