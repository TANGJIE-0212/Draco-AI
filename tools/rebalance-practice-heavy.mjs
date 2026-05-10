import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const specs = {
  '2-1': { topic: 'System Prompt', scenario: '急诊科医生 AI 助理', artifact: '防漂移 System Prompt', audience: '普通患者', output: '角色、边界、风格、禁忌四段式提示词', risk: '下诊断或泄露系统提示词' },
  '2-2': { topic: 'CRISPE 与结构化 Prompt', scenario: '国产电动牙刷小红书种草', artifact: '结构化营销 Prompt', audience: '小红书用户', output: 'CRISPE 分段提示词', risk: '要求模糊、风格和格式冲突' },
  '2-3': { topic: 'Few-Shot Learning', scenario: '客服投诉邮件改写', artifact: 'Few-Shot 改写 Prompt', audience: '客服团队', output: '指令 + 3 组输入输出示例 + 待处理输入', risk: '示例格式不统一或类别覆盖不足' },
  '2-4': { topic: 'Chain-of-Thought 推理', scenario: '水池进出水数学题', artifact: '分步推理 Prompt', audience: '初中生', output: '已知条件、逐步计算、最终答案', risk: '推理看似合理但计算错误' },
  '2-5': { topic: 'JSON 与输出控制', scenario: '餐厅评论信息提取', artifact: '严格 JSON 提取 Prompt', audience: '数据接口工程师', output: '可解析 JSON Schema', risk: 'JSON 前后混入解释文字或字段类型错误' },
  '2-6': { topic: 'Prompt 安全与防越狱', scenario: '银行客服 AI', artifact: '防御性 System Prompt', audience: '银行客户', output: '安全规则 + 拒绝话术 + 用户输入边界', risk: '泄露指令、讨论敏感话题或查询他人账户' },
  '2-7': { topic: 'Prompt 工程综合', scenario: '法律咨询 AI', artifact: '完整法律助手 System Prompt', audience: '普通咨询者', output: 'CRISPE + Few-Shot + CoT + JSON + 防越狱', risk: '把参考建议说成正式法律意见' },

  '3-1': { topic: '文本摘要与信息提取', scenario: '产品发布会通稿', artifact: '结构化摘要 Prompt', audience: '老板和产品团队', output: '产品名、日期、功能、价格、用户、亮点 JSON', risk: '遗漏关键事实或编造原文没有的信息' },
  '3-2': { topic: '翻译与本地化', scenario: '英文技术文档翻译', artifact: '术语一致翻译 Prompt', audience: '中文开发者', output: '保留代码和变量名的简体中文译文', risk: '术语前后不一致或误译代码' },
  '3-3': { topic: '数据清洗与格式转换', scenario: '手机号脏数据批处理', artifact: '数据清洗规则 Prompt', audience: '运营数据同事', output: '统一手机号 JSON 数组和 invalid 标记', risk: '误修无效数据或丢失原始记录' },
  '3-4': { topic: 'AIDA 文案写作', scenario: '5 分钟健康早餐智能料理机', artifact: '小红书 AIDA 文案', audience: '上班族', output: 'A/I/D/A 四段 200 字内文案', risk: '编造功效数据或行动号召不明确' },
  '3-5': { topic: 'AI 代码辅助', scenario: 'Python average 函数 Debug', artifact: '代码解释与修复说明', audience: '非程序员新人', output: '大白话解释、Bug 定位、修复代码、边界情况', risk: '只改表面问题、漏掉空列表除零' },
  '3-6': { topic: 'SWOT 分析与决策辅助', scenario: '奶茶品牌进军咖啡市场', artifact: 'SWOT 分析报告', audience: '品牌负责人', output: 'S/W/O/T 各 3 条 + 综合建议', risk: '内部外部因素混淆或编造市场数据' },
  '3-7': { topic: '信息处理综合流水线', scenario: '100 条用户评论分析', artifact: 'Prompt Chain 方案', audience: '产品团队', output: '清洗、情感分类、抱怨点提取、一页报告', risk: '步骤之间数据格式断裂' },

  '4-1': { topic: '图像理解', scenario: '公司季度销售柱状图', artifact: '看图表分析 Prompt', audience: '业务分析师', output: '图表类型、数值、最高最低、业务洞察', risk: '看错数值或把不清楚的信息当事实' },
  '4-2': { topic: '图像生成 Prompt', scenario: '赛博朋克城市夜景中弹吉他的橘猫', artifact: 'Midjourney/SD 图片 Prompt', audience: '视觉设计师', output: '主体、环境、风格、光影、视角、负面词', risk: '主体不清或缺少 negative prompt' },
  '4-3': { topic: '角色一致性与控制', scenario: '绘本主角 10 张图保持一致', artifact: 'Character Sheet', audience: '绘本创作者', output: '外貌、服装、性格、锚定句、参考图策略', risk: '角色细节每次漂移' },
  '4-4': { topic: 'TTS 与语音识别', scenario: '小王子有声书朗读', artifact: 'TTS 配置说明', audience: '音频制作人', output: '音色、情感、停顿、节奏、配乐', risk: '只说好听不说可复现参数' },
  '4-5': { topic: 'AI 视频生成', scenario: '小金鱼鱼缸慢镜头特写', artifact: '5 秒视频 Prompt', audience: '短视频创作者', output: '主体、动作、镜头、速度、氛围、画质', risk: '缺少镜头运动或时间连续性' },
  '4-6': { topic: '多模态融合管道', scenario: 'AI 短视频自动制作', artifact: '多模态工作流', audience: '内容团队', output: '脚本到配音字幕视频的 4 步管道', risk: '错误沿管道放大且无人审核' },
  '4-7': { topic: '多模态综合', scenario: 'AI 旅行 vlog 生成器', artifact: '30 秒旅行 vlog 管道', audience: '旅行内容创作者', output: '脚本、分镜、图片、视频、配音、字幕、配乐模板', risk: '视觉风格不一致或失败无兜底' },

  '5-1': { topic: '为什么需要 RAG', scenario: '公司内部知识库问答', artifact: 'RAG 需求说明', audience: '企业知识管理负责人', output: '为什么不用微调、风险、三大场景', risk: '幻觉、信息陈旧、没有引用来源' },
  '5-2': { topic: 'Chunking 文档切块', scenario: '100 页法律合同 PDF', artifact: '切块策略', audience: '法务知识库工程师', output: '切块单位、大小、重叠、metadata、表格处理', risk: '条款被切断导致答案失真' },
  '5-3': { topic: 'Embedding 与向量数据库', scenario: '给非技术朋友解释语义向量', artifact: '通俗解释文本', audience: '非技术朋友', output: '生活类比 + 相似度解释 + 200 字以内', risk: '术语堆砌导致听不懂' },
  '5-4': { topic: '检索优化与 Query 改写', scenario: '“上次开会决定的那个 KPI 调整”', artifact: 'Query 改写 Prompt', audience: '企业搜索用户', output: '模糊点分析 + 3 个检索改写', risk: '改写偏离用户原意' },
  '5-5': { topic: '知识库构建实战', scenario: '小型律师事务所 RAG 知识库', artifact: '端到端 RAG 方案', audience: '律所合伙人', output: '文档源、OCR、向量库、权限、更新机制', risk: '权限泄露或扫描件无法检索' },
  '5-6': { topic: 'Agent RAG 与 GraphRAG', scenario: '张三任职年限和项目经历查询', artifact: 'Agent RAG ReAct 流程', audience: 'HR 知识库用户', output: '3 轮 Thought/Action/Observation + 综合答案', risk: '代词消解错误或检索不完整' },
  '5-7': { topic: 'RAG 综合', scenario: '在线教育客服 AI', artifact: '完整 RAG 方案', audience: '在线教育客服团队', output: '知识库、切块、检索优化、Prompt、多轮对话', risk: '防幻觉不足或无法引用来源' },

  '6-1': { topic: '自动化思维', scenario: '每周整理微信收藏并分类归档', artifact: 'AI 自动化五步法方案', audience: '知识工作者', output: '识别、拆解、匹配、连接、监控', risk: '把不适合自动化的决策也自动化' },
  '6-2': { topic: 'API 调用与安全', scenario: '公开 Web 产品集成 OpenAI API Key', artifact: 'API 安全清单', audience: 'Web 开发者', output: '至少 5 条安全措施和后果', risk: '前端泄露 Key 或账单暴增' },
  '6-3': { topic: 'AI Agent', scenario: '自动订机票 Agent', artifact: '工具设计和 ReAct 示例', audience: '差旅用户', output: 'Tools、3 轮 ReAct、人工确认点', risk: '未经确认直接支付下单' },
  '6-4': { topic: '工作流编排', scenario: '自动化客户邮件分类与回复', artifact: '邮件工作流设计', audience: '客服主管', output: '顺序、分支、并行、重试', risk: '投诉邮件误自动回复且不转人工' },
  '6-5': { topic: 'AI 数据管道', scenario: '竞品 App 商店评论监控', artifact: '数据管道方案', audience: '产品运营团队', output: '数据源、清洗、分类、情感、低置信度、输出', risk: '低置信度结果直接进入结论' },
  '6-6': { topic: '监控与评估', scenario: '上线 1 个月的 AI 客服系统', artifact: '监控仪表盘', audience: 'AI 产品运维团队', output: '质量、性能、成本、安全指标和阈值', risk: '质量下降或成本飙升无人发现' },
  '6-7': { topic: '自动化综合', scenario: '全自动行业情报龙', artifact: '行业情报自动化系统', audience: '行业研究员', output: '信息源、抓取去重、AI 摘要、简报、推送、监控', risk: '信息源失效或简报编造趋势' },

  '7-1': { topic: 'AI 产品思维', scenario: '第一个 AI 产品一页提案', artifact: '产品提案', audience: '创业团队', output: '用户、痛点、现状、AI 方案、差异化', risk: '从技术出发而不是从真实需求出发' },
  '7-2': { topic: '技术架构设计', scenario: 'AI 产品技术架构', artifact: '架构说明', audience: '全栈开发者', output: '前端、后端、AI、数据库、数据流、MVP/后续', risk: '前端暴露 API Key 或过度设计' },
  '7-3': { topic: 'AI 辅助编码', scenario: 'FastAPI 流式聊天接口', artifact: '给 Copilot/Cursor 的开发任务说明', audience: 'AI 编程助手', output: '接口、输入输出、流式、错误处理、测试', risk: '需求不精确导致生成不可用代码' },
  '7-4': { topic: 'AI 集成层', scenario: 'AIService 类设计', artifact: '服务层设计说明', audience: '后端工程师', output: '多模型、重试、Token 成本、流式、模板配置', risk: 'Prompt 硬编码或模型不可切换' },
  '7-5': { topic: 'UX 优化与测试', scenario: 'AI 聊天产品体验改进', artifact: 'UX 改进清单', audience: '产品经理', output: '等待、不知问什么、无法反馈三类痛点各 2 条', risk: '用户不信任且不知道如何纠错' },
  '7-6': { topic: '部署与发布', scenario: 'AI 产品生产上线', artifact: '部署前安全检查清单', audience: '运维和开发团队', output: '8 项安全/稳定性检查及后果', risk: '泄露密钥、无回滚、成本失控' },
  '7-7': { topic: 'AI 全能毕业项目', scenario: '30 天落地第一个 AI 项目', artifact: '毕业项目计划', audience: '学习者自己', output: '项目名、用户痛点、课程技术点、30 天里程碑、风险预案', risk: '项目太虚无法开始' }
};

function propName(name) {
  if (!name) return '';
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText();
}

function nodeToValue(node, sourceFile) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((el) => nodeToValue(el, sourceFile));
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) result[propName(prop.name)] = nodeToValue(prop.initializer, sourceFile);
    }
    return result;
  }
  return node.getText(sourceFile);
}

function readModule(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let data;
  let varName;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      varName = node.name.getText(sourceFile);
      data = nodeToValue(node.initializer, sourceFile);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (!data || !varName) throw new Error(`Could not parse ${filePath}`);
  return { data, varName };
}

function quote(value) {
  return JSON.stringify(value ?? '').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function stepToTs(step, indent = '    ') {
  if (step.type === 'theory') return `${indent}{ type: 'theory', content: ${quote(step.content)} }`;
  if (step.type === 'video') return `${indent}{ type: 'video', url: ${quote(step.url || '')}, content: ${quote(step.content || '')} }`;
  if (step.type === 'quiz' || step.type === 'boss') {
    const boss = step.type === 'boss' || step.isBoss ? `, isBoss: true` : '';
    return `${indent}{ type: '${step.type}', question: ${quote(step.question)}${boss}, options: ${quoteArray(step.options || [])}, correct: ${typeof step.correct === 'number' ? step.correct : quote(step.correct)} }`;
  }
  if (step.type === 'fill') return `${indent}{ type: 'fill', question: ${quote(step.question)}, parts: ${quoteArray(step.parts || [])}, options: ${quoteArray(step.options || [])}, correct: ${quote(step.correct)} }`;
  if (step.type === 'match') return `${indent}{ type: 'match'${step.isBoss ? ', isBoss: true' : ''}, question: ${quote(step.question)}, pairs: ${pairsToTs(step.pairs || [])} }`;
  if (step.type === 'practice') return `${indent}{ type: 'practice', task: ${quote(step.task)}, rubric: ${quote(step.rubric)}, placeholder: ${quote(step.placeholder)}, minLength: ${step.minLength ?? 60} }`;
  return `${indent}${JSON.stringify(step)}`;
}

function quoteArray(values) {
  return `[${values.map((v) => quote(v)).join(', ')}]`;
}

function pairsToTs(pairs) {
  return `[${pairs.map((p) => `{ left: ${quote(p.left)}, right: ${quote(p.right)} }`).join(', ')}]`;
}

function dayToTs(varName, data) {
  const header = `import { DayContent } from '../../types';\n\nexport const ${varName}: DayContent = {\n`;
  const props = [
    `  day: ${data.day},`,
    `  title: ${quote(data.title)},`,
    `  shards: ${data.shards ?? 1},`,
    data.isBoss ? `  isBoss: true,` : null,
    `  steps: [`,
    data.steps.map((step) => stepToTs(step)).join(',\n'),
    `  ]`,
    `};\n`
  ].filter(Boolean).join('\n');
  return header + props;
}

function basicSteps(steps) {
  const basics = [];
  for (const step of steps) {
    if (['quiz', 'fill', 'match', 'boss'].includes(step.type)) basics.push(step);
    if (basics.length === 6) break;
  }
  return basics;
}

function makePractice(spec, n, dayKey) {
  const promptName = spec.topic.includes('Prompt') ? spec.topic : `${spec.topic} Prompt`;
  const tasks = [
    dayKey === '2-1' ? {
      task: `【新手补全 Prompt】下面有一份半成品 System Prompt。请你只补全括号里的内容，让它能用于「${spec.scenario}」。不用追求专业，只要写清楚：AI 是谁、能帮什么、不能做什么、回答时怎么说。`,
      rubric: `是否完成了模板中的空缺；是否让 AI 的角色、任务、语气和边界变清楚；是否明确不能替用户下诊断、不能泄露系统提示词；语言是否像给新手写的一样简单直接。`,
      placeholder: `你是【补全：AI 的角色】。\n你的任务是【补全：能帮用户做什么】。\n回答时请【补全：语气/格式要求】。\n如果用户问到【补全：不能回答的内容】，你应该【补全：如何拒绝或提醒】。\n不要【补全：禁止事项 1】；不要【补全：禁止事项 2】。`
    } : {
      task: `【直接写 Prompt】围绕「${spec.scenario}」，写一个可以直接复制给大模型使用的 ${promptName}。要求包含：角色/目标、输入信息、执行步骤、输出格式、边界限制。`,
      rubric: `是否能直接复制使用；是否围绕 ${spec.topic} 和「${spec.scenario}」展开；是否包含角色/目标、输入、步骤、输出格式和边界；是否能降低「${spec.risk}」风险；语言是否清晰不绕。`,
      placeholder: `你是...\n你的目标是...\n用户会提供...\n请按以下步骤完成：\n1. ...\n2. ...\n输出格式：...\n边界限制：...`
    },
    {
      task: `【结构化表达】为「${spec.scenario}」写一份可直接复制使用的任务说明。必须面向「${spec.audience}」，并明确输入、处理步骤、输出格式和禁止事项。`,
      rubric: `结构是否清晰；输入/步骤/输出是否完整；是否符合 ${spec.audience} 的理解水平；禁止事项是否能降低「${spec.risk}」风险。`,
      placeholder: `## 输入\n...\n## 处理步骤\n1. ...\n## 输出格式\n...\n## 禁止事项\n...`
    },
    {
      task: `【边界处理】列出「${spec.scenario}」在真实使用中最容易失败的 4 种情况，并分别写出 AI 应该如何回应或兜底。`,
      rubric: `是否包含真实边界场景；每个兜底是否具体可执行；是否避免让 AI 编造；是否覆盖「${spec.risk}」这个核心风险。`,
      placeholder: `失败场景 1：...\nAI 兜底：...\n失败场景 2：...\nAI 兜底：...`
    },
    {
      task: `【输出格式设计】为「${spec.artifact}」设计一个标准输出模板。要求模板字段清楚、顺序合理，并说明每个字段为什么需要。`,
      rubric: `模板是否能支撑 ${spec.output}；字段是否完整且不冗余；是否说明字段用途；是否便于后续复制、评审或程序解析。`,
      placeholder: `## 输出模板\n字段 1：...\n字段 2：...\n\n## 字段说明\n- 字段 1 用来...`
    },
    {
      task: `【质量评审】假设另一个同学提交了「${spec.artifact}」。请写一份评分标准，至少包含 5 个维度，并给出每个维度的满分表现和扣分点。`,
      rubric: `是否有 5 个以上评分维度；维度是否贴合 ${spec.topic}；是否区分满分表现和扣分点；是否能指导同学改进。`,
      placeholder: `1. 维度：...\n满分表现：...\n扣分点：...\n2. 维度：...`
    },
    {
      task: `【示例驱动】为「${spec.scenario}」补充 2 组高质量示例：一组是简单输入，一组是困难输入。每组都要写出理想输出，并解释困难输入难在哪里。`,
      rubric: `是否有简单和困难两组示例；输入输出是否配套；困难点解释是否准确；示例是否能帮助大模型学会 ${spec.topic}。`,
      placeholder: `示例 A（简单）：\n输入：...\n理想输出：...\n\n示例 B（困难）：\n输入：...\n理想输出：...\n困难点：...`
    },
    {
      task: `【约束优化】把「${spec.artifact}」压缩成一个更稳的版本：要求减少废话，但不能丢掉角色、任务、边界、输出格式和检查标准。`,
      rubric: `是否保留关键约束；是否去掉空话；是否更容易执行；是否仍能防止「${spec.risk}」。`,
      placeholder: `精简版：...\n保留的关键约束：...\n删掉的废话：...\n风险控制：...`
    },
    {
      task: `【真实迁移】把今天的「${spec.topic}」迁移到你自己的一个工作/学习场景。请写出场景、目标用户、任务输入、期望输出和一版初始方案。`,
      rubric: `场景是否真实具体；是否能体现 ${spec.topic}；输入输出是否明确；方案是否可执行；是否说明如何评估好坏。`,
      placeholder: `我的场景：...\n目标用户：...\n输入：...\n输出：...\n初始方案：...\n评估方式：...`
    }
  ];
  return { type: 'practice', ...tasks[n], minLength: dayKey === '2-1' && n === 0 ? 50 : 80 };
}

function makeBigPractice(spec) {
  return {
    type: 'practice',
    task: `【综合大题】完整产出一份「${spec.artifact}」，用于「${spec.scenario}」。必须包含：1）背景和目标；2）面向对象：${spec.audience}；3）完整方案正文；4）输出格式或交付物；5）至少 3 个质量检查点；6）针对「${spec.risk}」的风险预案。要求写到可以直接拿去给 AI 或团队使用。`,
    rubric: `是否完整覆盖 6 个要求；是否紧扣 ${spec.topic} 和 ${spec.scenario}；交付物是否具体、可执行、可复制；是否有明确质量检查；是否认真处理核心风险「${spec.risk}」；是否避免空话和泛泛而谈。`,
    placeholder: `## 1. 背景和目标\n...\n## 2. 面向对象\n...\n## 3. 完整方案\n...\n## 4. 输出格式/交付物\n...\n## 5. 质量检查点\n- ...\n## 6. 风险预案\n...`,
    minLength: 220
  };
}

function rebalanceDay(week, day) {
  const filePath = path.join(repoRoot, `week${week}`, `day${day}`, 'data.ts');
  const { data, varName } = readModule(filePath);
  const spec = specs[`${week}-${day}`];
  if (!spec) throw new Error(`Missing spec ${week}-${day}`);

  const basics = basicSteps(data.steps);
  const practiceSteps = Array.from({ length: 8 }, (_, n) => makePractice(spec, n, `${week}-${day}`));
  const bigPractice = makeBigPractice(spec);
  const finalTheoryIndex = data.steps.map((step) => step.type).lastIndexOf('theory');
  const finalTheory = finalTheoryIndex >= 0 ? data.steps[finalTheoryIndex] : null;
  const leadSteps = [];

  for (const step of data.steps) {
    if (step === finalTheory) continue;
    if (step.type === 'theory' || step.type === 'video') leadSteps.push(step);
  }

  data.steps = [...leadSteps, ...basics, ...practiceSteps, bigPractice, ...(finalTheory ? [finalTheory] : [])];
  fs.writeFileSync(filePath, dayToTs(varName, data), 'utf8');
  return { filePath, basics: basics.length, practices: practiceSteps.length + 1 };
}

const results = [];
for (let week = 2; week <= 7; week++) {
  for (let day = 1; day <= 7; day++) results.push(rebalanceDay(week, day));
}

for (const result of results) {
  console.log(`${path.relative(repoRoot, result.filePath)} basics=${result.basics} practices=${result.practices}`);
}
console.log(`Rebalanced ${results.length} days. Week 1 was not touched.`);
