import assert from 'node:assert/strict';
import vm from 'node:vm';
import { build } from 'esbuild';
const compiled = await build({entryPoints:['miniprogram/course/practice-drafts.ts'],bundle:true,format:'cjs',platform:'node',write:false});
const scope = {module:{exports:{}},exports:{}};
vm.runInNewContext(compiled.outputFiles[0].text,scope);
const {createDraftStore} = scope.module.exports;
const values = new Map();
let failRead=false, failWrite=false, truncate=false;
const storage = {
  read(key){if(failRead)throw Error('read'); return values.get(key);},
  write(key,value){if(failWrite)throw Error('quota'); values.set(key,truncate?{...value,text:'lost'}:structuredClone(value));},
};
let drafts=createDraftStore(storage);
const id='zh:4-7:practice:0';
assert.equal(drafts.read(id).text,'');
assert(drafts.write(id,'独立答案\n第二行'));
drafts=createDraftStore(storage);
assert.equal(drafts.read(id).text,'独立答案\n第二行');
for(const other of ['en:4-7:practice:0','zh:4-6:practice:0','zh:4-7:practice:1'])assert.equal(drafts.read(other).text,'');
assert.deepEqual(Object.keys(values.values().next().value).sort(),['text','version'],'No approval/completion flags may persist');
failWrite=true;assert(!drafts.write(id,'new'));failWrite=false;
assert.equal(drafts.read(id).text,'独立答案\n第二行');
failRead=true;assert(drafts.read(id).error);assert(!drafts.write(id,'readback fails'));failRead=false;
truncate=true;assert(!drafts.write(id,'uncorrupted'));truncate=false;
assert(!drafts.write(id,'x'.repeat(10001)));
assert(drafts.write(id,''));assert.equal(createDraftStore(storage).read(id).text,'');
values.set('draco-ai:practice-draft:v1:'+id,{version:1,text:27});assert(drafts.read(id).error);
console.log('PASS: text-only drafts, runtime restart, language/day/practice isolation, quota/read/readback/corrupt-data failures, length limit and clearing (storage adapter tests, not UI E2E).');
