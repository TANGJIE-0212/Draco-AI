
export type LessonStep = {
    type: 'theory' | 'quiz' | 'boss' | 'match' | 'fill' | 'video' | 'practice';
    content?: string;
    question?: string;
    options?: string[];
    correct?: number | string;
    isBoss?: boolean;
    pairs?: { left: string; right: string }[];
    parts?: string[];
    url?: string;
    // 'practice' 字段：开放式实战题，由大模型评判
    task?: string;          // 任务说明（展示给用户）
    rubric?: string;        // 评分标准（喂给 LLM）
    placeholder?: string;   // 输入框占位文字
    minLength?: number;     // 最少字符数（默认 20）
    referenceAnswer?: string; // 课程内置参考答案，用于题目预览展示和 AI 评审兜底
};

export type DayContent = {
    day: number;
    title: string;
    shards: number;
    steps: LessonStep[];
    isBoss?: boolean;
};

export type WeekInfo = {
    id: number;
    title: string;
    color: string;
    icon: string;
    description: string;
};
