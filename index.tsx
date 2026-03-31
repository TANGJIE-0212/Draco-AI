
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { WEEKS, ALL_CURRICULUM } from './curriculum';
import { LessonStep, DayContent } from './types';

// --- 配置区 ---
const MASCOT_IMAGE_URL = "https://raw.githubusercontent.com/TANGJIE-0212/Draco-AI/8118a6af6c6981b3a862eac05d215198fd449559/Draco%20AI.jpg"; 

// AI 名词数据
const AI_GLOSSARY = [
  { term: "Token (词元)", definition: "AI处理文本的最小单位。不是单词，而是被切碎的语义碎片。", example: "就像把句子拆成一块块‘语义乐高’。" },
  { term: "Embedding (嵌入)", definition: "将Token转化成高维空间坐标的过程，捕捉词与词之间的关系。", example: "把词放到‘语义宇宙’中，意思相近的靠得更近。", emoji: "🌌" },
  { term: "Prompt (提示词)", definition: "用户输入给AI的指令，是引导AI预测下一个词的‘咒语’。", example: "你对厨师提的要求，要求越细，菜越合口味。", emoji: "🪄" },
  { term: "Hallucination (幻觉)", definition: "AI一本正经地胡说八道。因为它只是在猜下一个词，而不是在查证事实。", example: "一个博学但爱吹牛的朋友在给你讲故事。", emoji: "😵‍💫" },
  { term: "Transformer", definition: "现代AI的底层引擎，核心超能力是‘注意力机制’。", example: "让AI在读长文章时，能瞬间关注到重点词汇。", emoji: "🏎️" },
  { term: "RAG (检索增强)", definition: "给AI配一本书。AI先查书（外部资料），再结合内容回答问题。", example: "开卷考试，AI不再只凭记忆，而是可以看参考书。", emoji: "📚" },
  { term: "Multi-modal (多模态)", definition: "AI不仅能看文字，还能理解图像、声音、视频。", example: "AI以前是盲人，现在有了眼睛和耳朵。", emoji: "👁️" },
  { term: "RLHF", definition: "基于人类反馈的强化学习。通过人类的‘点赞’或‘点踩’来训练AI的价值观。", example: "像教小孩懂礼貌，做对了给糖，做错了纠正。", emoji: "👍" }
];

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
  return (
    <div className="w-full aspect-video bg-indigo-950 rounded-2xl overflow-hidden mb-6 relative shadow-2xl">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-indigo-900">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-400 border-t-yellow-400 rounded-full animate-spin"></div>
            <i className="fa-solid fa-dragon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-xl animate-pulse"></i>
          </div>
          <p className="mt-4 text-indigo-200 text-sm font-medium tracking-widest animate-pulse">龙之影像载入中...</p>
        </div>
      )}
      <iframe 
        src={url} 
        className={`w-full h-full transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        allowFullScreen 
        onLoad={() => setIsLoading(false)}
      ></iframe>
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
            <i className="fa-solid fa-book-sparkles text-yellow-400"></i> AI 名词本
          </h2>
          
          <div className="w-full max-w-sm h-80 perspective-1000" onClick={handleFlip}>
            <div className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backface-hidden border-4 border-white">
                <div className="text-4xl text-indigo-600 mb-4"><i className="fa-solid fa-brain"></i></div>
                <h3 className="text-2xl font-bold text-gray-800 text-center">{AI_GLOSSARY[currentIndex].term}</h3>
                <p className="mt-4 text-gray-400 text-sm italic">点击查看定义</p>
              </div>
              <div className="absolute inset-0 bg-indigo-50 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backface-hidden rotate-y-180 border-4 border-indigo-400 overflow-y-auto">
                <h4 className="text-indigo-600 font-bold mb-2">定义:</h4>
                <p className="text-gray-800 text-center text-base leading-relaxed mb-4">{AI_GLOSSARY[currentIndex].definition}</p>
                <div className="bg-white/60 p-3 rounded-xl border border-indigo-200">
                    <p className="text-xs text-gray-500"><i className="fa-solid fa-lightbulb text-yellow-500 mr-1"></i> {AI_GLOSSARY[currentIndex].example}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 sm:gap-8 mt-10">
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors active:scale-90"><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={(e) => { e.stopPropagation(); startQuiz(); }} className="px-6 py-2 rounded-full bg-yellow-400 text-indigo-900 font-bold hover:bg-yellow-300 shadow-lg flex items-center gap-2 text-sm sm:text-base active:translate-y-1 transition-all">随机抽查</button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors active:scale-90"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
          <p className="mt-6 text-white/50 text-sm">{currentIndex + 1} / {AI_GLOSSARY.length}</p>
        </>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl animate-pop relative overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">这是什么的定义？</h2>
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
                  {quizResult.correct ? "🎉 太棒了！你答对了" : "💡 没关系，再复习一下吧"}
                </div>
                <button 
                  onClick={handleQuizFinish} 
                  className={`w-full py-3 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-transform ${quizResult.correct ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  继续
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

// --- Chat Sensei ---
const ChatSensei = ({ context, onClose }: { context: string, onClose: () => void }) => {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([{ role: 'model', text: "我是你的AI导师。关于这节课，尽管问我！" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    SoundSynth.play('pop');
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: "user", parts: [{ text: `Context: 你是一个面向初学者的AI教学App中友好、睿智且简洁的AI导师。当前课程内容是："${context}"。用户问："${input}"。请用中文简短且鼓励性地回答。` }] }]
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      SoundSynth.play('pop');
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "我与以太的连接微弱。请重试。" }]);
    } finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-pop">
        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2"><i className="fa-solid fa-robot text-xl animate-bounce"></i><span className="font-bold">AI 导师</span></div>
          <button onClick={() => { SoundSynth.play('click'); onClose(); }} className="text-white/80 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>{m.text}</div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-white border p-3 rounded-2xl rounded-tl-none"><i className="fa-solid fa-circle-notch fa-spin text-indigo-500"></i> 思考中...</div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="关于本课提问..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button onClick={handleSend} disabled={loading} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-transform active:scale-90"><i className="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  );
};

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

const PracticalTask = ({ step, onComplete }: { step: LessonStep, onComplete: () => void }) => {
    const [input, setInput] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCheck = async () => {
        if (!input.trim() || isChecking) return;
        setIsChecking(true);
        setFeedback(null);
        SoundSynth.play('pop');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{ role: "user", parts: [{ text: `你是一个专业的AI课程导师。
任务要求：${step.task}
用户提交内容：${input}

请评估用户的提交。
1. 如果用户基本完成了任务，请以 "PASS" 开头，然后给出简短的鼓励和总结。
2. 如果用户未完成或有明显错误，请以 "FAIL" 开头，然后分条列出具体的改进建议，最后给出一个正确的参考示例。

要求：
- 使用 Markdown 格式。
- 语气友好、睿智。
- 改进建议要具体，不要空洞。
- 请直接输出内容，不要包含 "[你的改进建议]" 这种占位符。` }] }]
            });
            const text = response.text;
            if (text.toUpperCase().startsWith("PASS")) {
                setFeedback(text.replace(/^PASS:?\s*/i, "").trim());
                setIsSuccess(true);
                SoundSynth.play('success');
            } else {
                setFeedback(text.replace(/^FAIL:?\s*/i, "").trim());
                setIsSuccess(false);
                SoundSynth.play('wrong');
            }
        } catch (e) {
            setFeedback("评估连接失败，请重试。");
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="w-full animate-slide-up space-y-6">
            <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-scroll"></i> 实战任务
                </h3>
                <p className="text-indigo-800 text-lg leading-relaxed">{step.task}</p>
                {step.hint && <p className="mt-3 text-indigo-600 text-sm italic"><i className="fa-solid fa-lightbulb mr-1"></i> 提示：{step.hint}</p>}
            </div>

            <div className="relative">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="在此输入你的 AI 咒语或实战结果..."
                    className="w-full h-48 p-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-gray-800"
                    disabled={isSuccess}
                />
                {isSuccess && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center"><i className="fa-solid fa-circle-check text-green-500 text-6xl animate-pop"></i></div>}
            </div>

            {feedback && (
                <div className={`p-5 rounded-2xl animate-slide-up flex gap-4 border-2 ${isSuccess ? 'bg-green-50 text-green-900 border-green-200' : 'bg-red-50 text-red-900 border-red-200'}`}>
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        <i className={`fa-solid ${isSuccess ? 'fa-check' : 'fa-exclamation'}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold mb-2 text-base">{isSuccess ? '导师评价' : '改进建议'}</h4>
                        <div className="markdown-body text-sm max-w-none text-current leading-relaxed">
                            <ReactMarkdown>{feedback}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

            {!isSuccess ? (
                <button 
                    onClick={handleCheck} 
                    disabled={!input.trim() || isChecking}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isChecking ? <><i className="fa-solid fa-dragon fa-spin"></i> 导师评估中...</> : <><i className="fa-solid fa-paper-plane"></i> 提交评估</>}
                </button>
            ) : (
                <button 
                    onClick={onComplete}
                    className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-forward"></i> 下一关
                </button>
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
    const [showSensei, setShowSensei] = useState(false);

    useEffect(() => { if (lessonData) setSteps(lessonData.steps); }, [lessonData]);
    useEffect(() => { setSelectedOption(null); setShowResult(false); setIsCorrect(false); setShake(false); }, [stepIndex, isReviewMode]);

    if (!steps || steps.length === 0) return <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6"><h2 className="text-xl font-bold mb-4">本课暂无内容</h2><button onClick={onExit} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">返回</button></div>;
    
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
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* 增强型导航栏 */}
            <div className={`px-4 pt-6 pb-4 flex items-center gap-4 ${isReviewMode ? 'bg-orange-50' : ''}`}>
                <div className="flex items-center gap-3">
                    <button onClick={onExit} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90" title="退出">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                    {stepIndex > 0 && (
                        <button onClick={handleBack} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full transition-colors animate-pop active:scale-90" title="上一步">
                            <i className="fa-solid fa-chevron-left text-2xl"></i>
                        </button>
                    )}
                </div>
                <div className="flex-1">
                    {isReviewMode ? (
                        <div className="text-center text-orange-600 font-bold"><i className="fa-solid fa-rotate-left mr-2"></i>错题复习</div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <ProgressBar current={stepIndex + 1} total={steps.length} />
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>进度: {Math.round(((stepIndex + 1) / steps.length) * 100)}%</span>
                                <span>关卡 {stepIndex + 1} / {steps.length}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full overflow-y-auto ${shake ? 'animate-shake' : ''}`}>
                {currentStep.type === 'video' && <VideoPlayer url={currentStep.url!} />}
                {(currentStep.type === 'theory' || currentStep.type === 'boss') && <div className="text-center animate-slide-up"><h2 className="text-2xl font-bold mb-4">{currentStep.content}</h2><i className={`fa-solid ${currentStep.isBoss ? 'fa-dragon text-red-500' : 'fa-lightbulb text-orange-400'} text-6xl animate-bounce-slight`}></i></div>}
                {currentStep.type === 'quiz' && <div className="w-full"><h2 className="text-2xl font-bold mb-8">{currentStep.question}</h2><div className="space-y-3">{currentStep.options?.map((opt, i) => <button key={i} onClick={() => !showResult && setSelectedOption(i)} className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${showResult && i === currentStep.correct ? 'bg-green-100 border-green-500 text-green-700' : showResult && i === selectedOption ? 'bg-red-100 border-red-500 text-red-700' : !showResult && selectedOption === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>{opt}</button>)}</div></div>}
                {currentStep.type === 'match' && <MatchGame step={currentStep} onCorrect={() => { setIsCorrect(true); setShowResult(true); SoundSynth.play('correct'); }}/>}
                {currentStep.type === 'fill' && (
                    <div className="w-full">
                        {currentStep.question && <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentStep.question}</h2>}
                        <FillBlank step={currentStep} selectedIdx={selectedOption} showResult={showResult} isCorrect={isCorrect} onSelect={setSelectedOption}/>
                    </div>
                )}
                {currentStep.type === 'practical' && <PracticalTask step={currentStep} onComplete={handleContinue} />}
            </div>
            
            {currentStep.type !== 'practical' && (
                <button onClick={() => setShowSensei(true)} className="absolute top-24 right-4 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-lg active:scale-90 transition-transform z-40">
                    <i className="fa-solid fa-robot text-indigo-600"></i>
                </button>
            )}
            {showSensei && <ChatSensei context={currentStep.question || currentStep.content || currentStep.task || ""} onClose={() => setShowSensei(false)} />}
            
            <div className={`p-6 border-t ${showResult ? (isCorrect ? 'bg-green-100' : 'bg-red-100') : 'bg-white'} ${currentStep.type === 'practical' ? 'hidden' : ''}`}>
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    {showResult && <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{isCorrect ? "正确！" : "再试试看"}</div>}
                    <div className="flex-1"></div>
                    {(currentStep.type === 'quiz' || currentStep.type === 'fill') && !showResult ? <button onClick={handleCheck} disabled={selectedOption === null} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform">检查</button> : <button onClick={handleContinue} className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">继续</button>}
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
const LevelMarker = ({ isUnlocked, isCompleted, icon, weekTitle, onClick }: { isUnlocked: boolean, isCompleted: boolean, icon: string, weekTitle: string, onClick: () => void }) => (
  <div onClick={onClick} className="relative flex flex-col items-center group cursor-pointer active:scale-95 animate-pop">
    <div className={`relative w-24 h-24 rounded-3xl border-4 shadow-xl flex items-center justify-center transition-all duration-500 ${isUnlocked ? 'bg-gradient-to-br from-orange-400 to-red-500 border-white text-white' : 'bg-white/40 border-gray-300 text-gray-400 grayscale'}`}>
      <i className={`fa-solid ${isUnlocked ? icon : 'fa-lock'} text-5xl`}></i>
      {isUnlocked && <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-white bg-yellow-400 flex items-center justify-center shadow-lg"><i className="fa-solid fa-star text-red-600 text-xl"></i></div>}
    </div>
    <div className={`mt-3 px-4 py-1.5 rounded-full shadow-lg text-center transition-all ${isUnlocked ? 'bg-white text-indigo-900' : 'bg-gray-100/80 text-gray-400'}`}><span className="font-bold text-xs">{weekTitle}</span></div>
  </div>
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

  const currentCompletedDays = selectedWeekId ? (completedDaysPerWeek[selectedWeekId] || 0) : 0;

  const handleUnlockAll = () => { 
    SoundSynth.play('success');
    setUnlockedWeek(7); 
    setCollectedBalls(7); 
    const allDone = { 1: 7, 2: 7, 3: 7, 4: 7, 5: 7, 6: 7, 7: 7 };
    setCompletedDaysPerWeek(allDone);
    setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); 
  };

  const handleLessonComplete = () => {
    if (selectedWeekId && selectedDayId === currentCompletedDays + 1) {
        const nextDays = currentCompletedDays + 1;
        setCompletedDaysPerWeek(prev => ({ ...prev, [selectedWeekId]: nextDays }));
        const weekLength = ALL_CURRICULUM[selectedWeekId]?.length || 0;
        if (nextDays === weekLength) {
            setCollectedBalls(prev => Math.min(prev + 1, 7));
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
                    <img src={MASCOT_IMAGE_URL} className="w-full h-full object-contain" onLoad={() => setTimeout(() => setShowSplash(false), 3000)}/>
                </div>
            </div>
            <h1 className="text-white text-5xl font-bold game-font drop-shadow-lg mb-2">Draco AI</h1>
            <p className="text-white/80 font-medium tracking-widest uppercase">Master the AI Dragon</p>
        </div>}

        {!showSplash && (
          <>
            {showConfetti && <ConfettiEffect />}
            {showGlossary && <GlossaryView onClose={() => setShowGlossary(false)} />}
            
            {view === 'world' && (
              <div className="flex flex-col items-center h-screen bg-[#8bc34a] bg-gradient-to-b from-[#8bc34a] to-[#689f38] relative overflow-hidden">
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

                <div className="z-30 w-full flex flex-col items-center pt-8 gap-3">
                    <h1 className="text-4xl font-bold text-white drop-shadow-md game-font">AI 驯龙之路</h1>
                    <div className="bg-white/90 px-6 py-2 rounded-full shadow-lg border-2 border-yellow-200 flex items-center gap-3">
                        <span className="text-orange-600 font-bold flex items-center gap-2 text-xl"><i className="fa-solid fa-dragon"></i> {collectedBalls}/7 龙珠</span>
                    </div>
                </div>
                
                <button onClick={handleUnlockAll} className="z-30 absolute top-4 right-4 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/40 shadow-sm active:scale-95 transition-transform">一键解锁</button>
                
                <div className="z-20 flex-1 w-full max-w-sm flex flex-col justify-around py-8 px-10">
                    {WEEKS.map((week, idx) => (
                        <div key={week.id} className={`flex w-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <LevelMarker isUnlocked={week.id <= unlockedWeek} isCompleted={week.id < unlockedWeek} icon={week.icon === 'fa-magnifying-glass' ? 'fa-house' : week.icon} weekTitle={week.title} onClick={() => week.id <= unlockedWeek && (setSelectedWeekId(week.id), setView('week'), SoundSynth.play('pop'))} />
                        </div>
                    ))}
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
                        <i className="fa-solid fa-book-sparkles"></i> 名词本
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
                                    第 {day.day} 天
                                </div>
                            </div>
                        );
                    })}
                    
                    <div className="mt-8 text-white/40 text-sm font-bold tracking-widest uppercase flex flex-col items-center gap-4">
                        <i className="fa-solid fa-dragon text-4xl"></i>
                        <span>龙穴出口</span>
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
