import p from 'puppeteer';

const viewsWorker = async (url: string) => {
  const browser = await p.launch({
    headless: false,
    args: ['--proxy-server=45.132.129.135:56100'],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  );

  await page.goto('https://vk.com/');

  await page.authenticate({
    username: 'mQrAjEdg',
    password: '5sqt4VCY',
  });

  await page.waitForTimeout(2000);
  await page.close();
};

export default viewsWorker;
