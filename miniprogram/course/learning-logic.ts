// Platform-independent learning rules. Web and iOS import this exact module.
export function shuffleChoices<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// A bounded rejection prevents fully horizontal matching / revealed sequence.
// The rotation fallback also terminates with a mocked or broken random source.
export function concealedChoices<T>(items: T[], random: () => number = Math.random): T[] {
  if (items.length < 2) return [...items];
  for (let attempt = 0; attempt < 32; attempt++) {
    const result = shuffleChoices(items, random);
    if (result.every((item, i) => item !== items[i])) return result;
  }
  return [...items.slice(1), items[0]];
}

export function integerPercentages(weights: number[]): number[] {
  const total = weights.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return weights.map(() => 0);
  const exact = weights.map(value => value / total * 100);
  const result = exact.map(Math.floor);
  const remainder = 100 - result.reduce((sum, value) => sum + value, 0);
  const order = exact.map((value, index) => ({ index, fraction: value - result[index] }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (let i = 0; i < remainder; i++) result[order[i].index]++;
  return result;
}

export function canAdvance(type: string, checked: boolean, correct: boolean, review: boolean): boolean {
  if (type === 'quiz' || type === 'fill') return checked && (!review || correct);
  if (type === 'match' || type === 'interactive') return checked && correct;
  return true;
}

// Five equally weighted training words; pairs never cross a row boundary.
export const BPE_CORPUS = ['小猫吃鱼', '小猫晒太阳', '小猫睡觉', '小狗跑步', '小狗喝水'];
export function bpeRows(merges: string[][] = []): string[][] {
  let rows = BPE_CORPUS.map(word => [...word]);
  for (const [left, right] of merges) rows = rows.map(row => {
    const next: string[] = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === left && row[i + 1] === right) { next.push(left + right); i++; }
      else next.push(row[i]);
    }
    return next;
  });
  return rows;
}
export function bpePairs(rows: string[][]) {
  const counts: Record<string, { left: string; right: string; count: number }> = {};
  for (const row of rows) for (let i = 0; i < row.length - 1; i++) {
    const key = JSON.stringify([row[i], row[i + 1]]);
    if (!counts[key]) counts[key] = { left: row[i], right: row[i + 1], count: 0 };
    counts[key].count++;
  }
  return Object.values(counts);
}
export function validBpeMerge(rows: string[][], left: string, right: string): boolean {
  const pairs = bpePairs(rows);
  const pair = pairs.find(item => item.left === left && item.right === right);
  return !!pair && pair.count === Math.max(...pairs.map(item => item.count));
}
