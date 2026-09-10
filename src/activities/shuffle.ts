/**
 * Deterministic presentation shuffle for learner option/item banks.
 * Uses Fisher–Yates driven by a seeded PRNG so order stays stable across
 * React rerenders, retries, and cross-device hydrates for the same seed.
 */

/** FNV-1a 32-bit hash of a seed string. */
export function hashSeed(seed: string): number {
  let hash = 2166136261 >>> 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Mulberry32 PRNG — returns values in [0, 1). */
export function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed) || 1;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable Fisher–Yates shuffle. Same seed + same input order → same output. */
export function stableShuffle<T>(items: readonly T[], seed: string): T[] {
  const next = items.slice();
  if (next.length < 2) return next;
  const random = createSeededRandom(seed);
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    const current = next[index];
    next[index] = next[swap] as T;
    next[swap] = current as T;
  }
  return next;
}

/**
 * Build a presentation shuffle seed from non-secret activity context.
 * Do not include correct answers or server secrets.
 */
export function presentationShuffleSeed(parts: {
  activityId?: string;
  activityVersion?: string;
  questionId?: string;
  blockId?: string;
  shuffleSalt?: string;
}): string {
  const tokens = [
    parts.activityId,
    parts.activityVersion,
    parts.questionId,
    parts.blockId,
    parts.shuffleSalt
  ]
    .map((part) => (part == null ? "" : String(part).trim()))
    .filter(Boolean);
  return tokens.length ? tokens.join("|") : "default";
}

/**
 * When enabled, returns a deterministic shuffle of `items` using `seed`.
 * When disabled, returns a shallow copy in authored order.
 */
export function shuffled<T>(items: readonly T[], enabled: boolean, seed = "default"): T[] {
  if (!enabled || items.length < 2) return items.slice();
  return stableShuffle(items, seed);
}
