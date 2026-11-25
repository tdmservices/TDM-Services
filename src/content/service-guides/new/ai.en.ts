import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "ai/ai-development": {
    title: "What to know before you commission a custom AI application",
    sections: [
      {
        heading: "Is a custom AI build right for you now?",
        body: [
          "A custom build makes sense when you can name one job, the people who will use it and the content it should draw on. If the need is still \"we should do something with AI\", a subscription to a general assistant and a period of real use by your team will teach you more than a project would.",
          "Look at your content too: an assistant answering from outdated policies or contradictory price lists will repeat them. Our free AI project brief generator helps you write down the job, the users and the data in a form any supplier can quote from.",
        ],
      },
      {
        heading: "What drives the cost",
        body: [
          "Two bills come with an AI application: the build, and the usage charged by the model provider for every request. Ask for separate estimates. The build moves with these factors:",
        ],
        bullets: [
          "How many distinct jobs the application does. One well-defined task is far simpler to build and test than a general assistant.",
          "The state of your content: clean text is simple to index, scanned PDFs and spreadsheets take preparation.",
          "How many systems it must read from or write to.",
          "Who uses it. A public assistant needs stricter testing and monitoring than an internal tool for a small team.",
        ],
      },
      {
        heading: "What to expect once work starts",
        body: [
          "Expect to be asked early for sample documents, access to a test environment and, above all, a list of real questions with the answers you would accept. That list becomes the yardstick for the whole project, so the person who knows the subject best should write it.",
          "You will also settle matters only you can decide: which topics are off limits, when a conversation is passed to a person, and who keeps the content current after launch. The order and timing of the stages depend on the brief and are set out in the plan.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "Judge the application on your own questions, not on a demo script. Ask to see the score on the agreed test set, the cases it failed and what was changed as a result.",
          "Be wary of a supplier who quotes before seeing your content, shows no way of measuring answer quality, cannot say what a typical request costs, or ties the application to one model so tightly that switching would mean starting again.",
        ],
      },
    ],
    faqs: [
      { q: "Should we build a custom AI application or use an off-the-shelf tool?", a: "Start with an off-the-shelf product if one does the job: many help desks, CRMs and office suites now include AI features. A custom build is worth it when the tool cannot reach your data, cannot follow your rules, or when the feature is part of the product you sell." },
      { q: "Do we need to train or fine-tune a model on our data?", a: "Usually not. Most business applications hand the model the relevant documents at the moment of the question, a method called retrieval, which is easier to keep current than training. Fine-tuning suits a narrow, repetitive task where a consistent format matters and you have many good examples." },
      { q: "Who keeps an AI assistant up to date after launch?", a: "Someone on your side should own the content, because the assistant repeats whatever the source documents say. Agree before the build how new documents are added and who reviews flagged conversations. Technical upkeep can stay with the supplier, but responsibility for what the assistant says is yours." },
    ],
  },
  "ai/mcp-development": {
    title: "What to know before you commission an MCP server",
    sections: [
      {
        heading: "Is an MCP server right for you now?",
        body: [
          "An MCP server is worth building when your staff already use an AI assistant daily and keep copying data into it from the same systems. If the assistant is not yet part of how people work, the connector will sit unused.",
          "Check whether a connector already exists before paying for one. Many software vendors now publish their own MCP servers, and an official one is usually the better choice when it covers what you need. A custom server makes sense for in-house systems, or when the vendor's version exposes more than you want staff to reach. Our free AI project brief generator is a quick way to list the systems, the tasks and the limits before you ask for a quote.",
        ],
      },
      {
        heading: "What drives the cost",
        body: ["The price follows the amount of careful design, not the amount of code. The main factors are:"],
        bullets: [
          "The number of actions the assistant can take, and how many of them change data instead of only reading it.",
          "The quality of the underlying system's API: documented and stable, or partial.",
          "How sign-in works. Tying each request to an individual user's account takes more work than a single shared key, and is nearly always the right choice.",
          "How many different assistants must be supported and tested.",
        ],
      },
      {
        heading: "What to expect once work starts",
        body: [
          "The work begins with questions, not code. You will be asked for example requests in the words your staff would use, a test account for each system, and a contact who can grant API access.",
          "Expect a round of decisions about limits: which records are out of bounds, which actions need a confirmation click, and what gets logged. Then comes testing with the people who will use the connector, because real phrasing reveals gaps that a developer's test never does. The schedule is agreed in the plan, since it depends on how many systems and actions are involved.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "Ask a colleague who was not involved to try the server with ordinary requests and watch three things: does the assistant choose the right tool, does it return only what that person is allowed to see, and does it say clearly when something fails?",
          "Warning signs: a single administrator key shared by everyone, a tool that accepts raw database queries, delete or send actions with no confirmation, and no log. Text fetched from emails or web pages can contain instructions aimed at the assistant, so ask how the design limits the damage if that happens.",
        ],
      },
    ],
    faqs: [
      { q: "Can we use an existing MCP server instead of building one?", a: "Often, yes. Check the software vendor's documentation first. Prefer servers published by the company that makes the software, and review any third-party server's code and permissions before connecting it to live data, since it will act with the access you give it." },
      { q: "What is the difference between a local and a remote MCP server?", a: "A local server runs on the user's own computer and is started by the assistant application, which suits developers. A remote server runs at a hosted address and is reached over the internet with sign-in, so a whole team can use it without installing anything." },
      { q: "Does connecting an assistant through MCP mean our data is used to train AI models?", a: "MCP itself only carries data between the assistant and your system. What happens next depends on the assistant provider's terms and on your plan, so read the current terms for the product you use. The server can also be designed to return only the fields a task needs." },
    ],
  },
  "ai/ai-automation": {
    title: "What to know before you automate work with AI agents",
    sections: [
      {
        heading: "Is AI automation right for you now?",
        body: [
          "The best first candidate is a task your team already does the same way many times a week, where you could explain to a new hire how to do it and how to tell a good result from a bad one. If nobody can describe the rules, an agent will not discover them.",
          "Count the hours before you commission anything. Our free automation ROI calculator turns the time a task takes, how often it happens and what that time costs into a figure you can compare with a quote. If the saving is small, a tidier process may be the better spend.",
        ],
      },
      {
        heading: "What drives the cost",
        body: ["An agent's price is driven less by the AI than by everything it has to touch and by how much checking the task deserves:"],
        bullets: [
          "How varied the input is. Typed emails in one language are easier than handwritten forms, voice notes and mixed languages.",
          "The number of systems the agent reads from and writes to.",
          "The cost of an error. Work involving money, contracts or personal data needs more review steps and more testing.",
          "How many exceptions the process has, since each one needs a rule or a route to a person.",
        ],
      },
      {
        heading: "What to expect once work starts",
        body: [
          "You will be asked for real examples, and plenty of them: past emails, documents and tickets together with what your team did with each. Include the awkward ones, because an agent tuned only on tidy cases fails on the first messy one.",
          "Name one person who owns the process and has time to review output during the trial, because their corrections are what improve the agent. Tell staff early what is changing and why. How long the supervised period lasts depends on the task and is agreed in the plan.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "Decide the measures before launch: the share of cases handled without correction, the share passed to a person, and the cost per case. Keep checking a sample by hand even when everything looks fine, since quality can drift when your inputs or the underlying model change.",
          "Warning signs include a promise of full autonomy from the first day, no test on your own historical cases, no log you can read, no way to pause the agent quickly, and accuracy claims quoted without saying how they were measured.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between an AI agent and a chatbot?", a: "A chatbot answers a person who is typing to it. An agent is given a goal and tools, and works through the steps itself: it reads the input, decides what to do, acts in your systems and reports back, often with no conversation at all." },
      { q: "Do we need to tidy up our process before automating it with AI?", a: "Yes, at least in outline. You do not need perfect documentation, but you do need agreement on the steps, the rules for common cases and who decides the exceptions. Mapping the process often removes steps that never needed doing, which is a saving in itself." },
      { q: "What happens when the AI model behind our agent is updated or retired?", a: "Providers release new model versions and withdraw old ones, and behaviour can shift between versions. A well-built agent names the exact model version it uses and is run against a test set of past cases before any switch. Ask whether that retesting is part of the maintenance agreement." },
    ],
  },
  "ai/workflow-automation": {
    title: "What to know before you automate your workflows",
    sections: [
      {
        heading: "Is workflow automation right for you now?",
        body: [
          "Automation pays when a process is stable. If you are still changing how leads are handled every other week, wait until the steps settle, because each change means rebuilding the workflow. The same goes for tools: automate after you have chosen your CRM, not before.",
          "A good test is to ask how often a task happens and how long it takes by hand. Our free automation ROI calculator does that sum for you and shows whether the saving justifies the build. Start with one process that hurts, such as slow replies to new enquiries.",
        ],
      },
      {
        heading: "What drives the cost",
        body: ["Two things are paid for: the work of designing and building, and the platform subscriptions, which belong in your own name. What moves the first figure:"],
        bullets: [
          "The number of apps involved and whether each has a ready-made connector.",
          "Branching. A straight line of steps is simple, while a flow with conditions, waits and loops takes far more effort to build and test.",
          "Data quality. Duplicates, inconsistent formats and missing fields have to be handled before records can move safely.",
          "Whether you host the platform yourself, as n8n allows, which adds server setup and upkeep.",
        ],
      },
      {
        heading: "What to expect once work starts",
        body: [
          "You will be asked for access to each tool, and for someone who can explain what happens today, including the exceptions that live only in people's heads. Expect questions that sound fussy: what should happen if the same person fills in the form twice, or if the payment fails after the invoice is sent? The answers are the design.",
          "Before anything is switched on you should see each workflow written out in plain words and approve it. The timetable depends on the number of workflows and the state of your data, and is fixed in the plan.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "Judge an automation by what happens when something goes wrong, since the normal path is the easy part. Ask to see a failed run: who was alerted, what was retried and how the record was recovered.",
          "Warning signs: workflows built in the supplier's account instead of yours, passwords shared by chat, no names or notes inside the workflows, and a single enormous workflow that does everything, which nobody will dare to edit later.",
        ],
      },
    ],
    faqs: [
      { q: "Can I build automations myself without a developer?", a: "For simple links between two popular apps, yes: Zapier and Make.com are designed for non-programmers and offer templates. Help becomes worthwhile when a flow has several branches, touches money or customer messages, or must not fail silently." },
      { q: "What happens when an automation breaks?", a: "Automations break for ordinary reasons: an app changes its API, a login expires, a field is renamed. A well-built workflow alerts a named person with enough detail to act. Ask how failed runs are replayed, so that the leads or orders that arrived during the fault are not lost." },
      { q: "Is workflow automation worth it for a small business?", a: "Often more than for a large one, because a small team feels every hour of retyping. The test is frequency: a task done many times a day repays automation far sooner than a task done once a month. Begin with the processes that touch customers or cash." },
    ],
  },
  "ai/ai-data-systems": {
    title: "What to know before you invest in a data and AI system",
    sections: [
      {
        heading: "Is a data project right for you now?",
        body: [
          "The clearest sign is argument about numbers. If sales, marketing and finance each bring a different revenue figure to the same meeting, or a recurring report costs someone long sessions of exporting and pasting, the problem is the foundation, and no dashboard tool or AI assistant will solve it alone.",
          "If you run on one or two systems and their built-in reports answer your questions, you probably do not need a warehouse yet. Write down the questions you cannot answer today, because that list is the real brief. Our free AI project brief generator gives you a structure for it.",
        ],
      },
      {
        heading: "What drives the cost",
        body: ["Cost follows the mess, not the size of the company. The main factors:"],
        bullets: [
          "The number of sources, and whether each has a standard connector or needs custom extraction.",
          "How inconsistent the data is: duplicate customers, product codes that differ between systems, free-text fields.",
          "How much history you want loaded and how fresh the data must be.",
          "How many metrics need an agreed definition, which is a business discussion more than a technical one.",
        ],
      },
      {
        heading: "What to expect once work starts",
        body: [
          "You will be asked for read access to each source, for sample reports you currently trust, and for a decision-maker who can settle definitions: what counts as an active customer, when a sale is recorded, which currency applies. These debates are normal, and often the most valuable part of the project.",
          "Expect the first results to expose problems in the source systems themselves, such as fields nobody fills in. Some are fixed in the pipeline, others need a change in how your team enters data. The sequence and timing of the work are laid out in the plan, as they depend on what the audit finds.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "Pick a few figures you know to be right, such as invoiced revenue for a closed period taken from the accounts, and check that the new system reproduces them. Then ask what happens when a load fails overnight: who is told, and does the dashboard show that its data is stale?",
          "Be cautious if a supplier wants to start with dashboards or an AI chat layer before definitions are agreed, keeps the warehouse in its own cloud account, or leaves the transformation logic undocumented.",
        ],
      },
    ],
    faqs: [
      { q: "Can we keep using spreadsheets for reporting?", a: "Spreadsheets are fine for exploring and for small, one-person analyses. They become a risk when several people edit copies, when formulas hide manual corrections, and when a report depends on one person remembering the steps. Keep them as a place to look at numbers that come from a single governed source." },
      { q: "Who should own the data system inside our company?", a: "Name one business owner, not only a technical one. That person approves metric definitions, decides who may see what and is told when quality checks fail. Without an owner, definitions drift and the old arguments about figures return." },
      { q: "How does data protection law affect a data warehouse?", a: "Copying personal data into a warehouse is processing in its own right, so the usual obligations apply: a clear purpose, only the fields you need, access limited by role, retention periods and deletion on request. Take advice from your own data protection officer or lawyer for your case." },
    ],
  },
  "ai/founder-ai-systems": {
    title: "What to know before you book an on-site AI setup",
    sections: [
      {
        heading: "Is this engagement right for you now?",
        body: [
          "It suits a founder who is personally the bottleneck: the inbox, the proposals, the approvals and the reporting all pass through you, and you are willing to change how you work. It does not suit someone hoping to delegate the whole subject, because the systems are built around your habits and you have to use them afterwards.",
          "If you have already tried an AI assistant for a few tasks, you will know which parts of your day you want help with. Listing those tasks beforehand, with our free AI project brief generator for example, makes the first conversation far more specific.",
        ],
      },
      {
        heading: "What drives the cost",
        body: ["Software subscriptions are separate and paid by you to each provider, so ask for a list of the plans you will need before the visit. The engagement itself is shaped by practical matters as much as technical ones:"],
        bullets: [
          "How many areas of your work are covered: email only, or also meetings, documents, hiring and reporting.",
          "The number of tools to connect, and whether your current plans for those tools allow integrations.",
          "How many people are trained alongside you.",
          "The location of your premises, which determines travel.",
        ],
      },
      {
        heading: "What to expect before and during the visit",
        body: [
          "Before the visit you will be asked to prepare administrator access to your accounts, examples of documents you write often, and a short list of the tasks that take most of your week. Tell your team what is happening, since they will be asked how work reaches you.",
          "During the visit, block real time in your calendar. The engagement fails if you are in meetings while the systems are configured without you. Expect to do the tasks yourself while being coached, which is slower than watching and far more useful. The length of the visit depends on the agreed scope and is confirmed in the plan.",
        ],
      },
      {
        heading: "How to judge the work, and warning signs",
        body: [
          "The test can be run before anyone leaves: can you, alone, complete each agreed task with the new setup, change an instruction, add a document to the assistant's knowledge and switch an automation off? Check that every account is registered to your company email and that you hold the administrator rights.",
          "Warning signs in any offer of this kind: accounts opened in the supplier's name, training delivered as a slide deck instead of practice on your real work, and a handover that quietly leads into a support contract you did not ask for.",
        ],
      },
    ],
    faqs: [
      { q: "Which AI subscriptions will I need to pay for?", a: "It depends on the systems chosen, but typically a business plan for one AI assistant, plus whichever automation or note-taking tools the design calls for. Business plans matter because they come with administration controls and data terms suited to company information." },
      { q: "Is it safe to put confidential company documents into an AI assistant?", a: "It can be, with the right plan and settings. Use business accounts, not personal ones, and read the provider's terms on whether your content is used to train models. Decide in advance which categories of document stay out altogether, such as certain legal or personnel files." },
      { q: "How do I get my team to use AI after the setup?", a: "Adoption follows example. When the founder uses the systems in plain view and shares what worked, the team copies it. Give each person one or two concrete tasks to do with AI instead of a general instruction to use it, and agree what must always be checked by a person." },
    ],
  },
};
