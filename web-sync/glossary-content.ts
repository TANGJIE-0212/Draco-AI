import { GLOSSARY, GLOSSARY_CATEGORIES } from '../glossary';
const source = { entries: GLOSSARY, categories: GLOSSARY_CATEGORIES };

// Chinese web deck mirrors the accepted V5 concept curation.
const replacements: Record<string, typeof source.entries[number]> = {
  'gpt-four': {
    id: 'reasoning-model', category: 'models',
    zh: { term: '推理模型（Reasoning Model）', definition: '专门训练来处理多步推理任务的模型，通常会在给出答案前使用更多计算。推理过程更长不代表答案一定正确。', example: '解一道多条件数学题时，模型先分析条件、检查中间结果，再给出答案；最后仍要核验。' },
    en: { term: 'Reasoning Model', definition: 'A model trained for multi-step reasoning, often using more computation before answering. A longer reasoning process does not guarantee correctness.', example: 'A model analyzes conditions and intermediate results in a math problem; its final answer still needs verification.' },
  },
  chatgpt: {
    id: 'system-prompt', category: 'prompting',
    zh: { term: '系统提示词（System Prompt）', definition: '由应用设置、用于规定助手角色、行为和边界的指令。它与用户的具体问题不同，也不能代替程序中的权限检查。', example: '学习助手的系统提示要求“先给提示，不直接公布答案”，用户再提交具体题目。' },
    en: { term: 'System Prompt', definition: 'Application-set instructions describing an assistant’s role, behavior, and boundaries. They differ from a user’s task and do not replace permission checks in code.', example: 'A tutoring app instructs its assistant to offer hints before answers; a learner then submits a question.' },
  },
  deepmind: {
    id: 'model-evaluation', category: 'basics',
    zh: { term: '模型评测（Model Evaluation）', definition: '用明确的任务、测试数据和评分标准检查模型的能力与风险。单个榜单分数不能代表所有真实使用场景。', example: '给学习助手一组未见过的问题，同时检查答对率、解释是否清楚，以及遇到不知道的问题会不会乱编。' },
    en: { term: 'Model Evaluation', definition: 'Testing model capabilities and risks using defined tasks, data, and scoring criteria. One benchmark score cannot represent all real-world uses.', example: 'Test a tutor on unseen questions for accuracy, clarity, and whether it invents answers when uncertain.' },
  },
  openai: {
    id: 'data-privacy', category: 'safety',
    zh: { term: '数据隐私（Data Privacy）', definition: '对个人信息的收集、使用、保存和分享设置边界。使用 AI 时应只提供完成任务所需的信息，并了解数据如何被处理。', example: '请 AI 整理班级活动反馈前，先移除姓名、手机号和家庭住址。' },
    en: { term: 'Data Privacy', definition: 'Boundaries on collecting, using, retaining, and sharing personal information. Give AI only the information needed for a task and understand how it is handled.', example: 'Remove names, phone numbers, and home addresses before asking AI to summarize class-event feedback.' },
  },
  tensorflow: {
    id: 'training-framework', category: 'training',
    zh: { term: '机器学习框架（ML Framework）', definition: '提供张量运算、自动求导和模型训练等基础功能的软件工具，帮助开发者搭建模型；框架本身不是训练好的模型。', example: '开发者用框架搭建手写数字分类器，再用带标签的图片训练它。' },
    en: { term: 'Machine Learning Framework', definition: 'Software providing building blocks such as tensor operations, automatic differentiation, and model training. A framework is not itself a trained model.', example: 'A developer builds a digit classifier with a framework, then trains it using labeled images.' },
  },
};

export default { ...source, entries: source.entries.map(entry => replacements[entry.id] || entry) };
