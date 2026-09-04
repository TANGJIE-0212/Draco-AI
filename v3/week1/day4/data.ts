import { DayContent } from '../../../types';

export const v3w1d4Data: DayContent = {
  day: 4,
  title: "词语雷达——Transformer、Attention 与 QKV",
  shards: 1,
  steps: [
    { type: 'theory', content: "🐉 **AI 小侦探档案**\n\n📡 **字典坐标为什么不够？**\n\n‘苹果’既可能是水果，也可能是公司。**Transformer** 是以注意力机制为核心的模型架构；**Attention（注意力）**像词语打开雷达，为上下文中的信息分配不同权重。它常把信息分成 **QKV** 三种角色：Query（查询）表示当前要找什么，Key（键）用于匹配，Value（值）承载匹配后取回的内容。模型比较 Q 和 K，再按权重混合 V。" },
    { type: 'interactive', interactiveKind: 'attention', interactiveTitle: 'Attention 雷达：上下文如何改变关注重点' },
    { type: 'quiz', question: "1. 为什么静态 Embedding 不能独自解决一词多义？", options: ["它不知道当前句子周围提供的具体语境", "它不能表示任何数字", "一个词只能出现在一个句子里"], correct: 0 },
    { type: 'quiz', question: "2. Attention 最接近哪种描述？", options: ["为当前 Token 动态分配对其他 Token 的关注权重", "自动搜索互联网并核实事实", "把所有词永久存入长期记忆"], correct: 0 },
    { type: 'fill', question: "3. Attention 像词语打开 ___，寻找上下文中更相关的信息。", parts: ["Attention 像打开", "___", "。"], options: ["雷达", "计算器", "摄像机"], correct: "雷达" },
    { type: 'theory', content: "🐉 **Q、K、V 像图书检索**\n\nQuery（Q）表示‘我现在要找什么’；Key（K）像每本书的标签，用来判断能否匹配；Value（V）是匹配后真正取回的内容。模型比较 Q 和各个 K，产生权重，再把对应的 V 按权重混合起来。" },
    { type: 'match', question: "4. 【图书馆里的 QKV】", pairs: [
      { left: "Query", right: "读者正在寻找的主题" },
      { left: "Key", right: "每本书用于匹配的标签" },
      { left: "Value", right: "书中真正取回的内容" },
      { left: "Attention 权重", right: "每本书对当前问题的重要程度" }
    ] },
    { type: 'quiz', question: "5. 模型比较 Q 和 K，主要是为了决定什么？", options: ["哪些位置的信息对当前 Token 更相关", "答案是否符合客观事实", "词表中有多少 Token"], correct: 0 },
    { type: 'quiz', question: "6. 为什么 Q、K 匹配后还需要 V？", options: ["V 承载要被加权取回的实际信息", "V 用来删除所有低分词", "V 表示模型版本号"], correct: 0 },
    { type: 'theory', content: "🐉 **从匹配分到百分比**\n\n模型会算出多个匹配分，再用 Softmax 把它们变成总和为 100% 的注意力权重。例如当前词可能把 70% 注意力给主语、20% 给动作、10% 给其他词。权重高表示当前计算更依赖它，不表示那条信息一定真实。" },
    { type: 'quiz', question: "7. 三个位置的注意力权重分别为 0.6、0.3、0.1，它们的总和是多少？", options: ["0.1", "1", "3"], correct: 1 },
    { type: 'quiz', question: "8. 某词获得 90% 注意力权重，可以证明模型答案真实吗？", options: ["可以，超过 80% 就是真实", "不可以，权重表示计算相关性，不是事实认证", "可以，但只对历史题有效"], correct: 1 },
    { type: 'fill', question: "9. Softmax 会把一组匹配分转换成总和为 1 的注意力 ___。", parts: ["Softmax 得到注意力", "___", "。"], options: ["权重", "词表", "坐标"], correct: "权重" },
    { type: 'theory', content: "🐉 **位置像全班报数**\n\n如果只给模型一袋无序词语，‘猫追狗’和‘狗追猫’看起来成分一样。位置编码像全班依次报数，让模型知道谁在前、谁在后。多头注意力则像多个侦探同时工作：有人盯语法，有人找指代，有人关注远距离关系。" },
    { type: 'quiz', question: "10. 位置编码主要帮助模型知道什么？", options: ["Token 在序列中的顺序和相对位置", "每个事实是否正确", "用户所在城市"], correct: 0 },
    { type: 'quiz', question: "11. 没有位置信息时，模型为什么难以区分‘猫追狗’和‘狗追猫’？", options: ["两句话包含相同词，但顺序决定角色关系", "猫和狗没有 Embedding", "中文没有标点"], correct: 0 },
    { type: 'quiz', question: "12. 多头注意力的直觉优势是什么？", options: ["可以同时关注语法、指代等不同关系", "自动调用多个搜索引擎", "保证每个头都得出相同答案"], correct: 0 },
    { type: 'match', question: "13. 【雷达故障诊断】", pairs: [
      { left: "代词指错对象", right: "相关词匹配或上下文可能不足" },
      { left: "主客体颠倒", right: "位置和词序信息可能未被正确利用" },
      { left: "漏掉远处条件", right: "长距离关系没有得到足够关注" },
      { left: "引用错误事实", right: "不能只靠 Attention，仍需外部核验" }
    ] },
    { type: 'quiz', question: "14. ‘奖杯放不进箱子，因为它太大了’中，要判断‘它’指谁，模型最需要结合什么？", options: ["奖杯、箱子、放不进和太大之间的上下文关系", "句子的字体颜色", "随机选择离它最近的词"], correct: 0 },
    { type: 'practice', task: "15. 【词语雷达实验】选择一句含有代词或多义词的句子。写出当前词的 Query 想找什么，列出两个候选 Key，并说明应从哪个 Value 取回信息；再改动词序或上下文，预测注意力重点怎样变化。", rubric: "应包含一句有真实歧义的句子、一个清楚的查询目标、至少两个候选匹配、取回信息及改动后的合理预测；不要求真实计算模型内部权重。", placeholder: "句子：……\nQuery 想找：……\n候选 Key：……\n取回的 Value：……\n改变上下文后：……", minLength: 70, referenceAnswer: "句子：小明把书递给小刚，因为他明天要演讲。Query 想找‘他’指谁；候选 Key 是小明和小刚；Value 是两人的相关动作信息。若改成‘小刚接过书，因为小刚明天要演讲’，注意力应更明确地指向小刚。" },
    { type: 'theory', content: "🐉 **Day 4 完成**\n\n你知道 Transformer 如何用 Attention 让 Token 互相交换上下文信息：Q 去找，K 来匹配，V 提供内容，位置编码保留顺序。明天看模型如何给下一块文字打分，并用 Temperature 与采样做选择。" }
  ]
};