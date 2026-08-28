import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const checkedTypes = ['quiz', 'fill', 'match', 'practice', 'video'];

function stepObjects(source) {
  const start = source.indexOf('steps: [');
  if (start < 0) throw new Error('Missing steps array.');

  const steps = [];
  let arrayDepth = 0;
  let objectDepth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') arrayDepth += 1;
    if (char === ']') {
      arrayDepth -= 1;
      if (arrayDepth === 0) break;
    }
    if (char === '{') {
      if (arrayDepth === 1 && objectDepth === 0) objectStart = index;
      objectDepth += 1;
    }
    if (char === '}') {
      objectDepth -= 1;
      if (arrayDepth === 1 && objectDepth === 0 && objectStart >= 0) {
        steps.push(source.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }
  return steps;
}

function quotedValues(source) {
  return [...source.matchAll(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g)]
    .map((match) => match[1] ?? match[2]);
}

function inspect(file) {
  const steps = stepObjects(readFileSync(file, 'utf8'));
  const counts = Object.fromEntries(checkedTypes.map((type) => [type, 0]));
  const answerKeys = [];

  for (const step of steps) {
    const type = step.match(/type:\s*'([^']+)'/)?.[1];
    if (type in counts) counts[type] += 1;

    const optionsMatch = step.match(/options:\s*\[([\s\S]*?)\]/);
    const options = optionsMatch ? quotedValues(optionsMatch[1]) : [];
    const correctMatch = step.match(/correct:\s*(\d+|"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)')/);

    if (type === 'quiz') {
      if (!correctMatch || !/^\d+$/.test(correctMatch[1])) {
        throw new Error(`${file}: quiz is missing a numeric correct index.`);
      }
      const correct = Number(correctMatch[1]);
      if (correct < 0 || correct >= options.length) {
        throw new Error(`${file}: quiz correct index ${correct} is outside ${options.length} options.`);
      }
      answerKeys.push(`quiz:${correct}`);
    }

    if (type === 'fill') {
      const correct = correctMatch?.[2] ?? correctMatch?.[3];
      if (!correct || !options.includes(correct)) {
        throw new Error(`${file}: fill correct value is not present in options.`);
      }
      answerKeys.push(`fill:${correct}`);
    }
  }
  return { counts, answerKeys };
}

for (let day = 1; day <= 7; day += 1) {
  const source = resolve(root, 'archive_v1', 'week1', `day${day}`, 'data.ts');
  const target = resolve(root, 'v3', 'week1', `day${day}`, 'data.ts');
  const sourceResult = inspect(source);
  const targetResult = inspect(target);
  for (const type of checkedTypes) {
    if (sourceResult.counts[type] !== targetResult.counts[type]) {
      throw new Error(`Day ${day} ${type} count differs: ${sourceResult.counts[type]} != ${targetResult.counts[type]}.`);
    }
  }
  if (JSON.stringify(sourceResult.answerKeys) !== JSON.stringify(targetResult.answerKeys)) {
    throw new Error(`Day ${day} correct indices or fill answers differ from the reviewed source.`);
  }
  console.log(`Day ${day}: ${JSON.stringify(targetResult.counts)}`);
}

console.log('Week 1 structure, correct-answer, and answer-validity checks passed.');
