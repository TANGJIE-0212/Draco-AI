import { DayContent } from '../../../types';

export const v3w2d4Data: DayContent = {
  day: 4,
  title: '驯龙咒语：Zero/One/Few-shot 与边界示例',
  shards: 1,
  steps: [
    { type: 'theory', content: '🎯 **驯龙咒语·第四式：用示例给模型画边界**\n\n这里的 **shot 指给模型看的示例**：Zero-shot 不给示例，One-shot 给一个，Few-shot 给少量示例。**正例**展示希望模仿的正确行为，**反例**展示不应采用的行为，**边界例**测试接近规则边缘、容易歧义的输入。标签泄漏是把答案线索藏进输入；顺序偏差是示例排列改变了结果。' },
    {
      type: 'interactive',
      interactiveKind: 'compare',
      interactiveTitle: '最小高质量 Few-shot：该选哪一组？',
      interactiveInstruction: '比较候选示例集，选出“最小但高质量”的 Few-shot 方案。',
      interactiveItems: [
        {
          label: 'A. 6 条示例都来自“报名”类别，格式也不统一',
          detail: '数量多但信息单一，类别失衡且格式漂移，难以稳定泛化到其他情况。',
          correct: false
        },
        {
          label: 'B. 3 条统一格式：1 正例 + 1 反例 + 1 边界例，标签均已人工核对',
          detail: '这是最小高质量集：覆盖关键边界、结构一致、无错误标注，便于定位模型偏差。',
          correct: true
        },
        {
          label: 'C. 10 条示例里有 2 条疑似标错，先凑数量再说',
          detail: '错误示例会污染模型行为，先保质量再谈数量，否则调试成本更高。',
          correct: false
        }
      ]
    },
    { type: 'theory', content: 'Zero-shot：只给任务说明；One-shot：给 1 个示例；Few-shot：给少量高质量示例。示例质量通常比示例数量更关键。' },
    { type: 'theory', content: '高质量示例要点：格式一致、类别平衡、含正例/反例/边界例，避免标签泄漏与顺序偏差，也要警惕错误示例污染。' },
    { type: 'quiz', question: '1. 下面哪句最准确地区分 Zero/One/Few-shot？', options: ['Zero 是不给任务，One 和 Few 才给任务', 'Zero 不给示例，One 给 1 个，Few 给少量示例', 'Few 必须给 20 个以上示例'], correct: 1 },
    { type: 'fill', question: '2. 只给任务描述、不附任何示例，叫 ___-shot。', parts: ['这种方式叫', '___', '-shot。'], options: ['Zero', 'One', 'Few'], correct: 'Zero' },
    { type: 'match', question: '3. 题型与用途连线：', pairs: [
      { left: 'Zero-shot', right: '规则清楚且任务简单时快速起步' },
      { left: 'One-shot', right: '先给一个标准模板降低格式漂移' },
      { left: 'Few-shot', right: '任务有多种情况时用少量示例覆盖差异' },
      { left: '边界示例', right: '处理模糊或临界输入' }
    ] },
    { type: 'quiz', question: '4. 什么时候最该从 Zero-shot 升级到 Few-shot？', options: ['任务输出经常格式跑偏或类别混淆时', '你只想让回答更长时', '你不想写任务要求时'], correct: 0 },
    { type: 'quiz', question: '5. 下面哪个是“反例”的正确作用？', options: ['告诉模型什么不能做，并说明为什么错', '提供一个更花哨的正确答案', '用来替代全部正例'], correct: 0 },
    { type: 'fill', question: '6. “字数刚好压线、信息略缺失”的示例属于 ___ 例。', parts: ['它属于', '___', '例。'], options: ['边界', '正向', '随机'], correct: '边界' },
    { type: 'match', question: '7. 现象与风险连线：', pairs: [
      { left: '正例全是同一类别', right: '类别失衡' },
      { left: '示例格式忽左忽右', right: '格式不一致' },
      { left: '示例里直接写出正确标签线索', right: '标签泄漏' },
      { left: '示例按难度单向排列', right: '顺序偏差' }
    ] },
    { type: 'quiz', question: '8. 关于“示例质量 vs 数量”，哪句更专业？', options: ['示例越多一定越好', '先保证示例正确、平衡、可复用，再决定数量', '数量不重要，随便给一条就行'], correct: 1 },
    { type: 'quiz', question: '9. 你发现 One-shot 的模板正确率高，但遇到边界输入就崩。下一步最合理的是？', options: ['加 1 个边界例和 1 个反例，保持同一格式', '把原示例删掉改成纯 Zero-shot', '随机加入无关示例增加多样性'], correct: 0 },
    { type: 'fill', question: '10. 如果示例本身标错标签，模型会被 ___。', parts: ['模型会被', '___', '。'], options: ['污染', '加速', '纠正'], correct: '污染' },
    { type: 'match', question: '11. 设计示例集时的动作配对：', pairs: [
      { left: '控制顺序偏差', right: '打散难度与类别顺序' },
      { left: '避免标签泄漏', right: '不把答案提示词藏在输入里' },
      { left: '保证格式一致', right: '统一字段和分隔符' },
      { left: '防错误污染', right: '先人工核对示例正确性' }
    ] },
    { type: 'quiz', question: '12. 哪组 Few-shot 更可靠？', options: ['3 个都来自同一类别、但写得很长', '3 个短而准：1 正例 + 1 反例 + 1 边界例', '10 个示例里有 2 个明显标错'], correct: 1 },
    { type: 'quiz', question: '13. 你怀疑模型受示例顺序影响，最可执行的验证是？', options: ['固定示例内容，只改变顺序做 A/B 对比', '只改字体颜色再测', '一次改顺序再同时改任务描述'], correct: 0 },
    { type: 'quiz', question: '14. 要把校园活动留言分成“提问、建议、报名”，哪组最小示例集最有信息量？', options: ['三个格式不同但都属于报名的示例', '一个标准正例、一个不属于任何类别的反例、一个含义模糊的边界例，并统一格式', '十个示例，其中两条标签已知错误'], correct: 1 },
    { type: 'practice', question: '15. Boss：示例边界裁判', task: '你收到一组 8 条示例：数量很多但有格式混乱、标签泄漏和两条错误标注。请写出“删改方案”，把它收敛成更强的最小示例集，并说明每条保留/删除理由。', rubric: '应优先质量不优先数量；明确剔除错误示例；修复格式一致性；补足反例/边界例；说明类别平衡与顺序策略。', placeholder: '先写问题清单，再写重构后的示例集…', minLength: 120, referenceAnswer: '先删两条错误标注，再去掉重复同类示例；统一格式为“输入-标签-依据”；保留一条标准正例，补一条反例和一条边界例；按类别交替排序并避免输入里出现标签关键词。', isBoss: true },
    { type: 'theory', content: '✅ **总结卡**\n\nZero/One/Few-shot 是“示例策略”而不是“数量竞赛”。用少量高质量的正例、反例、边界例，常比一堆重复示例更稳。' }
  ]
};
