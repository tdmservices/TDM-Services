import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "3d-design/3d-software-development": {
    title: "What to know before you commission interactive 3D software",
    sections: [
      {
        heading: "Is interactive 3D right for you now?",
        body: [
          "Interactive 3D earns its place when seeing and handling the product changes a decision: a buyer choosing between finishes or a sales team explaining how a machine fits together. If good photographs would do the same job, the money is better spent elsewhere.",
          "Before you ask for quotes, you need a clear list of the products or scenes to cover, and a page, store or app where the experience will live. Our free 3D project brief generator turns those answers into a document you can send to any supplier.",
        ],
      },
      {
        heading: "What drives the cost",
        body: [
          "A 3D application is priced on the effort to produce the assets and the effort to write the software around them.",
        ],
        bullets: [
          "How much a user can change: a fixed viewer is far simpler than a configurator with rules about which options can be combined.",
          "The devices it has to run on, since supporting older phones means stricter limits on model size and effects.",
          "The connections to other systems, such as live prices, stock, a cart or a quote request.",
        ],
      },
      {
        heading: "What to expect once the build starts",
        body: [
          "You will be asked for more than files: your product rules (which options exist and which combinations are not allowed), access to a test version of your site or store, and one person who can approve decisions.",
          "A small working sample comes before the full build. Approve it on the phone your customers use, not on a designer's workstation. How long each stage takes depends on the brief and the state of your assets, and is agreed in the plan.",
        ],
      },
      {
        heading: "How to judge the result, and warning signs",
        body: [
          "Judge it on your own devices and on a mobile connection. It should load without a long wait, show colours and materials that match the real product, and pass the right options through to the order or enquiry.",
          "Be wary of a supplier who demonstrates only on a powerful computer, has no answer for devices that cannot run 3D, keeps the source code or the models, or quotes without asking where the experience will be embedded.",
        ],
      },
    ],
    faqs: [
      { q: "Should I build a custom 3D configurator or use a ready-made platform?", a: "Ready-made configurator and viewer platforms suit standard products with simple options, and usually charge a recurring subscription. A custom build suits complex option rules, unusual visuals or deep links with your own systems, and you own the result." },
      { q: "Who updates a 3D configurator when products change?", a: "Small changes such as a new colour or price can often be made by your own team if an admin screen or a data file is part of the scope. A new product needs a new model prepared to the same standard, which is usually work for a 3D artist." },
      { q: "Can search engines read the content inside a 3D viewer?", a: "Not in the way they read text. A 3D scene is drawn on a canvas, so the names and specifications shown inside it are generally not indexed as page content. Keep the important product information as normal text and images on the page." },
    ],
  },
  "3d-design/3d-modeling": {
    title: "What to know before you order 3D models",
    sections: [
      {
        heading: "Is a 3D model what you need now?",
        body: [
          "Order a model when you know what you will do with it. The use decides almost everything about how the model is built, so \"a 3D model of our product\" is not yet a brief.",
          "Check what you already own too: a manufacturer or a previous agency may hold CAD or 3D files that can be adapted. Before you request quotes, list each object, its intended use and the references you have; our free 3D project brief generator sets this out for you.",
        ],
      },
      {
        heading: "What drives the cost",
        body: [
          "Modeling is charged on artist time, and a handful of things decide how much of it an asset needs:",
        ],
        bullets: [
          "Shape: hard-edged objects such as furniture or appliances are quicker than organic forms such as characters, fabric or plants.",
          "How close the camera will get, because detail that is never seen does not need to be built.",
          "The quality of your references, since guesswork from two blurry photos means extra rounds of correction.",
          "Volume and similarity: a range that shares parts or materials costs less per item than unrelated one-off objects.",
        ],
      },
      {
        heading: "What to expect once modeling starts",
        body: [
          "You will be asked to name one person to give feedback, and to give it at the agreed checkpoints. A change to proportions is cheap early and costly once textures are painted, so look carefully at the first rough version even though it looks unfinished.",
          "For a large batch, ask for one asset to be completed first as a reference standard. Delivery dates depend on the number and complexity of the assets and are set out in the plan.",
        ],
      },
      {
        heading: "How to judge a model, and warning signs",
        body: [
          "Warning signs appear early: a supplier who never asks where the model will be used, shows no wireframes in a portfolio, or is reluctant to hand over source files.",
          "When the files arrive, open them where they will be used instead of judging from a preview image, and check that:",
        ],
        bullets: [
          "The scale is correct when the model is imported, without manual resizing.",
          "Textures are included and linked, at the resolution you agreed.",
          "It performs acceptably in the target game engine, web page or print software.",
        ],
      },
    ],
    faqs: [
      { q: "Can I buy a ready-made 3D model from a stock library instead?", a: "For generic objects such as chairs, trees or cars, often yes. Read the licence carefully, since some stock licences restrict commercial use, resale or use in games and apps." },
      { q: "Can a 3D model be made from a 3D scan or from photos?", a: "Yes. Photogrammetry and 3D scanning capture real objects quickly. The raw result is usually heavy and uneven, and shiny, transparent or very thin objects scan poorly, so an artist normally cleans it up or rebuilds it before it is usable." },
      { q: "Can AI tools generate 3D models?", a: "AI generators can produce a rough shape from a text prompt or an image. At present the results tend to have messy geometry and inaccurate dimensions, so they rarely meet the standard needed for a product page, a game character or a print without manual rework." },
    ],
  },
  "3d-design/3d-rendering": {
    title: "What to know before you commission 3D renders",
    sections: [
      {
        heading: "Is rendering right for you now?",
        body: [
          "Rendering pays off most when the design is settled. A change to the product's shape after work has started means going back several steps. If the design is still moving, ask for simple draft views now and leave the polished images until it is fixed.",
          "Write a shot list before asking for quotes: our free 3D project brief generator helps you describe each image, its use and its size.",
        ],
      },
      {
        heading: "What drives the cost",
        body: [
          "Beyond the number of images, the quote reflects how much has to be built and decided for each one:",
        ],
        bullets: [
          "Whether each shot needs its own setting: ten angles in one studio setup are far less work than ten different rooms.",
          "Difficult materials, as glass, liquids, fur and fabric take longer to get right than painted metal or plastic.",
          "People and living things, which are hard to make convincing and are often added from photographs instead.",
        ],
      },
      {
        heading: "What to expect once production starts",
        body: [
          "You will be asked to approve things in an order that can feel backwards: plain grey or rough colour previews first, to fix camera angle and composition, then materials and lighting, then the finished image. Asking for a new angle once the final image is done means rendering it again.",
          "Have physical references to hand. Colour on screen varies between monitors, so a paint code, a material sample or a photo of the real finish in daylight settles arguments faster than adjectives. Timing depends on the number of shots and how quickly feedback comes back, and is fixed in the plan.",
        ],
      },
      {
        heading: "How to judge a render, and warning signs",
        body: [
          "Put the render next to the real product or sample, if one exists, and compare proportions, colour and surface finish. Then look where renders usually fail: edges that are perfectly sharp, surfaces with no variation, shadows that do not anchor the object to the floor.",
          "Warning signs include a portfolio with no subject similar to yours, drafts withheld until the final image, and visuals that flatter the product beyond what you will deliver.",
        ],
      },
    ],
    faqs: [
      { q: "Can I reuse the 3D scene for future images?", a: "Usually. Ask at the quote stage whether the scene files, models and materials are handed over or kept by the studio." },
      { q: "Can AI-generated images replace 3D rendering?", a: "For mood images and early ideas they can. Image generators do not work from your real dimensions, so they tend to alter details such as proportions, logos or stitching from one image to the next. Where the picture must show exactly what the customer will receive, across many consistent views, a render from an accurate model is the dependable method." },
      { q: "What resolution do I need for print and for web?", a: "It depends on the printed size and the viewing distance. As a rule of thumb, brochures and magazines are printed at about 300 pixels per inch, while large posters viewed from a distance need fewer. Tell the studio the largest use first, since a large image can be reduced but not enlarged well." },
    ],
  },
  "3d-design/interior-exterior-design": {
    title: "What to know before you hire an interior or exterior designer",
    sections: [
      {
        heading: "Is this the right moment to bring in a designer?",
        body: [
          "The best time is before anything is ordered or demolished, and ideally before the contractor's price is fixed. A design made after the kitchen is bought or the partitions are up can only work around those decisions.",
          "You should also have three things settled, at least roughly: what you may change, the budget for the works themselves, and who decides. Our free 3D project brief generator is a quick way to put the rooms, the style and the constraints on one page before a first conversation.",
        ],
      },
      {
        heading: "What drives the design fee",
        body: [
          "The fee follows the amount of thinking and drawing a space needs, which is not the same as its floor area:",
        ],
        bullets: [
          "Kitchens, bathrooms and built-in joinery need far more detail per square metre than bedrooms or open offices.",
          "A full renovation with moved walls and services is more work than furnishing and finishing an existing shell.",
          "How much support you want while the contractor is on site.",
        ],
      },
      {
        heading: "What to expect once design starts",
        body: [
          "Early on you will be asked things that seem personal: how you live or work in the space, what you are keeping, what annoys you about it now. Honest answers produce a better layout than a folder of saved pictures.",
          "Decisions come in a fixed order: layout first, then the look, then the exact products. Changing the layout after the 3D views are made means redoing them. The schedule depends on the size of the project and how quickly you decide, and is written into the plan.",
        ],
      },
      {
        heading: "How to judge a design, and warning signs",
        body: [
          "A good scheme can be built by someone who has never spoken to the designer. Test it that way: give the drawings and schedules to your contractor and see how many questions come back. Check that the furniture in the 3D views is drawn at true size, since undersized furniture makes any room look generous.",
          "Warning signs: attractive images with no drawings behind them, materials the designer cannot name or source, no discussion of budget, and undisclosed commission from the suppliers being recommended.",
        ],
      },
    ],
    faqs: [
      { q: "Should I hire an interior designer before the contractor?", a: "In most cases yes. With a finished drawing package, several contractors can price the same scope, and their quotes become comparable. Without one, each contractor prices their own assumptions." },
      { q: "Will the finished space look like the 3D renders?", a: "It can come close if the specified products are the ones installed and the lighting is fitted as drawn. Differences usually come from substitutions made on site, natural variation in materials such as stone and wood, and daylight. Ask for samples of the main finishes and view them in the room itself before ordering." },
      { q: "Is it worth hiring a designer for a single room?", a: "It can be, especially for rooms where mistakes are expensive to undo, such as a kitchen, a bathroom or a shop front. For a simple refresh, a concept and a shopping list may be all you need, without a full drawing set." },
    ],
  },
  "3d-design/architecture-planning": {
    title: "What to know before you commission architectural design",
    sections: [
      {
        heading: "Are you ready to start design?",
        body: [
          "Design can begin once you have a plot or a building and the right to build on it. Before paying for drawings, find out what the local rules allow on that plot: permitted use, height, setbacks and how much can be built. A locally licensed professional is the right person to confirm those limits.",
          "Write down your requirements as numbers of rooms, people and uses, not as a picture of a finished building. Our free 3D project brief generator gives you a structured starting document for that.",
        ],
      },
      {
        heading: "What drives the fee",
        body: [
          "Architectural fees follow the amount of design and coordination a project needs. Apart from the size of the building, expect these to matter:",
        ],
        bullets: [
          "New build, extension or conversion: working with an existing structure needs survey information and more checking.",
          "How settled your brief is, because a project that changes use or size halfway through is partly designed twice.",
          "Whether you need drawings for decisions and pricing only, or a set detailed enough to build from.",
        ],
      },
      {
        heading: "What to expect once design is under way",
        body: [
          "You will be asked for the plot documents, a survey, any existing drawings and the name of your local licensed professional if you have appointed one. Appoint that person early: their reading of the local code shapes the design.",
          "Design then narrows in stages, from options, to one developed scheme, to a coordinated set of drawings. Each stage ends with a decision from you. The programme depends on the scale of the project and on reviews by other parties, so it is agreed with you in the plan.",
        ],
      },
      {
        heading: "How to judge the drawings, and warning signs",
        body: [
          "Good drawings agree with each other. Pick a room and trace it through the plan, the section and the elevation: windows, levels and dimensions should match. Check that the rendered views show the same building as the drawings.",
          "Warning signs include anyone who says approval is certain, a design produced without a single question about local regulations, and images delivered with no measured drawings.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between an architect and an architectural designer?", a: "In many countries \"architect\" is a protected title that only people registered with the relevant professional body may use, and only they can take legal responsibility for certain submissions. The rules vary by country, so check what your project legally requires where it will be built." },
      { q: "Should I get a concept design before buying a plot?", a: "A short feasibility sketch can be useful before you commit, because it shows roughly what could fit. What may be built is decided by local planning rules and the authority, so have a local professional confirm the constraints before relying on any study for a purchase." },
      { q: "What is BIM, and do I need it for my project?", a: "BIM, building information modelling, means the building is designed as a single 3D model, and the plans, sections and schedules are generated from it. It helps most on larger projects with several consultants. For a small house, conventional CAD drawings are often sufficient." },
    ],
  },
  "3d-design/product-modeling-design": {
    title: "What to know before you hire a product designer",
    sections: [
      {
        heading: "Is your idea ready for design?",
        body: [
          "Design work is easiest to justify once you have some evidence that people want the product and a rough idea of what they would pay. A designer can make almost anything manufacturable at some price; the question is whether that price leaves you a margin.",
          "Before the first meeting, write down who the user is, what the product must do, where it will be sold and the cost per unit you need to reach. Our free 3D project brief generator will organise those points.",
        ],
      },
      {
        heading: "What drives the cost",
        body: [
          "Two bills are involved: the design fee, and later the cost of tooling and production, which for most moulded products is much the larger of the two. Choices made in design set the second bill, so the cheapest design quote is not always the cheapest route. The design effort itself depends on:",
        ],
        bullets: [
          "How new the product is: restyling a known type of product is less work than inventing a mechanism.",
          "The intended manufacturing process and expected volume, since each sets different design rules.",
          "The standards the product must meet in the markets where you will sell it.",
        ],
      },
      {
        heading: "What to expect once design work starts",
        body: [
          "Expect hard questions early: target cost, quantity for the first order, and which features you would drop first.",
          "Plan for a physical prototype, and use it properly. Hand it to people who match your user and watch them without explaining. How many rounds are needed, and how long they take, depends on the product and is agreed in the plan.",
        ],
      },
      {
        heading: "How to judge the design, and warning signs",
        body: [
          "Good product design shows in the files as much as in the pictures. The CAD should open cleanly in another program, parts should fit together without overlapping, and the drawings should carry the dimensions and materials a factory needs to quote.",
          "Be cautious if a designer never asks how the product will be made or what it must cost, will not release native CAD files, or claims a design is certain to pass certification before anything has been tested.",
        ],
      },
    ],
    faqs: [
      { q: "Should I patent my idea before speaking to a product designer?", a: "Not necessarily, but understand the risk first. In many countries, publicly disclosing an invention before filing can affect your ability to patent it, which is why discussions are normally held under a confidentiality agreement. Whether your idea is patentable, and when to file, are questions for a patent attorney." },
      { q: "Do I need a product designer or an engineer?", a: "Often both, at different points. An industrial designer shapes how the product looks, feels and is used, and defines the outer parts. Mechanical and electronics engineers make the insides work and prove they will last." },
      { q: "How do I find a manufacturer once the design is finished?", a: "Start with the process your product needs and look for factories that already make similar items at your volume. Send the same package of drawings, CAD and quantities to several, and compare their questions as well as their prices. Confirm minimum order quantities and who owns the tooling." },
    ],
  },
};
