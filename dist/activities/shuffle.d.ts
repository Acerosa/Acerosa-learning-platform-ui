/**
 * Deterministic presentation shuffle for learner option/item banks.
 * Uses Fisher–Yates driven by a seeded PRNG so order stays stable across
 * React rerenders, retries, and cross-device hydrates for the same seed.
 */
/** FNV-1a 32-bit hash of a seed string. */
export declare function hashSeed(seed: string): number;
/** Mulberry32 PRNG — returns values in [0, 1). */
export declare function createSeededRandom(seed: string): () => number;
/** Stable Fisher–Yates shuffle. Same seed + same input order → same output. */
export declare function stableShuffle<T>(items: readonly T[], seed: string): T[];
/**
 * Build a presentation shuffle seed from non-secret activity context.
 * Do not include correct answers or server secrets.
 */
export declare function presentationShuffleSeed(parts: {
    activityId?: string;
    activityVersion?: string;
    questionId?: string;
    blockId?: string;
    shuffleSalt?: string;
}): string;
/**
 * When enabled, returns a deterministic shuffle of `items` using `seed`.
 * When disabled, returns a shallow copy in authored order.
 */
export declare function shuffled<T>(items: readonly T[], enabled: boolean, seed?: string): T[];
