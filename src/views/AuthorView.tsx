import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, localePrefix } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getBlogPosts } from "@/content/db";
import { AUTHOR_SLUGS, getAuthor } from "@/content/authors";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

const COPY = {
  en: { kicker: "Author", articles: (n: string) => `Articles by ${n}`, none: "No articles published yet.", blog: "Blog", meta: (n: string, r: string) => `Articles by ${n}, ${r} at TDM: guides on marketing, media, web development and staff augmentation.` },
  fr: { kicker: "Auteur", articles: (n: string) => `Articles de ${n}`, none: "Aucun article publié pour le moment.", blog: "Blog", meta: (n: string, r: string) => `Les articles de ${n}, ${r} chez TDM : des guides sur le marketing, la création média, le développement web et le renfort d'équipes.` },
  ar: { kicker: "الكاتب", articles: (n: string) => `مقالات ${n}`, none: "لا توجد مقالات منشورة بعد.", blog: "المدونة", meta: (n: string, r: string) => `مقالات ${n}، ${r} في TDM: أدلة عن التسويق والإنتاج الإعلامي وتطوير المواقع وتعزيز فرق العمل.` },
} as const;

const DATE_LOCALE: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", ar: "ar-AE-u-nu-latn" };

export const authorMeta = (locale: Locale, slug: string) => {
  if (!AUTHOR_SLUGS.includes(slug)) return null;
  const a = getAuthor(locale, slug);
  return { title: `${a.name} | TDM`, description: COPY[locale].meta(a.name, a.role).slice(0, 160) };
};

/** One author: who they are and everything published under their name. */
export async function AuthorView({ locale, slug }: { locale: Locale; slug: string }) {
  if (!AUTHOR_SLUGS.includes(slug)) notFound();
  const author = getAuthor(locale, slug);
  const copy = COPY[locale];
  const t = ui[locale];
  const posts = (await getBlogPosts(locale)).filter((p) => p.author === author.slug).sort((a, b) => b.date.localeCompare(a.date));
  const url = `${site.url}${localePrefix(locale)}/blog/author/${author.slug}/`;
  const org = { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url,
          inLanguage: locale,
          mainEntity: author.isTeam
            ? org
            : {
                "@type": "Person",
                "@id": `${site.url}/blog/author/${author.slug}/#person`,
                name: author.name,
                jobTitle: author.role,
                description: author.bio[0],
                url,
                ...(author.photo ? { image: `${site.url}${author.photo}` } : {}),
                worksFor: org,
              },
        }}
      />
      <PageHero kicker={copy.kicker} headline={author.name} sub={author.role} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: copy.blog, href: href(locale, "/blog/") },
          { label: author.name, href: href(locale, `/blog/author/${author.slug}/`) },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
          {author.photo && (
            <Reveal from="left">
              <Image src={author.photo} alt={author.name} width={220} height={220} className="h-44 w-44 rounded-3xl border border-mint object-cover shadow-xl shadow-forest/10" />
            </Reveal>
          )}
          <Reveal from="right">
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-ink/85 md:text-lg">
              {author.bio.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-forest">{copy.articles(author.name)}</h2>
        {posts.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-mint px-6 py-10 text-center text-ink/60">{copy.none}</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={href(locale, `/blog/${p.slug}/`)}
                    className="card-lift flex h-full flex-col rounded-3xl border border-mint bg-white p-7 transition-colors duration-300 hover:border-fern hover:shadow-2xl"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber">{p.category}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-forest">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{p.excerpt}</p>
                    <span className="mt-4 text-xs text-ink/50">
                      {new Date(p.date).toLocaleDateString(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
