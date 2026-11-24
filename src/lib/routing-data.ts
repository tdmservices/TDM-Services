/**
 * What the proxy needs to know from the database on every request: the
 * redirects set up in the admin, and which addresses are pages published there.
 *
 * Read over plain REST with the public key and held in memory for a minute, so
 * a request costs a map lookup rather than a database round trip. If a refresh
 * fails the last good copy keeps serving; if there has never been one, the
 * caller gets null and falls back to the rules that need no data.
 */

export interface RoutingData {
  /** Source path without its trailing slash → where it goes. */
  redirects: Map<string, { to: string; permanent: boolean }>;
  /** Public paths (no trailing slash) of pages published from the admin. */
  pages: Set<string>;
}

const TTL = 60_000;
let cached: { at: number; data: RoutingData } | null = null;
let pending: Promise<RoutingData | null> | null = null;

/** "/a/b/" and "/a/b" are the same address; "/" stays "/". */
export const bare = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

async function load(): Promise<RoutingData | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const get = async <T,>(query: string): Promise<T[]> => {
    const res = await fetch(`${url}/rest/v1/${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${query}: ${res.status}`);
    return (await res.json()) as T[];
  };

  const [redirectRows, pageRows] = await Promise.all([
    get<{ source: string; destination: string; permanent: boolean }>(
      "redirects?select=source,destination,permanent&enabled=eq.true",
    ),
    get<{ slug: string; locale: string }>("site_pages?select=slug,locale&published=eq.true"),
  ]);

  const redirects = new Map<string, { to: string; permanent: boolean }>();
  for (const r of redirectRows) redirects.set(bare(r.source), { to: r.destination, permanent: r.permanent });

  const pages = new Set<string>();
  for (const p of pageRows) pages.add(`${p.locale === "en" ? "" : `/${p.locale}`}/${p.slug}`);

  return { redirects, pages };
}

export async function getRoutingData(): Promise<RoutingData | null> {
  if (cached && Date.now() - cached.at < TTL) return cached.data;

  // One refresh at a time, however many requests arrive while it is in flight.
  pending ??= load()
    .then((data) => {
      if (data) cached = { at: Date.now(), data };
      return data;
    })
    .catch((err) => {
      console.error(`[proxy] routing data refresh failed: ${(err as Error).message}`);
      return null;
    })
    .finally(() => {
      pending = null;
    });

  // Serve the stale copy rather than hold the request on a slow database.
  if (cached) return cached.data;
  return pending;
}
