const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://instagram.com', {
    waitUntil: 'networkidle2'
  });
  await page.waitForSelector('input[name=username]');
  await page.type('input[name=username]', process.env.user);

  await page.waitForSelector('input[name=password]');
  await page.type('input[name=password]', process.env.pw);

  await page.click('[type="submit"]');
  await page.waitForNavigation();
  await page.goto(`https://instagram.com/${process.env.user}`, {
    waitUntil: 'networkidle2'
  });

  await page.click(`[href="/${process.env.user}/followers/"]`);
  await page.waitForSelector('div.isgrP');
    
  await page.evaluate(async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms));

    sayfa = document.querySelector('div.isgrP');
    sayfa.scrollTo(0, sayfa.scrollHeight);
    sayfaSonu = sayfa.scrollHeight;
    
    while (true) {
      son = sayfaSonu;
      await timer(1500);
      sayfa = document.querySelector('div.isgrP');
      sayfa.scrollTo(0, sayfa.scrollHeight);
      sayfaSonu = sayfa.scrollHeight;
      if (son === sayfaSonu) {
        break
      }
    };

    console.log('Infinite loop problem.');  // gotta fix here!
  });
  
  await page.evaluate(() => {
    let followers = [];
    let following = [];
    
    followers_div = document.querySelectorAll('a.FPmhX.notranslate._0imsa');
    console.log(followers_div);

    followers_div.forEach((f, i) => {
      followers.push(f.textContent);
      console.log(i, f.textContent);
    });

    console.log('Total follower count:', followers.length);
  });

  await page.waitForTimeout(1000 * 60 * 15);  // 15 min.
  await browser.close();
})();

