import { readFileSync } from "node:fs";

/**
 * The site used to be a static export. It stopped being one when blog posts and
 * case studies moved into Postgres: a folder of pre-built HTML cannot show a
 * post that was written after the build, so the app now runs on Vercel and
 * renders those pages from the database.
 *
 * Pages that read content are still cached and revalidated rather than hitting
 * the database on every request — see the `revalidate` exports on those routes.
 *
 * The redirects from the old WordPress URLs and the response headers live in
 * vercel.json. They are applied here as well, so they hold on any Node.js host
 * (`next start`) and not only on Vercel.
 *
 * This file is plain JavaScript on purpose. Some hosts cannot load the native
 * Next.js compiler (it needs glibc 2.29 or newer) and fall back to the
 * WebAssembly one, which fails to load a TypeScript config. For the same reason
 * the build script uses webpack: Turbopack has no WebAssembly fallback.
 */
const vercelConfig = JSON.parse(
  readFileSync(new URL("./vercel.json", import.meta.url), "utf8"),
);

/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // One designed 404 for addresses that match no route. See global-not-found.tsx.
  experimental: { globalNotFound: true },
  redirects: async () => vercelConfig.redirects,
  headers: async () => vercelConfig.headers,
};

export default nextConfig;
