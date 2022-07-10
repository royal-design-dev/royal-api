import p from 'puppeteer';

const viewsWorker = async (url: string) => {
  const browser = await p.launch({
    args: [
      '--proxy-server=http://46.150.252.20:45214',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  await page.authenticate({
    username: 'mQrAjEdg',
    password: '5sqt4VCY',
  });

  await page.goto(url);

  await page.waitForTimeout(2000);
  await page.close();
};

export default viewsWorker;
