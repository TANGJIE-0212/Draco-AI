import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptsRoot = path.join(repoRoot, 'scripts');

function cleanText(value = '') {
  return String(value)
    .replace(/\r\n/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[✅🏆🎉🐲🐉👋📖🎬🎯⏱️🧮]/g, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function stripQuestionPrefix(text = '') {
  return cleanText(text)
    .replace(/^\d+\.\s*/, '')
    .replace(/^【([^】]+)】\s*/, '$1：')
    .trim();
}

function propName(name) {
  if (!name) return '';
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText();
}

function objectToValue(node, sourceFile) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((el) => objectToValue(el, sourceFile));
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) result[propName(prop.name)] = objectToValue(prop.initializer, sourceFile);
    }
    return result;
  }
  return node.getText(sourceFile);
}

function readDayData(week, day) {
  const filePath = path.join(repoRoot, `week${week}`, `day${day}`, 'data.ts');
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let dayObject;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      dayObject = objectToValue(node.initializer, sourceFile);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (!dayObject) throw new Error(`Could not parse ${filePath}`);
  return { filePath, ...dayObject };
}

function answerFor(step) {
  if (step.type === 'quiz' || step.type === 'boss') {
    if (Array.isArray(step.options) && typeof step.correct === 'number') return step.options[step.correct];
    return step.correct ?? '';
  }
  if (step.type === 'fill') return step.correct ?? '';
  if (step.type === 'sort') return Array.isArray(step.items) ? step.items.join(' → ') : '';
  if (step.type === 'match') {
    return Array.isArray(step.pairs) ? step.pairs.map((p) => `${p.left} = ${p.right}`).join('；') : '';
  }
  return '';
}

function labelFor(step) {
  const labels = {
    quiz: '选择题',
    boss: 'Boss 题',
    fill: '填空题',
    match: '连线题',
    sort: '排序题',
    practice: '开放实战',
  };
  return labels[step.type] ?? step.type;
}

function coverageItems(dayData) {
  return (dayData.steps ?? [])
    .filter((step) => step.question || step.task)
    .map((step, index) => ({
      number: index + 1,
      type: step.type,
      label: labelFor(step),
      question: stripQuestionPrefix(step.question || step.task),
      answer: cleanText(answerFor(step)),
      rubric: cleanText(step.rubric || ''),
    }));
}

function introFromTheory(dayData) {
  const theory = (dayData.steps ?? []).find((step) => step.type === 'theory' && step.content)?.content || '';
  const firstSentence = cleanText(theory).split(/[。！？\n]/).find(Boolean) || dayData.title;
  return firstSentence.length > 80 ? `${firstSentence.slice(0, 80)}...` : firstSentence;
}

function explainLine(item) {
  if (item.type === 'practice') {
    return `开放实战要讲清楚：${item.question} 评分时看这些点：${item.rubric || '结构完整、具体可执行、没有空话。'}`;
  }
  if (item.type === 'match') return `连线题要记成配对表：${item.answer}。`;
  if (item.type === 'sort') return `排序题的关键顺序是：${item.answer}。`;
  if (item.answer) return `当题目问「${item.question}」时，正确理解是：${item.answer}。`;
  return `要能用自己的话解释：${item.question}。`;
}

function chunk(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function weekTheme(week) {
  return {
    1: 'AI 基础原理',
    2: 'Prompt 工程',
    3: 'AI 实际应用',
    4: '多模态能力',
    5: 'RAG 与知识库',
    6: 'AI 自动化',
    7: 'AI 产品落地',
  }[week];
}

function generateMarkdown(week, day, dayData) {
  const items = coverageItems(dayData);
  const title = cleanText(dayData.title).replace(/^Day \d+:\s*/, '');
  const blocks = chunk(items, 4);
  const minutes = Math.max(4, Math.min(10, Math.ceil(items.length / 3) + 2));
  const lines = [];

  lines.push(`# Week ${week} Day ${day}：${title}`);
  lines.push('');
  lines.push(`⏱️ 时长：约 ${minutes}-${minutes + 2} 分钟 | 适用：NotebookLM 视频生成 / PPT 讲解`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 🎬 开场（10-20 秒）');
  lines.push('');
  lines.push(`今天我们讲 ${weekTheme(week)} 里的「${title}」。这一课不要死记硬背，先抓住一个小白也能懂的主线：${introFromTheory(dayData)}。`);
  lines.push('');
  lines.push(`这支视频必须覆盖当天所有题目，一共 ${items.length} 个考点。看完以后，你不仅知道答案，还能说出为什么。`);
  lines.push('');
  lines.push('## 📖 主体讲稿');
  lines.push('');
  lines.push('### Slide 1 — 先建立今天的直觉');
  lines.push('');
  lines.push(`把今天的内容想成一个工具箱。遇到题目时，先问三件事：它在解决什么问题？输入是什么？输出应该长什么样？只要这三件事想清楚，选择题、连线题和开放实战题都会变简单。`);
  lines.push('');

  blocks.forEach((block, blockIndex) => {
    lines.push(`### Slide ${blockIndex + 2} — 考点 ${block[0].number}-${block[block.length - 1].number}：逐题白话拆解`);
    lines.push('');
    for (const item of block) {
      lines.push(`- ${explainLine(item)}`);
    }
    lines.push('');
    lines.push('讲的时候提醒学员：不要只背关键词，要把关键词放回真实场景里。题目一换皮，场景理解才是拿分关键。');
    lines.push('');
  });

  lines.push(`### Slide ${blocks.length + 2} — 小白最容易混淆的点`);
  lines.push('');
  lines.push('- 如果题目问“概念”，先给一句人话定义，再补英文术语。');
  lines.push('- 如果题目问“场景”，先判断任务类型，再选工具或 Prompt 策略。');
  lines.push('- 如果题目问“Debug”，先找根因，不要直接堆更多功能。');
  lines.push('- 如果题目问“Boss 综合”，答案要有结构：目标、步骤、格式、边界、检查。');
  lines.push('');
  lines.push(`### Slide ${blocks.length + 3} — 本课实战模板`);
  lines.push('');
  const practice = items.find((item) => item.type === 'practice');
  if (practice) {
    lines.push(`今天的开放题是：${practice.question}`);
    lines.push('');
    lines.push('可以按这个模板来答：');
    lines.push('');
    lines.push('1. 先写清楚角色或目标。');
    lines.push('2. 再写输入是什么、处理步骤是什么。');
    lines.push('3. 明确输出格式，不要让 AI 自由发挥。');
    lines.push('4. 加上边界条件：不知道怎么办、失败怎么办、哪些不能做。');
    lines.push('5. 最后检查评分标准：结构完整、细节具体、能直接拿去用。');
  } else {
    lines.push('今天没有开放题，但 Boss 题一定要按“概念 → 场景 → 方法 → 检查”的顺序回答。');
  }
  lines.push('');
  lines.push('## ✅ 题目覆盖检查清单');
  lines.push('');
  for (const item of items) {
    const answer = item.answer ? `｜答案/要点：${item.answer}` : '';
    lines.push(`- ${item.number}. ${item.label}：${item.question}${answer}`);
  }
  lines.push('');
  lines.push('## 🎯 结尾（15 秒）');
  lines.push('');
  lines.push(`总结一下，${title} 的学习目标不是背题，而是把每个题目背后的判断逻辑装进脑子里。下一步，把检查清单里的每一条用自己的话复述一遍，能讲给别人听，就是真会了。`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function writeScript(week, day) {
  const dayData = readDayData(week, day);
  const outDir = path.join(scriptsRoot, `week${week}`);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `day${day}.md`);
  fs.writeFileSync(outFile, generateMarkdown(week, day, dayData), 'utf8');
  return outFile;
}

function writeIndex() {
  const rows = ['# Draco AI 视频脚本索引', '', '按顺序复制每一天脚本到 NotebookLM，生成对应课程视频。', '', '| Week | Day | 脚本 |', '| --- | --- | --- |'];
  for (let week = 1; week <= 7; week++) {
    for (let day = 1; day <= 7; day++) rows.push(`| ${week} | ${day} | [week${week}/day${day}.md](week${week}/day${day}.md) |`);
  }
  fs.writeFileSync(path.join(scriptsRoot, 'index.md'), `${rows.join('\n')}\n`, 'utf8');
}

function writeRunHelper() {
  const content = `param(\n    [string]$NotebookLmUrl = "https://notebooklm.google.com/"\n)\n\n$ErrorActionPreference = 'Stop'\n$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path\n\nfor ($week = 1; $week -le 7; $week++) {\n    for ($day = 1; $day -le 7; $day++) {\n        $file = Join-Path $ScriptRoot "week$week\\day$day.md"\n        if (-not (Test-Path $file)) {\n            Write-Warning "Missing: $file"\n            continue\n        }\n\n        $content = Get-Content $file -Raw -Encoding UTF8\n        Set-Clipboard -Value $content\n        Write-Host "Copied Week $week Day $day to clipboard: $file" -ForegroundColor Green\n        Start-Process $NotebookLmUrl\n        Read-Host "Paste into NotebookLM and generate the video, then press Enter for the next script"\n    }\n}\n\nWrite-Host "All scripts processed." -ForegroundColor Cyan\n`;
  fs.writeFileSync(path.join(scriptsRoot, 'run.ps1'), content, 'utf8');
}

const startWeek = Number(process.env.START_WEEK || '1');
const endWeek = Number(process.env.END_WEEK || '7');

const written = [];
for (let week = startWeek; week <= endWeek; week++) {
  for (let day = 1; day <= 7; day++) written.push(writeScript(week, day));
}
writeIndex();
writeRunHelper();

console.log(`Generated ${written.length} video scripts in ${scriptsRoot} (week ${startWeek}-${endWeek})`);