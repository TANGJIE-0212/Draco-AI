import { DayContent } from '../../../types';

export const v3w2d6Data: DayContent = {
  day: 6,
  title: '驯龙咒语：三轮迭代调试',
  shards: 1,
  steps: [
    { type: 'theory', content: '🛠️ **驯龙咒语·第六式：不满意，就有方法地改**\n\n第一版咒语不完美很正常。真正有效的做法不是一口气推翻，而是经过三轮：看输出、定位一个问题、只改一个关键点，再比较前后变化。' },
    { type: 'video', url: '', content: '后续视频：一条社团邀请稿从 V1 到 V3 的三轮调试。' },
    { type: 'theory', content: '**V1** 先写最小版本；观察具体问题（太长、跑题、语气不对、没依据）；**V2** 只加一个针对性改动；再次观察；**V3** 再解决一个剩余问题。每轮保留咒语和输出，才能知道是哪条改动有效。' },
    { type: 'theory', content: '诊断对照：跑题→补目标或背景；格式乱→补输出形式；语气不对→加示例或受众；编造内容→要求基于给定资料，并标记待核实。一次改十处，会让你无法判断效果来自哪里。' },
    { type: 'quiz', question: '1. 三轮迭代最重要的纪律是？', options: ['每轮尽量重写全部内容', '每轮优先只改一个可诊断的问题', '只看第一次输出'], correct: 1 },
    { type: 'fill', question: '2. V1 输出后，第一件事是具体 ___ 问题。', parts: ['第一件事是具体', '___', '问题。'], options: ['定位', '忽略', '美化'], correct: '定位' },
    { type: 'match', question: '3. 问题与优先修复连线：', pairs: [
      { left: '答案跑题', right: '补目标或背景' },
      { left: '格式像一大段散文', right: '补结构要求' },
      { left: '语气太成人化', right: '说明受众或给风格示例' },
      { left: '出现未给出的事实', right: '要求依据资料并标记待核实' }
    ] },
    { type: 'quiz', question: '4. V1 想写 60 字活动通知，却输出 180 字。V2 最合适的单点修改是？', options: ['同时换主题、换语气、加五个示例', '加入“60 字以内，三句输出”', '删除所有要求'], correct: 1 },
    { type: 'fill', question: '5. V2 修改后，应与 ___ 的输出进行比较。', parts: ['应与', '___', '的输出进行比较。'], options: ['V1', '下周的天气', '无关故事'], correct: 'V1' },
    { type: 'match', question: '6. 三轮流程连线：', pairs: [
      { left: 'V1', right: '最小可用咒语' },
      { left: '观察', right: '记录一个具体问题' },
      { left: 'V2', right: '针对问题只改一处' },
      { left: 'V3', right: '处理新的一个剩余问题' }
    ] },
    { type: 'quiz', question: '7. 为什么不建议一次加入十条新规则？', options: ['规则永远无用', '很难判断哪条规则带来了改善，也可能互相冲突', 'AI 看不见数字'], correct: 1 },
    { type: 'fill', question: '8. “太正式”是现象；更具体的诊断可写成“像给老师写的，和 ___ 不符”。', parts: ['和面向同学的', '___', '不符。'], options: ['语气', '篇幅', '资料范围'], correct: '语气' },
    { type: 'match', question: '9. 记录迭代时应保存什么？', pairs: [
      { left: '每版咒语', right: '知道改了什么' },
      { left: '对应输出', right: '看到结果变化' },
      { left: '问题描述', right: '避免只说“不好”' },
      { left: '单点改动说明', right: '判断改动是否有效' }
    ] },
    { type: 'quiz', question: '10. V2 已解决字数问题，但标题不吸引同学。V3 应？', options: ['保留字数规则，再只增加标题风格要求', '删掉 V2 所有规则', '假装问题不存在'], correct: 0 },
    { type: 'fill', question: '11. “答案不对”太笼统，应改成“第 2 条没有依据观察记录”，这叫 ___ 诊断。', parts: ['这叫', '___', '诊断。'], options: ['具体', '整体', '主观'], correct: '具体' },
    { type: 'quiz', question: '12. 故事 V2 篇幅合适但主角不像学生，V3 最合适的单点修改是？', options: ['删掉全部已有约束', '补充主角年龄和校园背景', '同时加入十条新规则'], correct: 1 },
    { type: 'quiz', question: '13. 迭代时“测试相同任务”的好处是？', options: ['更容易公平比较修改前后', '可以跳过观察', '保证输出完全相同'], correct: 0 },
    { type: 'fill', question: '14. 每轮只改一个变量，才能判断改动与结果之间的 ___。', parts: ['才能判断它们之间的', '___', '。'], options: ['关系', '顺序', '长度'], correct: '关系' },
    { type: 'match', question: '15. 三轮调试能力卡连线：', pairs: [
      { left: '看哪里不满意', right: '观察' },
      { left: '说清具体原因', right: '诊断' },
      { left: '只动一处', right: '单点修改' },
      { left: '保存前后结果', right: '比较' }
    ] },
    { type: 'theory', content: '🐉 **龙族能力卡：V1→V2→V3 调试日志**\n\n你的作品组件：`版本｜具体问题｜本轮只改什么｜输出变化`。三轮不是追求一次完美，而是让每次改动都有证据。' }
  ]
};
