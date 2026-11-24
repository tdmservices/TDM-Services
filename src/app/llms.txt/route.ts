import { site } from "@/lib/site";
import { sectors } from "@/content/en/sectors";
import { allServices } from "@/content/en/services";
import { offices } from "@/content/en/locations";
import { getBlogPosts, getCaseStudies } from "@/content/db";
import { ALL_TOOL_SLUGS, getToolSummary } from "@/content/all-tools";

/**
 * /llms.txt — a plain-text map of the site for AI assistants and answer engines.
 *
 * Generated rather than hand-written so it cannot drift: services and locations
 * come from the content files, and articles and case studies from the database,
 * so a post published in the admin appears here without a deploy.
 */
export const revalidate = 3600;

const abs = (path: string) => `${site.url}${path}`;

export async function GET() {
  const [posts, cases] = await Promise.all([getBlogPosts("en"), getCaseStudies("en")]);

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description} TDM works in English, French and Arabic. Headquarters: Dubai, UAE. Delivery hub: Lahore, Pakistan.`,
    "",
    `Contact: ${site.email} · ${site.phone} · Free consultation: ${abs("/contact/")}`,
    "",
    "## Services",
    "",
  ];

  for (const s of sectors) {
    lines.push(`- [${s.name}](${abs(`/${s.slug}/`)}): ${s.tagline}`);
    for (const sv of allServices.filter((x) => x.sector === s.slug)) {
      lines.push(`  - [${sv.name}](${abs(`/${sv.sector}/${sv.slug}/`)}): ${sv.shortDesc}`);
    }
  }

  lines.push("", "## Free tools", "");
  for (const slug of ALL_TOOL_SLUGS) {
    const tool = getToolSummary("en", slug)!;
    lines.push(`- [${tool.name}](${abs(`/tools/${slug}/`)}): ${tool.tagline}`);
  }

  lines.push("", "## Locations", "");
  for (const o of offices) {
    lines.push(`- [${o.city ? `${o.city}, ${o.country}` : o.country}](${abs(`/locations/${o.slug}/`)}): ${o.roleLabel}`);
  }

  if (cases.length > 0) {
    lines.push("", "## Case studies", "");
    for (const cs of cases) {
      const name = cs.anonymous ? cs.publicName : cs.client;
      lines.push(`- [${name}](${abs(`/case-studies/${cs.slug}/`)}): ${cs.summary}`);
    }
  }

  if (posts.length > 0) {
    lines.push("", "## Articles", "");
    for (const p of posts) {
      lines.push(`- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.excerpt}`);
    }
  }

  lines.push(
    "",
    "## More",
    "",
    `- [About](${abs("/about/")})`,
    `- [Portfolio](${abs("/portfolio/")})`,
    `- [Clients](${abs("/clients/")})`,
    `- [Blog](${abs("/blog/")})`,
    `- [Français](${abs("/fr/")})`,
    `- [العربية](${abs("/ar/")})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
