import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. Before image-to-video generation, what should you decide first?', options: ['Add all actions at once', 'One key message for this shot', 'Set duration to the maximum first', 'Choose aspect ratio randomly'], correct: 1 },
  { type: 'quiz', question: '2. Which motion prompt is the clearest?', options: ['Make it more cinematic', 'Character runs, jumps, turns, waves, with explosion in background', 'Camera slowly pushes in while the character looks up at a star map', 'Make everything move'], correct: 2 },
  { type: 'quiz', question: '3. What do we call a camera that slowly moves toward the subject?', options: ['Push-in', 'Pull-out', 'Side-pan', 'Top-down shot'], correct: 0 },
  { type: 'quiz', question: '4. Why should one shot avoid too many actions?', options: ['Fewer actions always make smaller files', 'The model may confuse action order and cause deformation', 'Shots can only contain still characters', 'Narration cannot describe actions'], correct: 1 },
  { type: 'quiz', question: '5. Common aspect ratio for vertical knowledge shorts?', options: ['9:16', '16:9', '1:1', '21:9'], correct: 0 },
  { type: 'quiz', question: '6. For a 3-shot plan, which approach is better?', options: ['Repeat the same action in all three shots', 'Give each shot one narrative role with clear duration', 'Use push, pull, and pan all at once in every shot', 'Write visuals only, no motion notes'], correct: 1 },
  { type: 'fill', question: '7. Text describing how the camera moves is camera ___.', parts: ['Text describing camera movement is camera', '___', '.'], options: ['motion', 'narration', 'source'], correct: 'motion' },
  { type: 'fill', question: '8. Looking up, flipping pages, or pointing at a star map are subject ___.', parts: ['These are subject', '___', '.'], options: ['actions', 'aspect ratio', 'duration'], correct: 'actions' },
  { type: 'fill', question: '9. 9:16 and 16:9 represent video ___.', parts: ['9:16 and 16:9 represent video', '___', '.'], options: ['aspect ratio', 'frame rate', 'volume'], correct: 'aspect ratio' },
  { type: 'quiz', question: '10. A 5-second shot asks for run, jump, turn, take a book, and speak. Best fix?', options: ['Split into multiple shots, one major action per shot', 'Write a longer prompt but keep one shot', 'Cut to 2 seconds so action is faster', 'Add an orbit camera for impact'], correct: 0 },
  { type: 'practice', task: '11. [Shot Motion Sheet] Design 2-3 shots for one knowledge story. For each shot, write visual focus, camera motion, subject action, duration, and aspect ratio. Limit each shot to one main action.', rubric: 'Must include 2-3 continuous shots; each shot needs full fields: visual focus, camera motion, subject action, duration, aspect ratio. Actions should fit the allocated time and avoid overstuffing.', placeholder: 'Shot 1 | Visual: ... | Camera motion: ... | Subject action: ... | Duration: ... sec | Aspect ratio: ...\nShot 2 | ...', minLength: 90, referenceAnswer: 'Shot 1 | Wide shot of night library | Slow push-in | Little dragon looks up at star map | 4s | 9:16. Shot 2 | Close-up of evidence card | Gentle side-pan | Dragon points to “Moon reflects sunlight” | 5s | 9:16. Shot 3 | Mid shot for wrap-up | Slow pull-out | Dragon puts card into project box | 4s | 9:16.' },
  { type: 'match', question: '12. Match: camera motions', pairs: [{ left: 'Camera gradually moves toward subject', right: 'Push-in' }, { left: 'Camera gradually moves away from subject', right: 'Pull-out' }, { left: 'Camera moves horizontally with subject', right: 'Side-pan' }, { left: 'Camera does not move', right: 'Static shot' }] },
  { type: 'match', question: '13. Match: actions and shot purpose', pairs: [{ left: 'Dragon looks up at star map', right: 'Shows discovery' }, { left: 'Claw points to source sentence', right: 'Highlights evidence' }, { left: 'Card goes into project box', right: 'Shows completion' }, { left: 'Background clouds drift slowly', right: 'Adds light environmental motion' }] },
  { type: 'match', question: '14. Match: duration and content', pairs: [{ left: '3 seconds', right: 'One simple look-up action' }, { left: '5 seconds', right: 'Show and point to one evidence line' }, { left: 'Action cannot finish in time', right: 'Extend duration or reduce actions' }, { left: 'Shot lingers too long', right: 'Shorten duration or add reasonable change' }] },
  { type: 'match', question: '15. Match: issues and fixes', pairs: [{ left: 'Character limbs deform visibly', right: 'Reduce complex motion and regenerate' }, { left: 'Camera shake hurts readability', right: 'Use static or slower camera motion' }, { left: 'Horizontal asset for vertical platform', right: 'Re-plan 9:16 composition' }, { left: 'Three shots have no narrative link', right: 'Reorder as discover, verify, conclude' }] },
];

export const v3enw3d5Data: DayContent = {
  day: 5,
  title: 'Video Mechanics: Keyframes, Inter-Frame Generation, Temporal Consistency',
  shards: 30,
  steps: [
    { type: 'theory', content: '🎞️ **First Try | Keyframes to Continuous Frames**\nVideo generation can be viewed as keyframe conditioning plus in-between frame transition. Today we focus on keeping character identity, props, and lighting consistent over time.' },
    { type: 'video', url: '', content: 'Video: from static key visual to a rough 2-3-shot video sequence' },
    { type: 'theory', content: '🧭 **Card 1 | Keyframe Design**\nDefine start pose, end pose, and key prop positions for each shot. Clear keyframes reduce drift during interpolation.' },
    { type: 'theory', content: '⏱️ **Card 2 | Inter-Frame Consistency**\nAdjacent frames should preserve identity anchors and motion continuity. Avoid “frame A is one character, frame B becomes another.”' },
    { type: 'theory', content: '📐 **Card 3 | Temporal Consistency Check**\nCheck three things: continuous character appearance, continuous prop trajectory, and continuous causal order. If frame jumps appear, reset keyframes.' },
    ...graded,
    { type: 'theory', content: '✅ **Store in Your Project Box**\nSave your 2-3-shot rough video and motion sheet. Tomorrow you add narration, subtitles, and music to complete a publish-ready 15-30-second short.' },
  ],
};
