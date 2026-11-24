import type { NextConfig } from "next";
import vercelConfig from "./vercel.json";

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
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  redirects: async () => vercelConfig.redirects,
  headers: async () => vercelConfig.headers,
};

export default nextConfig;
