import { headers } from "next/headers";
import { AuditError, auditUrl } from "@/lib/seo-audit";

/**
 * POST /api/seo-audit/  { "url": "example.com" }
 *
 * Runs the free SEO audit on one page. Limited per visitor, because each call
 * makes the server fetch a page on someone's behalf.
 */
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return true;
}

const STATUS: Record<AuditError["code"], number> = {
  invalid_url: 400,
  blocked: 400,
  not_html: 422,
  too_large: 422,
  http_error: 422,
  unreachable: 502,
};

export async function POST(request: Request) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (!allowed(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let url = "";
  try {
    const body = (await request.json()) as { url?: unknown };
    if (typeof body.url === "string") url = body.url;
  } catch {
    /* handled below as a missing URL */
  }
  if (!url) return Response.json({ error: "invalid_url" }, { status: 400 });

  try {
    return Response.json(await auditUrl(url), { headers: { "cache-control": "no-store" } });
  } catch (err) {
    if (err instanceof AuditError) {
      return Response.json({ error: err.code, detail: err.code === "http_error" ? err.message : undefined }, { status: STATUS[err.code] });
    }
    console.error(`[seo-audit] ${(err as Error).message}`);
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}
