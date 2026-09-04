import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. Diffusion 生成里，Seed 最像什么？', options: ["输出分辨率", "去噪步数", "随机起点编号", "负向提示词"], correct: 2 },
  { type: 'quiz', question: '2. 你要判断 Steps 是否影响细节，正确实验设计是？', options: ["固定 Seed 和 CFG，只改 Steps", "同时改 Seed、Steps、CFG", "每次都换提示词", "先看一次就定结论"], correct: 0 },
  { type: 'quiz', question: '3. CFG 过高常见风险是？', options: ["更自由但更偏题", "画面僵硬、伪影或不自然细节增加", "完全不受提示词影响", "帧率下降"], correct: 1 },
  { type: 'quiz', question: '4. 同参数下只改 Seed，最合理期待是？', options: ["核心构图趋势相近但细节变体不同", "输出必然完全一致", "知识事实会自动改变", "推理链条会消失"], correct: 0 },
  { type: 'quiz', question: '5. 画面总是偏题，你应优先检查哪一项？', options: ["ASR 文本回听", "CFG 太低或提示词约束不足", "字幕字号", "背景音乐版权"], correct: 1 },
  { type: 'quiz', question: '6. 结果忽好忽坏时，最科学的排查起点是？', options: ["先固定 Seed 再做单变量对照", "一次调三四个参数提高成功率", "只保留最好看的一张", "完全重写主题"], correct: 0 },
  { type: 'fill', question: '7. Diffusion 本质是逐步___噪声来形成图像。', parts: ['Diffusion 本质是逐步', '___', '噪声。'], options: ["去除", "增加", "复制"], correct: '去除' },
  { type: 'fill', question: '8. 只改一个参数、其余固定，叫___实验。', parts: ['这叫', '___', '实验。'], options: ["单变量", "随机", "盲测"], correct: '单变量' },
  { type: 'fill', question: '9. 想复现某次结果，最关键先记录___。', parts: ['最关键先记录', '___', '。'], options: ["Seed", "配色名称", "文件后缀"], correct: 'Seed' },
  { type: 'quiz', question: '10. 一次输出出现“主体边缘断裂”。你先做哪组诊断最有信息量？', options: ["固定 Seed，比较 Steps=20/30/40 的边缘完整性", "只改风格词并删去参数记录", "连续重抽十次挑最好一张"], correct: 0 },
  { type: 'practice', task: '11. 【生图小实验】用同一句描述生成两次，只改变一个设置（随机种子、生成步数或提示词跟随强度任选一个）。记录两张图哪里不同，并判断这个改变有没有帮助。', rubric: '两次生成只改变一个设置；写出相同点、不同点和简单结论；不要求计算参数。', placeholder: '固定描述：……\n我只改变了：……\n两张图的不同：……\n我的结论：……', minLength: 55, referenceAnswer: '我固定“月球反射太阳光的科普插图”，只改变随机种子。两张图构图不同，但都应保持太阳照亮月球的关系。第二张更清楚，不过仍要检查知识是否正确。' },
  { type: 'match', question: '12. 把生图设置和白话作用连起来：', pairs: [{"left": "随机起点", "right": "让同一句描述产生不同版本"}, {"left": "生成步数", "right": "影响处理细节的次数和耗时"}, {"left": "提示词跟随强度", "right": "影响画面多严格地照描述生成"}, {"left": "不要出现的内容", "right": "提醒模型避开明显错误"}] },
  { type: 'match', question: '13. 把画面现象和先检查的地方连起来：', pairs: [{"left": "画面总是偏题", "right": "把主体和场景描述得更清楚"}, {"left": "细节比较模糊", "right": "检查生成步数是否太少"}, {"left": "画面僵硬不自然", "right": "检查跟随提示的力度是否太高"}, {"left": "每次构图都不同", "right": "检查随机起点是否改变"}] },
  { type: 'match', question: '14. 连线：实验违规与后果', pairs: [{"left": "同时改三项参数", "right": "无法归因变化来源"}, {"left": "不记录 Seed", "right": "难以复现结果"}, {"left": "只保留最佳样本", "right": "结论可能偏差"}, {"left": "每轮问题不一致", "right": "对照失效"}] },
  { type: 'match', question: '15. 连线：真实误解纠正', pairs: [{"left": "Steps 越高一定越好", "right": "超过阈值后收益递减且耗时上升"}, {"left": "CFG 越高越准确", "right": "过高会带来僵硬与伪影"}, {"left": "Seed 只是文件编号", "right": "它决定随机起点分布"}, {"left": "单次命中代表参数最优", "right": "需要多轮对照验证"}] },
];

export const v3w3d3Data: DayContent = {
  day: 3,
  title: '图像生成引擎：Diffusion、潜空间、Seed、Steps、CFG',
  shards: 30,
  steps: [
    { type: 'theory', content: '🎨 **开场｜从噪声到图像**\n**Diffusion（扩散模型）**可以理解为从一团杂乱噪声开始，反复去除噪声，逐步得到图像。它常在**潜空间（Latent Space）**中工作，也就是图片被压缩后的“特征地图”。**Seed（随机种子）**决定随机起点，**Steps（去噪步数）**决定处理次数，**CFG（Classifier-Free Guidance，无分类器引导）**控制画面多大程度遵循提示词。' },
    { type: 'video', url: '/video/zh/week3/generation.mp4', content: '核心视频：从扩散生图到关键帧、配音和字幕。' },
    {
      type: 'interactive',
      interactiveKind: 'compare',
      interactiveTitle: '实验方案对比器：谁才是单变量实验？',
      interactiveInstruction: '在候选方案中找出真正可归因的实验设计。',
      interactiveItems: [
        { label: '方案 A：固定 Seed/CFG，只改 Steps（20/30/40）', detail: '这是标准单变量，适合判断细节与耗时随 Steps 的变化。', correct: true },
        { label: '方案 B：每轮同时改 Seed、CFG、Steps', detail: '多变量同时变化，无法判断哪个参数导致结果改变。', correct: false },
        { label: '方案 C：固定 Seed/Steps，只改 CFG（4/6/8）', detail: '也是单变量，可观察跟随度与自然度权衡。', correct: true },
        { label: '方案 D：固定 Steps/CFG，只改 Seed（42/99/314）', detail: '单变量，适合检查变体分布和可复现性。', correct: true }
      ]
    },
    { type: 'theory', content: '🧱 **理论卡 1｜潜空间与 Seed**\nSeed 像随机起点编号：同模型同参数下可复现风格趋势；换 Seed 会得到不同细节变体。' },
    { type: 'theory', content: '🧭 **理论卡 2｜Steps 与 CFG**\nSteps 控制去噪迭代次数；CFG 控制对提示词的跟随强度。过低易偏题，过高可能僵硬或伪影增加。' },
    { type: 'theory', content: '✅ **理论卡 3｜参数实验纪律**\n做单变量实验：固定 Seed 时调 Steps 或 CFG；或固定参数只换 Seed。否则无法判断变化来源。' },
    ...graded,
    { type: 'theory', content: '🏁 **结尾｜知识主视觉完成**\n保存 D1 核心句、五段式提示词、主视觉和四项验收结果。这张图将成为短片的视觉基准，明天会围绕它制作连续镜头。' },
  ],
};
