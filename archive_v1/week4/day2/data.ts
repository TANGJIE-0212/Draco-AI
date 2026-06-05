import { DayContent } from '../../types';

export const w4d2Data: DayContent = {
  day: 2,
  title: "AI 画师：图像生成入门",
  shards: 1,
  steps: [
    { type: 'theory', content: "🎨 **今日主题：让 AI 为你画画**\n\n从 DALL·E 到 Midjourney 到 Stable Diffusion，AI 已经能根据文字描述生成高质量图像。\n\n今天学习图像生成的核心 Prompt 技巧和关键参数。" },
    { type: 'video', url: "", content: "视频：AI 画图 Prompt 的黄金公式" },
    { type: 'theory', content: "🖌️ **第一章：图像 Prompt 的结构**\n\n一个好的图像生成 Prompt 包含 5 要素：\n\n| 要素 | 示例 |\n|------|------|\n| **主体** | 一只戴墨镜的猫 |\n| **风格** | 赛博朋克风格、水彩画、写实照片 |\n| **构图** | 特写、全景、俯瞰视角 |\n| **光影** | 黄昏暖光、霓虹灯、工作室打光 |\n| **细节** | 高分辨率、细节丰富、8K |\n\n公式：**主体 + 风格 + 构图 + 光影 + 质量词**" },
    { type: 'theory', content: "🎭 **第二章：风格关键词**\n\n| 风格 | 关键词 |\n|------|--------|\n| 写实摄影 | photorealistic, DSLR, 85mm lens |\n| 动漫 | anime style, Studio Ghibli |\n| 油画 | oil painting, impressionist |\n| 水彩 | watercolor, soft washes |\n| 赛博朋克 | cyberpunk, neon lights, futuristic |\n| 极简 | minimalist, flat design, vector |" },
    { type: 'theory', content: "🎛️ **第三章：关键参数**\n\n| 参数 | 作用 |\n|------|------|\n| **Seed（种子）** | 固定种子 = 固定构图，方便微调 |\n| **Aspect Ratio（宽高比）** | 16:9（横版）、9:16（竖版）、1:1（方形）|\n| **CFG Scale** | 越高越严格遵循 Prompt，越低越自由发挥 |\n| **Steps** | 生成步数，越多越精细但越慢 |" },
    { type: 'theory', content: "🔧 **实战时间！**\n\n**🎯 实战任务：生成 3 张指定风格的图片**\n\n使用任一 AI 画图工具（DALL·E / Midjourney / Stable Diffusion / 通义万相），生成：\n\n1. 一张**写实风格**的产品图（如一杯咖啡）\n2. 一张**动漫风格**的角色图\n3. 一张**极简设计**的 Logo\n\n对比 Prompt 写法的差异对输出质量的影响。" },
    { type: 'quiz', question: "1. 【结构】一个好的图像 Prompt 应该包含哪些要素？", options: ["只需要描述主体", "主体 + 风格 + 构图 + 光影 + 质量词", "写得越长越好"], correct: 1 },
    { type: 'quiz', question: "2. 【对比】以下哪个 Prompt 能生成更好的图片？\nA：画一只猫\nB：一只橘色的猫坐在窗台上，窗外是下雨的城市夜景，霓虹灯反射在玻璃上，电影感光影，4K，写实摄影风格", options: ["A 更好", "B 更好，细节丰富的描述能引导 AI 生成更符合预期的图片", "效果一样"], correct: 1 },
    { type: 'fill', question: "3. 【术语】在 Midjourney 中，用来排除不想要元素的参数叫 ___ Prompt。", parts: ["排除不想要元素的参数叫", "___", "Prompt。"], options: ["Negative（负面）", "Positive", "Reverse"], correct: "Negative（负面）" },
    { type: 'quiz', question: "4. 【风格】想生成一张看起来像真实照片的 AI 图片，应该用哪些关键词？", options: ["cartoon, anime", "photorealistic, DSLR, 85mm lens, natural lighting", "watercolor, soft"], correct: 1 },
    { type: 'match', question: "5. 【连线】设计需求与风格关键词", pairs: [{ left: "品牌 Logo 设计", right: "minimalist, vector, flat design" }, { left: "游戏角色概念图", right: "fantasy, detailed, concept art" }, { left: "社交媒体头图", right: "vibrant, eye-catching, modern" }, { left: "绘本插画", right: "watercolor, whimsical, children's book" }] },
    { type: 'quiz', question: "6. 【参数】想生成两张构图相似但细节不同的图，应该怎么做？", options: ["重新写 Prompt", "使用相同的 Seed 值，只修改 Prompt 中的细节描述", "完全随机"], correct: 1 },
    { type: 'practice', task: "【直接写 Prompt】围绕「赛博朋克城市夜景中弹吉他的橘猫」，写一个可以直接复制给大模型使用的 图像生成 Prompt。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。", rubric: "是否能直接复制使用；是否围绕 图像生成 Prompt 和「赛博朋克城市夜景中弹吉他的橘猫」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「主体不清或缺少 negative prompt」风险；语言是否清晰不绕。", placeholder: "你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...", minLength: 80 },
    { type: 'practice', task: "【结构化表达】为「赛博朋克城市夜景中弹吉他的橘猫」写一份可直接复制使用的任务说明。必须面向「视觉设计师」，并明确输入、处理步骤、输出格式和禁止事项。", rubric: "结构是否清晰；输入/步骤/输出是否完整；是否符合 视觉设计师 的理解水平；禁止事项是否能降低「主体不清或缺少 negative prompt」风险。", placeholder: "## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...", minLength: 80 },
    { type: 'practice', task: "【边界处理】列出「赛博朋克城市夜景中弹吉他的橘猫」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。", rubric: "是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「主体不清或缺少 negative prompt」这个核心风险。", placeholder: "失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...", minLength: 80 },
    { type: 'practice', task: "【输出格式设计】为「Midjourney/SD 图片 Prompt」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。", rubric: "模板是否能支撑 主体、环境、风格、光影、视角、负面词；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。", placeholder: "## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...", minLength: 80 },
    { type: 'practice', task: "【质量评审】假设另一个同学提交了「Midjourney/SD 图片 Prompt」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。", rubric: "是否有 5 个以上评分维度；维度是否贴合 图像生成 Prompt；是否区分满分表现和扣分点；是否能指导同学改进。", placeholder: "1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...", minLength: 80 },
    { type: 'practice', task: "【示例驱动】为「赛博朋克城市夜景中弹吉他的橘猫」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。", rubric: "是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 图像生成 Prompt。", placeholder: "示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...", minLength: 80 },
    { type: 'practice', task: "【约束优化】把「Midjourney/SD 图片 Prompt」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。", rubric: "是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「主体不清或缺少 negative prompt」。", placeholder: "精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...", minLength: 80 },
    { type: 'practice', task: "【真实迁移】把今天的「图像生成 Prompt」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。", rubric: "场景是否真实具体；是否能体现 图像生成 Prompt；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。", placeholder: "我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...", minLength: 80 },
    { type: 'practice', task: "【综合大题】完整产出一份「Midjourney/SD 图片 Prompt」，用于「赛博朋克城市夜景中弹吉他的橘猫」。必须包含：1）背景和目标；2）面向对象：视觉设计师；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「主体不清或缺少 negative prompt」的风险预案。要求写到可以直接拿去给 AI 或团队使用。", rubric: "是否完整覆盖 6 个要求；是否紧扣 图像生成 Prompt 和 赛博朋克城市夜景中弹吉他的橘猫；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「主体不清或缺少 negative prompt」；是否避免空话和泛泛而谈。", placeholder: "## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...", minLength: 220 },
    { type: 'theory', content: "🎉 **Day 2 完成！**\n\n你已经掌握了 AI 画图的核心 Prompt 技巧。\n\n**Day 3 预告**：画一张图容易，但保持**多张图之间的一致性**呢？明天学习角色一致性和风格控制的进阶技巧。" }
  ]
};
