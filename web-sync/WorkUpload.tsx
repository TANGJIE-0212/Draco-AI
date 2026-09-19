import React, { useEffect, useRef, useState } from 'react';

type Work = { id: string; lesson: string; name: string; file: Blob; savedAt: number };
const MAX_BYTES = 25 * 1024 * 1024;
const database = () => new Promise<IDBDatabase>((resolve, reject) => {
  let blocked = false;
  const request = indexedDB.open('draco-ai-work', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('works', { keyPath: 'id' }).createIndex('lesson', 'lesson');
  request.onsuccess = () => { if (blocked) request.result.close(); else resolve(request.result); };
  request.onerror = () => reject(request.error);
  request.onblocked = () => { blocked = true; reject(new Error('database blocked')); };
});
async function savedWorks(lesson: string): Promise<Work[]> {
  const db = await database();
  try { return await new Promise((resolve, reject) => {
    const tx = db.transaction('works');
    const request = tx.objectStore('works').index('lesson').getAll(lesson);
    tx.oncomplete = () => resolve(request.result.filter((work: Work) => work.file?.size > 0));
    tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
  }); } finally { db.close(); }
}
async function saveWork(work: Work): Promise<void> {
  const db = await database();
  try { await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('works', 'readwrite'); tx.objectStore('works').put(work);
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
  }); } finally { db.close(); }
}

export function WorkUpload({ lesson, en, onSaved }: { lesson: string; en: boolean; onSaved: (saved: boolean) => void }) {
  const tr = (zh: string, english: string) => en ? english : zh;
  const [works, setWorks] = useState<Work[]>([]);
  const [busy, setBusy] = useState(true);
  const [notice, setNotice] = useState('');
  const mounted = useRef(true);
  const generation = useRef(0);
  const uploadLock = useRef(false);
  useEffect(() => {
    mounted.current = true; generation.current++; let active = true;
    setWorks([]); setBusy(true); setNotice(''); onSaved(false);
    savedWorks(lesson).then(records => { if (active) { setWorks(records); onSaved(records.length > 0); } })
      .catch(() => { if (active) setNotice(tr('作品记录暂时无法读取，请重试。', 'Could not read saved work. Please try again.')); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; mounted.current = false; generation.current++; };
  }, [lesson]);
  const upload = async (file?: File) => {
    if (!file || uploadLock.current) return;
    if (!file.size || file.size > MAX_BYTES) { setNotice(tr('请选择非空文件，单个文件不超过 25 MB。', 'Choose a non-empty file of up to 25 MB.')); return; }
    if (!/\.(png|jpe?g|webp|gif|heic|mp4|mov|webm|mp3|wav|m4a|aac|ogg|pdf|txt|md)$/i.test(file.name)) {
      setNotice(tr('请上传图片、音频、视频、PDF 或文本作品。', 'Upload an image, audio, video, PDF, or text file.')); return;
    }
    uploadLock.current = true; setBusy(true); setNotice('');
    const uploadGeneration = generation.current;
    const active = () => mounted.current && generation.current === uploadGeneration;
    const id = `${lesson}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    try {
      await saveWork({ id, lesson, name: file.name, file, savedAt: Date.now() });
      const records = await savedWorks(lesson);
      if (!records.some(work => work.id === id && work.file.size === file.size)) throw new Error('read-back failed');
      if (active()) { setWorks(records); onSaved(true); setNotice(tr('作品已保存，可以继续了。', 'Work saved. You can continue.')); }
    } catch { if (active()) setNotice(tr('作品未能保存，请检查剩余空间后重新上传。', 'Could not save your work. Check available storage and try uploading again.')); }
    finally { uploadLock.current = false; if (active()) setBusy(false); }
  };
  return <section className="my-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4 space-y-3">
    <h3 className="font-black text-lg">{tr('上传作品', 'Upload your work')}</h3>
    <p>{tr('前往外部工具完成本题作品，完成后上传，留下你的创作成果。', 'Create your work in an external tool, then upload the result here.')}</p>
    <label className="block"><span className="block mb-2 font-bold">{busy ? tr('正在读取或保存…', 'Reading or saving…') : tr('选择作品文件', 'Choose a work file')}</span>
      <input type="file" disabled={busy} accept=".png,.jpg,.jpeg,.webp,.gif,.heic,.mp4,.mov,.webm,.mp3,.wav,.m4a,.aac,.ogg,.pdf,.txt,.md" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void upload(file); }} className="w-full min-h-12 file:mr-3 file:rounded-xl file:border-2 file:border-b-4 file:border-indigo-700 file:bg-indigo-600 file:px-4 file:py-3 file:font-bold file:text-white disabled:opacity-60" />
    </label>
    {works.map(work => <div key={work.id} className="flex items-center justify-between gap-3"><span className="min-w-0 break-all">{work.name}</span><button type="button" className="shrink-0 font-bold underline min-h-11" onClick={() => { const url = URL.createObjectURL(work.file); const a = document.createElement('a'); a.href = url; a.download = work.name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 30000); }}>{tr('导出', 'Export')}</button></div>)}
    <p role="status">{notice}</p>
    <p className="text-sm text-gray-600">{tr('仅本机保存，每个文件不超过 25 MB。请保留原件，清除数据或卸载后记录可能丢失。', 'Saved only on this device, up to 25 MB per file. Keep originals; clearing data or uninstalling may remove these records.')}</p>
  </section>;
}
