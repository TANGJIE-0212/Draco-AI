import { DayContent } from '../../types';

export const w7d4Data: DayContent = {
  day: 4,
  title: "AI 集成：连接数据与模型",
  shards: 1,
  steps: [
    { type: 'theory', content: "🔗 **今日主题：让你的产品真正「拥有」AI**\n\n昨天做了基本的 demo，今天深入学习如何把 AI 能力「深度集成」到产品中——数据层、AI 调用层、结果处理层的完整连接。" },
    { type: 'video', url: "", content: "视频：AI 集成实战 —— 从 demo 到真正的产品" },
    { type: 'theory', content: "📊 **第一章：数据层设计**\n\n一个 AI 产品需要存储什么数据？\n\n| 数据类型 | 存储方式 |\n|----------|----------|\n| **用户数据** | 关系型数据库（PostgreSQL）|\n| **对话历史** | NoSQL 或关系型 |\n| **知识库** | 向量数据库（Chroma/Pinecone）|\n| **配置** | 环境变量/.env 文件 |\n| **缓存** | Redis / 内存缓存 |\n| **日志** | 日志服务（文件/云服务）|" },
    { type: 'theory', content: "🔌 **第二章：AI 调用层的最佳实践**\n\n```python\n# 不好的做法：直接硬编码\nresponse = openai.chat(model=\"gpt-4o\", ...)\n\n# 好的做法：抽象 AI 调用层\nclass AIService:\n    def chat(self, prompt, model=None):\n        model = model or self.default_model\n        # 重试逻辑、错误处理、日志记录\n        # 支持切换不同的 AI 提供商\n```\n\n好处：想换模型（如从 GPT-4o 换到 Claude）只改一处！" },
    { type: 'theory', content: "📝 **第三章：Prompt 管理**\n\n| 方法 | 说明 |\n|------|------|\n| **硬编码** | 写在代码里（❌ 不推荐）|\n| **配置文件** | 存在 YAML/JSON 中 |\n| **Prompt 管理平台** | 如 LangSmith、PromptLayer |\n| **版本控制** | 用 Git 管理 Prompt 变更 |\n\n**关键**：Prompt 是 AI 产品的核心资产，应该像代码一样管理。" },
    { type: 'theory', content: "🔄 **第四章：对话历史管理**\n\n多轮对话需要管理「对话历史」：\n\n| 策略 | 说明 |\n|------|------|\n| **完整历史** | 所有对话都发给 AI（上下文最好，但 Token 成本高）|\n| **滑动窗口** | 只保留最近 N 轮对话 |\n| **摘要压缩** | 用 AI 把旧对话压缩成摘要 |\n| **关键信息提取** | 只保留关键事实 |" },
    { type: 'theory', content: "🔧 **实战时间！**\n\n**🎯 实战任务：在 demo 中集成以下功能**\n\n1. 对话历史管理（保存并展示历史消息）\n2. Prompt 配置化（把 System Prompt 放到配置文件中）\n3. 错误处理（API 调用失败时的友好提示）\n4. 简单的成本统计（记录每次 Token 用量）" },
    { type: 'quiz', question: "1. 【数据】AI 产品中，知识库文档应该存在哪里？", options: ["关系型数据库", "向量数据库——需要用语义相似度检索", "文件系统"], correct: 1 },
    { type: 'match', question: "2. 【连线】数据类型与存储", pairs: [{ left: "用户账号信息", right: "关系型数据库（PostgreSQL）" }, { left: "RAG 知识库", right: "向量数据库（Chroma）" }, { left: "热门问题缓存", right: "Redis 内存缓存" }, { left: "API Key 配置", right: ".env 环境变量文件" }] },
    { type: 'fill', question: "3. 【缓存】常用的内存缓存数据库叫 ___。", parts: ["常用的缓存数据库叫", "___", "。"], options: ["Redis", "MongoDB", "MySQL"], correct: "Redis" },
    { type: 'quiz', question: "4. 【架构】为什么要把 AI 调用封装成独立的「AI 服务层」？", options: ["多此一举", "方便切换模型/提供商，统一管理重试、日志、成本控制——解耦业务和 AI", "为了代码更多"], correct: 1 },
    { type: 'quiz', question: "5. 【可靠性】AI API 调用应该包含什么错误处理？", options: ["不需要", "超时重试 + 限流退避 + 失败兜底（如返回预设回复）+ 错误日志", "直接崩溃"], correct: 1 },
    { type: 'quiz', question: "6. 【管理】为什么 Prompt 不应该硬编码在代码里？", options: ["技术上不行", "改 Prompt 就要改代码和重新部署——应该放在配置文件中，可以独立修改和版本管理", "没有关系"], correct: 1 },
    { type: 'practice', task: "【直接写 Prompt】围绕「AIService 类设计」，写一个可以直接复制给大模型使用的 AI 集成层 Prompt。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。", rubric: "是否能直接复制使用；是否围绕 AI 集成层 和「AIService 类设计」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「Prompt 硬编码或模型不可切换」风险；语言是否清晰不绕。", placeholder: "你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...", minLength: 80 },
    { type: 'practice', task: "【结构化表达】为「AIService 类设计」写一份可直接复制使用的任务说明。必须面向「后端工程师」，并明确输入、处理步骤、输出格式和禁止事项。", rubric: "结构是否清晰；输入/步骤/输出是否完整；是否符合 后端工程师 的理解水平；禁止事项是否能降低「Prompt 硬编码或模型不可切换」风险。", placeholder: "## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...", minLength: 80 },
    { type: 'practice', task: "【边界处理】列出「AIService 类设计」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。", rubric: "是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「Prompt 硬编码或模型不可切换」这个核心风险。", placeholder: "失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...", minLength: 80 },
    { type: 'practice', task: "【输出格式设计】为「服务层设计说明」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。", rubric: "模板是否能支撑 多模型、重试、Token 成本、流式、模板配置；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。", placeholder: "## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...", minLength: 80 },
    { type: 'practice', task: "【质量评审】假设另一个同学提交了「服务层设计说明」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。", rubric: "是否有 5 个以上评分维度；维度是否贴合 AI 集成层；是否区分满分表现和扣分点；是否能指导同学改进。", placeholder: "1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...", minLength: 80 },
    { type: 'practice', task: "【示例驱动】为「AIService 类设计」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。", rubric: "是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 AI 集成层。", placeholder: "示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...", minLength: 80 },
    { type: 'practice', task: "【约束优化】把「服务层设计说明」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。", rubric: "是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「Prompt 硬编码或模型不可切换」。", placeholder: "精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...", minLength: 80 },
    { type: 'practice', task: "【真实迁移】把今天的「AI 集成层」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。", rubric: "场景是否真实具体；是否能体现 AI 集成层；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。", placeholder: "我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...", minLength: 80 },
    { type: 'practice', task: "【综合大题】完整产出一份「服务层设计说明」，用于「AIService 类设计」。必须包含：1）背景和目标；2）面向对象：后端工程师；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「Prompt 硬编码或模型不可切换」的风险预案。要求写到可以直接拿去给 AI 或团队使用。", rubric: "是否完整覆盖 6 个要求；是否紧扣 AI 集成层 和 AIService 类设计；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「Prompt 硬编码或模型不可切换」；是否避免空话和泛泛而谈。", placeholder: "## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...", minLength: 220 },
    { type: 'theory', content: "🎉 **Day 4 完成！**\n\n你的产品现在有了完整的 AI 集成。\n\n**Day 5 预告**：产品做出来了，用户体验好不好？明天学习 **UX 优化与测试**。" }
  ]
};
