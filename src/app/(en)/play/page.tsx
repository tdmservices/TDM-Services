import { PlayIndexView } from "@/views/PlayViews";
import { localizedMetadata } from "@/lib/meta";
import { getPlay } from "@/content/play";

const locale = "en" as const;

export const revalidate = 60;

export function generateMetadata() {
  const hub = getPlay(locale).hub;
  return localizedMetadata(locale, "/play/", hub.metaTitle, hub.metaDescription);
}

export default function Page() {
  return <PlayIndexView locale={locale} />;
}
