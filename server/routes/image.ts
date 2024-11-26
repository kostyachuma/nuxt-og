import puppeteer from 'puppeteer';

interface QueryParams {
  title?: string;
  date?: string;
}

export default defineEventHandler(async (event) => {
  const query: QueryParams = getQuery(event);
  const title: string = query.title || '0';
  const date: string = query.date || new Date().toISOString();

  const browser = await puppeteer.launch();
  const page= await browser.newPage();

  await page.goto(`http://localhost:3000/?title=${title}&date=${date}`, {
    waitUntil: 'networkidle2',
  });

  await page.setViewport({ width: 800, height: 420 });

  const screenshot = await page.screenshot();

  await browser.close();

  return screenshot;
});
