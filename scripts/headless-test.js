const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const downloadPath = path.join(__dirname, '..', 'tmp', 'downloads');
  await fs.promises.mkdir(downloadPath, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Enable downloads in chromium
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath });

  const url = 'http://localhost:3000/dev/test-report';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for the download button
  await page.waitForSelector('button', { timeout: 10000 });

  // Click the Télécharger button (first matching button with that text)
  const buttons = await page.$$('button');
  let downloadClicked = false;
  for (const btn of buttons) {
    const txt = await (await btn.getProperty('innerText')).jsonValue();
    if (txt && txt.toLowerCase().includes('télécharger')) {
      await btn.click();
      downloadClicked = true;
      break;
    }
  }

  if (!downloadClicked) {
    console.error('Download button not found');
    await browser.close();
    process.exit(1);
  }

  console.log('Clicked download, waiting for file...');
  // Wait for a new file to appear in download dir
  const timeout = 15000;
  const start = Date.now();
  let found = null;
  while (Date.now() - start < timeout) {
    const files = await fs.promises.readdir(downloadPath);
    if (files.length > 0) {
      found = files[0];
      break;
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  if (found) {
    console.log('Download succeeded:', found);
  } else {
    console.error('No download detected within timeout');
  }

  await browser.close();
  process.exit(found ? 0 : 2);
})();
