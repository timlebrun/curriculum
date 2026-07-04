const puppeteer = require('puppeteer');
const { join } = require('path');

const curriculum = join(__dirname, 'src/index.html');

(async () => {
  console.log('Launching Headless Browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Loading template...');
  await page.goto('file:///' + curriculum, { waitUntil: 'networkidle2' });
  await page.waitForFunction(() => document.fonts.ready);

  console.log('Exporting as a PDF file...');
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.pdf({ path: 'dist/curriculum.pdf', width: '21cm', height: pageHeight, pageRanges: '1' });

  console.log('Done !')
  await browser.close();
})();