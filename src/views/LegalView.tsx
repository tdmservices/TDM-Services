import { Breadcrumbs, PageHero } from "@/components/Sections";
import { getLegalDoc, legalUpdated, type LegalDoc } from "@/content/en/legal";

export function LegalView({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = getLegalDoc(slug);
  const updated = new Date(legalUpdated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero kicker={doc.kicker} headline={doc.title} dark />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: doc.title, href: `/${doc.slug}/` },
        ]}
      />
      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-fern">Last updated: {updated}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">{doc.intro}</p>

          {doc.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="mt-10 font-display text-2xl font-bold text-forest">{sec.heading}</h2>
              {sec.blocks.map((block, i) =>
                Array.isArray(block) ? (
                  <ul key={i} className="mt-4 space-y-2.5 text-base leading-relaxed text-ink/85">
                    {block.map((li) => (
                      <li key={li} className="flex items-start gap-3">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="mt-4 text-base leading-relaxed text-ink/85">
                    {block}
                  </p>
                ),
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
