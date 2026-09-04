import { ALL_CURRICULUM } from '../curriculum.ts';
import fs from 'fs';

interface DeepAuditResult {
  week: number;
  day: number;
  title: string;
  stepIdx: number;
  type: string;
  flawType: 'logic_bug' | 'grammar_typo' | 'jargon_overload' | 'clue_leak' | 'bogus_option' | 'practice_barrier';
  location: string;
  contentSnippet: string;
  critique: string;
}

const flaws: DeepAuditResult[] = [];

// 深度审查词库：常见生硬黑话、拼写错误、搞笑凑数选项特征
const jargonWords = [
  'Schema', 'TTL', 'HITL', 'PAOU', 'messageId', 'PERMISSION_DENIED', 'VALIDATION_ERROR', 
  'State Machine', 'Tool Schema', 'Inpaint', 'Outpaint', 'CFG', 'BPE', 'Logits', 'Softmax',
  'Cosine', 'Q/K/V', 'Attention Mask', 'Top-k', 'Top-p', 'RLHF'
];

for (let w = 1; w <= 4; w++) {
  const days = ALL_CURRICULUM[w];
  if (!days) continue;

  days.forEach(day => {
    day.steps.forEach((step, sIdx) => {
      // 1. 检查选择题
      if (step.type === 'quiz') {
        const q = step.question || '';
        const opts = step.options || [];
        const c = step.correct as number;

        // A. 题干带死编号 (例如 "1. ")
        if (/^\d+[\.、\s]/.test(q)) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'quiz',
            flawType: 'grammar_typo',
            location: `题目序号`,
            contentSnippet: q,
            critique: `题干硬编码了序号 "${q.slice(0, 3)}"，在打乱复习或错题模式下会导致序号与系统进度冲突。`
          });
        }

        // B. 搞笑/无意义凑数选项检查
        opts.forEach((opt, oIdx) => {
          if (/随机裁掉|把图片加速|平均成|完全不受|完全废了|运气好|让同学投票/.test(opt)) {
            flaws.push({
              week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'quiz',
              flawType: 'bogus_option',
              location: `选项 ${oIdx + 1}`,
              contentSnippet: `选项: "${opt}"`,
              critique: `明显的凑数搞笑选项，初中生一眼就能排除，无法起到真实测试理解的作用。`
            });
          }
        });

        // C. 过于冗长复杂的选项
        if (opts.some(o => o.length > 50)) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'quiz',
            flawType: 'jargon_overload',
            location: `选项长度`,
            contentSnippet: opts.find(o => o.length > 50) || '',
            critique: `选项文字超过 50 字，初中生在手机小屏幕上阅读负担极重。`
          });
        }
      }

      // 2. 检查填空题
      if (step.type === 'fill') {
        const q = step.question || '';
        const opts = step.options || [];
        const correct = step.correct as string;

        // 题干带编号
        if (/^\d+[\.、\s]/.test(q)) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'fill',
            flawType: 'grammar_typo',
            location: `填空题序号`,
            contentSnippet: q,
            critique: `填空题干硬编码了序号 "${q.slice(0, 3)}"`
          });
        }

        // 选项过于直白或者数量只有2个
        if (opts.length < 3) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'fill',
            flawType: 'bogus_option',
            location: `填空选项过少`,
            contentSnippet: JSON.stringify(opts),
            critique: `填空选项只有 2 个，盲猜正确率高达 50%。`
          });
        }
      }

      // 3. 检查连线题
      if (step.type === 'match') {
        const q = step.question || '';
        const pairs = step.pairs || [];

        // 题干带编号
        if (/^\d+[\.、\s]/.test(q)) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'match',
            flawType: 'grammar_typo',
            location: `连线题序号`,
            contentSnippet: q,
            critique: `连线题干硬编码了序号 "${q.slice(0, 3)}"`
          });
        }

        // 字面直接泄题 (例如左边有"字"，右边也有"字")
        pairs.forEach(pair => {
          const leftWords = pair.left.replace(/[^\u4e00-\u9fa5]/g, '');
          const rightWords = pair.right.replace(/[^\u4e00-\u9fa5]/g, '');
          // 查找共同的2字及以上子串
          for (let i = 0; i < leftWords.length - 1; i++) {
            const sub = leftWords.slice(i, i + 2);
            if (rightWords.includes(sub) && sub.length >= 2 && !['可以', '不能', '一个', '没有'].includes(sub)) {
              flaws.push({
                week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'match',
                flawType: 'clue_leak',
                location: `连线泄题`,
                contentSnippet: `左: "${pair.left}" ⟷ 右: "${pair.right}"`,
                critique: `左右两侧均包含明显相同的词 "${sub}"，学生无需理解即可靠字面连线。`
              });
              break;
            }
          }
        });
      }

      // 4. 检查实践题
      if (step.type === 'practice') {
        const task = step.task || '';
        const ref = step.referenceAnswer || '';
        const minLen = step.minLength || 0;

        if (minLen > 100) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'practice',
            flawType: 'practice_barrier',
            location: `最小字数门槛`,
            contentSnippet: `minLength=${minLen}`,
            critique: `实践题要求最少输入超过 100 字，中学生在手机端手动输入容易产生挫败感。`
          });
        }

        if (ref.length > 250) {
          flaws.push({
            week: w, day: day.day, title: day.title, stepIdx: sIdx, type: 'practice',
            flawType: 'practice_barrier',
            location: `参考答案过长`,
            contentSnippet: `字数=${ref.length}`,
            critique: `参考答案长达 ${ref.length} 字，过于学术化/工程化，缺乏适合青少年的简明示例。`
          });
        }
      }
    });
  });
}

console.log(`\n🔍 深度内容质检完成，共抓取到 ${flaws.length} 处细节硬伤与体验问题！\n`);

// 按类型统计
const stats: Record<string, number> = {};
flaws.forEach(f => {
  stats[f.flawType] = (stats[f.flawType] || 0) + 1;
});
console.log('📊 缺陷分类统计:', stats);

fs.writeFileSync('./tools/deep_flaws.json', JSON.stringify(flaws, null, 2), 'utf-8');
