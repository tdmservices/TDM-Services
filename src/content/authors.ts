import type { Locale } from "@/lib/types";
import { getContent } from "@/content";

/**
 * Who a blog post is credited to.
 *
 * Authors are the leadership team already shown on the site, plus the
 * editorial team as the default. A post's author is chosen in the admin and
 * stored as the slug below; a post with none belongs to the editorial team.
 */
export interface Author {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  bio: string[];
  /** The editorial team is an organisation, not a person. */
  isTeam: boolean;
}

export const EDITORIAL = "tdm-editorial-team";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const COPY = {
  en: {
    team: "TDM Editorial Team",
    teamRole: "The Digital Marketing Services",
    teamBio: [
      "The TDM editorial team publishes guides on marketing, media, web development and staff augmentation for business owners and marketing leads.",
      "TDM (The Digital Marketing Services) is an agency working across SEO, paid advertising, social media, websites, video and staff augmentation.",
    ],
    bio: (name: string, role: string) => [
      `${name} is ${role} at TDM (The Digital Marketing Services), an agency working across marketing, media, web development and staff augmentation.`,
    ],
  },
  fr: {
    team: "Équipe éditoriale TDM",
    teamRole: "The Digital Marketing Services",
    teamBio: [
      "L'équipe éditoriale de TDM publie des guides sur le marketing, la création média, le développement web et le renfort d'équipes, à destination des dirigeants et des responsables marketing.",
      "TDM (The Digital Marketing Services) est une agence qui intervient en SEO, publicité payante, réseaux sociaux, sites web, vidéo et renfort d'équipes.",
    ],
    bio: (name: string, role: string) => [
      `${name} occupe le poste de ${role} chez TDM (The Digital Marketing Services), une agence qui intervient en marketing, création média, développement web et renfort d'équipes.`,
    ],
  },
  ar: {
    team: "فريق التحرير في TDM",
    teamRole: "The Digital Marketing Services",
    teamBio: [
      "ينشر فريق التحرير في TDM أدلة عن التسويق والإنتاج الإعلامي وتطوير المواقع وتعزيز فرق العمل، موجهة لأصحاب الأعمال ومسؤولي التسويق.",
      "TDM (The Digital Marketing Services) وكالة تعمل في تحسين محركات البحث والإعلانات المدفوعة ووسائل التواصل الاجتماعي والمواقع والفيديو وتعزيز فرق العمل.",
    ],
    bio: (name: string, role: string) => [
      `يشغل ${name} منصب ${role} في TDM (The Digital Marketing Services)، وهي وكالة تعمل في التسويق والإنتاج الإعلامي وتطوير المواقع وتعزيز فرق العمل.`,
    ],
  },
} as const;

/** Slugs are taken from the English names, so an author keeps one address in every language. */
export const AUTHOR_SLUGS: string[] = [EDITORIAL, ...getContent("en").leadership.map((m) => slugify(m.name))];

export function getAuthors(locale: Locale): Author[] {
  const copy = COPY[locale];
  const english = getContent("en").leadership;
  const people = getContent(locale).leadership.map((m, i) => ({
    slug: slugify(english[i]?.name ?? m.name),
    name: m.name,
    role: m.title,
    photo: m.photo,
    bio: [...copy.bio(m.name, m.title)],
    isTeam: false,
  }));
  return [{ slug: EDITORIAL, name: copy.team, role: copy.teamRole, bio: [...copy.teamBio], isTeam: true }, ...people];
}

export const getAuthor = (locale: Locale, slug: string | undefined): Author => {
  const all = getAuthors(locale);
  return all.find((a) => a.slug === slug) ?? all[0];
};
