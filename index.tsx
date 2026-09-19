
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { WEEKS as WEEKS_ZH, ALL_CURRICULUM as CURRICULUM_ZH } from './curriculum';
import { WEEKS_EN, ALL_CURRICULUM_EN } from './curriculum-en';
import { LessonStep, DayContent } from './types';
import { loadProgress, saveProgress, progressPosition, type CompletedDays } from './course-progress';
import { GLOSSARY, GLOSSARY_CATEGORIES, GLOSSARY_SOURCE_URL } from './glossary';
import { WorldMap, StudyCards, MapMusic } from './web-sync/ChineseExperience';
import { concealedChoices, integerPercentages, canAdvance } from './miniprogram/course/learning-logic';
import { BpeLab } from './web-sync/BpeLab';
import { WorkUpload } from './web-sync/WorkUpload';
import { playWebEffect } from './web-sync/audio';
import { practiceDrafts } from './web-sync/practice-drafts';

// --- 配置区 ---
const APP_BASE = import.meta.env.BASE_URL;
const assetUrl = (url: string) => url.startsWith('/') && !url.startsWith('//') ? `${APP_BASE}${url.slice(1)}` : url;
const MASCOT_IMAGE_URL = assetUrl("/brand/draco-ai.jpg");
const IS_EN = window.location.pathname.slice(APP_BASE.length).split('/')[0] === 'en';
const WEEKS = IS_EN ? WEEKS_EN : WEEKS_ZH;
const ALL_CURRICULUM = IS_EN ? ALL_CURRICULUM_EN : CURRICULUM_ZH;
const tr = (zh: string, en: string) => IS_EN ? en : zh;

const UI = {
  videoPending: tr('本节视频待生成', 'Video coming soon'),
  videoPendingBody: tr('可以先继续学习后面的图文内容。', 'Continue with the lesson while this video is being prepared.'),
  videoLoading: tr('龙之影像载入中...', 'Loading the dragon reel...'),
  landscapeHint: tr('横过手机观看，画面和字幕会更清楚', 'Rotate your phone for a clearer video and captions'),
  fullscreen: tr('横屏全屏', 'Fullscreen'),
  glossary: tr('AI 名词本', 'AI Glossary'),
  flipCard: tr('点击查看定义', 'Tap to reveal the definition'),
  definition: tr('定义：', 'Definition:'),
  randomQuiz: tr('随机抽查', 'Quick quiz'),
  quizPrompt: tr('这是什么的定义？', 'Which definition is correct?'),
  correct: tr('正确！', 'Correct!'),
  retry: tr('再试试看', 'Try again'),
  continue: tr('继续', 'Continue'),
  check: tr('检查', 'Check'),
  exit: tr('退出', 'Exit'),
  previous: tr('上一步', 'Previous'),
  review: tr('错题复习', 'Review mistakes'),
  noLesson: tr('本课暂无内容', 'This lesson has no content yet'),
  back: tr('返回', 'Back'),
  interactive: tr('互动讲解实验', 'INTERACTIVE LAB'),
  compareSuccess: tr('选择正确，完成实验', 'Correct choice — complete lab'),
  compareRetry: tr('这个方案还有关键缺口，再比较一次。', 'This choice misses an important safeguard. Compare again.'),
  found: tr('已找到', 'Found'),
  remaining: tr('项，还剩', '— remaining'),
  diagnoseDone: tr('故障全部定位，完成实验', 'All failures found — complete lab'),
  sequenceDone: tr('顺序正确，完成实验', 'Correct order — complete lab'),
  practice: tr('实战任务', 'Practice task'),
  written: tr('已写', 'Written'),
  chars: tr('字', 'characters'),
  improveHint: tr('请对照本题要求补充答案与理由，不必写与任务无关的内容。', 'Add the answer and reasoning required by this task; avoid unrelated padding.'),
  selfCheck: tr('开始自检', 'Start self-check'),
  selfCheckStandards: tr('自检标准', 'Self-check criteria'),
  reference: tr('查看参考答案', 'View reference answer'),
  confirm: tr('我已对照自检标准检查答案，必要时也查看了参考答案。', 'I checked my answer against the criteria and reviewed the reference answer if needed.'),
  revise: tr('返回修改', 'Revise answer'),
  finishPractice: tr('完成并继续', 'Finish and continue'),
};

const AI_GLOSSARY = GLOSSARY.map(entry => ({
  id: entry.id,
  category: entry.category,
  ...(IS_EN ? entry.en : entry.zh),
  otherTerm: IS_EN ? entry.zh.term : entry.en.term,
  searchText: `${entry.zh.term} ${entry.en.term} ${entry.zh.definition} ${entry.en.definition}`.toLocaleLowerCase(),
}));
type GlossaryEntry = typeof AI_GLOSSARY[number];

const shuffle = <T,>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Audio System ---
const SoundSynth = {
  play: (effect: 'pop' | 'correct' | 'wrong' | 'success' | 'complete' | 'click' | 'match' | 'flip') => {
    playWebEffect(effect === 'wrong' ? 'wrong' : effect === 'success' || effect === 'complete' ? 'complete' : effect === 'correct' || effect === 'match' || effect === 'flip' ? 'correct' : 'map-tap');
  }
};

// --- Confetti Effect Component ---
const ConfettiEffect = () => {
  const particlesCount = 120;
  const colors = ['#FFD700', '#FF4500', '#00BFFF', '#32CD32', '#FF69B4', '#8A2BE2', '#F4A460'];
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particlesCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 300;
      const duration = 2 + Math.random() * 3;
      const size = 6 + Math.random() * 10;
      
      return {
        id: i,
        style: {
          '--start-x': '50vw',
          '--start-y': '50vh',
          '--mid-x': `${50 + Math.cos(angle) * (velocity * 0.2)}vw`,
          '--mid-y': `${50 + Math.sin(angle) * (velocity * 0.2)}vh`,
          '--end-x': `${50 + Math.cos(angle) * (velocity * 0.5)}vw`,
          '--end-y': '120vh', // Fall off screen
          '--rotate': `${Math.random() * 360}deg`,
          '--duration': `${duration}s`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        } as React.CSSProperties
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {particles.map(p => (
        <div key={p.id} className="confetti-particle shadow-sm" style={p.style}></div>
      ))}
    </div>
  );
};

// --- Video Player Component ---
const VideoPlayer = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);
  const isLocalVideo = /\.(mp4|webm)(?:$|\?)/i.test(url);
  const openLandscapeFullscreen = async () => {
    try {
      await playerRef.current?.requestFullscreen();
      const orientation = screen.orientation as ScreenOrientation & { lock?: (orientation: 'landscape') => Promise<void> };
      await orientation.lock?.('landscape');
    } catch {
      // iOS and embedded browsers may allow fullscreen without orientation locking.
    }
  };
  if (!url) {
    return (
      <div className="w-full aspect-video bg-indigo-950 rounded-2xl overflow-hidden mb-6 relative shadow-2xl flex flex-col items-center justify-center text-center p-6">
        <i className="fa-solid fa-video-slash text-indigo-200 text-5xl mb-4"></i>
        <div className="text-white text-xl font-black mb-2">{UI.videoPending}</div>
        <p className="text-indigo-200 text-sm leading-relaxed max-w-md">{UI.videoPendingBody}</p>
      </div>
    );
  }
  return (
    <div className="lesson-video w-full mb-6">
      <div ref={playerRef} className="w-full aspect-video bg-indigo-950 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-indigo-900">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-indigo-400 border-t-yellow-400 rounded-full animate-spin"></div>
              <i className="fa-solid fa-dragon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-lg sm:text-xl animate-pulse"></i>
            </div>
            <p className="mt-3 text-indigo-200 text-xs sm:text-sm font-medium tracking-wider animate-pulse">{UI.videoLoading}</p>
          </div>
        )}
        {isLocalVideo ? (
          <video
            src={assetUrl(url)}
            className={`w-full h-full object-contain transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            controls
            playsInline
            preload="metadata"
            onCanPlay={() => setIsLoading(false)}
          />
        ) : (
          <iframe
            src={assetUrl(url)}
            className={`w-full h-full transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        )}
      </div>
      <div className="portrait-video-hint mt-3 items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-indigo-900">
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <i className="fa-solid fa-mobile-screen-button rotate-90 text-indigo-600"></i>
          <span>{UI.landscapeHint}</span>
        </div>
        <button type="button" onClick={openLandscapeFullscreen} className="shrink-0 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white active:scale-95">
          <i className="fa-solid fa-expand mr-1"></i>{UI.fullscreen}
        </button>
      </div>
    </div>
  );
};

// --- Glossary Component ---
const GlossaryView = ({ onClose }: { onClose: () => void }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quiz, setQuiz] = useState<{ entry: GlossaryEntry, options: string[] } | null>(null);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasQuiz = useRef(false);
  const quizMode = quiz !== null;
  const filtered = useMemo(() => {
    const words = search.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return AI_GLOSSARY.filter(entry =>
      (category === 'all' || entry.category === category) &&
      words.every(word => entry.searchText.includes(word)));
  }, [search, category]);
  const safeIndex = filtered.length ? currentIndex % filtered.length : 0;
  const currentEntry = filtered[safeIndex];

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    if (wasQuiz.current !== quizMode) {
      dialogRef.current?.querySelector<HTMLButtonElement>('[data-glossary-quiz-toggle]')?.focus();
    }
    wasQuiz.current = quizMode;
  }, [quizMode]);

  const resetCard = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const moveCard = (direction: number) => {
    if (!filtered.length) return;
    SoundSynth.play('pop');
    setIsFlipped(false);
    setCurrentIndex((safeIndex + direction + filtered.length) % filtered.length);
  };

  const handleFlip = () => {
    SoundSynth.play('flip');
    setIsFlipped(value => !value);
  };

  const startQuiz = () => {
    if (!filtered.length) return;
    const correct = filtered[Math.floor(Math.random() * filtered.length)];
    const pool = filtered.length >= 3 ? filtered : AI_GLOSSARY;
    let distractors = [...new Set(pool
      .filter(entry => entry.id !== correct.id && entry.definition !== correct.definition)
      .map(entry => entry.definition))];
    // Repeated definitions must not turn a three-choice quiz into duplicate answers.
    if (distractors.length < 2) {
      distractors = [...new Set(AI_GLOSSARY
        .filter(entry => entry.id !== correct.id && entry.definition !== correct.definition)
        .map(entry => entry.definition))];
    }
    if (distractors.length < 2) return;
    SoundSynth.play('success');
    setQuiz({ entry: correct, options: shuffle([correct.definition, ...shuffle(distractors).slice(0, 2)]) });
    setQuizResult(null);
  };

  const checkAnswer = (ans: string) => {
    if (!quiz || quizResult !== null) return;
    const isCorrect = ans === quiz.entry.definition;
    setQuizResult(isCorrect);
    if (isCorrect) SoundSynth.play('correct');
    else SoundSynth.play('wrong');
  };

  const handleQuizFinish = () => {
    SoundSynth.play('pop');
    setQuiz(null);
    setQuizResult(null);
    setIsFlipped(false);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-title"
      className="fixed inset-0 bg-[#1a237e]/95 z-[60] overflow-y-auto overscroll-contain p-4 sm:p-6 animate-pop"
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
        if (event.key === 'Tab') {
          const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, select, a[href]');
          const first = controls?.[0];
          const last = controls?.[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <div className="w-full max-w-xl mx-auto min-h-full flex flex-col items-center justify-center gap-5">
        <div className="w-full flex items-center justify-between gap-4">
          <h2 id="glossary-title" className="text-white text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-book-sparkles text-yellow-400" aria-hidden="true"></i> {UI.glossary}
          </h2>
          <button ref={closeRef} onClick={onClose} aria-label={tr('关闭名词本', 'Close glossary')} className="shrink-0 w-12 h-12 text-white text-3xl rounded-full hover:bg-white/20 focus-visible:outline focus-visible:outline-yellow-400"><i className="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
      {!quiz ? (
        <>
          <div className="w-full grid gap-3 sm:grid-cols-2">
            <label className="text-white text-sm">
              {tr('搜索中英文术语或定义', 'Search Chinese / English terms or definitions')}
              <input type="search" value={search} onChange={event => { setSearch(event.target.value); resetCard(); }} className="mt-1 w-full rounded-xl p-3 text-gray-900 bg-white" placeholder={tr('例如：注意力 / attention', 'e.g. attention / 注意力')} />
            </label>
            <label className="text-white text-sm">
              {tr('分类', 'Category')}
              <select value={category} onChange={event => { setCategory(event.target.value); resetCard(); }} className="mt-1 w-full rounded-xl p-3 text-gray-900 bg-white">
                <option value="all">{tr('全部分类', 'All categories')}</option>
                {Object.entries(GLOSSARY_CATEGORIES).map(([key, labels]) => <option key={key} value={key}>{IS_EN ? labels.en : labels.zh}</option>)}
              </select>
            </label>
          </div>
          <p role="status" className="text-white/80 text-sm">{tr(`匹配 ${filtered.length} / ${AI_GLOSSARY.length} 个术语`, `${filtered.length} / ${AI_GLOSSARY.length} terms matched`)}</p>
          {currentEntry ? (
            <>
              <p className="text-white/70 text-sm">{IS_EN ? GLOSSARY_CATEGORIES[currentEntry.category].en : GLOSSARY_CATEGORIES[currentEntry.category].zh}</p>
              <button
                type="button"
                onClick={handleFlip}
                aria-pressed={isFlipped}
                aria-label={`${currentEntry.term}: ${tr('翻转学习卡', 'Flip study card')}`}
                className={`w-full min-h-72 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 text-center break-words focus-visible:outline focus-visible:outline-4 focus-visible:outline-yellow-400 transition-colors ${isFlipped ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-white'}`}
              >
                <span className="block text-2xl font-bold text-gray-800">{currentEntry.term}</span>
                <span className="block mt-2 text-sm text-gray-500">{currentEntry.otherTerm}</span>
                {isFlipped ? (
                  <span className="block mt-5" aria-live="polite">
                    <span className="block text-indigo-600 font-bold mb-2">{UI.definition}</span>
                    <span className="block text-gray-800 text-base leading-relaxed mb-4">{currentEntry.definition}</span>
                    <span className="block bg-white/60 p-3 rounded-xl border border-indigo-200 text-sm text-gray-600"><i className="fa-solid fa-lightbulb text-yellow-500 mr-1" aria-hidden="true"></i> {currentEntry.example}</span>
                    <span className="block mt-4 text-gray-500 text-sm">{tr('点击返回术语', 'Tap to return to the term')}</span>
                  </span>
                ) : (
                  <span className="block mt-6 text-gray-500 text-sm italic"><i className="fa-solid fa-brain text-indigo-600 mr-2" aria-hidden="true"></i>{UI.flipCard}</span>
                )}
              </button>
              <div className="flex items-center gap-3 sm:gap-8">
                <button onClick={() => moveCard(-1)} disabled={filtered.length < 2} aria-label={tr('上一个术语', 'Previous term')} className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40"><i className="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
                <button data-glossary-quiz-toggle onClick={startQuiz} className="px-6 py-3 rounded-full bg-yellow-400 text-indigo-900 font-bold hover:bg-yellow-300 shadow-lg text-sm sm:text-base">{UI.randomQuiz}</button>
                <button onClick={() => moveCard(1)} disabled={filtered.length < 2} aria-label={tr('下一个术语', 'Next term')} className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40"><i className="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
              </div>
              <p aria-live="polite" className="text-white/70 text-sm">{safeIndex + 1} / {filtered.length}</p>
            </>
          ) : (
            <div className="w-full rounded-3xl bg-white p-8 text-center">
              <p className="text-gray-800">{tr('没有匹配的术语，请尝试其他关键词或分类。', 'No matching terms. Try another search or category.')}</p>
              <button onClick={() => { setSearch(''); setCategory('all'); resetCard(); }} className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-white font-bold">{tr('清除筛选', 'Clear filters')}</button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-8 shadow-2xl animate-pop break-words">
          <button data-glossary-quiz-toggle onClick={handleQuizFinish} className="mb-5 text-indigo-700 font-bold underline">{tr('返回学习卡', 'Back to study cards')}</button>
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{UI.quizPrompt}</h3>
          <div className="p-4 bg-indigo-50 rounded-2xl mb-6 text-center border-2 border-dashed border-indigo-200" aria-live="polite">
            <p className="text-2xl font-bold text-indigo-600">{quiz.entry.term}</p>
          </div>
          <div className="space-y-4">
            {quiz.options.map(opt => (
              <button
                key={opt}
                onClick={() => checkAnswer(opt)}
                aria-disabled={quizResult !== null}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm transition-all ${quizResult !== null && opt === quiz.entry.definition ? 'bg-green-100 border-green-500 text-green-700 font-bold' : 'bg-white border-gray-200 text-gray-800 hover:border-indigo-500'}`}
              >
                {opt}
              </button>
            ))}
          </div>
          {quizResult !== null && (
            <div className={`p-4 mt-4 rounded-xl ${quizResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p role="status" className="font-bold">{quizResult ? tr('太棒了！你答对了', 'Great work — correct!') : tr('没关系，再复习一下吧', 'Review the card and try again.')}</p>
              <p className="mt-2 text-sm">{UI.definition} {quiz.entry.definition}</p>
              <button onClick={startQuiz} className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-indigo-600">{tr('再来一题', 'Another question')}</button>
            </div>
          )}
        </div>
      )}
        <p className="text-white/70 text-xs text-center pb-2">
          <a href={GLOSSARY_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline">{tr('术语参考', 'Term reference')}</a>
          {' · '}{tr('定义与例子由 Draco 原创编写。', 'Original explanations and examples by Draco.')}
        </p>
      </div>
    </div>
  );
};

// --- Progress UI ---
const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
    <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }}></div>
  </div>
);

// --- Lesson Engine ---
const MatchGame = ({ step, onCorrect }: { step: LessonStep, onCorrect: () => void }) => {
    const [notice, setNotice] = useState('');
    const [leftSelected, setLeftSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<Set<string>>(new Set());
    const [shuffledRight, setShuffledRight] = useState<{id: string, text: string}[]>([]);
    useEffect(() => {
        if (step.pairs) {
            const rightItems = step.pairs.map(p => ({ id: p.left, text: p.right }));
            setShuffledRight(concealedChoices(rightItems));
            setMatched(new Set()); setLeftSelected(null); setNotice('');
        }
    }, [step]);
    const handleLeftClick = (id: string) => { if (matched.has(id)) return; SoundSynth.play('pop'); setLeftSelected(id); };
    const handleRightClick = (id: string) => {
        if (matched.has(id) || leftSelected === null) return;
        if (leftSelected === id) {
            SoundSynth.play('match');
            const newMatched = new Set(matched); newMatched.add(id); setMatched(newMatched); setLeftSelected(null);
            setNotice('');
            if (newMatched.size === step.pairs?.length) onCorrect();
        } else { SoundSynth.play('wrong'); setLeftSelected(null); setNotice(tr('这两项不匹配，请对照题干重选。已配好的会保留。', 'These do not match. Check the question and try another pair; completed pairs stay.')); }
    };
    return (
        <div className="w-full animate-slide-up"><h2 className="text-2xl font-bold mb-4"><InlineText text={step.question || ""} /></h2><p className="mb-3">{tr('先选左侧，再选右侧，完成全部配对。', 'Choose a left item, then its right match. Complete every pair.')}</p><p role="status">{notice}</p><div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-3 w-1/2">{step.pairs?.map(pair => (
                <button key={pair.left} onClick={() => handleLeftClick(pair.left)} disabled={matched.has(pair.left)} className={`p-4 rounded-xl border-2 text-sm sm:text-base font-bold transition-all ${matched.has(pair.left) ? 'bg-green-100 border-green-500 opacity-50' : leftSelected === pair.left ? 'bg-blue-100 border-blue-500 scale-105' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>{pair.left}</button>
            ))}</div>
            <div className="flex flex-col gap-3 w-1/2">{shuffledRight.map(item => (
                <button key={item.id} onClick={() => handleRightClick(item.id)} disabled={matched.has(item.id)} className={`p-4 rounded-xl border-2 text-sm sm:text-base transition-all ${matched.has(item.id) ? 'bg-green-100 border-green-500 opacity-50' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>{item.text}</button>
            ))}</div>
        </div></div>
    );
};

const FillBlank = ({ step, selectedIdx, showResult, isCorrect, onSelect }: { step: LessonStep, selectedIdx: number | null, showResult: boolean, isCorrect: boolean, onSelect: (idx: number) => void }) => {
    const selectedText = selectedIdx !== null ? step.options![selectedIdx] : null;
    let blankCount = 0; // 追踪占位符计数
    return (
        <div className="w-full animate-slide-up">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 mb-8 flex flex-wrap gap-2 items-baseline text-xl leading-relaxed">
                {step.parts?.map((part, i) => {
                    if (part === "___") {
                        blankCount++;
                        // 仅填充第一个发现的占位符（目前逻辑仅支持单选填充）
                        const currentText = (blankCount === 1) ? (selectedText || "____") : "____";
                        return (
                            <span key={i} className={`border-b-4 px-2 font-bold min-w-[80px] text-center transition-colors ${showResult ? (isCorrect ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600 line-through') : 'border-gray-300 text-indigo-600'}`}>{currentText}</span>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{step.options?.map((opt, idx) => (
                <button key={idx} onClick={() => { if(!showResult) { SoundSynth.play('pop'); onSelect(idx); } }} className={`p-4 rounded-xl border-b-4 font-bold text-lg transition-all active:translate-y-1 active:border-b-0 ${selectedIdx === idx ? 'bg-indigo-100 border-indigo-400 text-indigo-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} ${showResult && opt === step.correct ? 'bg-green-100 border-green-500 text-green-700' : ''} ${showResult && selectedIdx === idx && opt !== step.correct ? 'bg-red-100 border-red-500 text-red-700' : ''}`}>{opt}</button>
            ))}</div>
        </div>
    );
};

  const InteractiveLab = ({ step, onComplete }: { step: LessonStep, onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [temperature, setTemperature] = useState(1);
    const [order, setOrder] = useState<string[]>([]);
    const [visited, setVisited] = useState<string[]>([]);
    const [sequenceChoices, setSequenceChoices] = useState<string[]>([]);
    const visit = (label: string) => setVisited(values => [...new Set([...values, label])]);

    useEffect(() => {
      setProgress(0);
      setSelected(null);
      setTemperature(1);
      setOrder([]);
      setVisited([]);
      setSequenceChoices(concealedChoices(step.interactiveSequence ?? ['Tokenizer', 'Embedding', 'Attention', 'Logits', 'Softmax', 'Sampling']));
    }, [step]);

    const finish = () => {
      SoundSynth.play('correct');
      onComplete();
    };

    const shell = (body: React.ReactNode, instruction: string) => (
      <div className="w-full space-y-5 animate-slide-up">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-950 to-indigo-800 p-5 text-white shadow-xl">
          <div className="text-xs font-black tracking-widest text-yellow-300">{UI.interactive}</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black">{step.interactiveTitle}</h2>
          <p className="mt-2 text-indigo-100 leading-relaxed">{instruction}</p>
        </div>
        {body}
      </div>
    );

    if (step.interactiveKind === 'timeline') {
      const events = [
        ['1950', tr("图灵测试", "Turing Test"), tr("把“机器能否思考”变成可观察的对话问题", "Turn machine intelligence into an observable conversation question")],
        ['1956', tr("达特茅斯会议", "Dartmouth workshop"), tr("人工智能成为有名称的研究领域", "AI emerges as a named research field")],
        ['1997', tr("深蓝", "Deep Blue"), tr("强力搜索与人工知识击败棋王", "Search and human expertise defeat a chess champion")],
        ['2016', 'AlphaGo', tr("神经网络、学习与搜索共同解决围棋", "Neural networks, learning, and search tackle Go")],
        ['2017', 'Transformer', tr("注意力机制奠定大语言模型路线", "Attention shapes the path to large language models")],
        ['2022', 'ChatGPT', tr("生成式 AI 通过自然语言走向大众", "Natural language brings generative AI to a broad audience")]
      ];
      return shell(<>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {events.map(([year, title, detail], index) => <button key={year} onClick={() => { setSelected(year); visit(year); SoundSynth.play('pop'); }} className={`min-h-28 rounded-2xl border-2 p-3 text-left transition-all ${selected === year ? 'border-orange-500 bg-orange-50 scale-[1.02]' : 'border-gray-200 bg-white'}`}><div className="text-2xl font-black text-indigo-700">{year}</div><div className="font-bold">{title}</div>{selected === year && <div className="mt-2 text-sm text-gray-600">{detail}</div>}</button>)}
        </div>
        {visited.length >= 4 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('完成探索','Finish exploring')}</button>}
      </>, tr("探索至少四个不同节点，观察 AI 如何从规则、搜索走向学习和生成。", "Explore at least four different milestones, from rules and search to learning and generation."));
    }

    if (step.interactiveKind === 'bpe') {
      return shell(<BpeLab en={IS_EN} onComplete={finish} />, tr('选择相邻积木，按频次合并。', 'Choose adjacent tiles and merge by frequency.'));
    }

    if (step.interactiveKind === 'embedding') {
      const concepts = [{name:tr('猫','Cat'),x:18,y:22},{name:tr('狗','Dog'),x:35,y:36},{name:tr('汽车','Car'),x:62,y:73},{name:tr('自行车','Bicycle'),x:80,y:48}];
      return shell(<>
        <div className="relative h-72 rounded-2xl border-2 border-indigo-100 bg-[radial-gradient(circle,_#c7d2fe_1px,_transparent_1px)] bg-[size:20px_20px]">
          {concepts.map(item => <button key={item.name} onClick={() => { setSelected(item.name); visit(item.name); SoundSynth.play('pop'); }} style={{left:`${item.x}%`,top:`${item.y}%`}} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-4 py-3 font-black shadow ${selected === item.name ? 'border-orange-500 bg-orange-100' : 'border-indigo-500 bg-white'}`}>{item.name}</button>)}
          <div className="absolute bottom-3 left-3 text-xs text-gray-500">{tr('距离近：语义可能相关，不代表事实相同','Closeness suggests related meaning, not identical facts')}</div>
        </div>
        {selected && <div className="rounded-xl bg-indigo-50 p-4 text-center font-bold">{tr('你选择了','Selected: ')}{selected}{tr('。观察示意图中的相对位置。','. Compare relative positions in this illustration.')}</div>}
        {visited.length >= 3 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('完成探索','Finish exploring')}</button>}
      </>, tr('这张二维星图是教学示意，不是模型实测。探索至少三个不同概念，观察相对位置；相关不等于事实相同。','This two-dimensional map is an illustration, not a model measurement. Explore at least three concepts and compare their relative positions; related does not mean factually identical.'));
    }

    if (step.interactiveKind === 'attention') {
      const labels = [tr('小明','Alex'), tr('书','Book'), tr('小刚','Sam')];
      const values = [progress === 0 ? 34 : 12, progress === 0 ? 33 : 18, progress === 0 ? 33 : 70];
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5 space-y-4">
          <div className="text-lg font-bold">{tr('小明把书递给小刚，因为','Alex handed Sam the book because ')}<span className="text-orange-600">{tr('他','he')}</span>{tr('明天要演讲。',' would give a talk tomorrow.')}</div>
          {labels.map((label,index)=><div key={label}><div className="mb-1 flex justify-between text-sm font-bold"><span>{label}</span><span>{values[index]}%</span></div><div className="h-4 rounded-full bg-gray-100"><div className="h-4 rounded-full bg-indigo-500 transition-all duration-500" style={{width:`${values[index]}%`}} /></div></div>)}
        </div>
        {progress === 0 ? <button onClick={() => { setProgress(1); SoundSynth.play('pop'); }} className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white">{tr('补充上下文：小刚明天要演讲','Add context: Sam will give the talk tomorrow')}</button> : <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('完成：上下文改变注意力重点','Finish: context changes the attention pattern')}</button>}
      </>, tr("以下百分比为教学示意，不是模型实测。原句存在歧义；补充上下文后观察关注重点变化。", "These percentages are illustrative, not model measurements. The original is ambiguous; add context and observe the changed focus."));
    }

    if (step.interactiveKind === 'temperature') {
      const base = [60, 25, 10, 5];
      const adjusted = base.map(value => Math.pow(value / 100, 1 / temperature));
      const total = adjusted.reduce((sum, value) => sum + value, 0);
      const probabilities = integerPercentages(adjusted);
      const labels = [tr('散步','Walk'), tr('野餐','Picnic'), tr('写作业','Study'), tr('开飞船','Fly a spaceship')];
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
          <div className="mb-4 flex justify-between font-bold"><span>{tr("集中","Focused")}</span><span>Temperature：{temperature.toFixed(1)}</span><span>{tr("分散","Varied")}</span></div>
          <input aria-label="Temperature" type="range" min="0.4" max="1.8" step="0.1" value={temperature} onChange={event => { setTemperature(Number(event.target.value)); setProgress(1); }} className="w-full accent-orange-500" />
          <div className="mt-6 grid grid-cols-4 items-end gap-3 h-48">{labels.map((label,index)=><div key={label} className="flex h-full flex-col justify-end text-center"><div className="mb-2 text-sm font-black">{probabilities[index]}%</div><div className="mx-auto w-full max-w-16 rounded-t-lg bg-indigo-500 transition-all" style={{height:`${Math.max(8, probabilities[index] * 2.2)}px`}}/><div className="mt-2 text-xs sm:text-sm font-bold">{label}</div></div>)}</div>
        </div>
        {progress > 0 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('完成：温度改变分布，不增加知识','Finish: temperature changes distributions, not knowledge')}</button>}
      </>, tr("示例输入：“周末我们去公园___”。温度改变候选分布，不增加知识。拖动旋钮比较两种设置；整数百分比做了舍入分配。", "Toy input: “At the park this weekend, we will ___.” Move the slider to compare distributions. Temperature does not add knowledge; displayed integer percentages are apportioned by rounding."));
    }

    if (step.interactiveKind === 'evidence') {
      const tools: Record<string,string> = {[tr('天气','Weather')]:tr('权威天气来源','Authoritative weather source'),[tr('算术','Arithmetic')]:tr('计算器','Calculator'),[tr('校规','School rules')]:tr('学校原始文件','Original school document'),[tr('故事','Stories')]:tr('人工创意筛选','Human creative judgment')};
      return shell(<>
        <div className="grid grid-cols-2 gap-3">{Object.entries(tools).map(([task,tool])=><button key={task} onClick={() => { setSelected(task); visit(task); SoundSynth.play('pop'); }} className={`rounded-2xl border-2 p-4 text-left ${selected === task ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}><div className="text-xl font-black">{task}</div>{selected === task && <div className="mt-2 text-sm text-gray-600">{tr('核验方式：','Verification: ')}{tool}</div>}</button>)}</div>
        {visited.length >= 3 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('完成：不同问题连接不同证据','Finish: match evidence to the task')}</button>}
      </>, tr("探索至少三种不同任务，比较核验工具。后面的题目再由你独立选择。", "Explore at least three different tasks and compare their verification methods. Choose independently in the later questions."));
    }

    if (step.interactiveKind === 'compare') {
      const items = step.interactiveItems ?? [];
      const chosen = items.find(item => item.label === selected);
      return shell(<>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map(item => <button key={item.label} onClick={() => { setSelected(item.label); SoundSynth.play('pop'); }} className={`rounded-2xl border-2 p-4 text-left transition-all ${selected === item.label ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
            <div className="font-black text-indigo-950">{item.label}</div>
            {selected === item.label && item.detail && <div className="mt-2 text-sm leading-relaxed text-gray-600">{item.detail}</div>}
          </button>)}
        </div>
        {chosen && (chosen.correct ? <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{UI.compareSuccess}</button> : <div className="rounded-xl bg-orange-50 p-4 text-sm font-bold text-orange-700">{UI.compareRetry}</div>)}
      </>, step.interactiveInstruction || '比较不同方案，找出既能完成任务又能检查结果的一项。');
    }

    if (step.interactiveKind === 'diagnose') {
      const items = step.interactiveItems ?? [];
      const remaining = items.filter(item => item.correct && !order.includes(item.label));
      return shell(<>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map(item => {
            const found = order.includes(item.label);
            return <button key={item.label} disabled={found} onClick={() => {
              if (item.correct) { setOrder([...order, item.label]); SoundSynth.play('match'); }
              else { setSelected(item.label); SoundSynth.play('wrong'); }
            }} className={`rounded-2xl border-2 p-4 text-left ${found ? 'border-green-400 bg-green-50' : selected === item.label ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <div className="font-black">{item.label}</div>
              {(found || selected === item.label) && item.detail && <div className="mt-2 text-sm text-gray-600">{item.detail}</div>}
            </button>;
          })}
        </div>
        <div className="rounded-xl bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">{UI.found} {order.length}; {UI.remaining} {remaining.length}</div>
        {remaining.length === 0 && order.length > 0 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{UI.diagnoseDone}</button>}
      </>, step.interactiveInstruction || tr('选出有问题的记录，留意其中正常的做法。','Select faulty records and distinguish valid behavior.'));
    }

    if (step.interactiveKind === 'sequence') {
      const target = step.interactiveSequence ?? [];
      const choices = sequenceChoices;
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
          <div className="mb-4 min-h-16 flex flex-wrap gap-2">{order.map((item,index)=><span key={item} className="rounded-xl bg-green-100 px-3 py-2 font-bold text-green-700">{index+1}. {item}</span>)}</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{choices.map(item=><button key={item} disabled={order.includes(item)} onClick={() => {
            const nextIndex = order.length;
            if (item !== target[nextIndex]) { SoundSynth.play('wrong'); setOrder([]); }
            else { SoundSynth.play('match'); setOrder([...order, item]); }
          }} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-3 font-bold disabled:bg-green-100 disabled:text-green-700 disabled:opacity-60">{item}</button>)}</div>
        </div>
        {order.length === target.length && target.length > 0 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{UI.sequenceDone}</button>}
      </>, step.interactiveInstruction || '按真实依赖顺序点击步骤，点错会重新开始。');
    }

    const target = ['Tokenizer', 'Embedding', 'Attention', 'Logits', 'Softmax', 'Sampling'];
    const choices = sequenceChoices;
    const isCorrectOrder = order.every((item,index) => item === target[index]);
    return shell(<>
      <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
        <div className="mb-4 min-h-16 flex flex-wrap gap-2">{order.map((item,index)=><span key={item} className={`rounded-xl px-3 py-2 font-bold ${item === target[index] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{index+1}. {item}</span>)}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{choices.map(item=><button key={item} disabled={order.includes(item)} onClick={() => { const next=[...order,item]; if(item !== target[next.length-1]) { SoundSynth.play('wrong'); setOrder([]); } else { SoundSynth.play('match'); setOrder(next); } }} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-3 font-bold disabled:bg-green-100 disabled:text-green-700 disabled:opacity-60">{item}</button>)}</div>
      </div>
      {order.length === target.length && isCorrectOrder && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('生产线排序完成','Pipeline complete')}</button>}
    </>, tr("按真实生成顺序点击六个模块。点错会重新开始。", "Select the six modules in generation order. An incorrect choice restarts the sequence."));
  };

  const InlineText = ({ text }: { text: string }) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
    return <>{parts.map((part, index) => part.startsWith('`') && part.endsWith('`')
      ? <code key={index} className="rounded bg-indigo-50 px-1 text-indigo-700" style={{ overflowWrap: 'anywhere' }}>{part.slice(1, -1)}</code>
      : part.startsWith('**') && part.endsWith('**')
      ? <strong key={index} className="font-black text-indigo-950">{part.slice(2, -2)}</strong>
      : <React.Fragment key={index}>{part}</React.Fragment>
    )}</>;
  };

  const TheoryContent = ({ content, isBoss }: { content?: string, isBoss?: boolean }) => {
    const rawLines = (content || '').split('\n');
    const lines = rawLines.map(line => line.trim());
    const blocks: React.ReactNode[] = [];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index];
      if (!line) { index++; continue; }

      const fence = line.match(/^(`{3,}|~{3,})/);
      if (fence) {
        const body: string[] = [];
        const close = new RegExp(`^${fence[1][0]}{${fence[1].length},}$`);
        index++;
        while (index < lines.length && !close.test(lines[index])) body.push(rawLines[index++]);
        if (index < lines.length) index++;
        blocks.push(<pre key={`code-${index}`} className="rounded-2xl bg-indigo-50 p-4 text-left text-sm leading-relaxed text-indigo-950 whitespace-pre-wrap" style={{ overflowWrap: 'anywhere' }}><code>{body.join('\n')}</code></pre>);
        continue;
      }

      if (line.startsWith('|') && lines[index + 1]?.startsWith('|---')) {
        const tableRows: string[][] = [];
        index += 2;
        while (index < lines.length && lines[index].startsWith('|')) {
          tableRows.push(lines[index].split('|').map(cell => cell.trim()).filter(Boolean));
          index++;
        }
        blocks.push(
          <div key={`table-${index}`} className="grid gap-3 text-left">
            {tableRows.map((row, rowIndex) => (
              <div key={rowIndex} className="rounded-2xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
                <div className="text-lg font-black text-indigo-700 mb-2"><InlineText text={row[0] || ''} /></div>
                {row[1] && <div className="text-base leading-relaxed text-gray-800"><span className="font-bold text-gray-500">{tr('作用：', 'Purpose: ')}</span><InlineText text={row[1]} /></div>}
                {row[2] && <div className="text-base leading-relaxed text-gray-800 mt-1"><span className="font-bold text-gray-500">{tr('类比：', 'Analogy: ')}</span><InlineText text={row[2]} /></div>}
              </div>
            ))}
          </div>
        );
        continue;
      }

      if (/^\d+\.\s/.test(line)) {
        blocks.push(
          <div key={`ordered-${index}`} className="rounded-2xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-left text-lg leading-relaxed">
            <InlineText text={line} />
          </div>
        );
        index++;
        continue;
      }

      if (/^[-•]\s/.test(line)) {
        blocks.push(
          <div key={`bullet-${index}`} className="flex gap-3 text-left text-lg leading-relaxed text-gray-800">
            <span className="mt-2 h-2 w-2 rounded-full bg-orange-400 shrink-0"></span>
            <span><InlineText text={line.replace(/^[-•]\s/, '')} /></span>
          </div>
        );
        index++;
        continue;
      }

      const isTitle = index === 0 || line.includes('章：') || line.includes('主题：');
      blocks.push(
        <div key={`text-${index}`} className={isTitle ? 'text-2xl sm:text-3xl font-black leading-snug text-indigo-950' : 'text-lg sm:text-xl leading-relaxed text-gray-800'}>
          <InlineText text={line} />
        </div>
      );
      index++;
    }

    return (
      <div className="w-full max-w-2xl animate-slide-up text-center space-y-5">
        <div className={`rounded-3xl p-5 sm:p-6 ${isBoss ? 'bg-red-50 border-2 border-red-100' : 'bg-white border-2 border-indigo-50'} shadow-sm space-y-4`}>
          {blocks}
        </div>
        <i className={`fa-solid ${isBoss ? 'fa-dragon text-red-500' : 'fa-lightbulb text-orange-400'} text-5xl animate-bounce-slight`}></i>
      </div>
    );
  };

const PracticeBox = ({ step, lessonId, draftId, onPass }: { step: LessonStep, lessonId: string, draftId: string, onPass: () => void }) => {
    const [artifactSaved, setArtifactSaved] = useState(false);
    const [initialDraft] = useState(() => practiceDrafts.read(draftId));
    const [text, setText] = useState(initialDraft.text);
    const [draftError, setDraftError] = useState(initialDraft.error);
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
    const minLen = step.minLength ?? 20;

    const charCount = text.trim().length;
    const remainingChars = Math.max(minLen - charCount, 0);
  const canCheck = charCount >= minLen && !showSelfCheck;

    return (
        <div className="w-full animate-slide-up space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-pen-ruler text-purple-600"></i>
          <span className="font-bold text-purple-700">{UI.practice}</span>
                </div>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed" style={{ overflowWrap: 'anywhere' }}>{step.task}</div>
            </div>

            <textarea
                value={text}
                maxLength={10000}
                onChange={(e) => { setText(e.target.value); setDraftError(!practiceDrafts.write(draftId, e.target.value)); }}
                disabled={showSelfCheck}
                placeholder={step.placeholder || tr(`在这里写下你的答案……（至少 ${minLen} 字）`, `Write your answer here (at least ${minLen} characters).`)}
                className="w-full min-h-[160px] p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-base leading-relaxed resize-y disabled:bg-gray-50"
            />
            <p className={draftError ? 'text-sm text-red-700' : 'text-xs text-gray-500'} role={draftError ? 'alert' : undefined}>{draftError ? tr('草稿未能读取或保存，请复制当前内容后再退出。', 'Draft could not be loaded or saved. Copy your text before leaving.') : tr('内容仅保存在本机，可清空文本删除。', 'Saved on this device only. Clear the text to remove it.')}</p>
            {step.requiresArtifact && <WorkUpload lesson={lessonId} en={IS_EN} onSaved={setArtifactSaved} />}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm text-gray-500">
              <div>
                {step.requiresArtifact ? <span>{tr('作品说明（选填）', 'Work notes (optional)')}</span> : <span>{UI.written} <span className={charCount >= minLen ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>{charCount}</span> / {minLen} {UI.chars}</span>}
                {remainingChars > 0 && <div className="mt-1 text-orange-600">{UI.improveHint}</div>}
              </div>
                {!showSelfCheck && (
                    <button
                    onClick={() => { SoundSynth.play('pop'); setShowSelfCheck(true); }}
                    disabled={!canCheck}
                    title={remainingChars > 0 ? tr(`至少还需要 ${remainingChars} 个字`, `${remainingChars} more characters needed`) : UI.selfCheck}
                    className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold shadow disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed active:scale-95 transition-transform"
                    >
                    {remainingChars > 0 ? tr(`还差 ${remainingChars} 字`, `${remainingChars} to go`) : UI.selfCheck}
                    </button>
                )}
            </div>

              {showSelfCheck && (
                <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-5 space-y-4 animate-pop">
                    <div>
                    <div className="font-bold text-green-700 mb-1"><i className="fa-solid fa-list-check mr-1"></i>{UI.selfCheckStandards}</div>
                    <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed" style={{ overflowWrap: 'anywhere' }}>{step.rubric}</div>
                    </div>
                  {step.referenceAnswer && (
                        <details className="bg-white/60 rounded-xl p-3">
                            <summary className="font-bold text-indigo-700 cursor-pointer"><i className="fa-solid fa-lightbulb mr-1"></i>{UI.reference}</summary>
                      <div className="mt-2 text-gray-700 text-sm whitespace-pre-wrap leading-relaxed" style={{ overflowWrap: 'anywhere' }}>{step.referenceAnswer}</div>
                        </details>
                    )}
                  <label className="flex items-start gap-3 rounded-xl bg-white p-3 cursor-pointer">
                    <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 w-5 h-5 accent-green-600" />
                    <span className="text-sm text-gray-700">{UI.confirm}</span>
                  </label>
                    <div className="flex gap-2 pt-2">
                    <button onClick={() => { setShowSelfCheck(false); setConfirmed(false); }} className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2 rounded-xl font-bold active:scale-95">{UI.revise}</button>
                    <button onClick={() => { if (!confirmed || (step.requiresArtifact && !artifactSaved)) return; SoundSynth.play('correct'); onPass(); }} disabled={!confirmed || (step.requiresArtifact && !artifactSaved)} className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold shadow disabled:opacity-40 active:scale-95">{step.requiresArtifact && !artifactSaved ? tr('请先上传作品', 'Upload your work first') : UI.finishPractice}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const LessonEngine = ({ weekId, dayId, onComplete, onExit }: { weekId: number, dayId: number, onComplete: () => void, onExit: () => void }) => {
    const lessonData = ALL_CURRICULUM[weekId]?.find(d => d.day === dayId);
    const [steps, setSteps] = useState<LessonStep[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [mistakes, setMistakes] = useState<LessonStep[]>([]);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shake, setShake] = useState(false);
    useEffect(() => { if (lessonData) setSteps(lessonData.steps); }, [lessonData]);
    useEffect(() => { setSelectedOption(null); setShowResult(false); setIsCorrect(false); setShake(false); }, [stepIndex, isReviewMode]);

    if (!steps || steps.length === 0) return <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6"><h2 className="text-xl font-bold mb-4">{UI.noLesson}</h2><button onClick={onExit} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">{UI.back}</button></div>;
    
    const currentStep = steps[stepIndex];

    const handleBack = () => {
        if (stepIndex > 0) {
            SoundSynth.play('pop');
            setStepIndex(prev => prev - 1);
        }
    };

    const handleCheck = () => {
        if (!showResult && selectedOption !== null) {
            let correct = false;
            if (currentStep.type === 'quiz') correct = selectedOption === currentStep.correct;
            else if (currentStep.type === 'fill') correct = currentStep.options![selectedOption] === currentStep.correct;
            setIsCorrect(correct); setShowResult(true);
            if (correct) SoundSynth.play('correct'); 
            else { SoundSynth.play('wrong'); setShake(true); setTimeout(() => setShake(false), 500); if (!isReviewMode) setMistakes(prev => [...prev, currentStep]); }
        }
    };

    const handleContinue = () => {
        // Ordinary navigation is silent on web and WeChat; answer feedback stays audible.
        if (isReviewMode && showResult && !isCorrect) { setSelectedOption(null); setShowResult(false); return; }
        if (!canAdvance(currentStep.type, showResult, isCorrect, isReviewMode)) return;
        if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1);
        else {
            if (!isReviewMode && mistakes.length > 0) { setSteps([...mistakes]); setStepIndex(0); setMistakes([]); setIsReviewMode(true); }
            else { onComplete(); }
        }
    };

    return (
        <div className="fixed inset-0 h-[100dvh] bg-white z-50 flex flex-col overflow-hidden">
            {/* 增强型导航栏 */}
          <div className={`lesson-nav shrink-0 px-3 py-2 sm:px-4 sm:pt-6 sm:pb-4 flex items-center gap-3 sm:gap-4 ${isReviewMode ? 'bg-orange-50' : ''}`}>
                <div className="flex items-center gap-3">
                    <button onClick={onExit} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90" title={UI.exit}>
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                    {stepIndex > 0 && (
                        <button onClick={handleBack} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors animate-pop active:scale-90" title={UI.previous}>
                            <i className="fa-solid fa-chevron-left text-2xl"></i>
                        </button>
                    )}
                </div>
                <div className="flex-1">
                    {isReviewMode ? <div className="text-center text-orange-600 font-bold"><i className="fa-solid fa-rotate-left mr-2"></i>{UI.review}</div> : <ProgressBar current={stepIndex + 1} total={steps.length} />}
                </div>
            </div>

            <div key={`${stepIndex}-${isReviewMode}`} className={`lesson-stage min-h-0 flex-1 flex flex-col items-center justify-start sm:justify-center px-4 py-3 sm:p-6 max-w-2xl mx-auto w-full overflow-y-auto overscroll-contain ${shake ? 'animate-shake' : ''}`}>
                {currentStep.type === 'video' && <VideoPlayer url={currentStep.url!} />}
                {currentStep.type === 'interactive' && <InteractiveLab step={currentStep} onComplete={() => { setIsCorrect(true); setShowResult(true); }} />}
                {(currentStep.type === 'theory' || currentStep.type === 'boss') && <TheoryContent content={currentStep.content || currentStep.question} isBoss={currentStep.isBoss || currentStep.type === 'boss'} />}
                {currentStep.type === 'quiz' && <div className="w-full"><h2 className="text-2xl font-bold mb-8"><InlineText text={currentStep.question || ""} /></h2><div className="space-y-3">{currentStep.options?.map((opt, i) => <button key={i} onClick={() => !showResult && setSelectedOption(i)} className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${showResult && i === currentStep.correct ? 'bg-green-100 border-green-500 text-green-700' : showResult && i === selectedOption ? 'bg-red-100 border-red-500 text-red-700' : !showResult && selectedOption === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>{opt}</button>)}</div></div>}
                {currentStep.type === 'match' && <MatchGame step={currentStep} onCorrect={() => { setIsCorrect(true); setShowResult(true); SoundSynth.play('correct'); }}/>}
                {currentStep.type === 'fill' && (
                    <div className="w-full">
                        {currentStep.question && <h2 className="text-2xl font-bold mb-6 text-gray-800"><InlineText text={currentStep.question || ""} /></h2>}
                        <FillBlank step={currentStep} selectedIdx={selectedOption} showResult={showResult} isCorrect={isCorrect} onSelect={setSelectedOption}/>
                    </div>
                )}
                {currentStep.type === 'practice' && (
                    <PracticeBox lessonId={`${IS_EN ? 'en' : 'zh'}:${weekId}-${dayId}`} draftId={`${IS_EN ? 'en' : 'zh'}:${weekId}-${dayId}:practice:${lessonData!.steps.filter(item => item.type === 'practice').indexOf(currentStep)}`} step={currentStep} onPass={() => { setIsCorrect(true); setShowResult(true); handleContinue(); }} />
                )}
                {showResult && (currentStep.type === 'quiz' || currentStep.type === 'fill') && <div className="w-full mt-5 p-4 rounded-2xl bg-indigo-50 space-y-2">
                  <p className="font-bold">{tr('正确答案：', 'Correct answer: ')}{currentStep.type === 'quiz' ? currentStep.options?.[Number(currentStep.correct)] : currentStep.correct}</p>
                  {currentStep.explanation && <p>{currentStep.explanation}</p>}
                  {!isCorrect && <p>{isReviewMode ? tr('看完解析，再答一次。', 'Read the explanation, then try again.') : tr('继续学习，课末再试一次。', 'Continue learning, then try this again at the end.')}</p>}
                </div>}
            </div>
            
            <div className={`lesson-footer shrink-0 px-4 py-3 sm:p-6 border-t ${showResult ? (isCorrect ? 'bg-green-100' : 'bg-red-100') : 'bg-white'}`}>
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    {showResult && currentStep.type !== 'practice' && <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{isCorrect ? UI.correct : tr('请查看解析', 'See explanation')}</div>}
                    <div className="flex-1"></div>
                    {currentStep.type === 'practice' ? null
                      : (currentStep.type === 'interactive' || currentStep.type === 'match') && !showResult
                      ? null
                        : (currentStep.type === 'quiz' || currentStep.type === 'fill') && !showResult
                        ? <button onClick={handleCheck} disabled={selectedOption === null} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform">{UI.check}</button>
                        : <button onClick={handleContinue} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">{isReviewMode && !isCorrect ? tr('重新作答', 'Try again') : UI.continue}</button>}
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
const LevelMarker = ({ isUnlocked, isCompleted, icon, weekTitle, onClick }: { isUnlocked: boolean, isCompleted: boolean, icon: string, weekTitle: string, onClick: () => void }) => (
  <button type="button" onClick={onClick} disabled={!isUnlocked} className="relative flex w-full flex-col items-center group active:scale-95 animate-pop disabled:cursor-not-allowed">
    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 shadow-xl flex items-center justify-center transition-all duration-500 ${isUnlocked ? 'bg-gradient-to-br from-orange-400 to-red-500 border-white text-white' : 'bg-white/40 border-gray-300 text-gray-400 grayscale'}`}>
      <i className={`fa-solid ${isUnlocked ? icon : 'fa-lock'} text-4xl sm:text-5xl`}></i>
      {isCompleted && <div className="absolute -top-3 -right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-yellow-400 flex items-center justify-center shadow-lg"><i className="fa-solid fa-check text-red-600 text-base sm:text-xl"></i></div>}
    </div>
    <div className={`mt-3 w-full max-w-[17rem] px-4 py-2 rounded-full shadow-lg text-center transition-all ${isUnlocked ? 'bg-white text-indigo-900' : 'bg-gray-100/80 text-gray-400'}`}><span className="font-bold text-sm leading-snug">{weekTitle}</span></div>
  </button>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashImageStatus, setSplashImageStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [view, setView] = useState<'world' | 'week' | 'lesson'>('world');
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [initialProgress] = useState(loadProgress);
  const [completedDaysPerWeek, setCompletedDaysPerWeek] = useState(initialProgress.completedDays);
  const [progressError, setProgressError] = useState(initialProgress.error);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const activeWeeks = WEEKS;
  const position = progressPosition(completedDaysPerWeek);
  const unlockedWeek = position.week;

  useEffect(() => {
    document.documentElement.lang = IS_EN ? 'en' : 'zh-CN';
    document.title = IS_EN ? 'Draco AI Learning Quest' : 'AI 驯龙之路';
  }, []);

  useEffect(() => {
    if (splashImageStatus !== 'ready') return;
    const splashTimer = window.setTimeout(() => setShowSplash(false), 3000);
    return () => window.clearTimeout(splashTimer);
  }, [splashImageStatus]);

  const currentCompletedDays = selectedWeekId ? (completedDaysPerWeek[selectedWeekId] || 0) : 0;

  const updateProgress = (completedDays: CompletedDays) => {
    setCompletedDaysPerWeek(completedDays);
    setProgressError(saveProgress(completedDays));
  };

  const handleUnlockAll = () => { 
    SoundSynth.play('success');
    const allDone = { 1: 7, 2: 7, 3: 7, 4: 7 };
    updateProgress(allDone);
    setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); 
  };

  const handleLessonComplete = () => {
    SoundSynth.play('complete');
    if (selectedWeekId && selectedDayId === currentCompletedDays + 1) {
        const nextDays = currentCompletedDays + 1;
        updateProgress({ ...completedDaysPerWeek, [selectedWeekId]: nextDays });
        const weekLength = ALL_CURRICULUM[selectedWeekId]?.length || 0;
        if (nextDays === weekLength) {
            setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000);
        }
    }
    setView('week');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen select-none text-gray-900 overflow-x-hidden">
        {showSplash && <div className="fixed inset-0 z-[100] bg-[#93cf4f] flex flex-col items-center justify-center transition-opacity duration-700">
            <div className="relative animate-bounce-slight mb-8">
                <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center animate-pop overflow-hidden border-8 border-white shadow-2xl">
                    <img src={MASCOT_IMAGE_URL} onLoad={() => setSplashImageStatus('ready')} onError={() => setSplashImageStatus('error')} className="w-full h-full object-contain" alt={tr('Draco AI 龙吉祥物', 'Draco AI dragon mascot')} />
                </div>
            </div>
            <h1 className="text-white text-5xl font-bold game-font drop-shadow-lg mb-2">Draco AI</h1>
            <p className="text-white/80 font-medium tracking-widest uppercase">{tr('踏上 AI 驯龙之路', 'Master the AI Dragon')}</p>
            {splashImageStatus === 'error' && <div className="mt-6 text-center text-white">
              <p role="alert">{tr('龙的开场图片加载失败，请刷新重试，或直接进入课程。', 'The dragon image could not load. Refresh to retry, or continue to the course.')}</p>
              <button onClick={() => setShowSplash(false)} className="mt-3 rounded-full bg-white px-6 py-3 font-bold text-green-800">{tr('进入课程', 'Start learning')}</button>
            </div>}
        </div>}

        {!showSplash && (
          <>
            {showConfetti && <ConfettiEffect />}
            {showGlossary && <StudyCards language={IS_EN ? 'en' : 'zh'} onClose={() => setShowGlossary(false)} />}
            <MapMusic language={IS_EN ? 'en' : 'zh'} active={!showGlossary && (view === 'world' || view === 'week')} scene={view === 'week' ? `week-${selectedWeekId}` : view} />
            {view === 'world' && <WorldMap language={IS_EN ? 'en' : 'zh'} weeks={activeWeeks} unlockedWeek={unlockedWeek} completed={completedDaysPerWeek} onGlossary={() => setShowGlossary(true)} error={progressError} onWeek={week => { setSelectedWeekId(week); setView('week'); SoundSynth.play('pop'); }} />}

            {view === 'week' && selectedWeekId && <div className="min-h-screen bg-[#3f64e7] flex flex-col relative">
                <div className="p-4 flex flex-wrap items-center justify-between gap-3 text-white z-10 sticky top-0 bg-[#3f64e7]/80 backdrop-blur-md">
                    <div className="flex min-w-0 items-center gap-4">
                        <button onClick={() => setView('world')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors active:scale-90"><i className="fa-solid fa-arrow-left"></i></button>
                        <h2 className="text-xl font-bold">{WEEKS.find(w=>w.id===selectedWeekId)?.title}</h2>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-16 py-12 px-6 relative max-w-lg mx-auto w-full">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 border-l-4 border-dashed border-white/20 pointer-events-none"></div>
                    
                    {(ALL_CURRICULUM[selectedWeekId] || []).map((day, idx) => {
                        const isUnlocked = idx <= currentCompletedDays;
                        const isDone = idx < currentCompletedDays;
                        return (
                            <div 
                                key={day.day} 
                                className={`flex flex-col items-center gap-3 transition-all animate-pop
                                    ${idx % 2 === 0 ? '-translate-x-14' : 'translate-x-14'}
                                `}
                                style={{animationDelay: `${idx * 0.1}s` }}
                            >
                                <button 
                                    onClick={() => isUnlocked && (setSelectedDayId(day.day), setView('lesson'), SoundSynth.play('pop'))} 
                                    className={`relative group w-20 h-20 rounded-full border-b-8 flex items-center justify-center text-3xl shadow-xl transition-all 
                                        ${isDone ? 'bg-yellow-400 border-yellow-600 text-yellow-900' : 
                                          isUnlocked ? 'bg-orange-500 border-orange-700 text-white animate-bounce-slight hover:scale-105 active:translate-y-1 active:border-b-0' : 
                                          'bg-gray-400 border-gray-600 text-gray-200 cursor-not-allowed opacity-60'}
                                    `}
                                >
                                    {isDone ? <i className="fa-solid fa-check"></i> : isUnlocked ? <i className="fa-solid fa-star"></i> : <i className="fa-solid fa-lock"></i>}
                                    {isUnlocked && !isDone && (
                                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none"></div>
                                    )}
                                </button>
                                <div className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-md transition-colors whitespace-nowrap
                                    ${isUnlocked ? 'bg-white text-indigo-900 border-2 border-indigo-100' : 'bg-black/30 text-white/60'}
                                `}>
                                    {tr(`第 ${day.day} 天`, `Day ${day.day}`)}
                                </div>
                            </div>
                        );
                    })}
                    
                    <div className="mt-8 text-white/40 text-sm font-bold tracking-widest uppercase flex flex-col items-center gap-4">
                        <i className="fa-solid fa-dragon text-4xl"></i>
                        <span>{tr('龙穴出口', 'DRAGON GATE')}</span>
                    </div>
                </div>
            </div>}

            {view === 'lesson' && selectedWeekId && selectedDayId && <LessonEngine weekId={selectedWeekId} dayId={selectedDayId} onComplete={handleLessonComplete} onExit={() => setView('week')} />}
          </>
        )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
