import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. OCR 把“2026”读成“2028”，最先该排查什么？', options: ["字幕字体大小", "文字区域清晰度、倾斜角和对比度", "背景音乐节奏", "输出语言风格"], correct: 1 },
  { type: 'quiz', question: '2. 模型把路灯当成人，最可能是哪类故障？', options: ["对象识别特征混淆", "OCR 断词错误", "ASR 漏词", "帧率过高"], correct: 0 },
  { type: 'quiz', question: '3. “杯子在书前面”被答成“书在杯前”，属于哪类错误？', options: ["图表坐标错读", "空间关系判断错误", "风格迁移失败", "音画不同步"], correct: 1 },
  { type: 'quiz', question: '4. 柱状图 y 轴单位是“万元”，模型按“元”解释，属于？', options: ["对象缺失", "图表语义单位错读", "颜色偏移", "分镜断层"], correct: 1 },
  { type: 'quiz', question: '5. 要验证“裁切导致误判”是否成立，最好的实验是？', options: ["原图与裁切图保持同模型同提示，对照同一问题", "同时换模型和提示词", "只看一次结果就下结论", "先人工猜答案再倒推"], correct: 0 },
  { type: 'quiz', question: '6. 你发现模糊图里对象识别波动大，下一步更科学的是？', options: ["固定其余变量，做清晰版与模糊版对照", "多试几次取自己喜欢的", "直接把不确定结果写成事实", "跳过并假设模型正确"], correct: 0 },
  { type: 'fill', question: '7. 把图中的“字符”读出来属于___能力。', parts: ['把图中字符读出来属于', '___', '。'], options: ["OCR", "ASR", "TTS"], correct: 'OCR' },
  { type: 'fill', question: '8. 判断“谁在谁前后左右”属于___关系理解。', parts: ['这属于', '___', '关系理解。'], options: ["空间", "时间", "语音"], correct: '空间' },
  { type: 'fill', question: '9. 图表题里先看坐标轴和___，可减少读数错误。', parts: ['先看坐标轴和', '___', '。'], options: ["单位", "滤镜", "标题颜色"], correct: '单位' },
  { type: 'quiz', question: '10. 原图可读出“3.5”，高斯模糊后变成“8.5”。你最合理的记录是？', options: ["模型不可信，全部作废", "记为“模糊条件下 OCR 失稳”，并保留原图对照证据", "取两者平均 6.0", "直接选更大的数字"], correct: 1 },
  { type: 'practice', task: '11. 【清楚图和模糊图】选一张带文字的图片，再做一张稍微模糊的版本。让 AI 分别读图，只记录两次答案哪里不同，并解释为什么模糊可能造成错误。', rubric: '使用同一张图片的清楚版和模糊版；记录两次结果；用自己的话解释清晰度怎样影响识别。', placeholder: '原图答案：……\n模糊图答案：……\n不同之处：……\n我的解释：……', minLength: 50, referenceAnswer: '原图中的“12km”读对了，模糊后被读成“72km”。因为字符边缘变模糊，“1”和“7”更容易混淆。' },
  { type: 'match', question: '12. 把 AI 看错的现象和问题连起来：', pairs: [{"left": "把“B2”读成“82”", "right": "图中文字读错"}, {"left": "把椅子认成书包", "right": "物体认错"}, {"left": "把左边说成右边", "right": "位置关系说反"}, {"left": "把百分比当成人数", "right": "图表单位看错"}] },
  { type: 'match', question: '13. 把对照方法和它能检查的事情连起来：', pairs: [{"left": "只改变裁切范围", "right": "检查是不是丢了周围信息"}, {"left": "只把图片变模糊", "right": "检查清晰度的影响"}, {"left": "一次改变很多设置", "right": "很难知道是谁造成变化"}, {"left": "记录每次改了什么", "right": "方便别人重复检查"}] },
  { type: 'match', question: '14. 连线：诊断动作', pairs: [{"left": "OCR 错误集中在小字", "right": "扩大文字区域并提高清晰度"}, {"left": "空间关系反复反转", "right": "加入明确锚点并复测"}, {"left": "图表值偏一个数量级", "right": "先核对轴单位与刻度"}, {"left": "对象类别摇摆", "right": "补充上下文并减少遮挡"}] },
  { type: 'match', question: '15. 连线：真实误解纠正', pairs: [{"left": "裁切后更聚焦，所以一定更准", "right": "可能丢失必要上下文"}, {"left": "模糊只影响美观不影响识别", "right": "边缘信息丢失会直接降准确"}, {"left": "图表只看柱子高低就够", "right": "单位和轴刻度同样关键"}, {"left": "识别错一次就说明模型废了", "right": "应先做受控复测再判断"}] },
];

export const v3w3d2Data: DayContent = {
  day: 2,
  title: '多模态诊断：OCR、对象、空间、图表与视觉幻觉',
  shards: 30,
  steps: [
    { type: 'theory', content: '👁️ **开场｜五类图像理解能力**\n今天分层看五类能力。**OCR（Optical Character Recognition，光学字符识别）**把图片里的字母、数字和汉字读成文字；对象识别判断画面里有什么；空间关系判断前后左右；图表理解读取坐标轴、单位和数值；视觉幻觉则是证据不足时把猜测当成看见的内容。目标是分清“看见了什么”和“脑补了什么”。' },
    {
      type: 'interactive',
      interactiveKind: 'diagnose',
      interactiveTitle: '故障诊断台：OCR/空间/图表/视觉幻觉',
      interactiveInstruction: '阅读症状，选择最可能故障类型。每题都有即时解释。',
      interactiveItems: [
        { label: '路牌“B2”被读成“82”，优先判定：OCR 故障', detail: '字符边缘与形近字符最易混淆，先看清晰度与倾斜角。', correct: true },
        { label: '“杯子在书前面”被答反，优先判定：空间关系故障', detail: '这是前后关系推断错误，不是 OCR。', correct: true },
        { label: '柱状图单位“万元”被当“元”，优先判定：图表语义故障', detail: '坐标轴单位与刻度解释错误是图表常见坑。', correct: true },
        { label: '低清遮挡图里模型补出“看似合理”细节，优先判定：视觉幻觉', detail: '证据不足时会用先验脑补，需要标注不确定。', correct: true }
      ]
    },
    { type: 'theory', content: '🔍 **理论卡 1｜OCR 与对象识别**\nOCR 容易受模糊、倾斜、遮挡影响；对象识别可能把相似轮廓误判为常见物体。' },
    { type: 'theory', content: '🧩 **理论卡 2｜空间与图表理解**\n“左/右、前/后、遮挡关系”和图表坐标轴单位是常见错误点，尤其容易在复杂背景中读错。' },
    { type: 'theory', content: '🌫️ **理论卡 3｜视觉幻觉**\n当证据不足时模型会用先验模式自动补全，生成“看起来合理”的错误。对低置信区域要显式标注不确定。' },
    ...graded,
    { type: 'theory', content: '✅ **结尾｜图片观察卡完成**\n你已经记录图片来源、至少三条可见细节、一条可能解释、两个不确定处，以及它对应的 D1 脚本句。明天会把这些可靠线索变成知识主视觉。' },
  ],
};
