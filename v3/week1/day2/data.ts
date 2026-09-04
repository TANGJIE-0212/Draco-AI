import { DayContent } from '../../../types';

export const v3w1d2Data: DayContent = {
  day: 2,
  title: "文字积木工厂——Token、Tokenizer 与 BPE",
  shards: 1,
  steps: [
    { type: 'theory', content: "🐉 **AI 小侦探档案**\n\n🧱 **第一章：模型不直接读句子**\n\n我们看到的是一句话，模型先看到的却是一串编号。Tokenizer（分词器）会把文字切成 Token，再把每块换成词表里的编号。Token 可能是一个字、一个词，也可能只是词的一部分。**BPE 是 Byte Pair Encoding（字节对编码）**：它从小片段开始，反复合并训练资料中经常相邻的片段，在词表大小和序列长度之间取得平衡。" },
    { type: 'video', url: '/video/zh/week1/model-mechanism.mp4', content: "核心视频：文字如何变成词元和向量，注意力又如何利用上下文生成下一块文字。" },
    { type: 'interactive', interactiveKind: 'bpe', interactiveTitle: 'BPE 积木工厂：亲手合并高频片段' },
    { type: 'quiz', question: "1. 【文字积木】关于 Token，哪种说法最准确？", options: ["Token 永远等于一个汉字", "Token 是模型处理文字时使用的离散片段", "Token 只存在于英文中"], correct: 1 },
    { type: 'quiz', question: "2. Tokenizer 在模型开始计算前主要做什么？", options: ["核实句子中的事实", "把文本切成 Token 并映射为编号", "把所有语言翻译成英文"], correct: 1 },
    { type: 'quiz', question: "3. 为什么不能只按字符数估算 Token 数？", options: ["不同模型、语言和内容可能采用不同切分", "Tokenizer 会随机删除一半文字", "一个 Token 一定包含十个字符"], correct: 0 },
    { type: 'theory', content: "🐉 **第二章：BPE 像拼常用积木**\n\n如果每个生僻词都占一个词表位置，词表会大得惊人；如果永远按单字切，序列又会很长。BPE 的直觉是：先从小片段开始，统计哪些片段经常挨在一起，再把高频组合合并成一块。比如训练资料里‘人工’经常相邻，它就可能逐渐成为一个常用积木。" },
    { type: 'fill', question: "4. BPE 会优先把经常相邻出现的高频片段进行 ___。", parts: ["BPE 会优先把高频片段进行", "___", "。"], options: ["合并", "删除", "翻译"], correct: "合并" },
    { type: 'quiz', question: "5. BPE 为什么要在词表大小和序列长度之间做取舍？", options: ["词表过大占资源，切得过碎又会让 Token 序列变长", "词表越小，模型事实一定越准确", "序列越长，模型速度一定越快"], correct: 0 },
    { type: 'match', question: "6. 【切分侦探】把文本特点与可能现象连起来", pairs: [
      { left: "常见英文词", right: "可能是一块或少量子词" },
      { left: "罕见人名", right: "可能被切成多个小片段" },
      { left: "中英文混合句", right: "不同语言片段可能采用不同粒度" },
      { left: "代码和符号", right: "标点、缩进或片段也会占 Token" }
    ] },
    { type: 'theory', content: "🐉 **第三章：同一句话，不同切法**\n\n中文没有天然空格，英文常有词根和词缀，数字、Emoji、代码又各有特点。因此不同模型的 Tokenizer 可能把同一句话切成不同数量。**上下文窗口**就是模型一次能接收和处理的 Token 总量上限，像一张有限书桌；切法不同会影响这张书桌能放多少内容、处理速度和费用。" },
    { type: 'quiz', question: "7. 英文单词 unbelievable 可能被切成 un、believ、able，这说明什么？", options: ["Tokenizer 可以使用子词片段处理不常见词", "模型不会处理完整单词", "英文只能逐字母处理"], correct: 0 },
    { type: 'quiz', question: "8. 为什么中文、英文和代码不适合一律按空格切分？", options: ["中文通常没有词间空格，代码还包含大量符号结构", "英文中从来没有空格", "代码不需要 Tokenizer"], correct: 0 },
    { type: 'fill', question: "9. 模型一次能处理的 Token 总量上限，通常叫上下文 ___。", parts: ["Token 总量上限通常叫上下文", "___", "。"], options: ["窗口", "词典", "温度"], correct: "窗口" },
    { type: 'theory', content: "🐉 **第四章：Token 也是预算**\n\n上下文窗口像一张有限书桌：系统规则、聊天历史、输入资料和模型输出都要占位置。Token 越多，通常计算时间和费用也越高。优化不是一味删短，而是保留完成任务真正需要的信息，并给输出留出空间。" },
    { type: 'quiz', question: "10. 上下文窗口还剩 800 Token，却塞入约 1500 Token 的资料，最可能发生什么？", options: ["模型自动获得更大窗口", "部分内容可能被截断，或留给输出的空间不足", "Tokenizer 会把所有 Token 免费压成一个"], correct: 1 },
    { type: 'quiz', question: "11. 想降低 Token 占用，哪种做法更合理？", options: ["删除重复和无关内容，保留任务所需证据", "删掉所有任务要求，只留资料", "把同一句要求重复五遍"], correct: 0 },
    { type: 'quiz', question: "12. 两个模型处理同一段中文，一个用了 120 Token，一个用了 160 Token，可以直接得出什么结论？", options: ["前者一定更聪明", "后者一定更准确", "只能说明两者切分或词表可能不同，能力还需另测"], correct: 2 },
    { type: 'match', question: "13. 【预算连线】", pairs: [
      { left: "输入资料很长", right: "占用更多上下文空间" },
      { left: "保留重复聊天", right: "浪费 Token 预算" },
      { left: "先提取相关段落", right: "让输入更聚焦" },
      { left: "需要长篇输出", right: "应提前为回答预留容量" }
    ] },
    { type: 'quiz', question: "14. 要公平比较两个 Tokenizer，最好的方法是？", options: ["用同一组中英数字和代码样本，记录切分与 Token 数", "分别给它们完全不同的文章", "只看产品名字是否流行"], correct: 0 },
    { type: 'practice', task: "15. 【BPE 积木实验】给定训练片段“人工智能、人工审核、智能助手、智能设备”，先列出重复出现的字或相邻片段，再提出两轮你会优先合并的片段，并说明这样做可能怎样改变 Token 数。", rubric: "应找到重复或高频相邻片段，给出两轮有依据的合并选择，并说明高频组合合并后相关文本的 Token 数可能减少；不要求与真实模型词表完全一致。", placeholder: "高频片段：……\n第 1 轮合并：……\n第 2 轮合并：……\n对 Token 数的影响：……", minLength: 60, referenceAnswer: "高频字有‘人、工、智、能’，相邻片段‘人工’和‘智能’各重复出现。第 1 轮可合并‘人工’，第 2 轮可合并‘智能’。之后‘人工智能’可能由四个单字 Token 缩短为两个组合 Token。真实 BPE 仍会依据完整训练语料的频次决定。" },
    { type: 'theory', content: "🐉 **Day 2 完成**\n\n你已经看见文字进入模型前的第一道工序：Tokenizer 切分，词表编号，BPE 合并常用片段。明天这些没有含义的编号会进入 Embedding，变成语义地图中的向量。" }
  ]
};