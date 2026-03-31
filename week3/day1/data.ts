import { DayContent } from '../../types';

export const day1Data: DayContent = {
  day: 1,
  title: "Day 1: 提炼精华 —— 文本摘要实战",
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: "👋 **欢迎来到第三周！**\n\n本周我们将进入实战阶段。AI 最强大的能力之一就是处理海量信息。今天我们要学习如何让 AI 帮我们‘读薄’文章。"
    },
    {
      type: 'video',
      url: 'https://player.bilibili.com/player.html?isOutside=true&aid=115858420663313&bvid=BV1MhiQBDEXn&cid=35259483025&p=1&autoplay=0&muted=0', 
      content: "视频讲解：如何写出完美的摘要提示词"
    },
    {
      type: 'quiz',
      question: "1. 在要求 AI 做摘要时，提供‘字数限制’（如：请用100字以内总结）的主要目的是？",
      options: ["节省 AI 的算力", "强制 AI 过滤次要信息，只保留核心", "防止 AI 产生幻觉"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "2. 如果你想让摘要更适合发在小红书上，你应该在提示词中加入什么？",
      options: ["指定语气和风格（如：活泼、多用表情）", "要求 AI 使用英文", "提供更多的背景数据"],
      correct: 0
    },
    {
      type: 'practical',
      task: "请尝试给 AI 下达指令，让它总结以下内容：'人工智能（AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。'。要求：总结成一句话，且包含‘计算机科学’这个词。",
      hint: "你可以尝试这样写：'请用一句话总结以下内容，确保提到它是计算机科学的分支：[内容]'"
    },
    {
      type: 'theory',
      content: "🎉 **太棒了！**\n\n你已经完成了第一次实战。通过 AI 导师的评估，你已经掌握了摘要的基本技巧。\n\n**明天预告**：我们将学习如何从乱七八糟的文本中提取出结构化的数据（如表格）。"
    }
  ]
};
