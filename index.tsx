
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { WEEKS as WEEKS_ZH, ALL_CURRICULUM as CURRICULUM_ZH } from './curriculum';
import { WEEKS_EN, ALL_CURRICULUM_EN } from './curriculum-en';
import { LessonStep, DayContent } from './types';

// --- 配置区 ---
const MASCOT_IMAGE_URL = "/brand/draco-ai.jpg";
const IS_EN = window.location.pathname.startsWith('/en');
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
  improveHint: tr('再补充角色目标、输入、步骤、输出格式或边界限制后即可提交。', 'Add the goal, input, steps, output format, or boundaries before checking.'),
  selfCheck: tr('开始自检', 'Start self-check'),
  selfCheckStandards: tr('自检标准', 'Self-check criteria'),
  reference: tr('查看参考答案', 'View reference answer'),
  confirm: tr('我已对照自检标准检查答案，必要时也查看了参考答案。', 'I checked my answer against the criteria and reviewed the reference answer if needed.'),
  revise: tr('返回修改', 'Revise answer'),
  finishPractice: tr('完成并继续', 'Finish and continue'),
};

// AI 名词数据
const AI_GLOSSARY_ZH = [
  { term: "Token (词元)", definition: "AI处理文本的最小单位。不是单词，而是被切碎的语义碎片。", example: "就像把句子拆成一块块‘语义乐高’。" },
  { term: "Embedding (嵌入)", definition: "将Token转化成高维空间坐标的过程，捕捉词与词之间的关系。", example: "把词放到‘语义宇宙’中，意思相近的靠得更近。", emoji: "🌌" },
  { term: "Prompt (提示词)", definition: "用户输入给AI的指令，是引导AI预测下一个词的‘咒语’。", example: "你对厨师提的要求，要求越细，菜越合口味。", emoji: "🪄" },
  { term: "Hallucination (幻觉)", definition: "AI一本正经地胡说八道。因为它只是在猜下一个词，而不是在查证事实。", example: "一个博学但爱吹牛的朋友在给你讲故事。", emoji: "😵‍💫" },
  { term: "Transformer", definition: "现代AI的底层引擎，核心超能力是‘注意力机制’。", example: "让AI在读长文章时，能瞬间关注到重点词汇。", emoji: "🏎️" },
  { term: "RAG (检索增强)", definition: "给AI配一本书。AI先查书（外部资料），再结合内容回答问题。", example: "开卷考试，AI不再只凭记忆，而是可以看参考书。", emoji: "📚" },
  { term: "Multi-modal (多模态)", definition: "AI不仅能看文字，还能理解图像、声音、视频。", example: "AI以前是盲人，现在有了眼睛和耳朵。", emoji: "👁️" },
  { term: "RLHF", definition: "基于人类反馈的强化学习。通过人类的‘点赞’或‘点踩’来训练AI的价值观。", example: "像教小孩懂礼貌，做对了给糖，做错了纠正。", emoji: "👍" }
];
const AI_GLOSSARY_EN = [
  { term: 'Token', definition: 'A basic unit of text processed by a language model. It may be a word, character, or word fragment.', example: 'Like breaking a sentence into text blocks.' },
  { term: 'Embedding', definition: 'A numeric vector that places meaning in a computable semantic space.', example: 'Related ideas tend to be closer on a semantic map.', emoji: '🌌' },
  { term: 'Prompt', definition: 'The task, context, evidence, and constraints provided to an AI system.', example: 'Like giving a cook a clear order and dietary limits.', emoji: '🪄' },
  { term: 'Hallucination', definition: 'A fluent AI output that is unsupported or factually incorrect.', example: 'A confident answer still needs evidence.', emoji: '😵‍💫' },
  { term: 'Transformer', definition: 'A neural-network architecture that uses attention to connect information across a sequence.', example: 'It helps the model focus on relevant context.', emoji: '🏎️' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation: retrieve evidence first, then generate an answer from it.', example: 'An open-book exam for AI.', emoji: '📚' },
  { term: 'Multimodal AI', definition: 'AI that works with more than one kind of information, such as text, images, audio, and video.', example: 'One system can read, see, and listen.', emoji: '👁️' },
  { term: 'RLHF', definition: 'Reinforcement Learning from Human Feedback: using human preferences to shape model behavior.', example: 'People compare outputs and signal which behavior is better.', emoji: '👍' },
];
const AI_GLOSSARY = IS_EN ? AI_GLOSSARY_EN : AI_GLOSSARY_ZH;

// --- Audio System ---
const SoundSynth = {
  ctx: null as AudioContext | null,
  init: () => {
    if (!SoundSynth.ctx) {
      SoundSynth.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (SoundSynth.ctx.state === 'suspended') {
      SoundSynth.ctx.resume();
    }
  },
  playTone: (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth', duration: number, startTime = 0) => {
    if (!SoundSynth.ctx) SoundSynth.init();
    const ctx = SoundSynth.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  },
  play: (effect: 'pop' | 'correct' | 'wrong' | 'success' | 'complete' | 'click' | 'match' | 'flip') => {
    SoundSynth.init();
    switch (effect) {
      case 'pop': SoundSynth.playTone(600 + Math.random() * 200, 'sine', 0.1); break;
      case 'flip': SoundSynth.playTone(800, 'sine', 0.05); break;
      case 'click': SoundSynth.playTone(400, 'sine', 0.05); break;
      case 'match': SoundSynth.playTone(880, 'sine', 0.1); break;
      case 'correct':
        SoundSynth.playTone(523.25, 'sine', 0.1, 0);
        SoundSynth.playTone(659.25, 'sine', 0.1, 0.1);
        SoundSynth.playTone(783.99, 'sine', 0.2, 0.2);
        break;
      case 'wrong': SoundSynth.playTone(150, 'sawtooth', 0.3); SoundSynth.playTone(100, 'sawtooth', 0.3, 0.1); break;
      case 'success': [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => SoundSynth.playTone(f, 'triangle', 0.3, i * 0.1)); break;
      case 'complete': SoundSynth.playTone(440, 'sine', 0.1); break;
    }
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
            src={url}
            className={`w-full h-full object-contain transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            controls
            playsInline
            preload="metadata"
            onCanPlay={() => setIsLoading(false)}
          />
        ) : (
          <iframe
            src={url}
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizResult, setQuizResult] = useState<{correct: boolean, show: boolean} | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  
  const handleNext = () => {
    SoundSynth.play('pop');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % AI_GLOSSARY.length);
  };

  const handlePrev = () => {
    SoundSynth.play('pop');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + AI_GLOSSARY.length) % AI_GLOSSARY.length);
  };

  const handleFlip = () => {
    SoundSynth.play('flip');
    setIsFlipped(!isFlipped);
  };

  const startQuiz = () => {
    SoundSynth.play('success');
    setQuizMode(true);
    const randomIndex = Math.floor(Math.random() * AI_GLOSSARY.length);
    setCurrentIndex(randomIndex);
    const correct = AI_GLOSSARY[randomIndex];
    const distractors = AI_GLOSSARY
      .filter(i => i.term !== correct.term)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(i => i.definition);
    setQuizOptions([correct.definition, ...distractors].sort(() => 0.5 - Math.random()));
    setQuizResult(null);
  };

  const checkAnswer = (ans: string) => {
    if (quizResult?.show) return;
    const isCorrect = ans === AI_GLOSSARY[currentIndex].definition;
    setQuizResult({ correct: isCorrect, show: true });
    if (isCorrect) SoundSynth.play('correct');
    else SoundSynth.play('wrong');
  };

  const handleQuizFinish = () => {
    SoundSynth.play('pop');
    setQuizMode(false);
    setQuizResult(null);
    setIsFlipped(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1a237e]/95 z-[60] flex flex-col items-center justify-center p-6 animate-pop">
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl hover:scale-110 transition active:scale-90"><i className="fa-solid fa-xmark"></i></button>
      
      {!quizMode ? (
        <>
          <h2 className="text-white text-2xl font-bold mb-8 flex items-center gap-2">
            <i className="fa-solid fa-book-sparkles text-yellow-400"></i> {UI.glossary}
          </h2>
          
          <div className="w-full max-w-sm h-80 perspective-1000" onClick={handleFlip}>
            <div className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backface-hidden border-4 border-white">
                <div className="text-4xl text-indigo-600 mb-4"><i className="fa-solid fa-brain"></i></div>
                <h3 className="text-2xl font-bold text-gray-800 text-center">{AI_GLOSSARY[currentIndex].term}</h3>
                <p className="mt-4 text-gray-400 text-sm italic">{UI.flipCard}</p>
              </div>
              <div className="absolute inset-0 bg-indigo-50 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backface-hidden rotate-y-180 border-4 border-indigo-400 overflow-y-auto">
                <h4 className="text-indigo-600 font-bold mb-2">{UI.definition}</h4>
                <p className="text-gray-800 text-center text-base leading-relaxed mb-4">{AI_GLOSSARY[currentIndex].definition}</p>
                <div className="bg-white/60 p-3 rounded-xl border border-indigo-200">
                    <p className="text-xs text-gray-500"><i className="fa-solid fa-lightbulb text-yellow-500 mr-1"></i> {AI_GLOSSARY[currentIndex].example}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 sm:gap-8 mt-10">
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors active:scale-90"><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={(e) => { e.stopPropagation(); startQuiz(); }} className="px-6 py-2 rounded-full bg-yellow-400 text-indigo-900 font-bold hover:bg-yellow-300 shadow-lg flex items-center gap-2 text-sm sm:text-base active:translate-y-1 transition-all">{UI.randomQuiz}</button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors active:scale-90"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
          <p className="mt-6 text-white/50 text-sm">{currentIndex + 1} / {AI_GLOSSARY.length}</p>
        </>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl animate-pop relative overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{UI.quizPrompt}</h2>
          <div className="p-4 bg-indigo-50 rounded-2xl mb-6 text-center border-2 border-dashed border-indigo-200">
            <h3 className="text-2xl font-bold text-indigo-600">{AI_GLOSSARY[currentIndex].term}</h3>
          </div>
          <div className="space-y-4 mb-8">
            {quizOptions.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => checkAnswer(opt)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm transition-all
                  ${quizResult?.show && opt === AI_GLOSSARY[currentIndex].definition ? 'bg-green-100 border-green-500 text-green-700 font-bold' : 
                    quizResult?.show && opt !== AI_GLOSSARY[currentIndex].definition ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-white border-gray-200 hover:border-indigo-500'}
                `}
              >
                {opt}
              </button>
            ))}
          </div>

          {quizResult?.show && (
            <div className={`p-4 -mx-8 -mb-8 mt-4 animate-slide-up ${quizResult.correct ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="flex flex-col gap-4">
                <div className={`font-bold text-center ${quizResult.correct ? 'text-green-700' : 'text-red-700'}`}>
                  {quizResult.correct ? tr('太棒了！你答对了', 'Great work — correct!') : tr('没关系，再复习一下吧', 'Review the card and try again.')}
                </div>
                <button 
                  onClick={handleQuizFinish} 
                  className={`w-full py-3 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-transform ${quizResult.correct ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {UI.continue}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
    const [leftSelected, setLeftSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<Set<string>>(new Set());
    const [shuffledRight, setShuffledRight] = useState<{id: string, text: string}[]>([]);
    useEffect(() => {
        if (step.pairs) {
            const rightItems = step.pairs.map(p => ({ id: p.left, text: p.right }));
            setShuffledRight(rightItems.sort(() => Math.random() - 0.5));
        }
    }, [step]);
    const handleLeftClick = (id: string) => { if (matched.has(id)) return; SoundSynth.play('pop'); setLeftSelected(id); };
    const handleRightClick = (id: string) => {
        if (matched.has(id)) return;
        if (leftSelected === id) {
            SoundSynth.play('match');
            const newMatched = new Set(matched); newMatched.add(id); setMatched(newMatched); setLeftSelected(null);
            if (newMatched.size === step.pairs?.length) setTimeout(onCorrect, 500);
        } else { SoundSynth.play('wrong'); setLeftSelected(null); }
    };
    return (
        <div className="w-full flex gap-4 justify-between animate-slide-up">
            <div className="flex flex-col gap-3 w-1/2">{step.pairs?.map(pair => (
                <button key={pair.left} onClick={() => handleLeftClick(pair.left)} disabled={matched.has(pair.left)} className={`p-4 rounded-xl border-2 text-sm sm:text-base font-bold transition-all ${matched.has(pair.left) ? 'bg-green-100 border-green-500 opacity-50' : leftSelected === pair.left ? 'bg-blue-100 border-blue-500 scale-105' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>{pair.left}</button>
            ))}</div>
            <div className="flex flex-col gap-3 w-1/2">{shuffledRight.map(item => (
                <button key={item.id} onClick={() => handleRightClick(item.id)} disabled={matched.has(item.id)} className={`p-4 rounded-xl border-2 text-sm sm:text-base transition-all ${matched.has(item.id) ? 'bg-green-100 border-green-500 opacity-50' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>{item.text}</button>
            ))}</div>
        </div>
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

    useEffect(() => {
      setProgress(0);
      setSelected(null);
      setTemperature(1);
      setOrder([]);
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
        ['1950', '图灵测试', '把“机器能否思考”变成可观察的对话问题'],
        ['1956', '达特茅斯会议', '人工智能成为有名称的研究领域'],
        ['1997', '深蓝', '强力搜索与人工知识击败棋王'],
        ['2016', 'AlphaGo', '神经网络、学习与搜索共同解决围棋'],
        ['2017', 'Transformer', '注意力机制奠定大语言模型路线'],
        ['2022', 'ChatGPT', '生成式 AI 通过自然语言走向大众']
      ];
      return shell(<>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {events.map(([year, title, detail], index) => <button key={year} onClick={() => { setSelected(year); setProgress(Math.max(progress, index + 1)); SoundSynth.play('pop'); }} className={`min-h-28 rounded-2xl border-2 p-3 text-left transition-all ${selected === year ? 'border-orange-500 bg-orange-50 scale-[1.02]' : 'border-gray-200 bg-white'}`}><div className="text-2xl font-black text-indigo-700">{year}</div><div className="font-bold">{title}</div>{selected === year && <div className="mt-2 text-sm text-gray-600">{detail}</div>}</button>)}
        </div>
        {progress >= 4 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">时间线已读懂</button>}
      </>, '按时间点击至少四个节点，观察 AI 如何从规则、搜索走向学习和生成。');
    }

    if (step.interactiveKind === 'bpe') {
      const stages = [
        ['人', '工', '智', '能'],
        ['人工', '智', '能'],
        ['人工', '智能']
      ];
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-6">
          <div className="mb-5 text-center text-sm font-bold text-gray-500">当前 Token 数：{stages[progress].length}</div>
          <div className="flex flex-wrap justify-center gap-3">{stages[progress].map(token => <span key={token} className="rounded-xl border-2 border-indigo-300 bg-indigo-50 px-5 py-4 text-2xl font-black text-indigo-800">{token}</span>)}</div>
        </div>
        {progress < 2 ? <button onClick={() => { setProgress(progress + 1); SoundSynth.play('match'); }} className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white">合并高频片段：{progress === 0 ? '人 + 工' : '智 + 能'}</button> : <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">完成：4 块变成 2 块</button>}
      </>, '亲手完成两轮简化 BPE 合并，观察高频组合如何缩短 Token 序列。');
    }

    if (step.interactiveKind === 'embedding') {
      const concepts = [{name:'猫',x:18,y:22},{name:'狗',x:35,y:30},{name:'汽车',x:68,y:65},{name:'自行车',x:82,y:55}];
      return shell(<>
        <div className="relative h-72 rounded-2xl border-2 border-indigo-100 bg-[radial-gradient(circle,_#c7d2fe_1px,_transparent_1px)] bg-[size:20px_20px]">
          {concepts.map(item => <button key={item.name} onClick={() => { setSelected(item.name); setProgress(progress + 1); SoundSynth.play('pop'); }} style={{left:`${item.x}%`,top:`${item.y}%`}} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-4 py-3 font-black shadow ${selected === item.name ? 'border-orange-500 bg-orange-100' : 'border-indigo-500 bg-white'}`}>{item.name}</button>)}
          <div className="absolute bottom-3 left-3 text-xs text-gray-500">距离近：语义可能相关，不代表事实相同</div>
        </div>
        {selected && <div className="rounded-xl bg-indigo-50 p-4 text-center font-bold">你选择了“{selected}”。观察它离同类概念更近。</div>}
        {progress >= 3 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">我理解语义距离的边界</button>}
      </>, '点击语义星图中的概念，观察同类词为何更接近，并记住“相关不等于正确”。');
    }

    if (step.interactiveKind === 'attention') {
      const labels = ['小明', '书', '小刚'];
      const values = [progress === 0 ? 34 : 12, progress === 0 ? 33 : 18, progress === 0 ? 33 : 70];
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5 space-y-4">
          <div className="text-lg font-bold">“小明把书递给小刚，因为 <span className="text-orange-600">他</span> 明天要演讲。”</div>
          {labels.map((label,index)=><div key={label}><div className="mb-1 flex justify-between text-sm font-bold"><span>{label}</span><span>{values[index]}%</span></div><div className="h-4 rounded-full bg-gray-100"><div className="h-4 rounded-full bg-indigo-500 transition-all duration-500" style={{width:`${values[index]}%`}} /></div></div>)}
        </div>
        {progress === 0 ? <button onClick={() => { setProgress(1); SoundSynth.play('pop'); }} className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white">补充上下文：“小刚明天要演讲”</button> : <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">完成：上下文改变注意力重点</button>}
      </>, '观察代词“他”对三个候选位置的注意力。补充上下文后，权重会重新分配。');
    }

    if (step.interactiveKind === 'temperature') {
      const base = [60, 25, 10, 5];
      const adjusted = base.map(value => Math.pow(value / 100, 1 / temperature));
      const total = adjusted.reduce((sum, value) => sum + value, 0);
      const probabilities = adjusted.map(value => Math.round(value / total * 100));
      const labels = ['散步', '野餐', '写作业', '开飞船'];
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
          <div className="mb-4 flex justify-between font-bold"><span>稳定</span><span>Temperature：{temperature.toFixed(1)}</span><span>冒险</span></div>
          <input aria-label="Temperature" type="range" min="0.4" max="1.8" step="0.1" value={temperature} onChange={event => { setTemperature(Number(event.target.value)); setProgress(1); }} className="w-full accent-orange-500" />
          <div className="mt-6 grid grid-cols-4 items-end gap-3 h-48">{labels.map((label,index)=><div key={label} className="flex h-full flex-col justify-end text-center"><div className="mb-2 text-sm font-black">{probabilities[index]}%</div><div className="mx-auto w-full max-w-16 rounded-t-lg bg-indigo-500 transition-all" style={{height:`${Math.max(8, probabilities[index] * 2.2)}px`}}/><div className="mt-2 text-xs sm:text-sm font-bold">{label}</div></div>)}</div>
        </div>
        {progress > 0 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">完成：温度改变分布，不增加知识</button>}
      </>, '拖动冒险旋钮，观察 Softmax 概率变尖或变平。');
    }

    if (step.interactiveKind === 'evidence') {
      const tools: Record<string,string> = {天气:'权威天气来源',算术:'计算器',校规:'学校原始文件',故事:'人工创意筛选'};
      return shell(<>
        <div className="grid grid-cols-2 gap-3">{Object.entries(tools).map(([task,tool])=><button key={task} onClick={() => { setSelected(task); setProgress(progress + 1); SoundSynth.play('pop'); }} className={`rounded-2xl border-2 p-4 text-left ${selected === task ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}><div className="text-xl font-black">{task}</div>{selected === task && <div className="mt-2 text-sm text-gray-600">核验方式：{tool}</div>}</button>)}</div>
        {progress >= 3 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">完成：不同问题连接不同证据</button>}
      </>, '点击不同任务，为它选择真正可靠的证据或工具，而不是只让模型再猜一次。');
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
      </>, step.interactiveInstruction || '找出所有真正会让系统失败的因素。误选不会扣分，可以继续诊断。');
    }

    if (step.interactiveKind === 'sequence') {
      const target = step.interactiveSequence ?? [];
      const choices = target.filter(item => !order.includes(item));
      return shell(<>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
          <div className="mb-4 min-h-16 flex flex-wrap gap-2">{order.map((item,index)=><span key={item} className="rounded-xl bg-green-100 px-3 py-2 font-bold text-green-700">{index+1}. {item}</span>)}</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{choices.map(item=><button key={item} onClick={() => {
            const nextIndex = order.length;
            if (item !== target[nextIndex]) { SoundSynth.play('wrong'); setOrder([]); }
            else { SoundSynth.play('match'); setOrder([...order, item]); }
          }} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-3 font-bold">{item}</button>)}</div>
        </div>
        {order.length === target.length && target.length > 0 && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{UI.sequenceDone}</button>}
      </>, step.interactiveInstruction || '按真实依赖顺序点击步骤，点错会重新开始。');
    }

    const target = ['Tokenizer', 'Embedding', 'Attention', 'Logits', 'Softmax', 'Sampling'];
    const choices = target.filter(item => !order.includes(item));
    const isCorrectOrder = order.every((item,index) => item === target[index]);
    return shell(<>
      <div className="rounded-2xl border-2 border-indigo-100 bg-white p-5">
        <div className="mb-4 min-h-16 flex flex-wrap gap-2">{order.map((item,index)=><span key={item} className={`rounded-xl px-3 py-2 font-bold ${item === target[index] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{index+1}. {item}</span>)}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{choices.map(item=><button key={item} onClick={() => { const next=[...order,item]; if(item !== target[next.length-1]) { SoundSynth.play('wrong'); setOrder([]); } else { SoundSynth.play('match'); setOrder(next); } }} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-3 font-bold">{item}</button>)}</div>
      </div>
      {order.length === target.length && isCorrectOrder && <button onClick={finish} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">生产线排序完成</button>}
    </>, '按真实生成顺序点击六个模块。点错会重新开始。');
  };

  const InlineText = ({ text }: { text: string }) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return <>{parts.map((part, index) => part.startsWith('**') && part.endsWith('**')
      ? <strong key={index} className="font-black text-indigo-950">{part.slice(2, -2)}</strong>
      : <React.Fragment key={index}>{part}</React.Fragment>
    )}</>;
  };

  const TheoryContent = ({ content, isBoss }: { content?: string, isBoss?: boolean }) => {
    const lines = (content || '').split('\n').map(line => line.trim());
    const blocks: React.ReactNode[] = [];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index];
      if (!line) { index++; continue; }

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

const PracticeBox = ({ step, onPass }: { step: LessonStep, onPass: () => void }) => {
    const [text, setText] = useState("");
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
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">{step.task}</div>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={showSelfCheck}
                placeholder={step.placeholder || tr(`在这里写下你的答案……（至少 ${minLen} 字）`, `Write your answer here (at least ${minLen} characters).`)}
                className="w-full min-h-[160px] p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-base leading-relaxed resize-y disabled:bg-gray-50"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm text-gray-500">
              <div>
                <span>{UI.written} <span className={charCount >= minLen ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>{charCount}</span> / {minLen} {UI.chars}</span>
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
                    <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{step.rubric}</div>
                    </div>
                  {step.referenceAnswer && (
                        <details className="bg-white/60 rounded-xl p-3">
                            <summary className="font-bold text-indigo-700 cursor-pointer"><i className="fa-solid fa-lightbulb mr-1"></i>{UI.reference}</summary>
                      <div className="mt-2 text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{step.referenceAnswer}</div>
                        </details>
                    )}
                  <label className="flex items-start gap-3 rounded-xl bg-white p-3 cursor-pointer">
                    <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 w-5 h-5 accent-green-600" />
                    <span className="text-sm text-gray-700">{UI.confirm}</span>
                  </label>
                    <div className="flex gap-2 pt-2">
                    <button onClick={() => { setShowSelfCheck(false); setConfirmed(false); }} className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2 rounded-xl font-bold active:scale-95">{UI.revise}</button>
                    <button onClick={() => { SoundSynth.play('correct'); onPass(); }} disabled={!confirmed} className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold shadow disabled:opacity-40 active:scale-95">{UI.finishPractice}</button>
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
        SoundSynth.play('pop');
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

            <div className={`lesson-stage min-h-0 flex-1 flex flex-col items-center justify-start sm:justify-center px-4 py-3 sm:p-6 max-w-2xl mx-auto w-full overflow-y-auto overscroll-contain ${shake ? 'animate-shake' : ''}`}>
                {currentStep.type === 'video' && <VideoPlayer url={currentStep.url!} />}
                {currentStep.type === 'interactive' && <InteractiveLab step={currentStep} onComplete={() => { setIsCorrect(true); setShowResult(true); }} />}
                {(currentStep.type === 'theory' || currentStep.type === 'boss') && <TheoryContent content={currentStep.content || currentStep.question} isBoss={currentStep.isBoss || currentStep.type === 'boss'} />}
                {currentStep.type === 'quiz' && <div className="w-full"><h2 className="text-2xl font-bold mb-8">{currentStep.question}</h2><div className="space-y-3">{currentStep.options?.map((opt, i) => <button key={i} onClick={() => !showResult && setSelectedOption(i)} className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${showResult && i === currentStep.correct ? 'bg-green-100 border-green-500 text-green-700' : showResult && i === selectedOption ? 'bg-red-100 border-red-500 text-red-700' : !showResult && selectedOption === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>{opt}</button>)}</div></div>}
                {currentStep.type === 'match' && <MatchGame step={currentStep} onCorrect={() => { setIsCorrect(true); setShowResult(true); SoundSynth.play('correct'); }}/>}
                {currentStep.type === 'fill' && (
                    <div className="w-full">
                        {currentStep.question && <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentStep.question}</h2>}
                        <FillBlank step={currentStep} selectedIdx={selectedOption} showResult={showResult} isCorrect={isCorrect} onSelect={setSelectedOption}/>
                    </div>
                )}
                {currentStep.type === 'practice' && (
                    <PracticeBox step={currentStep} onPass={() => { setIsCorrect(true); setShowResult(true); handleContinue(); }} />
                )}
            </div>
            
            <div className={`lesson-footer shrink-0 px-4 py-3 sm:p-6 border-t ${showResult ? (isCorrect ? 'bg-green-100' : 'bg-red-100') : 'bg-white'}`}>
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    {showResult && currentStep.type !== 'practice' && <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{isCorrect ? UI.correct : UI.retry}</div>}
                    <div className="flex-1"></div>
                    {currentStep.type === 'practice' ? null
                      : currentStep.type === 'interactive' && !showResult
                      ? null
                        : (currentStep.type === 'quiz' || currentStep.type === 'fill') && !showResult
                        ? <button onClick={handleCheck} disabled={selectedOption === null} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform">{UI.check}</button>
                        : <button onClick={handleContinue} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">{UI.continue}</button>}
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
  const [view, setView] = useState<'world' | 'week' | 'lesson'>('world');
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [unlockedWeek, setUnlockedWeek] = useState(1);
  const [collectedBalls, setCollectedBalls] = useState(0);
  const [completedDaysPerWeek, setCompletedDaysPerWeek] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const activeWeeks = WEEKS;

  useEffect(() => {
    document.documentElement.lang = IS_EN ? 'en' : 'zh-CN';
    document.title = IS_EN ? 'Draco AI Learning Quest' : 'AI 驯龙之路';
    const splashTimer = window.setTimeout(() => setShowSplash(false), 3000);
    return () => window.clearTimeout(splashTimer);
  }, []);

  const currentCompletedDays = selectedWeekId ? (completedDaysPerWeek[selectedWeekId] || 0) : 0;

  const handleUnlockAll = () => { 
    SoundSynth.play('success');
    setUnlockedWeek(4);
    setCollectedBalls(4);
    const allDone = { 1: 7, 2: 7, 3: 7, 4: 7 };
    setCompletedDaysPerWeek(allDone);
    setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); 
  };

  const handleLessonComplete = () => {
    if (selectedWeekId && selectedDayId === currentCompletedDays + 1) {
        const nextDays = currentCompletedDays + 1;
        setCompletedDaysPerWeek(prev => ({ ...prev, [selectedWeekId]: nextDays }));
        const weekLength = ALL_CURRICULUM[selectedWeekId]?.length || 0;
        if (nextDays === weekLength) {
            setCollectedBalls(prev => Math.min(prev + 1, 4));
            if (selectedWeekId === unlockedWeek) setUnlockedWeek(prev => prev + 1);
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
                    <img src={MASCOT_IMAGE_URL} className="w-full h-full object-contain" alt={tr('Draco AI 龙吉祥物', 'Draco AI dragon mascot')} />
                </div>
            </div>
            <h1 className="text-white text-5xl font-bold game-font drop-shadow-lg mb-2">Draco AI</h1>
            <p className="text-white/80 font-medium tracking-widest uppercase">{tr('踏上 AI 驯龙之路', 'Master the AI Dragon')}</p>
        </div>}

        {!showSplash && (
          <>
            {showConfetti && <ConfettiEffect />}
            {showGlossary && <GlossaryView onClose={() => setShowGlossary(false)} />}

            {view === 'world' && (
              <div className="min-h-screen bg-[#8bc34a] bg-gradient-to-b from-[#8bc34a] to-[#689f38] relative overflow-x-hidden">
                {/* 动态背景装饰层 */}
                <div className="absolute inset-0 z-0 pointer-events-none map-grid opacity-30"></div>
                
                {/* 漂浮的云朵 - 分散布局 */}
                {/* 云1：左上 */}
                <i className="fa-solid fa-cloud absolute top-[12%] left-[10%] text-white/40 text-6xl animate-float-cloud z-0" style={{ animationDelay: '-5s' }}></i>
                {/* 云2：中偏右 */}
                <i className="fa-solid fa-cloud absolute top-[35%] left-[55%] text-white/20 text-4xl animate-float-cloud-slow z-0" style={{ animationDelay: '-18s' }}></i>
                {/* 云3：中偏左 */}
                <i className="fa-solid fa-cloud absolute top-[55%] left-[25%] text-white/30 text-8xl animate-float-cloud-slow z-0" style={{ animationDelay: '-10s' }}></i>
                {/* 云4：底部偏右 */}
                <i className="fa-solid fa-cloud absolute top-[82%] left-[65%] text-white/25 text-5xl animate-float-cloud z-0" style={{ animationDelay: '-22s' }}></i>
                
                {/* 闪烁的星光/宝藏光芒 - 全面分散 */}
                <i className="fa-solid fa-star absolute top-[15%] left-[5%] text-yellow-200/40 text-xs animate-twinkle"></i>
                <i className="fa-solid fa-star absolute top-[28%] right-[15%] text-yellow-200/30 text-sm animate-twinkle" style={{ animationDelay: '1.5s' }}></i>
                <i className="fa-solid fa-star absolute top-[50%] left-[18%] text-yellow-200/50 text-xs animate-twinkle" style={{ animationDelay: '0.8s' }}></i>
                <i className="fa-solid fa-star absolute top-[70%] right-[10%] text-yellow-200/40 text-sm animate-twinkle" style={{ animationDelay: '2.2s' }}></i>
                <i className="fa-solid fa-star absolute bottom-[15%] left-[45%] text-yellow-200/50 text-xs animate-twinkle" style={{ animationDelay: '1.2s' }}></i>
                <i className="fa-solid fa-star absolute top-[35%] right-[5%] text-yellow-200/30 text-xs animate-twinkle" style={{ animationDelay: '3s' }}></i>
                <i className="fa-solid fa-star absolute top-[5%] right-[35%] text-yellow-200/20 text-xs animate-twinkle" style={{ animationDelay: '2.5s' }}></i>
                <i className="fa-solid fa-star absolute bottom-[35%] left-[8%] text-yellow-200/35 text-sm animate-twinkle" style={{ animationDelay: '1.8s' }}></i>
                
                {/* 龙的阴影掠过 */}
                <i className="fa-solid fa-dragon absolute text-black/5 text-[200px] animate-dragon-shadow"></i>

                <div className="relative z-30 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-5 pt-5 sm:pt-7 md:pb-8">
                    <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
                      <div className="text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md game-font">{tr('AI 驯龙之路', 'Draco AI Learning Quest')}</h1>
                        <p className="mt-1 text-sm sm:text-base font-semibold text-white/80">{tr('四周完成从 AI 原理到智能体工程的学习', 'Four weeks from AI fundamentals to agent engineering')}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <nav className="flex rounded-full border-2 border-white/60 bg-white/20 p-1 text-sm font-bold text-white" aria-label={tr('语言切换', 'Language switcher')}>
                          <a href="/zh/" className={`rounded-full px-3 py-1.5 ${!IS_EN ? 'bg-white text-indigo-800' : 'hover:bg-white/15'}`}>中文</a>
                          <a href="/en/" className={`rounded-full px-3 py-1.5 ${IS_EN ? 'bg-white text-indigo-800' : 'hover:bg-white/15'}`}>English</a>
                        </nav>
                        <div className="bg-white/90 px-5 py-2 rounded-full shadow-lg border-2 border-yellow-200 flex items-center gap-3">
                          <span className="text-orange-600 font-bold flex items-center gap-2 text-lg sm:text-xl"><i className="fa-solid fa-dragon"></i> {collectedBalls}/4 {tr('龙珠', 'orbs')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full justify-center sm:justify-end">
                      <button onClick={handleUnlockAll} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold border border-white/50 shadow-sm active:scale-95 transition-transform">{tr('一键解锁', 'Unlock all')}</button>
                    </div>
                </div>
                
                <div className="relative z-20 mx-auto w-full max-w-sm px-5 pb-14 sm:max-w-md md:max-w-6xl md:px-8 md:pb-20 md:pt-8">
                  <div className="absolute bottom-20 left-1/2 top-4 w-1 -translate-x-1/2 rounded-full bg-white/25 md:bottom-auto md:left-20 md:right-20 md:top-[4.75rem] md:h-1 md:w-auto md:translate-x-0"></div>
                  <div className="relative grid grid-cols-1 gap-9 md:grid-cols-4 md:gap-6">
                      {activeWeeks.map((week, idx) => (
                      <div key={week.id} className={`flex w-full ${idx % 2 === 0 ? 'justify-start pr-16' : 'justify-end pl-16'} md:justify-center md:px-0`}>
                        <LevelMarker isUnlocked={week.id <= unlockedWeek} isCompleted={(completedDaysPerWeek[week.id] || 0) >= 7} icon={week.icon === 'fa-magnifying-glass' ? 'fa-house' : week.icon} weekTitle={week.title} onClick={() => week.id <= unlockedWeek && (setSelectedWeekId(week.id), setView('week'), SoundSynth.play('pop'))} />
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            )}

            {view === 'week' && selectedWeekId && <div className="min-h-screen bg-[#3f64e7] flex flex-col relative">
                <div className="p-4 flex items-center justify-between text-white z-10 sticky top-0 bg-[#3f64e7]/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setView('world')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors active:scale-90"><i className="fa-solid fa-arrow-left"></i></button>
                        <h2 className="text-xl font-bold">{WEEKS.find(w=>w.id===selectedWeekId)?.title}</h2>
                    </div>
                    {selectedWeekId === 1 && (
                      <button onClick={() => setShowGlossary(true)} className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-2xl font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-transform">
                        <i className="fa-solid fa-book-sparkles"></i> {UI.glossary}
                      </button>
                    )}
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
