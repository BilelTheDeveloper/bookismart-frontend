/**
 * Client-side in-memory query cache.
 *
 * Features:
 *  - TTL  — entries expire automatically
 *  - SWR  — stale-while-revalidate: serve cached data immediately, refresh in background
 *  - LRU  — max 100 entries; oldest entry evicted when full
 *  - Deduplication — concurrent requests for the same key share one in-flight Promise
 *
 * Security:
 *  - Lives only in the JS heap — never written to localStorage / sessionStorage / IndexedDB
 *  - Wiped on page unload (tab close, navigation)
 *  - No auth tokens, financial data, or PII should ever be passed as cache values;
 *    the calling code (useCachedQuery) enforces this by caching only GET responses.
 */

const MAX_ENTRIES = 100;

class QueryCache {
  constructor() {
    /** @type {Map<string, { data: unknown; storedAt: number; ttl: number; staleAfter: number }>} */
    this._store   = new Map();
    /** @type {Map<string, Promise<unknown>>} */
    this._pending = new Map();
  }

  /**
   * Read a cached entry.
   * @returns {{ data: unknown; isStale: boolean } | null}
   */
  get(key) {
    const entry = this._store.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.storedAt;

    if (age > entry.ttl) {
      this._store.delete(key);
      return null; // fully expired
    }

    return { data: entry.data, isStale: age > entry.staleAfter };
  }

  /**
   * Store a value.
   * @param {string}  key
   * @param {unknown} data
   * @param {number}  ttl        — ms before entry is fully expired
   * @param {number}  staleAfter — ms before background refresh is triggered (defaults to ttl/2)
   */
  set(key, data, ttl, staleAfter = Math.floor(ttl / 2)) {
    // LRU eviction: remove the oldest entry when the store is full
    if (this._store.size >= MAX_ENTRIES && !this._store.has(key)) {
      const firstKey = this._store.keys().next().value;
      this._store.delete(firstKey);
    }
    this._store.set(key, { data, storedAt: Date.now(), ttl, staleAfter });
  }

  /** Remove a specific key. */
  invalidate(key) {
    this._store.delete(key);
    this._pending.delete(key);
  }

  /** Remove all keys whose name starts with a given prefix. */
  invalidatePrefix(prefix) {
    for (const key of this._store.keys()) {
      if (key.startsWith(prefix)) this._store.delete(key);
    }
    for (const key of this._pending.keys()) {
      if (key.startsWith(prefix)) this._pending.delete(key);
    }
  }

  /** Wipe everything — useful on logout. */
  clear() {
    this._store.clear();
    this._pending.clear();
  }

  // ── In-flight deduplication ────────────────────────────────────────────────
  getPending(key)               { return this._pending.get(key); }
  setPending(key, promise)      { this._pending.set(key, promise); }
  clearPending(key)             { this._pending.delete(key); }
}

export const queryCache = new QueryCache();

// ── TTL CONSTANTS (milliseconds) ─────────────────────────────────────────────
export const CLIENT_TTL = {
  DISCOVERY:    2 * 60_000,   // 2 min
  SITE:        10 * 60_000,   // 10 min
  REVIEWS:      5 * 60_000,   // 5 min
  SLOTS:           30_000,    // 30 s  — short because availability changes often
  ANALYTICS:    5 * 60_000,   // 5 min
  KPI:          3 * 60_000,   // 3 min
  MY_WEBSITE:  10 * 60_000,   // 10 min
  BOOKINGS:        60_000,    // 1 min
  CUSTOMERS:    3 * 60_000,   // 3 min
};
