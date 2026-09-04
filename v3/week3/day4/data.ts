import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 局部修改时角色脸型总在变，最优先策略是？', options: ["整图重绘直到运气好", "缩小蒙版并绑定参考图锚点", "删除所有负向词", "把时长拉长"], correct: 1 },
  { type: 'quiz', question: '2. 参考图在版本迭代中最关键的价值是？', options: ["保证事实自动正确", "提供身份与风格锚定基线", "替代版本记录", "降低字幕偏移"], correct: 1 },
  { type: 'quiz', question: '3. 你只想修正月面上一处错误阴影，最合适的方法是？', options: ["inpaint 定位局部修正", "outpaint 扩画四周", "改成全新主题", "删掉参考图"], correct: 0 },
  { type: 'quiz', question: '4. V2 比 V1 多改了“景别+色温+背景”，导致效果变差。为什么难归因？', options: ["因为版本号太少", "多变量同时改变，无法判断主因", "因为参考图分辨率太高", "因为题目太短"], correct: 1 },
  { type: 'quiz', question: '5. 要检验“身份漂移”是否来自局部蒙版过大，应怎样试？', options: ["固定其余参数，仅比较大/小蒙版", "同时换 Seed 与提示词", "只看最终一张图", "让同学投票"], correct: 0 },
  { type: 'quiz', question: '6. 版本归因记录里最不能缺的是？', options: ["主观喜欢程度", "本版唯一改动与观测结果", "导出文件名长度", "发布时间"], correct: 1 },
  { type: 'fill', question: '7. 只改局部不动整体，常用___编辑。', parts: ['常用', '___', '编辑。'], options: ["inpaint", "ASR", "Top-p"], correct: 'inpaint' },
  { type: 'fill', question: '8. 把画面向外延展补全边界，常用___。', parts: ['常用', '___', '。'], options: ["outpaint", "OCR", "CFG"], correct: 'outpaint' },
  { type: 'fill', question: '9. 为判断因果，每个版本应坚持___改动。', parts: ['每个版本应坚持', '___', '改动。'], options: ["单变量", "随机", "多变量"], correct: '单变量' },
  { type: 'quiz', question: '10. V3 主体一致性变好，但知识关系错了。下步最佳动作是？', options: ["保留一致性，忽略知识错误", "在保持锚点前提下只修正关系描述与局部位置", "全部推翻重做", "把错误交给字幕解释"], correct: 1 },
  { type: 'practice', task: '11. 【只改一个地方】选一张 AI 图片，只圈出一个需要修改的地方，例如手、文字或阴影。修改后比较前后两版：目标问题修好了吗？其他地方有没有意外变化？', rubric: '只修改一个明确区域；比较修改前后；同时检查目标区域和其他区域。', placeholder: '我要修改：……\n修改前：……\n修改后：……\n其他地方是否变化：……', minLength: 50, referenceAnswer: '我只修改路牌上的错字。修改后错字修好了，但人物脸也有轻微变化，说明局部修改仍可能影响附近内容。' },
  { type: 'match', question: '12. 把改图方法和用途连起来：', pairs: [{"left": "提供参考图", "right": "尽量保持角色和画风一致"}, {"left": "圈出一个区域修改", "right": "只修正局部错误"}, {"left": "向画面外继续扩展", "right": "补充图片边缘"}, {"left": "记录每版改了什么", "right": "知道哪次修改造成变化"}] },
  { type: 'match', question: '13. 把改图问题和检查方法连起来：', pairs: [{"left": "角色五官反复变化", "right": "检查修改范围是否太大"}, {"left": "光照方向前后冲突", "right": "统一光源方向"}, {"left": "说不清每版哪里不同", "right": "每次只改一个地方并记录"}, {"left": "扩展后主体被挤压", "right": "重新说明主体位置"}] },
  { type: 'match', question: '14. 连线：一致性维度', pairs: [{"left": "脸型与服饰连续", "right": "身份一致性"}, {"left": "太阳-月面受光关系正确", "right": "知识一致性"}, {"left": "笔触与色调不跳变", "right": "风格一致性"}, {"left": "镜头前后空间接得上", "right": "构图一致性"}] },
  { type: 'match', question: '15. 连线：真实误解纠正', pairs: [{"left": "参考图能自动修复所有错误", "right": "仍需局部诊断与改动"}, {"left": "版本越多越好，不必记录", "right": "无记录就无法归因"}, {"left": "局部改动一定不影响主体", "right": "蒙版过大会牵连身份特征"}, {"left": "一致性好就等于可发布", "right": "还需事实和版权检查"}] },
];

export const v3w3d4Data: DayContent = {
  day: 4,
  title: '图像控制：正负 Prompt、参考图、局部修改与版本一致性',
  shards: 30,
  steps: [
    { type: 'theory', content: '🎬 **开场｜可控生成四件套**\n**Prompt（提示词）**是告诉图像模型要画什么的文字指令：正向 Prompt 描述想保留的主体、动作和关系，负向 Prompt 描述不要出现的乱码、伪影或错误风格。**inpaint（局部重绘）**是在图片内部圈出区域重新生成；**outpaint（向外扩图）**是在图片边界外继续生成。参考图用于稳定人物和画风；如果不同版本中人物变脸或变装，就叫**身份漂移**。' },
    {
      type: 'interactive',
      interactiveKind: 'diagnose',
      interactiveTitle: '版本漂移门诊：参考图与局部修改排错',
      interactiveInstruction: '判断每个症状最可能的根因，并查看即时修复建议。',
      interactiveItems: [
        { label: '同一角色每版五官都变，且只做了“局部修正”', detail: '常见是蒙版范围过大或锚点太弱，先缩小局部并强化参考图约束。', correct: true },
        { label: 'V2 同时改了景别、色温、背景后效果变差', detail: '典型多变量漂移，需回到单变量版本归因。', correct: true },
        { label: '只想修一处阴影却整图风格变了', detail: '可能误用整图重绘路径，应改用 inpaint 精准局部。', correct: true },
        { label: '参考图已绑定就不需要版本日志', detail: '错误观念；没有日志就无法定位是哪个改动导致漂移。', correct: false }
      ]
    },
    { type: 'theory', content: '⚓ **理论卡 1｜正负 Prompt 协同**\n正向描述想要的主体和关系，负向明确不要的伪影、乱码和错风格。两者配合比只堆正向词更稳定。' },
    { type: 'theory', content: '🖼️ **理论卡 2｜参考图与局部修改**\n参考图用于锁定角色和风格；局部修改用于只改局部元素，避免整图重绘导致角色漂移。' },
    { type: 'theory', content: '🔬 **理论卡 3｜版本一致性**\n用 V1/V2/V3 记录每次局部改动范围，检查角色身份、光照方向和知识关系是否保持一致。' },
    ...graded,
    { type: 'theory', content: '🏁 **结尾｜连续镜头包完成**\n作品盒中现在应有：D3 参考图、3—5 个视觉锚点、至少两张连续镜头图，以及 V1、V2 版本记录。它们共同构成知识短片的稳定视觉段落。' },
  ],
};
