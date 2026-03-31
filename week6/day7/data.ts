
import { DayContent } from '../../types';

export const day7Data: DayContent = {
    day: 7,
    title: "终极试炼：唤醒你的“全自动情报龙”",
    shards: 1,
    steps: [
        { 
            type: 'theory', 
            content: "🐲 导师独白：驯龙师，今天我们要启动自动化闭环项目。让你的龙飞遍网络，为你抓取、筛选、总结行业动态。" 
        },
        { 
            type: 'fill', 
            question: "项目代号：",
            parts: ["我们要启动的自动化闭环项目名为“", "___", "计划”。"],
            options: ["晨星", "启航", "破晓"],
            correct: "晨星"
        },
        { 
            type: 'theory', 
            content: "🛠️ 第一步：触发 (Trigger)。自动化系统需要启动信号。例如每天早晨 8:00 AM 定时执行。" 
        },
        { 
            type: 'quiz', 
            question: "在工作流工具中，定时运行属于哪种节点？", 
            options: ["Action 动作节点", "Trigger 触发器节点", "Filter 过滤器节点"], 
            correct: 1 
        },
        { 
            type: 'theory', 
            content: "🛠️ 第二步：抓取 (Fetch)。通过 API 获取关于“AI最新进展”的原始结构化数据。" 
        },
        { 
            type: 'fill', 
            question: "数据来源：",
            parts: ["通过特定的", "___", "，我们的龙可以与外部软件直接交谈。"],
            options: ["API", "HTML", "TXT"],
            correct: "API"
        },
        { 
            type: 'theory', 
            content: "🛠️ 第三步：加工 (Process)。调用 LLM 龙心，将杂乱信息总结成精简简报。清晰的 Prompt 是关键。" 
        },
        { 
            type: 'quiz', 
            question: "为了防止简报写得太冗长，你的指令（Prompt）中应该包含什么？", 
            options: ["限制总结的字数范围", "要求列出所有搜索到的原文", "要求使用复杂的学术词汇"], 
            correct: 0 
        },
        {
            type: 'match',
            question: "连连看：情报龙的流水线",
            pairs: [
                { left: "触发", right: "晨间 8:00 的闹钟" },
                { left: "抓取", right: "从 API 嗅探行业动态" },
                { left: "加工", right: "龙心总结核心要点" },
                { left: "交付", right: "推送到你的屏幕" }
            ]
        },
        { 
            type: 'theory', 
            content: "🛠️ 第四步：交付 (Deliver)。最后，龙通过 Webhook 将成果送到你手中（如飞书或 Slack）。" 
        },
        { 
            type: 'fill', 
            question: "精准投递：",
            parts: ["通过", "___", "，我们可以将加工好的简报推送给协同工具。"],
            options: ["Webhook", "Bluetooth", "WIFI"],
            correct: "Webhook"
        },
        { 
            type: 'quiz', 
            question: "如果自动化流程在‘抓取’环节报错，我们应该优先检查什么？", 
            options: ["总结 Prompt 是否写得太长", "API 连接是否授权成功", "发送邮件的服务器是否崩溃"], 
            correct: 1 
        },
        { 
            type: 'match',
            isBoss: true,
            question: "终极试炼：自动化架构师考核",
            pairs: [
                { left: "Pipeline", right: "自动化的龙族流水线" },
                { left: "Trigger", right: "自动化的启动信号" },
                { left: "Zapier", right: "自动化的粘合剂" },
                { left: "AI 简报", right: "加工的最终产物" }
            ]
        }
    ]
};
