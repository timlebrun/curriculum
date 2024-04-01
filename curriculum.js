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
  await page.pdf({ path: 'dist/curriculum.pdf', format: 'A4', pageRanges: '1' });

  console.log('Done !')
  await browser.close();
})();