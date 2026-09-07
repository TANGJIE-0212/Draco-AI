export const GLOSSARY_CATEGORIES = {
  basics: { zh: '基础概念', en: 'Foundations' },
  models: { zh: '模型与架构', en: 'Models & architecture' },
  training: { zh: '训练与优化', en: 'Training & optimization' },
  prompting: { zh: '提示与对话', en: 'Prompts & conversation' },
  retrieval: { zh: '检索与知识', en: 'Retrieval & knowledge' },
  agents: { zh: '智能体', en: 'Agents' },
  multimodal: { zh: '多模态', en: 'Multimodal AI' },
  safety: { zh: '安全与责任', en: 'Safety & responsibility' },
};

export interface GlossaryEntry {
  id: string;
  category: keyof typeof GLOSSARY_CATEGORIES;
  zh: { term: string; definition: string; example: string };
  en: { term: string; definition: string; example: string };
}
