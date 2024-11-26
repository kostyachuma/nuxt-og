// import puppeteer from 'puppeteer';

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

interface QueryParams {
  title?: string;
  date?: string;
}

export default defineEventHandler(async (event) => {
  const query: QueryParams = getQuery(event);
  const title: string = query.title || '0';
  const date: string = query.date || new Date().toISOString();

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page= await browser.newPage();

  const origin = getRequestURL(event).origin;

  await page.goto(`${origin}/?title=${title}&date=${date}`, {
    waitUntil: 'networkidle2',
  });

  await page.setViewport({ width: 800, height: 420 });

  const screenshot = await page.screenshot();

  await browser.close();

  return screenshot;
});
