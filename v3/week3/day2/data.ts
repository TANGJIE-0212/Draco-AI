import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 哪一句最像可核对的事实？', options: ["月球最神秘", "AI 更懂月球", "资料明确说明月球本身不发光", "月球最有价值"], correct: 2 },
  { type: 'quiz', question: '2. 一条证据水晶最少应装什么？', options: ["事实、来源、原文位置", "事实、AI 评分", "事实、个人感受", "事实、发布日期、来源"], correct: 0 },
  { type: 'quiz', question: '3. 两个来源对同一数字不同，正确做法是？', options: ["选最新数字即可", "选引用次数多的数字", "把两个数字平均", "记录差异，查日期和统计口径"], correct: 3 },
  { type: 'quiz', question: '4. “可能”“也许”在资料中通常表示？', options: ["已确认结论", "推测或不确定性", "授权范围", "作者观点"], correct: 1 },
  { type: 'quiz', question: '5. 引用一张公开图片的说明应优先保留？', options: ["评论数量", "转载平台和当前链接", "分辨率和设备", "作者或机构、原始链接、许可"], correct: 3 },
  { type: 'quiz', question: '6. AI 生成了一个漂亮但找不到出处的句子，它应标为？', options: ["原文直接引语", "通顺即可引用的概括", "灵感或待核实说法", "可直接写进科普稿的事实"], correct: 2 },
  { type: 'fill', question: '7. 证据水晶的核心规则是：事实后面跟___。', parts: ['事实后面要跟', '___', '。'], options: ["来源", "原文位置", "发布日期"], correct: '来源' },
  { type: 'fill', question: '8. 同一个来源也要看它发布的___，避免旧信息冒充新信息。', parts: ['核对资料的发布', '___', '。'], options: ["日期", "作者", "访问时间"], correct: '日期' },
  { type: 'fill', question: '9. 把原文中的一整句复制出来，叫作直接___。', parts: ['复制原文句子叫直接', '___', '。'], options: ["引用", "转述", "概括"], correct: '引用' },
  { type: 'fill', question: '10. 不能确定的内容要标成“待___”。', parts: ['不能确定的内容标成待', '___', '。'], options: ["核实", "补充", "讨论"], correct: '核实' },
  { type: 'fill', question: '11. 今天新增的作品组件叫证据___。', parts: ['今天新增的作品组件是证据', '___', '。'], options: ["水晶", "卡片", "标签"], correct: '水晶' },
  { type: 'match', question: '12. 连线：信息状态', pairs: [{"left": "报告写“2024 年游客约 800 万人次”", "right": "事实，仍需核对来源"}, {"left": "“这座馆最值得去”", "right": "观点"}, {"left": "“明年可能新增展厅”", "right": "推测"}, {"left": "AI 写一句但找不到原文", "right": "待核实"}] },
  { type: 'match', question: '13. 连线：水晶字段', pairs: [{"left": "火山灰可影响航空安全", "right": "事实"}, {"left": "国家地理博物馆网页", "right": "来源"}, {"left": "第 2 段第 1 句", "right": "原文位置"}, {"left": "2025 年 3 月更新", "right": "发布日期"}] },
  { type: 'match', question: '14. 连线：核对动作', pairs: [{"left": "网页标注 CC BY 4.0", "right": "按许可要求署名使用"}, {"left": "AI 给出一段引语", "right": "先在原文找到对应句"}, {"left": "两份资料数字不同", "right": "比较日期、单位和统计口径"}, {"left": "只截取原文一句", "right": "确认没有改变原意"}] },
  { type: 'match', question: '15. 连线：作品盒', pairs: [{"left": "一个来源是 2019 年，另一个是 2025 年", "right": "不能直接当作同一时点比较"}, {"left": "想用 AI 总结资料", "right": "要求附原文位置"}, {"left": "把“可能”改成“一定”", "right": "会把推测伪装成事实"}, {"left": "找不到出处", "right": "标为待核实或不用"}] },
];

export const v3w3d2Data: DayContent = {
  day: 2,
  title: '证据水晶：提取事实并保留来源',
  shards: 30,
  steps: [
    { type: 'theory', content: '💎 **先试：给阅读卡装水晶**\n从昨天的公开资料挑两句话，请 AI 按“事实｜来源｜原文位置｜日期”整理。再亲自点开一个链接检查。今天的组件是**证据水晶卡**：一条可复查的事实，不是一句听起来厉害的话。' },
    { type: 'video', url: '', content: '视频：从原文中提取事实，并把出处装进证据水晶' },
    { type: 'theory', content: '🔎 **卡 1｜事实、观点、推测**\n资料明确说的才是事实；“很棒、最重要”常是观点；“可能、预计”提示推测。三者都能用，但标签不能混。' },
    { type: 'theory', content: '🔗 **卡 2｜来源不是装饰**\n写下机构或作者、标题、链接、日期和原文位置。别人能沿着这些线索回去检查，证据才站得稳。' },
    { type: 'theory', content: '🧪 **卡 3｜两分钟验晶**\n打开来源，看它是否真的说了这件事；检查数字的单位和日期；不一致时保留差异，不让 AI 替你“选一个”。' },
    ...graded,
    { type: 'theory', content: '✅ **收进作品盒**\n现在你有阅读卡和至少两颗证据水晶。它们会成为后面图片故事的可靠材料。' },
  ],
};
