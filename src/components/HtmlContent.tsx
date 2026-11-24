import { useId } from "react";
import type { CleanHtml } from "@/lib/html";
import { HtmlWidgets } from "@/components/HtmlWidgets";

/**
 * Renders HTML that has been through cleanHtml(): the content itself, its own
 * scoped styles, and the script that switches on the widget attributes.
 */
export function HtmlContent({ content, className = "" }: { content: CleanHtml; className?: string }) {
  const id = `html-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <>
      {content.css && <style dangerouslySetInnerHTML={{ __html: content.css }} />}
      <div id={id} className={`tdm-html ${className}`} dangerouslySetInnerHTML={{ __html: content.html }} />
      <HtmlWidgets target={id} />
    </>
  );
}
