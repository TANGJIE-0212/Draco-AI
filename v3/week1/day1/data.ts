
import { DayContent } from '../../../types';

export const v3w1d1Data: DayContent = {
  day: 1,
  title: "AI 发展简史——从图灵测试到生成式 AI",
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n👋 **欢迎来到 AI 学习之旅！**\n\n**AI 是 Artificial Intelligence（人工智能）的简称**，指让计算机完成通常需要人类智能的任务；**生成式 AI** 是其中能根据学到的模式生成文字、图像等内容的一类系统。\n\n先认识今天会遇到的历史词：**图灵测试**用文字对话讨论机器能否表现出类似人的智能；1956 年的**达特茅斯会议**推动 AI 成为正式研究领域；**专家系统**把专家知识写成“如果……那么……”规则；**AI 寒冬**是承诺过高、成果不足后资金和关注下降的时期；**AlexNet** 是 2012 年表现突出的图像识别深度神经网络；**GPT（Generative Pre-trained Transformer，生成式预训练 Transformer）**是一类生成文字的模型。看视频时重点理解变化，不必死背年份。"
    },
    {
      type: 'video',
      // 增加了 autoplay=0 确保不会因为强制自动播放而被浏览器静音，并显式指定 muted=0
      url: '/video/week1/day1-short-zh.mp4',
      content: "🐉 **AI 小侦探档案**\n\n视频：人类智慧的倒影 - AI 发展简史"
    },
    {
      type: 'interactive',
      interactiveKind: 'timeline',
      interactiveTitle: 'AI 历史时间线：每次突破解决了什么？'
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n看完视频了吗？用几个关键节点认识 AI 的来路。重点是理解变化，不是背年份。"
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】1. 1950 年，阿兰·图灵提出了后来被称为“图灵测试”的想法。它主要测试什么？",
      options: ["人类裁判能否在文字对话中分辨机器与人", "机器能否比人类更快完成数学计算", "机器能否独立制造另一台机器"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】2. 为什么 1956 年达特茅斯会议被视为 AI 历史的重要起点？",
      options: ["它推动“人工智能”成为一个有名称、有共同研究目标的领域", "它制造了第一台真正拥有意识的机器", "它首次证明计算机可以连接互联网"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】3. 【规则派】20 世纪后期的“专家系统”更像怎样工作？",
      options: ["从大量例子中自己找规律", "按“如果……那么……”的规则作判断", "随机尝试后保留幸运答案"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】4. AI 历史上为什么会出现“AI 寒冬”？",
      options: ["早期承诺过高，但当时的数据、算力和方法无法达到预期", "研究者一致认为机器永远不能计算", "互联网出现后，人们不再需要 AI"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【AI 历史侦探】5. 1997 年，IBM 的 ___ 击败国际象棋世界冠军卡斯帕罗夫。",
      parts: ["1997 年击败卡斯帕罗夫的是 IBM 的", "___", "。"],
      options: ["深蓝", "AlphaGo", "ChatGPT"],
      correct: "深蓝"
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】6. 2012 年 AlexNet 在图像识别比赛中表现突出，这个节点推动了什么方向重新兴起？",
      options: ["专家系统", "深度学习", "机械计算器"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】7. 2016 年，哪一事件让更多公众看到深度学习可以处理极复杂的策略问题？",
      options: ["图灵发表《计算机器与智能》", "AlphaGo 击败李世石", "达特茅斯会议召开"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】8. 2017 年论文《Attention Is All You Need》提出的哪项技术路线，后来成为 GPT 等大语言模型的重要基础？",
      options: ["专家系统：把知识主要写成固定的“如果……那么……”规则", "卷积神经网络：主要用局部卷积核提取图像特征", "Transformer：用自注意力动态联系输入中不同位置的信息"],
      correct: 2
    },
    {
      type: 'match',
      question: "🐉【AI 历史侦探】9. 【时间线连线】把 AI 里程碑与年代连起来",
      pairs: [
        { left: "1950 年", right: "图灵提出机器智能的著名测试设想" },
        { left: "1956 年", right: "达特茅斯会议推动“人工智能”成为研究领域" },
        { left: "1997 年", right: "深蓝击败国际象棋世界冠军" },
        { left: "2016 年", right: "AlphaGo 击败李世石" }
      ]
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】10. 为什么 AI 在 2010 年代迎来新一轮快速发展？",
      options: ["海量数据、更强算力和算法进步共同作用", "只因为“人工智能”改了一个名字", "因为所有程序都改成了专家系统"],
      correct: 0
    },
 
    {
      type: 'match',
      isBoss: true,
      question: "🐉【AI 历史侦探】11. 【阶段回顾】把 AI 发展阶段与主要特点连起来",
      pairs: [
        { left: "符号主义与专家系统", right: "依靠人写下的知识和规则" },
        { left: "机器学习", right: "从数据中寻找模式" },
        { left: "深度学习", right: "用多层神经网络学习复杂特征" },
        { left: "生成式 AI", right: "根据学到的模式生成文字、图像等内容" }
      ]
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】12. 2022 年 ChatGPT 引发广泛关注，最能代表 AI 发生了什么变化？",
      options: ["从只能执行固定规则，直接变成了有意识的生命", "生成式 AI 通过自然语言对话走向大众", "AI 第一次能够处理任何数字"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【AI 历史侦探】13. 从深蓝到 AlphaGo，最关键的技术路线变化是什么？",
      options: ["从依赖强力搜索和人工知识，走向更多地从数据与对局中学习", "从使用计算机变成完全不使用计算机", "从围棋转向国际象棋"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【AI 历史侦探】14. ChatGPT 名称中的字母 T，来自 2017 年提出的 ___ 架构。",
      parts: ["GPT 中的 T 指", "___", "。"],
      options: ["Transformer", "Turing Test", "Technology"],
      correct: "Transformer"
    },
    {
      type: 'practice',
      task: "🐉【AI 历史侦探】15. 【历史档案】从图灵测试、达特茅斯会议、深蓝、AlphaGo、Transformer、ChatGPT 中选择三个节点，按时间顺序写出“发生了什么”和“为什么重要”。",
      rubric: "满分答案应选择至少三个真实节点，时间顺序正确；每个节点都包含事件和历史意义；能看出 AI 从规则、搜索或学习走向生成式 AI 的变化。",
      placeholder: "例如：1950 年……；它的重要性是……",
      minLength: 30,
      referenceAnswer: "1950 年，图灵提出用对话判断机器智能，为“机器能否思考”提供了可讨论的测试；1997 年，深蓝击败国际象棋世界冠军，展示强大计算与搜索的能力；2017 年，Transformer 架构被提出，后来成为大语言模型的重要基础；2022 年，ChatGPT 让生成式 AI 通过自然语言对话走向大众。"
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🎉 **Day 1 完成！**\n\n历史课结束了。明天我们用“文字接龙”这个比喻，看看大语言模型怎样一步步生成回答，也记得：会接话不等于永远正确。"
    }
  ]
};
