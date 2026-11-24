import { NextResponse, type NextRequest } from "next/server";
import { hasSpamPrefix, hasSpamShape } from "@/lib/hacked-urls";
import { bare, getRoutingData } from "@/lib/routing-data";

// Everything except Next's own assets and files with an extension.
export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};

const gone = (request: NextRequest) =>
  // Same designed page as a 404, but with the status that says "removed".
  NextResponse.rewrite(new URL("/gone/", request.url), {
    status: 410,
    headers: { "x-robots-tag": "noindex" },
  });

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The hack's fixed prefixes need no lookup, and nothing real lives under them.
  if (hasSpamPrefix(pathname)) return gone(request);

  const data = await getRoutingData();
  const path = bare(pathname);

  // Redirects added in the admin.
  const redirect = data?.redirects.get(path);
  if (redirect) {
    const target = new URL(redirect.to, request.url);
    // A redirect onto itself would loop for ever; ignore it.
    if (bare(target.pathname) !== path || target.origin !== request.nextUrl.origin) {
      return NextResponse.redirect(target, redirect.permanent ? 308 : 307);
    }
  }

  // The spam posts are recognised by shape, which a real page published from
  // the admin could share — so only act on it once we know what is published.
  if (data && !data.pages.has(path) && hasSpamShape(pathname)) return gone(request);
}
