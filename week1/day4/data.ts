
import { DayContent } from '../../types';

export const day4Data: DayContent = {
  day: 4, 
  title: "引擎核心：Transformer 与 Attention",
  shards: 1,
  steps: [
    // --- 模块一：架构革命 ---
    { 
      type: 'theory', 
      content: "🚀 **第一章：暴力美学 Transformer**\n\nTransformer 彻底改变了 AI。在它之前，AI 只能按顺序一个字一个字读（RNN），就像读长篇小说容易忘开头。\n\nTransformer 的超能力是 **Parallelism (并行计算)** —— 它能一眼看完整篇文章，同时处理所有单词。" 
    },
    {
      type: 'quiz',
      question: "【对比】相比于旧的 RNN 模型，Transformer 最大的优势是？",
      options: ["参数量更少，在同等算力下能训练更大的数据集", "可以并行处理整个序列，速度极快且能捕捉长距离依赖", "使用了更复杂的循环结构，记忆能力更强"],
      correct: 1
    },
    { 
      type: 'theory', 
      content: "📍 **位置编码 (Positional Encoding)**\n\n既然是“一眼看完”，“我爱你”和“你爱我”对 Transformer 来说只是三个一样的词。它没有时间概念。\n\n所以，我们必须给每个词的向量**加上**一个代表位置的数值（位置编码），就像给每个学生贴上座位号。" 
    },
    {
      type: 'fill',
      question: "【原理】如果去掉了位置编码，Transformer 处理 'Alice hit Bob' 和 'Bob hit Alice' 时，会认为它们...",
      parts: ["会认为它们的语义是", "___", "的。"],
      options: ["完全相同", "截然不同", "部分相似"],
      correct: "完全相同"
    },
    {
      type: 'quiz',
      question: “【直觉】为什么位置编码是直接”加”在词向量上，而不是拼接在后面？”,
      options: [“为了保持向量维度不变，同时让位置信息融入到语义向量里”, “为了破坏原始语义”, “为了让向量变长”],
      correct: 0
    },

    // --- 模块二：Self-Attention 机制 (QKV) ---
    { 
      type: 'theory', 
      content: "💡 **第二章：Q, K, V 三位一体**\n\n这是注意力的灵魂。想象你在**图书馆**找资料：\n- **Q (Query)**: 你手里的**借书单**（我想找关于“量子力学”的书）。\n- **K (Key)**: 书脊上的**分类标签**（这本书是“物理”，那本是“烹饪”）。\n- **V (Value)**: 书里的**实际内容**。" 
    },
    {
      type: 'match',
      question: "【角色扮演】将 QKV 映射到搜索引擎",
      pairs: [
        { left: "Query", right: "你在搜索框输入的关键词" },
        { left: "Key", right: "网页的标题和元数据" },
        { left: "Value", right: "网页的正文内容" },
        { left: "Weight", right: "匹配的相关性分数" }
      ]
    },
    { 
      type: 'theory', 
      content: "🔥 **关键动作 1：点积 (Dot Product)**\n\nAI 怎么知道 Q 和 K 配不配？\n它计算 Q 和 K 向量的**点积**。结果越大，代表夹角越小，相关度越高（关注度高）。" 
    },
    {
      type: 'quiz',
      question: "【直觉】在处理句子 'The cat sat on the mat' 时，当 Query 是 'sat' (坐) 时，它应该给哪个词的 Key 最高的关注度？",
      options: ["'The' (因为离得近)", "'cat' (因为要知道是谁坐)", "'on' (介词)"],
      correct: 1
    },

    // --- 模块三：Softmax 与 加权求和 ---
    {
      type: 'theory',
      content: "📊 **关键动作 2：Softmax (归一化)**\n\n点积算出来的分数可能是任意数字（如 100, -50）。但我们需要的是**概率**（百分比），让它们加起来等于 1 (100%)。\n\n**Softmax** 层的作用就是：把绝对数值变成概率分布。高分会变得更高（更加关注），低分趋近于 0（忽略）。"
    },
    {
      type: 'fill',
      question: "【流程】原始分数经过 Softmax 层后，所有分数的总和必然等于...",
      parts: ["经过 Softmax 后，总和等于", "___", "。"],
      options: ["1", "100", "0"],
      correct: "1"
    },
    { 
      type: 'theory', 
      content: "🍹 **关键动作 3：混合 (Weighted Sum)**\n\nAttention 的最终输出不是“只选一个词”，而是“把所有相关词的信息混合在一起”。\n\n就像调鸡尾酒：\n- 80% 的 'cat' (V)\n- 15% 的 'mat' (V)\n- 5% 的其他词 (V)\n\n这让 'sat' 这个词吸收了主语和宾语的信息，变得更丰富。" 
    },
    {
      type: 'quiz',
      question: "🧮 **计算题：我是模型**\n假设 V(cat) 的数值是 10，V(mat) 的数值是 5。\n经过 Softmax 计算出权重：cat (0.8), mat (0.2)。\n最终输出的混合向量值是多少？",
      options: ["15 (直接相加)", "9.0 (0.8*10 + 0.2*5)", "7.5 (平均值)"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【概念】经过 Self-Attention 层处理后，每个单词的向量发生了什么变化？",
      options: ["维度变大了，因为融入了其他词的信息", "它融合了上下文其他词的信息，变成了带语境的向量（Contextual Embedding）", "向量值被平均了，所有词的向量变得越来越接近"],
      correct: 1
    },

    // --- 模块四：指代消解挑战 ---
    {
      type: 'theory',
      content: "⚔️ **实战：它 (It) 是谁？**\n\nAttention 最强的能力是理解上下文。\n请看句 A：'The animal didn't cross the street because **it** was too tired.'（动物没有过街，因为**它**太累了。）\n请看句 B：'The animal didn't cross the street because **it** was too wide.'（动物没有过街，因为**它**太宽了。）\n\n两句里的"it"，A 句指动物，B 句指街道。Attention 能通过上下文自动判断。"
    },
    {
      type: 'quiz',
      question: "【推理】在句 A (tired) 中，Token 'it' 关注度最高的词应该是？",
      options: ["animal", "street", "cross"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "【推理】在句 B (wide) 中，Token 'it' 关注度最高的词应该是？",
      options: ["animal", "street", "cross"],
      correct: 1
    },

    // --- 模块五：GPT 的特殊机制 (Masked Attention) ---
    {
      type: 'theory',
      content: "🙈 **特殊的 Attention：Mask (面具)**\n\n对于 GPT 这种生成式模型，它在预测下一个词时，**绝不能偷看后面**的词。\n\n所以，我们会给 Attention 矩阵盖上一层 **Mask（掩码）**，把当前词**之后**的位置全部遮住（分数设为负无穷，Softmax 后变成 0）。"
    },
    {
      type: 'quiz',
      question: "【原理】Masked Attention 主要用于 Transformer 的哪个部分？",
      options: ["Encoder (编码器，如 BERT)", "Decoder (解码器，如 GPT)", "Input Layer"],
      correct: 1
    },
    {
      type: 'quiz',
      question: “【后果】如果没有 Mask，GPT 在训练时会发生什么？”,
      options: [“它会直接看到后面的词（答案），相当于开卷考试，学不到真正的预测能力”, “训练速度会大幅变慢，因为需要处理更多信息”, “模型会过拟合，在训练集上表现完美但泛化能力差”],
      correct: 0
    },

    // --- 模块六：Multi-Head & FFN ---
    { 
      type: 'theory', 
      content: "🐙 **第四章：多头注意力 (Multi-Head)**\n\n为什么模型要有几十个“头”？因为理解需要多视角。\n- 1号头看语法（主谓）\n- 2号头看指代（它=谁）\n- 3号头看情绪...\n\n最后把所有头的结果 **Concat (拼接)** 起来。" 
    },
    {
      type: 'quiz',
      question: "【类比】多头注意力就像...",
      options: ["你需要同时关注：剧情、演技、配乐、特效等多个维度", "你需要把电影看 10 遍", "你需要 10 个人一起写"],
      correct: 0
    },
    {
      type: 'theory',
      content: "🧠 **第五章：Feed Forward Network (FFN)**\n\nAttention 只是负责“收集信息”（把相关的词找出来）。\n真正负责“消化、思考”这些信息的是后面的 **FFN (前馈神经网络)** 层。它通常包含大部分的模型参数。"
    },
    {
      type: 'fill',
      question: "【结构】Attention 层负责信息的",
      parts: ["Attention 负责信息的", "___", "，FFN 负责信息的处理与转换。"],
      options: ["路由/聚合", "遗忘", "存储"],
      correct: "路由/聚合"
    },

    // --- 模块七：综合复习 ---
    {
      type: 'quiz',
      question: "【Context Window】Context Window（上下文窗口）的大小瓶颈主要来自？",
      options: ["模型权重文件的大小，参数越多占用空间越大", "Attention 矩阵的计算量随序列长度平方级增长，长度翻倍，计算量变 4 倍", "硬盘读写速度，长文本需要更多 I/O 操作"],
      correct: 1
    },
    {
      type: 'match',
      isBoss: true,
      question: "🏆 **Day 4 终极排序：数据流转图**",
      pairs: [
        { left: "1. 入口", right: "Input Embedding + Positional Encoding" },
        { left: "2. 聚合", right: "Masked Multi-Head Attention" },
        { left: "3. 消化", right: "Feed Forward Network (FFN)" },
        { left: "4. 出口", right: "Linear + Softmax (预测概率)" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 4 完美通关！**\n你不仅懂了 QKV，还搞懂了 Softmax 和 Mask 的作用。现在你已经理解了 GPT 大脑最核心的运作机制。\n明天见！"
    }
  ]
};
