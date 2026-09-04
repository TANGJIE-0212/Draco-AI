import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 同一张 224×224 图片，Patch 从 16 改成 14，视觉 Token 数量会怎样变化？', options: ["减少，计算更快", "基本不变", "增加，细节更多但计算更重", "先增加后减少"], correct: 2 },
  { type: 'quiz', question: '2. “视觉编码器”和“语言模型”分工最准确的是？', options: ["两者都直接输出最终答案", "视觉编码器提取图像特征，语言模型组织文本推理与表达", "语言模型先看像素再切 Patch", "视觉编码器负责采样下一个词"], correct: 1 },
  { type: 'quiz', question: '3. 模型把“停车标志”说成“披萨”，最可能先出问题的环节是？', options: ["视频编码", "视觉特征提取或图文对齐", "字幕时间轴", "音频混音"], correct: 1 },
  { type: 'quiz', question: '4. 小 Patch 的优势通常是？', options: ["Token 更少", "细节保留更充分", "一定更不耗显存", "不会产生误识别"], correct: 1 },
  { type: 'quiz', question: '5. 你要快速粗看整图，先尝试哪种设置更合理？', options: ["更大 Patch，先做低成本全局检查", "最小 Patch，直接最高精度", "先关掉视觉编码器", "随机裁掉一半画面"], correct: 0 },
  { type: 'quiz', question: '6. 图里文字“NO ENTRY”被识别成“NO ENERGY”，更应优先怀疑什么？', options: ["语言模型语法能力", "OCR 视觉输入质量与字体特征", "背景音乐过大", "输出温度太低"], correct: 1 },
  { type: 'fill', question: '7. Patch 越小，视觉 Token 通常越___。', parts: ['Patch 越小，视觉 Token 通常越', '___', '。'], options: ["多", "少", "随机"], correct: '多' },
  { type: 'fill', question: '8. 图像先经视觉___提取特征，再交给语言模块。', parts: ['图像先经视觉', '___', '提取特征。'], options: ["编码器", "采样器", "播放器"], correct: '编码器' },
  { type: 'fill', question: '9. 图文对齐失败时，常见现象是文本描述与图像___。', parts: ['常见现象是文本描述与图像', '___', '。'], options: ["不一致", "同义重复", "都变加粗"], correct: '不一致' },
  { type: 'quiz', question: '10. 同一图片下，A 设置识别“1,000m”，B 设置识别“100m”。你优先怎么诊断？', options: ["先固定模型，只改分辨率与 Patch 对照，观察 OCR 稳定性", "直接选看起来更顺眼的数值", "把两者平均成 550m"], correct: 0 },
  { type: 'practice', task: '11. 【AI 看图侦探】选一张同时有物体和文字的图片，让 AI 描述画面并读取文字。对照原图，记录一处答对和一处可能答错的地方，再写出你的核对办法。', rubric: '写清图片内容、AI 的回答、至少一处对照结果和一种核对办法；不能因为回答流畅就默认正确。', placeholder: '图片里有：……\nAI 说：……\n答对的是：……\n可能错的是：……\n我会这样核对：……', minLength: 60, referenceAnswer: '图片里有一辆自行车和一块“入口”指示牌。AI 认对了自行车，却把“入口”读成“出口”。我会放大文字区域重新询问，并自己对照原图确认。' },
  { type: 'match', question: '12. 把 AI 看图的步骤和白话解释连起来：', pairs: [{"left": "把图片切成小块", "right": "方便模型分块处理画面"}, {"left": "寻找颜色、边缘和形状", "right": "帮助认出画面中的物体"}, {"left": "把画面和词语联系起来", "right": "帮助用语言描述图片"}, {"left": "读取海报上的字", "right": "完成看图识字"}] },
  { type: 'match', question: '13. 把看图问题和检查办法连起来：', pairs: [{"left": "小字经常错读", "right": "放大文字并提高图片清晰度"}, {"left": "物体类别常混淆", "right": "检查遮挡和周围场景"}, {"left": "文字描述偏离图片", "right": "逐项对照原图"}, {"left": "同一张图答案变化很大", "right": "固定图片和问题再测试"}] },
  { type: 'match', question: '14. 连线：改动策略', pairs: [{"left": "只想提升细节", "right": "先减小 Patch 或提高分辨率"}, {"left": "算力预算紧张", "right": "先用较大 Patch 做粗筛"}, {"left": "要定位错误来源", "right": "坚持单变量改动"}, {"left": "结果不稳定", "right": "固定输入与流程再复测"}] },
  { type: 'match', question: '15. 连线：真实误解纠正', pairs: [{"left": "Patch 更小就一定更准", "right": "细节更好但噪声与成本也可能上升"}, {"left": "语言模型能替代视觉编码器", "right": "没有视觉特征就无法真实看图"}, {"left": "对齐高分=事实正确", "right": "仍需核对证据与可见细节"}, {"left": "一次成功就可跳过复测", "right": "需复测确认不是偶然命中"}] },
];

export const v3w3d1Data: DayContent = {
  day: 1,
  title: '多模态引擎 I：像素、Patch、视觉 Token、编码器与图文对齐',
  shards: 30,
  steps: [
    { type: 'theory', content: '🐉 **看图链路总览**\n\n**多模态（Multimodal）**指同时处理图片、文字、声音等不同类型的信息。AI 看图时，会先把像素切成 **Patch（图像小块）**；每个小块变成一个 **视觉 Token（可计算的信息单元）**。**视觉编码器（Vision Encoder）**再提取颜色、边缘和形状，最后通过**图文对齐**把画面特征和文字含义联系起来，这样模型才可能用语言描述图片。' },
    { type: 'video', url: '/video/zh/week3/vision.mp4', content: '核心视频：AI 如何把图片切块、提取特征并与文字含义对应。' },
    {
      type: 'interactive',
      interactiveKind: 'sequence',
      interactiveTitle: '链路排序台：从像素到图文对齐',
      interactiveInstruction: '把流程按真实先后排序。拖动后可立即对照解释。',
      interactiveSequence: ['像素输入', '切分 Patch', '形成视觉 Token', '视觉编码器提取特征', '图文语义对齐']
    },
    { type: 'theory', content: '📚 **机制卡 1｜像素到 Patch**\n切块更细会带来更多视觉 Token，细节信息更充分但计算量也更高。分辨率和 Patch 大小会直接影响可读细节。' },
    { type: 'theory', content: '🎯 **机制卡 2｜视觉 Token 与编码器**\n视觉 Token 不是词，而是颜色、纹理、边缘等特征向量。编码器把它们压到可计算表征，供后续跨模态对齐。' },
    { type: 'theory', content: '🧹 **机制卡 3｜图文对齐**\n模型能“看图说话”依赖共享语义空间的对齐训练，但高相似不等于事实正确，仍需证据核验。' },
    ...graded,
    { type: 'theory', content: '✅ **收进作品盒**\n保存脚本来源卡和 15—30 秒旁白初稿。明天让 AI 读取一张与你主题有关的图片，区分“画面真的有什么”和“我们猜它是什么”。' },
  ],
};
