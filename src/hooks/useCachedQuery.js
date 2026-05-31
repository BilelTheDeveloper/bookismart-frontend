import { useState, useEffect, useRef, useCallback } from 'react';
import { queryCache } from '../lib/queryCache';

/**
 * Data-fetching hook with client-side caching, SWR, and request deduplication.
 *
 * @param {string|null}  key      - Cache key. Pass null/undefined to skip fetching.
 * @param {() => Promise<unknown>} fetcher - Async function that returns the data.
 * @param {object}       options
 * @param {number}       options.ttl        - Cache lifetime in ms (default 60 000).
 * @param {number}       options.staleAfter - Trigger background refresh after this many ms (default ttl/2).
 * @param {boolean}      options.enabled    - Set false to pause fetching (default true).
 *
 * @returns {{ data, loading, error, refetch }}
 *
 * Usage example:
 *   const { data, loading } = useCachedQuery(
 *     `analytics:${userId}`,
 *     () => API.get('/merchant/insights/analytics').then(r => r.data),
 *     { ttl: CLIENT_TTL.ANALYTICS }
 *   );
 */
export function useCachedQuery(key, fetcher, options = {}) {
  const { ttl = 60_000, staleAfter, enabled = true } = options;
  const resolvedStaleAfter = staleAfter ?? Math.floor(ttl / 2);

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const mounted   = useRef(true);

  // Keep fetcher stable across renders without requiring the caller to memoize it
  const fetcherRef = useRef(fetcher);
  useEffect(() => { fetcherRef.current = fetcher; }, [fetcher]);

  const execute = useCallback(async (bust = false) => {
    if (!enabled || !key) {
      setLoading(false);
      return;
    }

    if (bust) queryCache.invalidate(key);

    // ── Cache hit ─────────────────────────────────────────────────────────
    const cached = !bust && queryCache.get(key);
    if (cached) {
      if (mounted.current) {
        setData(cached.data);
        setLoading(false);
        setError(null);
      }
      if (!cached.isStale) return; // fresh — no network call needed

      // Stale — refresh in background without showing a loading spinner
      _runFetch(key, fetcherRef, ttl, resolvedStaleAfter, mounted, null, null);
      return;
    }

    // ── Cache miss ────────────────────────────────────────────────────────
    if (mounted.current) setLoading(true);

    await _runFetch(
      key,
      fetcherRef,
      ttl,
      resolvedStaleAfter,
      mounted,
      (result) => {
        if (mounted.current) { setData(result); setLoading(false); setError(null); }
      },
      (err) => {
        if (mounted.current) { setError(err); setLoading(false); }
      },
    );
  }, [key, ttl, resolvedStaleAfter, enabled]);

  useEffect(() => {
    mounted.current = true;
    execute();
    return () => { mounted.current = false; };
  }, [execute]);

  const refetch = useCallback(() => execute(true), [execute]);

  return { data, loading, error, refetch };
}

// ─── Internal fetch runner with deduplication ─────────────────────────────────
async function _runFetch(key, fetcherRef, ttl, staleAfter, mounted, onSuccess, onError) {
  // Deduplication: if a fetch for this key is already in-flight, reuse the Promise
  let pending = queryCache.getPending(key);
  if (!pending) {
    pending = fetcherRef.current();
    queryCache.setPending(key, pending);
    pending.finally(() => queryCache.clearPending(key));
  }

  try {
    const result = await pending;
    queryCache.set(key, result, ttl, staleAfter);
    onSuccess?.(result);
  } catch (err) {
    onError?.(err);
  }
}
