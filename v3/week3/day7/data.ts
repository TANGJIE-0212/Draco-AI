import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. Week3 成片“原理说明”最合格的表达是？', options: ["AI 很厉害所以做出来了", "说明看图编码、生图去噪、视频关键帧、音频校对各自作用", "只讲用了哪些软件", "只展示最终效果"], correct: 1 },
  { type: 'quiz', question: '2. 想证明观众真的理解核心知识，最有效证据是？', options: ["点赞数", "用户理解测试：让同学复述核心事实并指出来源", "片头特效数量", "视频分辨率"], correct: 1 },
  { type: 'quiz', question: '3. 修复日志里“修复前后都没记录参数”，主要问题是？', options: ["字数太少", "无法复现与归因", "格式不美观", "标题不吸引"], correct: 1 },
  { type: 'quiz', question: '4. 发布检查中哪项直接关系法律和伦理风险？', options: ["转场速度", "版权许可与隐私保护", "背景颜色", "画幅选择"], correct: 1 },
  { type: 'quiz', question: '5. 用户理解测试中，学生把“反射”说成“月球自己发光”，你最合理动作是？', options: ["认为是个人问题不处理", "回改对应镜头与旁白，让因果关系更直观，再复测", "只调音乐", "把片子缩短 2 秒"], correct: 1 },
  { type: 'quiz', question: '6. 成片发布前最后一关，哪种顺序更科学？', options: ["先发再改", "先过发布检查清单，再导出最终版", "先删日志再发", "只看画面是否清晰"], correct: 1 },
  { type: 'fill', question: '7. 记录“问题现象-原因-修复-结果”的文档叫修复___。', parts: ['这叫修复', '___', '。'], options: ["日志", "封面", "旁白"], correct: '日志' },
  { type: 'fill', question: '8. 让同学复述核心知识并找来源，属于用户___测试。', parts: ['这属于用户', '___', '测试。'], options: ["理解", "速度", "审美"], correct: '理解' },
  { type: 'fill', question: '9. 成片上线前逐项勾选风险项，叫发布___。', parts: ['这叫发布', '___', '。'], options: ["检查", "转场", "配色"], correct: '检查' },
  { type: 'quiz', question: '10. 你有成片，但缺“缺陷修复日志”。Boss 判定应为？', options: ["合格，成片最重要", "不完整，需补齐可追溯修复记录", "只要有字幕就算过", "让同学口头解释即可"], correct: 1 },
  { type: 'practice', task: '11. 【多模态小作品】完成一支 15—30 秒知识短片，并用四句话检查：讲清了什么？请一位同学复述后哪里没听懂？你修了什么？发布前还要检查什么？', rubric: '有一支短片或完整分镜；记录一位同学的真实反馈；完成至少一次修改；检查事实、素材来源和隐私。', placeholder: '我的短片讲：……\n同学没听懂：……\n我修改了：……\n发布前检查：……', minLength: 70, referenceAnswer: '短片讲月球为什么会亮。同学误以为月球自己发光，我把“反射太阳光”一句放慢并延长对应画面。发布前再核对事实、音乐来源和画面中是否有个人信息。' },
  { type: 'match', question: '12. 把作品检查项目和作用连起来：', pairs: [{"left": "解释制作原理", "right": "说明 AI 在每一步做了什么"}, {"left": "请同学复述", "right": "检查观众是否真的听懂"}, {"left": "记录修改前后", "right": "说明问题怎样被修好"}, {"left": "发布前逐项检查", "right": "减少事实、版权和隐私风险"}] },
  { type: 'match', question: '13. 把观众反馈和修改办法连起来：', pairs: [{"left": "以为月球自己发光", "right": "加强太阳光和反射的画面"}, {"left": "记不住资料来源", "right": "在结尾增加来源提示"}, {"left": "跟不上旁白", "right": "放慢语速并调整字幕"}, {"left": "弄混前后步骤", "right": "重新排列镜头顺序"}] },
  { type: 'match', question: '14. 连线：修复日志字段', pairs: [{"left": "问题现象", "right": "看到或听到的具体错误"}, {"left": "原因假设", "right": "最可能出错环节"}, {"left": "修复动作", "right": "参数或素材层面的调整"}, {"left": "结果验证", "right": "修复后的对照证据"}] },
  { type: 'match', question: '15. 连线：发布前最终闸门', pairs: [{"left": "事实可回查", "right": "通过事实检查"}, {"left": "素材可授权", "right": "通过版权检查"}, {"left": "无未授权个人信息", "right": "通过隐私检查"}, {"left": "说明 AI 参与环节", "right": "通过透明标注检查"}] },
];

export const v3w3d7Data: DayContent = {
  day: 7,
  title: 'Boss 龙之银幕：成片 + 原理说明 + 修复日志 + 发布检查',
  shards: 60,
  isBoss: true,
  steps: [
    { type: 'theory', content: '🐉 **Boss 先开工：四件套交付**\n今天必须交：15—30 秒成片、关键原理说明（看图/画图/视频/音频链路）、问题修复日志、发布检查表。图文故事或原型不算完成。' },
    {
      type: 'interactive',
      interactiveKind: 'diagnose',
      interactiveTitle: '发布前红队诊断：真实缺陷一眼抓',
      interactiveInstruction: '逐条判断是否为“必须修复的上线阻断项”。点击即可看即时解释。',
      interactiveItems: [
        { label: '旁白里出现一个关键事实数字与来源不一致', detail: '这是事实性高风险缺陷，必须修正并可回查。', correct: true },
        { label: '背景音乐授权文件找不到原始凭证', detail: '版权证据缺失即上线风险，应替换或补齐授权证明。', correct: true },
        { label: '字幕整体晚 0.7 秒，关键词错过画面证据点', detail: '时序失配会直接损害理解，属于必须修复项。', correct: true },
        { label: '片尾未标注 AI 参与环节但其余全部通过', detail: '透明披露缺失仍是发布缺陷，不应忽略。', correct: true }
      ]
    },
    { type: 'theory', content: '📚 **卡 1｜原理要能讲清**\n至少能解释：视觉编码器如何看图、Diffusion 如何生图、关键帧如何成视频、TTS/ASR 如何校对音频。' },
    { type: 'theory', content: '🎬 **卡 2｜修复日志**\n记录至少两次修复：问题现象、定位原因、调整参数或提示、修复结果。让作品“可追溯”。' },
    { type: 'theory', content: '✅ **卡 3｜发布终检**\n成片、事实来源、版权许可、隐私、AI 标注五项全部通过才可发布；任一不通过就回修。' },
    ...graded,
    { type: 'theory', content: '🏆 **Week 3 完成**\n你已经把可靠资料、原创主视觉、连续镜头、配音字幕和发布责任合成一支 15—30 秒知识故事短片。真正完成的标志不是“AI 已生成”，而是成片可播放、事实可回查、素材可使用、观众能看懂。' },
  ],
};
