import puppeteer from 'puppeteer';
import path from 'node:path';
import http from 'node:http';

const CHROME_USER_DATA = path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'User Data');

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  userDataDir: CHROME_USER_DATA,
  defaultViewport: null,
  args: ['--start-maximized', '--disable-blink-features=AutomationControlled', '--no-first-run'],
});

const page = (await browser.pages())[0] || await browser.newPage();
await page.goto('https://notebooklm.google.com/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 4000));

// 一个简单的本地 HTTP 控制服务器，让我可以发指令驱动这个浏览器
const server = http.createServer(async (req, res) => {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const cmd = JSON.parse(body || '{}');
      let result;
      if (cmd.action === 'eval') {
        result = await page.evaluate(cmd.code);
      } else if (cmd.action === 'goto') {
        await page.goto(cmd.url, { waitUntil: 'networkidle2', timeout: 60000 });
        result = 'ok ' + page.url();
      } else if (cmd.action === 'click') {
        await page.click(cmd.selector);
        result = 'clicked';
      } else if (cmd.action === 'url') {
        result = page.url();
      } else if (cmd.action === 'screenshot') {
        const buf = await page.screenshot({ encoding: 'base64' });
        result = buf.slice(0, 50) + '...(base64 len ' + buf.length + ')';
      } else if (cmd.action === 'wait') {
        await new Promise(r => setTimeout(r, cmd.ms || 1000));
        result = 'waited';
      } else if (cmd.action === 'type') {
        await page.type(cmd.selector, cmd.text);
        result = 'typed';
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, result }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
  });
});
server.listen(7788, () => console.log('CONTROL_SERVER_READY on http://localhost:7788'));
console.log('PAGE_URL:', page.url());
