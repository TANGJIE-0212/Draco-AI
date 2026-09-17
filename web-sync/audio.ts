export type Effect = 'map-tap' | 'map-enter' | 'correct' | 'wrong' | 'complete';
// Reuse native WAVs and volumes; browsers cannot provide WeChat haptics.
export function playWebEffect(effect: Effect): () => void {
  const audio = new Audio(`${import.meta.env.BASE_URL}brand/${effect}.wav`);
  audio.volume = effect === 'map-enter' ? .32 : .45;
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    audio.pause(); audio.removeAttribute('src'); audio.load();
    document.removeEventListener('visibilitychange', visibility);
  };
  const visibility = () => { if (document.hidden) dispose(); };
  audio.onended = dispose;
  audio.onerror = dispose;
  document.addEventListener('visibilitychange', visibility);
  void audio.play().catch(dispose);
  return dispose;
}
