import { DayContent } from '../../../types';

export const v3w1d6Data: DayContent = {
  day: 6,
  title: "Day 6: Tuning Dragon Breath - Temperature and Sampling",
  shards: 1,
  steps: [
    // --- 模块一：概率分布与贪婪 ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🎲 **第一章：选哪一个片段？**\n\n模型会为后续片段估计可能性。服务可以总选最可能的候选，也可以从几个合理候选中抽取。前者通常更稳定，后者通常更有变化；具体默认方式因工具而异。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【概念】总是选择最可能候选的主要缺点是什么？",
      options: ["回答可能缺少变化、容易重复", "生成速度必定最慢", "它会自动核实所有事实"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】【原理】不总选第一名、而是在候选中按可能性抽取的方式叫 ___。",
      parts: ["这种方式叫", "___", "。"],
      options: ["采样", "排序", "存储"],
      correct: "采样"
    },

    // --- 模块二：Temperature (温度) ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🌡️ **第二章：Temperature（温度）**\n\nTemperature 不会给模型增加知识，它影响抽取候选时的变化程度。\n\n- 较低温度：更倾向高可能候选，表达通常更稳定。\n- 较高温度：更多候选有机会被选中，表达通常更多样。\n\n稳定不等于事实必然正确，创意也不等于越高越好。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【参数直觉】Temperature 设得很低时，模型行为最接近于？",
      options: ["每次都完全随机", "优先选择最可能的候选", "自动去资料库搜索"],
      correct: 1
    },
    {
      type: 'match',
      question: "🐉【识破 AI 魔法】【场景调优】请为以下任务匹配最佳的温度设置",
      pairs: [
        { left: "提取固定格式的信息", right: "较低温度，并逐项核对" },
        { left: "头脑风暴多个点子", right: "较高温度，再人工筛选" },
        { left: "数学计算", right: "用计算工具或验算，不只靠温度" },
        { left: "日常闲聊", right: "按需要选适中的变化程度" }
      ]
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【陷阱】把 Temperature 调得很高，最可能带来什么？",
      options: ["模型学会更多新知识", "表达更多样，但也更难预测和控制", "回答必定更短且更省钱"],
      correct: 1
    },

    // --- 模块三：Top-K 与 Top-P (Nucleus) ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🎯 **第三章：缩小候选范围**\n\n除了温度，工具还可先限制候选范围。\n\n- Top-K：只保留可能性排在前 K 名的候选。\n- Top-P：保留累计可能性达到设定值的一组候选；模型很确定时，候选会较少，不确定时会较多。\n\n两者都是控制方式，没有哪一个对所有任务都“更好”。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【辨析】Top-P 的一个特点是什么？",
      options: ["候选数永远固定不变", "它保证回答一定比 Top-K 正确", "候选数会随模型的确定程度变化"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【实战】若 Top-K=1，只留下一个候选，Temperature 对这一步选择的影响是？",
      options: ["仍会从多个候选随机选择", "没有可选择的空间，影响很小", "会自动增加候选到十个"],
      correct: 1
    },

    // --- 模块四：实战 Scenario ---
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【Debug】社团自动回信有时太跳脱、不礼貌，优先怎么改？",
      options: ["调高温度，让它更自由", "只增加候选范围，不改要求", "调低温度，并写清礼貌语气要求"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【Debug】用户：「我让 AI 生成 10 个不同的社团活动海报标题，结果它生成的 10 个看起来都差不多。」 你的建议是？",
      options: ["调高 Temperature 以增加多样性", "调低 Temperature", "减少 Prompt 长度"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】【动态感知】按本课的简化规则，Top-P=0.9，最高候选已占 0.95 时，候选池约有 ___ 个词。",
      parts: ["此时的候选池约有", "___", "个词。"],
      options: ["1 个", "固定 50 个", "取决于词表大小"],
      correct: "1 个"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【测试】比较两次 AI 输出时，最可靠的记录习惯是什么？",
      options: ["只记住自己觉得好的一次", "相信同样提示一定得到同样结果", "记录提示词、模型版本、参数和结果"],
      correct: 2
    },

    // --- 模块五：总结 ---
    {
      type: 'match',
      isBoss: true,
      question: "🐉【识破 AI 魔法】🏆 **Day 6 调参大师认证**",
      pairs: [
        { left: "Temperature", right: "调节回答的稳定性和变化程度" },
        { left: "Top-P", right: "按累计可能性动态选择候选范围" },
        { left: "High Temp", right: "适合写诗、头脑风暴" },
        { left: "Low Temp", right: "适合需要稳定格式的初稿" },
        { left: "测试记录", right: "便于比较不同设置的结果" }
      ]
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🎉 **Day 6 完成！**\n你会用温度和候选范围控制回答的变化，也知道关键任务仍要测试和核对。明天把这一周的判断力用在真实选型挑战中。"
    }
  ]
};
