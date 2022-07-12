import p from 'puppeteer';

import { readFile } from 'fs/promises';
import { dirname } from 'path';

const performDrbLikeChecker = async ({
  url,
  checkId,
}: {
  url: string;
  checkId: string;
}) => {
  const cookies = await readFile(
    `${dirname(require.main.filename)}/cookies.json`,
    {
      encoding: 'utf-8',
    },
  );

  const browser = await p.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setCookie(...JSON.parse(cookies));
  await page.goto(url);

  await page.evaluate(() => {
    (
      document.querySelector(
        'button[data-original-title="Feedback"]',
      ) as HTMLButtonElement
    ).click();
  });

  const currentLike = await page.$(`img[data-id="${checkId}"]`);

  await browser.close();

  return !!currentLike;
};

export default performDrbLikeChecker;
