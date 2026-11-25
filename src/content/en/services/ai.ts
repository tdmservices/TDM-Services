import type { Service } from "@/lib/types";

export const aiServices: Service[] = [
  {
    slug: "ai-development",
    sector: "ai",
    name: "AI Development",
    navLabel: "AI Development",
    shortDesc:
      "Custom AI applications and assistants built on large language models: chat assistants, search over your own documents and AI features inside the products you already run.",
    metaTitle: "AI Development Services: Custom LLM Apps | TDM",
    metaDescription:
      "TDM builds custom AI applications on large language models: chat assistants, answers from your own documents and AI features in existing products, tested.",
    hero: {
      headline: "Custom AI applications built around your business.",
      sub: "Chat assistants, answers drawn from your own documents and AI features inside your existing product: designed, built, tested and maintained by TDM.",
    },
    intro: [
      "TDM's AI development service designs and builds custom software on top of large language models for companies that want AI to do a specific job: answer customers, help staff find information, draft documents or add an intelligent feature to an existing product. It is for businesses that have moved past trying a public chatbot and now need something that knows their own content, follows their rules and fits into their systems.",
      "A language model on its own knows nothing about your prices, policies or customers. The engineering work is everything around the model: retrieving the right company information at the right moment, writing the instructions that shape its behaviour, connecting it to your data and tools, and checking its answers before they reach a user. That is the part we build.",
      "We work with the major commercial models from Anthropic, OpenAI and Google as well as open-source models, and we choose per project based on answer quality, running cost, speed and where your data is allowed to go. Because TDM also builds websites, mobile apps and business systems, the AI is delivered inside a working product with a proper interface, user accounts and hosting, not as a standalone demo.",
    ],
    features: [
      {
        title: "Chat assistants for customers and staff",
        desc: "Assistants for your website, app, WhatsApp or internal tools that answer in your tone, stay within the topics you set and pass the conversation to a person when they should.",
      },
      {
        title: "Retrieval over company documents",
        desc: "Retrieval-augmented generation (RAG): we index your manuals, policies, contracts and knowledge base in a vector database so the assistant answers from your content and cites the source.",
      },
      {
        title: "AI features inside existing products",
        desc: "Summaries, smart search, drafting, classification, recommendations and data extraction added to the website, app or CRM you already run, through the model providers' APIs.",
      },
      {
        title: "Prompt and model engineering",
        desc: "System prompts, structured outputs, tool calling and model selection worked out through testing, so each task uses the model that handles it well at a sensible running cost.",
      },
      {
        title: "Evaluation and guardrails",
        desc: "Test sets built from real questions, automated scoring of answers, input and output filters, and rules for what the assistant must refuse or escalate, run before launch and after every change.",
      },
      {
        title: "Deployment, monitoring and cost control",
        desc: "Hosting, access control, conversation logging, usage dashboards and spending limits, so you can see what the application is doing and what it costs to run.",
      },
    ],
    process: [
      {
        title: "Use case and scope",
        desc: "We define the job the AI must do, who will use it, which data it needs and what a good answer looks like, then confirm the task is a sound fit for a language model.",
      },
      {
        title: "Data and architecture",
        desc: "We review your content and systems, choose the model, the retrieval approach and the hosting setup, and agree how sensitive data will be handled.",
      },
      {
        title: "Prototype",
        desc: "We build a working version on a sample of your real content so you can test it with your own questions before the full build is committed.",
      },
      {
        title: "Build and evaluate",
        desc: "We develop the full application, connect it to your systems and run it against the evaluation set, adjusting prompts, retrieval and guardrails until the answers meet the agreed standard.",
      },
      {
        title: "Launch and improve",
        desc: "We deploy, monitor real conversations, fix the gaps that live use exposes and update the application as your content and the underlying models change.",
      },
    ],
    faqs: [
      {
        q: "What is custom AI development?",
        a: "Custom AI development means building software around a large language model so that it performs a defined task for your business using your own information. Examples are a support assistant that answers from your help centre, an internal tool that searches contracts, or a feature in your app that drafts replies. It differs from using a public chatbot because the application is connected to your data, limited to your rules and built into your own product.",
      },
      {
        q: "Which AI models does TDM build with?",
        a: "We build with the Claude models from Anthropic, the GPT models from OpenAI, Gemini from Google and open-source models that can be hosted privately. The choice depends on the task, the quality needed, the cost per request and any restriction on where data may be processed. We design the application so the model can be replaced later without rebuilding everything.",
      },
      {
        q: "Will the AI give wrong answers or make things up?",
        a: "Any language model can produce a wrong answer, and nobody can honestly promise it never will. We reduce the risk by making the assistant answer from your documents with sources shown, restricting it to defined topics, testing it against a set of real questions and sending uncertain or sensitive cases to a person. You see the test results before launch and decide whether the standard is acceptable for your use.",
      },
      {
        q: "Is our company data safe when we use AI?",
        a: "It depends on how the application is set up, which is why we settle it at the design stage. We use the providers' business APIs under their data terms rather than consumer apps, limit what is sent to the model to what the task needs, apply user permissions to retrieval so people only see what they are allowed to see, and can use privately hosted models where data must not leave your environment.",
      },
      {
        q: "Can you add AI to our existing website, app or software?",
        a: "Yes. Most projects add AI to something that already exists. We connect through your current APIs or database, build the AI component as a separate service and add the interface where your users already work, so the rest of your product stays as it is.",
      },
      {
        q: "How much does an AI application cost to build?",
        a: "The build cost depends on the number of use cases, how much content must be prepared, the integrations required and the level of testing your industry demands. There is also a running cost for model usage, which grows with the number of requests. TDM scopes the project in a free consultation and gives you a quote for the build together with an estimate of ongoing usage costs.",
      },
    ],
  },
  {
    slug: "mcp-development",
    sector: "ai",
    name: "MCP Development",
    navLabel: "MCP Development",
    shortDesc:
      "Model Context Protocol servers and connectors that let AI assistants read from and act in your CRM, databases and internal tools, with access you control.",
    metaTitle: "MCP Development: MCP Servers & Connectors | TDM",
    metaDescription:
      "TDM builds Model Context Protocol (MCP) servers and connectors so AI assistants can read from and act in your CRM, databases and internal tools, securely.",
    hero: {
      headline: "Connect AI assistants to the systems your company runs on.",
      sub: "TDM builds MCP servers and connectors that give assistants such as Claude and ChatGPT controlled access to your CRM, databases and internal tools.",
    },
    intro: [
      "TDM's MCP development service builds Model Context Protocol servers and connectors: the software that lets an AI assistant look up information in your company's systems and carry out tasks in them. It is for businesses whose teams already use AI assistants and want them to work with live company data, and for software companies that want their own product to be usable from inside those assistants.",
      "The Model Context Protocol, or MCP, is an open standard for connecting AI assistants to outside systems. In plain terms, it works like a universal plug. Without it, an assistant only knows what you paste into the chat. With an MCP server in place, a member of staff can ask the assistant to find a customer's open orders, summarise this week's support tickets or create a follow-up task, and the assistant fetches or updates that information in the real system.",
      "The value of a connector lies in what it is permitted to do. We design each MCP server around a short list of clearly defined actions, tie every request to the permissions of the person asking, and keep a record of what the assistant did. Your team gets an assistant that can do useful work, and you keep control over what it can see and change.",
    ],
    features: [
      {
        title: "Custom MCP servers",
        desc: "Servers written with the official MCP SDKs that expose your systems to AI assistants as tools, resources and prompts, built for remote hosting or for local use on staff machines.",
      },
      {
        title: "Connectors for CRM, databases and internal tools",
        desc: "Connections to platforms such as HubSpot, Salesforce and GoHighLevel, SQL databases, ERP and ticketing systems, file stores and the custom software your company has built.",
      },
      {
        title: "Authentication and permissions",
        desc: "OAuth sign-in, per-user access scopes and read-only or read-write modes, so the assistant can only reach what the person using it is already allowed to reach.",
      },
      {
        title: "Tool design for reliable use",
        desc: "Clear tool names, descriptions, input schemas and error messages, because an assistant uses a connector correctly only when each tool states exactly what it does.",
      },
      {
        title: "Approval steps and audit logs",
        desc: "Confirmation before sensitive actions such as sending, deleting or paying, plus a log of every call the assistant makes, kept for review.",
      },
      {
        title: "Hosting, documentation and maintenance",
        desc: "Deployment to your cloud or ours, setup instructions for each assistant your team uses, and updates when your systems or the MCP specification change.",
      },
    ],
    process: [
      {
        title: "Map the tasks",
        desc: "We list what your team wants to ask an assistant to do, which systems hold the information and which actions should stay off limits.",
      },
      {
        title: "Design tools and access",
        desc: "We specify each tool the server will offer, the data it returns, who may call it and which actions need a person to confirm.",
      },
      {
        title: "Build the server",
        desc: "We develop the MCP server against your systems' APIs or databases, with authentication, rate limits and error handling included.",
      },
      {
        title: "Test with real assistants",
        desc: "We connect the server to the assistants you use and run realistic requests, checking that the right tool is chosen, the results are correct and the permissions hold.",
      },
      {
        title: "Deploy and hand over",
        desc: "We host the server, roll it out to your users, document how it works and stay available for changes as your requirements grow.",
      },
    ],
    faqs: [
      {
        q: "What is MCP (Model Context Protocol)?",
        a: "MCP is an open standard, introduced by Anthropic and now supported by several AI providers, that defines how an AI assistant connects to external systems. An MCP server sits in front of a system such as your CRM and describes to the assistant what it can look up and what it can do there. The assistant then uses those capabilities during a conversation, instead of relying only on what the user types in.",
      },
      {
        q: "What is an MCP server used for in a business?",
        a: "It is used to let staff work with company systems through an AI assistant. Typical uses are looking up customer records, querying sales or stock figures, searching internal documents, drafting and logging replies, creating tasks and updating records. Software companies also publish MCP servers so their customers can use the product from inside an assistant.",
      },
      {
        q: "Is it safe to give an AI assistant access to our systems?",
        a: "It is as safe as the connector is strict. We build servers that expose only the specific actions you approve, enforce each user's existing permissions, require confirmation for actions that change or send anything important and log every call. We also recommend starting with read-only access and adding write actions once the team is comfortable.",
      },
      {
        q: "Which AI assistants work with MCP servers?",
        a: "MCP is supported by Claude and by a growing number of other assistants and AI development tools, including ChatGPT. Support differs between products and plans and changes over time, so we confirm which assistants your team uses at the start and test the server with each of them.",
      },
      {
        q: "Do we need MCP if our software already has an API?",
        a: "An API is written for programmers, while an MCP server presents the same capabilities in a form an AI assistant can discover and use by itself. If your system has an API, the MCP server is usually a layer built on top of it. If it has none, we can connect through the database or build the missing endpoints.",
      },
      {
        q: "What does it cost to build an MCP server?",
        a: "Cost depends on how many systems are connected, how many tools the server offers, the state of the existing APIs and the security requirements. A read-only connector to one well-documented system is a much smaller job than a server that writes to several. We give a quote once we have reviewed your systems in a free consultation.",
      },
    ],
  },
  {
    slug: "ai-automation",
    sector: "ai",
    name: "AI Automation",
    navLabel: "AI Automation",
    shortDesc:
      "AI agents and automations that take over repetitive knowledge work such as lead qualification, support triage, document handling and reporting, with human review where it matters.",
    metaTitle: "AI Automation Services: AI Agents for Business | TDM",
    metaDescription:
      "TDM builds AI agents that handle repetitive knowledge work: lead qualification, support triage, document handling and reporting, with human review where needed.",
    hero: {
      headline: "AI agents for the repetitive work your team should not be doing.",
      sub: "Lead qualification, support triage, document handling and reporting, run by AI agents that TDM builds, with your people reviewing the decisions that matter.",
    },
    intro: [
      "TDM's AI automation service builds AI agents and automations that carry out repetitive knowledge work for a business: reading incoming messages, sorting and answering them, pulling details out of documents, updating records and preparing reports. It is for companies where skilled staff spend a large part of the day on routine reading, copying and replying that follows a pattern.",
      "Traditional automation follows fixed rules and stops when the input is messy. An AI agent can read an email written in any style, understand a scanned invoice or decide which of several next steps applies. That makes it possible to automate work that used to need a person to read and judge, provided the agent is given clear instructions, the right tools and firm limits.",
      "We do not hand an agent the whole process and hope. Each automation is split into steps, with the agent handling the routine volume and a person approving anything costly, sensitive or uncertain. Every action is logged, so you can check what was done and why, and adjust the rules as you learn where the agent can be trusted with more.",
    ],
    features: [
      {
        title: "Lead qualification and follow-up",
        desc: "Agents that reply to new enquiries, ask the qualifying questions, score and route the lead, book the meeting and write the summary into your CRM.",
      },
      {
        title: "Support triage and drafted replies",
        desc: "Incoming tickets, emails and chats classified by topic and urgency, answered from your knowledge base where the answer is known and passed to the right person where it is not.",
      },
      {
        title: "Document handling",
        desc: "Invoices, contracts, forms, CVs and identity documents read with OCR and language models, the key fields extracted, checked against your rules and entered into your systems.",
      },
      {
        title: "Reporting and research",
        desc: "Agents that gather figures from your tools, compile recurring reports, summarise calls and meetings, and monitor sources you name for changes worth knowing about.",
      },
      {
        title: "Human review and approvals",
        desc: "Approval queues, confidence thresholds and escalation rules that put a person in front of refunds, payments, legal wording and any case the agent is unsure about.",
      },
      {
        title: "Monitoring and audit trail",
        desc: "Logs of each run, alerts on failures, accuracy checks on samples and usage cost tracking, so the automation stays visible after it goes live.",
      },
    ],
    process: [
      {
        title: "Process review",
        desc: "We sit with the people who do the work, map each step and identify which tasks are frequent and rule-like enough to automate first.",
      },
      {
        title: "Agent design",
        desc: "We define what the agent reads, which tools it may use, what it must never do and where a person signs off.",
      },
      {
        title: "Build and connect",
        desc: "We build the agent and link it to your inbox, CRM, help desk, document store and other tools through their APIs.",
      },
      {
        title: "Supervised pilot",
        desc: "The agent runs on real work with every output reviewed by your team, and we correct its instructions using the cases it gets wrong.",
      },
      {
        title: "Rollout and tuning",
        desc: "We widen the agent's responsibility in stages, keep measuring its accuracy and refine it as your process changes.",
      },
    ],
    faqs: [
      {
        q: "What is AI automation?",
        a: "AI automation uses language models to carry out tasks that involve reading, understanding and deciding, not only moving data between fields. An AI agent can interpret a free-text email, extract figures from a document or choose the next step in a process, then act through the tools it has been given. It extends automation to work that was previously too varied for fixed rules.",
      },
      {
        q: "What is the difference between AI automation and workflow automation?",
        a: "Workflow automation runs a set sequence: when this happens, do that. It suits predictable, structured tasks. AI automation adds judgment to the sequence, so it can deal with unstructured input such as messages, documents and voice notes. In practice the two are combined: a workflow moves the data and an AI step handles the part that needs understanding.",
      },
      {
        q: "Which business tasks are suited to AI agents?",
        a: "Good candidates are high in volume, follow a recognisable pattern and have a low cost when a mistake is caught by review. Common examples are qualifying leads, sorting and answering support requests, processing invoices and forms, screening applications, preparing reports and keeping CRM records up to date. Tasks with serious legal, financial or safety consequences should keep a person making the final decision.",
      },
      {
        q: "Will AI agents replace my staff?",
        a: "The aim is to remove routine work, not people. Agents take the repetitive reading, sorting and data entry, and your staff handle exceptions, relationships and decisions. How you use the time that frees up is a business choice for you. An agent still needs someone who owns the process and reviews its output.",
      },
      {
        q: "How do you stop an AI agent from making costly mistakes?",
        a: "We limit what it can do. The agent only has the tools the task requires, sensitive actions wait for human approval, low-confidence cases are escalated and every run is recorded. We start with a supervised pilot in which all output is checked, and extend the agent's authority only where its results justify it. No setup removes errors entirely, which is why the review steps stay in place.",
      },
      {
        q: "How is AI automation priced?",
        a: "The price reflects the number of processes automated, the systems to connect, the volume of work and the amount of review and testing needed. Running costs include model usage and any platform fees. After a free consultation and a look at your current process, TDM sends a quote that separates the build from the ongoing costs.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    sector: "ai",
    name: "Workflow Automation",
    navLabel: "Workflow Automation",
    shortDesc:
      "Your tools connected and your routine processes automated with n8n, Make.com, Zapier and GoHighLevel, so data moves between systems without manual copying.",
    metaTitle: "Workflow Automation: n8n, Make, Zapier & GHL | TDM",
    metaDescription:
      "TDM connects your tools and automates business processes with n8n, Make.com, Zapier and GoHighLevel: lead routing, follow-ups, invoicing, reporting and more.",
    hero: {
      headline: "Your tools connected. Your routine processes running on their own.",
      sub: "TDM designs and builds automations in n8n, Make.com, Zapier and GoHighLevel so information moves between your systems without anyone retyping it.",
    },
    intro: [
      "TDM's workflow automation service connects the software a business already uses and automates the steps between them, using n8n, Make.com, Zapier and GoHighLevel. It is for companies whose staff copy data from forms to spreadsheets to CRMs by hand, chase follow-ups from memory or lose leads in the gaps between tools.",
      "A workflow is a chain of steps started by an event: a form is submitted, a payment arrives, a deal changes stage. The automation then does what a person would otherwise do, such as creating the contact, sending the confirmation, notifying the salesperson, raising the invoice and updating the report. Built properly, it runs every time, in the same order, at any hour.",
      "The four platforms suit different situations, and part of our job is choosing between them. Zapier is the quickest route for simple links between popular apps. Make.com handles branching, multi-step scenarios with more control over the data. n8n can be hosted on your own server, which suits high volumes, custom logic and stricter data requirements. GoHighLevel is a CRM and marketing platform with automation built in, a strong fit for sales pipelines, appointment booking and follow-up by email, SMS and WhatsApp.",
    ],
    features: [
      {
        title: "Process mapping and automation plan",
        desc: "Your current process documented step by step, with the manual work, delays and duplicate data entry marked and a prioritised list of what to automate.",
      },
      {
        title: "n8n workflows",
        desc: "Self-hosted or cloud n8n setups for complex logic, custom code steps, large volumes and cases where you want your data and credentials on infrastructure you control.",
      },
      {
        title: "Make.com and Zapier automations",
        desc: "Scenarios and Zaps that link your forms, CRM, email, spreadsheets, accounting, e-commerce and messaging apps, with filters, routers and data formatting configured correctly.",
      },
      {
        title: "GoHighLevel setup and automation",
        desc: "Pipelines, calendars, forms, funnels and workflow builders configured in GoHighLevel: lead capture, instant replies, nurture sequences, reminders and review requests.",
      },
      {
        title: "Custom integrations",
        desc: "API and webhook connections for tools that have no ready-made connector, including in-house systems, so nothing in your stack is left out of the flow.",
      },
      {
        title: "Error handling, documentation and support",
        desc: "Retries, failure alerts and run logs on every workflow, written documentation of what each one does, and maintenance when an app changes its API.",
      },
    ],
    process: [
      {
        title: "Audit",
        desc: "We review your tools and walk through how work moves between them today, noting where time is lost and where errors enter.",
      },
      {
        title: "Platform choice and design",
        desc: "We pick the platform that fits your volume, budget and technical comfort, then draw each workflow with its triggers, conditions and outcomes for your approval.",
      },
      {
        title: "Build",
        desc: "We create the workflows in your own accounts, so you own them, and connect each app with the minimum access it needs.",
      },
      {
        title: "Test",
        desc: "We run every path with real sample data, including the awkward cases: missing fields, duplicates, failed payments and unavailable services.",
      },
      {
        title: "Go live and maintain",
        desc: "We switch the workflows on, watch the first runs, train your team to read the logs and make simple edits, and remain on hand for changes.",
      },
    ],
    faqs: [
      {
        q: "What is workflow automation?",
        a: "Workflow automation is the use of software to carry out a repeatable business process without manual steps. An event in one tool triggers actions in others: a new lead is added to the CRM, assigned to a salesperson, sent a welcome message and logged in a report. It removes retyping, shortens response times and makes sure steps are not forgotten.",
      },
      {
        q: "Should I use n8n, Make.com or Zapier?",
        a: "Zapier is the easiest to learn and connects to the widest range of apps, so it suits simple automations and non-technical teams. Make.com is better at complex branching and data transformation and gives finer control over each step. n8n is the most flexible, can run on your own server and suits technical teams, heavy usage or sensitive data. Many businesses use more than one, and we recommend based on your processes, not on a preference of ours.",
      },
      {
        q: "What is GoHighLevel and when does it make sense?",
        a: "GoHighLevel is an all-in-one sales and marketing platform that combines a CRM, pipelines, calendars, forms, funnels, email, SMS and its own workflow builder. It makes sense for service businesses and agencies that want lead capture, follow-up and booking in one place instead of several separate tools. If you already run an established CRM, connecting it with n8n, Make.com or Zapier is often the better route.",
      },
      {
        q: "Can you automate tools that do not integrate with each other?",
        a: "Usually, yes. If both tools have an API or can send and receive webhooks, we can connect them through one of the automation platforms even when no official connector exists. Where a tool offers neither, we look at alternatives such as email parsing, file exports or a database connection, and tell you plainly if a reliable link is not possible.",
      },
      {
        q: "Who owns the automations after they are built?",
        a: "You do. We build in accounts registered to your business, hand over the documentation and show your team how each workflow operates. You can run them yourself, have us maintain them or pass them to another developer.",
      },
      {
        q: "What affects the cost of workflow automation?",
        a: "The main factors are how many workflows you need, how many steps and conditions each contains, whether custom integrations are required and how clean the existing data is. The platforms also charge their own subscription fees, which vary with usage. We set out both parts in a quote following a free consultation.",
      },
    ],
  },
  {
    slug: "ai-data-systems",
    sector: "ai",
    name: "AI & Data Systems",
    navLabel: "AI & Data",
    shortDesc:
      "The data foundations AI depends on: pipelines, a central warehouse, clean and consistent data, dashboards, and AI applications built on top of them.",
    metaTitle: "AI & Data Systems: Pipelines & Dashboards | TDM",
    metaDescription:
      "TDM builds the data foundations AI needs: pipelines, data warehouses, clean and consistent data, dashboards, and AI analytics on top of them.",
    hero: {
      headline: "Get your data in order, then put AI to work on it.",
      sub: "Pipelines, a central warehouse, cleaned data and dashboards your team can rely on, with AI analysis and assistants built on that foundation.",
    },
    intro: [
      "TDM's AI and data systems service builds the data infrastructure a business needs before AI can be useful: pipelines that collect data from every tool, a warehouse that stores it in one place, cleaning and modelling that make it consistent, dashboards that report on it, and AI applications that work on top. It is for companies whose information is scattered across a CRM, an online store, ad accounts, accounting software and spreadsheets, with no single version of the numbers.",
      "AI gives answers only as good as the data behind it. If customer records are duplicated, product names differ between systems and sales figures disagree from one report to the next, an AI assistant will repeat those errors with confidence. Fixing the foundation first is what makes later AI projects reliable.",
      "We build with established tools: cloud warehouses such as BigQuery, Snowflake and PostgreSQL, ingestion tools such as Airbyte and Fivetran, dbt for transformation, and Looker Studio, Power BI or Metabase for reporting. The stack is sized to your business, so a small company gets a simple, low-maintenance setup and not an enterprise platform it has to hire a team to run.",
    ],
    features: [
      {
        title: "Data pipelines",
        desc: "Automated, scheduled extraction from your CRM, e-commerce platform, ad accounts, analytics, finance tools and databases into one destination, with failures detected and reported.",
      },
      {
        title: "Data warehouse setup",
        desc: "A central warehouse designed around your business: schemas, access roles, cost controls and backups, hosted in the cloud account and region you choose.",
      },
      {
        title: "Cleaning and modelling",
        desc: "Deduplication, standard naming, matching of customers and products across systems and agreed definitions for each metric, documented and version controlled.",
      },
      {
        title: "Dashboards and reporting",
        desc: "Dashboards for management, sales, marketing and operations that refresh automatically and draw every figure from the same modelled tables.",
      },
      {
        title: "AI on your data",
        desc: "Natural-language questions answered from the warehouse, automatic written summaries of performance, forecasting, customer segmentation and anomaly alerts.",
      },
      {
        title: "Governance and data quality",
        desc: "Automated tests on incoming data, access permissions by role, handling rules for personal data and a record of where each number comes from.",
      },
    ],
    process: [
      {
        title: "Data audit",
        desc: "We list every source, assess how complete and consistent each one is and record the business questions the data must be able to answer.",
      },
      {
        title: "Architecture",
        desc: "We select the warehouse, ingestion and reporting tools, design the data model and estimate what the platform will cost to operate.",
      },
      {
        title: "Pipelines and warehouse",
        desc: "We connect the sources, load the history and build the transformation layer that turns raw records into clean, defined tables.",
      },
      {
        title: "Dashboards and AI layer",
        desc: "We build the reports each team needs and add the AI features, checking results against figures you already trust.",
      },
      {
        title: "Handover and monitoring",
        desc: "We document the system, train your team to use it, set up quality alerts and extend it as new sources and questions arise.",
      },
    ],
    faqs: [
      {
        q: "Why does AI need clean data?",
        a: "An AI model works with whatever it is given. If the underlying records contain duplicates, gaps or conflicting definitions, its analysis and answers will be wrong while still sounding certain. Clean, well-structured data is the main factor in whether a business AI project produces results people can act on.",
      },
      {
        q: "What is a data warehouse and does a small business need one?",
        a: "A data warehouse is a database built for analysis that holds data from all your systems in one place. A business needs one when it reports from several tools and the numbers no longer match, or when it wants AI to work across all its data. For a small company this can be a modest, inexpensive setup, and we say so if a simpler approach would serve you for now.",
      },
      {
        q: "What is a data pipeline?",
        a: "A data pipeline is an automated process that copies data from a source system to a destination on a schedule, then cleans and reshapes it for use. It replaces manual exports and spreadsheet imports, so reports and AI tools are always working from current data.",
      },
      {
        q: "Can we ask questions of our data in plain language?",
        a: "Yes, once the data is modelled. We build assistants that turn a question such as which products had falling sales last month into a query on the warehouse and return the answer with the figures behind it. Accuracy depends on clear metric definitions, so this layer comes after the modelling work, and we test it against known results before your team relies on it.",
      },
      {
        q: "Which data tools and platforms does TDM work with?",
        a: "We work with BigQuery, Snowflake, Amazon Redshift and PostgreSQL for storage, Airbyte, Fivetran and custom Python jobs for ingestion, dbt for transformation, and Looker Studio, Power BI, Tableau and Metabase for dashboards. If you already use a tool, we normally build on it instead of replacing it.",
      },
      {
        q: "How do you price a data and AI project?",
        a: "Pricing follows the number of data sources, the condition of the data, the number of dashboards and the AI features required. Cloud storage and tool subscriptions are billed by their providers and scale with volume. TDM reviews your setup in a free consultation, then provides a quote and an estimate of those platform costs.",
      },
    ],
  },
  {
    slug: "founder-ai-systems",
    sector: "ai",
    name: "AI Systems for Founders",
    navLabel: "AI for Founders",
    shortDesc:
      "A one-time, on-site engagement: TDM comes to your premises, sets up a complete set of AI systems around how you run your business and trains you to manage them yourself.",
    metaTitle: "AI Systems for Founders: One-Time On-Site Setup | TDM",
    metaDescription:
      "A one-time engagement at your premises: TDM sets up AI systems around how you run your business and trains you to manage them yourself. No monthly retainer.",
    hero: {
      headline: "Your AI systems, set up on site once and handed over to you.",
      sub: "TDM comes to your premises, builds AI systems around the way you run your business and trains you to operate them without us. One engagement. No monthly retainer.",
    },
    intro: [
      "AI Systems for Founders is a one-time engagement delivered on site at the founder's premises. TDM designs and sets up a complete set of AI systems around how you personally run your business, then trains you to manage all of it yourself. It is for founders and owner-managers who want AI working across their day, their communication and their operations, and who want to own and control the result instead of depending on an agency.",
      "This is not a monthly retainer. We come to you, do the work at your office alongside you and your team, hand everything over and leave. The accounts, the configurations, the prompts and the documentation are yours. The engagement is planned so that when it ends you can run, adjust and extend the systems without calling TDM.",
      "Being on your premises is the point. We see how decisions are made, where your time goes, what lands in your inbox and which tasks only you can do. The systems are built around that reality, using your real documents and tools, and the training happens on the setup you will use the following morning.",
    ],
    features: [
      {
        title: "On-site review of how you work",
        desc: "Time spent at your premises observing your routines, your tools and your team's handoffs, so the systems are designed for your business and not from a generic template.",
      },
      {
        title: "Your personal AI workspace",
        desc: "An AI assistant configured with your company knowledge, your writing style and your standing instructions, with projects and saved prompts for the tasks you repeat.",
      },
      {
        title: "Systems for the founder's workload",
        desc: "AI support for email and messages, meeting notes and action items, proposals and documents, research, hiring and the regular reports you review.",
      },
      {
        title: "Connections to your business tools",
        desc: "Your assistant and automations linked to the CRM, calendar, files and communication tools you already use, set up in accounts you own.",
      },
      {
        title: "Hands-on training for you and your team",
        desc: "Practical sessions on your own setup: how to use each system, how to write good instructions, how to check AI output and how to change things safely.",
      },
      {
        title: "Full handover",
        desc: "Written documentation, a library of your prompts and workflows, all logins and admin rights transferred to you, and a clear guide for maintaining the systems yourself.",
      },
    ],
    process: [
      {
        title: "Consultation and preparation",
        desc: "Before we travel, we discuss your business, your tools and your priorities, agree the scope and arrange the access we will need on arrival.",
      },
      {
        title: "On-site discovery",
        desc: "At your premises we go through your working day, your recurring tasks and your team's processes, and agree which systems to build.",
      },
      {
        title: "Build and configure",
        desc: "We set up the systems on site in your own accounts, using your real data, and adjust them with you as you try each one.",
      },
      {
        title: "Training",
        desc: "We train you and the team members you choose until you can operate, edit and extend every system without help.",
      },
      {
        title: "Handover and exit",
        desc: "We deliver the documentation and credentials, confirm you are running everything yourself and close the engagement.",
      },
    ],
    faqs: [
      {
        q: "What is AI Systems for Founders?",
        a: "It is a single engagement in which TDM visits a founder's premises, designs AI systems around the way that founder runs the business, sets them up and trains the founder to manage them. It covers the founder's own workload and the core processes around it. The outcome is a working set of AI systems that you own and operate yourself.",
      },
      {
        q: "Is this a monthly retainer or an ongoing contract?",
        a: "No. It is a one-time engagement with a defined scope and a defined end. Once the systems are set up, the training is complete and the handover is done, the work is finished and there is no recurring fee to TDM. You will still pay the AI and software providers directly for the subscriptions you use.",
      },
      {
        q: "Why is the work done at our premises and not remotely?",
        a: "Because the systems are built around how you really work, and that is hard to see on a video call. On site we can observe your routines, speak to your team, work on your actual tools and train you in person on the finished setup. It also lets us adjust things immediately as you test them.",
      },
      {
        q: "Will I be able to manage the AI systems myself afterwards?",
        a: "That is the purpose of the engagement. We choose tools a non-technical founder can maintain, avoid setups that need a developer to change, train you on your own configuration and leave written documentation. If something is too complex for you to run alone, we say so during the design and simplify it.",
      },
      {
        q: "What if we want more help later?",
        a: "You are not tied to us, and the handover is designed so you do not need further help. If you later want something larger, such as a custom AI application or a new automation, you can commission it from TDM as a separate project, or from anyone else, since you hold all the accounts and documentation.",
      },
      {
        q: "How long does it take and what does it cost?",
        a: "Both depend on the size of your business, the number of systems you want, the tools involved, how many people need training and where your premises are. We do not publish a fixed figure because the scope differs for every founder. TDM agrees the scope with you in a free consultation and then quotes for the engagement as a whole.",
      },
    ],
  },
];
