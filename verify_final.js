import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/final_check.png', fullPage: true });
  await browser.close();
})();
