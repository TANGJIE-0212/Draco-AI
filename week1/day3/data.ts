import { DayContent } from '../../types';

export const day3Data: DayContent = {
  day: 3, // 虽然图片是Day2，但为了配合你的代码结构保持为1，内容是 Token & Embedding
  title: "魔法基石：Token 切分与 Embedding 星图",
  shards: 1,
  steps: [
    // ------------------------------------------------------------------
    // 第一部分：Token (积木) - 深入原理
    // ------------------------------------------------------------------
    { 
      type: 'theory', 
      content: "🔮 **第一章：AI 的视觉 - Token (词元)**\n\nAI 并不是直接“阅读”单词，而是先用一把剪刀将文本切碎。这把剪刀叫 **Tokenizer**。切出来的碎片就是 **Token**。\n\n⚠️ **关键点**：Token 不等于单词。常见的词（如 'apple'）是一个 Token，但生僻词或复杂组合会被切成多个。" 
    },
    {
      type: 'quiz',
      question: "概念热身：如果 AI 是一个乐高玩家，那么 Token 是什么？",
      options: ["搭建好的城堡", "最小的积木块", "说明书"],
      correct: 1
    },
    { 
      type: 'theory', 
      content: "🔍 **深入原理：BPE 切分法**\n\n为什么 AI 经常数不清 'Strawberry' 里有几个 'r'？\n\n因为在 AI 眼里，'Strawberry' 被切成了 `[Straw]` 和 `[berry]` 两个整数 ID。它根本看不到单词内部的字母 'r'！除非我们将单词打散。" 
    },
    // 活学活用 1：Token 视觉感知
    {
      type: 'quiz',
      question: "🧠 **思维实验**：AI 看到 'Strawberry' (草莓) 时，它实际接收到的输入更像以下哪种形式？",
      options: ["['S', 't', 'r', 'a', 'w', 'b', 'e', 'r', 'r', 'y']", "[8123, 4451] (两个代表音节的数字)", "一张草莓的图片"],
      correct: 1
    },
    // 活学活用 2：数字切分陷阱
    {
      type: 'fill',
      question: "🧠 **实战：数学盲区**\n数字 '9.11' 和 '9.8' 比较大小时，AI 常出错。因为 '9.11' 可能被切成 `[9]`, `[.]`, `[11]`，而 '9.8' 是 `[9]`, `[.]`, `[8]`。AI 会觉得 11 比 8 大。\n这是因为 Tokenizer 破坏了数字的：",
      parts: ["Tokenizer 破坏了数字的", "___", "意义。"],
      options: ["整体数值", "字体颜色", "显示位置"],
      correct: "整体数值"
    },
    { 
      type: 'theory', 
      content: "💰 **Token 经济学**\n\nToken 是算力的计费单位。\n- **英文**：1000 单词 ≈ 1300 Token (单词平均切碎一点点)\n- **汉字**：通常 1 个汉字 ≈ 1~2 个 Token (取决于词表)\n\n这也是为什么中文 API 调用有时比英文贵或消耗更快的原因之一。" 
    },
    // 活学活用 3：成本计算
    {
      type: 'quiz',
      question: "💼 **我是老板**：假设 API 价格是 $0.002 / 1k Tokens。你要处理一篇 5000 个单词的英文论文，大概需要支付多少钱？",
      options: ["约 $0.01 (5000 * 1.3 / 1000 * 0.002)", "约 $0.002", "约 $100"],
      correct: 0
    },

    // ------------------------------------------------------------------
    // 第二部分：Embedding (星图) - 深入原理
    // ------------------------------------------------------------------
    { 
      type: 'theory', 
      content: "🌌 **第二章：AI 的大脑 - Embedding (嵌入)**\n\n切好的 Token 只是死板的数字 ID。我们需要把它们变成**有意义的坐标**。\n\n**Embedding** 就是把 Token 扔到一个几千维的“语义宇宙”中。在这里：\n1. 每个词都是一个坐标点（向量）。\n2. **意思越近，距离越近**。" 
    },
    {
      type: 'match',
      question: "🧩 **概念连线**：建立直觉",
      pairs: [
        { left: "Tokenizer", right: "把文本切碎成 ID" },
        { left: "Embedding", right: "把 ID 变成空间坐标" },
        { left: "向量维度", right: "描述语义的特征数量" },
        { left: "空间距离", right: "词义的相似程度" }
      ]
    },
    { 
      type: 'theory', 
      content: "📐 **深入原理：余弦相似度 (Cosine Similarity)**\n\nAI 怎么知道“猫”和“狗”很像？它计算两个向量在空间中的**夹角**。\n\n- 夹角接近 0 度（方向一致）：意思极度相似。\n- 夹角 90 度（垂直）：毫无关系。\n- 夹角 180 度（相反）：意思相反。" 
    },
    // 活学活用 4：空间直觉
    {
      type: 'quiz',
      question: "🧭 **导航员测试**：在 Embedding 星图中，'苹果' 这个词的坐标，应该离下面哪个词最近？",
      options: ["'卡车'", "'香蕉'", "'iPhone' (取决于上下文，但通常水果聚类)"],
      correct: 1
    },
    // 活学活用 5：多义词处理
    {
      type: 'theory',
      content: "🤔 **难点突破：一词多义**\n\n单词 'Bank' 既可以是'银行'，也可以是'河岸'。在现代 Transformer 架构中，Embedding 是**动态**的（Contextual Embedding）。\n\n这句话中的 Bank：'I went to the **bank** to deposit money.'\n它的向量坐标会向 'Money', 'Finance' 靠拢，而不是 'River'。"
    },
    {
      type: 'fill',
      question: "🧠 **语境感知**：",
      parts: ["在 'The apple fell from the tree' 这句话中，'apple' 的向量会远离", "___", "相关的区域。"],
      options: ["科技/电子产品", "植物/水果", "重力/物理"],
      correct: "科技/电子产品"
    },

    // ------------------------------------------------------------------
    // 第三部分：Vector Arithmetic (向量算术) - 高级应用
    // ------------------------------------------------------------------
    { 
      type: 'theory', 
      content: "✨ **见证奇迹：国王减去男人**\n\nEmbedding 最神奇的特性是**语义代数**。因为它们是数字向量，我们可以直接做加减法！\n\n经典的公式：\n$$Vector(国王) - Vector(男人) + Vector(女人) \\approx Vector(女王)$$\n\n这说明 AI 在空间中理解了“性别”这个维度的方向。" 
    },
    // 活学活用 6：向量推理
    {
      type: 'quiz',
      question: "⚗️ **炼金术士**：请推测这个向量公式的结果：\nVector(巴黎) - Vector(法国) + Vector(日本) ≈ ？",
      options: ["寿司", "东京", "亚洲"],
      correct: 1
    },
    // 活学活用 7：RAG (检索增强) 预热
    {
      type: 'theory', 
      content: "💡 **应用场景：AI 为什么能搜到答案？**\n\n当你问“怎么做番茄炒蛋？”时，AI 会把你的问题变成向量，然后去数据库里找**距离最近**的文档向量。\n这就是 **RAG (检索增强生成)** 的核心原理——**向量搜索**。" 
    },
    {
      type: 'match',
      isBoss: true,
      question: "🏆 **最终试炼：从输入到理解的全过程**",
      pairs: [
        { left: "1. 输入文本", right: "User: 'Hello AI'" },
        { left: "2. Tokenization", right: "[15496, 9552]" },
        { left: "3. Embedding", right: "[[0.1, -0.5...], [0.8, 0.2...]]" },
        { left: "4. Attention", right: "理解 Token 之间的关联" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 1 达成！**\n你现在明白了 AI 不识字，它只认“数字积木”和“空间坐标”。\n\n明天我们将进入更核心的引擎：**Transformer 与 Attention 机制**（AI 如何在一堆 Token 中找到重点）。"
    }
  ]
};