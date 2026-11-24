import { NextResponse, type NextRequest } from "next/server";
import { isHackedUrl } from "@/lib/hacked-urls";

// Everything except Next's own assets and files with an extension.
export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};

export function proxy(request: NextRequest) {
  if (isHackedUrl(request.nextUrl.pathname)) {
    // Same designed page as a 404, but with the status that says "removed".
    return NextResponse.rewrite(new URL("/gone/", request.url), {
      status: 410,
      headers: { "x-robots-tag": "noindex" },
    });
  }
}
