import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const cache = new Map();
function load(name, globals = {}) {
  const filename = path.resolve(root, name);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const source = fs.readFileSync(filename, 'utf8').replaceAll('import.meta.env.BASE_URL', "'/draco-ai/'");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports, require: name => load(path.relative(root, path.resolve(path.dirname(filename), name + '.ts'))), ...globals });
  return exports;
}

const hasNative = fs.existsSync(path.join(root, 'miniprogram/pages/map/map.ts'));
if (process.argv.includes('--require-native')) assert.ok(hasNative, 'WeChat baseline required');
if (hasNative) {
for (const name of ['map-icons', 'glossary-icons', 'map-route', 'title-font']) {
  assert.equal(read(`web-sync/${name}.ts`), read(`miniprogram/utils/${name}.ts`), `${name} must match WeChat`);
}
assert.equal(read('web-sync/study-order.ts'), read('miniprogram/extras/study-order.ts'));
for (const name of ['map-loop', 'map-enter', 'map-tap', 'correct', 'wrong', 'complete']) {
  assert.deepEqual(fs.readFileSync(path.join(root, `public/brand/${name}.wav`)), fs.readFileSync(path.join(root, `miniprogram/assets/audio/${name}.wav`)));
}
const nativeMap = read('miniprogram/pages/map/map.ts');
const { clouds, stars } = load('web-sync/map-decorations.ts');
for (const [key, data] of Object.entries({ clouds, stars })) {
  const literal = nativeMap.match(new RegExp(`${key}: (\\[[\\s\\S]*?\\n    \\]),`))[1];
  assert.equal(JSON.stringify(data), JSON.stringify(vm.runInNewContext(literal)), `${key} animation settings`);
}
}
const glossary = load('web-sync/glossary-content.ts').default;
const { studyOrder } = load('web-sync/study-order.ts');
const ordered = studyOrder(glossary.entries);
assert.equal(ordered.length, 103);
assert.equal(new Set(ordered.map(e => e.id)).size, 103);
assert.match(ordered[0].zh.term, /Token/);
assert.ok(new Set(ordered.slice(0, 8).map(e => e.category)).size >= 6);
assert.equal(JSON.stringify(studyOrder(glossary.entries)), JSON.stringify(ordered), 'stable interleaving');
for (const id of ['gpt-four', 'chatgpt', 'deepmind', 'openai', 'tensorflow']) assert.ok(!ordered.some(e => e.id === id));
for (const id of ['reasoning-model', 'system-prompt', 'model-evaluation', 'data-privacy', 'training-framework']) assert.ok(ordered.some(e => e.id === id));

const css = read('web-sync/chinese-experience.css');
assert.match(css, /width:70vw; max-width:100%; height:440px; max-height:52vh; min-height:360px/);
assert.match(css, /transition:transform \.42s cubic-bezier/);
assert.match(css, /padding:32px 28px/);
assert.match(css, /prefers-reduced-motion:reduce/);
assert.match(css, /\.cn-cloud,\.cn-star \{ animation:none/);
const app = read('index.tsx');
assert.match(app, /showGlossary && <StudyCards language=\{IS_EN \? 'en' : 'zh'\}/);
assert.match(app, /view === 'world' && <WorldMap language=\{IS_EN \? 'en' : 'zh'\}/);
assert.match(app, /<MapMusic language=\{IS_EN \? 'en' : 'zh'\}/);
assert.doesNotMatch(app, /view === 'world' && IS_EN/);
assert.doesNotMatch(app, /createOscillator/);
assert.match(app, /scene=\{view === 'week'/);

// Execute the actual Continue handler through ordinary, review and completion paths.
const ast = ts.createSourceFile('index.tsx', app, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let continueHandler;
function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'handleContinue') continueHandler = node.initializer.getText(ast);
  ts.forEachChild(node, visit);
}
visit(ast);
assert.ok(continueHandler);
for (const mode of ['ordinary', 'review', 'complete']) {
  const state = { stepIndex: mode === 'ordinary' ? 0 : 1, steps: [{}, {}], mistakes: mode === 'review' ? [{}] : [], isReviewMode: false, completed: false };
  vm.runInNewContext(`(${continueHandler})()`, {
    ...state,
    SoundSynth: { play: () => assert.fail('Continue must not play an extra cue') },
    setStepIndex: value => state.stepIndex = typeof value === 'function' ? value(state.stepIndex) : value,
    setSteps: value => state.steps = value,
    setMistakes: value => state.mistakes = value,
    setIsReviewMode: value => state.isReviewMode = value,
    onComplete: () => state.completed = true,
  });
  if (mode === 'ordinary') assert.equal(state.stepIndex, 1);
  if (mode === 'review') { assert.equal(state.isReviewMode, true); assert.equal(state.stepIndex, 0); }
  if (mode === 'complete') assert.equal(state.completed, true);
}
assert.match(app, /const handleLessonComplete = \(\) => \{\s+SoundSynth.play\('complete'\)/);
assert.match(app, /if \(correct\) SoundSynth.play\('correct'\)/);
assert.match(app, /SoundSynth.play\('wrong'\)/);

// Render the same components in both languages; hidden backs must also be localized.
const renderedModule = { exports: {} };
const bundled = buildSync({ entryPoints: [path.join(root, 'web-sync/ChineseExperience.tsx')], bundle: true, write: false, format: 'cjs', platform: 'node', external: ['react'], loader: { '.css': 'empty' }, define: { 'import.meta.env.BASE_URL': '"/draco-ai/"' } }).outputFiles[0].text;
vm.runInNewContext(bundled, { module: renderedModule, exports: renderedModule.exports, require: createRequire(import.meta.url), window: { innerHeight: 844 } });
for (const language of ['zh', 'en']) {
  const cards = renderToStaticMarkup(React.createElement(renderedModule.exports.StudyCards, { language, onClose() {} }));
  assert.ok(cards.includes(ordered[0][language].term));
  assert.ok(cards.includes(ordered[0][language].definition));
  assert.ok(cards.includes(language === 'en' ? 'Flip it!' : '翻翻看'));
  assert.ok(cards.includes(language === 'en' ? 'Test yourself' : '测一测'));
  const world = renderToStaticMarkup(React.createElement(renderedModule.exports.WorldMap, { language, weeks: [1,2,3,4].map(id => ({ id, title: `Week ${id}` })), unlockedWeek: 1, completed: {}, error: null, onWeek() {}, onGlossary() {} }));
  assert.equal((world.match(/class="cn-week-stop"/g) || []).length, 4);
  assert.ok(world.includes(language === 'en' ? 'AI Glossary' : 'AI 名词本'));
}
const studySource = read('web-sync/ChineseExperience.tsx');
assert.match(studySource, /entry\[language\]\.definition/);
assert.doesNotMatch(studySource, /(?:current|entry|item)\.zh\.(?:term|definition|example)/);
for (const name of fs.readdirSync(path.join(root, 'web-sync')).filter(n => /\.tsx?$/.test(n))) {
  assert.doesNotMatch(read(`web-sync/${name}`), /from ['"][^'"]*miniprogram/, 'web build must not import native runtime');
}

const audios = [], listeners = new Map();
class FakeAudio {
  constructor(src) { this.src = src; audios.push(this); }
  play() { return Promise.resolve(); }
  pause() { this.paused = true; }
  removeAttribute(key) { delete this[key]; }
  load() { this.released = true; }
}
const document = { hidden: false, addEventListener: (key, fn) => listeners.set(fn, key), removeEventListener: (_, fn) => listeners.delete(fn) };
const { playWebEffect } = load('web-sync/audio.ts', { Audio: FakeAudio, document });
const stop = playWebEffect('map-enter');
assert.equal(audios[0].src, '/draco-ai/brand/map-enter.wav');
assert.equal(audios[0].volume, .32);
stop(); stop(); assert.ok(audios[0].released); assert.equal(listeners.size, 0);
playWebEffect('correct'); assert.equal(audios[1].volume, .45);
document.hidden = true; [...listeners.keys()].forEach(fn => fn());
assert.ok(audios[1].paused); assert.equal(listeners.size, 0);
playWebEffect('wrong'); audios[2].onerror(); assert.ok(audios[2].released);
console.log('PASS V3 sync: 103 curated/interleaved cards, bilingual shared rendering, fixed flip layout, silent Continue, audio disposal.');
console.log(hasNative ? 'PASS native parity: icons, 12 decorations, six WAVs, route, font and ordering.' : 'Native parity checks skipped in web-only checkout (use --require-native in handoff workspace).');
