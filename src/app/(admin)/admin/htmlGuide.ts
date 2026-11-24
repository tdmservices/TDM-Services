/**
 * The brief a writer gives to Claude before asking it for a page, post or case
 * study. It describes exactly what the site's HTML filter keeps and which
 * ready-made blocks and animations exist, so the HTML that comes back works
 * the first time it is pasted into the admin.
 *
 * Keep this in step with src/lib/html.ts (what is allowed), globals.css (the
 * .tdm-html blocks) and HtmlWidgets.tsx (the data attributes).
 */
export const HTML_GUIDE = `You are writing content for thedigitalmarketing.services (TDM: The Digital Marketing Services). The site adds its own header, footer and closing call-to-action. Give me ONLY the HTML that goes in between, as one HTML fragment I can paste into the site's admin.

RULES
- No <html>, <head>, <body>, header, navigation or footer. Start straight with the content.
- No <script> tags and no onclick/onload attributes. They are removed. Use the data attributes below for interactivity.
- No <form> or <input>. For contact, link to /contact/.
- A <style> block is allowed and is automatically limited to this content. Do not use @import. Prefer the ready-made classes below so the page matches the site.
- Images: use full https URLs I give you, always with descriptive alt text, width and height.
- Embeds: only YouTube, Vimeo, Google Maps, Calendly and Loom iframes are kept.
- Headings: at most one <h1> (for a page; leave it out for a blog post or case study, which already have a title). Use <h2> for sections and <h3> inside them. Every <h2> becomes an entry in the table of contents.
- Links to our own pages use paths starting with / and ending with /, for example /marketing/seo/ or /contact/.
- Write for people first. Answer the main question in the first two sentences of each section. Use specific facts, and do not invent statistics, clients or testimonials.

BRAND COLOURS (as CSS variables)
var(--color-forest) #0f3527 dark green · var(--color-pine) #1b5e43 · var(--color-fern) #2e7d5b · var(--color-sage) #6ba58c · var(--color-mint) #dfede6 pale green · var(--color-cream) #f7f5ef page background · var(--color-ink) #10241c text · var(--color-amber) #e8862d accent · var(--color-plum) #453a75

READY-MADE BLOCKS (class names)
- <section class="band">…</section>            dark green rounded band; add "light" for a pale one. Good for an opening or a closing call to action.
- <p class="kicker">Label</p>                  small uppercase label above a heading
- <p class="lead">…</p>                        larger opening paragraph
- <div class="grid-2|grid-3|grid-4">…</div>    responsive columns
- <div class="card">…</div>                    white card that lifts on hover
- <div class="stats"><div class="stat"><b data-count="350" data-suffix="K">350K</b><span>monthly sessions</span></div>…</div>
- <div class="callout">…</div>                 highlighted note; add "tip" (amber) or "warn" (red)
- <ol class="steps"><li><h3>Step</h3><p>…</p></li>…</ol>   numbered timeline
- <ul class="checklist"><li>…</li></ul>        ticks instead of bullets
- <div class="split">…two children…</div>      two columns, text beside image
- <blockquote class="quote">…<cite>Name, role</cite></blockquote>
- <div class="actions"><a class="btn" href="/contact/">Book a free consultation</a><a class="btn-outline" href="/case-studies/">See results</a></div>
- <span class="badge">Label</span> inside <div class="badges">
- <div class="center">, <div class="narrow">   centred text, narrower column
- Tables: a plain <table> with <thead> and <tbody> is styled and scrolls sideways on phones.
- FAQ / accordion: <details><summary>Question?</summary><p>Answer.</p></details>

INTERACTIVE ATTRIBUTES
- data-reveal="up|down|left|right|zoom|fade"   element animates in when scrolled into view; add data-reveal-delay="150" (milliseconds) to stagger.
- data-count="350" with optional data-prefix="$" and data-suffix="%"   number counts up when visible. Put the final value as the text too, so it reads correctly without JavaScript.
- Tabs:
  <div data-tabs>
    <div class="tab-list"><button data-tab="a">First</button><button data-tab="b">Second</button></div>
    <div data-panel="a">…</div>
    <div data-panel="b">…</div>
  </div>
- Progress bar: <div class="progress" data-progress="72"><span></span></div>
- Copy button: <button data-copy="text to copy">Copy</button>
- Gentle motion classes: float, pulse, shimmer

EXAMPLE SKELETON
<section class="band" data-reveal="up">
  <p class="kicker">SEO agency in Miami</p>
  <h1>SEO that brings Miami customers to your door</h1>
  <p class="lead">One or two sentences that answer what the visitor came for.</p>
  <div class="actions"><a class="btn" href="/contact/">Book a free consultation</a></div>
</section>

<h2>What you get</h2>
<div class="grid-3">
  <div class="card" data-reveal="up"><h3>Technical SEO</h3><p>…</p></div>
  <div class="card" data-reveal="up" data-reveal-delay="100"><h3>Content</h3><p>…</p></div>
  <div class="card" data-reveal="up" data-reveal-delay="200"><h3>Links</h3><p>…</p></div>
</div>

<h2>Frequently asked questions</h2>
<details><summary>How long does SEO take?</summary><p>…</p></details>

Now write: [describe the page, post or case study here, the language, and the audience]`;
