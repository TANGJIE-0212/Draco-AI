import { DayContent } from '../../types';

export const w2d5Data: DayContent = {
  day: 5,
  title: "JSON 与输出格式控制",
  shards: 1,
  steps: [
    { type: 'theory', content: "🔧 **今日主题：让 AI 变成可编程的零件**\n\n聊天、写文章时，AI 自由发挥很好。但当你要把 AI 接到**程序里**（存数据库、传给下一个 API、生成图表），它必须**严格按照你要求的格式输出**。\n\n今天的目标：让 AI 稳定输出 **JSON、表格、CSV** 等结构化格式 —— 从“会聊天的工具”升级成**“数据流水线上的标准零件”**。" },
    { type: 'video', url: "coming_soon", content: "视频：让 AI 乖乖输出 JSON —— 从自由文本到可编程数据" },
    { type: 'theory', content: "📋 **第一章：为什么要结构化输出？**\n\n| 自由文本 | 结构化 JSON |\n|----------|-------------|\n| 「这个产品很好，评分大概 4.5」 | `{\"product\": \"X\", \"rating\": 4.5, \"sentiment\": \"positive\"}` |\n| 只能人读 | 程序可以**直接解析** |\n| 没法批量处理 | 可以接入：数据库 / API / 报表 / 自动化流程 |\n\n👉 一句话：**自由文本是“话”，结构化输出是“数据”。**" },
    { type: 'theory', content: "🎯 **第二章：让 AI 稳定吐 JSON 的 5 个技巧**\n\n1. **给完整模板**：在 Prompt 里直接展示你期望的 JSON 结构\n2. **每个字段都说明**：含义、类型（string / number / boolean）、枚举值\n3. **缺失值约定**：每个字段“没数据时填什么”要说清楚（避免 AI 自由发挥）\n4. **强约束输出**：「**只输出 JSON 对象**，不要任何前后说明文字、不要 Markdown 包裹」\n5. **API 层兜底**：OpenAI / 国内主流 API 都支持 `response_format: { type: 'json_object' }`，强制返回合法 JSON" },
    { type: 'theory', content: "📦 **第三章：其他常用结构化格式**\n\n| 格式 | 适合场景 | Prompt 怎么写 |\n|------|----------|---------------|\n| **JSON** | 接前端 / 后端程序 | 「严格按以下 JSON 模板输出，只返回 JSON」 |\n| **Markdown 表格** | 直观对比、文档展示 | 「用 Markdown 表格输出，列：名称 / 价格 / 评分」 |\n| **CSV** | 批量导入 Excel / 数据库 | 「用 CSV 输出，第一行表头」 |\n| **YAML** | 生成配置文件 | 「按 YAML 格式输出」 |" },
    { type: 'theory', content: "🔒 **第四章：约束“内容”，不只是“格式”**\n\n光说格式不够，还要约束**字段内容的合法性**：\n\n| 约束类型 | Prompt 怎么写 |\n|----------|---------------|\n| **枚举约束** | 「sentiment 只能是 positive / negative / neutral 之一」 |\n| **范围约束** | 「rating 必须是 1-5 的整数」 |\n| **类型约束** | 「price 必须是数字（不能写“100 元”）」 |\n| **缺失约定** | 「字符串字段缺失时填 \"unknown\"，数组缺失时填 []」 |\n| **长度约束** | 「summary 不超过 30 字」 |\n\n👉 这一步做得越严，**程序解析时翻车的概率越低**。" },
    { type: 'theory', content: "⚠️ **第五章：4 个最常见的 JSON 翻车现场**\n\n| 翻车现象 | 真正原因 | 修复 |\n|----------|----------|------|\n| 🕳️ JSON 前面多了一句“以下是结果：” | 没说“只输出 JSON” | 加一句：**只输出 JSON，不要任何前后说明** |\n| 🕳️ 用 \\`\\`\\`json 把 JSON 包起来 | 没禁止 Markdown | 加一句：**不要用 Markdown 代码块包裹** |\n| 🕳️ 字段里写了 “4 星” 而不是 4 | 没说类型 | 在模板中标注：rating = number |\n| 🕳️ 缺数据时 AI 自己编了一个 | 没说缺失值约定 | 写明：缺失时填 unknown / 0 / [] |" },

    // ===== 第 1 组：2 选 + 2 填 + 1 连 =====
    { type: 'quiz', question: "1. 【价值】结构化输出（JSON）相比自由文本最大的优势是？", options: [
      "字数更少，省 Token",
      "可以被程序直接解析，接入自动化流水线（存数据库、传 API、生成图表）",
      "AI 生成更快"
    ], correct: 1 },
    { type: 'quiz', question: "2. 【场景】你要让 AI 批量分析 1000 条用户评论的情感，最合适的输出格式是？", options: [
      "一段自然语言总结",
      "JSON 数组，每条包含 id / text / sentiment / score 等字段",
      "纯数字串"
    ], correct: 1 },
    { type: 'fill', question: "3. 【API】OpenAI 等主流 API 强制返回合法 JSON 的参数 response_format 应该设为 ___。", parts: ["response_format 设为", "___", "可强制返回合法 JSON。"], options: ["json_object", "text", "markdown"], correct: "json_object" },
    { type: 'fill', question: "4. 【强约束】要让 AI 不在 JSON 前面多输出“以下是结果：”，必须明确写一句：「___ JSON，不要任何前后说明文字」。", parts: ["必须写：「", "___", "JSON，不要任何前后说明文字」。"], options: ["只输出", "请输出", "请认真输出"], correct: "只输出" },
    { type: 'match', question: "5. 【格式选型】把不同格式连到最适合的场景：", pairs: [
      { left: "JSON", right: "接入前端 / 后端程序 API" },
      { left: "Markdown 表格", right: "在文档 / 聊天里直观对比" },
      { left: "CSV", right: "批量导入 Excel 或数据库" },
      { left: "YAML", right: "生成配置文件" }
    ] },

    // ===== 第 2 组：2 选 + 2 填 + 1 连 =====
    { type: 'quiz', question: "6. 【约束】下面这条 Prompt 哪一句**最能保证** AI 输出合法 JSON？", options: [
      "「请输出 JSON」",
      "「请严格按下面的 JSON 模板输出，**只返回 JSON 对象**，不要前后说明，不要 Markdown 包裹：{\"name\": ..., \"age\": ...}」",
      "「用代码格式输出」"
    ], correct: 1 },
    { type: 'quiz', question: "7. 【翻车】AI 输出了 JSON，但用 \\`\\`\\`json 包起来，程序解析失败。最简洁的修复方法是？", options: [
      "在程序里手动 strip 反引号",
      "在 Prompt 里加一句：**不要用 Markdown 代码块包裹，直接返回纯 JSON**",
      "换一个模型"
    ], correct: 1 },
    { type: 'fill', question: "8. 【枚举约束】「sentiment 只能是 positive / negative / neutral 之一」这种约束叫 ___ 约束，可以避免 AI 自由发挥出新词。", parts: ["这种限定取值范围的约束叫", "___", "约束。"], options: ["枚举", "类型", "长度"], correct: "枚举" },
    { type: 'fill', question: "9. 【缺失值】要避免 AI 在没数据的字段里乱编，必须在 Prompt 里写清楚每个字段「没数据时填 ___」。", parts: ["必须写明：每个字段没数据时填", "___", "（如 unknown / 0 / []）。"], options: ["默认值", "AI 觉得合适的", "随便什么"], correct: "默认值" },
    { type: 'match', question: "10. 【对症下药】下面 4 个 JSON 翻车现象 → 该加哪句话？", pairs: [
      { left: "JSON 前多一句“以下是结果：”", right: "“只输出 JSON，不要任何前后说明”" },
      { left: "AI 用 ```json 把 JSON 包起来", right: "“不要用 Markdown 代码块包裹”" },
      { left: "rating 字段写成“4 星”不是数字", right: "“rating 必须是 1-5 的整数”" },
      { left: "缺失数据时 AI 自己编了一个", right: "“字符串缺失时填 unknown，数组缺失时填 []”" }
    ] },

    // ===== AI 评审区：5 道 practice =====
    { type: 'practice', task: "【自然语言 → JSON 输出要求】把下面这条需求改写成一份**让 AI 输出 JSON 的 Prompt**，至少定义 3 个字段：\n\n「请帮我从一段餐厅评论中提取菜品名、评分、是否推荐。」", rubric: "是否明确要求“只输出 JSON”、不要解释、不要 Markdown 包裹；是否定义至少 3 个字段；字段类型是否清晰（字符串 / 数字 / 布尔）；是否说明字段缺失时填什么默认值。", placeholder: "请按下面的 JSON 格式输出，只返回 JSON：\n{\n  \"字段 1\": ...,\n  \"字段 2\": ...,\n  ...\n}\n说明：...", minLength: 100, referenceAnswer: "请从下面的餐厅评论中提取信息，**只返回符合下面格式的 JSON 对象**，不要任何说明文字、不要用 Markdown 包裹。\n\n格式：\n{\n  \"dish_name\": \"<字符串：菜品名，没有则填 unknown>\",\n  \"rating\": <0-5 的整数：评分，没有则填 0>,\n  \"recommend\": <true 或 false：是否推荐>,\n  \"reason\": \"<字符串：一句话原因，最多 30 字>\"\n}\n\n规则：\n- rating 必须是数字，不能写“4 星”。\n- 如果评论里没明确推荐，按 false 处理。\n- 字符串中的引号请转义。\n\n评论原文：..." },
    { type: 'practice', task: "【去掉解释 + 加枚举约束】下面这条 Prompt 会让 AI 输出长篇解释：\n\n「请把下面这段评论分类为「正面 / 负面 / 中性」，并解释你的判断理由。」\n\n请你重写它：\n1) 让 AI **只返回 JSON**（含 label 和 confidence 两个字段）；\n2) label 用 **枚举约束**（只能是 positive / negative / neutral）；\n3) confidence 是 0-1 的小数。", rubric: "是否真的去掉了“解释”，要求只返回 JSON；是否对 label 加了枚举约束；是否对 confidence 加了范围约束；是否考虑“看不出来”的情况（如增加 unknown 类）；是否禁止 Markdown 包裹。", placeholder: "请只返回 JSON，不要解释、不要 Markdown 包裹：\n{\n  \"label\": \"positive\" | \"negative\" | \"neutral\",\n  \"confidence\": <0-1 小数>\n}", minLength: 80, referenceAnswer: "请只返回 JSON，不要任何解释、不要前后多余文字、不要用 Markdown 代码块包裹。\n\n格式：\n{\n  \"label\": \"<只能是 positive / negative / neutral / unknown 之一>\",\n  \"confidence\": <0-1 之间的小数，保留 2 位>,\n  \"evidence\": \"<字符串：评论中支持判断的关键词，最多 20 字>\"\n}\n\n规则：\n- 看不出明显倾向时使用 unknown，不要硬猜。\n- confidence 反映你对判断的把握程度。\n\n评论：..." },
    { type: 'practice', task: "【设计你自己的 JSON 提取任务】挑一个你**真实**想自动化的小任务（如：从招聘 JD 提取关键信息、从订单短信提取金额和店家、从健身计划提取训练日历……），写一份完整 JSON 提取 Prompt。\n\n要求：\n1) 至少 4 个字段，包含字符串 / 数字 / 数组三种类型至少各 1 个；\n2) 处理“信息缺失”的情况（写明默认值）；\n3) 强约束：只返回 JSON、不要解释、不要 Markdown 包裹。", rubric: "是否选了真实场景；是否定义至少 4 个字段且类型多样（字符串 / 数字 / 数组都覆盖）；是否处理缺失值；是否要求纯 JSON；是否能直接给 AI 使用。", placeholder: "场景：...\n\n请只返回 JSON，不要解释、不要 Markdown 包裹：\n{\n  \"字段 1\": ...,\n  \"字段 2\": ...,\n  ...\n}\n\n规则：...", minLength: 150, referenceAnswer: "场景：从招聘 JD 提取关键信息，方便我快速横向比较多个岗位。\n\n请只返回 JSON，不要任何解释，不要用 Markdown 包裹：\n{\n  \"company\": \"<公司名，未提及则 unknown>\",\n  \"title\": \"<职位名>\",\n  \"location\": \"<城市，未提及则 unknown>\",\n  \"salary_min\": <月薪下限，单位元，未提及则 0>,\n  \"salary_max\": <月薪上限，单位元，未提及则 0>,\n  \"skills\": [\"<硬技能 1>\", \"<硬技能 2>\"],\n  \"remote_friendly\": <true 或 false>\n}\n\n规则：\n- 不能编造未提到的信息，缺失字段使用上面规定的默认值。\n- skills 至多列 5 个，不要列“沟通能力”这类软技能。\n\nJD 原文：..." },
    { type: 'practice', task: "【加 Few-shot 提升稳定性】你已经写了一份 JSON 提取 Prompt，但发现 AI 偶尔把数字写成「3 颗星」、偶尔加“以下是 JSON：”。请你给 Prompt 加 **2 组 Few-shot 示例**，专门用来“教”AI 不要犯这两种错。", rubric: "是否给出 2 组完整“输入 → 输出”示例；示例的输出**严格符合**纯 JSON、数字字段是数字、没有任何解释文字；2 组示例是否覆盖了不同情况（不是同质）；是否在示例前用一句话说明“严格按示例格式输出”。", placeholder: "请严格按下面示例的格式输出 JSON：\n\n示例 1：\n输入：...\n输出：{...}\n\n示例 2：\n输入：...\n输出：{...}\n\n请处理：\n输入：...\n输出：", minLength: 180, referenceAnswer: "请严格按下面示例的格式输出 JSON。**只返回 JSON 对象**，不要写“以下是”，不要用 ``` 包裹，rating 字段必须是数字（不要写“4 星”）。\n\n示例 1：\n输入：这家羊肉串绝了，孜然味很正，五星推荐回购！\n输出：{\"dish_name\":\"羊肉串\",\"rating\":5,\"recommend\":true,\"reason\":\"孜然味正、值得回购\"}\n\n示例 2：\n输入：服务员态度还行，但麻婆豆腐齁咸，不会再点了。\n输出：{\"dish_name\":\"麻婆豆腐\",\"rating\":2,\"recommend\":false,\"reason\":\"齁咸，不会再点\"}\n\n请处理：\n输入：..." },
    { type: 'practice', task: "【综合大题：用户反馈结构化提取，准备直接接到后端】请写一份完整的「用户反馈结构化提取」Prompt，准备**给后端程序直接调用**。\n\n要求：\n1) 用 ## 章节分段（角色 / 任务 / 输入 / 输出 Schema / 缺失值约定 / 1 组示例）；\n2) 完整 JSON Schema，**至少 5 个字段**，包含字符串 / 整数 / 布尔 / 数组**各一种**；\n3) 缺失值约定要明确（字符串填 unknown，数字填 0，数组填 [] 等）；\n4) “只返回 JSON、不要 Markdown 包裹、不要解释”的强约束必须出现；\n5) 至少 1 组完整 Few-shot 示例（输入 + 输出 JSON）。", rubric: "是否覆盖 5 项要求；是否真的用 ## 章节分段；JSON Schema 字段类型是否覆盖字符串/整数/布尔/数组各 1 个；缺失值约定是否清晰；是否有完整 Few-shot 示例（输出严格符合 Schema）；是否能直接接到程序里用。", placeholder: "## 角色\n...\n\n## 任务\n...\n\n## 输入\n===INPUT===\n...\n===END===\n\n## 输出 Schema\n{\n  \"字段 1\": ...,\n  ...\n}\n\n## 缺失值约定\n- 字符串缺失：...\n- 数字缺失：...\n- ...\n\n## 输出强约束\n- 只返回 JSON，...\n\n## 示例\n输入：...\n输出：{...}", minLength: 320, referenceAnswer: "## 角色\n你是用户反馈结构化提取助手。\n\n## 任务\n阅读用户反馈原文，按下面的 Schema 输出 JSON。\n\n## 输入\n===INPUT===\n（用户反馈原文）\n===END===\n\n## 输出 Schema\n{\n  \"feedback_id\": \"<字符串：原文中提到的工单号或 unknown>\",\n  \"category\": \"<只能是 bug / feature / praise / complaint / other 之一>\",\n  \"severity\": <1-5 整数，5 表示严重影响使用>,\n  \"is_blocking\": <true 或 false：是否阻断用户当前操作>,\n  \"tags\": [\"<相关功能标签 1>\", \"<标签 2>\"],\n  \"summary\": \"<一句话总结，最多 30 字>\"\n}\n\n## 缺失值约定\n- 字符串缺失：填 \"unknown\"\n- 数字缺失：填 0\n- 数组缺失：填 []\n- 布尔缺失：填 false\n- 不允许编造原文未提及的信息\n\n## 输出强约束\n- **只返回 JSON 对象**，不要任何前后说明文字\n- **不要用 Markdown 代码块包裹**\n- 字符串中的双引号必须转义\n\n## 示例\n输入：用户工单 #20245：今天上午用 App 想付款，一直转圈最后报错 503，重试 5 次都失败。\n输出：{\"feedback_id\":\"20245\",\"category\":\"bug\",\"severity\":5,\"is_blocking\":true,\"tags\":[\"payment\",\"network\"],\"summary\":\"支付页持续 503 报错，无法完成付款\"}" },

    { type: 'theory', content: "🎉 **Day 5 完成！**\n\n你已经掌握了让 AI 按格式输出的全套工具。AI 不再只是聊天机器人，而是**可以接到流水线上的标准零件**。\n\n**Day 6 预告**：写出来的 Prompt 没人能一次写对。明天我们学专业玩家的核心心法 —— **迭代调试 + 让 AI 帮你写 Prompt（meta-prompting）**。" }
  ]
};
