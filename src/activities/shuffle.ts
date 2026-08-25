export function shuffled<T>(items: readonly T[], enabled: boolean): T[] {
  const next = items.slice();
  if (!enabled || next.length < 2) return next;
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = next[index];
    next[index] = next[swap] as T;
    next[swap] = current as T;
  }
  return next;
}
