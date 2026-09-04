import { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 预训练阶段主要发生什么？', options: ['模型从大量数据中学习语言和模式', '模型为每个用户永久保存聊天', '模型逐条核实互联网事实'], correct: 0 },
  { type: 'quiz', question: '2. 微调更接近哪种过程？', options: ['在基础模型上针对任务或行为继续训练', '把 Temperature 调低', '每次提问前清空词表'], correct: 0 },
  { type: 'quiz', question: '3. 对齐训练的主要目标是什么？', options: ['让模型行为更符合人类指令、安全和偏好', '保证模型知道未来所有新闻', '取消 Tokenization'], correct: 0 },
  { type: 'fill', question: '4. 用户发送 Prompt 后，模型实际生成回答的阶段叫 ___。', parts: ['这个阶段叫', '___', '。'], options: ['推理', '预训练', '标注'], correct: '推理' },
  { type: 'match', question: '5. 【模型成长路线】', pairs: [
    { left: '预训练', right: '从海量数据学习一般模式' },
    { left: '微调', right: '针对任务继续训练' },
    { left: '对齐', right: '改善指令遵循和行为边界' },
    { left: '推理', right: '根据当前输入逐步生成输出' }
  ] },
  { type: 'quiz', question: '6. 模型给出一本不存在的书和完整作者名，这属于什么？', options: ['幻觉：生成了看似合理但无证据的内容', 'Tokenizer 错误', '正常引用，不必核查'], correct: 0 },
  { type: 'quiz', question: '7. 为什么语言流畅不等于事实正确？', options: ['训练目标擅长续写合理模式，不会自动验证每个事实', '流畅文字一定来自搜索引擎', '事实只与句子长度有关'], correct: 0 },
  { type: 'quiz', question: '8. 面对今天刚发布的政策，最适合先做什么？', options: ['检索权威最新来源并标注日期', '提高 Temperature', '让模型凭训练记忆猜测'], correct: 0 },
  { type: 'quiz', question: '9. 计算 378×492 时，哪种方式更可靠？', options: ['调用计算器并检查输入', '让模型以更自信语气心算', '提高 Top-p'], correct: 0 },
  { type: 'match', question: '10. 【问题与核验工具】', pairs: [
    { left: '最新新闻', right: '权威检索与日期核对' },
    { left: '精确算术', right: '计算器或代码执行' },
    { left: '校内规则', right: '批准的原始文件' },
    { left: '创意故事', right: '人工判断是否符合目标' }
  ] },
  { type: 'fill', question: '11. RAG 的基本思路是先从外部资料中 ___ 相关片段，再让模型回答。', parts: ['先', '___', '相关片段。'], options: ['检索', '编造', '删除'], correct: '检索' },
  { type: 'quiz', question: '12. RAG 为什么不能保证答案百分之百正确？', options: ['资料可能错误、检索可能漏掉关键内容，模型也可能误读', 'RAG 完全不使用资料', '有引用就一定正确'], correct: 0 },
  { type: 'quiz', question: '13. 模型依据错误资料作答，问题一定只是模型幻觉吗？', options: ['不一定，还要检查资料来源本身', '一定，因为资料永远正确', '一定，只要降低温度就能修复'], correct: 0 },
  { type: 'quiz', question: '14. 怎样公平比较直接回答和 RAG 回答？', options: ['使用同一问题，记录事实准确率、引用对应度和资料质量', '分别问不同问题，只看哪篇更长', '只比较语气是否专业'], correct: 0 },
  { type: 'practice', task: '15. 【三种侦探助手】为“今天北京气温是多少”“378×492 等于多少”“写三个火星故事开头”分别选择直接生成、可靠检索或计算工具，并说明每项结果怎样核验。', rubric: '天气应使用最新可靠检索并核对日期地点；算术应使用计算器或代码并检查输入；创意可直接生成后人工筛选。应说明不同任务需要不同证据，不能只靠降低温度。', placeholder: '天气：方法……；核验……\n算术：方法……；核验……\n故事：方法……；核验……', minLength: 80, referenceAnswer: '天气使用权威天气来源，核对北京、当天日期和更新时间；算术调用计算器，检查输入确为 378×492；故事可让模型直接生成多个方案，再由我检查原创性和是否符合主题。' }
];

export const v3w1d6Data: DayContent = {
  day: 6,
  title: '流畅不等于真实——训练、推理与幻觉',
  shards: 1,
  steps: [
    { type: 'theory', content: '🐉 **第一章：模型怎样长大**\n\n预训练像读大量材料并练习续写，让模型学到语言和世界模式；微调像专项训练；对齐像加入行为规范。它们都能改善能力，却不能把模型变成永远正确、实时更新的事实数据库。' },
    { type: 'interactive', interactiveKind: 'evidence', interactiveTitle: '证据工具台：什么问题该用什么核验？' },
    { type: 'theory', content: '🐉 **第二章：推理不是再次训练**\n\n你每次发出 Prompt，模型会使用已经学到的参数和当前上下文，逐 Token 生成回答，这叫推理。当前聊天通常不会让模型现场重新完成一次预训练。' },
    { type: 'theory', content: '🐉 **第三章：会接话，也会脑补**\n\n模型的任务是生成概率上合理的后续内容。证据不足时，它仍可能补出一本不存在的书、一个错误日期或一段假引用，这就是幻觉。回答越流畅，并不代表证据越充分。' },
    { type: 'theory', content: '🐉 **第四章：给模型装上工具**\n\n最新事实交给可靠检索，私有资料可以用受控 RAG，精确运算交给计算器或代码。工具返回结果后仍要检查来源、参数和引用是否匹配；工具是证据通道，不是免检通行证。' },
    ...graded,
    { type: 'theory', content: '🐉 **Day 6 完成**\n\n你能区分预训练、微调、对齐与推理，也知道幻觉不能只靠“再问一次”解决。明天进入第一周 Boss，把从 Token 到输出的所有齿轮装回一条完整生产线。' }
  ]
};