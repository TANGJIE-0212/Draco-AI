import { DayContent } from '../../types';

export const w4d7Data: DayContent = {
  day: 7,
  title: "Boss Battle：感官全开大考",
  shards: 2,
  isBoss: true,
  steps: [
    { type: 'theory', content: "🐉 **Week 4 Boss Battle：感官全开！**\n\n这一周你学习了 AI 的「五感」——看图、画图、语音、视频、多模态融合。\n\n准备好迎接多模态知识的终极挑战了吗？" },
    { type: 'video', url: "", content: "视频：多模态 AI 的完整版图回顾" },
    { type: 'boss', question: "1. 【图像理解】GPT-4V 这样的多模态模型能做什么？", isBoss: true, options: ["只能生成图片", "能同时理解图片和文字，如看图回答问题、分析图表、识别文字", "只能处理文字"], correct: 1 },
    { type: 'boss', question: "2. 【图像生成】好的图像生成 Prompt 应包含哪五个要素？", isBoss: true, options: ["分辨率、格式、大小、编码、压缩", "主体、环境、风格、光影、视角", "标题、正文、页码、日期、作者"], correct: 1 },
    { type: 'boss', question: "3. 【Negative Prompt】Negative Prompt 的作用是？", isBoss: true, options: ["增加元素", "告诉 AI 不要出现什么（如 'no text, no watermark, no blur'）", "降低速度"], correct: 1 },
    { type: 'boss', question: "4. 【ControlNet】想让 AI 按照你画的火柴人姿势生成一张精美的人物图，应该用？", isBoss: true, options: ["DALL·E", "ControlNet Pose 模式", "Photoshop"], correct: 1 },
    { type: 'fill', question: "5. 【角色一致性】保持 AI 生成角色外观一致的技术叫 ___-Adapter。", parts: ["这个技术叫", "___", "-Adapter。"], options: ["IP", "Control", "Style"], correct: "IP" },
    { type: 'boss', question: "6. 【Inpainting】只想修改图片某个区域（如换衣服颜色），应该用什么技术？", isBoss: true, options: ["重新生成整张图", "Inpainting（局部重绘）", "裁剪"], correct: 1 },
    { type: 'practice', task: "【直接写 Prompt】围绕「AI 旅行 vlog 生成器」，写一个可以直接复制给大模型使用的 多模态综合 Prompt。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。", rubric: "是否能直接复制使用；是否围绕 多模态综合 和「AI 旅行 vlog 生成器」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「视觉风格不一致或失败无兜底」风险；语言是否清晰不绕。", placeholder: "你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...", minLength: 80 },
    { type: 'practice', task: "【结构化表达】为「AI 旅行 vlog 生成器」写一份可直接复制使用的任务说明。必须面向「旅行内容创作者」，并明确输入、处理步骤、输出格式和禁止事项。", rubric: "结构是否清晰；输入/步骤/输出是否完整；是否符合 旅行内容创作者 的理解水平；禁止事项是否能降低「视觉风格不一致或失败无兜底」风险。", placeholder: "## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...", minLength: 80 },
    { type: 'practice', task: "【边界处理】列出「AI 旅行 vlog 生成器」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。", rubric: "是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「视觉风格不一致或失败无兜底」这个核心风险。", placeholder: "失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...", minLength: 80 },
    { type: 'practice', task: "【输出格式设计】为「30 秒旅行 vlog 管道」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。", rubric: "模板是否能支撑 脚本、分镜、图片、视频、配音、字幕、配乐模板；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。", placeholder: "## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...", minLength: 80 },
    { type: 'practice', task: "【质量评审】假设另一个同学提交了「30 秒旅行 vlog 管道」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。", rubric: "是否有 5 个以上评分维度；维度是否贴合 多模态综合；是否区分满分表现和扣分点；是否能指导同学改进。", placeholder: "1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...", minLength: 80 },
    { type: 'practice', task: "【示例驱动】为「AI 旅行 vlog 生成器」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。", rubric: "是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 多模态综合。", placeholder: "示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...", minLength: 80 },
    { type: 'practice', task: "【约束优化】把「30 秒旅行 vlog 管道」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。", rubric: "是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「视觉风格不一致或失败无兜底」。", placeholder: "精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...", minLength: 80 },
    { type: 'practice', task: "【真实迁移】把今天的「多模态综合」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。", rubric: "场景是否真实具体；是否能体现 多模态综合；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。", placeholder: "我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...", minLength: 80 },
    { type: 'practice', task: "【综合大题】完整产出一份「30 秒旅行 vlog 管道」，用于「AI 旅行 vlog 生成器」。必须包含：1）背景和目标；2）面向对象：旅行内容创作者；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「视觉风格不一致或失败无兜底」的风险预案。要求写到可以直接拿去给 AI 或团队使用。", rubric: "是否完整覆盖 6 个要求；是否紧扣 多模态综合 和 AI 旅行 vlog 生成器；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「视觉风格不一致或失败无兜底」；是否避免空话和泛泛而谈。", placeholder: "## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...", minLength: 220 },
    { type: 'theory', content: "🎉 **Week 4 通关！多模态魔法篇完成！**\n\n你已经掌握了 AI 的所有「感官」——看、画、听、说、动。\n\n**Week 5 预告**：AI 有一个大弱点——它没有「记忆」。下周学习 **RAG 与知识库**，让 AI 拥有你的私有知识。" }
  ]
};
