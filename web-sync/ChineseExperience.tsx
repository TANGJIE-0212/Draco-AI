import React, { useEffect, useRef, useState } from 'react';
import glossary from './glossary-content';
import { studyOrder } from './study-order';
import { getMapLayout } from './map-route';
import { titleFontSource } from './title-font';
import { mapIcons } from './map-icons';
import { glossaryIcons } from './glossary-icons';
import { clouds, stars } from './map-decorations';
import { playWebEffect } from './audio';
import './chinese-experience.css';

export const studyEntries = studyOrder(glossary.entries);
type Entry = typeof studyEntries[number];
type Language = 'zh' | 'en';
const shuffle = <T,>(values: T[]) => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};
function useTitleFont() {
  useEffect(() => {
    const face = new FontFace('JingNanBubble', titleFontSource, { weight: '700' });
    face.load().then(font => document.fonts.add(font)).catch(() => {});
  }, []);
}

export function StudyCards({ onClose, language, returnFocus }: { onClose: () => void; language: Language; returnFocus?: React.RefObject<HTMLElement | null> }) {
  const tr = (zh: string, en: string) => language === 'en' ? en : zh;
  const otherLanguage = language === 'en' ? 'zh' : 'en';
  useTitleFont();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [quiz, setQuiz] = useState<{ entry: Entry; options: string[] } | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const studied = useRef(new Set<string>());
  const lock = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dialog = useRef<HTMLDivElement>(null);
  const frontAction = useRef<HTMLButtonElement>(null);
  const backAction = useRef<HTMLButtonElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const current = studyEntries[index];
  useEffect(() => {
    const prior = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dismiss = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    document.addEventListener('keydown', dismiss);
    dialog.current?.querySelector<HTMLButtonElement>('.study-close')?.focus();
    return () => { clearTimeout(timer.current); document.removeEventListener('keydown', dismiss); document.body.style.overflow = overflow; queueMicrotask(() => { const target = returnFocus?.current ?? prior; if (target?.isConnected) target.focus({ preventScroll: true }); }); };
  }, []);
  useEffect(() => { if (scroll.current) scroll.current.scrollTop = 0; }, [index, quiz]);
  useEffect(() => { if (quiz) dialog.current?.querySelector<HTMLButtonElement>('.study-quiz-back')?.focus(); }, [quiz]);
  const finishFlip = () => { clearTimeout(timer.current); lock.current = false; setBusy(false); };
  const move = (direction: number, focus = false) => {
    if (lock.current) return;
    setAnimated(false); setFlipped(false); setIndex(value => (value + direction + studyEntries.length) % studyEntries.length);
    playWebEffect('correct');
    if (focus) requestAnimationFrame(() => frontAction.current?.focus({ preventScroll: true }));
  };
  const flip = () => {
    if (lock.current || flipped) return;
    studied.current.add(current.id); lock.current = true; setBusy(true); setAnimated(true); setFlipped(true); playWebEffect('correct');
    timer.current = setTimeout(() => { finishFlip(); requestAnimationFrame(() => backAction.current?.focus({ preventScroll: true })); }, 440);
  };
  const startQuiz = () => {
    finishFlip();
    const pool = studyEntries.filter(item => studied.current.has(item.id));
    const entry = pool.length ? pool[Math.floor(Math.random() * pool.length)] : current;
    const choices = (items: Entry[]) => [...new Set(items.filter(item => item.id !== entry.id && item[language].definition !== entry[language].definition).map(item => item[language].definition))];
    let distractors = choices(pool);
    if (distractors.length < 2) distractors = choices(studyEntries);
    setQuiz({ entry, options: shuffle([entry[language].definition, ...shuffle(distractors).slice(0, 2)]) }); setAnswer(null);
    dialog.current?.scrollTo({ top: 0 });
  };
  const backToCards = () => {
    setQuiz(null); setAnswer(null); setAnimated(false); setFlipped(false);
    requestAnimationFrame(() => frontAction.current?.focus({ preventScroll: true }));
  };
  return <div ref={dialog} className="study-dialog" lang={language} role="dialog" aria-modal="true" aria-labelledby="study-title" onKeyDown={event => {
    if (event.key === 'Tab') {
      const controls = [...(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [tabindex="0"]') || [])];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}>
    <div className="study-inner">
      <header className="study-header"><h2 id="study-title">{tr("AI 名词本", "AI Glossary")}</h2><button className="study-close" onClick={onClose} aria-label={tr("关闭名词本", "Close glossary")}><img src={glossaryIcons.close} alt=""/></button></header>
      {!quiz ? <>
        <p className="study-category">{glossary.categories[current.category][language]}</p>
        <div className={`study-card ${flipped ? 'is-flipped' : ''}`}>
          <div className={`study-flipper ${animated ? 'is-animated' : ''}`} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === 'transform') { finishFlip(); backAction.current?.focus({ preventScroll: true }); } }}>
            <section className="study-face study-front" aria-hidden={flipped}>
              <div className="study-question"><h3>{current[language].term}</h3><p className="study-other">{current[otherLanguage].term}</p></div>
              <button ref={frontAction} className="study-action" disabled={flipped || busy} onClick={flip} aria-label={tr("翻翻看，翻转查看定义", "Flip the card to reveal the definition")}>{tr("翻翻看", "Flip it!")}</button>
            </section>
            <section className="study-face study-back" aria-hidden={!flipped}>
              <div ref={scroll} className="study-definition-scroll" tabIndex={flipped ? 0 : -1} aria-label={tr("定义和例子，可滚动阅读", "Definition and example, scroll to read")}>
                <h3>{current[language].term}</h3><p className="study-other">{current[otherLanguage].term}</p>
                <h4>{tr("定义：", "Definition:")}</h4><p className="study-definition">{current[language].definition}</p>
                <p className="study-example"><img src={glossaryIcons.bulb} alt=""/>{current[language].example}</p>
              </div>
              <button ref={backAction} className="study-action" disabled={!flipped || busy} onClick={() => move(1, true)}>{tr("下一个", "Next")}</button>
            </section>
          </div>
        </div>
        <nav className="study-pager" aria-label={tr("切换学习卡", "Browse study cards")}><button disabled={busy} onClick={() => move(-1)} aria-label={tr("上一个术语", "Previous term")}><img src={glossaryIcons.previous} alt=""/></button><span aria-live="polite">{index + 1} / {studyEntries.length}</span><button disabled={busy} onClick={() => move(1)} aria-label={tr("下一个术语", "Next term")}><img className="study-next-icon" src={glossaryIcons.previous} alt=""/></button></nav>
        <div className="study-review"><button className="study-test" onClick={startQuiz}>{tr("测一测", "Test yourself")}</button></div>
      </> : <section className="study-quiz">
        <button className="study-quiz-back" onClick={backToCards}>{tr("返回学习卡", "Back to cards")}</button>
        <h3>{tr("哪个定义对应这个术语？", "Which definition matches this term?")}</h3><p className="study-quiz-term">{quiz.entry[language].term}</p>
        <div className="study-options">{quiz.options.map(option => <button key={option} aria-disabled={answer !== null} className={answer !== null && option === quiz.entry[language].definition ? 'is-correct' : ''} onClick={() => { if (answer !== null) return; setAnswer(option); playWebEffect(option === quiz.entry[language].definition ? 'correct' : 'wrong'); }}>{option}</button>)}</div>
        {answer !== null && <div className={`study-feedback ${answer === quiz.entry[language].definition ? 'is-correct' : 'is-wrong'}`}><h4 role="status">{answer === quiz.entry[language].definition ? tr('太棒了！你答对了', 'Great job!') : tr('没关系，再复习一下吧', 'No worries, let’s review')}</h4><p>{tr('定义：', 'Definition: ')}{quiz.entry[language].definition}</p><button className="study-another" onClick={startQuiz}>{tr("再来一题", "Try another")}</button></div>}
      </section>}
    </div>
  </div>;
}

type Week = { id: number; title: string; icon: string };
export function WorldMap({ language, weeks, unlockedWeek, completed, onWeek, onGlossary, error }: { language: Language; weeks: Week[]; unlockedWeek: number; completed: Record<number, number>; onWeek: (week: number) => void; onGlossary: () => void; error: string | null }) {
  useTitleFont();
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => { const resize = () => setHeight(window.innerHeight); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
  const layout = getMapLayout(height, 16, 24);
  const tr = (zh: string, en: string) => language === 'en' ? en : zh;
  return <main className="cn-world" lang={language}>
    <div className="cn-map-grid" aria-hidden="true"/><div className="cn-terrain terrain-one" aria-hidden="true"/><div className="cn-terrain terrain-two" aria-hidden="true"/><div className="cn-terrain terrain-three" aria-hidden="true"/>
    {clouds.map(item => <img key={item.top} className="cn-cloud" src={mapIcons.cloud} alt="" style={{ top: `${item.top}%`, left: `${item.left}%`, width: item.size, height: item.size, opacity: item.opacity, animationDuration: `${item.duration}s`, animationDelay: `${item.delay}s` }}/ >)}
    {stars.map(item => <img key={item.top} className="cn-star" src={mapIcons.star} alt="" style={{ top: `${item.top}%`, left: `${item.left}%`, width: item.size, height: item.size, opacity: item.opacity, animationDelay: `${item.delay}s` }}/ >)}
    <header className="cn-map-header"><h1>{tr('AI 驯龙之路', 'Draco AI')}</h1><button onClick={() => { playWebEffect('map-tap'); onGlossary(); }}>{tr("AI 名词本", "AI Glossary")}</button></header>
    {error && <p role="alert" className="cn-progress-error">{error === 'invalid' ? tr('保存的进度无法读取，本次从第一周开始。', 'Saved progress could not be read. Starting at week 1.') : tr('浏览器无法保存进度，刷新后可能丢失本次进度。', 'Your browser cannot save progress. Refreshing may lose this session’s progress.')}</p>}
    <div className="cn-journey" style={{ paddingBottom: layout.bottomPadding }}>
      <img className="cn-route" src={layout.mapRoute} style={{ height: layout.routeHeight }} alt=""/>
      {weeks.map((week, index) => <div key={week.id} className={`cn-week-row ${index % 2 ? 'is-right' : ''}`} style={{ height: layout.rowHeight }}>
        <button className="cn-week-stop" disabled={week.id > unlockedWeek} onClick={() => onWeek(week.id)} aria-label={week.title}>
          <span className="cn-marker-ground" aria-hidden="true"/><span className="cn-week-marker"><img alt="" src={week.id > unlockedWeek ? mapIcons.lock : [mapIcons.house, mapIcons.wand, mapIcons.briefcase, mapIcons.robot][index]}/>{completed[week.id] >= 7 && <span className="cn-completed" aria-label={tr("已完成", "Completed")}>✓</span>}</span>
          <span className="cn-week-label">{week.title}</span>
        </button>
      </div>)}
    </div>
  </main>;
}

export function MapMusic({ active, scene, language }: { active: boolean; scene: string; language: Language }) {
  const tr = (zh: string, en: string) => language === 'en' ? en : zh;
  const [enabled, setEnabled] = useState(() => { try { return localStorage.getItem('draco-ai:web:map-music') !== 'false'; } catch { return true; } });
  const announced = useRef(new Set<string>());
  useEffect(() => {
    if (!active || announced.current.has(scene)) return;
    // Entry sounds wait for a gesture on browsers that block autoplay.
    let stop: (() => void) | undefined;
    const enter = () => {
      if (document.hidden || announced.current.has(scene)) return;
      announced.current.add(scene); stop = playWebEffect('map-enter');
      window.removeEventListener('pointerdown', enter);
      window.removeEventListener('keydown', enter);
    };
    if (navigator.userActivation?.hasBeenActive) enter();
    else { window.addEventListener('pointerdown', enter); window.addEventListener('keydown', enter); }
    return () => { stop?.(); window.removeEventListener('pointerdown', enter); window.removeEventListener('keydown', enter); };
  }, [active, scene]);
  useEffect(() => {
    if (!active || !enabled) return;
    const audio = new Audio(`${import.meta.env.BASE_URL}brand/map-loop.wav`);
    audio.loop = true; audio.volume = .16;
    const play = () => { if (!document.hidden) void audio.play().catch(() => {}); };
    const visibility = () => { if (document.hidden) audio.pause(); else play(); };
    play(); window.addEventListener('pointerdown', play); window.addEventListener('keydown', play); document.addEventListener('visibilitychange', visibility);
    return () => { audio.pause(); audio.removeAttribute('src'); audio.load(); window.removeEventListener('pointerdown', play); window.removeEventListener('keydown', play); document.removeEventListener('visibilitychange', visibility); };
  }, [active, enabled]);
  if (!active) return null;
  return <button className={`cn-music ${enabled ? '' : 'is-muted'}`} aria-label={enabled ? tr('关闭地图音乐', 'Turn map music off') : tr('开启地图音乐', 'Turn map music on')} aria-pressed={enabled} onClick={() => setEnabled(value => { try { localStorage.setItem('draco-ai:web:map-music', String(!value)); } catch {} return !value; })}>♫</button>;
}
