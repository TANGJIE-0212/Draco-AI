import React, { useState } from 'react';
import { bpeRows, bpePairs, validBpeMerge } from '../miniprogram/course/learning-logic';

export function BpeLab({ en, onComplete }: { en: boolean; onComplete: () => void }) {
  const tr = (zh: string, english: string) => en ? english : zh;
  const [merges, setMerges] = useState<string[][]>([]);
  const [selected, setSelected] = useState<{ row: number; index: number } | null>(null);
  const [notice, setNotice] = useState('');
  const rows = bpeRows(merges);
  const pairs = bpePairs(rows).filter(pair => pair.count > 1);
  const choose = (row: number, index: number) => {
    if (merges.length >= 2) return;
    if (!selected) { setSelected({ row, index }); setNotice(tr('再点同一行右边相邻的字块。', 'Now tap the immediately adjacent tile to its right.')); return; }
    setSelected(null);
    if (row !== selected.row || index !== selected.index + 1) { setNotice(tr('只能从左到右合并同一行相邻的两个字块，请重选。', 'Choose two adjacent tiles in the same row, left to right. Try again.')); return; }
    const pair = [rows[row][selected.index], rows[row][index]];
    if (!validBpeMerge(rows, pair[0], pair[1])) { setNotice(tr('这不是当前最高频的组合。数一数五行中的相邻组合，再试一次。', 'This is not a most frequent pair. Count adjacent pairs across all five rows and try again.')); return; }
    setMerges([...merges, pair]);
    setNotice(tr('合并成功！所有相同组合一起合并，频次也随之更新。', 'Merged every occurrence of this pair. The pair counts have now changed.'));
  };
  return <section className="rounded-2xl border-2 border-indigo-100 bg-white p-5 space-y-4">
    <p>{tr('五条训练片段各出现一次，从单字开始，不跨行合并。依次点击两个相邻字块，选择当前最高频组合，共做两轮。', 'Each of these five training rows occurs once. Treat each character as a symbol; no Chinese knowledge is needed. Tap two adjacent tiles, left to right, to merge a most frequent pair. Never cross rows. Complete two rounds.')}</p>
    <p className="font-bold">{tr('Token 总数', 'Total tokens')}: {rows.reduce((sum, row) => sum + row.length, 0)} · {merges.length}/2</p>
    {rows.map((row, r) => <div key={r} className="flex flex-wrap gap-2">{row.map((text, i) => <button key={i} disabled={merges.length >= 2} aria-pressed={selected?.row === r && selected.index === i} onClick={() => choose(r, i)} className={`min-w-11 min-h-11 px-3 py-2 rounded-xl border-2 border-b-4 font-black ${selected?.row === r && selected.index === i ? 'border-orange-500 bg-orange-100' : 'border-indigo-200 bg-indigo-50'}`}>{text}</button>)}</div>)}
    <p>{tr('重复的相邻组合', 'Repeated adjacent pairs')}: {pairs.map(pair => `${pair.left} + ${pair.right}: ${pair.count}`).join('; ') || tr('每组均出现一次', 'Each pair occurs once')}</p>
    <p role="status">{notice}</p>
    {merges.length === 2 && <button onClick={onComplete} className="w-full rounded-xl bg-green-500 py-3 font-bold text-white">{tr('两轮合并完成', 'Complete the two-round lab')}</button>}
  </section>;
}
