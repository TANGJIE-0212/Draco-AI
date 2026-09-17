// Stable round-robin: mix topics without reshuffling previous/next navigation.
const categories = ['basics', 'models', 'training', 'prompting', 'retrieval', 'agents', 'multimodal', 'safety'];
const basics = ['token', 'generative-ai', 'nlp', 'emergence', 'system-one-two', 'connectionism', 'symbolic-ai', 'expert-systems', 'paradigm'];
const introductions = ['ai', 'openai', 'deepmind'];
export function studyOrder<T extends { id: string; category: string }>(entries: T[]): T[] {
  const rank = (entry: T) => {
    const preferred = basics.indexOf(entry.id);
    const intro = introductions.includes(entry.id);
    return preferred >= 0 ? preferred : intro ? 900 : 100;
  };
  const groupIds = [...categories, ...new Set(entries.map(entry => entry.category).filter(category => !categories.includes(category)))];
  const groups = groupIds.map(category => entries.filter(entry => entry.category === category).sort((a, b) => rank(a) - rank(b)));
  const result: T[] = [];
  const rounds = Math.max(0, ...groups.map(group => group.length));
  for (let index = 0; index < rounds; index += 1) {
    for (const group of groups) if (group[index]) result.push(group[index]);
  }
  return result;
}
