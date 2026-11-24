import sanitize from "sanitize-html";

/**
 * Pages, posts and case studies can be written as HTML and pasted into the
 * admin. This is the gate that HTML passes through before it reaches a visitor.
 *
 * What survives: layout and text markup, images, video, tables, SVG, embeds
 * from a short list of hosts, classes, inline styles and <style> blocks.
 *
 * What does not: <script>, inline event handlers (onclick, onload, …),
 * javascript: URLs, forms that post elsewhere, and embeds from unknown hosts.
 * Interactivity comes from the widget classes and data attributes the site
 * already knows how to run (see HtmlWidgets and the HTML guide in the admin),
 * so a page can be animated and interactive without carrying its own code.
 *
 * Only signed-in editors can publish, but the filter is still worth having: a
 * pasted file is rarely read line by line, and one stolen password should not
 * be enough to put a script in front of every visitor.
 */

const EMBED_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "www.google.com", // Maps embeds
  "calendly.com",
  "www.loom.com",
];

const SVG_TAGS = [
  "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", "defs",
  "linearGradient", "radialGradient", "stop", "title", "desc", "text", "tspan", "clipPath", "mask", "use",
];

const SVG_ATTRS = [
  "viewBox", "xmlns", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray",
  "d", "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "points", "transform", "opacity",
  "fill-opacity", "stroke-opacity", "offset", "stop-color", "stop-opacity", "gradientUnits", "gradientTransform",
  "width", "height", "preserveAspectRatio", "text-anchor", "font-size", "font-weight", "clip-path", "mask",
];

/** Anything in CSS that can run code or pull in a remote stylesheet. */
const UNSAFE_CSS = /expression\s*\(|javascript\s*:|vbscript\s*:|@import|behavior\s*:|-moz-binding|<\/?style/i;

const cleanStyleAttr = (value: string | undefined) => (value && !UNSAFE_CSS.test(value) ? value : undefined);

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, " ")
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e: string) => ENTITIES[e])
    .replace(/\s+/g, " ")
    .trim();

/**
 * Split a stylesheet into the at-rules that must stay at the top level
 * (@keyframes, @font-face) and everything else, which is then confined to the
 * pasted content so it cannot restyle the header, footer or the rest of the site.
 */
function scopeCss(css: string): string {
  if (!css.trim() || UNSAFE_CSS.test(css)) return "";

  const top: string[] = [];
  let rest = "";
  let i = 0;
  while (i < css.length) {
    const m = /@(?:-webkit-)?keyframes\b|@font-face\b/g;
    m.lastIndex = i;
    const hit = m.exec(css);
    if (!hit) {
      rest += css.slice(i);
      break;
    }
    rest += css.slice(i, hit.index);
    // Walk to the matching closing brace of this at-rule.
    let depth = 0;
    let j = css.indexOf("{", hit.index);
    if (j === -1) break;
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}" && --depth === 0) break;
    }
    top.push(css.slice(hit.index, j + 1));
    i = j + 1;
  }

  // `:root` in pasted CSS is where custom properties are declared; inside the
  // scope that is the content wrapper. Rules for `html` and `body` are page
  // chrome (margins, a background, a font for the whole document) that would
  // fight the site's own, so they are pointed at a class nothing has.
  const scoped = rest
    .replace(/(^|[\s,{}]):root(?=[\s,{.:#[>+~])/g, "$1:scope")
    .replace(/(^|[\s,{}])(?:html|body)(?=[\s,{.:#[>+~])/g, "$1.tdm-html-page");
  return `${top.join("\n")}\n@scope (.tdm-html) {\n${scoped}\n}`;
}

export interface CleanHtml {
  /** Markup that is safe to render with dangerouslySetInnerHTML. */
  html: string;
  /** The page's own <style> rules, scoped to the content. */
  css: string;
  /** The h2s, for a table of contents. */
  headings: { id: string; text: string }[];
  /** Whether the markup brings its own <h1>. */
  hasH1: boolean;
  /** Plain text, for reading-time estimates. */
  text: string;
}

export function cleanHtml(
  input: string,
  /** `demoteH1`: for posts and case studies, whose title is already the page's <h1>. */
  opts: { demoteH1?: boolean } = {},
): CleanHtml {
  // A whole document may be pasted; keep what is inside <body> and drop the rest.
  let source = input.replace(/<!doctype[^>]*>/gi, "");
  const body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(source);

  // Collect <style> blocks from anywhere in the paste, head included.
  const styles: string[] = [];
  source = source.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css: string) => {
    styles.push(css);
    return "";
  });
  if (body) {
    source = body[1].replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  }

  let html = sanitize(source, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "ul", "ol", "li", "strong", "em", "b", "i", "u", "s",
      "small", "mark", "sup", "sub", "blockquote", "q", "cite", "code", "pre", "kbd", "hr", "br", "wbr",
      "div", "span", "section", "article", "aside", "header", "footer", "nav", "figure", "figcaption",
      "img", "picture", "source", "video", "audio", "track", "table", "thead", "tbody", "tfoot", "tr", "th",
      "td", "caption", "colgroup", "col", "details", "summary", "dl", "dt", "dd", "time", "abbr", "address",
      "button", "iframe", "label", "progress", "meter",
      ...SVG_TAGS,
    ],
    allowedAttributes: {
      "*": ["class", "id", "style", "title", "lang", "dir", "role", "tabindex", "hidden", "aria-*", "data-*"],
      a: ["href", "target", "rel", "download"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
      source: ["src", "srcset", "sizes", "type", "media"],
      video: ["src", "poster", "controls", "autoplay", "muted", "loop", "playsinline", "preload", "width", "height"],
      audio: ["src", "controls", "preload"],
      track: ["src", "kind", "srclang", "label", "default"],
      iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "loading", "frameborder"],
      td: ["colspan", "rowspan", "headers"],
      th: ["colspan", "rowspan", "scope", "headers"],
      col: ["span"],
      colgroup: ["span"],
      ol: ["start", "reversed", "type"],
      li: ["value"],
      time: ["datetime"],
      details: ["open", "name"],
      button: ["type", "disabled"],
      label: ["for"],
      progress: ["value", "max"],
      meter: ["value", "min", "max", "low", "high", "optimum"],
      ...Object.fromEntries(SVG_TAGS.map((t) => [t, SVG_ATTRS])),
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowedIframeHostnames: EMBED_HOSTS,
    allowProtocolRelative: false,
    parseStyleAttributes: false,
    parser: { lowerCaseAttributeNames: false, lowerCaseTags: false },
    transformTags: {
      "*": (tagName, attribs) => {
        const style = cleanStyleAttr(attribs.style);
        const next = { ...attribs };
        if (style) next.style = style;
        else delete next.style;
        return { tagName, attribs: next };
      },
      // A button in pasted content only ever drives a widget; it never submits.
      button: (tagName, attribs) => ({ tagName, attribs: { ...attribs, type: "button" } }),
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.target === "_blank") next.rel = "noopener noreferrer";
        return { tagName, attribs: next };
      },
      iframe: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
    },
  });

  if (opts.demoteH1) html = html.replace(/<(\/?)h1(?=[\s>])/g, "<$1h2");

  // An embed from a host that is not on the list loses its src; drop the empty frame.
  html = html.replace(/<iframe(?![^>]*\ssrc=)[^>]*><\/iframe>/g, "");

  // Give every h2 an id so a table of contents can point at it.
  const headings: { id: string; text: string }[] = [];
  const seen = new Set<string>();
  html = html.replace(/<h2((?:\s[^>]*)?)>([\s\S]*?)<\/h2>/g, (whole, attrs: string, inner: string) => {
    const text = stripTags(inner);
    const existing = /\sid="([^"]+)"/.exec(attrs)?.[1];
    let id = existing ?? (slug(inner) || `section-${headings.length + 1}`);
    while (!existing && seen.has(id)) id = `${id}-${headings.length + 1}`;
    seen.add(id);
    headings.push({ id, text });
    return existing ? whole : `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  return {
    html,
    css: scopeCss(styles.join("\n")),
    headings,
    hasH1: /<h1[\s>]/.test(html),
    text: stripTags(html),
  };
}
