import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'docs', 'v3-course-review.html');
const imports = [];
const entries = [];

for (let week = 1; week <= 4; week += 1) {
  for (let day = 1; day <= 7; day += 1) {
    const name = `v3w${week}d${day}Data`;
    imports.push(`import { ${name} } from './v3/week${week}/day${day}/data.ts';`);
    entries.push(`{ week: ${week}, data: ${name} }`);
  }
}

const bundle = await build({
  stdin: {
    contents: `${imports.join('\n')}\nexport default [${entries.join(',')}];`,
    resolveDir: root,
    sourcefile: 'v3-review-entry.ts',
    loader: 'ts'
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  write: false
});

const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`;
const lessons = (await import(moduleUrl)).default;
const safeData = JSON.stringify(lessons).replaceAll('<', '\\u003c');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Draco AI V3 · 四周课程审阅</title>
  <style>
    :root { --ink:#182538; --muted:#667085; --paper:#f7f8f5; --line:#d9ded7; --green:#16794d; --green-bg:#e9f7ef; --orange:#ee6c45; --blue:#287fb8; --yellow:#fff3c9; --white:#fff; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; color:var(--ink); background:var(--paper); font-family:"Microsoft YaHei UI","Noto Sans SC",sans-serif; letter-spacing:0; }
    button,input,select { font:inherit; }
    .topbar { position:sticky; top:0; z-index:20; display:flex; align-items:center; gap:16px; padding:14px 22px; color:white; background:#19293e; box-shadow:0 2px 10px #0002; }
    .brand { min-width:max-content; font-weight:800; font-size:19px; }
    .brand span { color:#ff8a64; }
    .search { flex:1; min-width:180px; padding:10px 13px; border:1px solid #ffffff35; border-radius:6px; color:white; background:#ffffff12; outline:none; }
    .search::placeholder { color:#ffffffa8; }
    .filter { padding:10px; border:1px solid #ffffff35; border-radius:6px; color:white; background:#263b57; }
    .counter { min-width:max-content; color:#d9e2ee; font-size:13px; }
    .layout { display:grid; grid-template-columns:260px minmax(0,1fr); min-height:calc(100vh - 66px); }
    .sidebar { position:sticky; top:66px; height:calc(100vh - 66px); overflow:auto; padding:20px 14px 40px; border-right:1px solid var(--line); background:#eef1ed; }
    .week-nav { margin-bottom:22px; }
    .week-label { padding:6px 9px; color:var(--muted); font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
    .day-link { display:block; width:100%; margin:2px 0; padding:8px 9px; border:0; border-radius:5px; color:#344054; background:transparent; text-align:left; cursor:pointer; }
    .day-link:hover { background:#dfe7e0; }
    .day-link b { color:var(--ink); }
    main { width:min(1050px,100%); margin:0 auto; padding:36px 34px 100px; }
    .intro { margin-bottom:30px; padding-bottom:24px; border-bottom:3px solid var(--ink); }
    h1 { margin:0 0 8px; font-family:Georgia,"Microsoft YaHei UI",serif; font-size:34px; letter-spacing:0; }
    .intro p { margin:6px 0; color:var(--muted); }
    .legend { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
    .pill { padding:5px 9px; border:1px solid var(--line); border-radius:999px; background:white; font-size:12px; }
    .week-section { margin-top:52px; }
    .week-title { display:flex; align-items:center; gap:14px; margin:0 0 20px; font-size:27px; }
    .week-number { display:grid; width:42px; height:42px; place-items:center; border-radius:50%; color:white; background:var(--week-color); }
    details.day { margin:0 0 18px; border:1px solid var(--line); border-top:5px solid var(--week-color); border-radius:8px; background:white; overflow:hidden; }
    summary { display:flex; align-items:center; gap:14px; padding:17px 20px; cursor:pointer; list-style:none; }
    summary::-webkit-details-marker { display:none; }
    summary::after { content:"+"; margin-left:auto; color:var(--muted); font-size:22px; }
    details[open] summary::after { content:"−"; }
    .day-num { color:var(--week-color); font-weight:900; }
    .day-title { font-weight:800; }
    .day-meta { color:var(--muted); font-size:12px; }
    .steps { padding:0 20px 24px; border-top:1px solid #edf0ec; }
    .step { margin-top:16px; padding:16px; border:1px solid #e2e6e1; border-radius:7px; background:#fff; }
    .step.theory { border-left:4px solid var(--blue); background:#f4f9fc; }
    .step.video { border-left:4px solid #c13ca4; background:#fff7fd; }
    .step.practice { border-left:4px solid var(--orange); background:#fff8f4; }
    .step.match { border-left:4px solid #e5aa22; }
    .step-head { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
    .type { padding:3px 7px; border-radius:4px; color:white; background:#526171; font-size:11px; font-weight:800; }
    .qnum { color:var(--muted); font-size:12px; }
    .question { margin:0; font-size:16px; font-weight:700; line-height:1.7; white-space:pre-wrap; }
    .content { line-height:1.75; white-space:pre-wrap; }
    .options { display:grid; gap:7px; margin:12px 0 0; padding:0; list-style:none; }
    .option { display:flex; gap:9px; padding:9px 11px; border:1px solid #e3e6e2; border-radius:5px; background:#fafbf9; line-height:1.55; }
    .option.correct { border-color:#7ec69e; color:#0d653e; background:var(--green-bg); font-weight:700; }
    .letter { display:grid; flex:0 0 24px; height:24px; place-items:center; border-radius:50%; background:#e8ece8; font-size:12px; }
    .correct .letter { color:white; background:var(--green); }
    .answer { margin-top:12px; padding:10px 12px; border-left:4px solid var(--green); color:#0d653e; background:var(--green-bg); line-height:1.65; }
    .pairs { display:grid; grid-template-columns:1fr auto 1fr; gap:7px 10px; align-items:center; margin-top:12px; }
    .pair-side { padding:8px 10px; border:1px solid #e3e6e2; border-radius:5px; background:#fafbf9; }
    .arrow { color:#b07900; font-weight:800; }
    .rubric { margin-top:10px; padding:10px 12px; background:var(--yellow); line-height:1.65; }
    .empty { padding:40px; color:var(--muted); text-align:center; }
    mark { color:inherit; background:#ffe36e; }
    @media (max-width:800px) {
      .topbar { flex-wrap:wrap; padding:12px; }
      .brand { width:100%; }
      .counter { display:none; }
      .layout { display:block; }
      .sidebar { position:static; display:flex; height:auto; padding:8px; border:0; overflow:auto; }
      .week-nav { display:flex; margin:0 10px 0 0; min-width:max-content; }
      .week-label { align-self:center; }
      .day-link { min-width:max-content; }
      main { padding:24px 14px 70px; }
      h1 { font-size:27px; }
      .pairs { grid-template-columns:1fr; }
      .arrow { transform:rotate(90deg); text-align:center; }
    }
    @media print { .topbar,.sidebar { display:none; } .layout { display:block; } main { width:100%; padding:0; } details.day { break-inside:avoid; } details.day:not([open]) > *:not(summary) { display:block; } }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand">Draco AI <span>V3 Review</span></div>
    <input id="search" class="search" type="search" placeholder="搜索题目、理论或答案…">
    <select id="typeFilter" class="filter" aria-label="筛选内容类型">
      <option value="all">全部内容</option><option value="questions">只看题目</option><option value="quiz">选择题</option><option value="fill">填空题</option><option value="match">连线题</option><option value="practice">实践题</option><option value="theory">理论卡</option>
    </select>
    <div id="counter" class="counter"></div>
  </header>
  <div class="layout">
    <nav id="sidebar" class="sidebar"></nav>
    <main>
      <section class="intro">
        <h1>四周课程逐题审阅</h1>
        <p>所有答案已展开标注。点击某一天可折叠；搜索会自动展开命中内容。</p>
        <div class="legend"><span class="pill">绿色 = 正确答案</span><span class="pill">连线 = 正确配对</span><span class="pill">实践题 = 参考答案 + 评分标准</span></div>
      </section>
      <div id="course"></div>
    </main>
  </div>
  <script>const LESSONS=${safeData};</script>
  <script>
    const weekColors=['#ee6c45','#287fb8','#a92591','#1e8794'];
    const typeNames={theory:'理论卡',video:'视频',quiz:'选择题',fill:'填空题',match:'连线题',practice:'实践题',boss:'Boss'};
    const interactive=new Set(['quiz','fill','match','practice','boss']);
    const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const textOf=step=>[step.question,step.task,step.content,step.referenceAnswer,step.rubric,...(step.options||[]),...(step.pairs||[]).flatMap(pair=>[pair.left,pair.right])].join(' ').toLowerCase();
    function renderStep(step,index){
      let body='';
      const prompt=step.question||step.task||step.content||'';
      if(step.type==='theory'||step.type==='video') body='<div class="content">'+esc(step.content)+'</div>';
      else body='<p class="question">'+esc(prompt)+'</p>';
      if(step.options?.length){
        body+='<ol class="options">'+step.options.map((option,i)=>'<li class="option '+(i===step.correct||option===step.correct?'correct':'')+'"><span class="letter">'+letters[i]+'</span><span>'+esc(option)+(i===step.correct||option===step.correct?' ✓':'')+'</span></li>').join('')+'</ol>';
      }
      if(step.type==='fill') body+='<div class="answer"><b>正确答案：</b>'+esc(step.correct)+'</div>';
      if(step.type==='match') body+='<div class="pairs">'+(step.pairs||[]).map(pair=>'<div class="pair-side">'+esc(pair.left)+'</div><div class="arrow">→</div><div class="pair-side">'+esc(pair.right)+'</div>').join('')+'</div>';
      if(step.type==='practice'){
        body+='<div class="answer"><b>参考答案：</b>'+esc(step.referenceAnswer||'开放作答，无固定答案')+'</div>';
        if(step.rubric) body+='<div class="rubric"><b>评分标准：</b>'+esc(step.rubric)+'</div>';
      }
      if(step.type==='video'&&step.url) body+='<div class="answer"><b>视频地址：</b>'+esc(step.url)+'</div>';
      return '<article class="step '+esc(step.type)+'" data-type="'+esc(step.type)+'" data-search="'+esc(textOf(step))+'"><div class="step-head"><span class="type">'+esc(typeNames[step.type]||step.type)+'</span>'+(interactive.has(step.type)?'<span class="qnum">题目 '+index+'</span>':'')+'</div>'+body+'</article>';
    }
    function render(){
      const sidebar=document.querySelector('#sidebar');
      const course=document.querySelector('#course');
      sidebar.innerHTML=''; course.innerHTML='';
      for(let week=1;week<=4;week++){
        const days=LESSONS.filter(item=>item.week===week);
        const nav=document.createElement('div'); nav.className='week-nav';
        nav.innerHTML='<div class="week-label">第 '+week+' 周</div>'+days.map(({data})=>'<button class="day-link" data-target="week-'+week+'-day-'+data.day+'"><b>第 '+data.day+' 天</b> '+esc(data.title.replace(/^(?:Day|第)\s*\d+\s*(?:天)?[:：]?\s*/i,''))+'</button>').join('');
        sidebar.append(nav);
        const section=document.createElement('section'); section.className='week-section'; section.style.setProperty('--week-color',weekColors[week-1]);
        section.innerHTML='<h2 class="week-title"><span class="week-number">'+week+'</span>第 '+week+' 周</h2>';
        for(const {data} of days){
          let q=0; const stepHtml=data.steps.map(step=>renderStep(step,interactive.has(step.type)?++q:q)).join('');
          section.insertAdjacentHTML('beforeend','<details class="day" id="week-'+week+'-day-'+data.day+'" open><summary><span class="day-num">第 '+data.day+' 天</span><span class="day-title">'+esc(data.title)+'</span><span class="day-meta">'+q+' 题</span></summary><div class="steps">'+stepHtml+'</div></details>');
        }
        course.append(section);
      }
      sidebar.addEventListener('click',event=>{const button=event.target.closest('[data-target]');if(!button)return;const day=document.getElementById(button.dataset.target);day.open=true;day.scrollIntoView({behavior:'smooth',block:'start'});});
      applyFilter();
    }
    function applyFilter(){
      const query=document.querySelector('#search').value.trim().toLowerCase();
      const filter=document.querySelector('#typeFilter').value;
      let visible=0;
      document.querySelectorAll('.step').forEach(step=>{
        const type=step.dataset.type;
        const typeOk=filter==='all'||(filter==='questions'&&interactive.has(type))||type===filter;
        const searchOk=!query||step.dataset.search.includes(query);
        step.hidden=!(typeOk&&searchOk);
        if(!step.hidden&&interactive.has(type)) visible++;
      });
      document.querySelectorAll('details.day').forEach(day=>{const has=[...day.querySelectorAll('.step')].some(step=>!step.hidden);day.hidden=!has;if(query&&has)day.open=true;});
      document.querySelector('#counter').textContent='当前显示 '+visible+' 道题';
    }
    document.querySelector('#search').addEventListener('input',applyFilter);
    document.querySelector('#typeFilter').addEventListener('change',applyFilter);
    render();
  </script>
</body>
</html>`;

await mkdir(dirname(output), { recursive: true });
await writeFile(output, html, 'utf8');
console.log(`Generated ${pathToFileURL(output).href}`);
console.log(`Lessons: ${lessons.length}`);
console.log(`Interactive items: ${lessons.flatMap(item => item.data.steps).filter(step => ['quiz', 'fill', 'match', 'practice', 'boss'].includes(step.type)).length}`);