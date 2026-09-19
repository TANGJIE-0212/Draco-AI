type DraftStorage = { read(key: string): unknown; write(key: string, value: unknown): void };
const prefix = 'draco-ai:practice-draft:v1:';
export const MAX_DRAFT_LENGTH = 10000;

// Persist text only: restoring a draft must never restore self-check or completion.
export function createDraftStore(storage: DraftStorage) {
  return {
    read(id: string): { text: string; error: boolean } {
      try {
        const value = storage.read(prefix + id);
        if (value == null || value === '') return { text: '', error: false };
        if (typeof value !== 'object' || (value as any).version !== 1 || typeof (value as any).text !== 'string' || (value as any).text.length > MAX_DRAFT_LENGTH) {
          return { text: '', error: true };
        }
        return { text: (value as { text: string }).text, error: false };
      } catch { return { text: '', error: true }; }
    },
    write(id: string, text: string): boolean {
      if (text.length > MAX_DRAFT_LENGTH) return false;
      try {
        const key = prefix + id;
        storage.write(key, { version: 1, text });
        const saved = storage.read(key) as { version?: number; text?: string } | undefined;
        return saved?.version === 1 && saved.text === text;
      } catch { return false; }
    },
  };
}
