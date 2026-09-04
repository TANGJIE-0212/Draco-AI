import { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 模型准备接下一块文字时，Logits 最像什么？', options: ['给所有候选 Token 的原始评分', '经过核验的事实清单', 'Tokenizer 切出的字符数量'], correct: 0 },
  { type: 'quiz', question: '2. Softmax 的主要作用是什么？', options: ['把原始评分转换成总和为 1 的概率', '把错误事实自动删除', '把中文翻译成英文'], correct: 0 },
  { type: 'fill', question: '3. 所有候选 Token 经过 Softmax 后，概率总和为 ___。', parts: ['概率总和为', '___', '。'], options: ['1', '10', '候选数量'], correct: '1' },
  { type: 'quiz', question: '4. Temperature 降低后，概率分布通常怎样变化？', options: ['高分候选优势更明显，分布更集中', '所有候选概率完全相同', '模型自动学到新知识'], correct: 0 },
  { type: 'quiz', question: '5. Temperature 升高后，最可能发生什么？', options: ['低分候选也更有机会被选中，输出更多样', '输出一定更真实', '模型不再使用 Softmax'], correct: 0 },
  { type: 'match', question: '6. 【任务与冒险程度】', pairs: [
    { left: '按固定字段提取日期', right: '偏低温度，重视稳定' },
    { left: '想十种奇幻角色设定', right: '可适当提高温度，增加多样性' },
    { left: '精确计算预算', right: '使用计算工具，不能只调温度' },
    { left: '核实历史事实', right: '查可靠来源，温度不能替代证据' }
  ] },
  { type: 'quiz', question: '7. Greedy decoding 每一步怎样选择？', options: ['总选当前概率最高的候选', '在全部候选中平均抽签', '先上网搜索再选择'], correct: 0 },
  { type: 'quiz', question: '8. Top-k=3 表示什么？', options: ['每一步只在概率最高的 3 个候选 Token 中继续选择', '每一步把排名前 3 的 Token 一次性全部输出', '从第 3 名开始选择，并排除前两名候选'], correct: 0 },
  { type: 'quiz', question: '9. Top-p 与 Top-k 的关键区别是什么？', options: ['Top-p 按累计概率阈值动态决定候选数，Top-k 保留固定数量', 'Top-p 固定保留 p 个候选，Top-k 则按累计概率动态变化', '两者都会保留固定数量的候选，只是参数名字不同'], correct: 0 },
  { type: 'fill', question: '10. 总是选择当前最高概率候选的策略叫 ___ 选择。', parts: ['这种策略叫', '___', '选择。'], options: ['贪心', '向量', '检索'], correct: '贪心' },
  { type: 'quiz', question: '11. 把 Temperature 调到很低，日期回答是否就一定正确？', options: ['是，稳定就等于真实', '不一定，它只改变选择分布，事实仍需核查', '是，只要答案重复两次'], correct: 1 },
  { type: 'match', question: '12. 【采样工具箱】', pairs: [
    { left: 'Logits', right: '候选 Token 的原始评分' },
    { left: 'Softmax', right: '把评分转换为概率分布' },
    { left: 'Temperature', right: '调节概率的集中或平缓程度' },
    { left: 'Top-k / Top-p', right: '缩小参与选择的候选池' }
  ] },
  { type: 'quiz', question: '13. 同一 Prompt 多次生成不同结尾，最合理的解释是？', options: ['采样时可能选择了不同的合理候选', '第一次生成永久修改了模型', '较长结尾一定更准确'], correct: 0 },
  { type: 'quiz', question: '14. 怎样公平测试 Temperature 的影响？', options: ['保持模型、Prompt 和其他参数相同，只改变 Temperature', '同时换模型、主题和长度', '每组只挑自己最喜欢的一次'], correct: 0 },
  { type: 'practice', task: '15. 【冒险旋钮实验】假设“周末我们去公园___”有四个候选：散步 60%、野餐 25%、写作业 10%、开飞船 5%。分别预测低温和高温时哪些候选更容易被选中，并为“活动通知”和“奇幻故事”选择设置。', rubric: '应说明低温使概率更集中于高概率候选，高温使较低概率候选机会增加；活动通知偏稳定，奇幻故事可更开放；必须指出高温或低温都不保证事实正确。', placeholder: '低温时：……\n高温时：……\n活动通知：……\n奇幻故事：……\n事实正确性：……', minLength: 70, referenceAnswer: '低温时更可能稳定选择“散步”；高温时“野餐、写作业”甚至“开飞船”的机会会增加。活动通知应偏低温，奇幻故事可用较高温度。温度只改变选择分布，不能保证公园活动事实正确。' }
];

export const v3w1d5Data: DayContent = {
  day: 5,
  title: '冒险旋钮——从 Logits、Softmax 到采样',
  shards: 1,
  steps: [
    { type: 'theory', content: '🐉 **第一章：候选词排行榜**\n\nAttention 整理好上下文后，模型会给词表里的候选 Token 打一组原始分数，这叫 Logits。它像接龙选手的候选答案排行榜：分数越高，表示模型在当前上下文中越偏向这个候选，但这不是事实正确率。' },
    { type: 'interactive', interactiveKind: 'temperature', interactiveTitle: 'Temperature 实验室：拖动冒险旋钮' },
    { type: 'theory', content: '🐉 **第二章：Softmax 把分数变成概率**\n\nLogits 可以大于零、等于零或小于零，不方便直接当概率。Softmax 会把它们转换成 0 到 1 之间、总和为 1 的概率。你只需先理解它像一个“公平换算器”，复杂公式放到进阶内容。' },
    { type: 'theory', content: '🐉 **第三章：Temperature 是冒险旋钮**\n\n低温会让高分候选更突出，输出通常稳定；高温会把差距拉平，让冷门候选也有机会，输出更多样。Temperature 不会增加知识，也不是“正确率旋钮”。' },
    { type: 'theory', content: '🐉 **第四章：先缩小候选池**\n\nTop-k 只保留固定数量的高分候选；Top-p 从高到低累加概率，达到阈值就停，所以候选数量会随场景变化。Greedy 总拿第一名，Sampling 则在保留的候选中按概率选择。' },
    ...graded,
    { type: 'theory', content: '🐉 **Day 5 完成**\n\n你已经串起 Logits → Softmax → Temperature → Top-k/Top-p → Sampling。明天追问一个更重要的问题：为什么这套生成机器能说得如此流畅，却仍可能自信地说错？' }
  ]
};