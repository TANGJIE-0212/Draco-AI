import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import content from '../../core-video-content.json';
import manifest from '../../generated/core-video-manifest.json';
import '../day-one/style.css';

export const OVERVIEW_FPS = 15;
const GAP_SECONDS = 0.25;

type SceneKind = 'opening' | 'timeline' | 'rules' | 'learning' | 'challenge' | 'recap';
type Scene = {
  id: string;
  kind: SceneKind;
  eyebrow: string;
  title: string;
  body: string;
  labels: string[];
  narration: string;
  reveal?: string;
};
type VideoEntry = {id: string; output: string; lesson: string; language: 'zh-CN' | 'en-US'; scenes: Scene[]};
type Cue = {start: number; end: number; text: string};
type Timing = {id: string; audio: string; durationSeconds: number; cues: Cue[]};

const videos = content.videos as VideoEntry[];
const timingsById = manifest as Record<string, Timing[]>;
const framesFor = (seconds: number) => Math.max(1, Math.ceil((seconds + GAP_SECONDS) * OVERVIEW_FPS));

export const getOverviewDurationInFrames = (id: string) => {
  const timings = timingsById[id] ?? [];
  return Math.max(OVERVIEW_FPS, timings.reduce((total, timing) => total + framesFor(timing.durationSeconds), 0));
};

const DragonMark = () => (
  <div className="dragon-mark" aria-hidden="true">
    <Img className="dragon-mascot" src={staticFile('brand/draco-ai-transparent.png')} />
  </div>
);

const TimelineVisual: React.FC<{labels: string[]; progress: number}> = ({labels, progress}) => (
  <div className="timeline">
    <div className="timeline-track"><div className="timeline-progress" style={{transform: `scaleX(${progress})`}} /></div>
    {labels.map((label, index) => (
      <div className="timeline-step" key={label} style={{opacity: progress >= index / Math.max(1, labels.length) ? 1 : 0.25}}>
        <span className={`timeline-dot dot-${index + 1}`}>{index + 1}</span><span>{label}</span>
      </div>
    ))}
  </div>
);

const RulesVisual: React.FC<{labels: string[]; progress: number}> = ({labels, progress}) => (
  <div className="rule-flow">
    {labels.map((label, index) => <React.Fragment key={label}>
      <div className={`rule-card rule-card-${index + 1}`} style={{opacity: progress > index * 0.22 ? 1 : 0.15}}><span>{index + 1}</span><p>{label}</p></div>
      {index < labels.length - 1 && <div className="flow-arrow">→</div>}
    </React.Fragment>)}
  </div>
);

const LearningVisual: React.FC<{labels: string[]; progress: number}> = ({labels, progress}) => (
  <div className="learning-flow">
    {labels.map((label, index) => <div className="learning-stage" key={label} style={{transform: `translateY(${Math.max(0, index * 12 - progress * 42)}px)`}}>
      <div className={`learning-icon learning-icon-${index + 1}`}>{index + 1}</div><span>{label}</span>
    </div>)}
  </div>
);

const ChallengeVisual: React.FC<{scene: Scene; progress: number}> = ({scene, progress}) => {
  const revealed = progress > 0.7;
  return <div className="challenge-grid">
    {scene.labels.map((label, index) => <div className={`answer-card ${revealed && index === 1 ? 'answer-correct' : ''}`} key={label}>{label}</div>)}
    <div className={`answer-reveal ${revealed ? 'answer-reveal-visible' : ''}`}>{scene.reveal}</div>
  </div>;
};

const RecapVisual: React.FC<{labels: string[]}> = ({labels}) => (
  <div className="recap-grid">{labels.map((label, index) => <div className="recap-item" key={label}><span>0{index + 1}</span><p>{label}</p></div>)}</div>
);

const Caption: React.FC<{cues: Cue[]; frame: number}> = ({cues, frame}) => {
  const seconds = frame / OVERVIEW_FPS;
  const cue = cues.find(item => seconds >= item.start && seconds <= item.end);
  return cue ? <div className="caption">{cue.text}</div> : null;
};

const SceneView: React.FC<{scene: Scene; timing: Timing; lesson: string; language: 'zh-CN' | 'en-US'}> = ({scene, timing, lesson, language}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = framesFor(timing.durationSeconds);
  const progress = interpolate(frame, [0, duration - 1], [0, 1], {extrapolateRight: 'clamp'});
  const entrance = spring({frame, fps, config: {damping: 18, stiffness: 85}});
  const opacity = interpolate(frame, [0, 8, duration - 8, duration - 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad),
  });
  return <AbsoluteFill className={`scene scene-${scene.kind} language-${language}`} style={{opacity}}>
    <div className="texture" />
    <header className="topbar"><DragonMark /><span>{lesson}</span><span>{language === 'zh-CN' ? '核心机制' : 'CORE MECHANISM'}</span></header>
    <main className="scene-layout" style={{transform: `translateY(${(1 - entrance) * 34}px)`}}>
      <section className="copy-column"><div className="eyebrow">{scene.eyebrow}</div><h1>{scene.title}</h1><p className="scene-body">{scene.body}</p></section>
      <section className="visual-column">
        {scene.kind === 'opening' && <DragonMark />}
        {scene.kind === 'timeline' && <TimelineVisual labels={scene.labels} progress={progress} />}
        {scene.kind === 'rules' && <RulesVisual labels={scene.labels} progress={progress} />}
        {scene.kind === 'learning' && <LearningVisual labels={scene.labels} progress={progress} />}
        {scene.kind === 'challenge' && <ChallengeVisual scene={scene} progress={progress} />}
        {scene.kind === 'recap' && <RecapVisual labels={scene.labels} />}
      </section>
    </main>
    <div className="progress-line" style={{transform: `scaleX(${progress})`}} />
    <Caption cues={timing.cues} frame={frame} />
  </AbsoluteFill>;
};

export const CourseOverviewVideo: React.FC<{videoId: string}> = ({videoId}) => {
  const video = videos.find(item => item.id === videoId);
  const timings = timingsById[videoId] ?? [];
  if (!video) return null;
  let startFrame = 0;
  return <AbsoluteFill className="video-canvas">
    {video.scenes.map((scene, index) => {
      const timing = timings[index];
      if (!timing) return null;
      const durationInFrames = framesFor(timing.durationSeconds);
      const from = startFrame;
      startFrame += durationInFrames;
      return <Sequence key={scene.id} from={from} durationInFrames={durationInFrames} premountFor={OVERVIEW_FPS}>
        <Audio src={staticFile(timing.audio)} /><SceneView scene={scene} timing={timing} lesson={video.lesson} language={video.language} />
      </Sequence>;
    })}
  </AbsoluteFill>;
};
