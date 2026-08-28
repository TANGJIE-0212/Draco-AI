import { DayContent } from '../../../types';

export const v3w2d7Data: DayContent = {
  day: 7,
  title: '驯龙咒语：学习伙伴 System Prompt',
  shards: 1,
  isBoss: true,
  steps: [
    { type: 'theory', content: '⚔️ **驯龙咒语·终式：设计不会代写的学习伙伴**\n\nSystem Prompt 是给 AI 的长期说明书：它规定身份、帮助方式、输出习惯和边界。今天的 Boss 目标，是设计一个会陪你学习、尊重兴趣、但绝不代写作业的个性化伙伴。' },
    { type: 'video', url: '', content: '后续视频：把本周组件组装成一位有边界的个性化学习伙伴。' },
    { type: 'theory', content: '学习伙伴的基本章节：`## 身份`、`## 了解学习者`、`## 帮助方式`、`## 回复形式`、`## 边界`。它可根据你的年级、兴趣和目标给提示、例子、计划与反馈；但应先鼓励你尝试，再逐步提示。' },
    { type: 'theory', content: '关键边界：不代写作业、不替做测验或竞赛；不编造资料；不把个人信息扩散；遇到不确定知识说明需要核实。好伙伴会问“你已尝试到哪一步？”并提供同类型练习或提示，而不是直接交成品。' },
    { type: 'quiz', question: '1. System Prompt 最适合规定什么？', options: ['一次性问题的唯一答案', 'AI 长期的身份、规则和帮助方式', '用户的真实密码'], correct: 1 },
    { type: 'fill', question: '2. 负责任的学习伙伴应先了解学习者的年级、兴趣和 ___。', parts: ['还应了解学习者的', '___', '。'], options: ['目标', '作业页数', '回答格式'], correct: '目标' },
    { type: 'match', question: '3. 学习伙伴章节连线：', pairs: [
      { left: '## 身份', right: '说明是耐心的学习伙伴' },
      { left: '## 了解学习者', right: '年级、兴趣、当前目标' },
      { left: '## 帮助方式', right: '先提问再给分层提示' },
      { left: '## 边界', right: '不代写作业和测验' }
    ] },
    { type: 'quiz', question: '4. 学生发来“把这份作业直接写完”，最合适的回应是？', options: ['直接交一份完整答案', '先问已做到哪一步，给提示或同类型例子', '要求学生提供个人隐私'], correct: 1 },
    { type: 'fill', question: '5. 学习伙伴不能替学生完成要提交的作业，这是一条 ___。', parts: ['这是一条', '___', '。'], options: ['边界', '背景', '标题'], correct: '边界' },
    { type: 'match', question: '6. 需求与伙伴行为连线：', pairs: [
      { left: '看不懂概念', right: '用符合年级的类比解释' },
      { left: '卡在题目中间', right: '给下一步提示而非答案' },
      { left: '准备课堂分享', right: '协助列提纲并让学生补内容' },
      { left: '资料不确定', right: '提示需要查证来源' }
    ] },
    { type: 'quiz', question: '7. 为什么要写“不编造资料”这条边界？', options: ['让学习伙伴少说话', '避免把猜测当成可信知识', '让所有问题都无法回答'], correct: 1 },
    { type: 'fill', question: '8. 面对练习题，伙伴可以给“第一步提示”，再等待学生 ___。', parts: ['再等待学生', '___', '。'], options: ['尝试', '总结答案', '更换题目'], correct: '尝试' },
    { type: 'match', question: '9. 个性化信息应如何使用？', pairs: [
      { left: '喜欢天文', right: '用星空作合适类比' },
      { left: '七年级', right: '控制术语难度' },
      { left: '目标是课堂分享', right: '协助搭建发言提纲' },
      { left: '不愿透露的信息', right: '不追问、不保存、不扩散' }
    ] },
    { type: 'quiz', question: '10. 下列哪条“帮助方式”最能培养自主学习？', options: ['永远先公布标准答案', '先让学生说已知条件和尝试，再给一条下一步提示', '遇到难题就跳过所有解释'], correct: 1 },
    { type: 'fill', question: '11. 对复杂问题，伙伴可按“问题—提示—学生尝试—___”循环。', parts: ['学生尝试之后，再给', '___', '。'], options: ['反馈', '标准答案', '新任务'], correct: '反馈' },
    { type: 'quiz', question: '12. 在进行中的测验里，学习伙伴最合适的做法是？', options: ['直接代答全部题目', '拒绝代答，改讲通用方法或提供课后同类型练习', '要求上传同学的答案'], correct: 1 },
    { type: 'quiz', question: '13. 学习伙伴的“回复形式”可以规定什么？', options: ['每次先给一句鼓励，再给最多三条提示', '必须使用复杂术语', '永远不许提问'], correct: 0 },
    { type: 'fill', question: '14. System Prompt 中长期有效的规则应放在 ___ 章节里清楚写出。', parts: ['应放在', '___', '章节里清楚写出。'], options: ['边界', '示例', '用户资料'], correct: '边界' },
    { type: 'match', question: '15. Boss 能力卡：学习伙伴的四项承诺：', pairs: [
      { left: '因人而异', right: '依据年级、兴趣和目标调整' },
      { left: '先启发后帮助', right: '提示而非直接交答案' },
      { left: '诚实可靠', right: '不确定时说明并建议核实' },
      { left: '守住边界', right: '不代写、不索要隐私' }
    ] },
    { type: 'theory', content: '🐉 **龙族能力卡：个性化学习伙伴 System Prompt**\n\n你的最终作品组件：身份清楚、了解学习者、分层帮助、回复形式稳定、边界坚定。最好的学习伙伴不是替你飞，而是陪你练出自己的翅膀。' }
  ]
};
