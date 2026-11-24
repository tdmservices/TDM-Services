-- Schema for the TDM site content.
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Everything here is idempotent, so re-running it is safe.
--
-- Only blog posts and case studies live in the database — the things that get
-- added over time. Sectors, services, locations and page copy stay in the
-- codebase, because they change when the site changes, not when someone writes
-- a post.

-- ---------------------------------------------------------------------------
-- Blog posts. English only, matching the site.
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  slug              text primary key,
  -- Lower comes first. Decides the "keep reading" set at the foot of a post;
  -- the blog index sorts by date instead.
  sort_order        integer     not null default 99,
  title             text        not null,
  published_on      date        not null,
  category          text        not null,
  excerpt           text        not null,
  -- Markdown-ish: blank lines separate blocks, "## " is a heading, "### " a
  -- sub-heading, and lines starting "- " become a list.
  body              text        not null,
  meta_title        text        not null,
  meta_description  text        not null,
  -- [{ "q": "...", "a": "..." }] — published as FAQ structured data.
  faqs              jsonb       not null default '[]'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Case studies. One row per language, so a study can be published in English
-- while its translations are still being written.
-- ---------------------------------------------------------------------------
create table if not exists public.case_studies (
  slug              text        not null,
  locale            text        not null check (locale in ('en', 'fr', 'ar')),
  -- 0 is featured on the home page and heads the case-studies index.
  sort_order        integer     not null default 99,
  sector            text        not null check (sector in ('marketing', 'development', 'media', 'staff-augmentation')),
  -- While true, only public_name is ever rendered — client is never shown.
  anonymous         boolean     not null default true,
  client            text,
  public_name       text        not null,
  industry          text        not null,
  country           text,
  timeline          text,
  services          jsonb       not null default '[]'::jsonb,  -- ["SEO", …]
  summary           text        not null,
  challenge         text        not null,
  approach          jsonb       not null default '[]'::jsonb,  -- ["para", …]
  results           jsonb       not null default '[]'::jsonb,  -- [{value,label}, …]
  testimonial       jsonb,                                     -- {quote,author}
  meta_title        text        not null,
  meta_description  text        not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  primary key (slug, locale)
);

create index if not exists case_studies_locale_order_idx
  on public.case_studies (locale, sort_order);

create index if not exists case_studies_sector_idx
  on public.case_studies (locale, sector, sort_order);

create index if not exists blog_posts_published_idx
  on public.blog_posts (published_on desc);

-- ---------------------------------------------------------------------------
-- Keep updated_at honest.
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
  for each row execute function public.touch_updated_at();

drop trigger if exists case_studies_touch on public.case_studies;
create trigger case_studies_touch before update on public.case_studies
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security.
--
-- The site reads with the anon key, which ships to the browser, so read access
-- is public — this is published content, and it is all visible on the site
-- anyway. Writing requires a signed-in user, which is what the admin login
-- provides. Without these policies RLS would deny everything, including reads.
-- ---------------------------------------------------------------------------
alter table public.blog_posts   enable row level security;
alter table public.case_studies enable row level security;

drop policy if exists "public read"       on public.blog_posts;
drop policy if exists "authenticated write" on public.blog_posts;
create policy "public read"         on public.blog_posts for select using (true);
create policy "authenticated write" on public.blog_posts for all
  to authenticated using (true) with check (true);

drop policy if exists "public read"       on public.case_studies;
drop policy if exists "authenticated write" on public.case_studies;
create policy "public read"         on public.case_studies for select using (true);
create policy "authenticated write" on public.case_studies for all
  to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Page-level FAQs.
--
-- The FAQ block on the home page and on each sector page used to be fixed in
-- the codebase, so changing a question meant a code change and a deploy. A row
-- here overrides the built-in list for that page and language; no row means the
-- copy in src/content still applies, which is why nothing changes until
-- something is actually saved.
--
-- An empty array is a real answer, not an absent one: it hides the block.
-- ---------------------------------------------------------------------------
create table if not exists public.page_faqs (
  page       text        not null,
  locale     text        not null check (locale in ('en', 'fr', 'ar')),
  -- [{ "q": "...", "a": "..." }] — same shape as blog_posts.faqs.
  faqs       jsonb       not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (page, locale)
);

drop trigger if exists page_faqs_touch on public.page_faqs;
create trigger page_faqs_touch before update on public.page_faqs
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Which case studies a sector page shows.
--
-- By default a sector page lists the first three case studies tagged with that
-- sector, in sort_order. That is a sensible default and a poor control: it
-- cannot show a fourth, cannot reorder without renumbering the studies
-- themselves, and cannot borrow one from another sector.
--
-- A row here names the studies explicitly, in the order given. Slugs are shared
-- across languages, so this is not per-locale.
-- ---------------------------------------------------------------------------
create table if not exists public.page_cases (
  page       text        primary key,
  slugs      jsonb       not null default '[]'::jsonb,  -- ["uae-perfume-store-seo", …]
  updated_at timestamptz not null default now()
);

drop trigger if exists page_cases_touch on public.page_cases;
create trigger page_cases_touch before update on public.page_cases
  for each row execute function public.touch_updated_at();

alter table public.page_faqs  enable row level security;
alter table public.page_cases enable row level security;

drop policy if exists "public read"         on public.page_faqs;
drop policy if exists "authenticated write" on public.page_faqs;
create policy "public read"         on public.page_faqs for select using (true);
create policy "authenticated write" on public.page_faqs for all
  to authenticated using (true) with check (true);

drop policy if exists "public read"         on public.page_cases;
drop policy if exists "authenticated write" on public.page_cases;
create policy "public read"         on public.page_cases for select using (true);
create policy "authenticated write" on public.page_cases for all
  to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Blog posts, per language.
--
-- The table began as a single English list. The site is trilingual, so a post
-- now exists once per language, keyed like case_studies. Existing rows become
-- the English ones.
--
-- A language with no row for a slug falls back to English when the page is
-- rendered, so a post written in any one language is readable in all three from
-- the moment it is saved; a translation added later simply replaces the
-- fallback. That fallback lives in src/content/db.ts, not here.
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'blog_posts' and column_name = 'locale'
  ) then
    alter table public.blog_posts add column locale text not null default 'en';
    alter table public.blog_posts add constraint blog_posts_locale_check
      check (locale in ('en', 'fr', 'ar'));
    alter table public.blog_posts drop constraint blog_posts_pkey;
    alter table public.blog_posts add constraint blog_posts_pkey primary key (slug, locale);
  end if;
end $$;

create index if not exists blog_posts_locale_idx
  on public.blog_posts (locale, published_on desc);

-- ---------------------------------------------------------------------------
-- Table privileges
--
-- Row level security decides which rows a role may touch, but the role still
-- needs the table privilege itself. Newer Supabase projects no longer grant
-- these automatically for tables created in the SQL editor, and without them
-- every read and write fails with "permission denied for table …".
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;

grant select on
  public.blog_posts, public.case_studies, public.page_faqs, public.page_cases
  to anon, authenticated;

grant insert, update, delete on
  public.blog_posts, public.case_studies, public.page_faqs, public.page_cases
  to authenticated;

-- The service role is what scripts and server-side tooling write with. It
-- bypasses row level security but still needs the table privileges.
grant all on
  public.blog_posts, public.case_studies, public.page_faqs, public.page_cases
  to service_role;

-- ---------------------------------------------------------------------------
-- HTML content
--
-- A post or case study can be written as HTML instead of the plain-text body.
-- When `html` is set the site renders it (sanitized) in place of the body.
-- ---------------------------------------------------------------------------

alter table public.blog_posts   add column if not exists html text;
alter table public.case_studies add column if not exists html text;

-- ---------------------------------------------------------------------------
-- Pages published from the admin as HTML
--
-- `slug` is the path without leading or trailing slashes and may contain
-- slashes ("usa/florida/miami"). English pages live at /<slug>/, the others at
-- /fr/<slug>/ and /ar/<slug>/. Only published rows are readable by visitors.
-- ---------------------------------------------------------------------------

create table if not exists public.site_pages (
  slug              text        not null,
  locale            text        not null check (locale in ('en', 'fr', 'ar')),
  title             text        not null,
  html              text        not null default '',
  meta_title        text        not null default '',
  meta_description  text        not null default '',
  published         boolean     not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  primary key (slug, locale)
);

drop trigger if exists site_pages_touch on public.site_pages;
create trigger site_pages_touch before update on public.site_pages
  for each row execute function public.touch_updated_at();

alter table public.site_pages enable row level security;
drop policy if exists "public read published" on public.site_pages;
drop policy if exists "authenticated all"     on public.site_pages;
create policy "public read published" on public.site_pages for select to anon using (published);
create policy "authenticated all"     on public.site_pages for all
  to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- SEO overrides for the pages that are defined in the codebase
--
-- `path` is the canonical English path ("/", "/marketing/seo/"). A row
-- replaces that page's built-in title and description in one language.
-- ---------------------------------------------------------------------------

create table if not exists public.page_meta (
  path              text        not null,
  locale            text        not null check (locale in ('en', 'fr', 'ar')),
  meta_title        text,
  meta_description  text,
  updated_at        timestamptz not null default now(),
  primary key (path, locale)
);

drop trigger if exists page_meta_touch on public.page_meta;
create trigger page_meta_touch before update on public.page_meta
  for each row execute function public.touch_updated_at();

alter table public.page_meta enable row level security;
drop policy if exists "public read"         on public.page_meta;
drop policy if exists "authenticated write" on public.page_meta;
create policy "public read"         on public.page_meta for select using (true);
create policy "authenticated write" on public.page_meta for all
  to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Redirects managed from the admin
--
-- `source` is a path beginning with "/" and is matched with and without its
-- trailing slash. `destination` is a path or a full URL.
-- ---------------------------------------------------------------------------

create table if not exists public.redirects (
  id           uuid        primary key default gen_random_uuid(),
  source       text        not null unique check (source like '/%'),
  destination  text        not null,
  permanent    boolean     not null default true,
  enabled      boolean     not null default true,
  note         text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists redirects_touch on public.redirects;
create trigger redirects_touch before update on public.redirects
  for each row execute function public.touch_updated_at();

alter table public.redirects enable row level security;
drop policy if exists "public read"         on public.redirects;
drop policy if exists "authenticated write" on public.redirects;
create policy "public read"         on public.redirects for select using (true);
create policy "authenticated write" on public.redirects for all
  to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Leads
--
-- Every contact-form submission. Visitors may add a row and nothing else: they
-- cannot read, change or delete leads. Only signed-in editors can.
-- ---------------------------------------------------------------------------

create table if not exists public.leads (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null check (char_length(name) between 1 and 200),
  email       text        not null check (char_length(email) between 3 and 320),
  phone       text        check (phone is null or char_length(phone) <= 60),
  service     text        check (service is null or char_length(service) <= 200),
  message     text        check (message is null or char_length(message) <= 5000),
  locale      text,
  page        text        check (page is null or char_length(page) <= 500),
  source      text        not null default 'contact-form',
  status      text        not null default 'new'
                check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  notes       text
);

create index if not exists leads_created_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
drop policy if exists "anyone can submit"   on public.leads;
drop policy if exists "authenticated read"  on public.leads;
drop policy if exists "authenticated write" on public.leads;
drop policy if exists "authenticated delete" on public.leads;
create policy "anyone can submit"    on public.leads for insert to anon, authenticated
  with check (status = 'new' and notes is null);
create policy "authenticated read"   on public.leads for select to authenticated using (true);
create policy "authenticated write"  on public.leads for update to authenticated using (true) with check (true);
create policy "authenticated delete" on public.leads for delete to authenticated using (true);

grant select on public.site_pages, public.page_meta, public.redirects to anon, authenticated;
grant insert, update, delete on public.site_pages, public.page_meta, public.redirects to authenticated;
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;
grant all on public.site_pages, public.page_meta, public.redirects, public.leads to service_role;
