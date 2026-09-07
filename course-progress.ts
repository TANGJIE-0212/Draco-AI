export const PROGRESS_KEY = 'draco-ai:v3:progress';
export type CompletedDays = Record<number, number>;
type ProgressError = 'unavailable' | 'invalid' | null;

const emptyProgress = (): CompletedDays => ({ 1: 0, 2: 0, 3: 0, 4: 0 });
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function loadProgress(): { completedDays: CompletedDays; error: ProgressError } {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(PROGRESS_KEY);
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
    return { completedDays: emptyProgress(), error: 'unavailable' };
  }
  if (raw === null) return { completedDays: emptyProgress(), error: null };

  let saved: unknown;
  try {
    saved = JSON.parse(raw);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    return { completedDays: emptyProgress(), error: 'invalid' };
  }
  if (!isRecord(saved) || saved.version !== 1 || !isRecord(saved.completedDays)) {
    return { completedDays: emptyProgress(), error: 'invalid' };
  }
  const completedDays = emptyProgress();
  let previousWeekComplete = true;
  for (let week = 1; week <= 4; week += 1) {
    const days = saved.completedDays[week];
    if (typeof days !== 'number' || !Number.isInteger(days) || days < 0 || days > 7 || (!previousWeekComplete && days !== 0)) {
      return { completedDays: emptyProgress(), error: 'invalid' };
    }
    completedDays[week] = days;
    previousWeekComplete = days === 7;
  }
  return { completedDays, error: null };
}

export function saveProgress(completedDays: CompletedDays): ProgressError {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify({ version: 1, completedDays }));
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
    return 'unavailable';
  }
  return null;
}

export function progressPosition(completedDays: CompletedDays) {
  for (let week = 1; week <= 4; week += 1) {
    if (completedDays[week] < 7) return { week, day: completedDays[week] + 1, complete: false };
  }
  return { week: 4, day: 7, complete: true };
}
