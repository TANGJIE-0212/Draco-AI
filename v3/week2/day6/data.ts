import { DayContent } from '../../../types';

export const v3w2d6Data: DayContent = {
  day: 6,
  title: '驯龙咒语：Rubric、测试集、V1-V3 与 Injection 防护',
  shards: 1,
  steps: [
    { type: 'theory', content: '🛠️ **驯龙咒语·第六式：评测驱动迭代**\n\n**Rubric** 是可重复使用的评分标准；**测试集**是一组固定的正常、边界和对抗输入；V1、V2、V3 表示连续改进版本；**Injection（提示词注入）**是把伪指令混入资料，试图让模型违背原规则。A/B 对比则是在相同条件下比较两个版本，一次只改一个变量。' },
    { type: 'video', url: '/video/zh/week2/prompt-testing.mp4', content: '核心视频：用测试集、评分标准和提示词注入案例检查提示词。' },
    {
      type: 'interactive',
      interactiveKind: 'diagnose',
      interactiveTitle: 'V1-V3 与 Injection：真实故障定位',
      interactiveInstruction: '找出所有真实故障。注意区分“问题现象”和“非故障的风格差异”。',
      interactiveItems: [
        {
          label: 'V2 一次同时改了主题、语气、结构，导致无法归因',
          detail: '真实故障。多变量同时变更会破坏 A/B 可比性，无法判断哪项改动生效。',
          correct: true
        },
        {
          label: '测试集只含正常输入，没有边界和对抗样例',
          detail: '真实故障。覆盖不足会让 V3 看似通过，实则在边界场景失效。',
          correct: true
        },
        {
          label: '把资料区“忽略系统规则”当成可执行命令',
          detail: '真实故障。属于 Injection 命令注入误执行，应当仅作为数据文本处理。',
          correct: true
        },
        {
          label: '输出从两段改成三段，但 Rubric 允许两种结构',
          detail: '非故障。若仍满足 Rubric 与任务边界，这是可接受的表达差异。',
          correct: false
        }
      ]
    },
    { type: 'theory', content: '**V1** 先跑基础样例；**V2** 只修一类失败；**V3** 再修另一类。测试集至少含正常、边界、对抗输入；每次只改一个变量才知道改动是否有效。' },
    { type: 'theory', content: 'Injection 规则：资料区出现“忽略系统规则”时不执行；把它当数据。Rubric 可按准确性、覆盖度、格式稳定性打分，避免“感觉更好看”这种主观判断。' },
    { type: 'quiz', question: '1. 把社团邀请稿从 V1 改到 V3 时，最重要的纪律是？', options: ['每轮都重写主题、语气和结构', '只保留最终版本，不记录中间修改', '每轮优先只改一个可诊断的问题'], correct: 2 },
    { type: 'fill', question: '2. V1 输出后，第一件事是具体 ___ 问题，例如“超过 60 字”。', parts: ['第一件事是具体', '___', '问题。'], options: ['定位', '忽略', '美化'], correct: '定位' },
    { type: 'match', question: '3. 问题与优先修复连线：', pairs: [
      { left: '答案跑题', right: '补目标或背景' },
      { left: '格式像一大段散文', right: '补结构要求' },
      { left: '语气太成人化', right: '说明受众或给风格示例' },
      { left: '出现未给出的事实', right: '要求依据资料并标记待核实' }
    ] },
    { type: 'quiz', question: '4. V1 想写 60 字活动通知，却输出 180 字。V2 最合适的单点修改是？', options: ['同时换主题、换语气并加五个示例', '加入“60 字以内，三句输出”', '删除全部要求，只保留活动名称'], correct: 1 },
    { type: 'quiz', question: '5. V2 加了“60 字以内”后，怎样判断这次修改是否有效？', options: ['用同一任务对比 V1 和 V2 的字数，同时检查内容是否丢失', '把 V2 与另一篇无关故事比较长度', '只看 V2 是否用了更多漂亮词语'], correct: 0 },
    { type: 'match', question: '6. 三轮流程连线：', pairs: [
      { left: 'V1', right: '最小可用咒语' },
      { left: '观察', right: '记录一个具体问题' },
      { left: 'V2', right: '针对问题只改一处' },
      { left: 'V3', right: '处理新的一个剩余问题' }
    ] },
    { type: 'quiz', question: '7. 为什么不建议一次给 V2 加入十条新规则？', options: ['规则数量超过三条就一定无效', 'AI 无法理解带编号的要求', '很难判断哪条规则带来改善，也可能互相冲突'], correct: 2 },
    { type: 'fill', question: '8. “太正式”是现象；更具体的诊断可写成“像给老师写的，和 ___ 不符”。', parts: ['和面向同学的', '___', '不符。'], options: ['语气', '篇幅', '资料范围'], correct: '语气' },
    { type: 'match', question: '9. 记录迭代时应保存什么？', pairs: [
      { left: '每版咒语', right: '知道改了什么' },
      { left: '对应输出', right: '看到结果变化' },
      { left: '问题描述', right: '避免只说“不好”' },
      { left: '单点改动说明', right: '判断改动是否有效' }
    ] },
    { type: 'quiz', question: '10. V2 已解决字数问题，但标题不吸引同学。V3 最合适的做法是？', options: ['保留字数规则，再只增加标题风格要求', '删掉 V2 的字数规则，重新从头写', '不记录标题问题，直接提交 V2'], correct: 0 },
    { type: 'fill', question: '11. “答案不对”太笼统，应改成“第 2 条没有依据观察记录”，这叫 ___ 诊断。', parts: ['这叫', '___', '诊断。'], options: ['具体', '整体', '主观'], correct: '具体' },
    { type: 'quiz', question: '12. 故事 V2 篇幅合适但主角不像学生，V3 最合适的单点修改是？', options: ['删掉全部已有约束', '补充主角年龄和校园背景', '同时加入标题、结局、语气等十条规则'], correct: 1 },
    { type: 'quiz', question: '13. 迭代时为何要用相同任务测试 V1、V2 和 V3？', options: ['更容易公平比较同一项修改前后的效果', '这样可以跳过对输出的观察', '这样能保证每次生成的文字完全相同'], correct: 0 },
    { type: 'quiz', question: '14. V2 同时换了主题、语气和格式，结果变好。现在最大的问题是？', options: ['无法判断到底是哪项修改带来改善', '修改项目越多，结论一定越可靠', '只要结果变好，就不需要保留迭代记录'], correct: 0 },
    { type: 'practice', question: '15. 完成一次 V1→V2→V3 调试', task: '选择一个“社团通知摘要”Prompt，写出 V1，并用三条测试样例找出一个具体失败。V2 只修改一个变量；再次测试后，V3 再修复一个剩余问题。记录每版 Prompt、输出变化和 Rubric 得分。', rubric: '包含 V1/V2/V3；每轮只改一个可归因变量；至少三条测试含正常、边界或对抗输入；使用同一 Rubric 比较；不能同时换主题、模型和评价标准。', placeholder: 'V1：……\n测试与失败：……\nV2 单点修改：……\n结果：……\nV3 单点修改：……\nRubric 对比：……', minLength: 140, referenceAnswer: 'V1 只要求“总结通知”，测试发现经常漏日期。V2 只增加“必须输出日期、地点、事项”，同三条通知复测后字段齐全，但过长。V3 保留字段要求，只增加“每项不超过20字”。用准确、完整、简洁三项 Rubric 比较，记录每轮变化。' },
    { type: 'theory', content: '🐉 **龙族能力卡：V1→V2→V3 调试日志**\n\n你的作品组件：`版本｜具体问题｜本轮只改什么｜输出变化`。三轮不是追求一次完美，而是让每次改动都有证据。' }
  ]
};
