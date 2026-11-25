import type { Service } from "@/lib/types";

export const gameServices: Service[] = [
  {
    slug: "game-development",
    sector: "development",
    name: "Game Development",
    navLabel: "Game Development",
    shortDesc:
      "Browser, mobile and PC games, from casual and branded games to larger titles: game design, art and animation, programming, testing and release.",
    metaTitle: "Game Development: Browser, Mobile & PC Games | TDM",
    metaDescription:
      "TDM designs and builds browser, mobile and PC games: game design, art and animation, programming, testing and release. Free consultation and quote.",
    hero: {
      headline: "Games designed, built and released by one team.",
      sub: "Browser, mobile and PC games, from a short branded game for a campaign to a larger title: design, art, code, testing and release under one roof.",
    },
    intro: [
      "TDM's game development service designs and builds games for the browser, for iOS and Android, and for PC. It is for brands that want a game as part of a campaign or website, for businesses and educators that want to teach or train through play, and for founders and studios that need a team to produce a title or part of one.",
      "A game is several disciplines working to the same design: rules and progression, art and animation, sound, programming and testing. We cover each of them, so the mechanics, the look and the code are planned together. The size of the production follows the game: a casual browser game needs a small team and a tight scope, while a larger title needs fuller documentation, more content and longer testing.",
      "We work with the standard tools of the field: Unity, Unreal Engine and Godot for mobile and PC, and HTML5, WebGL and JavaScript frameworks such as Phaser, PixiJS and Three.js for games that run in a browser tab. If you would like to see something small we made ourselves, the Play & Learn section of this website has a browser game built in-house that you can try at /play/.",
    ],
    features: [
      {
        title: "Game design",
        desc: "Concept, core loop, rules, controls, levels, difficulty and progression written into a game design document, with economy and reward design where the game calls for it.",
      },
      {
        title: "Art and animation",
        desc: "2D and 3D art made for the game: characters, environments, props, interface and icons, with sprite, skeletal and 3D animation and visual effects in a consistent style.",
      },
      {
        title: "Browser games",
        desc: "HTML5 and WebGL games that load in a web page with no install, built to run on phones and desktops and to embed in a website, landing page or campaign.",
      },
      {
        title: "Mobile and PC games",
        desc: "Games for iOS, Android, Windows and macOS built in Unity, Unreal Engine or Godot, with touch, keyboard, mouse and controller input handled for each platform.",
      },
      {
        title: "Branded and learning games",
        desc: "Games built around a product, a message or a lesson: advergames, quizzes, simulations and training games, with lead capture, scoreboards or analytics where you need them.",
      },
      {
        title: "Testing and release",
        desc: "Functional, device and performance testing, balancing from playtests, then builds prepared and submitted for the web, the App Store, Google Play or PC storefronts such as Steam.",
      },
    ],
    process: [
      {
        title: "Concept & Game Design",
        desc: "We agree the audience, the platform and the purpose of the game, then write the design document: mechanics, content list, art direction and technical approach.",
      },
      {
        title: "Prototype",
        desc: "We build a rough playable version with placeholder art to test whether the core loop is fun and clear. Changes are cheap at this stage, so this is where they are made.",
      },
      {
        title: "Production",
        desc: "Artists, animators and programmers build the game in milestones: levels, characters, interface, sound and systems, with a playable build shared with you at each milestone.",
      },
      {
        title: "Testing & Polish",
        desc: "We test on the target devices, fix defects, tune difficulty and performance, and refine feel: timing, feedback, sound and the first minutes of play.",
      },
      {
        title: "Release & Updates",
        desc: "We prepare store pages or web hosting, submit the builds and publish. After release we can supply fixes, new content and updates as platforms change.",
      },
    ],
    faqs: [
      {
        q: "What types of games does TDM develop?",
        a: "TDM develops browser games, mobile games for iOS and Android, and PC games. That covers casual and hyper-casual games, puzzle and arcade games, branded games for marketing campaigns, educational and training games, and larger titles with more content and deeper systems.",
      },
      {
        q: "How much does it cost to develop a game?",
        a: "Cost depends on the platforms, whether the game is 2D or 3D, the amount of art and animation, the number of levels and features, and extras such as multiplayer, accounts or in-app purchases. A short browser game and a full mobile title are very different productions. TDM quotes after a free consultation about your concept.",
      },
      {
        q: "How long does game development take?",
        a: "The schedule follows the scope: the volume of content, the number of platforms, the complexity of the systems and how many rounds of playtesting the game needs. Store review can also affect a release date. We give a milestone plan with the quote once the design is outlined.",
      },
      {
        q: "Which game engine should my game use?",
        a: "It depends on where the game will be played. Unity and Godot suit most 2D and 3D mobile and PC games, Unreal Engine suits visually demanding 3D titles, and HTML5 with WebGL frameworks suits games that must open instantly in a browser. We recommend an engine during design and explain the trade-offs.",
      },
      {
        q: "Can a game be used to market a brand or teach something?",
        a: "Yes. A branded game gives people a reason to spend time with a product and can collect entries or leads through a scoreboard or prize draw. A learning game turns a lesson or procedure into something people practise by doing. Both are designed around the outcome first and the mechanics second.",
      },
      {
        q: "Do I own the game and its source code?",
        a: "Yes. On completion you receive the source project, art files and builds, and the game is published under your own developer and store accounts. Any third-party assets or plugins used are listed with their licence terms, and ownership is set out in the contract before work begins.",
      },
    ],
  },
];
