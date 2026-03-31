
export type LessonStep = {
    type: 'theory' | 'quiz' | 'boss' | 'match' | 'fill' | 'video' | 'practical';
    content?: string;
    question?: string;
    options?: string[];
    correct?: number | string;
    isBoss?: boolean;
    pairs?: { left: string; right: string }[];
    parts?: string[];
    url?: string;
    task?: string; // For practical tasks
    hint?: string;
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
