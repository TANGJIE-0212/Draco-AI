import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROFILE_DIR = path.join(__dirname, '.nlm-profile'); // 专用自动化配置
fs.mkdirSync(PROFILE_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  userDataDir: PROFILE_DIR,
  defaultViewport: null,
  args: ['--start-maximized', '--disable-blink-features=AutomationControlled', '--no-first-run', '--no-default-browser-check'],
});

const page = (await browser.pages())[0] || await browser.newPage();
await page.goto('https://notebooklm.google.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const cmd = JSON.parse(body || '{}');
      let result;
      if (cmd.action === 'eval') result = await page.evaluate(cmd.code);
      else if (cmd.action === 'goto') { await page.goto(cmd.url, { waitUntil: 'networkidle2', timeout: 60000 }); result = page.url(); }
      else if (cmd.action === 'click') { await page.click(cmd.selector); result = 'clicked'; }
      else if (cmd.action === 'url') result = page.url();
      else if (cmd.action === 'title') result = await page.title();
      else if (cmd.action === 'wait') { await new Promise(r => setTimeout(r, cmd.ms || 1000)); result = 'waited'; }
      else if (cmd.action === 'type') { await page.type(cmd.selector, cmd.text, { delay: 5 }); result = 'typed'; }
      else if (cmd.action === 'screenshot') { await page.screenshot({ path: cmd.path || path.join(__dirname, 'nlm-shot.png') }); result = 'saved'; }
      else if (cmd.action === 'keyboard') { await page.keyboard.press(cmd.key); result = 'pressed'; }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, result }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
  });
});
server.listen(7788, () => fs.writeFileSync(path.join(__dirname, 'nlm-ready.flag'), 'ready'));
