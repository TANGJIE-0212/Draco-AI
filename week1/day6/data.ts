import { DayContent } from '../../types';

export const day6Data: DayContent = {
  day: 6,
  title: "控制混沌：Temperature 与采样策略",
  shards: 1,
  steps: [
    // --- 模块一：概率分布与贪婪 ---
    { 
      type: 'theory', 
      content: "🎲 **第一章：上帝掷骰子吗？**\n\nAI 预测下一个词时，会输出一个**概率列表**：\n`{苹果: 0.6, 香蕉: 0.3, 电脑: 0.01 ...}`\n\n如果不加干预，模型默认会使用 **Greedy Search (贪婪搜索)**，即永远只选概率最大的那个词。这会导致回答极其生硬、重复，甚至陷入死循环。" 
    },
    {
      type: 'quiz',
      question: "【概念】Greedy Search (贪婪搜索) 的主要缺点是什么？",
      options: ["计算速度太慢", "生成的内容缺乏多样性，容易重复", "容易产生幻觉"],
      correct: 1
    },
    {
      type: 'fill',
      question: "【原理】为了让 AI 像人一样说话，我们需要引入 ___ (Sampling)，即不一定选概率最高的词，而是按概率随机抽取。",
      parts: ["引入", "___", "策略，让低概率的词也有机会被选中。", "___"],
      options: ["采样 (Sampling)", "排序 (Sorting)", "过滤 (Filtering)"],
      correct: "采样 (Sampling)"
    },

    // --- 模块二：Temperature (温度) ---
    { 
      type: 'theory', 
      content: "🌡️ **第二章：Temperature 的数学本质**\n\nTemperature 并不改变模型本身，它只是改变了**Softmax 之前的概率分布形态**。\n\n- **T < 1 (低温)**: 概率分布变“尖”。强者恒强（80% -> 99%），弱者更弱。AI 变得**保守、确定**。\n- **T > 1 (高温)**: 概率分布变“平”。贫富差距缩小。低概率词被选中的机会大增。AI 变得**疯狂、跳跃**。" 
    },
    {
      type: 'quiz',
      question: "【参数直觉】当 Temperature 设置为 0 时，模型的行为最接近于？",
      options: ["完全随机输出 (乱码)", "Greedy Search (永远输出固定的唯一解)", "Top-P 采样"],
      correct: 1
    },
    {
      type: 'match',
      question: "【场景调优】请为以下任务匹配最佳的温度设置",
      pairs: [
        { left: "数学计算 / 代码生成", right: "温度 0.0 - 0.2 (严谨)" },
        { left: "创意写作 / 头脑风暴", right: "温度 0.8 - 1.0 (发散)" },
        { left: "数据抽取 / 格式转换", right: "温度 0.1 (格式稳定)" },
        { left: "日常闲聊 / 角色扮演", right: "温度 0.6 - 0.8 (自然)" }
      ]
    },
    {
      type: 'quiz',
      question: "【陷阱】把 Temperature 调高到 1.5 甚至 2.0，最可能发生什么？",
      options: ["AI 变得超级聪明，写出诺贝尔奖级别的文章", "AI 开始胡言乱语，语法混乱，甚至生造单词", "AI 运行速度变快"],
      correct: 1
    },

    // --- 模块三：Top-K 与 Top-P (Nucleus) ---
    { 
      type: 'theory', 
      content: "🎯 **第三章：掐头去尾 (Top-K & Top-P)**\n\n除了调温度，我们还必须把那些概率极低、极不靠谱的词（比如“我吃... 汽车”）直接切掉。\n\n- **Top-K**: 永远只看前 K 个词（比如前 10 名）。\n- **Top-P (核采样)**: 更智能。它只取累加概率达到 P (如 0.9) 的词。如果前两个词概率就占了 0.9，那候选名单就只有 2 个；如果前 50 个词加起来才 0.9，名单就有 50 个。" 
    },
    {
      type: 'quiz',
      question: "【辨析】为什么 Top-P 通常比 Top-K 效果更好？",
      options: ["因为 P 代表 Python，代码写起来容易", "因为 Top-P 是动态调整候选数量的，能适应不同确信度的语境", "Top-K 计算量太大"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【实战】如果同时设置 Top-K=1 和 Temperature=1，实际起作用的是？",
      options: ["Temperature (因为它是基础)", "Top-K=1 (因为候选池被缩减到只剩 1 个，怎么随机都没用)", "两者混合"],
      correct: 1
    },

    // --- 模块四：实战 Scenario ---
    {
      type: 'quiz',
      question: "【Debug】用户：“我用 API 写了一个自动回复邮件的机器人，但它有时候回复的内容太跳脱，甚至有点不礼貌。” 你的建议是？",
      options: ["调高 Temperature", "调低 Temperature，并检查 Prompt 的语气约束", "增加 Top-P 值"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【Debug】用户：“我让 AI 生成 10 个不同的营销标题，结果它生成的 10 个看起来都差不多。” 你的建议是？",
      options: ["调低 Temperature", "调高 Temperature 以增加多样性", "减少 Prompt 长度"],
      correct: 1
    },
    {
      type: 'fill',
      question: "【技巧】在实际开发中，如果我们既想保持一定的逻辑性，又想有一点点变化，通常推荐的参数组合是：Temperature ≈ 0.7 且 Top-P ≈ ___ 。",
      parts: ["Top-P 通常设置为", "___", "左右来截断长尾垃圾词。"],
      options: ["0.9", "0.1", "0.5"],
      correct: "0.9"
    },
    {
      type: 'quiz',
      question: "【种子】即使参数一样，为什么 OpenAI 有时还是会输出不同的结果？",
      options: ["因为 GPU 硬件层面的浮点数运算存在微小的非确定性", "因为 OpenAI 在后台偷偷改了你的参数", "因为 AI 有自由意志"],
      correct: 0
    },

    // --- 模块五：总结 ---
    {
      type: 'match',
      isBoss: true,
      question: "🏆 **Day 5 调参大师认证**",
      pairs: [
        { left: "Temperature", right: "概率分布的平滑度调节" },
        { left: "Top-P", right: "动态截断尾部垃圾词" },
        { left: "High Temp", right: "适合写诗、头脑风暴" },
        { left: "Low Temp", right: "适合代码、数学、提取" },
        { left: "Seed (种子)", right: "控制随机性的起始数" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 5 完成！**\n你现在掌握了 AI 的“情绪旋钮”。\n明天，我们将进入目前最实用、最能拉开差距的技能：**Prompt Engineering (提示工程)**。"
    }
  ]
};