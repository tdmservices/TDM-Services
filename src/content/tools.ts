import type { Faq, Locale } from "@/lib/types";

/**
 * Copy for the free tools, in every language.
 *
 * The tools are the same three everywhere; only the words change. Wording for
 * the SEO audit's checks is keyed by the check ids in src/lib/seo-audit.ts.
 */

export type ToolSlug = "seo-audit" | "roas-calculator" | "staff-augmentation-calculator";

export const TOOL_SLUGS: ToolSlug[] = ["seo-audit", "roas-calculator", "staff-augmentation-calculator"];

export interface ToolCopy {
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  sub: string;
  /** Explains the tool and the idea behind it, under the tool itself. */
  intro: string[];
  faqs: Faq[];
}

interface CheckCopy {
  name: string;
  good: string;
  fix: string;
}

export interface ToolsCopy {
  hub: {
    kicker: string;
    headline: string;
    sub: string;
    metaTitle: string;
    metaDescription: string;
    open: string;
    free: string;
    navLabel: string;
    /** The "get a free audit" button shown beside the consultation button site-wide. */
    auditCta: string;
  };
  tools: Record<ToolSlug, ToolCopy>;
  lead: {
    title: string;
    sub: string;
    name: string;
    email: string;
    send: string;
    sending: string;
    thanks: string;
    error: string;
  };
  audit: {
    label: string;
    placeholder: string;
    run: string;
    running: string;
    score: string;
    scoreOf: string;
    passed: string;
    toImprove: string;
    critical: string;
    checked: string;
    again: string;
    statuses: { pass: string; warn: string; fail: string };
    groups: { basics: string; content: string; technical: string; social: string; ai: string };
    units: { chars: string; words: string; images: string; missing: string; internal: string; external: string; found: string; none: string };
    errors: Record<"invalid_url" | "blocked" | "unreachable" | "not_html" | "too_large" | "http_error" | "rate_limited", string>;
    checks: Record<string, CheckCopy>;
    leadTitle: string;
    leadSub: string;
    /** Offered as soon as the audit finishes: talk the result through on a call. */
    bookTitle: string;
    bookSub: string;
    bookCta: string;
    orEmail: string;
  };
  roas: {
    currency: string;
    aov: string;
    aovHint: string;
    cogs: string;
    cogsHint: string;
    shipping: string;
    shippingHint: string;
    fees: string;
    feesHint: string;
    target: string;
    targetHint: string;
    budget: string;
    budgetHint: string;
    results: string;
    margin: string;
    marginPct: string;
    breakeven: string;
    breakevenHint: string;
    targetRoas: string;
    targetRoasHint: string;
    maxCpa: string;
    maxCpaHint: string;
    revenueNeeded: string;
    ordersNeeded: string;
    profitAtTarget: string;
    noMargin: string;
    impossible: string;
    leadTitle: string;
    leadSub: string;
  };
  staff: {
    currency: string;
    salary: string;
    salaryHint: string;
    overhead: string;
    overheadHint: string;
    team: string;
    teamHint: string;
    results: string;
    localCost: string;
    localCostHint: string;
    tdmCost: string;
    tdmCostHint: string;
    saving: string;
    perYear: string;
    perMonth: string;
    to: string;
    note: string;
    leadTitle: string;
    leadSub: string;
  };
}

const en: ToolsCopy = {
  hub: {
    kicker: "Free tools",
    headline: "Free marketing tools, no sign-up.",
    sub: "Check your website, work out what your ads need to return, and see what a dedicated team would cost. Use them as often as you like.",
    metaTitle: "Free Marketing Tools: SEO Audit & Calculators | TDM",
    metaDescription:
      "Free tools from TDM: an instant SEO audit, a break-even ROAS calculator and a staff augmentation savings calculator. No sign-up needed.",
    open: "Open the tool",
    free: "Free",
    navLabel: "Free Tools",
    auditCta: "Get your free SEO audit",
  },
  tools: {
    "seo-audit": {
      name: "Free SEO Audit",
      tagline: "Check any page for the things search engines and AI assistants read.",
      metaTitle: "Free SEO Audit Tool: Check Any Page Instantly | TDM",
      metaDescription:
        "Enter a web address and get an instant SEO audit: title, description, headings, image alt text, schema, speed, sitemap and AI-search readiness.",
      headline: "Free SEO audit for any page.",
      sub: "Enter a web address. In a few seconds you get a score and a list of what to fix, across 22 checks.",
      intro: [
        "An SEO audit checks whether a page gives search engines what they need to understand and rank it. This tool fetches the page you enter and looks at 22 things: the title and description shown in Google, the heading structure, image alt text, links, mobile set-up, speed, structured data, the sitemap and robots.txt, and how ready the page is to be quoted by AI assistants.",
        "It audits one page at a time and reads the page as a search engine first sees it. It does not measure backlinks, rankings or keyword competition, and it cannot see content that only appears after scripts run. For those, and for a site-wide review, book a consultation and our SEO team will go through it with you.",
      ],
      faqs: [
        {
          q: "Is the SEO audit really free?",
          a: "Yes. There is no charge, no sign-up and no limit on how many pages you check, apart from a short pause if you run many audits in a few minutes. You only give your email if you want our team to review the results with you.",
        },
        {
          q: "What does the SEO audit check?",
          a: "It runs 22 checks in five groups: the basics (indexing, title, description, main heading), content (length, headings, image alt text, links), technical set-up (HTTPS, mobile, canonical, language, speed, robots.txt, sitemap, favicon), social sharing tags, and AI-search readiness (structured data, question-and-answer content, llms.txt and language tags).",
        },
        {
          q: "What is a good SEO score?",
          a: "Above 85 means the page has the fundamentals in place. Between 60 and 85 there are clear improvements to make. Below 60 something important is missing, such as a title, a description or mobile set-up. The score reflects on-page set-up only: a page can score 100 and still need better content and links to outrank competitors.",
        },
        {
          q: "Why can't the tool read my page?",
          a: "The most common reasons are that the address is mistyped, the site blocks automated visitors, the page needs a login, or the page takes too long to respond. Try the full address including https://, or try the home page.",
        },
      ],
    },
    "roas-calculator": {
      name: "Break-even ROAS Calculator",
      tagline: "Find the return on ad spend your ads must reach before they make money.",
      metaTitle: "Break-even ROAS Calculator for E-commerce | TDM",
      metaDescription:
        "Work out your break-even ROAS, target ROAS and maximum cost per order from your order value and costs. Free calculator for e-commerce brands.",
      headline: "What ROAS do your ads need to break even?",
      sub: "Enter what an average order is worth and what it costs you. The calculator shows the return on ad spend at which advertising stops losing money.",
      intro: [
        "ROAS (return on ad spend) is revenue from ads divided by what the ads cost. A ROAS of 3 means every 1 spent on ads brought in 3 of revenue. Break-even ROAS is the point where that revenue only just covers the cost of the products, delivery, fees and the ads themselves. Below it you lose money on every order; above it you profit.",
        "Break-even ROAS depends on your margin, which is why industry benchmarks are a poor guide. A store keeping 70% of each order breaks even at about 1.4, while a store keeping 25% needs 4. This calculator works it out from your own numbers and shows the most you can pay to win one order.",
      ],
      faqs: [
        {
          q: "How is break-even ROAS calculated?",
          a: "Divide the average order value by the money left from that order after product cost, delivery and payment fees, before advertising. If an order is worth 100 and 40 is left after those costs, break-even ROAS is 100 ÷ 40 = 2.5.",
        },
        {
          q: "What is a good ROAS?",
          a: "One that is comfortably above your own break-even figure. There is no universal number: a ROAS of 2 is profitable for a high-margin product and loss-making for a low-margin one. Use the target profit field to see the ROAS that leaves the profit you want.",
        },
        {
          q: "What is the maximum cost per order I can afford?",
          a: "At break-even it equals the margin left on one order before advertising. If 40 is left after product, delivery and fees, you can spend up to 40 in ads to win that order without losing money. To make a profit, your cost per order has to be lower.",
        },
        {
          q: "Does this include repeat purchases?",
          a: "No. It looks at the first order only, which is the cautious view. If customers reliably buy again, you can afford a lower ROAS on the first order, because later orders arrive without new ad spend.",
        },
      ],
    },
    "staff-augmentation-calculator": {
      name: "Staff Augmentation Savings Calculator",
      tagline: "Compare the cost of a local hire with a dedicated team member through TDM.",
      metaTitle: "Staff Augmentation Savings Calculator | TDM",
      metaDescription:
        "Estimate what you could save by adding dedicated developers, designers or marketers through staff augmentation instead of hiring locally.",
      headline: "What would a dedicated team save you?",
      sub: "Enter what a local hire costs you. The calculator shows the typical saving from a dedicated professional employed and managed by TDM.",
      intro: [
        "Staff augmentation means adding dedicated people to your team through a partner who recruits, employs and manages them. They work only for you, on your priorities and in your tools, while the partner handles hiring, payroll, equipment and office space.",
        "Companies in the US, UK and Gulf typically pay 50–70% less for a dedicated professional based at TDM's Lahore office than for an equivalent local hire. This calculator applies that range to your own figures. It is an estimate, not a quote: the actual cost depends on the role and seniority, and we confirm it in writing before anything starts.",
      ],
      faqs: [
        {
          q: "How much can staff augmentation save?",
          a: "Typically 50–70% of the full cost of an equivalent local hire in the US, UK or Gulf. The full cost includes salary plus employer taxes, benefits, equipment and office space, which is why the calculator asks for an overhead percentage on top of salary.",
        },
        {
          q: "What does the overhead percentage cover?",
          a: "Everything an employee costs beyond salary: employer taxes and social contributions, benefits, recruitment fees, equipment, software and office space. It varies by country and company. 25% is a common starting assumption; change it to match your own costs.",
        },
        {
          q: "Is the result a quote?",
          a: "No. It is an estimate based on the typical saving range. The real monthly cost depends on the role, seniority and number of people. Book a free consultation and we will give you a written figure for the team you need.",
        },
        {
          q: "Which roles can I hire through TDM?",
          a: "Developers, designers, video editors, SEO specialists and campaign managers, as full-time dedicated team members. TDM recruits, employs and manages them from our Lahore office.",
        },
      ],
    },
  },
  lead: {
    title: "Want our team to look at this with you?",
    sub: "Leave your details and we will get back to you. No obligation.",
    name: "Your name",
    email: "Email",
    send: "Request a free review",
    sending: "Sending…",
    thanks: "Thank you. We will be in touch shortly.",
    error: "That did not go through. Please email info@thedigitalmarketing.services instead.",
  },
  audit: {
    label: "Web address",
    placeholder: "example.com",
    run: "Run the audit",
    running: "Checking the page…",
    score: "SEO score",
    scoreOf: "out of 100",
    passed: "Passed",
    toImprove: "To improve",
    critical: "Needs fixing",
    checked: "Checked",
    again: "Check another page",
    statuses: { pass: "Good", warn: "Improve", fail: "Fix" },
    groups: { basics: "The basics", content: "Content", technical: "Technical set-up", social: "Social sharing", ai: "AI search readiness" },
    units: { chars: "characters", words: "words", images: "images", missing: "without alt text", internal: "internal", external: "external", found: "Found", none: "none" },
    errors: {
      invalid_url: "That does not look like a web address. Try something like example.com.",
      blocked: "That address cannot be checked. Enter a public website address.",
      unreachable: "We could not reach that page. Check the address, or try again in a moment.",
      not_html: "That address is not a web page. Enter the address of a page, not a file.",
      too_large: "That page is too large to audit.",
      http_error: "The site answered with an error instead of a page. Check that the address is right.",
      rate_limited: "You have run several audits in a short time. Please wait a few minutes and try again.",
    },
    checks: {
      indexable: { name: "Search engines are allowed to index the page", good: "Nothing on the page tells search engines to stay away.", fix: "The page carries a “noindex” instruction, so it cannot appear in search results. Remove it if the page should be found." },
      title: { name: "Page title", good: "The title is present and a good length for search results.", fix: "Write a unique title of roughly 25–60 characters that says what the page offers. Longer titles are cut off in Google." },
      description: { name: "Meta description", good: "The description is present and a good length.", fix: "Add a description of roughly 70–160 characters. It is the text shown under the title in search results, and it decides whether people click." },
      h1: { name: "Main heading (H1)", good: "The page has exactly one main heading.", fix: "Use exactly one H1 that states the page's topic. None, or several, makes the subject unclear." },
      content: { name: "Amount of content", good: "There is enough text for search engines to understand the page.", fix: "The page has little text. Add content that answers what a visitor would ask: 300 words or more is a sensible minimum for a page you want to rank." },
      headings: { name: "Heading structure", good: "Headings are used and follow a clear order.", fix: "Use H2 and H3 headings to divide the page, without skipping levels. A clear outline helps readers and search engines alike." },
      alt: { name: "Image alt text", good: "Images have alternative text.", fix: "Some images have no alt text. Describe each image in a few words so search engines and screen readers know what it shows." },
      links: { name: "Internal links", good: "The page links to other pages on the site.", fix: "Link to related pages on your own site. Internal links help search engines find pages and understand how they relate." },
      https: { name: "Secure connection (HTTPS)", good: "The page is served over HTTPS.", fix: "The page is not served securely. Install an SSL certificate and redirect all traffic to https://." },
      mobile: { name: "Mobile set-up", good: "The page declares a mobile viewport.", fix: "The page has no viewport tag, so it will not display properly on phones. Google ranks sites on their mobile version." },
      canonical: { name: "Canonical address", good: "The page names its own preferred address.", fix: "Add a canonical tag pointing to the page's preferred address, so duplicate versions do not compete with each other." },
      lang: { name: "Language declared", good: "The page states which language it is written in.", fix: "Add a lang attribute to the <html> tag so browsers and search engines know the page's language." },
      speed: { name: "Server response", good: "The server answered quickly.", fix: "The server was slow to respond. Slow pages lose visitors and rank lower: look at hosting, caching and page weight." },
      robots: { name: "robots.txt", good: "The site has a robots.txt file.", fix: "No robots.txt file was found. Add one to tell search engines what they may crawl and where the sitemap is." },
      sitemap: { name: "XML sitemap", good: "The site has a sitemap search engines can read.", fix: "No sitemap was found. An XML sitemap lists your pages so search engines find them all." },
      favicon: { name: "Favicon", good: "The page has a site icon.", fix: "Add a favicon. It appears in browser tabs and beside your result in Google on mobile." },
      opengraph: { name: "Sharing tags (Open Graph)", good: "Title, description and image are set for shared links.", fix: "Add og:title, og:description and og:image so the page shows a proper preview when shared on social media and messaging apps." },
      twitter: { name: "Twitter / X card", good: "A card type is set for X.", fix: "Add a twitter:card tag so links shared on X show a large preview." },
      schema: { name: "Structured data (schema)", good: "The page describes itself with structured data.", fix: "Add schema markup (Organization, Service, Article, FAQ…). It tells search engines and AI assistants exactly what the page is about." },
      faq: { name: "Question-and-answer content", good: "The page marks up questions and answers.", fix: "Add a short FAQ with real customer questions, and mark it up with FAQ schema. Direct answers are what AI assistants quote." },
      llms: { name: "llms.txt", good: "The site offers an llms.txt summary for AI systems.", fix: "Optional: add an llms.txt file summarising the site and its key pages for AI assistants." },
      hreflang: { name: "Language versions (hreflang)", good: "The page points to its other language versions.", fix: "If the site exists in several languages, add hreflang tags so each audience is sent to the right version. Ignore this for a single-language site." },
    },
    leadTitle: "Want these fixed for you?",
    leadSub: "Send us the result and our SEO team will review the whole site, not just this page, and tell you what to do first.",
    bookTitle: "Want an expert opinion on this audit?",
    bookSub: "Book a free call and one of our SEO specialists will go through these results with you and tell you what to fix first.",
    bookCta: "Schedule a free call",
    orEmail: "Prefer email? Leave your details and we will write to you.",
  },
  roas: {
    currency: "Currency",
    aov: "Average order value",
    aovHint: "What a typical customer pays per order.",
    cogs: "Product cost per order",
    cogsHint: "What the goods in that order cost you.",
    shipping: "Delivery and packaging per order",
    shippingHint: "What you pay to get the order to the customer.",
    fees: "Payment and platform fees",
    feesHint: "Card, gateway and marketplace fees, as a percentage of the order.",
    target: "Profit you want to keep",
    targetHint: "As a percentage of the order value, after advertising. Use 0 for break-even.",
    budget: "Monthly ad budget",
    budgetHint: "Optional. Shows the sales that budget must produce.",
    results: "Your numbers",
    margin: "Left per order before ads",
    marginPct: "of the order value",
    breakeven: "Break-even ROAS",
    breakevenHint: "Below this, every order loses money.",
    targetRoas: "ROAS for your target profit",
    targetRoasHint: "Aim for at least this in your ad accounts.",
    maxCpa: "Most you can pay per order",
    maxCpaHint: "At break-even. Stay below it to profit.",
    revenueNeeded: "Revenue the budget must bring",
    ordersNeeded: "Orders needed",
    profitAtTarget: "Profit at target ROAS",
    noMargin: "Your costs are equal to or higher than the order value, so no amount of advertising can be profitable. Raise the price or cut costs first.",
    impossible: "That profit target is higher than the margin left on an order. Lower the target or improve the margin.",
    leadTitle: "Not hitting that ROAS?",
    leadSub: "Our performance team runs campaigns against a break-even figure agreed up front. Ask for a free review of your ad accounts.",
  },
  staff: {
    currency: "Currency",
    salary: "Annual salary of a local hire",
    salaryHint: "Gross salary for the role in your country.",
    overhead: "Overhead on top of salary",
    overheadHint: "Employer taxes, benefits, equipment and office space. 25% is a common starting point.",
    team: "Number of people",
    teamHint: "How many roles you want to fill.",
    results: "Estimated saving",
    localCost: "Full local cost",
    localCostHint: "Salary plus overhead, per year.",
    tdmCost: "Typical cost through TDM",
    tdmCostHint: "50–70% below the local cost.",
    saving: "You could save",
    perYear: "per year",
    perMonth: "per month",
    to: "to",
    note: "An estimate from the typical saving range, not a quote. The actual figure depends on role and seniority.",
    leadTitle: "Get a real figure for your team.",
    leadSub: "Tell us the roles you need and we will send a written cost, with no obligation.",
  },
};

const fr: ToolsCopy = {
  hub: {
    kicker: "Outils gratuits",
    headline: "Des outils marketing gratuits, sans inscription.",
    sub: "Analysez votre site, calculez ce que vos publicités doivent rapporter et estimez le coût d'une équipe dédiée. Utilisez-les autant que vous voulez.",
    metaTitle: "Outils marketing gratuits : audit SEO et calculateurs | TDM",
    metaDescription:
      "Outils gratuits de TDM : audit SEO instantané, calculateur de ROAS au seuil de rentabilité et calculateur d'économies en renfort d'équipe. Sans inscription.",
    open: "Ouvrir l'outil",
    free: "Gratuit",
    navLabel: "Outils gratuits",
    auditCta: "Obtenez votre audit SEO gratuit",
  },
  tools: {
    "seo-audit": {
      name: "Audit SEO gratuit",
      tagline: "Vérifiez sur n'importe quelle page ce que lisent les moteurs de recherche et les assistants IA.",
      metaTitle: "Audit SEO gratuit : analysez une page en quelques secondes | TDM",
      metaDescription:
        "Saisissez une adresse web et obtenez un audit SEO instantané : titre, description, titres, texte alternatif, données structurées, vitesse et préparation à l'IA.",
      headline: "Audit SEO gratuit pour n'importe quelle page.",
      sub: "Saisissez une adresse web. En quelques secondes, vous obtenez un score et la liste des points à corriger, sur 22 contrôles.",
      intro: [
        "Un audit SEO vérifie qu'une page donne aux moteurs de recherche ce dont ils ont besoin pour la comprendre et la classer. Cet outil récupère la page indiquée et examine 22 éléments : le titre et la description affichés dans Google, la structure des titres, le texte alternatif des images, les liens, la configuration mobile, la vitesse, les données structurées, le sitemap et le fichier robots.txt, ainsi que la capacité de la page à être citée par les assistants IA.",
        "Il analyse une page à la fois, telle qu'un moteur de recherche la voit en premier. Il ne mesure ni les backlinks, ni les positions, ni la concurrence sur les mots-clés, et ne voit pas le contenu qui n'apparaît qu'après l'exécution de scripts. Pour cela, et pour une analyse de tout le site, réservez une consultation avec notre équipe SEO.",
      ],
      faqs: [
        {
          q: "L'audit SEO est-il vraiment gratuit ?",
          a: "Oui. Il n'y a ni frais, ni inscription, ni limite au nombre de pages analysées, hormis une courte pause si vous lancez beaucoup d'audits en quelques minutes. Vous ne laissez votre e-mail que si vous souhaitez que notre équipe examine les résultats avec vous.",
        },
        {
          q: "Que vérifie l'audit SEO ?",
          a: "Il effectue 22 contrôles en cinq groupes : les bases (indexation, titre, description, titre principal), le contenu (longueur, titres, texte alternatif, liens), la technique (HTTPS, mobile, canonique, langue, vitesse, robots.txt, sitemap, favicon), les balises de partage et la préparation à la recherche IA (données structurées, questions-réponses, llms.txt et balises de langue).",
        },
        {
          q: "Qu'est-ce qu'un bon score SEO ?",
          a: "Au-dessus de 85, les fondamentaux sont en place. Entre 60 et 85, des améliorations claires sont possibles. En dessous de 60, un élément important manque, comme un titre, une description ou la configuration mobile. Le score ne reflète que la configuration de la page : une page peut atteindre 100 et avoir encore besoin de meilleur contenu et de liens pour dépasser ses concurrents.",
        },
        {
          q: "Pourquoi l'outil ne parvient-il pas à lire ma page ?",
          a: "Le plus souvent, l'adresse est mal saisie, le site bloque les visiteurs automatisés, la page exige une connexion ou elle met trop de temps à répondre. Essayez l'adresse complète avec https://, ou la page d'accueil.",
        },
      ],
    },
    "roas-calculator": {
      name: "Calculateur de ROAS au seuil de rentabilité",
      tagline: "Trouvez le retour sur dépenses publicitaires à atteindre avant de gagner de l'argent.",
      metaTitle: "Calculateur de ROAS au seuil de rentabilité e-commerce | TDM",
      metaDescription:
        "Calculez votre ROAS au seuil de rentabilité, votre ROAS cible et votre coût maximal par commande à partir de votre panier moyen et de vos coûts.",
      headline: "Quel ROAS vos publicités doivent-elles atteindre ?",
      sub: "Indiquez la valeur d'une commande moyenne et ce qu'elle vous coûte. Le calculateur affiche le retour sur dépenses publicitaires à partir duquel la publicité cesse de perdre de l'argent.",
      intro: [
        "Le ROAS (retour sur dépenses publicitaires) est le chiffre d'affaires généré par la publicité divisé par son coût. Un ROAS de 3 signifie que chaque euro dépensé en publicité a rapporté 3 euros de chiffre d'affaires. Le ROAS au seuil de rentabilité est le point où ce chiffre d'affaires couvre tout juste le coût des produits, la livraison, les frais et la publicité elle-même. En dessous, chaque commande perd de l'argent ; au-dessus, vous gagnez.",
        "Ce seuil dépend de votre marge, ce qui rend les moyennes sectorielles peu utiles. Une boutique qui conserve 70 % de chaque commande atteint l'équilibre vers 1,4, alors qu'une boutique qui en conserve 25 % a besoin de 4. Ce calculateur part de vos propres chiffres et indique le maximum que vous pouvez payer pour obtenir une commande.",
      ],
      faqs: [
        {
          q: "Comment calcule-t-on le ROAS au seuil de rentabilité ?",
          a: "On divise le panier moyen par ce qu'il reste de la commande après le coût des produits, la livraison et les frais de paiement, avant publicité. Si une commande vaut 100 et qu'il reste 40 après ces coûts, le ROAS au seuil de rentabilité est de 100 ÷ 40 = 2,5.",
        },
        {
          q: "Qu'est-ce qu'un bon ROAS ?",
          a: "Un ROAS nettement supérieur à votre propre seuil de rentabilité. Il n'existe pas de chiffre universel : un ROAS de 2 est rentable pour un produit à forte marge et déficitaire pour un produit à faible marge. Utilisez le champ de bénéfice visé pour voir le ROAS qui laisse le bénéfice souhaité.",
        },
        {
          q: "Quel coût maximal par commande puis-je supporter ?",
          a: "Au seuil de rentabilité, il est égal à la marge restante sur une commande avant publicité. S'il reste 40 après produits, livraison et frais, vous pouvez dépenser jusqu'à 40 en publicité pour obtenir cette commande sans perdre d'argent. Pour dégager un bénéfice, votre coût par commande doit être inférieur.",
        },
        {
          q: "Le calcul tient-il compte des achats répétés ?",
          a: "Non. Il ne considère que la première commande, ce qui est l'approche prudente. Si vos clients rachètent régulièrement, vous pouvez accepter un ROAS plus bas sur la première commande, car les suivantes arrivent sans nouvelle dépense publicitaire.",
        },
      ],
    },
    "staff-augmentation-calculator": {
      name: "Calculateur d'économies en renfort d'équipe",
      tagline: "Comparez le coût d'une embauche locale à celui d'un collaborateur dédié via TDM.",
      metaTitle: "Calculateur d'économies en renfort d'équipe | TDM",
      metaDescription:
        "Estimez ce que vous pourriez économiser en ajoutant des développeurs, designers ou marketeurs dédiés plutôt qu'en recrutant localement.",
      headline: "Combien une équipe dédiée vous ferait-elle économiser ?",
      sub: "Indiquez ce que vous coûte une embauche locale. Le calculateur affiche l'économie habituelle avec un professionnel dédié, employé et encadré par TDM.",
      intro: [
        "Le renfort d'équipe consiste à ajouter des personnes dédiées à votre équipe par l'intermédiaire d'un partenaire qui les recrute, les emploie et les encadre. Elles ne travaillent que pour vous, selon vos priorités et avec vos outils, tandis que le partenaire gère le recrutement, la paie, le matériel et les bureaux.",
        "Les entreprises aux États-Unis, au Royaume-Uni et dans le Golfe paient généralement 50 à 70 % de moins pour un professionnel dédié basé dans les bureaux de TDM à Lahore que pour une embauche locale équivalente. Ce calculateur applique cette fourchette à vos chiffres. Il s'agit d'une estimation et non d'un devis : le coût réel dépend du poste et de l'ancienneté, et nous le confirmons par écrit avant tout démarrage.",
      ],
      faqs: [
        {
          q: "Combien le renfort d'équipe permet-il d'économiser ?",
          a: "Généralement 50 à 70 % du coût complet d'une embauche locale équivalente aux États-Unis, au Royaume-Uni ou dans le Golfe. Ce coût complet comprend le salaire, les charges patronales, les avantages, le matériel et les bureaux, d'où le pourcentage de frais demandé en plus du salaire.",
        },
        {
          q: "Que couvre le pourcentage de frais ?",
          a: "Tout ce qu'un salarié coûte au-delà de son salaire : charges patronales et cotisations sociales, avantages, frais de recrutement, matériel, logiciels et bureaux. Il varie selon le pays et l'entreprise. 25 % est une hypothèse de départ courante ; adaptez-la à vos coûts réels.",
        },
        {
          q: "Le résultat est-il un devis ?",
          a: "Non. C'est une estimation fondée sur la fourchette d'économies habituelle. Le coût mensuel réel dépend du poste, de l'ancienneté et du nombre de personnes. Réservez une consultation gratuite et nous vous remettrons un chiffre écrit pour l'équipe dont vous avez besoin.",
        },
        {
          q: "Quels profils puis-je recruter via TDM ?",
          a: "Développeurs, designers, monteurs vidéo, spécialistes SEO et responsables de campagnes, à temps plein et dédiés à votre équipe. TDM les recrute, les emploie et les encadre depuis ses bureaux de Lahore.",
        },
      ],
    },
  },
  lead: {
    title: "Voulez-vous que notre équipe examine cela avec vous ?",
    sub: "Laissez vos coordonnées et nous vous recontacterons. Sans engagement.",
    name: "Votre nom",
    email: "E-mail",
    send: "Demander une analyse gratuite",
    sending: "Envoi…",
    thanks: "Merci. Nous vous recontacterons rapidement.",
    error: "L'envoi a échoué. Écrivez-nous à info@thedigitalmarketing.services.",
  },
  audit: {
    label: "Adresse web",
    placeholder: "exemple.fr",
    run: "Lancer l'audit",
    running: "Analyse de la page…",
    score: "Score SEO",
    scoreOf: "sur 100",
    passed: "Réussis",
    toImprove: "À améliorer",
    critical: "À corriger",
    checked: "Analysée",
    again: "Analyser une autre page",
    statuses: { pass: "Bon", warn: "À améliorer", fail: "À corriger" },
    groups: { basics: "Les bases", content: "Contenu", technical: "Configuration technique", social: "Partage social", ai: "Préparation à la recherche IA" },
    units: { chars: "caractères", words: "mots", images: "images", missing: "sans texte alternatif", internal: "internes", external: "externes", found: "Trouvé", none: "aucun" },
    errors: {
      invalid_url: "Cela ne ressemble pas à une adresse web. Essayez par exemple exemple.fr.",
      blocked: "Cette adresse ne peut pas être analysée. Saisissez l'adresse d'un site public.",
      unreachable: "Nous n'avons pas pu joindre cette page. Vérifiez l'adresse ou réessayez dans un instant.",
      not_html: "Cette adresse n'est pas une page web. Saisissez l'adresse d'une page, pas d'un fichier.",
      too_large: "Cette page est trop volumineuse pour être analysée.",
      http_error: "Le site a répondu par une erreur au lieu d'une page. Vérifiez l'adresse.",
      rate_limited: "Vous avez lancé plusieurs audits en peu de temps. Patientez quelques minutes avant de réessayer.",
    },
    checks: {
      indexable: { name: "Les moteurs de recherche peuvent indexer la page", good: "Rien sur la page ne demande aux moteurs de recherche de s'en tenir à l'écart.", fix: "La page porte une instruction « noindex » et ne peut donc pas apparaître dans les résultats. Retirez-la si la page doit être trouvée." },
      title: { name: "Titre de la page", good: "Le titre est présent et d'une bonne longueur pour les résultats de recherche.", fix: "Rédigez un titre unique de 25 à 60 caractères environ qui dit ce que propose la page. Les titres plus longs sont tronqués dans Google." },
      description: { name: "Meta description", good: "La description est présente et d'une bonne longueur.", fix: "Ajoutez une description de 70 à 160 caractères environ. C'est le texte affiché sous le titre dans les résultats, et il décide du clic." },
      h1: { name: "Titre principal (H1)", good: "La page a exactement un titre principal.", fix: "Utilisez un seul H1 qui énonce le sujet de la page. Aucun, ou plusieurs, rend le sujet flou." },
      content: { name: "Quantité de contenu", good: "Il y a assez de texte pour que les moteurs comprennent la page.", fix: "La page contient peu de texte. Ajoutez du contenu qui répond aux questions d'un visiteur : 300 mots au moins est un minimum raisonnable pour une page à positionner." },
      headings: { name: "Structure des titres", good: "Les titres sont utilisés et suivent un ordre clair.", fix: "Utilisez des titres H2 et H3 pour découper la page, sans sauter de niveau. Un plan clair aide les lecteurs comme les moteurs." },
      alt: { name: "Texte alternatif des images", good: "Les images ont un texte alternatif.", fix: "Certaines images n'ont pas de texte alternatif. Décrivez chaque image en quelques mots pour les moteurs et les lecteurs d'écran." },
      links: { name: "Liens internes", good: "La page renvoie vers d'autres pages du site.", fix: "Ajoutez des liens vers des pages liées de votre site. Les liens internes aident les moteurs à découvrir les pages et à comprendre leurs relations." },
      https: { name: "Connexion sécurisée (HTTPS)", good: "La page est servie en HTTPS.", fix: "La page n'est pas servie de façon sécurisée. Installez un certificat SSL et redirigez tout le trafic vers https://." },
      mobile: { name: "Configuration mobile", good: "La page déclare une fenêtre d'affichage mobile.", fix: "La page n'a pas de balise viewport et s'affichera mal sur téléphone. Google classe les sites d'après leur version mobile." },
      canonical: { name: "Adresse canonique", good: "La page indique son adresse préférée.", fix: "Ajoutez une balise canonique pointant vers l'adresse préférée de la page, afin que les doublons ne se concurrencent pas." },
      lang: { name: "Langue déclarée", good: "La page indique la langue dans laquelle elle est rédigée.", fix: "Ajoutez un attribut lang à la balise <html> pour que navigateurs et moteurs connaissent la langue de la page." },
      speed: { name: "Réponse du serveur", good: "Le serveur a répondu rapidement.", fix: "Le serveur a été lent à répondre. Les pages lentes perdent des visiteurs et se classent moins bien : vérifiez l'hébergement, le cache et le poids de la page." },
      robots: { name: "robots.txt", good: "Le site possède un fichier robots.txt.", fix: "Aucun fichier robots.txt trouvé. Ajoutez-en un pour indiquer aux moteurs ce qu'ils peuvent explorer et où se trouve le sitemap." },
      sitemap: { name: "Sitemap XML", good: "Le site possède un sitemap lisible par les moteurs.", fix: "Aucun sitemap trouvé. Un sitemap XML liste vos pages pour que les moteurs les trouvent toutes." },
      favicon: { name: "Favicon", good: "La page possède une icône de site.", fix: "Ajoutez un favicon. Il apparaît dans les onglets et à côté de votre résultat dans Google sur mobile." },
      opengraph: { name: "Balises de partage (Open Graph)", good: "Le titre, la description et l'image sont définis pour les liens partagés.", fix: "Ajoutez og:title, og:description et og:image pour que la page affiche un bel aperçu sur les réseaux sociaux et les messageries." },
      twitter: { name: "Carte Twitter / X", good: "Un type de carte est défini pour X.", fix: "Ajoutez une balise twitter:card pour que les liens partagés sur X affichent un grand aperçu." },
      schema: { name: "Données structurées (schema)", good: "La page se décrit avec des données structurées.", fix: "Ajoutez un balisage schema (Organization, Service, Article, FAQ…). Il indique précisément aux moteurs et aux assistants IA de quoi parle la page." },
      faq: { name: "Contenu en questions-réponses", good: "La page balise ses questions et réponses.", fix: "Ajoutez une courte FAQ avec de vraies questions de clients, et balisez-la en schema FAQ. Les réponses directes sont ce que citent les assistants IA." },
      llms: { name: "llms.txt", good: "Le site propose un résumé llms.txt pour les systèmes d'IA.", fix: "Facultatif : ajoutez un fichier llms.txt résumant le site et ses pages clés pour les assistants IA." },
      hreflang: { name: "Versions linguistiques (hreflang)", good: "La page renvoie vers ses autres versions linguistiques.", fix: "Si le site existe en plusieurs langues, ajoutez des balises hreflang pour orienter chaque public vers la bonne version. À ignorer pour un site monolingue." },
    },
    leadTitle: "Voulez-vous que nous corrigions cela pour vous ?",
    leadSub: "Envoyez-nous le résultat : notre équipe SEO analysera tout le site, pas seulement cette page, et vous dira par où commencer.",
    bookTitle: "Souhaitez-vous l'avis d'un expert sur cet audit ?",
    bookSub: "Réservez un appel gratuit : l'un de nos spécialistes SEO passera ces résultats en revue avec vous et vous dira quoi corriger en premier.",
    bookCta: "Planifier un appel gratuit",
    orEmail: "Vous préférez l'e-mail ? Laissez vos coordonnées et nous vous écrirons.",
  },
  roas: {
    currency: "Devise",
    aov: "Panier moyen",
    aovHint: "Ce que paie un client type par commande.",
    cogs: "Coût des produits par commande",
    cogsHint: "Ce que vous coûtent les articles de cette commande.",
    shipping: "Livraison et emballage par commande",
    shippingHint: "Ce que vous payez pour acheminer la commande au client.",
    fees: "Frais de paiement et de plateforme",
    feesHint: "Frais de carte, de passerelle et de marketplace, en pourcentage de la commande.",
    target: "Bénéfice que vous voulez conserver",
    targetHint: "En pourcentage de la commande, après publicité. Indiquez 0 pour le seuil de rentabilité.",
    budget: "Budget publicitaire mensuel",
    budgetHint: "Facultatif. Affiche les ventes que ce budget doit générer.",
    results: "Vos chiffres",
    margin: "Reste par commande avant publicité",
    marginPct: "de la valeur de la commande",
    breakeven: "ROAS au seuil de rentabilité",
    breakevenHint: "En dessous, chaque commande perd de l'argent.",
    targetRoas: "ROAS pour votre bénéfice visé",
    targetRoasHint: "Visez au moins ce chiffre dans vos comptes publicitaires.",
    maxCpa: "Maximum à payer par commande",
    maxCpaHint: "Au seuil de rentabilité. Restez en dessous pour gagner.",
    revenueNeeded: "Chiffre d'affaires à générer avec ce budget",
    ordersNeeded: "Commandes nécessaires",
    profitAtTarget: "Bénéfice au ROAS cible",
    noMargin: "Vos coûts sont égaux ou supérieurs à la valeur de la commande : aucune publicité ne peut être rentable. Augmentez d'abord le prix ou réduisez les coûts.",
    impossible: "Ce bénéfice visé dépasse la marge restante sur une commande. Réduisez l'objectif ou améliorez la marge.",
    leadTitle: "Vous n'atteignez pas ce ROAS ?",
    leadSub: "Notre équipe performance pilote les campagnes selon un seuil de rentabilité convenu à l'avance. Demandez une analyse gratuite de vos comptes publicitaires.",
  },
  staff: {
    currency: "Devise",
    salary: "Salaire annuel d'une embauche locale",
    salaryHint: "Salaire brut pour ce poste dans votre pays.",
    overhead: "Frais en plus du salaire",
    overheadHint: "Charges patronales, avantages, matériel et bureaux. 25 % est un point de départ courant.",
    team: "Nombre de personnes",
    teamHint: "Le nombre de postes à pourvoir.",
    results: "Économie estimée",
    localCost: "Coût local complet",
    localCostHint: "Salaire plus frais, par an.",
    tdmCost: "Coût habituel via TDM",
    tdmCostHint: "50 à 70 % en dessous du coût local.",
    saving: "Vous pourriez économiser",
    perYear: "par an",
    perMonth: "par mois",
    to: "à",
    note: "Estimation fondée sur la fourchette d'économies habituelle, non un devis. Le chiffre réel dépend du poste et de l'ancienneté.",
    leadTitle: "Obtenez un chiffre réel pour votre équipe.",
    leadSub: "Indiquez-nous les profils recherchés et nous vous enverrons un coût écrit, sans engagement.",
  },
};

const ar: ToolsCopy = {
  hub: {
    kicker: "أدوات مجانية",
    headline: "أدوات تسويق مجانية، بدون تسجيل.",
    sub: "افحص موقعك، واحسب العائد الذي يجب أن تحققه إعلاناتك، واعرف تكلفة فريق مخصّص لك. استخدمها بقدر ما تشاء.",
    metaTitle: "أدوات تسويق مجانية: تدقيق SEO وحاسبات | TDM",
    metaDescription:
      "أدوات مجانية من TDM: تدقيق SEO فوري، حاسبة نقطة التعادل للعائد على الإنفاق الإعلاني، وحاسبة التوفير في دعم الفرق. بدون تسجيل.",
    open: "افتح الأداة",
    free: "مجاني",
    navLabel: "أدوات مجانية",
    auditCta: "احصل على تدقيق SEO مجاني",
  },
  tools: {
    "seo-audit": {
      name: "تدقيق SEO مجاني",
      tagline: "افحص في أي صفحة ما تقرؤه محركات البحث ومساعدات الذكاء الاصطناعي.",
      metaTitle: "أداة تدقيق SEO مجانية: افحص أي صفحة فورًا | TDM",
      metaDescription:
        "أدخل عنوان موقع واحصل على تدقيق SEO فوري: العنوان والوصف والعناوين والنص البديل للصور والبيانات المنظمة والسرعة والجاهزية لبحث الذكاء الاصطناعي.",
      headline: "تدقيق SEO مجاني لأي صفحة.",
      sub: "أدخل عنوان الموقع. خلال ثوانٍ تحصل على درجة وقائمة بما يجب إصلاحه عبر 22 فحصًا.",
      intro: [
        "تدقيق SEO يتحقق من أن الصفحة تقدّم لمحركات البحث ما تحتاجه لفهمها وترتيبها. هذه الأداة تجلب الصفحة التي تدخلها وتفحص 22 عنصرًا: العنوان والوصف الظاهرين في Google، وبنية العناوين، والنص البديل للصور، والروابط، وإعدادات الجوال، والسرعة، والبيانات المنظمة، وخريطة الموقع وملف robots.txt، ومدى جاهزية الصفحة ليستشهد بها مساعدو الذكاء الاصطناعي.",
        "تفحص الأداة صفحة واحدة في كل مرة، كما يراها محرك البحث أول مرة. لا تقيس الروابط الخلفية ولا الترتيب ولا المنافسة على الكلمات المفتاحية، ولا ترى المحتوى الذي يظهر فقط بعد تشغيل السكربتات. لذلك، ولمراجعة الموقع كاملًا، احجز استشارة مع فريق SEO لدينا.",
      ],
      faqs: [
        {
          q: "هل تدقيق SEO مجاني فعلًا؟",
          a: "نعم. لا توجد رسوم ولا تسجيل ولا حدّ لعدد الصفحات التي تفحصها، سوى توقف قصير إذا أجريت عددًا كبيرًا من الفحوصات خلال دقائق. تكتب بريدك الإلكتروني فقط إذا أردت أن يراجع فريقنا النتائج معك.",
        },
        {
          q: "ما الذي يفحصه تدقيق SEO؟",
          a: "يجري 22 فحصًا في خمس مجموعات: الأساسيات (الفهرسة والعنوان والوصف والعنوان الرئيسي)، والمحتوى (الطول والعناوين والنص البديل والروابط)، والإعداد التقني (HTTPS والجوال والعنوان الأساسي واللغة والسرعة وrobots.txt وخريطة الموقع وأيقونة الموقع)، ووسوم المشاركة، والجاهزية لبحث الذكاء الاصطناعي (البيانات المنظمة ومحتوى الأسئلة والأجوبة وllms.txt ووسوم اللغات).",
        },
        {
          q: "ما الدرجة الجيدة في SEO؟",
          a: "أعلى من 85 تعني أن الأساسيات مكتملة. بين 60 و85 توجد تحسينات واضحة. أقل من 60 يعني أن عنصرًا مهمًا مفقود مثل العنوان أو الوصف أو إعداد الجوال. الدرجة تعكس إعداد الصفحة فقط: قد تحصل صفحة على 100 وتظل بحاجة إلى محتوى أفضل وروابط لتتقدم على المنافسين.",
        },
        {
          q: "لماذا لا تستطيع الأداة قراءة صفحتي؟",
          a: "الأسباب الأكثر شيوعًا: خطأ في كتابة العنوان، أو أن الموقع يحجب الزوار الآليين، أو أن الصفحة تتطلب تسجيل دخول، أو أنها تتأخر في الاستجابة. جرّب العنوان كاملًا مع https://، أو جرّب الصفحة الرئيسية.",
        },
      ],
    },
    "roas-calculator": {
      name: "حاسبة نقطة التعادل للعائد على الإنفاق الإعلاني",
      tagline: "اعرف العائد الذي يجب أن تبلغه إعلاناتك قبل أن تبدأ بالربح.",
      metaTitle: "حاسبة نقطة التعادل لـ ROAS للتجارة الإلكترونية | TDM",
      metaDescription:
        "احسب نقطة التعادل للعائد على الإنفاق الإعلاني والعائد المستهدف وأقصى تكلفة للطلب من قيمة الطلب وتكاليفه. حاسبة مجانية للمتاجر الإلكترونية.",
      headline: "ما العائد الذي تحتاجه إعلاناتك لتبلغ نقطة التعادل؟",
      sub: "أدخل قيمة الطلب المتوسط وما يكلفك. تعرض الحاسبة العائد على الإنفاق الإعلاني الذي يتوقف عنده الإعلان عن خسارة المال.",
      intro: [
        "ROAS (العائد على الإنفاق الإعلاني) هو الإيراد الناتج عن الإعلانات مقسومًا على تكلفتها. عائد قدره 3 يعني أن كل 1 أُنفق على الإعلانات جلب 3 من الإيراد. نقطة التعادل هي النقطة التي يغطي فيها هذا الإيراد بالكاد تكلفة المنتجات والتوصيل والرسوم والإعلانات نفسها. تحتها تخسر في كل طلب، وفوقها تربح.",
        "نقطة التعادل تعتمد على هامش ربحك، ولهذا لا تفيد متوسطات السوق كثيرًا. متجر يحتفظ بـ 70% من كل طلب يبلغ التعادل عند نحو 1.4، ومتجر يحتفظ بـ 25% يحتاج إلى 4. هذه الحاسبة تحسبها من أرقامك أنت وتعرض أقصى ما يمكنك دفعه للحصول على طلب واحد.",
      ],
      faqs: [
        {
          q: "كيف تُحسب نقطة التعادل للعائد على الإنفاق الإعلاني؟",
          a: "اقسم متوسط قيمة الطلب على ما يتبقى منه بعد تكلفة المنتج والتوصيل ورسوم الدفع وقبل الإعلان. إذا كانت قيمة الطلب 100 وبقي 40 بعد هذه التكاليف، فنقطة التعادل هي 100 ÷ 40 = 2.5.",
        },
        {
          q: "ما العائد الجيد على الإنفاق الإعلاني؟",
          a: "هو عائد أعلى بوضوح من نقطة التعادل الخاصة بك. لا يوجد رقم واحد للجميع: عائد 2 مربح لمنتج بهامش مرتفع وخاسر لمنتج بهامش منخفض. استخدم حقل الربح المستهدف لترى العائد الذي يترك لك الربح الذي تريده.",
        },
        {
          q: "ما أقصى تكلفة للطلب يمكنني تحملها؟",
          a: "عند نقطة التعادل تساوي الهامش المتبقي من الطلب قبل الإعلان. إذا بقي 40 بعد المنتج والتوصيل والرسوم، يمكنك إنفاق حتى 40 على الإعلان للحصول على هذا الطلب دون خسارة. ولتحقيق ربح يجب أن تكون تكلفة الطلب أقل.",
        },
        {
          q: "هل يشمل الحساب عمليات الشراء المتكررة؟",
          a: "لا. ينظر إلى الطلب الأول فقط، وهي النظرة الحذرة. إذا كان عملاؤك يعيدون الشراء بانتظام، يمكنك قبول عائد أقل على الطلب الأول، لأن الطلبات التالية تأتي دون إنفاق إعلاني جديد.",
        },
      ],
    },
    "staff-augmentation-calculator": {
      name: "حاسبة التوفير في دعم الفرق",
      tagline: "قارن تكلفة التوظيف المحلي بتكلفة عضو فريق مخصّص عبر TDM.",
      metaTitle: "حاسبة التوفير في دعم الفرق | TDM",
      metaDescription:
        "قدّر ما يمكنك توفيره بإضافة مطورين أو مصممين أو مسوّقين مخصّصين عبر دعم الفرق بدلًا من التوظيف المحلي.",
      headline: "كم يوفّر لك فريق مخصّص؟",
      sub: "أدخل تكلفة الموظف المحلي. تعرض الحاسبة التوفير المعتاد مع محترف مخصّص توظّفه TDM وتديره.",
      intro: [
        "دعم الفرق يعني إضافة أشخاص مخصّصين إلى فريقك عبر شريك يتولى توظيفهم وإدارتهم. يعملون لك وحدك، وفق أولوياتك وبأدواتك، بينما يتولى الشريك الاستقطاب والرواتب والمعدات والمكاتب.",
        "تدفع الشركات في الولايات المتحدة والمملكة المتحدة والخليج عادةً أقل بـ 50 إلى 70% مقابل محترف مخصّص يعمل من مكتب TDM في لاهور مقارنةً بموظف محلي مماثل. هذه الحاسبة تطبّق هذا النطاق على أرقامك. النتيجة تقدير وليست عرض سعر: التكلفة الفعلية تعتمد على الدور والخبرة، ونؤكدها كتابيًا قبل البدء.",
      ],
      faqs: [
        {
          q: "كم يمكن أن يوفّر دعم الفرق؟",
          a: "عادةً 50 إلى 70% من التكلفة الكاملة لموظف محلي مماثل في الولايات المتحدة أو المملكة المتحدة أو الخليج. التكلفة الكاملة تشمل الراتب مع ضرائب صاحب العمل والمزايا والمعدات والمكاتب، ولهذا تطلب الحاسبة نسبة تكاليف إضافية فوق الراتب.",
        },
        {
          q: "ماذا تغطي نسبة التكاليف الإضافية؟",
          a: "كل ما يكلفه الموظف غير الراتب: ضرائب صاحب العمل والاشتراكات الاجتماعية، والمزايا، ورسوم الاستقطاب، والمعدات، والبرامج، والمكاتب. تختلف بحسب البلد والشركة. 25% افتراض شائع للبدء، وعدّله ليطابق تكاليفك.",
        },
        {
          q: "هل النتيجة عرض سعر؟",
          a: "لا. هي تقدير مبني على نطاق التوفير المعتاد. التكلفة الشهرية الفعلية تعتمد على الدور والخبرة وعدد الأشخاص. احجز استشارة مجانية وسنرسل لك رقمًا مكتوبًا للفريق الذي تحتاجه.",
        },
        {
          q: "ما الأدوار التي يمكنني توظيفها عبر TDM؟",
          a: "مطورون ومصممون ومحررو فيديو ومتخصصو SEO ومديرو حملات، بدوام كامل ومخصّصون لفريقك. تتولى TDM استقطابهم وتوظيفهم وإدارتهم من مكتبها في لاهور.",
        },
      ],
    },
  },
  lead: {
    title: "هل تريد أن يراجع فريقنا هذا معك؟",
    sub: "اترك بياناتك وسنتواصل معك. بدون أي التزام.",
    name: "اسمك",
    email: "البريد الإلكتروني",
    send: "اطلب مراجعة مجانية",
    sending: "جارٍ الإرسال…",
    thanks: "شكرًا لك. سنتواصل معك قريبًا.",
    error: "لم يتم الإرسال. راسلنا على info@thedigitalmarketing.services.",
  },
  audit: {
    label: "عنوان الموقع",
    placeholder: "example.com",
    run: "ابدأ التدقيق",
    running: "جارٍ فحص الصفحة…",
    score: "درجة SEO",
    scoreOf: "من 100",
    passed: "ناجحة",
    toImprove: "للتحسين",
    critical: "تحتاج إصلاحًا",
    checked: "تم الفحص",
    again: "افحص صفحة أخرى",
    statuses: { pass: "جيد", warn: "حسّن", fail: "أصلح" },
    groups: { basics: "الأساسيات", content: "المحتوى", technical: "الإعداد التقني", social: "المشاركة الاجتماعية", ai: "الجاهزية لبحث الذكاء الاصطناعي" },
    units: { chars: "حرفًا", words: "كلمة", images: "صورة", missing: "بدون نص بديل", internal: "داخلية", external: "خارجية", found: "الموجود", none: "لا شيء" },
    errors: {
      invalid_url: "هذا لا يبدو عنوان موقع. جرّب مثلًا example.com.",
      blocked: "لا يمكن فحص هذا العنوان. أدخل عنوان موقع عام.",
      unreachable: "تعذّر الوصول إلى هذه الصفحة. تحقق من العنوان أو حاول بعد قليل.",
      not_html: "هذا العنوان ليس صفحة ويب. أدخل عنوان صفحة لا عنوان ملف.",
      too_large: "هذه الصفحة أكبر من أن تُفحص.",
      http_error: "ردّ الموقع بخطأ بدل الصفحة. تحقق من صحة العنوان.",
      rate_limited: "أجريت عدة فحوصات في وقت قصير. انتظر بضع دقائق ثم حاول مجددًا.",
    },
    checks: {
      indexable: { name: "يُسمح لمحركات البحث بفهرسة الصفحة", good: "لا شيء في الصفحة يطلب من محركات البحث الابتعاد عنها.", fix: "الصفحة تحمل تعليمة «noindex» فلا يمكن أن تظهر في نتائج البحث. أزلها إن كنت تريد أن يُعثر على الصفحة." },
      title: { name: "عنوان الصفحة", good: "العنوان موجود وطوله مناسب لنتائج البحث.", fix: "اكتب عنوانًا فريدًا من 25 إلى 60 حرفًا تقريبًا يوضح ما تقدمه الصفحة. العناوين الأطول تُقتطع في Google." },
      description: { name: "الوصف التعريفي", good: "الوصف موجود وطوله مناسب.", fix: "أضف وصفًا من 70 إلى 160 حرفًا تقريبًا. هو النص الظاهر تحت العنوان في النتائج، وعليه يتوقف النقر." },
      h1: { name: "العنوان الرئيسي (H1)", good: "في الصفحة عنوان رئيسي واحد بالضبط.", fix: "استخدم H1 واحدًا يحدد موضوع الصفحة. غيابه أو تعدده يجعل الموضوع غير واضح." },
      content: { name: "كمية المحتوى", good: "يوجد نص كافٍ لتفهم محركات البحث الصفحة.", fix: "النص في الصفحة قليل. أضف محتوى يجيب عما يسأل عنه الزائر: 300 كلمة أو أكثر حدّ أدنى معقول لصفحة تريد ترتيبها." },
      headings: { name: "بنية العناوين", good: "العناوين مستخدمة وتتبع ترتيبًا واضحًا.", fix: "استخدم عناوين H2 وH3 لتقسيم الصفحة دون تخطي المستويات. المخطط الواضح يساعد القراء ومحركات البحث." },
      alt: { name: "النص البديل للصور", good: "للصور نص بديل.", fix: "بعض الصور بلا نص بديل. صف كل صورة بكلمات قليلة لتعرف محركات البحث وقارئات الشاشة ما تعرضه." },
      links: { name: "الروابط الداخلية", good: "الصفحة تربط بصفحات أخرى في الموقع.", fix: "أضف روابط إلى صفحات ذات صلة في موقعك. الروابط الداخلية تساعد محركات البحث على اكتشاف الصفحات وفهم علاقتها ببعضها." },
      https: { name: "اتصال آمن (HTTPS)", good: "الصفحة تُعرض عبر HTTPS.", fix: "الصفحة لا تُعرض بشكل آمن. ثبّت شهادة SSL وحوّل كل الزيارات إلى https://." },
      mobile: { name: "إعداد الجوال", good: "الصفحة تعلن إطار عرض للجوال.", fix: "الصفحة بلا وسم viewport فلن تُعرض جيدًا على الهواتف. Google يرتّب المواقع وفق نسختها على الجوال." },
      canonical: { name: "العنوان الأساسي (canonical)", good: "الصفحة تحدد عنوانها المفضّل.", fix: "أضف وسم canonical يشير إلى العنوان المفضّل للصفحة حتى لا تتنافس النسخ المكررة." },
      lang: { name: "اللغة معلنة", good: "الصفحة تذكر اللغة المكتوبة بها.", fix: "أضف خاصية lang إلى وسم <html> لتعرف المتصفحات ومحركات البحث لغة الصفحة." },
      speed: { name: "استجابة الخادم", good: "استجاب الخادم بسرعة.", fix: "تأخر الخادم في الاستجابة. الصفحات البطيئة تخسر الزوار وتتراجع في الترتيب: راجع الاستضافة والتخزين المؤقت وحجم الصفحة." },
      robots: { name: "robots.txt", good: "للموقع ملف robots.txt.", fix: "لم يُعثر على ملف robots.txt. أضف ملفًا يخبر محركات البحث بما يمكنها زحفه وبمكان خريطة الموقع." },
      sitemap: { name: "خريطة الموقع XML", good: "للموقع خريطة تستطيع محركات البحث قراءتها.", fix: "لم يُعثر على خريطة موقع. خريطة XML تسرد صفحاتك لتجدها محركات البحث كلها." },
      favicon: { name: "أيقونة الموقع", good: "للصفحة أيقونة موقع.", fix: "أضف أيقونة للموقع. تظهر في علامات تبويب المتصفح وبجانب نتيجتك في Google على الجوال." },
      opengraph: { name: "وسوم المشاركة (Open Graph)", good: "العنوان والوصف والصورة محددة للروابط المشاركة.", fix: "أضف og:title وog:description وog:image لتظهر للصفحة معاينة مناسبة عند مشاركتها على وسائل التواصل وتطبيقات المراسلة." },
      twitter: { name: "بطاقة تويتر / X", good: "نوع البطاقة محدد لمنصة X.", fix: "أضف وسم twitter:card لتظهر الروابط المشاركة على X بمعاينة كبيرة." },
      schema: { name: "البيانات المنظمة (schema)", good: "الصفحة تصف نفسها ببيانات منظمة.", fix: "أضف ترميز schema (Organization، Service، Article، FAQ…). يخبر محركات البحث ومساعدات الذكاء الاصطناعي بموضوع الصفحة بدقة." },
      faq: { name: "محتوى الأسئلة والأجوبة", good: "الصفحة ترمّز الأسئلة والأجوبة.", fix: "أضف قسم أسئلة شائعة قصيرًا بأسئلة العملاء الحقيقية، ورمّزه بـ schema الخاص بالأسئلة. الإجابات المباشرة هي ما تستشهد به مساعدات الذكاء الاصطناعي." },
      llms: { name: "llms.txt", good: "الموقع يقدّم ملخص llms.txt لأنظمة الذكاء الاصطناعي.", fix: "اختياري: أضف ملف llms.txt يلخص الموقع وصفحاته الرئيسية لمساعدات الذكاء الاصطناعي." },
      hreflang: { name: "نسخ اللغات (hreflang)", good: "الصفحة تشير إلى نسخها بلغات أخرى.", fix: "إذا كان الموقع بعدة لغات، أضف وسوم hreflang ليصل كل جمهور إلى النسخة الصحيحة. تجاهل هذا إن كان الموقع بلغة واحدة." },
    },
    leadTitle: "هل تريد أن نصلح هذا لك؟",
    leadSub: "أرسل لنا النتيجة وسيراجع فريق SEO لدينا الموقع كاملًا لا هذه الصفحة فقط، ويخبرك بما تبدأ به.",
    bookTitle: "هل تريد رأي خبير في هذا التدقيق؟",
    bookSub: "احجز مكالمة مجانية وسيراجع أحد متخصصي SEO لدينا هذه النتائج معك ويخبرك بما تصلحه أولًا.",
    bookCta: "احجز مكالمة مجانية",
    orEmail: "تفضّل البريد الإلكتروني؟ اترك بياناتك وسنراسلك.",
  },
  roas: {
    currency: "العملة",
    aov: "متوسط قيمة الطلب",
    aovHint: "ما يدفعه العميل المعتاد في الطلب الواحد.",
    cogs: "تكلفة المنتجات في الطلب",
    cogsHint: "ما تكلفك البضاعة في هذا الطلب.",
    shipping: "التوصيل والتغليف لكل طلب",
    shippingHint: "ما تدفعه لإيصال الطلب إلى العميل.",
    fees: "رسوم الدفع والمنصة",
    feesHint: "رسوم البطاقات وبوابة الدفع والمتاجر، كنسبة من الطلب.",
    target: "الربح الذي تريد الاحتفاظ به",
    targetHint: "كنسبة من قيمة الطلب بعد الإعلان. اكتب 0 لنقطة التعادل.",
    budget: "الميزانية الإعلانية الشهرية",
    budgetHint: "اختياري. يعرض المبيعات التي يجب أن تحققها هذه الميزانية.",
    results: "أرقامك",
    margin: "المتبقي من الطلب قبل الإعلان",
    marginPct: "من قيمة الطلب",
    breakeven: "نقطة التعادل للعائد على الإنفاق الإعلاني",
    breakevenHint: "تحتها يخسر كل طلب.",
    targetRoas: "العائد المطلوب لربحك المستهدف",
    targetRoasHint: "استهدف هذا الرقم على الأقل في حساباتك الإعلانية.",
    maxCpa: "أقصى ما يمكنك دفعه للطلب",
    maxCpaHint: "عند نقطة التعادل. ابقَ دونه لتربح.",
    revenueNeeded: "الإيراد المطلوب من هذه الميزانية",
    ordersNeeded: "الطلبات المطلوبة",
    profitAtTarget: "الربح عند العائد المستهدف",
    noMargin: "تكاليفك تساوي قيمة الطلب أو تزيد عليها، فلا يمكن لأي إعلان أن يكون مربحًا. ارفع السعر أو خفّض التكاليف أولًا.",
    impossible: "الربح المستهدف أعلى من الهامش المتبقي في الطلب. خفّض الهدف أو حسّن الهامش.",
    leadTitle: "لا تبلغ هذا العائد؟",
    leadSub: "فريق الأداء لدينا يدير الحملات وفق نقطة تعادل متفق عليها مسبقًا. اطلب مراجعة مجانية لحساباتك الإعلانية.",
  },
  staff: {
    currency: "العملة",
    salary: "الراتب السنوي لموظف محلي",
    salaryHint: "الراتب الإجمالي لهذا الدور في بلدك.",
    overhead: "التكاليف الإضافية فوق الراتب",
    overheadHint: "ضرائب صاحب العمل والمزايا والمعدات والمكاتب. 25% نقطة بداية شائعة.",
    team: "عدد الأشخاص",
    teamHint: "عدد الأدوار التي تريد شغلها.",
    results: "التوفير التقديري",
    localCost: "التكلفة المحلية الكاملة",
    localCostHint: "الراتب مع التكاليف الإضافية، سنويًا.",
    tdmCost: "التكلفة المعتادة عبر TDM",
    tdmCostHint: "أقل من التكلفة المحلية بـ 50 إلى 70%.",
    saving: "يمكنك توفير",
    perYear: "سنويًا",
    perMonth: "شهريًا",
    to: "إلى",
    note: "تقدير مبني على نطاق التوفير المعتاد وليس عرض سعر. الرقم الفعلي يعتمد على الدور والخبرة.",
    leadTitle: "احصل على رقم فعلي لفريقك.",
    leadSub: "أخبرنا بالأدوار التي تحتاجها وسنرسل لك تكلفة مكتوبة بدون أي التزام.",
  },
};

const registry: Record<Locale, ToolsCopy> = { en, fr, ar };

export const getTools = (locale: Locale): ToolsCopy => registry[locale] ?? en;
