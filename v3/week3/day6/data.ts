import type { DayContent } from '../../../types';

const graded: DayContent['steps'] = [
  { type: 'quiz', question: '1. 22 秒视频配了 180 字旁白，最可能的后果是？', options: ["语速被迫过快，理解下降", "音质自动提升", "字幕会自动压缩", "版权风险消失"], correct: 0 },
  { type: 'quiz', question: '2. TTS 念错专业词，最稳妥的修复顺序是？', options: ["直接发布并在评论解释", "先改旁白文本标注读法，再用 ASR 回听核对", "只调背景音乐", "删掉该术语"], correct: 1 },
  { type: 'quiz', question: '3. 字幕整体晚 0.8 秒，首选操作是？', options: ["逐字重写字幕", "整体时间轴前移约 0.8 秒并抽查关键点", "把视频加速", "改成无字幕"], correct: 1 },
  { type: 'quiz', question: '4. 有旁白的知识短片中，混音优先级通常是？', options: ["音乐优先于人声", "人声清晰优先，其次音乐氛围", "特效声最大", "三者同音量"], correct: 1 },
  { type: 'quiz', question: '5. 你要确认配音是否可在 15—30 秒自然读完，最好怎么做？', options: ["估字数并实测朗读时长", "只看总字数不试读", "交给模型随机判断", "先加速到 1.5 倍"], correct: 0 },
  { type: 'quiz', question: '6. 发布前发现背景音乐来源不明，正确处理是？', options: ["保留并标注“来源未知”", "更换为可授权素材或移除音乐", "降低音量后继续用", "只在校内发布就不用管"], correct: 1 },
  { type: 'fill', question: '7. 把语音转成文字用于校对，叫___。', parts: ['这一步叫', '___', '。'], options: ["ASR", "TTS", "OCR"], correct: 'ASR' },
  { type: 'fill', question: '8. 让文本变成可听旁白，叫___。', parts: ['这一步叫', '___', '。'], options: ["TTS", "Diffusion", "Tokenization"], correct: 'TTS' },
  { type: 'fill', question: '9. 字幕与声音时间点偏离，属于字幕___问题。', parts: ['这属于字幕', '___', '问题。'], options: ["偏移", "清晰度", "分辨率"], correct: '偏移' },
  { type: 'quiz', question: '10. ASR 回听发现“反射”被听成“发射”，你最该做的是？', options: ["保持原样，观众会懂", "回改发音或文本并复测该句时间轴", "只调音乐均衡", "删掉这句话"], correct: 1 },
  { type: 'practice', task: '11. 【20 秒配音检查】写一小段旁白并实际读一遍。记录是否能在 20 秒左右读完，再检查一个容易念错的词、字幕是否跟上、人声是否清楚。', rubric: '必须实际试读；记录时长；检查发音、字幕和人声清晰度三项；给出至少一个修改。', placeholder: '旁白：……\n读完用了：……秒\n容易念错的词：……\n我要修改：……', minLength: 55, referenceAnswer: '旁白读完用了 24 秒，稍快。“反射”容易听成“发射”。我删掉一句次要说明，并在关键词前加停顿，让字幕和声音同时出现。' },
  { type: 'match', question: '12. 把声音问题和原因连起来：', pairs: [{"left": "旁白读得特别赶", "right": "字数太多、时间太短"}, {"left": "专业词经常念错", "right": "机器发音或文本停顿不合适"}, {"left": "字幕总比声音晚", "right": "字幕时间没有对齐"}, {"left": "关键句听不清", "right": "背景音乐盖住人声"}] },
  { type: 'match', question: '13. 把问题和修改办法连起来：', pairs: [{"left": "旁白读不完", "right": "删掉次要句并重新试读"}, {"left": "关键词念错", "right": "调整写法或停顿后重录"}, {"left": "字幕挡住画面重点", "right": "调整位置和分行"}, {"left": "音乐来源不清楚", "right": "换成有明确授权的素材"}] },
  { type: 'match', question: '14. 连线：发布合规项', pairs: [{"left": "事实数字可回原文", "right": "事实核验通过"}, {"left": "音乐/图片来源可证明", "right": "版权核验通过"}, {"left": "无未授权个人信息", "right": "隐私核验通过"}, {"left": "标注 AI 生成或辅助环节", "right": "透明披露通过"}] },
  { type: 'match', question: '15. 连线：真实误解纠正', pairs: [{"left": "字幕对字就够，不用对时", "right": "时序错误会直接影响理解"}, {"left": "音乐越大越有质感", "right": "知识片应先保证人声清晰"}, {"left": "ASR 只是可选玩具", "right": "它是快速查漏词的重要工具"}, {"left": "AI 参与无需说明", "right": "发布应做清晰标注"}] },
];

export const v3w3d6Data: DayContent = {
  day: 6,
  title: '音频链路：TTS、ASR、字幕同步与版权隐私',
  shards: 30,
  steps: [
    { type: 'theory', content: '🎙️ **先试：语音与字幕双通道**\n**TTS（Text-to-Speech，文本转语音）**把文字变成旁白；**ASR（Automatic Speech Recognition，自动语音识别）**把语音转回文字，用来检查错词和漏词；字幕时间轴则让字幕在声音说到对应内容时出现。最后还要检查素材版权与个人隐私。' },
    {
      type: 'interactive',
      interactiveKind: 'sequence',
      interactiveTitle: '音频后期顺序卡：从脚本到发布前核验',
      interactiveInstruction: '把流程排成可执行流水线，顺序正确才不返工。',
      interactiveSequence: ['脚本定稿', 'TTS 生成旁白', 'ASR 回听复核', '字幕时间轴对齐', '混音与版权检查']
    },
    { type: 'theory', content: '🎧 **卡 1｜TTS 与 ASR 回路**\nTTS 负责生成可懂人声，ASR 负责反向听写检查错词、漏词与术语误读。' },
    { type: 'theory', content: '✂️ **卡 2｜字幕与声画同步**\n字幕不仅要对词，还要对时间与镜头信息点，避免“声音说完了字幕才出现”。' },
    { type: 'theory', content: '🛡️ **卡 3｜版权与隐私**\n音乐、音色、图片、字体都要检查使用许可；旁白和字幕不得泄露个人信息；AI 生成内容需清楚标注。' },
    ...graded,
    { type: 'theory', content: '✅ **收进作品盒**\n保存 15—30 秒粗剪和已填写的发布检查表。明天的 Boss 只能提交完成剪辑、配音字幕齐全并通过检查的知识故事短片成片。' },
  ],
};
