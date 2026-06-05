import { DayContent } from '../../types';

export const w6d3Data: DayContent = {
  day: 3,
  title: "AI Agent：让 AI 自主行动",
  shards: 1,
  steps: [
    { type: 'theory', content: "🤖 **今日主题：从「对话」到「行动」**\n\n普通 AI = 你问它答\nAI Agent = 你给它目标，它自己想办法完成\n\nAgent 是 AI 领域最热门的方向之一——让 AI 从「会说话」变成「会做事」。" },
    { type: 'video', url: "", content: "视频：AI Agent 是什么？—— 从 ChatGPT 到自主执行" },
    { type: 'theory', content: "🧠 **第一章：Agent 的核心组件**\n\n一个 AI Agent = LLM + 工具 + 记忆 + 规划\n\n| 组件 | 作用 |\n|------|------|\n| **LLM（大脑）** | 理解任务、推理决策 |\n| **工具 (Tools)** | 搜索、计算、调用 API、操作文件 |\n| **记忆 (Memory)** | 记住之前的操作和结果 |\n| **规划 (Planning)** | 拆分任务、制定执行计划 |" },
    { type: 'theory', content: "🔧 **第二章：Function Calling（函数调用）**\n\nFunction Calling 是 Agent 使用工具的基础：\n\n```\n用户：「北京明天天气怎样？」\n\nAI 的思考：\n1. 我不知道实时天气\n2. 但我有一个 get_weather 工具\n3. 调用 get_weather(city=\"北京\", date=\"明天\")\n4. 工具返回：晴，25°C\n5. 回答用户：「北京明天晴天，25°C」\n```\n\nAI 自己决定什么时候用什么工具！" },
    { type: 'theory', content: "🔁 **第三章：ReAct 框架**\n\nAgent 最经典的运行模式是 **ReAct**（Reasoning + Acting）：\n\n```\n循环执行：\n1. Thought（思考）：我需要做什么？\n2. Action（行动）：使用什么工具？\n3. Observation（观察）：工具返回了什么？\n4. 回到 1，直到任务完成\n```\n\n这让 AI 像人一样：想→做→看结果→再想→再做。" },
    { type: 'theory', content: "🛠️ **第四章：常见的 Agent 工具**\n\n| 工具类型 | 例子 |\n|----------|------|\n| **搜索** | Google Search、Wikipedia |\n| **计算** | Calculator、Python 执行 |\n| **文件** | 读/写文件、CSV 处理 |\n| **API** | 天气、邮件、日历、数据库 |\n| **浏览器** | 打开网页、提取内容 |\n| **代码执行** | 运行 Python/JavaScript |" },
    { type: 'theory', content: "🔧 **实战时间！**\n\n**🎯 实战任务：设计一个简单的 Agent**\n\n场景：一个「旅行规划 Agent」\n- 工具：搜索引擎、天气 API、机票 API、酒店 API\n- 任务：用户说「帮我规划下周去东京的三天旅行」\n- Agent 应该自动：查天气→搜景点→查机票→查酒店→生成行程" },
    { type: 'quiz', question: "1. 【定义】AI Agent 和普通 ChatGPT 的最大区别是？", options: ["模型更大", "Agent 不只是聊天——它能使用工具自主执行任务，而不仅仅是生成文字", "界面不同"], correct: 1 },
    { type: 'match', question: "2. 【连线】Agent 核心组件", pairs: [{ left: "LLM（大脑）", right: "理解任务、推理决策" }, { left: "Tools（工具）", right: "搜索、计算、API 调用" }, { left: "Memory（记忆）", right: "记住之前的操作" }, { left: "Planning（规划）", right: "拆分任务、制定计划" }] },
    { type: 'fill', question: "3. 【公式】AI Agent = LLM + ___ + Memory + Planning。", parts: ["Agent = LLM +", "___", "+ Memory + Planning。"], options: ["Tools（工具）", "Data", "UI"], correct: "Tools（工具）" },
    { type: 'quiz', question: "4. 【概念】Function Calling 的作用是？", options: ["让 AI 打电话", "让 AI 能够自主判断何时需要调用外部工具（API/函数）来获取信息或执行操作", "让 AI 写函数"], correct: 1 },
    { type: 'quiz', question: "5. 【流程】用户问「帮我订明天下午 3 点的会议室」，Agent 的执行流程是？", options: ["直接回答「已预订」", "理解意图→调用日历工具查空闲→调用预订工具→确认结果→回复用户", "说「我做不到」"], correct: 1 },
    { type: 'quiz', question: "6. 【框架】ReAct 的三个步骤是什么？", options: ["Read-Edit-Apply", "Thought（思考）→ Action（行动）→ Observation（观察），循环执行", "Request-Execute-Analyze"], correct: 1 },
    { type: 'practice', task: "【直接写 Prompt】围绕「自动订机票 Agent」，写一个可以直接复制给大模型使用的 AI Agent Prompt。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。", rubric: "是否能直接复制使用；是否围绕 AI Agent 和「自动订机票 Agent」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「未经确认直接支付下单」风险；语言是否清晰不绕。", placeholder: "你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...", minLength: 80 },
    { type: 'practice', task: "【结构化表达】为「自动订机票 Agent」写一份可直接复制使用的任务说明。必须面向「差旅用户」，并明确输入、处理步骤、输出格式和禁止事项。", rubric: "结构是否清晰；输入/步骤/输出是否完整；是否符合 差旅用户 的理解水平；禁止事项是否能降低「未经确认直接支付下单」风险。", placeholder: "## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...", minLength: 80 },
    { type: 'practice', task: "【边界处理】列出「自动订机票 Agent」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。", rubric: "是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「未经确认直接支付下单」这个核心风险。", placeholder: "失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...", minLength: 80 },
    { type: 'practice', task: "【输出格式设计】为「工具设计和 ReAct 示例」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。", rubric: "模板是否能支撑 Tools、3 轮 ReAct、人工确认点；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。", placeholder: "## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...", minLength: 80 },
    { type: 'practice', task: "【质量评审】假设另一个同学提交了「工具设计和 ReAct 示例」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。", rubric: "是否有 5 个以上评分维度；维度是否贴合 AI Agent；是否区分满分表现和扣分点；是否能指导同学改进。", placeholder: "1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...", minLength: 80 },
    { type: 'practice', task: "【示例驱动】为「自动订机票 Agent」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。", rubric: "是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 AI Agent。", placeholder: "示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...", minLength: 80 },
    { type: 'practice', task: "【约束优化】把「工具设计和 ReAct 示例」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。", rubric: "是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「未经确认直接支付下单」。", placeholder: "精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...", minLength: 80 },
    { type: 'practice', task: "【真实迁移】把今天的「AI Agent」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。", rubric: "场景是否真实具体；是否能体现 AI Agent；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。", placeholder: "我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...", minLength: 80 },
    { type: 'practice', task: "【综合大题】完整产出一份「工具设计和 ReAct 示例」，用于「自动订机票 Agent」。必须包含：1）背景和目标；2）面向对象：差旅用户；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「未经确认直接支付下单」的风险预案。要求写到可以直接拿去给 AI 或团队使用。", rubric: "是否完整覆盖 6 个要求；是否紧扣 AI Agent 和 自动订机票 Agent；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「未经确认直接支付下单」；是否避免空话和泛泛而谈。", placeholder: "## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...", minLength: 220 },
    { type: 'theory', content: "🎉 **Day 3 完成！**\n\n你已经了解了 AI Agent 的核心概念和运行原理。\n\n**Day 4 预告**：学习如何搭建**多步骤工作流**——把多个 AI 调用编排成复杂的自动化流水线。" }
  ]
};
