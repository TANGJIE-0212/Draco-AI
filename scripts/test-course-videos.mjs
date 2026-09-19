// Verify generated media and subtitle provenance, not playback or human listening quality.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd();
const content=JSON.parse(fs.readFileSync('video/core-video-content.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('video/generated/core-video-manifest.json','utf8'));
const ids=['W3-Vision-ZH','W3-Vision-EN','W3-Generation-ZH','W3-Generation-EN','W4-Foundations-ZH','W4-Foundations-EN','W4-Safety-ZH','W4-Safety-EN'];
const normalize=text=>text.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'').toLowerCase();
const evidence=[];
for(const id of ids){
 const video=content.videos.find(x=>x.id===id);
 const timings=manifest[id];assert.equal(timings.length,video.scenes.length,id);
 let frames=0;
 for(const [index,scene]of video.scenes.entries()){
  const timing=timings[index];assert.equal(timing.id,scene.id);
  assert(timing.durationSeconds>0);frames+=Math.ceil((timing.durationSeconds+0.25)*15);
  assert(fs.statSync(path.join(root,'public',timing.audio)).size>0,`${id}: empty scene audio`);
  assert.equal(normalize(timing.cues.map(x=>x.text).join('')),normalize(scene.narration),`${id}/${scene.id}: stale subtitles`);
  let last=0;
  for(const cue of timing.cues){
   assert(cue.start>=last&&cue.end>cue.start&&cue.end<=timing.durationSeconds+0.2,`${id}: invalid subtitle timing`);
   last=cue.start;
  }
 }
 const file=process.argv[2]?path.join(process.argv[2],id+'.mp4'):path.join(root,'public/video',video.output);
 const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
 const picture=probe.streams.find(x=>x.codec_type==='video'),audio=probe.streams.find(x=>x.codec_type==='audio');
 assert(picture&&audio,`${id}: missing picture or audio`);
 assert.equal(picture.width,1920);assert.equal(picture.height,1080);
 assert.equal(picture.codec_name,'h264');assert.equal(audio.codec_name,'aac');
 assert(Math.abs(Number(probe.format.duration)-frames/15)<0.3,`${id}: duration drift`);
 assert(Number(probe.format.size)>10000);
 evidence.push({id,duration:Number(probe.format.duration),bytes:Number(probe.format.size),subtitleCues:timings.reduce((n,t)=>n+t.cues.length,0)});
}
console.log(JSON.stringify({result:'PASS: media streams, durations, current narration/subtitle text and timing; not playback/listening QA',videos:evidence},null,2));
