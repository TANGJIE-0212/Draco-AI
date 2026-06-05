
import { DayContent } from '../../types';

export const day1Data: DayContent = {
  day: 1,
  title: "Day 1: 走进 AI —— 从图灵测试到超级鹦鹉",
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: "👋 **欢迎来到 AI 学习之旅！**\n\n很多人觉得 AI 是最近几年才突然冒出来的，但其实它已经经历了几次寒冬与爆发。在开始之前，请花 2 分钟观看这段视频，了解我们要前往何方，必须知道我们来自何处。"
    },
    {
      type: 'video',
      // 增加了 autoplay=0 确保不会因为强制自动播放而被浏览器静音，并显式指定 muted=0
      url: 'https://player.bilibili.com/player.html?isOutside=true&aid=115858420663313&bvid=BV1MhiQBDEXn&cid=35259483025&p=1&autoplay=0&muted=0', 
      content: "视频：人类智慧的倒影 - AI 发展简史"
    },
    {
      type: 'theory',
      content: "看完视频了吗？让我们通过几个关键的时间节点，来回顾这段激荡的历史。"
    },
    {
      type: 'quiz',
      question: “1. 【起源】『人工智能 (Artificial Intelligence)』这个词最早是在哪里诞生的？”,
      options: [“1956年 达特茅斯会议 (Dartmouth Workshop)”, “1950年 阿兰·图灵发表《计算机器与智能》时首次提出”, “1969年 阿帕网（互联网前身）建立时随之诞生”],
      correct: 0
    },
    {
      type: 'quiz',
      question: “2. 【奠基】阿兰·图灵提出了著名的『图灵测试』。这个测试的核心标准是什么？”,
      options: [“机器能否在数学和逻辑推理上超越人类平均水平”, “人类裁判在对话中无法分辨对方是机器还是人”, “机器能否在国际象棋等复杂棋类游戏中战胜冠军”],
      correct: 1
    },
    {
      type: 'quiz',
      question: “3. 【规则派】早期的 AI（符号主义）主要依靠『专家系统』。它的工作方式更像什么？”,
      options: [“像学生一样，从大量例题中归纳出规律”, “像医生一样，查阅一本写满『如果…那么…』规则的手册后作出判断”, “像人脑神经元一样，通过大量连接自发地形成判断”],
      correct: 1
    },
    {
      type: 'quiz',
      question: “4. 【里程碑】1997年，IBM 的『深蓝 (Deep Blue)』战胜了人类冠军卡斯帕罗夫。它主要依赖的是？”,
      options: [“强大的暴力计算能力（每秒穷举 2 亿个棋步）”, “深度神经网络，能像人类一样形成棋感直觉”, “强化学习，通过自我对弈不断进化棋力”],
      correct: 0
    },
    {
      type: 'fill',
      question: "5. 【转折】2016年，AlphaGo 战胜李世石，震惊世界。这标志着 ___ (Machine Learning) 开始超越人类直觉。",
      parts: ["AlphaGo 的胜利标志着", "___", "时代的全面到来。"],
      options: ["机器学习/深度学习", "专家系统", "量子计算"],
      correct: "机器学习/深度学习"
    },
    {
      type: 'quiz',
      question: "6. 【数据】为什么 AI 在 2010 年代突然爆发？",
      options: ["AI 算法理论有了根本性突破，完全不依赖数据和算力", "互联网产生了海量数据 + GPU 算力大幅提升，两者缺一不可", "政府出台了大量扶持政策，资金推动了发展"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "7. 【架构】2017年，Google 团队发表了一篇划时代的论文《Attention Is All You Need》，提出了 ___ 架构。ChatGPT 正是基于此架构构建的。",
      options: ["RNN (循环神经网络，按顺序一个字一个字读)", "Transformer（能一眼看完整篇文章）", "CNN (卷积神经网络，常用于看图)"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "8. 【现象】ChatGPT 的出现标志着 AI 从“分析型（如人脸识别）”转向了“___ 型”。",
      options: ["生成 (Generative)", "存储 (Storage)", "检索 (Retrieval)"],
      correct: 0
    },
    {
      type: 'match',
      question: "9. 【连线】请将 AI 历史上的里程碑与对应事件连线",
      pairs: [
        { left: "1950s", right: "图灵测试与达特茅斯会议" },
        { left: "1997", right: "深蓝击败国际象棋冠军" },
        { left: "2016", right: "AlphaGo 击败围棋冠军" },
        { left: "2022", right: "ChatGPT 引爆生成式 AI" }
      ]
    },
    {
      type: 'quiz',
      question: "10. 【趋势】摩尔定律预言了芯片性能的翻倍，而 AI 模型的参数量增长速度？",
      options: ["远慢于摩尔定律", "基本符合摩尔定律", "远超摩尔定律 (指数级爆炸)"],
      correct: 2
    },
 
    {
      type: 'match',
      isBoss: true,
      question: "11. 【终极回顾】不同时代的 AI 像什么？",
      pairs: [
        { left: "符号主义 (旧 AI)", right: "查字典/按照说明书做事" },
        { left: "深度学习 (新 AI)", right: "像大脑一样从经验中学习" },
        { left: "生成式 AI (现在)", right: "举一反三，创造新内容" },
        { left: "AGI (未来)", right: "无需专项训练，面对全新任务也能自主推理解决" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 1 完成！**\n\n历史课结束了。你可能会问：现在的 GPT 到底是怎么“思考”的？\n\n**Day 2 预告**：我们将揭开 LLM 的第一性原理——它其实只是一个**“疯狂的文字接龙玩家”**。"
    }
  ]
};
