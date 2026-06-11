/**
 * notebooklm-auto.mjs
 * 自动为 Week 1 每天在 NotebookLM 创建 Notebook、上传素材、生成视频
 *
 * 使用方法：
 *   1. 先关闭你正在运行的 Chrome（重要！不能同时有两个 Chrome 用同一个 profile）
 *   2. node tools/notebooklm-auto.mjs
 *   3. 脚本会自动打开 Chrome（已登录状态）并逐天操作
 *   4. 每天的视频生成后台运行，你可以离开，等 30 分钟后回来查看
 *
 * 如果不想关闭 Chrome，可以用 --no-profile 参数：
 *   node tools/notebooklm-auto.mjs --no-profile
 *   （这样需要手动在新窗口里登录 Google）
 */

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const scriptsDir = path.join(repoRoot, 'video-scripts', 'week1');

const DAYS = [1, 2, 3, 4, 5, 6, 7];
const NOTEBOOKLM_URL = 'https://notebooklm.google.com/';
const CHROME_USER_DATA = path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'User Data');
const USE_PROFILE = !process.argv.includes('--no-profile');

// 语言与视觉风格配置（可在这里修改）
const VIDEO_LANGUAGE = '中文（简体）';
const VIDEO_FORMAT = 'Explainer'; // Brief / Explainer / Cinematic(英文限定)
const VIDEO_STYLE = 'Whiteboard';

// 等待工具
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForSelector(page, selector, timeout = 15000) {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}

async function pause(msg) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`\n⏸  ${msg}\n   按 Enter 继续...`, () => {
      rl.close();
      resolve();
    });
  });
}

async function readScript(day) {
  const filePath = path.join(scriptsDir, `day${day}.md`);
  if (!fs.existsSync(filePath)) throw new Error(`找不到文件: ${filePath}`);
  return fs.readFileSync(filePath, 'utf8');
}

async function createNotebook(page, day, content) {
  console.log(`\n📓 Day ${day}：创建 Notebook...`);

  // 点"新建 notebook"按钮
  await page.goto(NOTEBOOKLM_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // 寻找"新建"按钮（可能是图标或文字）
  const newBtnSelectors = [
    'button[aria-label*="new" i]',
    'button[aria-label*="新建" i]',
    'button[data-testid*="new"]',
    '[class*="new-notebook"]',
    'button:has-text("New notebook")',
  ];

  let clicked = false;
  for (const sel of newBtnSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 3000 });
      await page.click(sel);
      clicked = true;
      break;
    } catch { /* try next */ }
  }

  if (!clicked) {
    // 用更通用的方式找"新建"按钮
    clicked = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, [role="button"]')];
      const newBtn = btns.find(b => /new notebook|新建/i.test(b.textContent));
      if (newBtn) { newBtn.click(); return true; }
      return false;
    });
  }

  if (!clicked) {
    console.log('  ⚠️  找不到"新建"按钮，请手动点击"New notebook"后按 Enter');
    await pause('手动点击 New notebook');
  }

  await sleep(3000);

  // 等待进入 notebook 页面，寻找"添加 Source"区域
  console.log(`  📎 上传 Day ${day} 素材...`);

  // 找"添加文本/粘贴"按钮
  const addSourceSelectors = [
    'button[aria-label*="paste" i]',
    'button[aria-label*="text" i]',
    '[data-testid*="add-source"]',
    'button:has-text("Paste text")',
    'button:has-text("粘贴文本")',
  ];

  let sourceAdded = false;
  for (const sel of addSourceSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 3000 });
      await page.click(sel);
      sourceAdded = true;
      break;
    } catch { /* try next */ }
  }

  if (!sourceAdded) {
    sourceAdded = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, [role="button"]')];
      const btn = btns.find(b => /paste text|添加.*来源|add source|copied text/i.test(b.textContent));
      if (btn) { btn.click(); return true; }
      return false;
    });
  }

  if (!sourceAdded) {
    console.log('  ⚠️  找不到"粘贴文本"按钮，请手动点击并粘贴内容后按 Enter');
    // 把内容复制到剪贴板方便手动粘贴
    await page.evaluate((text) => navigator.clipboard.writeText(text).catch(() => {}), content);
    await pause('请手动添加文本来源并粘贴内容');
    return true;
  }

  await sleep(1500);

  // 在文本框里输入内容
  const textareaSelectors = ['textarea', '[contenteditable="true"]', '[role="textbox"]'];
  let typed = false;
  for (const sel of textareaSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 3000 });
      await page.click(sel);
      // 用 clipboard 方式粘贴，避免长文本逐字输入太慢
      await page.evaluate((text) => {
        const el = document.querySelector('textarea,[contenteditable="true"],[role="textbox"]');
        if (el) {
          el.focus();
          // 对 textarea 直接设置 value
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(el, text);
            el.dispatchEvent(new Event('input', { bubbles: true }));
          } else {
            el.textContent = text;
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      }, content);
      typed = true;
      break;
    } catch { /* try next */ }
  }

  if (!typed) {
    console.log('  ⚠️  无法自动输入内容，内容已复制到剪贴板，请手动 Ctrl+V 粘贴后按 Enter');
    await page.evaluate((text) => navigator.clipboard.writeText(text).catch(() => {}), content);
    await pause('请手动粘贴内容并点击确认');
    return true;
  }

  await sleep(1000);

  // 点"插入"或"确认"按钮
  const confirmSelectors = [
    'button[type="submit"]',
    'button:has-text("Insert")',
    'button:has-text("Add")',
    'button:has-text("插入")',
    'button:has-text("添加")',
  ];
  for (const sel of confirmSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 3000 });
      await page.click(sel);
      console.log('  ✅ 素材已添加');
      break;
    } catch { /* try next */ }
  }

  await sleep(3000);
  return true;
}

async function triggerVideoGeneration(page, day) {
  console.log(`  🎬 Day ${day}：触发 Video Overview 生成...`);

  // 在 Studio 面板找"Video Overview"
  const videoSelectors = [
    'button:has-text("Video Overview")',
    '[aria-label*="video" i]',
    '[data-testid*="video"]',
  ];

  let found = false;
  for (const sel of videoSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 5000 });
      await page.click(sel);
      found = true;
      break;
    } catch { /* try next */ }
  }

  if (!found) {
    found = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, [role="button"]')];
      const btn = btns.find(b => /video overview/i.test(b.textContent));
      if (btn) { btn.click(); return true; }
      return false;
    });
  }

  if (!found) {
    console.log(`  ⚠️  Day ${day}：找不到 Video Overview 按钮，请手动点击后按 Enter`);
    await pause('请手动点击 Video Overview');
  }

  await sleep(2000);

  // 尝试选择语言和格式（如果出现设置面板）
  await page.evaluate((lang, fmt) => {
    // 尝试找语言下拉或按钮
    const allEls = [...document.querySelectorAll('select, [role="option"], [role="listbox"] *')];
    const langEl = allEls.find(el => el.textContent?.includes(lang));
    if (langEl) langEl.click();
  }, VIDEO_LANGUAGE, VIDEO_FORMAT);

  await sleep(1000);

  // 点"Generate"
  const generateSelectors = [
    'button:has-text("Generate")',
    'button:has-text("生成")',
    'button[type="submit"]',
  ];
  for (const sel of generateSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 3000 });
      await page.click(sel);
      console.log(`  ✅ Day ${day}：Video 生成任务已提交（后台运行，最长 30 分钟）`);
      return;
    } catch { /* try next */ }
  }

  console.log(`  ⚠️  Day ${day}：请手动点击 Generate 按钮`);
  await pause('请手动点击 Generate');
}

async function main() {
  console.log('🐉 Draco AI · NotebookLM 自动化脚本');
  console.log('=====================================');

  if (USE_PROFILE) {
    console.log(`\n⚠️  重要：脚本将使用你的 Chrome 个人资料（保持登录状态）`);
    console.log(`   路径：${CHROME_USER_DATA}`);
    console.log(`   ❗ 请先关闭所有已打开的 Chrome 窗口，再按 Enter 继续`);
    await pause('确认已关闭 Chrome');
  }

  const browser = await puppeteer.launch({
    headless: false, // 可视化操作，方便观察
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: USE_PROFILE ? CHROME_USER_DATA : undefined,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-first-run',
    ],
  });

  const page = await browser.newPage();

  for (const day of DAYS) {
    const scriptPath = path.join(scriptsDir, `day${day}.md`);
    if (!fs.existsSync(scriptPath)) {
      console.log(`⚠️  跳过 Day ${day}：找不到 ${scriptPath}`);
      continue;
    }

    const content = fs.readFileSync(scriptPath, 'utf8');
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📅 处理 Week 1 Day ${day}`);

    try {
      await createNotebook(page, day, content);
      await triggerVideoGeneration(page, day);
      console.log(`  ⏳ Day ${day} 完成，等待 3 秒后处理下一天...`);
      await sleep(3000);
    } catch (err) {
      console.error(`  ❌ Day ${day} 出错：${err.message}`);
      await pause(`Day ${day} 遇到问题，请手动处理后按 Enter 继续`);
    }
  }

  console.log('\n🎉 全部 7 天提交完成！');
  console.log('   视频在 NotebookLM 后台生成中，最长约 30 分钟/个');
  console.log('   生成完成后可以在各 Notebook 的 Studio 面板里找到视频并下载分享链接');
  await pause('按 Enter 关闭浏览器');
  await browser.close();
}

main().catch(console.error);
