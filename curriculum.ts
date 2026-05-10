import { WeekInfo, DayContent } from './types';
import { day1Data } from './week1/day1/data';
import { day2Data } from './week1/day2/data';
import { day3Data } from './week1/day3/data';
import { day4Data } from './week1/day4/data';
import { day5Data } from './week1/day5/data';
import { day6Data } from './week1/day6/data';
import { day7Data as w1d7Data } from './week1/day7/data';

import { w2d1Data } from './week2/day1/data';
import { w2d2Data } from './week2/day2/data';
import { w2d3Data } from './week2/day3/data';
import { w2d4Data } from './week2/day4/data';
import { w2d5Data } from './week2/day5/data';
import { w2d6Data } from './week2/day6/data';
import { w2d7Data } from './week2/day7/data';

import { w3d1Data } from './week3/day1/data';
import { w3d2Data } from './week3/day2/data';
import { w3d3Data } from './week3/day3/data';
import { w3d4Data } from './week3/day4/data';
import { w3d5Data } from './week3/day5/data';
import { w3d6Data } from './week3/day6/data';
import { w3d7Data } from './week3/day7/data';

import { w4d1Data } from './week4/day1/data';
import { w4d2Data } from './week4/day2/data';
import { w4d3Data } from './week4/day3/data';
import { w4d4Data } from './week4/day4/data';
import { w4d5Data } from './week4/day5/data';
import { w4d6Data } from './week4/day6/data';
import { w4d7Data } from './week4/day7/data';

import { w5d1Data } from './week5/day1/data';
import { w5d2Data } from './week5/day2/data';
import { w5d3Data } from './week5/day3/data';
import { w5d4Data } from './week5/day4/data';
import { w5d5Data } from './week5/day5/data';
import { w5d6Data } from './week5/day6/data';
import { w5d7Data } from './week5/day7/data';

import { w6d1Data } from './week6/day1/data';
import { w6d2Data } from './week6/day2/data';
import { w6d3Data } from './week6/day3/data';
import { w6d4Data } from './week6/day4/data';
import { w6d5Data } from './week6/day5/data';
import { w6d6Data } from './week6/day6/data';
import { day7Data as w6d7Data } from './week6/day7/data';

import { w7d1Data } from './week7/day1/data';
import { w7d2Data } from './week7/day2/data';
import { w7d3Data } from './week7/day3/data';
import { w7d4Data } from './week7/day4/data';
import { w7d5Data } from './week7/day5/data';
import { w7d6Data } from './week7/day6/data';
import { w7d7Data } from './week7/day7/data';

export const WEEKS: WeekInfo[] = [
  { id: 1, title: "第一周：巨龙解剖学", color: "from-orange-400 to-red-500", icon: "fa-magnifying-glass", description: "LLM Fundamentals" },
  { id: 2, title: "第二周：咒语魔法师", color: "from-blue-400 to-indigo-500", icon: "fa-wand-magic-sparkles", description: "Prompt Engineering" },
  { id: 3, title: "第三周：信息&数据炼金术", color: "from-purple-400 to-pink-500", icon: "fa-flask", description: "Information & Data Alchemy" },
  { id: 4, title: "第四周：多模态控制术", color: "from-green-400 to-emerald-600", icon: "fa-photo-film", description: "Visual / Audio / Video" },
  { id: 5, title: "第五周：龙之记忆术", color: "from-yellow-400 to-orange-500", icon: "fa-database", description: "RAG" },
  { id: 6, title: "第六周：龙族流水线", color: "from-cyan-400 to-blue-600", icon: "fa-gears", description: "Workflow Automation" },
  { id: 7, title: "第七周：召唤神龙", color: "from-slate-700 to-black", icon: "fa-dragon", description: "Build your Product" },
];

export const ALL_CURRICULUM: Record<number, DayContent[]> = {
    1: [ day1Data, day2Data, day3Data, day4Data, day5Data, day6Data, w1d7Data ],
    2: [ w2d1Data, w2d2Data, w2d3Data, w2d4Data, w2d5Data, w2d6Data, w2d7Data ],
    3: [ w3d1Data, w3d2Data, w3d3Data, w3d4Data, w3d5Data, w3d6Data, w3d7Data ],
    4: [ w4d1Data, w4d2Data, w4d3Data, w4d4Data, w4d5Data, w4d6Data, w4d7Data ],
    5: [ w5d1Data, w5d2Data, w5d3Data, w5d4Data, w5d5Data, w5d6Data, w5d7Data ],
    6: [ w6d1Data, w6d2Data, w6d3Data, w6d4Data, w6d5Data, w6d6Data, w6d7Data ],
    7: [ w7d1Data, w7d2Data, w7d3Data, w7d4Data, w7d5Data, w7d6Data, w7d7Data ],
};
