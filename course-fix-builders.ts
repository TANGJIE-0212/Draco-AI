import type { LessonStep } from './types';
export type Bilingual = [string, string];
export type Both = [LessonStep, LessonStep];
export const q = (question: Bilingual, options: Bilingual[], explanation: Bilingual, correct = 0): Both =>
  [0, 1].map(lang => ({ type: 'quiz', question: question[lang], options: options.map(option => option[lang]), correct, explanation: explanation[lang] })) as Both;
export const f = (question: Bilingual, options: Bilingual[], explanation: Bilingual): Both =>
  [0, 1].map(lang => ({ type: 'fill', question: question[lang], parts: question[lang].split('___').flatMap((part, i) => i ? ['___', part] : [part]), options: options.map(option => option[lang]), correct: options[0][lang], explanation: explanation[lang] })) as Both;
export const m = (question: Bilingual, pairs: [Bilingual, Bilingual][]): Both =>
  [0, 1].map(lang => ({ type: 'match', question: question[lang], pairs: pairs.map(([left,right]) => ({left:left[lang],right:right[lang]})) })) as Both;
export const p = (task: Bilingual, rubric: Bilingual, reference: Bilingual, requiresArtifact = false): Both =>
  [0, 1].map(lang => ({ type: 'practice', task: task[lang], rubric: rubric[lang], referenceAnswer: reference[lang], minLength: requiresArtifact ? 0 : 40, requiresArtifact,
    placeholder: requiresArtifact ? (lang ? 'Optional: add a note about your work or a change you made.' : '可以补充作品说明，或记录你做过的一次修改（选填）。') : (lang ? 'Write your result, evidence, and what you would improve.' : '写下你的结果、依据，以及可以改进的地方。') })) as Both;
export const t = (content: Bilingual): Both => content.map(value => ({type:'theory',content:value})) as Both;
