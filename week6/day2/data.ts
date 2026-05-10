import { DayContent } from '../../types';

export const w6d2Data: DayContent = {
  day: 2,
  title: "API 调用入门：让程序对话 AI",
  shards: 1,
  steps: [
    { type: 'theory', content: "🔌 **今日主题：用代码调用 AI**\n\n昨天学了自动化思维，今天学习实际操作——通过 API 让你的程序和 AI 对话。\n\n不需要成为程序员，理解基本概念就够了。" },
    { type: 'video', url: "", content: "视频：3 分钟理解 API 调用 —— 像点外卖一样简单" },
    { type: 'theory', content: "🍔 **第一章：API 就像点外卖**\n\n```\n点外卖的流程：\n你 → 打开外卖 App → 选择菜品 → 下单 → 等待 → 收到食物\n\nAPI 调用的流程：\n你的程序 → 连接 AI API → 发送 Prompt → 等待 → 收到回复\n```\n\n| 外卖 | API |\n|------|-----|\n| 外卖 App | API 地址 (Endpoint) |\n| 会员卡 | API Key (密钥) |\n| 点菜 | 发送请求 (Request) |\n| 收到食物 | 收到响应 (Response) |" },
    { type: 'theory', content: "🔑 **第二章：API Key 安全**\n\n**⚠️ API Key 是你的「钱包密码」——绝对不能泄露！**\n\n| 安全规则 | 说明 |\n|----------|------|\n| ❌ 不要硬编码 | 不要写在代码里 |\n| ❌ 不要上传到 GitHub | 会被全网扫描盗用 |\n| ✅ 用环境变量 | 存在 .env 文件中 |\n| ✅ 设置用量限制 | 在 API 平台设置月度上限 |\n| ✅ 定期轮换 | 定期更换 Key |" },
    { type: 'theory', content: "💰 **第三章：API 计费方式**\n\n| 计费方式 | 说明 |\n|----------|------|\n| **按 Token 计费** | OpenAI——输入 \\$X / 1M tokens，输出 \\$Y / 1M tokens |\n| **按请求计费** | 某些 API 按调用次数收费 |\n| **订阅制** | 固定月费，不限量（如 ChatGPT Plus）|\n| **免费额度** | 大多数 API 有免费试用额度 |\n\n**关键**：输出 Token 通常比输入 Token 贵 2-4 倍！" },
    { type: 'theory', content: "🏗️ **第四章：API 调用的关键参数**\n\n```json\n{\n  \"model\": \"gpt-4o\",          // 选择模型\n  \"messages\": [...],           // 对话内容\n  \"temperature\": 0.7,          // 创造性（0-2）\n  \"max_tokens\": 1000,          // 最大输出长度\n  \"stream\": true               // 流式输出（打字机效果）\n}\n```" },
    { type: 'theory', content: "🔧 **实战时间！**\n\n**🎯 实战任务：理解 API 调用过程**\n\n一个典型的 API 调用过程：\n```\n1. 获取 API Key（在 platform.openai.com 创建）\n2. 安装 SDK（pip install openai）\n3. 编写代码调用 API\n4. 处理返回结果\n5. 错误处理（网络超时、额度用完等）\n```" },
    { type: 'quiz', question: "1. 【类比】API Key 相当于外卖场景中的什么？", options: ["菜品", "会员卡/身份验证——证明你有权限使用这个服务", "外卖员"], correct: 1 },
    { type: 'match', question: "2. 【连线】API 概念对应关系", pairs: [{ left: "Endpoint（端点）", right: "API 的网络地址" }, { left: "API Key", right: "身份验证密钥" }, { left: "Request（请求）", right: "发送给 AI 的数据" }, { left: "Response（响应）", right: "AI 返回的结果" }] },
    { type: 'quiz', question: "3. 【安全】API Key 不小心上传到 GitHub 会怎样？", options: ["没事", "会被恶意脚本扫描到并盗用——可能产生巨额费用", "GitHub 会帮你保管"], correct: 1 },
    { type: 'fill', question: "4. 【安全】API Key 应该存储在 ___ 文件中，而不是直接写在代码里。", parts: ["API Key 应该存在", "___", "文件中。"], options: [".env（环境变量文件）", "readme.md", "index.html"], correct: ".env（环境变量文件）" },
    { type: 'quiz', question: "5. 【成本】为什么输出 Token 比输入 Token 贵？", options: ["收费规则不合理", "生成每个输出 Token 需要更多计算资源（逐个预测下一个词）", "没有原因"], correct: 1 },
    { type: 'quiz', question: "6. 【省钱】怎么控制 API 成本？", options: ["不用 API", "选择合适的模型（简单任务用便宜的小模型）+ 设置月度预算上限 + 缓存重复请求", "不需要控制"], correct: 1 },
    { type: 'practice', task: "【直接写 Prompt】围绕「公开 Web 产品集成 OpenAI API Key」，写一个可以直接复制给大模型使用的 API 调用与安全 Prompt。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。", rubric: "是否能直接复制使用；是否围绕 API 调用与安全 和「公开 Web 产品集成 OpenAI API Key」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「前端泄露 Key 或账单暴增」风险；语言是否清晰不绕。", placeholder: "你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...", minLength: 80 },
    { type: 'practice', task: "【结构化表达】为「公开 Web 产品集成 OpenAI API Key」写一份可直接复制使用的任务说明。必须面向「Web 开发者」，并明确输入、处理步骤、输出格式和禁止事项。", rubric: "结构是否清晰；输入/步骤/输出是否完整；是否符合 Web 开发者 的理解水平；禁止事项是否能降低「前端泄露 Key 或账单暴增」风险。", placeholder: "## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...", minLength: 80 },
    { type: 'practice', task: "【边界处理】列出「公开 Web 产品集成 OpenAI API Key」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。", rubric: "是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「前端泄露 Key 或账单暴增」这个核心风险。", placeholder: "失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...", minLength: 80 },
    { type: 'practice', task: "【输出格式设计】为「API 安全清单」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。", rubric: "模板是否能支撑 至少 5 条安全措施和后果；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。", placeholder: "## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...", minLength: 80 },
    { type: 'practice', task: "【质量评审】假设另一个同学提交了「API 安全清单」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。", rubric: "是否有 5 个以上评分维度；维度是否贴合 API 调用与安全；是否区分满分表现和扣分点；是否能指导同学改进。", placeholder: "1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...", minLength: 80 },
    { type: 'practice', task: "【示例驱动】为「公开 Web 产品集成 OpenAI API Key」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。", rubric: "是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 API 调用与安全。", placeholder: "示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...", minLength: 80 },
    { type: 'practice', task: "【约束优化】把「API 安全清单」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。", rubric: "是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「前端泄露 Key 或账单暴增」。", placeholder: "精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...", minLength: 80 },
    { type: 'practice', task: "【真实迁移】把今天的「API 调用与安全」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。", rubric: "场景是否真实具体；是否能体现 API 调用与安全；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。", placeholder: "我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...", minLength: 80 },
    { type: 'practice', task: "【综合大题】完整产出一份「API 安全清单」，用于「公开 Web 产品集成 OpenAI API Key」。必须包含：1）背景和目标；2）面向对象：Web 开发者；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「前端泄露 Key 或账单暴增」的风险预案。要求写到可以直接拿去给 AI 或团队使用。", rubric: "是否完整覆盖 6 个要求；是否紧扣 API 调用与安全 和 公开 Web 产品集成 OpenAI API Key；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「前端泄露 Key 或账单暴增」；是否避免空话和泛泛而谈。", placeholder: "## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...", minLength: 220 },
    { type: 'theory', content: "🎉 **Day 2 完成！**\n\n你已经理解了 API 调用的基本概念和安全注意事项。\n\n**Day 3 预告**：让 AI 不只是聊天——学习 **AI Agent（智能体）**，让 AI 拥有使用工具和自主决策的能力。" }
  ]
};
