
import { DayContent } from '../../../types';

export const v3w1d1Data: DayContent = {
  day: 1,
  title: "Day 1: Dragon Academy - AI Origins and Text Magic",
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n👋 **欢迎来到 AI 学习之旅！**\n\n生成式 AI 看起来很新，但人们研究“机器能不能思考”已经很久了。看视频时不必记住每个年份：留意 AI 是怎样从遵守规则，慢慢发展到能从大量例子中学习和生成内容的。"
    },
    {
      type: 'video',
      // 增加了 autoplay=0 确保不会因为强制自动播放而被浏览器静音，并显式指定 muted=0
      url: 'https://player.bilibili.com/player.html?isOutside=true&aid=115858420663313&bvid=BV1MhiQBDEXn&cid=35259483025&p=1&autoplay=0&muted=0', 
      content: "🐉 **AI 小侦探档案**\n\n视频：人类智慧的倒影 - AI 发展简史"
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n看完视频了吗？用几个关键节点认识 AI 的来路。重点是理解变化，不是背年份。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】1. 【起源】“人工智能”作为研究领域的名称，通常追溯到哪次会议？",
      options: ["1956 年的达特茅斯夏季研究项目", "1950 年图灵发表相关文章时", "1969 年阿帕网建立时"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】2. 【奠基】图灵测试主要想考察什么？",
      options: ["机器能否比人算得更快", "人在对话中能否分辨机器和人", "机器能否赢得棋类比赛"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】3. 【规则派】早期的“专家系统”更像怎样工作？",
      options: ["从大量例子中自己找规律", "按“如果……那么……”的规则作判断", "随机尝试后保留幸运答案"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】4. 【里程碑】1997 年，深蓝战胜国际象棋冠军，主要靠什么？",
      options: ["高速搜索大量棋局并评估局面", "像今天的大模型一样写出解释", "通过网络搜索人类的实时建议"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】5. 【转折】AlphaGo 的表现让更多人关注到：AI 可以通过大量对局学习策略。这属于 ___。",
      parts: ["从大量对局中学习策略，属于", "___", "的方法。"],
      options: ["机器学习", "手写规则", "随机猜测"],
      correct: "机器学习"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】6. 【变化】近年 AI 进步很快，哪个组合是重要原因？",
      options: ["只要给模型起一个新名字", "更多数据、更强计算和方法改进", "只要让电脑联网就够了"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】7. 【架构】2017 年论文《Attention Is All You Need》提出了哪种重要架构？",
      options: ["RNN", "Transformer", "CNN"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】8. 【现象】ChatGPT 能写文字、编故事和改图片说明，属于哪类 AI？",
      options: ["生成 (Generative)", "存储 (Storage)", "检索 (Retrieval)"],
      correct: 0
    },
    {
      type: 'match',
      question: "🐉【识破 AI 魔法】9. 【连线】请将 AI 历史上的里程碑与对应事件连线",
      pairs: [
        { left: "1950s", right: "图灵测试与达特茅斯会议" },
        { left: "1997", right: "深蓝击败国际象棋冠军" },
        { left: "2016", right: "AlphaGo 击败围棋冠军" },
        { left: "2022", right: "ChatGPT 引爆生成式 AI" }
      ]
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】10. 【趋势】近年一些 AI 模型的规模变化，最合适的描述是？",
      options: ["始终按固定规律增长", "和芯片发展完全没有关系", "增长很快，但不同模型并不遵循同一条定律"],
      correct: 2
    },
 
    {
      type: 'match',
      isBoss: true,
      question: "🐉【识破 AI 魔法】11. 【终极回顾】不同时代的 AI 像什么？",
      pairs: [
        { left: "专家系统", right: "按人写好的规则作判断" },
        { left: "机器学习", right: "从大量例子中找出模式" },
        { left: "生成式 AI", right: "根据模式生成新的文字或图像" },
        { left: "AI 的未来", right: "仍在发展，需要人持续测试和负责使用" }
      ]
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🎉 **Day 1 完成！**\n\n历史课结束了。明天我们用“文字接龙”这个比喻，看看大语言模型怎样一步步生成回答，也记得：会接话不等于永远正确。"
    }
  ]
};
