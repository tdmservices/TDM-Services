import type { NextRequest } from "next/server";
import { isHackedUrl } from "@/lib/hacked-urls";

// Everything except Next's own assets and files with an extension.
export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};

const GONE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Gone</title></head><body><h1>This page no longer exists.</h1><p><a href="/">Go to the home page</a></p></body></html>`;

export function proxy(request: NextRequest) {
  if (isHackedUrl(request.nextUrl.pathname)) {
    return new Response(GONE, {
      status: 410,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
}
