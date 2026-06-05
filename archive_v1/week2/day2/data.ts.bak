import { DayContent } from '../../types';

export const w2d2Data: DayContent = {
  day: 2,
  title: "CRISPE 与结构化 Prompt",
  shards: 1,
  steps: [
    { type: 'theory', content: "📝 **今日主题：把模糊指令变成精密蓝图**\n\n昨天你学会了用 System Prompt 给 AI 设定角色。但仅有角色还不够——你需要给它**清晰的任务蓝图**。\n\n一句「帮我写篇文章」和一份结构化的需求文档，产出的质量天差地别。今天我们学习如何用**框架**和**Markdown 格式**让 Prompt 精准无歧义。" },
    { type: 'video', url: "", content: "视频：CRISPE 框架 —— 5 步写出专业级 Prompt" },
    { type: 'theory', content: "🏗️ **第一章：CRISPE 框架**\n\nCRISPE 是一个经典的 Prompt 结构框架：\n\n| 字母 | 含义 | 示例 |\n|------|------|------|\n| **C** | Capacity 角色 | 你是一位 SEO 专家 |\n| **R** | Request 请求 | 为我的博客写一篇 SEO 友好的文章 |\n| **I** | Input 输入 | 主题是「2025 AI 趋势」 |\n| **S** | Steps 步骤 | 先列大纲，再逐段展开 |\n| **P** | Personality 风格 | 语言轻松幽默，适合科技爱好者 |\n| **E** | Experiment 迭代 | 给我 3 个标题选项 |" },
    { type: 'theory', content: "📐 **第二章：Markdown 格式化 Prompt**\n\n大模型对 Markdown 格式有天然的理解能力。用 Markdown 写 Prompt 可以让指令**层次分明**：\n\n```markdown\n# 任务\n分析这份销售报告\n\n## 输出要求\n1. 用表格列出 Top 5 产品\n2. 每个产品附带增长率\n3. 最后给出一段 100 字的总结\n\n## 约束\n- 不编造数据\n- 只使用我提供的报告内容\n```\n\n标题层级（#, ##, ###）、列表（1. 2. 3.）、加粗（**关键词**）都能帮助 AI 理解你的意图层次。" },
    { type: 'theory', content: "🎯 **第三章：约束条件的艺术**\n\n好的 Prompt 不仅要说「做什么」，更要说「不做什么」和「做到什么程度」：\n\n| 约束类型 | 示例 |\n|------|------|\n| 长度约束 | 不超过 200 字 / 用 3 个要点 |\n| 格式约束 | 用 JSON 输出 / 用表格 |\n| 内容约束 | 只基于提供的材料 / 不编造 |\n| 语气约束 | 正式 / 口语化 / 幽默 |\n| 否定约束 | 不要包含代码 / 不要用英文 |" },
    { type: 'theory', content: "🔄 **第四章：迭代优化 Prompt**\n\n没有人能一次写出完美的 Prompt。专业的做法是**迭代**：\n\n1. **V1**：写出初版 Prompt，观察输出\n2. **诊断**：输出哪里不满意？太长？太泛？格式不对？\n3. **V2**：针对问题加入约束或修改指令\n4. **对比**：V1 和 V2 的输出对比\n5. **V3**：继续微调直到满意\n\n每次只改一个变量，这样才知道是哪个改动起了作用。" },
    { type: 'theory', content: "⚠️ **第五章：常见 Prompt 坑**\n\n| 坑 | 示例 | 修复 |\n|------|------|------|\n| 🕳️ 指令模糊 | 「分析一下」 | 「从盈利能力、增长趋势、风险三个维度分析」 |\n| 🕳️ 矛盾指令 | 「简洁回答」+「详细解释每个步骤」 | 二选一，不要自相矛盾 |\n| 🕳️ 缺少格式 | 「给我结果」 | 「以编号列表的形式给出 Top 5」 |\n| 🕳️ 过度约束 | 10 条规则把 AI 逼到无法输出 | 精简到最关键的 3-5 条 |" },
    { type: 'quiz', question: "1. 【框架】CRISPE 中的 'I' 代表什么？", options: ["Intelligence 智能", "Input 输入材料", "Iteration 迭代"], correct: 1 },
    { type: 'quiz', question: "2. 【对比】以下两个 Prompt 哪个效果更好？\nA：「写一篇关于咖啡的文章」\nB：「你是一位咖啡评鉴师（C），请写一篇 800 字的咖啡入门指南（R），覆盖豆种、烘焙、冲泡三个方面（I），先列大纲再展开（S），语气专业但亲切（P）」", options: ["A 更好，简洁明了", "B 更好，结构化的指令让 AI 有明确的行动蓝图", "效果差不多"], correct: 1 },
    { type: 'fill', question: "3. 【术语】CRISPE 中的 'S' 代表 ___，即指定 AI 完成任务的步骤顺序。", parts: ["'S' 代表", "___", "，用来规定 AI 的执行步骤。"], options: ["Steps 步骤", "Speed 速度", "Style 风格"], correct: "Steps 步骤" },
    { type: 'quiz', question: "4. 【格式】为什么用 Markdown 写 Prompt 比纯文本效果更好？", options: ["因为 Markdown 更漂亮", "因为层级分明的格式帮助 AI 区分任务结构：标题=主任务，列表=子步骤，加粗=重点", "因为 AI 只能读 Markdown"], correct: 1 },
    { type: 'quiz', question: "5. 【技巧】在 Prompt 中使用分隔符（如 --- 或 ===）的主要目的是？", options: ["让 Prompt 更好看", "明确区分「指令部分」和「输入数据部分」，防止 AI 混淆", "增加 Token 数量"], correct: 1 },
    { type: 'quiz', question: "6. 【约束】你想让 AI 写一封商务邮件，以下哪个约束最有效？", options: ["写好一点", "用正式语气，不超过 150 字，包含：问候→正文→行动号召→署名 四个部分", "快点写"], correct: 1 },
    { type: 'practice', task: "【补全 CRISPE 中的两段】下面是 CRISPE 框架的 5 段：\n- Capacity（角色能力）\n- Insight（背景洞察）\n- Statement（任务陈述）\n- Personality（语气风格）\n- Experiment（要几个版本）\n\n场景：让 AI 帮你写一封请假邮件。已经给出 Statement = “请假 3 天，因家事”。请你用自己的话补全 Capacity 和 Insight 两段。", rubric: "是否能体现“能力”和“背景”两个维度；是否符合“请假邮件”这个真实场景；是否避免和 Statement 重复；语言是否简洁。", placeholder: "Capacity：你是...\nInsight：...", minLength: 50, referenceAnswer: "Capacity：你是一位帮职场新人写正式邮件的助手，熟悉中文公司沟通的礼貌用语和格式。\nInsight：邮件收件人是我的直属主管，公司风格偏正式但不死板。我希望保留主动负责的态度，避免显得逃避工作。" },
    { type: 'practice', task: "【找出缺失的 CRISPE 部分】下面这段 Prompt 缺了什么 CRISPE 要素？请指出至少 1 个，并补一句话补上。\n\n「你是营销助手。请帮我写一段关于新款蓝牙耳机的小红书种草文案，要 3 个版本。」", rubric: "是否能识别出缺失的部分（至少缺 Insight 背景，例如目标人群和卖点；可能也缺 Personality）；补的内容是否具体可用；是否真的让 Prompt 变得更稳。", placeholder: "缺失：...\n补一句：...", minLength: 40, referenceAnswer: "缺失：缺 Insight（没有目标人群和产品卖点），也缺 Personality（没有说语气）。\n补一句：目标人群是 25-35 岁通勤上班族，卖点是降噪和续航 30 小时；语气要轻松活泼，多用第一人称分享体验，避免硬广。" },
    { type: 'practice', task: "【写一个 CRISPE Prompt】请你给一个真实需求写一份 CRISPE 结构 Prompt，让 AI 帮你做一件事（例如写朋友圈、写产品介绍、写一段会议纪要）。五段都要写，每段 1-2 句即可。", rubric: "是否五段齐全；是否针对真实需求而不是模板套话；是否能让 AI 理解角色、背景、任务、语气和版本数；是否避免冗长。", placeholder: "Capacity：...\nRole：...\nInsight：...\nStatement：...\nPersonality：...\nExperiment：...", minLength: 80, referenceAnswer: "Capacity：你是一位擅长写产品介绍的中文文案。\nRole：扮演一位为创业团队写官网首页文案的专业撰稿人。\nInsight：产品是一款帮独立开发者管理订阅收入的工具，目标用户是 1-3 人小团队，注重数据隐私和简洁。\nStatement：请写一段 80 字以内的官网首屏标语和一段 150 字的产品介绍。\nPersonality：语气清楚、直接、稍带温度，避免夸张承诺。\nExperiment：请给出 3 个版本，分别偏向“高效”“安心”“极简”三种调性。" },
    { type: 'practice', task: "【综合大题】用 CRISPE 框架，完整写一份用于「国货电动牙刷在小红书种草」的结构化 Prompt。要求 5 段都要写清楚，并且额外说明你希望 AI 输出几个版本、每个版本的差异。", rubric: "是否覆盖 CRISPE 5 段；是否针对小红书和国货牙刷这一具体场景；是否说明输出版本数量和差异化方向；是否能直接复制使用；是否避免空话。", placeholder: "Capacity：...\nRole：...\nInsight：...\nStatement：...\nPersonality：...\nExperiment：...", minLength: 200, referenceAnswer: "Capacity：你是一位熟悉小红书生态的种草文案撰稿人，擅长把日用品写成有温度的体验分享。\nRole：扮演一位用了一个月该款国货电动牙刷的真实用户。\nInsight：目标人群是 22-32 岁注重性价比的女性用户，关心刷牙是否干净、震动是否柔和、续航和换头成本。竞品是飞利浦和欧乐 B。要避免硬广和虚假承诺。\nStatement：请写一篇 200-300 字的小红书种草文案，包含痛点、转折、亲身体验、3 个具体卖点、价格亮点和一句行动号召。\nPersonality：第一人称、口语化、轻松带表情符号，但不卖惨、不夸张。\nExperiment：请给出 3 个版本：\n- 版本 A：偏“理性测评”，突出参数和对比；\n- 版本 B：偏“生活分享”，从早起场景切入；\n- 版本 C：偏“情绪共鸣”，从“懒人也能坚持刷牙”切入。" },
    { type: 'theory', content: "🎉 **Day 2 完成！**\n\n你已经学会了用框架和格式来写专业级 Prompt。\n\n**Day 3 预告**：如果你只给 AI 一个指令，它可能不知道怎么做。但如果你给它**几个例子**呢？明天学习 **Few-Shot Learning —— 给 AI 抄作业的力量**。" }
  ]
};
