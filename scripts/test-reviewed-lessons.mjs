// Content/SSR regression only. This is not a rendered end-to-end journey.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const root=process.cwd();
const require=createRequire(import.meta.url);
async function moduleFrom(contents){
 const result=await build({stdin:{contents,resolveDir:root,loader:'tsx'},bundle:true,platform:'node',format:'cjs',packages:'external',write:false});
 const scope={module:{exports:{}},exports:{},require};
 vm.runInNewContext(result.outputFiles[0].text,scope);
 return scope.module.exports;
}
const {zh,en,fixes}=await moduleFrom("export {ALL_CURRICULUM as zh} from './curriculum'; export {ALL_CURRICULUM_EN as en} from './curriculum-en'; export {QUESTION_FIXES as fixes} from './course-fixes';");
const pairedDays=['1-6','3-1','3-2','3-3','3-4','3-5','3-6','3-7','4-1','4-2'];
for(const key of pairedDays){
 const [w,d]=key.split('-').map(Number);
 for(const lang of [zh,en]){
  const questions=lang[w][d-1].steps.filter(x=>['quiz','fill','match','practice'].includes(x.type));
  for(const [i,step]of questions.entries()){
   if(step.type==='practice')continue;
   assert(fixes[key]?.[i+1],`${key} Q${i+1} fell back to unpaired legacy content`);
   if(step.options)assert(step.explanation,`${key} Q${i+1} missing explanation`);
   if(step.type==='fill')assert.equal(step.parts.filter(x=>x==='___').length,1,`${key} Q${i+1} needs exactly one supported blank`);
  }
 }
}
for(let w=1;w<=4;w++)for(let d=0;d<7;d++){
 const labs=course=>course[w][d].steps.filter(x=>x.type==='interactive').map(x=>x.interactiveKind);
 assert.deepEqual(JSON.parse(JSON.stringify(labs(zh))),JSON.parse(JSON.stringify(labs(en))),`W${w}D${d+1}: bilingual lab-kind drift`);
}
for(const course of [zh,en]){
 const steps=course[1][5].steps;
 const firstRag=steps.find(x=>JSON.stringify(x).includes('RAG'));
 assert.equal(firstRag.type,'theory','RAG must be introduced before testing it');
 assert.match(firstRag.content,/Retrieval-Augmented Generation|retrieval-augmented generation/);
 assert.doesNotMatch(course[3][1].steps.at(-1).content,/脚本句|D1 script|旁白初稿/);
 const sampling=course[1][4].steps.filter(x=>x.type==='theory');
 assert.equal(sampling.length,5,'temperature lesson theory slots changed');
 assert.match(sampling.at(-1).content,/Logits ÷ Temperature → Softmax|logits ÷ temperature → Softmax/);
 assert.match(sampling[2].content,/概率幂变换|probability-power transformation/);
 const boss=course[1][6].steps.find(x=>x.type==='practice');
 assert.match(boss.task,/378[×]492/);
 assert.match(boss.referenceAnswer,/185976/);
 assert.match(boss.rubric,/可观察证据|observable evidence/);
 assert.doesNotMatch(boss.task,/画出|draw a/i);
 const assessed=day=>day.steps.filter(x=>['quiz','fill','match','practice'].includes(x.type));
 const promptBoss=assessed(course[2][6]);
 assert.match(promptBoss[7].question,/Examples/);
 assert.match(promptBoss[13].question,/测试集|additional tests/);
 const memory=assessed(course[4][4]);
 assert.match(memory[5].question,/第 8 天|day 8/);
 assert.match(memory[9].question,/去年|last year/);
 assert.doesNotMatch(JSON.stringify(course),/不需要凭空|未布置的镜头包|unassigned shot|不审核(?:内容|作品质量)|not live AI grading/);
}
const appFiles=[path.join(root,'index.tsx')];
if(process.argv[2])appFiles.push(path.join(process.argv[2],'v4/App.tsx'));
let renders=0;
for(const file of appFiles){
 const source=fs.readFileSync(file,'utf8');
 const start=source.indexOf('  const InteractiveLab ='),end=source.indexOf('  const InlineText',start);
 assert(start>=0&&end>start);
 const lab=source.slice(start,end);
 for(const english of [false,true]){
  const {InteractiveLab}=await moduleFrom(`import React,{useState,useEffect} from 'react';
   import {concealedChoices,integerPercentages} from './miniprogram/course/learning-logic';
   import {BpeLab} from './web-sync/BpeLab';
   const IS_EN=${english};const tr=(zh,en)=>IS_EN?en:zh;
   const UI={interactive:tr('互动实验','Interactive lab')};const SoundSynth={play(){}};
   ${lab}
   export {InteractiveLab};`);
  for(const d of [1,3,4,5,6,7]){
   const step=(english?en:zh)[1][d-1].steps.find(x=>x.type==='interactive');
   const markup=renderToStaticMarkup(React.createElement(InteractiveLab,{step,onComplete(){}}));
   assert(markup.includes(step.interactiveTitle),`${file}: missing lab title`);
   if(english)assert(!/[\u4e00-\u9fff]/u.test(markup),`${file} D${d}: untranslated English lab UI`);
   if(d===3)assert.match(markup,english?/illustration, not a model measurement/:/教学示意，不是模型实测/);
   if(d===4)assert.match(markup,english?/illustrative, not model measurements/:/教学示意，不是模型实测/);
   renders++;
  }
 }
}
console.log(JSON.stringify({result:'PASS: reviewed-slot coverage, teaching prerequisites, bilingual lab kinds and SSR localization (not UI E2E)',pairedDays:pairedDays.length,labDays:28,ssrLabRenders:renders},null,2));
