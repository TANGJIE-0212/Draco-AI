import { WeekInfo, DayContent } from './types';
import { day1Data } from './week1/day1/data';
import { day2Data } from './week1/day2/data';
import { day3Data } from './week1/day3/data';
import { day4Data } from './week1/day4/data';
import { day5Data } from './week1/day5/data';
import { day6Data } from './week1/day6/data';
import { day7Data as w1d7Data } from './week1/day7/data';
import { day1Data as w3d1Data } from './week3/day1/data';
import { day7Data as w6d7Data } from './week6/day7/data';

export const WEEKS: WeekInfo[] = [
  { id: 1, title: "第一周：巨龙解剖学 (AI 基础)", color: "from-orange-400 to-red-500", icon: "fa-magnifying-glass", description: "LLM Fundamentals & History" },
  { id: 2, title: "第二周：咒语魔法师 (提示工程)", color: "from-blue-400 to-indigo-500", icon: "fa-wand-magic-sparkles", description: "Prompt Engineering Mastery" },
  { id: 3, title: "第三周：炼金术实战 (数据与信息)", color: "from-purple-400 to-pink-500", icon: "fa-flask", description: "Practical Data & Info Tasks" },
  { id: 4, title: "第四周：多模态控制 (视觉与音频)", color: "from-green-400 to-emerald-600", icon: "fa-photo-film", description: "Vision, Audio & Video AI" },
  { id: 5, title: "第五周：龙之记忆 (RAG 知识库)", color: "from-yellow-400 to-orange-500", icon: "fa-database", description: "Retrieval Augmented Generation" },
  { id: 6, title: "第六周：龙族流水线 (工作流与 Agent)", color: "from-cyan-400 to-blue-600", icon: "fa-gears", description: "Workflows & Autonomous Agents" },
  { id: 7, title: "第七周：召唤神龙 (产品实战)", color: "from-slate-700 to-black", icon: "fa-dragon", description: "Build & Deploy your AI App" },
];

export const ALL_CURRICULUM: Record<number, DayContent[]> = {
    1: [ day1Data, day2Data, day3Data, day4Data, day5Data, day6Data, w1d7Data ],
    2: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, shards: 1, steps: [] })),
    3: [ w3d1Data, ...Array.from({ length: 6 }, (_, i) => ({ day: i + 2, title: `Day ${i + 2}`, shards: 1, steps: [] })) ],
    4: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, shards: 1, steps: [] })),
    5: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, shards: 1, steps: [] })),
    6: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, shards: 1, steps: [] })),
    7: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, shards: 1, steps: [] })),
};
