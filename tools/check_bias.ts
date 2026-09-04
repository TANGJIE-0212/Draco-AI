import { ALL_CURRICULUM } from '../curriculum.ts';

const dist: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
let totalQuiz = 0;

for (let w = 1; w <= 4; w++) {
  const days = ALL_CURRICULUM[w];
  if (!days) continue;
  days.forEach(day => {
    day.steps.forEach(step => {
      if (step.type === 'quiz') {
        totalQuiz++;
        const c = typeof step.correct === 'number' ? step.correct : -1;
        dist[c] = (dist[c] || 0) + 1;
      }
    });
  });
}

console.log('Total Quizzes:', totalQuiz);
console.log('Distribution:');
Object.entries(dist).forEach(([idx, count]) => {
  const pct = ((count / totalQuiz) * 100).toFixed(1);
  console.log(`  Option Index ${idx}: ${count} (${pct}%)`);
});
