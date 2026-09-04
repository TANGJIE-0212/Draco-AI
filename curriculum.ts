import { WeekInfo, DayContent } from './types';

// === v3 中文内容：W1 AI 原理 ===
import { v3w1d1Data as w1d1Data } from './v3/week1/day1/data';
import { v3w1d2Data as w1d2Data } from './v3/week1/day2/data';
import { v3w1d3Data as w1d3Data } from './v3/week1/day3/data';
import { v3w1d4Data as w1d4Data } from './v3/week1/day4/data';
import { v3w1d5Data as w1d5Data } from './v3/week1/day5/data';
import { v3w1d6Data as w1d6Data } from './v3/week1/day6/data';
import { v3w1d7Data as w1d7Data } from './v3/week1/day7/data';

import { v3w2d1Data as w2d1Data } from './v3/week2/day1/data';
import { v3w2d2Data as w2d2Data } from './v3/week2/day2/data';
import { v3w2d3Data as w2d3Data } from './v3/week2/day3/data';
import { v3w2d4Data as w2d4Data } from './v3/week2/day4/data';
import { v3w2d5Data as w2d5Data } from './v3/week2/day5/data';
import { v3w2d6Data as w2d6Data } from './v3/week2/day6/data';
import { v3w2d7Data as w2d7Data } from './v3/week2/day7/data';

import { v3w3d1Data as w3d1Data } from './v3/week3/day1/data';
import { v3w3d2Data as w3d2Data } from './v3/week3/day2/data';
import { v3w3d3Data as w3d3Data } from './v3/week3/day3/data';
import { v3w3d4Data as w3d4Data } from './v3/week3/day4/data';
import { v3w3d5Data as w3d5Data } from './v3/week3/day5/data';
import { v3w3d6Data as w3d6Data } from './v3/week3/day6/data';
import { v3w3d7Data as w3d7Data } from './v3/week3/day7/data';

import { v3w4d1Data as w4d1Data } from './v3/week4/day1/data';
import { v3w4d2Data as w4d2Data } from './v3/week4/day2/data';
import { v3w4d3Data as w4d3Data } from './v3/week4/day3/data';
import { v3w4d4Data as w4d4Data } from './v3/week4/day4/data';
import { v3w4d5Data as w4d5Data } from './v3/week4/day5/data';
import { v3w4d6Data as w4d6Data } from './v3/week4/day6/data';
import { v3w4d7Data as w4d7Data } from './v3/week4/day7/data';

export const WEEKS: WeekInfo[] = [
  { id: 1, title: "第一周：巨龙解剖学", color: "from-orange-400 to-red-500", icon: "fa-magnifying-glass", description: "大语言模型基础" },
  { id: 2, title: "第二周：咒语魔法师", color: "from-blue-400 to-indigo-500", icon: "fa-wand-magic-sparkles", description: "提示词工程" },
  { id: 3, title: "第三周：龙之七巧手", color: "from-purple-400 to-pink-500", icon: "fa-briefcase", description: "多模态创作" },
  { id: 4, title: "第四周：召唤分身术（智能体）", color: "from-green-400 to-emerald-600", icon: "fa-robot", description: "智能体工程" },
];

export const ALL_CURRICULUM: Record<number, DayContent[]> = {
    1: [ w1d1Data, w1d2Data, w1d3Data, w1d4Data, w1d5Data, w1d6Data, w1d7Data ],
    2: [ w2d1Data, w2d2Data, w2d3Data, w2d4Data, w2d5Data, w2d6Data, w2d7Data ],
    3: [ w3d1Data, w3d2Data, w3d3Data, w3d4Data, w3d5Data, w3d6Data, w3d7Data ],
    4: [ w4d1Data, w4d2Data, w4d3Data, w4d4Data, w4d5Data, w4d6Data, w4d7Data ],
};
