import { site } from "@/lib/site";

/**
 * Legal pages. English only: they are the binding text, and the French and
 * Arabic sites link here rather than carrying translations that could drift
 * from it.
 *
 * A block is a paragraph, or a list when it is an array.
 */
export interface LegalDoc {
  slug: "terms-and-conditions" | "privacy-policy" | "legal-notice";
  kicker: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; blocks: (string | string[])[] }[];
}

/** Shown on every legal page; change it whenever the text below changes. */
export const legalUpdated = "2026-11-24";

const HQ = "17 12 A Street, Al Qusais Industrial Area 1, P.O. Box 231578, Dubai, United Arab Emirates";

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms-and-conditions",
    kicker: "Legal",
    title: "Terms & Conditions",
    metaTitle: "Terms & Conditions | TDM",
    metaDescription:
      "The terms that apply to using the TDM website and to engaging TDM: The Digital Marketing Services for marketing, media, development and staffing work.",
    intro: `These terms apply to your use of ${site.domain} and, together with any written proposal or statement of work we agree with you, to the services TDM: The Digital Marketing Services ("TDM", "we", "us") provides. By using this website or engaging us, you accept them.`,
    sections: [
      {
        heading: "1. Who we are",
        blocks: [
          `TDM: The Digital Marketing Services is a digital agency headquartered at ${HQ}. You can contact us at ${site.email} or ${site.phone}.`,
        ],
      },
      {
        heading: "2. Using this website",
        blocks: [
          "The content on this website is provided for general information about our services. We work to keep it accurate and current, but we do not promise that it is complete or free of errors, and it is not professional advice for your specific situation.",
          "You agree not to misuse the website: no attempts to gain unauthorised access, disrupt it, scrape it at a scale that affects its operation, or use it to send unlawful or harmful material.",
        ],
      },
      {
        heading: "3. How engagements work",
        blocks: [
          "Each engagement is defined in a written proposal, quotation or statement of work that sets out the scope, deliverables, timeline and fees. That document forms the contract together with these terms. If the two conflict, the written proposal or statement of work takes priority.",
          "Work begins once the scope is agreed in writing and any agreed upfront payment has been received. Changes to the scope are agreed in writing and may change the fees and timeline.",
        ],
      },
      {
        heading: "4. Fees and payment",
        blocks: [
          "Fees, payment schedule and currency are stated in your proposal or invoice. Unless agreed otherwise, invoices are payable on receipt.",
          "Our fees do not include third-party costs such as advertising spend, software licences, hosting, domains, stock media or platform fees. These are paid by you directly or recharged at cost, as agreed.",
          "If an invoice is overdue, we may pause work until it is settled. Fees paid for work already performed are not refundable.",
        ],
      },
      {
        heading: "5. What we need from you",
        blocks: [
          "To deliver on time we rely on you to provide accurate information, timely feedback and approvals, and access to the accounts, platforms and materials the work requires. Delays in providing these may move the timeline.",
          "You confirm that you have the right to use any content, trademarks and data you give us, and that our use of them for your project will not infringe anyone else's rights.",
        ],
      },
      {
        heading: "6. Results",
        blocks: [
          "We commit to carrying out the agreed work with professional skill and care. Outcomes in search rankings, advertising performance, traffic and sales depend on factors outside our control, including search engine and platform algorithms, competitors, and your market. For that reason we do not guarantee specific rankings, returns or revenue unless a guarantee is expressly written into your agreement.",
          "Case studies and figures on this website describe results achieved for specific clients. They are not a promise that the same results will be achieved for you.",
        ],
      },
      {
        heading: "7. Intellectual property",
        blocks: [
          "Once you have paid in full, you own the final deliverables we create specifically for you. Until then, we retain ownership of them.",
          "We keep ownership of our pre-existing tools, methods, templates and know-how, and grant you a licence to use them as far as they are part of your deliverables. Third-party materials such as fonts, plugins, themes and stock media remain subject to their own licences.",
          "Unless you ask us not to, we may describe the work in our portfolio and case studies. Case studies are published anonymously.",
        ],
      },
      {
        heading: "8. Confidentiality",
        blocks: [
          "Each of us will keep the other's confidential information private and use it only for the purposes of the engagement. This does not apply to information that is already public, already known to the recipient, or required to be disclosed by law.",
        ],
      },
      {
        heading: "9. Third-party platforms",
        blocks: [
          "Much of our work is carried out on platforms run by others, such as Google, Meta, TikTok, Shopify and hosting providers. Their terms and policies apply to your accounts on them. We are not responsible for their outages, policy changes, account suspensions or decisions.",
        ],
      },
      {
        heading: "10. Staff augmentation",
        blocks: [
          "Where you engage dedicated team members through TDM, those individuals remain employed and managed by TDM. Specific terms covering working hours, notice periods, replacement and any restriction on hiring them directly are set out in your staff augmentation agreement.",
        ],
      },
      {
        heading: "11. Liability",
        blocks: [
          "Nothing in these terms limits liability that cannot be limited by law. Otherwise, to the extent the law allows, our total liability arising from an engagement is limited to the fees you paid us for that engagement in the three months before the claim arose, and we are not liable for indirect or consequential losses, including lost profit, lost revenue or lost data.",
        ],
      },
      {
        heading: "12. Ending an engagement",
        blocks: [
          "Either of us may end an engagement by giving the written notice stated in the proposal or statement of work. You pay for work performed and costs committed up to the end date. On full payment we hand over the deliverables completed to that point and any access we hold to your accounts.",
        ],
      },
      {
        heading: "13. Governing law",
        blocks: [
          "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai, and the courts of Dubai have jurisdiction over any dispute, unless your written agreement with us states otherwise.",
        ],
      },
      {
        heading: "14. Changes to these terms",
        blocks: [
          "We may update these terms from time to time. The version published on this page at the time you engage us applies to that engagement.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    kicker: "Legal",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | TDM",
    metaDescription:
      "How TDM: The Digital Marketing Services collects, uses, shares and protects personal information from this website, enquiries and client work.",
    intro: `This policy explains what personal information TDM: The Digital Marketing Services ("TDM", "we", "us") collects through ${site.domain} and in the course of our work, why we collect it, and the choices you have.`,
    sections: [
      {
        heading: "1. Who is responsible for your information",
        blocks: [
          `TDM: The Digital Marketing Services, ${HQ}, is responsible for the personal information described here. For any privacy question or request, email ${site.email}.`,
        ],
      },
      {
        heading: "2. Information we collect",
        blocks: [
          [
            "Enquiries: when you use the contact form we receive your name, email address, phone number if you give one, the service you are interested in and your message.",
            "Bookings: when you book a consultation, the scheduling provider collects your name, email address and the details you enter, and shares them with us.",
            "Email and phone: if you write to us or call us, we keep the correspondence and your contact details.",
            "Technical data: our hosting provider records standard server logs, such as IP address, browser type, pages requested and the time of the request, to keep the website secure and working.",
            "Client work: where we manage accounts or systems on your behalf, we process the information needed to do that work, under the terms of our agreement with you.",
          ],
          "We do not ask for, and you should not send us, sensitive personal information through this website.",
        ],
      },
      {
        heading: "3. How we use it",
        blocks: [
          [
            "To reply to your enquiry and provide the information or proposal you asked for.",
            "To arrange and hold consultations.",
            "To deliver services to our clients and manage our relationship with them.",
            "To keep the website secure, and to understand and fix problems with it.",
            "To meet our legal and accounting obligations.",
          ],
          "We do not sell your personal information, and we do not use it for automated decisions that have a legal effect on you.",
        ],
      },
      {
        heading: "4. Legal grounds",
        blocks: [
          "Where data protection law requires a legal basis, we rely on: your consent, when you send us an enquiry; the steps needed to enter into or perform a contract with you; our legitimate interest in running and securing our business and responding to people who contact us; and compliance with legal obligations.",
        ],
      },
      {
        heading: "5. Who we share it with",
        blocks: [
          "We share personal information only with providers that help us run the website and our business, and only as far as they need it:",
          [
            "Our website hosting provider.",
            "Web3Forms, which delivers contact form submissions to our inbox.",
            "Calendly, which runs consultation bookings.",
            "Supabase, which stores the website's content and the sign-in details of our own content editors.",
            "Our email, productivity and accounting providers.",
          ],
          "We may also disclose information where the law requires it, or to protect our rights, our clients or the public.",
        ],
      },
      {
        heading: "6. International transfers",
        blocks: [
          "TDM operates across several countries, and our team in Pakistan and our service providers may process information outside the country you live in. Where the law requires safeguards for such transfers, we rely on the mechanisms it provides, such as approved contractual clauses.",
        ],
      },
      {
        heading: "7. How long we keep it",
        blocks: [
          "We keep enquiry and correspondence records for as long as needed to respond and to maintain our business records, and client records for as long as the engagement lasts and afterwards for the period the law requires for accounting and legal purposes. When information is no longer needed, we delete it or make it anonymous.",
        ],
      },
      {
        heading: "8. Cookies and tracking",
        blocks: [
          "This website uses only the storage that is necessary for it to work, such as keeping our own editors signed in to the admin area. At the time of the last update shown on this page, it does not use advertising or analytics cookies.",
          "If we introduce analytics or advertising technologies in future, we will update this policy and, where the law requires it, ask for your consent first.",
        ],
      },
      {
        heading: "9. Your rights",
        blocks: [
          "Depending on where you live, you may have the right to ask for a copy of your personal information, to have it corrected or deleted, to restrict or object to how we use it, to receive it in a portable format, and to withdraw consent you have given. These rights exist under laws including the EU and UK GDPR and the UAE Personal Data Protection Law.",
          `To make a request, email ${site.email}. We may need to confirm your identity before acting on it. You also have the right to complain to the data protection authority where you live.`,
        ],
      },
      {
        heading: "10. Security",
        blocks: [
          "We use technical and organisational measures appropriate to the information we hold, including encrypted connections to this website and restricted access to our systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "11. Children",
        blocks: [
          "This website and our services are intended for businesses. We do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "12. Changes to this policy",
        blocks: [
          "We may update this policy as our services or the law change. The date at the top of this page shows when it was last revised.",
        ],
      },
    ],
  },
  {
    slug: "legal-notice",
    kicker: "Legal",
    title: "Legal Notice",
    metaTitle: "Legal Notice | TDM",
    metaDescription:
      "Publisher, contact and hosting details for the TDM: The Digital Marketing Services website, with intellectual property and liability information.",
    intro: `This notice identifies who publishes ${site.domain} and sets out the basic conditions that apply to its content.`,
    sections: [
      {
        heading: "Publisher",
        blocks: [
          "This website is published by TDM: The Digital Marketing Services.",
          [`Address: ${HQ}`, `Email: ${site.email}`, `Phone: ${site.phone}`, `United Kingdom: ${site.phoneUk}`],
        ],
      },
      {
        heading: "Hosting",
        blocks: [
          "This website is hosted by Hostinger. Its content database is hosted by Supabase.",
        ],
      },
      {
        heading: "Intellectual property",
        blocks: [
          "The text, design, graphics, logos and code on this website belong to TDM or are used with permission, and are protected by copyright and trademark laws. You may view and share pages for your own information. Copying, republishing or commercial use of the content requires our written permission.",
          "Client names, logos and partner badges shown on this website belong to their respective owners.",
        ],
      },
      {
        heading: "Accuracy and liability",
        blocks: [
          "We take care to keep the information on this website accurate and up to date, but we provide it without warranty, and we are not liable for decisions made on the basis of it. Results described in case studies relate to specific clients and are not a guarantee of future results.",
        ],
      },
      {
        heading: "External links",
        blocks: [
          "This website may link to websites run by others. We have no control over their content and accept no responsibility for it.",
        ],
      },
      {
        heading: "Related documents",
        blocks: [
          "Use of this website is also subject to our Terms & Conditions, and personal information is handled as described in our Privacy Policy. Both are linked in the footer of every page.",
        ],
      },
    ],
  },
];

export const getLegalDoc = (slug: LegalDoc["slug"]) => legalDocs.find((d) => d.slug === slug)!;
