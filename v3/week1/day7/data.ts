import { DayContent } from '../../../types';

export const v3w1d7Data: DayContent = {
  day: 7,
  title: "Day 7: Dragon Lair Choices - Model Selection and Boss Battle",
  shards: 1,
  steps: [
    // --- 模块一：开源 vs 闭源 ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n🏰 **第一章：怎样选模型？**\n\n有些模型只能通过服务商使用（闭源），有些会公开模型权重或代码（开放权重/开源）。前者通常更省部署工作，后者可能提供更多控制空间。具体许可证、价格、能力和数据处理规则各不相同；“开源”不等于免费、私密或适合所有人。"
    },
    {
      type: 'match',
      question: "🐉【识破 AI 魔法】【选型顾问】请为以下龙学院任务推荐方案",
      pairs: [
        { left: "校内敏感资料不能离开学校", right: "先做安全与合规评估，再考虑本地方案" },
        { left: "快速做一个公开创意原型", right: "选择规则清楚的云端服务并控制预算" },
        { left: "研究模型如何运作", right: "查看允许研究的公开权重和文档" },
        { left: "稳定的公共问答服务", right: "选择有支持服务并做好内容审核的方案" }
      ]
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【误区】开放权重模型意味着完全免费吗？",
      options: ["不是，还要看许可证、设备和运行成本", "是的，不会产生任何费用", "是的，只要下载就能保证私密安全"],
      correct: 0
    },

    // --- 模块二：大象与蚂蚁 (参数量) ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n⚖️ **第二章：够用比最大更重要**\n\n模型名称中的 7B、70B 常表示参数量级。更大的模型往往需要更多设备和费用，但不保证每项任务都更好。选模型要先看任务、测试效果、速度、成本和安全要求。\n\n量化是用更省空间的方式保存和运行模型，能降低设备要求，也可能影响效果，必须实际测试。"
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【应用】从短文中提取龙名，合理的第一步是什么？",
      options: ["直接选最大、最贵的模型", "为了一个短文训练新模型", "先测试一个能完成任务的较小模型"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】【硬件】模型明显超过自己的设备能力时，正确做法是什么？",
      options: ["强行运行，电脑会自动补足资源", "换用更小模型或评估其他合适方案", "关闭散热，让设备运行得更快"],
      correct: 1
    },

    // --- 模块三：Week 1 Boss Battle (综合复习) ---
    { 
      type: 'theory', 
      content: "🐉 **AI 小侦探档案**\n\n⚔️ **最终章：第一周 BOSS BATTLE**\n\n准备好了吗？把 Token、语义地图、注意力、资料核查和提示词串起来。目标不是背术语，而是在使用 AI 时作出更可靠的判断。"
    },
    
    // Level 1: 原理
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】1. 【原理】语言模型生成文字时，主要在估计什么？",
      options: ["根据前文出现后续片段的可能性", "这句话的情感分数", "这句话是否绝对真实"],
      correct: 0
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】2. 【核心】Transformer 训练时可 ___ 处理多个位置，并建立远近关联。",
      parts: ["Transformer 训练时可", "___", "处理多个位置。"],
      options: ["同时", "逐字", "随机"],
      correct: "同时"
    },

    // Level 2: 向量与搜索
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】3. 【Embedding】向量“加减”示意主要说明什么？",
      options: ["汉字笔画数决定词义关系", "词义关系有时会呈现可比较的规律", "任何词都能算出唯一正确答案"],
      correct: 1
    },
    {
      type: 'match',
      question: "🐉【识破 AI 魔法】4. 【技术栈连线】",
      pairs: [
        { left: "把字切成数", right: "Tokenizer" },
        { left: "把数变成坐标", right: "Embedding" },
        { left: "存储海量坐标", right: "Vector DB" },
        { left: "计算关注点", right: "Attention Mechanism" }
      ]
    },

    // Level 3: 记忆与窗口
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】5. 【Context】回答达到输出上限时，可能会发生什么？",
      options: ["系统一定会自动无缝续写", "模型一定会删除全部聊天记录", "回答会停止，需要分段继续"],
      correct: 2
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】6. 【RAG】为什么有了 RAG 还要写清提示词？",
      options: ["有 RAG 后不必提出任务要求", "RAG 找资料，提示词说明要怎样使用和核查资料", "提示词只会让资料变得不可靠"],
      correct: 1
    },

    // Level 4: 控制与交互
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】7. 【Temperature】为需要稳定格式的代码草稿选设置时，较合适的是？",
      options: ["较高温度，并跳过测试", "较低温度，并运行测试核对", "最高温度，并相信一定正确"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】8. 【Prompt】核对一道计算题时，哪种要求最有帮助？",
      options: [
        "隐藏所有依据，只给一个结论",
        "不看题目，直接猜一个答案",
        "给出简短、可检查的计算步骤和结果"
      ],
      correct: 2
    },
    {
      type: 'fill',
      question: "🐉【识破 AI 魔法】9. 【Prompt】Few-Shot 是指在 Prompt 中提供",
      parts: ["Few-Shot 是指提供", "___", "让模型模仿。"],
      options: ["示例 (Examples)", "指令", "金钱"],
      correct: "示例 (Examples)"
    },
    
    // Level 5: 综合应用 (Scenario)
    {
      type: 'quiz',
      question: "🐉【识破 AI 魔法】10. 【终极应用】设计“社团规则查阅助手”，要求引用准确且不乱编，较好的方案是？",
      options: ["让模型自由回答，不提供规则原文", "使用批准资料检索、标注出处，并由负责人维护", "只提高温度，让回答更有创意"],
      correct: 1
    },
    {
      type: 'match',
      isBoss: true,
      question: "🐉【识破 AI 魔法】🏆 **通关认证：从原理到产品**",
      pairs: [
        { left: "算力层", right: "GPU / TPU" },
        { left: "模型层", right: "Transformer / Weights" },
        { left: "记忆层", right: "Vector DB / Context" },
        { left: "应用层", right: "Prompt / Agent" }
      ]
    },
    {
      type: 'theory',
      content: "🐉 **AI 小侦探档案**\n\n🎉 **Week 1 完成！**\n\n你已经学会：AI 会按模式生成、可能出错；资料要核验；隐私和任务要求要先想清楚。下周开始练习怎样把目标、背景和限制说清楚，让 AI 更好地协助你的创作。"
    }
  ]
};
