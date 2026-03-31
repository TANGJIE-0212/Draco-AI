import { DayContent } from '../../types';

export const day2Data: DayContent = {
  day: 2,
  title: "Day 2: 第一性原理 —— 预测下一个词",
  shards: 1,
  steps: [
    // --- 模块一：只会猜词的机器 ---
    { 
      type: 'theory', 
      content: "🧠 **第一章：AI 的本质**\n\n抛开复杂的数学，GPT 做的事情只有一个：**Next Token Prediction (预测下一个词)**。\n\n它不理解真理，它只计算概率。当你输入“白日依山尽”，它根据训练数据算出，后面接“黄河入海流”的概率是 99.9%。" 
    },
    {
      type: 'quiz',
      question: "1. 【核心】当我们问 ChatGPT 一个复杂问题时，它实际上是在做什么？",
      options: ["去谷歌搜索答案然后粘贴给我", "一个字一个字地预测接下来出现概率最高的词", "像人类一样先在脑子里构思好整个逻辑架构，再写出来"],
      correct: 1
    },
    {
      type: 'fill',
      question: "2. 【比喻】从原理上讲，ChatGPT 最像我们手机里的 ___ (Autocomplete) 功能，只不过它更强大。",
      parts: ["大模型本质上是一个超级强大的", "___", "工具。"],
      options: ["自动补全/联想输入", "计算器", "录音机"],
      correct: "自动补全/联想输入"
    },
    {
      type: 'quiz',
      question: "3. 【直觉】如果输入“番茄炒...”，模型可能会预测“蛋 (90%)”或“西红柿 (5%)”。它为什么不预测“电脑”？",
      options: ["因为模型不喜欢吃电脑", "因为在人类语料库中，“番茄炒电脑”出现的统计概率极低", "因为程序员写代码禁止了"],
      correct: 1
    },

    // --- 模块二：概率与随机性 ---
    { 
      type: 'theory', 
      content: "🎲 **第二章：上帝掷骰子**\n\nAI 并不是每次都选概率最高的那个词（否则说话会很无聊）。它会在高概率的候选词里**随机挑一个**。\n\n这就是为什么同样的 Prompt，你问两遍，答案可能不一样的根本原因。" 
    },
    {
      type: 'quiz',
      question: "4. 【原理】为什么 ChatGPT 有时候会一本正经地胡说八道（幻觉）？",
      options: ["因为它是根据概率生成看起来通顺的句子，而不是基于事实核查", "因为 AI 有主观恶意，想欺骗人类", "因为它的数据库被黑客攻击了"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "5. 【区别】传统的“搜索引擎”和“大语言模型”的区别是？",
      options: ["搜索引擎是基于检索(找现成的)，LLM 是基于生成(猜下一个词)", "搜索引擎更聪明", "LLM 是基于检索的"],
      correct: 0
    },
    {
      type: 'match',
      question: "6. 【概念对比】",
      pairs: [
        { left: "确定性程序 (如计算器)", right: "1+1 永远等于 2" },
        { left: "概率性模型 (如 LLM)", right: "同样的输入，输出可能不同" },
        { left: "训练阶段", right: "学习词与词之间的概率关系" },
        { left: "推理阶段", right: "利用概率关系生成内容" }
      ]
    },

    // --- 模块三：自回归 (Autoregressive) ---
    { 
      type: 'theory', 
      content: "🔄 **第三章：自回归 (Autoregressive)**\n\nAI 写文章不是一口气写完的，而是**像贪吃蛇一样**：\n生成第 1 个字 -> 把第 1 个字加到输入里 -> 生成第 2 个字 -> 把前 2 个字加到输入里 -> 生成第 3 个字..." 
    },
    {
      type: 'fill',
      question: "7. 【机制】这种“自己生成的输出，变成下一次的输入”的模式，被称为 ___ (Autoregressive)。",
      parts: ["LLM 是典型的", "___", "模型。"],
      options: ["自回归", "自编码", "随机森林"],
      correct: "自回归"
    },
    {
      type: 'quiz',
      question: "8. 【现象】为什么 AI 生成长文时，速度是一个字一个字蹦出来的，而不是整段直接显示？",
      options: ["为了模拟打字效果，让人觉得亲切", "受限于自回归机制，必须生成了上一个字，才能算下一个字的概率", "网速太慢"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "9. 【弱点】基于“预测下一个词”的原理，AI 最不擅长做什么？",
      options: ["写诗", "做长逻辑链的数学推理（因为一步算错，后面步步错，且无法回溯修改）", "翻译"],
      correct: 1
    },

    // --- 模块四：Prompt 的作用 ---
    { 
      type: 'theory', 
      content: "🗣️ **第四章：Prompt (提示词) 的本质**\n\nPrompt 就是给 AI 的**“上文”**。你给的“上文”限定得越死，AI 预测“下文”的概率空间就越窄，答案就越准。" 
    },
    {
      type: 'quiz',
      question: "10. 【技巧】为什么给 AI 一些“示例”（Few-Shot）能让它表现更好？",
      options: ["因为 AI 会把示例抄下来", "因为示例作为上文，调整了模型预测后续内容的概率分布，使其模仿示例的模式", "因为示例增加了 Token 数量"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "11. 【实战】如果 AI 总是在瞎编事实，你应该怎么做来限制它的预测概率？",
      options: ["给它提供包含事实的参考资料 (Context)，让它基于资料回答", "骂它一顿", "把温度 (Temperature) 调高"],
      correct: 0
    },

    // --- 模块五：深入思考 ---
    {
      type: 'quiz',
      question: "12. 【哲学】有人批评 LLM 只是“随机鹦鹉 (Stochastic Parrots)”，意思是？",
      options: ["它们模仿人类语言很像，但没有真正的理解和意识，只是概率的复读机", "它们的颜色很鲜艳", "它们很吵"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "13. 【温度】在设置中，Temperature (温度) 参数控制的是什么？",
      options: ["显卡的发热量", "预测概率分布的随机程度 (越高越发散)", "回答的礼貌程度"],
      correct: 1
    },
    {
      type: 'match',
      question: "14. 【术语自查】",
      pairs: [
        { left: "Inference (推理)", right: "模型使用训练好的权重生成答案的过程" },
        { left: "Training (训练)", right: "模型学习海量数据调整权重的过程" },
        { left: "Hallucination (幻觉)", right: "一本正经地胡说八道" },
        { left: "Context (上下文)", right: "模型用来预测下一个词的依据" }
      ]
    },
    {
      type: 'match',
      isBoss: true,
      question: "15. 【终极总结】LLM 的一生",
      pairs: [
        { left: "出生", right: "阅读互联网海量文本" },
        { left: "本能", right: "预测下一个 Token" },
        { left: "性格", right: "由概率分布决定" },
        { left: "缺陷", right: "容易产生幻觉" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 2 完成！**\n\n你已经掌握了 AI 的第一性原理：它不是神，只是一个**数学极好的接龙游戏玩家**。\n\n**Day 3 预告**：为了玩这个接龙游戏，AI 需要把文字变成数字。明天我们将学习 AI 的视觉 —— **Token 与 Embedding**。"
    }
  ]
};