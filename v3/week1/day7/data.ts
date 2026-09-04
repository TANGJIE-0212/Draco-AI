import { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 输入文字进入模型后的第一道主要工序是什么？', options: ['Tokenizer 将文字切成 Token', 'Softmax 直接验证事实', 'Temperature 生成 Embedding'], correct: 0 },
  { type: 'quiz', question: '2. Token ID 之后为什么还需要 Embedding？', options: ['编号本身不表达语义，需要转成可计算向量', 'Embedding 用来上网搜索', 'Token ID 不能存入电脑'], correct: 0 },
  { type: 'quiz', question: '3. Attention 在生成链中主要解决什么？', options: ['根据上下文动态整合相关 Token 信息', '永久保存用户资料', '保证输出没有幻觉'], correct: 0 },
  { type: 'match', question: '4. 【生产线部件】', pairs: [
    { left: 'Tokenizer', right: '切分文字并映射编号' },
    { left: 'Embedding', right: '把编号转换为向量表示' },
    { left: 'Attention', right: '按上下文混合相关信息' },
    { left: 'Logits', right: '给下一 Token 候选打原始分' }
  ] },
  { type: 'fill', question: '5. Logits 经过 ___ 后可转换成总和为 1 的概率分布。', parts: ['Logits 经过', '___', '。'], options: ['Softmax', 'Tokenizer', 'RAG'], correct: 'Softmax' },
  { type: 'quiz', question: '6. Temperature 和 Top-p 位于生成链的哪个阶段？', options: ['候选 Token 的概率与采样控制阶段', '文字切分阶段', '模型预训练数据收集阶段'], correct: 0 },
  { type: 'quiz', question: '7. 模型把“银行”理解成河岸，最先应检查什么？', options: ['上下文是否足够，Attention 是否抓到存钱或河流等线索', '图片分辨率', '输出文件名'], correct: 0 },
  { type: 'quiz', question: '8. 回答在开头遗漏了最早的关键要求，可能与什么有关？', options: ['上下文截断或关键信息未被有效利用', 'Softmax 概率总和不是 1', '模型没有 Tokenizer'], correct: 0 },
  { type: 'match', question: '9. 【故障与检查点】', pairs: [
    { left: '罕见词被切得很碎', right: '检查 Tokenizer 与词表' },
    { left: '多义词理解错误', right: '检查上下文与 Attention' },
    { left: '故事每次太相似', right: '检查 Temperature 与候选池' },
    { left: '出现不存在的引用', right: '接入可靠来源并人工核验' }
  ] },
  { type: 'quiz', question: '10. 高 Temperature 导致冷门候选更常出现，属于哪一环的变化？', options: ['概率分布与采样', 'Embedding 维度', 'BPE 训练词表'], correct: 0 },
  { type: 'quiz', question: '11. 模型两次输出完全一致，能否证明事实正确？', options: ['不能，一致只说明输出稳定，仍需证据', '能，一致就是验证', '能，但只在低温时'], correct: 0 },
  { type: 'fill', question: '12. 模型选出一个 Token 后，会把它加入已有内容并继续下一轮，这种逐步生成叫 ___ 生成。', parts: ['这叫', '___', '生成。'], options: ['自回归', '检索式', '一次性'], correct: '自回归' },
  { type: 'quiz', question: '13. 哪条链路顺序正确？', options: ['文本→Token→Embedding→Attention→Logits→Softmax→Sampling', '文本→Softmax→Token→RAG→Embedding', '文本→Temperature→Tokenizer→训练'], correct: 0 },
  { type: 'quiz', question: '14. 降低幻觉风险最有效的组合是什么？', options: ['提供可靠上下文、调用合适工具并核验输出', '只把 Temperature 调到零', '把 Prompt 写得越长越好'], correct: 0 },
  { type: 'practice', isBoss: true, task: '15. 【生成链 Boss】为问题“为什么月球会发亮？”画出从输入文字到模型输出的完整流程：Tokenizer、Embedding、Attention、Logits、Softmax、Sampling。至少标出三个可能出错的位置，并为每个错误写一个检查或核验办法。', rubric: '必须按正确顺序覆盖六个核心环节；至少三个错误位置应具体且与环节相关；核验办法应包括补充上下文、调整采样或使用可靠来源/工具中的合理组合，不能声称模型内部概率等于事实证明。', placeholder: '流程：文字→……→输出\n错误点 1：……；检查：……\n错误点 2：……；检查：……\n错误点 3：……；检查：……', minLength: 120, referenceAnswer: '文字先经 Tokenizer 切分并编号，Embedding 将编号变成向量，Attention 结合“月球、发亮”等上下文，输出层产生 Logits，Softmax 转为概率，再按采样规则选出下一个 Token 并循环。错误点：问题含糊可导致上下文不足，应补清问题；Attention 可能错误关联，应检查解释；采样可能选到不佳候选，可降低随机性；最重要的是模型可能没有事实证据，应查天文馆等可靠来源。' }
];

export const v3w1d7Data: DayContent = {
  day: 7,
  title: 'Boss：穿越大模型——从文字输入到生成输出',
  shards: 1,
  isBoss: true,
  steps: [
    { type: 'theory', content: '🐉 **Boss 第一关：文字进入工厂**\n\n输入先被 Tokenizer 切成文字积木并映射为编号；Embedding 再把编号变成向量。切分决定模型看见哪些基本单元，向量让这些单元进入可计算的语义空间。' },
    { type: 'interactive', interactiveKind: 'pipeline', interactiveTitle: '大模型生产线：按真实顺序组装六个模块' },
    { type: 'theory', content: '🐉 **Boss 第二关：词语交换情报**\n\nTransformer 用 Attention 让 Token 根据上下文交换信息。Q 表示要找什么，K 用来匹配，V 提供真正取回的内容，位置编码保留先后顺序。' },
    { type: 'theory', content: '🐉 **Boss 第三关：候选词抽签**\n\n上下文表示经过输出层得到 Logits，Softmax 把分数变成概率。Temperature 改变分布集中程度，Top-k/Top-p 缩小候选池，Sampling 选出下一个 Token，然后生产线再次循环。' },
    { type: 'theory', content: '🐉 **Boss 最后一关：流畅之后要验真**\n\n整条链路优化的是生成合理后续，并不自动证明客观事实。遇到最新信息、精确计算、私有规则或重要决定时，要在输出端接上可靠资料、工具和人工核验。' },
    ...graded,
    { type: 'theory', content: '🐉 **Week 1 通关**\n\n你已经能完整解释：文字怎样变 Token，Token 怎样变向量，Attention 怎样利用上下文，Logits 怎样经 Softmax 和采样成为下一块输出；也知道模型为什么会幻觉，以及证据应该在哪里接入。下周开始学习如何把任务、资料、示例和验收标准写成真正可靠的 Prompt。' }
  ]
};