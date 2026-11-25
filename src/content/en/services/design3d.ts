import type { Service } from "@/lib/types";

export const design3dServices: Service[] = [
  {
    slug: "3d-software-development",
    sector: "3d-design",
    name: "3D Software Development",
    navLabel: "3D Software",
    shortDesc:
      "Interactive 3D for websites and apps: product configurators, 3D viewers, AR previews and real-time visualisation built on standard real-time 3D technology.",
    metaTitle: "3D Software Development: Configurators & AR | TDM",
    metaDescription:
      "TDM builds interactive 3D for web and apps: product configurators, 3D viewers, AR previews and real-time visualisation with WebGL, Three.js, Unity and Unreal.",
    hero: {
      headline: "Interactive 3D that runs in the browser and in your app.",
      sub: "Product configurators, 3D viewers, AR previews and real-time visualisation: designed, modelled and coded by one team, then connected to your website, store or app.",
    },
    intro: [
      "3D software development is the design and programming of interactive 3D experiences that run in real time: a product a customer can rotate and customise, a building a buyer can walk through, a machine a sales team can take apart on screen. TDM builds these for retailers, manufacturers, real estate developers and software companies that want customers to explore a product instead of looking at flat photos.",
      "The work combines two skills that are usually bought separately: 3D asset production and software engineering. Our 3D artists prepare models that are light enough to load quickly, and our developers build the application around them with WebGL and WebGPU libraries such as Three.js, React Three Fiber and Babylon.js, or with Unity and Unreal Engine when the project needs a native app or heavier graphics.",
      "Because TDM also builds websites, stores and mobile apps, the 3D part does not arrive as an isolated demo. A configurator can pass the chosen options to your cart or quote form, a viewer can sit inside an existing product page, and an AR preview can open from the same button on iPhone and Android.",
    ],
    features: [
      {
        title: "3D product configurators",
        desc: "Customers change colours, materials, sizes and components and see the result immediately. Option rules, pricing logic and the link to your cart, quote form or CRM are part of the build.",
      },
      {
        title: "Web 3D viewers",
        desc: "Rotate, zoom and inspect a product or space inside a normal web page, with hotspots, annotations and exploded views where they help explain the product.",
      },
      {
        title: "AR previews",
        desc: "View-in-your-space previews using glTF and USDZ files, AR Quick Look on iOS, Scene Viewer on Android and WebXR, so a customer can place a product in their own room from a phone.",
      },
      {
        title: "Real-time visualisation",
        desc: "Walkthroughs of buildings, showrooms and industrial sites, and interactive product demonstrations, built in Unity, Unreal Engine or the browser depending on where they need to run.",
      },
      {
        title: "Asset optimisation pipeline",
        desc: "Existing CAD or high-detail models are reduced, retopologised, textured and compressed into web-ready glTF files, so scenes load quickly on ordinary phones and laptops.",
      },
      {
        title: "Integration with your platform",
        desc: "Embedding in Shopify, WordPress, Magento, custom Next.js sites and native mobile apps, with product data pulled from your catalogue rather than typed in twice.",
      },
    ],
    process: [
      {
        title: "Scope & technical plan",
        desc: "We define what the user must be able to do, which devices it has to run on, and which engine or library fits. You receive a written scope and a quote.",
      },
      {
        title: "Asset audit & preparation",
        desc: "We review the models, CAD files and textures you already have, then build or optimise what is missing so every asset meets the performance budget.",
      },
      {
        title: "Prototype",
        desc: "A working prototype with one product or one scene proves the interaction, the visual quality and the loading behaviour before the full catalogue is produced.",
      },
      {
        title: "Build & integration",
        desc: "We develop the full application, connect it to your product data, cart or back end, and add analytics events so you can see how people use it.",
      },
      {
        title: "Testing, launch & support",
        desc: "The experience is tested across browsers, phones and connection speeds, deployed to your site or app stores, and maintained as products and devices change.",
      },
    ],
    faqs: [
      {
        q: "What is a 3D product configurator and does my business need one?",
        a: "A 3D product configurator lets a customer choose options such as colour, material, size or accessories and see the exact product update in 3D. It suits businesses that sell products with many variants or made-to-order items: furniture, vehicles, jewellery, machinery, kitchens, packaging. If your products come in a small number of fixed versions, a simple 3D viewer or good renders may be enough, and we will tell you so.",
      },
      {
        q: "Which technology does TDM use for 3D on the web?",
        a: "For browser-based work we use WebGL and WebGPU through Three.js, React Three Fiber or Babylon.js, with models delivered as glTF. For native apps, large environments or high-end graphics we use Unity or Unreal Engine. The choice depends on your target devices, the visual quality required and the platform your site or app already runs on.",
      },
      {
        q: "Will a 3D viewer slow down my website?",
        a: "It should not if the assets are prepared properly. We set a size and performance budget at the start, compress geometry and textures, load the 3D scene only when it is needed, and provide an image fallback for devices that cannot run it. The rest of the page loads as normal.",
      },
      {
        q: "Can you use our existing CAD files or 3D models?",
        a: "Yes. CAD exports such as STEP, IGES, SolidWorks or Rhino files and models from Blender, 3ds Max or Maya can all be used as a starting point. Engineering files are usually far too heavy for real-time use, so we convert and optimise them. If you have no 3D assets, our modelling team creates them from drawings, photos and samples.",
      },
      {
        q: "Does AR work on both iPhone and Android?",
        a: "Yes. We prepare a USDZ file for AR Quick Look on iOS and a glTF file for Scene Viewer on Android, and one button on the page opens the right one for the visitor's device. No app download is required for this kind of AR preview. More advanced AR features can be built into a native app.",
      },
      {
        q: "How much does 3D software development cost?",
        a: "Cost depends on the number of products or scenes, how many configurable options there are, the visual quality required, whether 3D models already exist, and how deeply the experience must integrate with your store or systems. TDM scopes the project in a free consultation and gives you a written quote afterwards.",
      },
    ],
  },
  {
    slug: "3d-modeling",
    sector: "3d-design",
    name: "3D Modeling",
    navLabel: "3D Modeling",
    shortDesc:
      "Accurate 3D models of products, characters, environments and assets, built to the technical requirements of web, games, print and visualisation.",
    metaTitle: "3D Modeling Services: Products & Characters | TDM",
    metaDescription:
      "TDM creates accurate 3D models of products, characters, environments and assets for web, games, print and visualisation, delivered in the formats you need.",
    hero: {
      headline: "3D models built for where they will be used.",
      sub: "Products, characters, environments and props: modelled, textured and delivered in the right format for your website, game engine, renderer or 3D printer.",
    },
    intro: [
      "3D modeling is the creation of a digital three-dimensional object that can then be rendered, animated, placed in a game or app, or printed. TDM's 3D modeling service produces those objects for brands, e-commerce stores, game and app studios, architects and manufacturers who need accurate models and do not have a 3D artist on staff.",
      "A model that looks right in one place can be unusable in another. A render needs dense geometry and detailed materials, a web viewer or game needs a low polygon count and efficient textures, and a 3D print needs a closed, watertight mesh. We ask where the model is going before we start, then build it to that specification.",
      "Our artists work in Blender, Autodesk Maya, 3ds Max and ZBrush, and texture in Substance 3D Painter using physically based materials. You can order a single asset or a full library, and the files are yours to pass on to any renderer, developer or printer you choose.",
    ],
    features: [
      {
        title: "Product modeling",
        desc: "Dimensionally accurate models of physical products from technical drawings, CAD files, reference photos or samples, with correct proportions, materials and finishes.",
      },
      {
        title: "Character modeling",
        desc: "Stylised or realistic characters, creatures and mascots: sculpted, retopologised, UV-unwrapped and textured, with rigging available so they are ready to animate.",
      },
      {
        title: "Environment & prop modeling",
        desc: "Interiors, exteriors, landscapes and the objects that fill them, built as modular sets for games, visualisation scenes, virtual showrooms and film backgrounds.",
      },
      {
        title: "Game-ready & real-time assets",
        desc: "Low-poly meshes with baked normal maps, levels of detail, clean UVs and PBR texture sets, exported for Unity, Unreal Engine or the web as FBX and glTF.",
      },
      {
        title: "Texturing & materials",
        desc: "Physically based materials for metal, fabric, glass, plastic, wood and skin, hand-painted or built from reference so surfaces react correctly to light.",
      },
      {
        title: "Models for 3D printing",
        desc: "Watertight, correctly scaled meshes with the wall thickness and tolerances your printing method needs, supplied as STL, OBJ or 3MF.",
      },
    ],
    process: [
      {
        title: "Brief & references",
        desc: "You send drawings, photos, measurements or sketches and tell us where the model will be used. We confirm the specification, file formats and quote.",
      },
      {
        title: "Blockout",
        desc: "A simple version of the model establishes scale, proportions and silhouette. You approve the overall form before detailed work begins.",
      },
      {
        title: "Detailed modeling",
        desc: "We build the final geometry: high-detail sculpting where needed, clean topology, and an optimised version if the asset is for real-time use.",
      },
      {
        title: "UVs, textures & materials",
        desc: "The model is unwrapped and textured, materials are set up, and preview renders are sent for your comments.",
      },
      {
        title: "Review & delivery",
        desc: "After your revisions are applied, we export the model in the agreed formats, check it in the target software and hand over source and export files.",
      },
    ],
    faqs: [
      {
        q: "What do you need from me to create a 3D model?",
        a: "The more reference, the more accurate the result. Technical drawings or CAD files are ideal for products. If those are not available, clear photos from every side with key measurements work, as does a physical sample. For characters and environments we work from concept art, sketches or a written description plus visual references.",
      },
      {
        q: "What file formats will I receive?",
        a: "We deliver in the format your next step requires. Common ones are FBX and OBJ for general exchange, glTF or GLB for the web, USDZ for AR on Apple devices, STL or 3MF for printing, and native Blender, Maya or 3ds Max files. Texture maps are supplied separately at the agreed resolution.",
      },
      {
        q: "What is the difference between high-poly and low-poly models?",
        a: "A high-poly model has a very large number of polygons and holds fine detail, which suits still renders and close-up animation. A low-poly model uses far fewer polygons and stores detail in texture maps instead, so it runs smoothly in games, apps and browsers. Many projects need both, and we usually create the low-poly version from the high-poly one.",
      },
      {
        q: "Can you model a product that does not exist yet?",
        a: "Yes. We regularly model products from concept sketches or early engineering drawings so they can be shown to investors, retailers or customers before manufacturing. If the design itself still needs to be developed, that falls under our product modeling and design service.",
      },
      {
        q: "Who owns the 3D models once they are finished?",
        a: "You do. Once the project is paid for, the final models, textures and source files belong to your business and you are free to use them with any other supplier. Ownership terms are written into the agreement before work starts.",
      },
      {
        q: "How is 3D modeling priced?",
        a: "Price is driven by the complexity of each object, the level of detail, whether texturing and rigging are included, the quality of the reference material and the number of assets. Send us your references during a free consultation and TDM will return a quote for the specific job.",
      },
    ],
  },
  {
    slug: "3d-rendering",
    sector: "3d-design",
    name: "Photorealistic 3D Rendering",
    navLabel: "3D Rendering",
    shortDesc:
      "Photorealistic still images and animations rendered from 3D models for marketing, e-commerce, real estate and product launches.",
    metaTitle: "Photorealistic 3D Rendering Services | TDM",
    metaDescription:
      "TDM produces photorealistic 3D renders and animations for marketing, e-commerce, real estate and product launches: stills, 360 spins and animated films.",
    hero: {
      headline: "Photorealistic images without a photo shoot.",
      sub: "Product stills, lifestyle scenes, architectural views and animations: rendered from 3D models with studio-grade lighting, materials and post-production.",
    },
    intro: [
      "Photorealistic 3D rendering turns a 3D model into an image or animation that looks like a photograph or filmed footage. TDM provides it for e-commerce brands that need product images in every colour and angle, real estate developers selling property before it is built, and companies launching a product that has not come off the production line yet.",
      "Rendering replaces much of what a physical shoot requires. There is no sample to ship, no studio to book and no set to build. Once a product or building exists as a 3D scene, a new angle, colourway, background or season is a change to the file, which makes rendering practical for large catalogues and for projects still in development.",
      "We light and render scenes with V-Ray, Corona Renderer, Blender Cycles, Redshift and Unreal Engine, and finish them in Photoshop, After Effects and DaVinci Resolve. Output is sized for its purpose: marketplace listings, website banners, print brochures, billboards, social video or a launch film.",
    ],
    features: [
      {
        title: "Product renders",
        desc: "Clean studio images on white or coloured backgrounds, detail close-ups, cutaways and exploded views, consistent across your whole range and every variant.",
      },
      {
        title: "Lifestyle & in-context scenes",
        desc: "Your product placed in a styled room, outdoor setting or in use, built entirely in 3D so the environment can be changed for each campaign or market.",
      },
      {
        title: "Architectural visualisation",
        desc: "Exterior views, interior perspectives, aerial views and rendered floor plans for developers, architects and agents marketing off-plan or refurbished property.",
      },
      {
        title: "3D animation & product films",
        desc: "Camera moves around a product, assembly and feature animations, and architectural fly-throughs, edited with titles, music and sound for web, social or events.",
      },
      {
        title: "360° spins & image sequences",
        desc: "Frame sequences that let shoppers rotate a product on a listing page, formatted for your store platform or marketplace.",
      },
      {
        title: "Post-production & format delivery",
        desc: "Colour grading, retouching and compositing, with final files exported in the sizes, ratios and colour profiles each channel or printer requires.",
      },
    ],
    process: [
      {
        title: "Brief & shot list",
        desc: "We agree which images or sequences are needed, the angles, the mood and the output sizes, and collect models, drawings, material samples and brand guidelines.",
      },
      {
        title: "Modeling & scene setup",
        desc: "Supplied models are checked and corrected, or built by our team, then arranged in a scene with cameras positioned for each shot.",
      },
      {
        title: "Lighting & material drafts",
        desc: "You receive low-resolution previews showing composition, lighting and materials, which is the stage to request changes to angle, colour or styling.",
      },
      {
        title: "Final rendering",
        desc: "Approved shots are rendered at full resolution, with separate passes for reflections, shadows and masks to give control in post-production.",
      },
      {
        title: "Post-production & delivery",
        desc: "Images are retouched and graded, animations are edited and scored, and everything is delivered in the agreed formats with layered files on request.",
      },
    ],
    faqs: [
      {
        q: "Is 3D rendering better than product photography?",
        a: "Each has its place. Rendering is the stronger option when the product is not manufactured yet, when you have many colours or configurations, when the item is large or hard to ship, or when you want views a camera cannot capture, such as cutaways. Photography is often simpler for a small range of existing products, food, or anything worn by a person. TDM offers both and will recommend whichever suits the brief.",
      },
      {
        q: "What do you need to start a rendering project?",
        a: "A 3D model or CAD file if you have one, otherwise drawings, dimensions and photos so we can build it. We also need material and colour references, any brand or styling guidelines, examples of images you like, and a list of where the visuals will be published.",
      },
      {
        q: "Can renders be used on Amazon, Noon and other marketplaces?",
        a: "Yes. We render main images on a pure white background and supporting images to the pixel dimensions and framing rules each marketplace publishes. Marketplaces expect images to represent the product accurately, so we match the real materials, colours and proportions from your reference rather than idealising them.",
      },
      {
        q: "Can you render a building or interior that has not been built?",
        a: "Yes. From architectural drawings, CAD or BIM files and a materials schedule we produce exterior and interior views that show the finished property. Developers and agents use these for brochures, hoardings, listing portals and sales presentations.",
      },
      {
        q: "How many revisions are included?",
        a: "Review points are built into the process: one at the draft stage for angle, lighting and materials, and one on the final images for detail corrections. The number of revision rounds is stated in your quote so both sides know what is covered. Changes to the underlying design after approval are quoted separately.",
      },
      {
        q: "What affects the cost of 3D rendering?",
        a: "The main factors are whether a usable 3D model already exists, how many images or seconds of animation you need, the complexity of the scene, and the output resolution. Animation costs more than stills because every second contains many rendered frames. TDM provides a quote after a free consultation and a look at your reference material.",
      },
    ],
  },
  {
    slug: "interior-exterior-design",
    sector: "3d-design",
    name: "Interior & Exterior Design",
    navLabel: "Interior & Exterior",
    shortDesc:
      "Design and visualisation of interiors and exteriors for homes, offices, retail and hospitality spaces, from concept and layout to a specified, buildable scheme.",
    metaTitle: "Interior & Exterior Design Services | TDM",
    metaDescription:
      "TDM designs and visualises interiors and exteriors for homes, offices, retail and hospitality: layouts, materials, lighting, 3D views and drawings.",
    hero: {
      headline: "See your space finished before work begins.",
      sub: "Interior and exterior design for homes, offices, shops, restaurants and hotels: planned in detail and shown in 3D, so decisions are made on screen instead of on site.",
    },
    intro: [
      "Interior and exterior design is the planning of how a space looks and works: its layout, materials, colours, lighting, furniture and, outside, its facade and landscape. TDM designs and visualises these for homeowners, business owners fitting out an office, shop, restaurant or hotel, and developers who need a show unit or a facade concept.",
      "Every scheme is developed in 3D. Before a wall is moved or a sofa is ordered, you see the room from eye level with the proposed finishes, furniture and lighting in place. That makes it far easier to compare options, catch problems with layout or proportion, and get agreement from partners, landlords or investors.",
      "The output is a package your contractor and suppliers can work from: dimensioned layouts, elevations, lighting and ceiling plans, and a schedule of materials, furniture and fittings. We prepare drawings in AutoCAD, SketchUp and Revit and visualise in 3ds Max with V-Ray or Corona. For clients who are not in the same city, the whole design process runs remotely from your plans, measurements and site photos.",
    ],
    features: [
      {
        title: "Concept & mood boards",
        desc: "A design direction for the project: style, colour palette, material samples and reference images, presented as options so you can choose before detailed work starts.",
      },
      {
        title: "Space planning & layouts",
        desc: "Furniture layouts, circulation, zoning and storage worked out on scaled plans, tested against how many people use the space and what they do in it.",
      },
      {
        title: "Interior 3D visualisation",
        desc: "Photorealistic views of each key room showing finishes, joinery, furniture and lighting together, with panoramic views available for a look around the room.",
      },
      {
        title: "Exterior, facade & landscape design",
        desc: "Facade treatments, cladding, entrances, outdoor seating, terraces, planting and exterior lighting, shown in daylight and evening views.",
      },
      {
        title: "Materials, furniture & lighting specification",
        desc: "A schedule listing each finish, fitting, light and furniture item with dimensions and quantities, so quotes from suppliers are based on the same information.",
      },
      {
        title: "Drawing package for contractors",
        desc: "Plans, elevations, sections, reflected ceiling plans and joinery details that communicate the design intent clearly to the people building it.",
      },
    ],
    process: [
      {
        title: "Brief & site information",
        desc: "We discuss how you want to use the space, your taste and your budget, and collect floor plans, measurements and photos or arrange a survey through your local contact.",
      },
      {
        title: "Concept design",
        desc: "You receive mood boards and layout options. We refine them together until the direction and the plan are agreed.",
      },
      {
        title: "3D design development",
        desc: "The agreed concept is modelled in 3D with real materials and furniture, and rendered views are shared for comment and revision.",
      },
      {
        title: "Specification & drawings",
        desc: "Once the visuals are approved we produce the drawing package and the schedules of finishes, furniture, fittings and lighting.",
      },
      {
        title: "Handover & implementation support",
        desc: "We hand the package to you and your contractor, answer their questions during the works, and review supplier substitutions against the design.",
      },
    ],
    faqs: [
      {
        q: "What is included in an interior design package?",
        a: "A typical package contains the concept and mood boards, furniture and space layouts, 3D rendered views of the main rooms, lighting and ceiling plans, elevations and joinery details, and a schedule of materials, furniture and fittings. The exact contents are listed in your quote, and you can commission the concept and visuals alone if that is all you need.",
      },
      {
        q: "Can you design my space remotely?",
        a: "Yes. We need an accurate floor plan or a set of measurements, photos or a video walk-through of the existing space, and a conversation about how you intend to use it. Presentations and reviews happen over video calls, and the drawings are issued digitally to you and your contractor wherever the site is.",
      },
      {
        q: "Do you carry out the construction or fit-out?",
        a: "Our service is design and visualisation. The works are carried out by your chosen contractor, and we support them with drawings, specifications and answers to design questions. Structural, electrical, mechanical and other regulated engineering work needs to be designed and approved by professionals qualified where the property is located.",
      },
      {
        q: "Do you design commercial spaces such as offices, shops and restaurants?",
        a: "Yes. Commercial projects are planned around customer flow, staff workflow, brand identity and the operating requirements of the business, such as seating capacity, display space or back-of-house areas. Because TDM also handles branding and marketing, the interior can be designed to match your visual identity and to photograph well.",
      },
      {
        q: "What is the difference between interior design and 3D rendering?",
        a: "Interior design is the decision-making: layout, materials, lighting and furniture. 3D rendering is the image that shows those decisions. If you already have a finished design from another designer and only need images, our rendering service covers that. If the space still needs to be designed, this is the right service.",
      },
      {
        q: "How much does interior or exterior design cost?",
        a: "Fees depend on the size of the space, the number of rooms or areas, how much detail the drawing package needs, and how many rendered views are required. TDM discusses the project in a free consultation and sends a quote based on your plans.",
      },
    ],
  },
  {
    slug: "architecture-planning",
    sector: "3d-design",
    name: "Architecture & Planning",
    navLabel: "Architecture",
    shortDesc:
      "Architectural design, space planning, drawings and visualisation for residential and commercial projects, coordinated with your locally licensed professionals.",
    metaTitle: "Architecture & Planning: Design & Drawings | TDM",
    metaDescription:
      "TDM provides architectural design, space planning, drawing sets and 3D visualisation, coordinated with your locally licensed professionals for submissions.",
    hero: {
      headline: "Architectural design, drawn and visualised.",
      sub: "Concept design, space planning, drawing sets and 3D visualisation for houses, residential buildings and commercial projects: prepared to work alongside your local architect of record and engineers.",
    },
    intro: [
      "Architecture and planning covers the design of a building and the organisation of the space inside and around it: where it sits on the plot, how rooms relate to each other, what it looks like and how that is communicated in drawings. TDM offers architectural design, space planning, drawing production and visualisation to private owners, developers, investors and businesses planning a new building, an extension or a conversion.",
      "We take a project from a brief and a plot to a developed design with coordinated drawings and 3D views. That gives you something concrete to evaluate, price and present before committing to construction, and it gives your local consultants a clear design to take forward.",
      "Building regulations and professional licensing are different in every country and often in every city. TDM does not act as the architect of record and does not sign or stamp documents for permits. Regulatory submissions are coordinated with the client's locally licensed professionals, who review the design against local codes and submit it under their own authority. We supply the drawings and models they need in AutoCAD, Revit and other standard formats.",
    ],
    features: [
      {
        title: "Concept & schematic design",
        desc: "Massing studies, site layout, floor plan options and an architectural language for the building, developed from your brief, plot information and budget.",
      },
      {
        title: "Space planning",
        desc: "Room sizes, adjacencies, circulation and area schedules for homes, offices, retail units, clinics and hospitality buildings, tested against how the building will be used.",
      },
      {
        title: "Architectural drawing sets",
        desc: "Site plans, floor plans, elevations, sections and typical details produced in AutoCAD or as a Revit BIM model, at a level of detail agreed for each project stage.",
      },
      {
        title: "3D models & visualisation",
        desc: "A 3D model of the building in its context, with rendered exterior and interior views and walkthrough animations for client decisions, investor presentations and sales.",
      },
      {
        title: "Feasibility & area studies",
        desc: "Early studies showing what could fit on a plot and how the area divides between uses, prepared as design input for your own financial and regulatory checks.",
      },
      {
        title: "Coordination with local professionals",
        desc: "Drawings and model files issued to your locally licensed architect and engineers, with their comments and code requirements worked back into the design.",
      },
    ],
    process: [
      {
        title: "Brief & site data",
        desc: "We record your requirements, budget level and intended use, and gather the plot survey, existing drawings and any planning constraints your local advisers have identified.",
      },
      {
        title: "Concept options",
        desc: "We present alternative layouts and massing with simple 3D views, and you choose the direction to develop.",
      },
      {
        title: "Design development",
        desc: "The chosen option is worked up into detailed plans, elevations and sections, with materials selected and rendered views produced.",
      },
      {
        title: "Drawing package",
        desc: "We prepare the coordinated drawing set and model to the agreed level of detail and issue it in the formats your consultants use.",
      },
      {
        title: "Local review & revisions",
        desc: "Your licensed professionals check the design against local regulations and handle the submission. We revise the drawings to reflect their comments and those of the authority.",
      },
    ],
    faqs: [
      {
        q: "Can TDM submit drawings for a building permit?",
        a: "No. Permit and other regulatory submissions must be made by professionals licensed in the place where the project is built. TDM prepares the architectural design and drawings, and those submissions are coordinated with your locally licensed architect or engineer, who checks compliance, signs where required and deals with the authority.",
      },
      {
        q: "What architectural services does TDM provide?",
        a: "Concept and schematic design, space planning, design development, architectural drawing sets in CAD or BIM, 3D modelling of the building, rendered images and walkthrough animations, and early feasibility and area studies. Structural, mechanical, electrical and other engineering design is carried out by your appointed engineers, and we coordinate our drawings with theirs.",
      },
      {
        q: "Do I still need a local architect or engineer?",
        a: "For anything that requires a permit or regulatory approval, yes. A locally licensed professional must take responsibility for code compliance and for the submission. Many clients use TDM for the design, drawings and visuals and appoint a local firm for review, approvals and site supervision. If you already have that firm in place, we work to their requirements from the start.",
      },
      {
        q: "Can you work on projects outside the UAE?",
        a: "Yes. Design, drawing and visualisation work is carried out remotely from survey data, plot documents and your brief, for clients in the Gulf, the UK, the USA, Europe, Africa and Asia. Local rules are applied through the licensed professionals you appoint in the project's location.",
      },
      {
        q: "What drawings and files will I receive?",
        a: "Depending on the agreed scope: site plan, floor plans, elevations, sections, typical details and area schedules as PDF and DWG, a Revit or other BIM model where the project uses one, and rendered images or animations. The list of deliverables for each stage is set out in the quote.",
      },
      {
        q: "How are architecture and planning fees calculated?",
        a: "Fees reflect the size and type of building, the stages you want covered, the level of drawing detail and the amount of visualisation. A concept study for a single house is a very different job from a full drawing set for a mixed-use building. TDM reviews your brief in a free consultation and issues a quote for the defined scope.",
      },
    ],
  },
  {
    slug: "product-modeling-design",
    sector: "3d-design",
    name: "Product Modeling & Design",
    navLabel: "Product Design",
    shortDesc:
      "Product concept, industrial design and 3D models ready for prototyping, manufacturing discussion and marketing visuals.",
    metaTitle: "Product Modeling & Industrial Design | TDM",
    metaDescription:
      "TDM takes product ideas from concept sketches to industrial design and CAD models ready for prototyping, manufacturer discussions and marketing visuals.",
    hero: {
      headline: "From product idea to a model you can prototype.",
      sub: "Concept sketches, industrial design and CAD: one process that gives you files for a prototype, a clear brief for manufacturers and visuals to start selling.",
    },
    intro: [
      "Product modeling and design is the process of turning a product idea into a defined physical design, expressed as a 3D CAD model with real dimensions, materials and parts. TDM provides it for founders with a new product idea, brands adding to an existing range, and manufacturers who want a current product redesigned.",
      "A sketch or a description is not enough for a factory to quote from or for a prototype to be made. We develop the form, ergonomics and construction of the product, then model it in solid and surface CAD tools such as SolidWorks, Autodesk Fusion and Rhino, so each part has geometry that can be measured, printed and reviewed by a manufacturer.",
      "The same model serves the commercial side. Before tooling exists, we produce renders, exploded views and animations from the CAD data for pitch decks, crowdfunding pages, retailer presentations and pre-order campaigns, and TDM's web and marketing teams can build the launch around them.",
    ],
    features: [
      {
        title: "Concept development & sketching",
        desc: "Several design directions explored through sketches and quick 3D studies, informed by the target user, competing products and the price point you are aiming for.",
      },
      {
        title: "Industrial design",
        desc: "Form, proportion, ergonomics, user interaction, and colour, material and finish decisions that define how the product looks, feels and is used.",
      },
      {
        title: "CAD modeling",
        desc: "Parametric solid and surface models of every part and the full assembly, built to real dimensions with space allowed for internal components.",
      },
      {
        title: "Design for manufacturing input",
        desc: "Wall thickness, draft angles, part splits and fastening methods considered for the intended process, such as injection moulding, CNC machining or sheet metal, and refined with your manufacturer's feedback.",
      },
      {
        title: "Prototype-ready files",
        desc: "STL and STEP exports prepared for 3D printing or CNC prototyping, with fit and assembly checked in CAD and revisions made after you test the physical part.",
      },
      {
        title: "Technical documentation & visuals",
        desc: "Dimensioned drawings, exploded views and a parts list for supplier discussions, plus photorealistic renders and animations for marketing.",
      },
    ],
    process: [
      {
        title: "Brief & research",
        desc: "We define the user, the function, the constraints and the target cost, and review comparable products and any components that must fit inside.",
      },
      {
        title: "Concept design",
        desc: "You receive sketched and rendered concepts showing different approaches, and select one to take forward.",
      },
      {
        title: "3D CAD development",
        desc: "The selected concept is modelled in detail: external surfaces, internal layout, part breakdown and assembly method.",
      },
      {
        title: "Prototype & refinement",
        desc: "We issue files for a prototype through your supplier or a print service, then adjust the design based on how the physical model fits, feels and functions.",
      },
      {
        title: "Final files & handover",
        desc: "You receive the final CAD in native and neutral formats, technical drawings, and marketing renders, ready for conversations with manufacturers.",
      },
    ],
    faqs: [
      {
        q: "I only have an idea. Can TDM design the product from scratch?",
        a: "Yes. A written description, rough sketches or examples of similar products are enough to begin. We clarify what the product must do and who it is for, propose design concepts, and develop the chosen one into a full 3D model. You do not need drawings or technical knowledge to start.",
      },
      {
        q: "Will the files be ready for manufacturing?",
        a: "The CAD is built with the intended manufacturing process in mind and delivered in formats factories work with, such as STEP and IGES, along with dimensioned drawings. Every manufacturer then reviews a design against its own tooling and equipment and normally asks for adjustments. We make those changes with them, but final production engineering, tooling design and any required safety testing or certification sit with the manufacturer and the relevant test bodies.",
      },
      {
        q: "Do you make physical prototypes?",
        a: "We prepare the files and specifications for prototyping and can coordinate with a 3D printing or machining service on your behalf, or with a supplier you already use. After you have handled the prototype, we update the design based on what you found.",
      },
      {
        q: "What is the difference between product design and 3D modeling?",
        a: "3D modeling recreates an object whose design is already decided, usually for images, games or the web. Product design decides what the object is: its shape, parts, materials and how it is assembled, and records that in engineering-grade CAD. If your product already exists and you need visuals, our 3D modeling or rendering services are the better fit.",
      },
      {
        q: "How is my product idea kept confidential?",
        a: "We sign a non-disclosure agreement before you share details if you want one, and the agreement for the project states that the design and all files belong to you once the work is paid for. Your concept is not shown in our marketing without your written permission.",
      },
      {
        q: "How much does product design cost?",
        a: "It depends on how complex the product is, how many parts it has, whether it contains electronics or mechanisms that the enclosure must accommodate, how many concept directions and prototype rounds you want, and what documentation and visuals are needed. TDM gives a quote after a free consultation about your idea.",
      },
    ],
  },
];
