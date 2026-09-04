import { ALL_CURRICULUM } from '../curriculum.ts';
import fs from 'fs';

interface Issue {
  week: number;
  day: number;
  stepIndex: number;
  type: string;
  category: 'data_integrity' | 'logic_error' | 'pedagogy_issue' | 'media_issue';
  severity: 'high' | 'medium' | 'low';
  summary: string;
  details: string;
}

const issues: Issue[] = [];

// Iterate through weeks 1 to 4
for (let week = 1; week <= 4; week++) {
  const days = ALL_CURRICULUM[week];
  if (!days || days.length !== 7) {
    issues.push({
      week,
      day: 0,
      stepIndex: -1,
      type: 'structure',
      category: 'data_integrity',
      severity: 'high',
      summary: `第 ${week} 周天数异常`,
      details: `预期 7 天，实际找到 ${days ? days.length : 0} 天`
    });
    continue;
  }

  days.forEach((dayContent, dayIdx) => {
    const day = dayContent.day;
    const steps = dayContent.steps;

    let quizCount = 0;
    let fillCount = 0;
    let matchCount = 0;
    let practiceCount = 0;
    let interactiveCount = 0;
    let videoCount = 0;
    let theoryCount = 0;

    // Check title quality
    if (/Day\s*\d+/i.test(dayContent.title) || /HITL|Schema|TTL|PAOU/i.test(dayContent.title)) {
      issues.push({
        week,
        day,
        stepIndex: -1,
        type: 'title',
        category: 'pedagogy_issue',
        severity: 'low',
        summary: `标题含未消化的工程词/英文编号`,
        details: `标题: "${dayContent.title}"`
      });
    }

    steps.forEach((step, sIdx) => {
      // 1. Video Checks
      if (step.type === 'video') {
        videoCount++;
        if (!step.url) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'video', category: 'media_issue', severity: 'medium',
            summary: '视频缺少 URL', details: 'step.url 为空'
          });
        } else if (step.url.startsWith('/video/')) {
          // check if file exists on disk in public
          const diskPath = `./public${step.url}`;
          if (!fs.existsSync(diskPath)) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'video', category: 'media_issue', severity: 'high',
              summary: '视频物理文件不存在', details: `指向的本地文件 ${diskPath} 实际不存在`
            });
          }
        }
      }

      // 2. Interactive Checks
      if (step.type === 'interactive') {
        interactiveCount++;
        if (!step.interactiveKind) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'interactive', category: 'data_integrity', severity: 'high',
            summary: '互动组件缺少 kind', details: 'interactiveKind 未定义'
          });
        } else {
          if (step.interactiveKind === 'compare' || step.interactiveKind === 'diagnose') {
            if (!step.interactiveItems || step.interactiveItems.length < 2) {
              issues.push({
                week, day, stepIndex: sIdx, type: 'interactive', category: 'data_integrity', severity: 'high',
                summary: '对比/诊断组件缺少候选项', details: `interactiveItems 数量: ${step.interactiveItems?.length || 0}`
              });
            } else {
              const hasCorrect = step.interactiveItems.some(i => i.correct === true);
              if (!hasCorrect) {
                issues.push({
                  week, day, stepIndex: sIdx, type: 'interactive', category: 'logic_error', severity: 'high',
                  summary: '对比/诊断组件无正确项', details: '没有项标记为 correct: true'
                });
              }
            }
          } else if (step.interactiveKind === 'sequence') {
            if (!step.interactiveSequence || step.interactiveSequence.length < 3) {
              issues.push({
                week, day, stepIndex: sIdx, type: 'interactive', category: 'data_integrity', severity: 'high',
                summary: '排序组件序列过短', details: `interactiveSequence 项数: ${step.interactiveSequence?.length || 0}`
              });
            }
          }
        }
      }

      // 3. Quiz Checks
      if (step.type === 'quiz') {
        quizCount++;
        if (!step.question || !step.options || step.options.length < 2) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'quiz', category: 'data_integrity', severity: 'high',
            summary: '选择题格式残缺', details: `options 数量: ${step.options?.length || 0}`
          });
        } else {
          // Check correct index validity
          if (typeof step.correct !== 'number' || step.correct < 0 || step.correct >= step.options.length) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'quiz', category: 'logic_error', severity: 'high',
              summary: '选择题正确答案索引越界', details: `correct=${step.correct}, options.length=${step.options.length}`
            });
          }

          // Check for duplicate options
          const uniqueOpts = new Set(step.options);
          if (uniqueOpts.size !== step.options.length) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'quiz', category: 'data_integrity', severity: 'medium',
              summary: '选择题包含重复选项', details: `选项: ${JSON.stringify(step.options)}`
            });
          }

          // Pedagogy: question starts with hardcoded number
          if (/^\d+[\.、\s]/.test(step.question)) {
            // Note: hardcoded numbers
          }
        }
      }

      // 4. Fill in the Blank Checks
      if (step.type === 'fill') {
        fillCount++;
        if (!step.options || step.options.length < 2 || !step.parts || !step.correct) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'fill', category: 'data_integrity', severity: 'high',
            summary: '填空题格式残缺', details: '缺少 options, parts 或 correct'
          });
        } else {
          // Check if correct answer is in options
          if (!step.options.includes(step.correct as string)) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'fill', category: 'logic_error', severity: 'high',
              summary: '填空题正确答案不在选项中', details: `correct="${step.correct}", options=${JSON.stringify(step.options)}`
            });
          }
          // Check if parts contains placeholder ___
          if (!step.parts.includes('___')) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'fill', category: 'logic_error', severity: 'medium',
              summary: '填空题题干缺少占位符 ___', details: `parts=${JSON.stringify(step.parts)}`
            });
          }
        }
      }

      // 5. Match Game Checks
      if (step.type === 'match') {
        matchCount++;
        if (!step.pairs || step.pairs.length < 2) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'match', category: 'data_integrity', severity: 'high',
            summary: '连线题缺少配对项', details: `pairs 数量: ${step.pairs?.length || 0}`
          });
        } else {
          // Check duplicate lefts or rights
          const lefts = new Set(step.pairs.map(p => p.left));
          const rights = new Set(step.pairs.map(p => p.right));
          if (lefts.size !== step.pairs.length || rights.size !== step.pairs.length) {
            issues.push({
              week, day, stepIndex: sIdx, type: 'match', category: 'data_integrity', severity: 'medium',
              summary: '连线题存在重复项', details: `pairs: ${JSON.stringify(step.pairs)}`
            });
          }

          // Check literal clue leak: left and right containing identical unusual word
          step.pairs.forEach(pair => {
            if (pair.left === pair.right) {
              issues.push({
                week, day, stepIndex: sIdx, type: 'match', category: 'pedagogy_issue', severity: 'high',
                summary: '连线题左右项完全相同', details: `left="${pair.left}", right="${pair.right}"`
              });
            }
          });
        }
      }

      // 6. Practice Checks
      if (step.type === 'practice') {
        practiceCount++;
        if (!step.task || !step.rubric || !step.referenceAnswer) {
          issues.push({
            week, day, stepIndex: sIdx, type: 'practice', category: 'data_integrity', severity: 'high',
            summary: '实践题缺少关键字段', details: '缺少 task, rubric 或 referenceAnswer'
          });
        }
      }

      if (step.type === 'theory' || step.type === 'boss') {
        theoryCount++;
      }
    });

    const totalAssessments = quizCount + fillCount + matchCount + practiceCount;
    if (totalAssessments !== 15) {
      issues.push({
        week, day, stepIndex: -1, type: 'assessment_count', category: 'data_integrity', severity: 'high',
        summary: `评估题量不为 15 题`, details: `实际评估题目数: ${totalAssessments} (quiz:${quizCount}, fill:${fillCount}, match:${matchCount}, practice:${practiceCount})`
      });
    }

    if (practiceCount !== 1) {
      issues.push({
        week, day, stepIndex: -1, type: 'practice_count', category: 'data_integrity', severity: 'high',
        summary: `实践题量不为 1 题`, details: `实际实践题数: ${practiceCount}`
      });
    }
  });
}

console.log(JSON.stringify(issues, null, 2));
fs.writeFileSync('./tools/audit_results.json', JSON.stringify(issues, null, 2), 'utf-8');
