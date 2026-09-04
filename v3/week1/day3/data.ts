import { DayContent } from '../../../types';

export const v3w1d3Data: DayContent = {
  day: 3,
  title: "语义星图——Embedding 与向量",
  shards: 1,
  steps: [
    { type: 'theory', content: "🐉 **AI 小侦探档案**\n\n🌌 **编号不等于含义**\n\n昨天 Tokenizer 把文字换成了编号，但编号 100 和 101 靠得近，不代表意思相近。Embedding 会把每个 Token 变成一串数字，也就是向量。可以把它想成语义星图中的坐标：‘猫’和‘狗’可能靠近，‘猫’和‘发动机’通常更远。" },
    { type: 'interactive', interactiveKind: 'embedding', interactiveTitle: '语义星图：距离近就一定相同吗？' },
    { type: 'quiz', question: "1. Token ID 100 和 101 相邻，能否说明含义相近？", options: ["能，编号距离就是语义距离", "不能，Token ID 只是词表编号", "能，但只对中文有效"], correct: 1 },
    { type: 'quiz', question: "2. Embedding 主要把 Token 转换成什么？", options: ["可参与计算的向量", "已经核实的事实", "固定长度的中文解释"], correct: 0 },
    { type: 'match', question: "3. 【星图配对】", pairs: [
      { left: "猫与狗", right: "动物语义可能较接近" },
      { left: "汽车与自行车", right: "交通工具语义可能较接近" },
      { left: "Token ID", right: "词表中的离散编号" },
      { left: "Embedding", right: "连续向量表示" }
    ] },
    { type: 'theory', content: "🐉 **向量像多维能力条**\n\n二维地图只是教学示意。真实 Embedding 往往有很多维，每一维不一定能单独翻译成人话，但它们合在一起可以表达复杂关系。维度更多可能容纳更多特征，也会增加存储和计算成本，并不自动保证理解正确。" },
    { type: 'fill', question: "4. Embedding 中的一串数字在数学上叫作 ___。", parts: ["这一串数字叫作", "___", "。"], options: ["向量", "词表", "概率"], correct: "向量" },
    { type: 'quiz', question: "5. 增加向量维度通常意味着什么？", options: ["可能表达更多特征，但也增加资源消耗", "事实一定更准确", "每个维度都能直接对应一个中文词"], correct: 0 },
    { type: 'quiz', question: "6. 为什么不能把二维语义地图当成真实模型内部的完整地图？", options: ["真实表示通常是高维且关系更复杂", "模型内部没有数字", "二维坐标不能画在屏幕上"], correct: 0 },
    { type: 'theory', content: "🐉 **看方向，还是看距离？**\n\n比较向量可以看直线距离，也可以看方向。余弦相似度更关心两个箭头朝向是否接近：同方向接近 1，垂直接近 0，反方向接近 -1。它常用于语义检索，但高分只表示‘意思相关’，不是事实认证章。" },
    { type: 'quiz', question: "7. 两个向量方向几乎相同，但长度相差很大，它们的余弦相似度通常怎样？", options: ["仍可能很高，因为它主要比较方向", "一定为零", "一定为负数"], correct: 0 },
    { type: 'fill', question: "8. 余弦相似度主要比较两个向量的 ___。", parts: ["余弦相似度主要比较向量的", "___", "。"], options: ["方向", "编号", "字符数"], correct: "方向" },
    { type: 'quiz', question: "9. 语义搜索返回相似度 0.92 的文档，可以直接认定内容正确吗？", options: ["可以，超过 0.9 就是真理", "不可以，相似度表示相关，仍要核查来源", "可以，只要文档较长"], correct: 1 },
    { type: 'match', question: "10. 【比较方式】", pairs: [
      { left: "向量方向是否一致", right: "余弦相似度更关注" },
      { left: "坐标点直线距离", right: "欧氏距离更关注" },
      { left: "检索到相关片段", right: "还需阅读和核查" },
      { left: "高维表示", right: "可容纳更复杂特征" }
    ] },
    { type: 'theory', content: "🐉 **同一个词会换位置**\n\n‘苹果很好吃’和‘苹果发布新手机’中的‘苹果’起点相同，但进入 Transformer 后会吸收周围词的信息，形成不同的上下文表示。静态 Embedding 像字典坐标，经过上下文加工后的表示才更像句子里的真实意思。" },
    { type: 'quiz', question: "11. 为什么‘苹果’在两个句子中需要不同的上下文表示？", options: ["周围词说明了水果和公司的不同含义", "同一个词每次编号都会随机变化", "因为第二句话字数更多"], correct: 0 },
    { type: 'quiz', question: "12. 搜索‘室内雨天活动’时，结果没有重复原词却仍可能相关，主要因为？", options: ["Embedding 可以捕捉一定的语义相近关系", "模型只按首字母搜索", "没有关键词的内容一定更准确"], correct: 0 },
    { type: 'quiz', question: "13. 哪个结论最严谨？", options: ["语义接近等于事实一致", "向量能表示关系，但相似度不是事实证明", "向量维度越高越不会幻觉"], correct: 1 },
    { type: 'match', question: "14. 【多义词语境】", pairs: [
      { left: "把文件放到云端", right: "网络存储" },
      { left: "天空飘来一朵云", right: "天气现象" },
      { left: "去银行存钱", right: "金融机构" },
      { left: "小船靠近河岸", right: "河流边缘" }
    ] },
    { type: 'practice', task: "15. 【语义星图实验】选择四个熟悉的概念，在二维纸面上安排位置并解释谁和谁更接近。再选择一个多义词，写两个不同语境，并说明为什么静态坐标还不够。", rubric: "应包含四个概念及有理由的位置关系；包含一个多义词的两个不同语境；明确二维图只是直觉示意，并说明上下文会改变表示。", placeholder: "四个概念及位置：……\n相近关系：……\n多义词与两个语境：……\n静态坐标的局限：……", minLength: 70, referenceAnswer: "我把猫和狗放近，把汽车和自行车放近，两组相隔较远，因为前者是动物、后者是交通工具。‘苹果很好吃’指水果，‘苹果发布手机’指公司。固定字典坐标不能单独判断含义，需要周围词参与。" },
    { type: 'theory', content: "🐉 **Day 3 完成**\n\nToken 编号进入 Embedding 后成为向量，语义关系可以用距离和方向形成直觉。明天我们让每个词打开雷达，用 Attention 从上下文中寻找真正相关的信息。" }
  ]
};