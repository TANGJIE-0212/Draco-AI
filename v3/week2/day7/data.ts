import { DayContent } from '../../../types';

export const v3w2d7Data: DayContent = {
  day: 7,
  title: '驯龙咒语 Boss：七模块 Prompt System',
  shards: 1,
  isBoss: true,
  steps: [
    { type: 'theory', content: '⚔️ **驯龙咒语·终式：七模块 Prompt System**\n\n**Prompt System（提示词系统）**把提示词拆成七个职责：System 放长期身份和安全规则；User 放本轮任务；Context 放资料；Examples 放示例；Constraints 放硬约束；Evaluation 放评分与测试；Stop Conditions 放停止或求助条件。分开这些模块能减少混淆，也方便复用、测试和版本回归。' },
    {
      type: 'interactive',
      interactiveKind: 'sequence',
      interactiveTitle: '七模块组装与检查：本课可执行流程',
      interactiveInstruction: '按本课搭建流程排序：先立长期边界，再放本轮任务与资料，最后做评测与停机保护。',
      interactiveSequence: [
        'System：定义长期身份与安全边界',
        'User：写入本轮任务与目标',
        'Context：补充资料并声明资料不可执行',
        'Examples：加入最小高质量示例集',
        'Constraints：补硬约束（格式、长度、禁区）',
        'Evaluation：配置 Rubric 与测试样例',
        'Stop Conditions：声明停止/求助条件并做一次全链路检查'
      ]
    },
    { type: 'theory', content: '模块分工：System 放长期安全规则；User 放本轮任务；Context 放资料；Examples 放少量高质量示例；Constraints 放硬约束；Evaluation 放 Rubric 与测试；Stop Conditions 放停止与求助条件。' },
    { type: 'theory', content: '关键边界：不代写作业、不替做测验或竞赛；不编造资料；不把个人信息扩散；遇到不确定知识说明需要核实。好伙伴会问“你已尝试到哪一步？”并提供同类型练习或提示，而不是直接交成品。' },
    { type: 'quiz', question: '1. 为个性化学习伙伴编写 System Prompt 时，最适合长期规定什么？', options: ['某一道作业题的完整答案', '学习者必须提供的真实姓名', 'AI 的身份、规则和帮助方式'], correct: 2 },
    { type: 'fill', question: '2. 负责任的学习伙伴应先了解学习者的年级、兴趣和 ___，而不是索要隐私。', parts: ['还应了解学习者的', '___', '。'], options: ['目标', '作业页数', '回答格式'], correct: '目标' },
    { type: 'match', question: '3. 学习伙伴章节连线：', pairs: [
      { left: '## 身份', right: '说明是耐心的学习伙伴' },
      { left: '## 了解学习者', right: '年级、兴趣、当前目标' },
      { left: '## 帮助方式', right: '先提问再给分层提示' },
      { left: '## 边界', right: '不代写作业和测验' }
    ] },
    { type: 'quiz', question: '4. 学生发来“把这份作业直接写完”，学习伙伴最合适的回应是？', options: ['先问已做到哪一步，再给提示或同类型例子', '根据题目直接交一份可提交的完整答案', '要求学生上传个人资料后才提供帮助'], correct: 0 },
    { type: 'fill', question: '5. 学习伙伴不能替学生完成要提交的作业，这是一条 ___。', parts: ['这是一条', '___', '。'], options: ['边界', '背景', '标题'], correct: '边界' },
    { type: 'match', question: '6. 需求与伙伴行为连线：', pairs: [
      { left: '看不懂概念', right: '用符合年级的类比解释' },
      { left: '卡在题目中间', right: '给下一步提示而非答案' },
      { left: '准备课堂分享', right: '协助列提纲并让学生补内容' },
      { left: '资料不确定', right: '提示需要查证来源' }
    ] },
    { type: 'quiz', question: '7. 为什么要在学习伙伴规则中写“不编造资料”？', options: ['避免学习伙伴使用任何举例', '让学习伙伴只回答“我不知道”', '避免把猜测当成可信知识'], correct: 2 },
    { type: 'quiz', question: '8. 学生卡在一道练习题上，哪种回复更能帮助他自己学会？', options: ['先问他已做到哪一步，给一个下一步提示，再等他尝试', '直接给完整答案，并让他抄一遍', '立刻换一道更简单的题，不讨论原题'], correct: 0 },
    { type: 'match', question: '9. 个性化信息应如何使用？', pairs: [
      { left: '喜欢天文', right: '用星空作合适类比' },
      { left: '七年级', right: '控制术语难度' },
      { left: '目标是课堂分享', right: '协助搭建发言提纲' },
      { left: '不愿透露的信息', right: '不追问、不保存、不扩散' }
    ] },
    { type: 'quiz', question: '10. 下列哪条“帮助方式”最能培养自主学习？', options: ['每次先公布标准答案，再解释过程', '先让学生说已知条件和尝试，再给一条下一步提示', '遇到难题就直接换一道更简单的题'], correct: 1 },
    { type: 'fill', question: '11. 对复杂问题，伙伴可按“问题—提示—学生尝试—___”循环。', parts: ['学生尝试之后，再给', '___', '。'], options: ['反馈', '标准答案', '新任务'], correct: '反馈' },
    { type: 'quiz', question: '12. 在进行中的测验里，学习伙伴最合适的做法是？', options: ['拒绝代答，改讲通用方法或提供课后同类型练习', '根据测验难度只代答最难的两题', '请学生上传同学的答案来作参考'], correct: 0 },
    { type: 'quiz', question: '13. 学习伙伴的“回复形式”可以规定什么？', options: ['必须使用复杂术语来显得专业', '每次先给一句鼓励，再给最多三条提示', '永远不许追问学生已经尝试过什么'], correct: 1 },
    { type: 'quiz', question: '14. “不替学生完成可提交作业”这条规则怎样写最可靠？', options: ['作为长期边界明确写出，并说明可提供提示和同类练习', '只在一个示例末尾顺便提到', '等学生索要答案时再临时决定'], correct: 0 },
    { type: 'practice', isBoss: true, question: '15. Boss：组装七模块 Prompt System', task: '为一个“不代写作业的个性化学习伙伴”设计完整 Prompt System，依次写出 System、User、Context、Examples、Constraints、Evaluation、Stop Conditions，并给出至少三条测试样例。', rubric: '七模块齐全且职责不混；长期规则与当前任务分开；包含高质量示例、可执行边界和 Rubric；停止条件覆盖资料不足、测验代答或隐私请求；至少三条测试能验证正常、边界与违规场景。', placeholder: 'System：……\nUser：……\nContext：……\nExamples：……\nConstraints：……\nEvaluation：……\nStop Conditions：……\n测试：……', minLength: 180, referenceAnswer: 'System：帮助学生理解但不代写。User：本轮要理解光合作用。Context：七年级、已知叶绿体基础。Examples：先提问再给提示。Constraints：不直接给可提交答案、不索要隐私。Evaluation：学生能复述概念并完成同类题。Stop：测验进行中、资料不足或涉及隐私时停止并说明。测试覆盖普通提问、索要作业答案、上传同学信息。' },
    { type: 'theory', content: '🐉 **龙族能力卡：个性化学习伙伴 System Prompt**\n\n你的最终作品组件：身份清楚、了解学习者、分层帮助、回复形式稳定、边界坚定。最好的学习伙伴不是替你飞，而是陪你练出自己的翅膀。' }
  ]
};
