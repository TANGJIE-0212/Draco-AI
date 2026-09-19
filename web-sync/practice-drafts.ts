import { createDraftStore } from '../miniprogram/course/practice-drafts';

export const practiceDrafts = createDraftStore({
  read(key) { const raw = localStorage.getItem(key); return raw === null ? undefined : JSON.parse(raw); },
  write(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
});
