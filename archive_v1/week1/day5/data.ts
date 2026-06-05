import { DayContent } from '../../types';

export const day5Data: DayContent = {
  day: 5,
  title: "记忆的瓶颈：Context Window (上下文窗口)",
  shards: 1,
  steps: [
    // --- 模块一：短期记忆的物理极限 ---
    { 
      type: 'theory', 
      content: "🧠 **第一章：AI 的短期记忆 (RAM)**\n\nAI 有两种记忆：\n1. **长期记忆（权重）**：训练时学到的知识，**只读不改**。像你背过的字典。\n2. **短期记忆（Context）**：对话时的上下文，**用完即丢**。像考场上的草稿纸。\n\n**Context Window** 就是这张草稿纸的大小。为什么不能无限大？因为 Transformer 的注意力计算复杂度是 **$O(N^2)$**。上下文长度翻倍，计算量和显存消耗会变成 4 倍！" 
    },
    {
      type: 'quiz',
      question: "【概念辨析】关于“训练数据”和“Context”，以下说法正确的是？",
      options: ["我们在对话框里发给 AI 的内容，会实时更新它的训练数据，让它变聪明", "Context 是临时的，一刷新网页或开启新对话，之前的 Context 就消失了", "训练数据就是 Context，两者是一回事"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【计算直觉】如果把 Context Window 从 4k 提升到 8k，理论上 Attention 矩阵的计算量会增加多少倍？",
      options: ["2倍", "4倍 (平方级增长)", "8倍"],
      correct: 1
    },
    {
      type: 'fill',
      question: "【术语】当对话长度超过了模型限制，最早的信息会被强制丢弃，这种机制通常被称为 ___ (Sliding Window)。",
      parts: ["这种“旧的不去，新的不来”的机制叫", "___", "窗口。"],
      options: ["滑动 (Sliding)", "压缩 (Zipping)", "跳跃 (Hopping)"],
      correct: "滑动 (Sliding)"
    },

    // --- 模块二：遗忘的艺术 ---
    { 
      type: 'theory', 
      content: "📉 **第二章：迷失在中间 (Lost in the Middle)**\n\n即便窗口够大（比如 128k），AI 也不一定能全记住。研究发现，AI 对 **开头** 和 **结尾** 的信息记得最牢，但容易忽略 **中间** 的信息。\n\n此外，Input（输入）和 Output（输出）共享同一个窗口额度。如果你塞进去一本 90% 额度的小说，AI 就只剩下 10% 的额度来写读后感了。" 
    },
    {
      type: 'quiz',
      question: “【场景模拟】你给 AI 发了一篇 1 万字的论文（占满了窗口），要求它”详细扩写”这篇论文。结果 AI 写了一半就断了（Truncated）。原因是？”,
      options: [“AI 判断论文质量不够好，自动停止了扩写”, “Input 占用了太多 Context 空间，留给 Output 的额度不足以容纳完整的扩写内容”, “扩写任务太复杂，模型能力不够”],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【Debug】用户反馈：“我和 AI 聊了 1 小时，它突然忘了我最开始设定的名字。” 最合理的解释是？",
      options: ["模型内部状态出现了混乱，导致早期记忆被随机清除", "初始 Prompt 已经被挤出了滑动窗口的范围", "AI 对靠前位置的信息关注度低，'迷失在中间'效应导致了遗忘"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【策略】为了缓解“迷失在中间”现象，重要的指令（Instruction）最好放在 Prompt 的哪个位置？",
      options: ["最开头或最结尾", "正中间，为了平衡", "随机位置"],
      correct: 0
    },

    // --- 模块三：RAG (检索增强生成) ---
    {
      type: 'theory',
      content: "💾 **第三章：外挂大脑 (RAG)**\n\n既然脑容量（Context）贵且有限，我们就不必把所有书都背下来。\n**RAG (Retrieval-Augmented Generation)** 的原理是：\n1. **考试前**：允许带书进考场（建立向量数据库）。\n2. **考试时**：遇到问题，先翻书找到那几页（Retrieval）。\n3. **答题**：只把那几页的内容抄到草稿纸（Context）上给 AI 参考。"
    },
    {
      type: 'match',
      question: "【RAG 流程排序】RAG 的 4 个执行步骤，请把每个动作连到它在流程中的位置（顺序已打乱）",
      pairs: [
        { left: "第一步", right: "用户提出问题" },
        { left: "第二步", right: "在向量数据库中找出最相关的文档片段" },
        { left: "第三步", right: "把检索到的片段和用户问题一起拼入 Prompt" },
        { left: "第四步", right: "模型基于拼好的 Prompt 生成最终回答" }
      ]
    },
    {
      type: 'quiz',
      question: "【选型】什么情况下 **必须** 使用 RAG，而不是仅靠模型自带的知识？",
      options: ["询问 2008 年北京奥运会的时间", "询问今天的公司内部库存数据（私有且实时变化）", "翻译一段英文"],
      correct: 1
    },
    {
      type: 'fill',
      question: "【原理】RAG 技术本质上是用",
      // 👇 修复点：去掉了多余的 "___"，确保 parts 只有一个空位
      parts: ["RAG 是用", "___", "换取了更大的知识覆盖范围。"],
      options: ["搜索/检索", "训练", "微调"],
      correct: "搜索/检索"
    },

    // --- 模块四：实战判断 ---
    {
      type: 'quiz',
      question: "【陷阱】有了 100万 Token 的超大窗口模型（如 Gemini 1.5 Pro），RAG 就会彻底消亡吗？",
      options: ["会，RAG 没有任何存在的意义了", "不会，RAG 在成本、速度和私有权限控制上仍有优势", "不会，但只有处理超过 100 万 Token 的文档时 RAG 才有必要"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【计算】假设 1000 Token = $0.01。每次都把整本《红楼梦》（约 80 万汉字，按汉字≈1.5 Token 估算约 120 万 Token）丢给 AI 提问，和用 RAG 每次只检索 2000 Token 相比，成本差异大约是？",
      options: ["成本差不多", "前者成本是后者的约 600 倍", "RAG 更贵，因为要维护数据库"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【Debug】使用了 RAG 后，AI 回答：“根据提供的文档，我不知道答案。” 这说明？",
      options: ["检索阶段出了问题，导致返回了错误的文档片段", "这是正常的，说明检索到的文档里确实没有相关信息，AI 诚实地回答了", "AI 的生成能力下降了，应该换回不用 RAG 的方式"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【幻觉】相比于直接问模型，使用 RAG 通常能 ___ 幻觉（Hallucination）。",
      options: ["增加 (因为文档可能冲突)", "减少 (因为有事实依据作为参考)", "不影响"],
      correct: 1
    },

    // --- 模块五：总结 ---
    {
      type: 'match',
      isBoss: true,
      question: "🏆 **Day 5 概念连连看**",
      pairs: [
        { left: "Context Window", right: "昂贵的短期工作台 (RAM)" },
        { left: "Sliding Window", right: "处理超长对话的妥协机制" },
        { left: "RAG", right: "先搜索，再回答" },
        { left: "Vector Database", right: "RAG 的外挂图书馆" },
        { left: "In-Context Learning", right: "利用上下文现学现卖" }
      ]
    },
    {
      type: 'theory',
      content: “🎉 **Day 5 完成！**\n记住：Context 是金贵的内存，不要把无关的废话都塞进去。善用 RAG。\n明天，我们将学习如何控制 AI 的”性格”：**Temperature**。”
    }
  ]
};