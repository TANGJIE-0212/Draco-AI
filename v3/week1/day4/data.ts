
import { DayContent } from '../../../types';

export const v3w1d4Data: DayContent = {
  day: 4, 
  title: "Day 4: Dragon Brain Engine - Transformer and Attention",
  shards: 1,
  steps: [
    // --- 模块一：架构革命 ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🚀 **第一章：Transformer**\n\nTransformer 是许多现代语言模型的基础。训练时，它能同时处理一句话中的多个位置，并用“注意力”把相关信息联系起来。生成回答时，它仍会按顺序产出后续内容。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【对比】Transformer 的重要特点是什么？",
      options: ["靠固定规则表判断每个词的意思", "只能从第一个字依次读到最后一个字", "训练时可同时处理多个位置并建立远近联系"],
      correct: 2
    },
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n📍 **位置线索**\n\n“猫追狗”和“狗追猫”用的是同一批词，意思却不同。Transformer 需要位置编码这类线索，才能知道每个词在句子中的先后位置。"
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】【原理】没有位置线索时，模型最难区分“猫追狗”和“狗追猫”的哪项差别？",
      parts: ["没有位置线索时，模型最难理解词语的", "___", "。"],
      options: ["先后顺序", "笔画多少", "屏幕颜色"],
      correct: "先后顺序"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【直觉】位置编码最重要的作用是？",
      options: ["把所有词变成同一个词", "告诉模型词在句中的位置", "删除句中重复出现的词"],
      correct: 1
    },

    // --- 模块二：Self-Attention 机制 (QKV) ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n💡 **第二章：注意力像找资料**\n\n可以把注意力想成在图书馆找资料：Q 是你要找什么，K 是每本书的索引线索，V 是书中可取用的内容。模型用它们判断该多关注哪些内容。"
    },
    {
      type: 'match',
      question: "🐉【识破 AI 魔法】【角色扮演】将 QKV 映射到搜索引擎",
      pairs: [
        { left: "Query", right: "你在搜索框输入的关键词" },
        { left: "Key", right: "网页的标题和元数据" },
        { left: "Value", right: "网页的正文内容" },
        { left: "Weight", right: "匹配的相关性分数" }
      ]
    },
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🔥 **关键动作：比较相关度**\n\n模型会比较“正在找什么”和“各处提供的线索”，得到相关度分数。分数只是模型的内部判断，不等于事实的可信度。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【直觉】在简化句 “The cat sat on the mat” 中，要判断“谁坐着”，最该关联哪个词？",
      options: ["cat", "The", "on"],
      correct: 0
    },

    // --- 模块三：Softmax 与 加权求和 ---
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n📊 **关键动作：分配注意力**\n\n相关度分数需要转换成一组“关注比例”，让所有比例加起来为 1。Softmax 是常用的转换方式：分数较高的内容通常会获得更大的关注份额。"
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】【注意力比例】如果 A 的相关度明显高于 B，经过 Softmax 后通常会怎样？",
      parts: ["A 通常会获得", "___", "的关注份额。"],
      options: ["更大", "相同", "更小"],
      correct: "更大"
    },
    { 
      type: 'theory', 
      content: "🐉 **巨龙解剖档案**\n\n🍹 **关键动作 3：混合 (Weighted Sum)**\n\nAttention 的最终输出不是「只选一个词」，而是「把所有相关词的信息混合在一起」。\n\n就像调鸡尾酒：\n- 80% 的 'cat' (V)\n- 15% 的 'mat' (V)\n- 5% 的其他词 (V)\n\n这让 'sat' 这个词吸收了主语和宾语的信息，变得更丰富。" 
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】🧮 **计算题：混合信息**\n数值 10 的权重是 0.8，数值 5 的权重是 0.2。把“数值×权重”相加，结果是多少？",
      options: ["15", "7.5", "9.0"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【概念】经过注意力处理后，一个词的表示有什么变化？",
      options: ["它和所有词变得完全相同", "它结合了其他相关词提供的语境", "它变成了一个更长的单词"],
      correct: 1
    },

    // --- 模块四：指代消解挑战 ---
    {
      type: 'theory',
      content: "🐉 **巨龙解剖档案**\n\n⚔️ **实战：它 (It) 是谁？**\n\nAttention 最强的能力是理解上下文。\n请看句 A：'The animal didn't cross the street because **it** was too tired.'（动物没有过街，因为**它**太累了。）\n请看句 B：'The animal didn't cross the street because **it** was too wide.'（动物没有过街，因为**它**太宽了。）\n\n两句里的「it」，A 句指动物，B 句指街道。Attention 能通过上下文自动判断。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【推理】在句 A（tired）中，it 最自然指谁？",
      options: ["animal", "street", "cross"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【推理】在句 B（wide）中，it 最自然指谁？",
      options: ["animal", "street", "cross"],
      correct: 1
    },

    // --- 模块五：GPT 的特殊机制 (Masked Attention) ---
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🙈 **不偷看答案的遮挡**\n\n生成式模型训练“预测下一个词”时，不能先看到后面的正确答案。Mask（遮挡）会把后面的位置盖住，让模型只能依据前面的内容学习预测。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【原理】这种“不看后文”的遮挡，主要帮助哪类模型生成文本？",
      options: ["理解整句的模型", "像 GPT 一样续写的模型", "只负责显示文字的界面"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【后果】如果没有 Mask，GPT 在训练时会发生什么？",
      options: ["后面的词会泄露答案，模型学不好预测", "模型会因此完全无法处理文字", "模型只会忘记开头的词"],
      correct: 0
    },

    // --- 模块六：Multi-Head & FFN ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🐙 **多种关注角度**\n\n一句话里可能同时要看主语、指代和语气。多头注意力让模型从多种角度寻找关联，再综合这些线索；每个“头”不一定固定只负责一种语言任务。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【类比】多头注意力就像...",
      options: ["同时关注剧情、演技、配乐和特效", "把电影从头到尾看十遍", "让十个人轮流写同一段话"],
      correct: 0
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🧠 **整理信息**\n\n注意力负责找出并汇集相关线索，后面的前馈网络会进一步转换这些信息。把它们想成“先找资料，再整理资料”即可。"
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】【结构】Attention 层负责信息的",
      parts: ["Attention 负责信息的", "___", "，FFN 负责信息的处理与转换。"],
      options: ["路由/聚合", "遗忘", "存储"],
      correct: "路由/聚合"
    },

    // --- 模块七：综合复习 ---
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【Context Window】为什么超长上下文会更难、更贵处理？",
      options: ["模型需要比较和处理更多内容之间的关系", "长文本会自动变成更短的文本", "因为硬盘只能存放一篇文章"],
      correct: 0
    },
    {
      type: 'match',
      isBoss: true,
      question: "🐉【识破 AI 魔法】🏆 **Day 4 终极排序：数据流转图**",
      pairs: [
        { left: "1. 入口", right: "Input Embedding + Positional Encoding" },
        { left: "2. 聚合", right: "Masked Multi-Head Attention" },
        { left: "3. 消化", right: "Feed Forward Network (FFN)" },
        { left: "4. 出口", right: "Linear + Softmax (预测概率)" }
      ]
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🎉 **Day 4 完成！**\n你知道 Transformer 会结合位置和上下文来找重点。明天看看它的“短期工作台”为什么有限，以及怎样借助资料回答问题。"
    }
  ]
};
