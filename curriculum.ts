import { WeekInfo, DayContent } from './types';
import { w4d1Data } from './week4/day1/data';
import { w4d2Data } from './week4/day2/data';

export const WEEKS: WeekInfo[] = [
  { id: 1, title: "第一周：巨龙解剖学", color: "from-orange-400 to-red-500", icon: "fa-magnifying-glass", description: "LLM Fundamentals" },
  { id: 2, title: "第二周：咒语魔法师", color: "from-blue-400 to-indigo-500", icon: "fa-wand-magic-sparkles", description: "Prompt Engineering" },
  { id: 3, title: "第三周：信息&数据炼金术", color: "from-purple-400 to-pink-500", icon: "fa-flask", description: "Information & Data Alchemy" },
  { id: 4, title: "第四周：多模态控制术", color: "from-green-400 to-emerald-600", icon: "fa-photo-film", description: "Visual / Audio / Video" },
  { id: 5, title: "第五周：龙之记忆术", color: "from-yellow-400 to-orange-500", icon: "fa-database", description: "RAG" },
  { id: 6, title: "第六周：龙族流水线", color: "from-cyan-400 to-blue-600", icon: "fa-gears", description: "Workflow Automation" },
  { id: 7, title: "第七周：召唤神龙", color: "from-slate-700 to-black", icon: "fa-dragon", description: "Build your Product" },
];

const placeholderDay = (weekId: number, day: number): DayContent => ({
  day,
  title: `Week ${weekId} / Day ${day}`,
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: `课程内容正在修复中。当前为可运行占位数据（Week ${weekId}, Day ${day}）。`,
    },
  ],
});

export const ALL_CURRICULUM: Record<number, DayContent[]> = {
    1: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(1, day)),
    2: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(2, day)),
    3: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(3, day)),
    4: [w4d1Data, w4d2Data, ...[3, 4, 5, 6, 7].map((day) => placeholderDay(4, day))],
    5: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(5, day)),
    6: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(6, day)),
    7: [1, 2, 3, 4, 5, 6, 7].map((day) => placeholderDay(7, day)),
};
