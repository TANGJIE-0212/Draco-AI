
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
      question: "1. 【起源】“人工智能 (Artificial Intelligence)”这个词最早是在哪里诞生的？",
      options: ["1956年 达特茅斯会议 (Dartmouth Workshop)", "1945年 二战后的五角大楼", "2010年 谷歌实验室"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "2. 【奠基】阿兰·图灵提出了著名的“图灵测试”。这个测试的核心标准是什么？",
      options: ["机器能否通过复杂的数学考试", "人类能否分辨出与自己对话的是机器还是人", "机器能否在国际象棋中战胜人类"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "3. 【规则派】早期的 AI（符号主义）主要依靠“专家系统”。它的工作方式更像什么？",
      options: ["像小孩一样自我学习", "像通过大量查阅这本厚厚的《如果-那么》规则书来行动", "像神经网络一样连接"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "4. 【里程碑】1997年，IBM 的“深蓝 (Deep Blue)”战胜了人类冠军卡斯帕罗夫。它主要依赖的是？",
      options: ["强大的暴力计算能力 (穷举棋步)", "深度学习直觉", "模仿人类心理"],
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
      question: "6. 【数据】为什么 AI 在 2010 年代突然爆发？（多选逻辑）",
      options: ["因为程序员变聪明了", "互联网产生了海量数据 + GPU 算力的大幅提升", "电力变得更便宜了"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "7. 【架构】2017年，Google 团队发表了一篇划时代的论文《Attention Is All You Need》，提出了 ___ 架构。ChatGPT 正是基于此架构构建的。",
      options: ["RNN (循环神经网络)", "Transformer", "CNN (卷积神经网络)"],
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
      type: 'quiz',
      question: "11. 【术语】什么是 LLM (Large Language Model)？",
      options: ["一种超大型的翻译字典", "基于海量文本训练的大型语言模型", "一种专门用来画画的 AI"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "12. 【原理】LLM 的核心工作原理通常被描述为？",
      options: ["逻辑推理", "概率预测下一个词", "查阅百科全书"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "13. 【应用】以下哪个不是生成式 AI 的典型应用？",
      options: ["写代码", "生成图像", "计算圆周率到第10亿位"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "14. 【局限】AI 产生‘幻觉’的主要原因是？",
      options: ["它太聪明了在开玩笑", "它只是在预测概率，并不真正理解事实", "它的服务器过热了"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "15. 【安全】为什么要对 AI 进行‘对齐 (Alignment)’？",
      options: ["让它的文字排版更整齐", "确保 AI 的价值观与人类安全利益一致", "让它运行得更快"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "16. 【交互】什么是‘提示词工程 (Prompt Engineering)’？",
      options: ["修理 AI 服务器的工程", "通过优化输入指令来获得更好的 AI 输出", "编写 AI 底层代码"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "17. 【多模态】如果一个 AI 既能看图又能说话，它被称为？",
      options: ["单模态 AI", "多模态 AI", "全能 AI"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "18. 【算力】目前训练顶级 AI 模型主要依赖哪种硬件？",
      options: ["CPU (中央处理器)", "GPU (图形处理器)", "硬盘"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "19. 【未来】AGI (通用人工智能) 的定义大致是？",
      options: ["只会下棋的 AI", "在所有智力任务上都能达到或超过人类水平的 AI", "会做饭的机器人"],
      correct: 1
    },
    {
      type: 'match',
      isBoss: true,
      question: "20. 【终极回顾】不同时代的 AI 像什么？",
      pairs: [
        { left: "符号主义 (旧 AI)", right: "查字典/按照说明书做事" },
        { left: "深度学习 (新 AI)", right: "像大脑一样从经验中学习" },
        { left: "生成式 AI (现在)", right: "举一反三，创造新内容" },
        { left: "AGI (未来)", right: "通用人工智能 (像人一样全能)" }
      ]
    },
    {
      type: 'theory',
      content: "🎉 **Day 1 完成！**\n\n历史课结束了。你可能会问：现在的 GPT 到底是怎么“思考”的？\n\n**Day 2 预告**：我们将揭开 LLM 的第一性原理——它其实只是一个**“疯狂的文字接龙玩家”**。"
    }
  ]
};
