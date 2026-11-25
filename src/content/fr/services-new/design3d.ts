import type { Service, Sector } from "@/lib/types";

export const frDesign3dServices: Service[] = [
  {
    slug: "3d-software-development",
    sector: "3d-design",
    name: "Développement de logiciels 3D",
    navLabel: "Logiciels 3D",
    shortDesc:
      "De la 3D interactive pour les sites web et les applications : configurateurs de produits, visionneuses 3D, aperçus en réalité augmentée et visualisation en temps réel, construits sur les technologies 3D temps réel standard.",
    metaTitle: "Développement 3D : configurateurs & AR | TDM",
    metaDescription:
      "TDM crée de la 3D interactive pour le web et les applications : configurateurs, visionneuses 3D, aperçus AR et temps réel avec WebGL, Three.js, Unity et Unreal.",
    hero: {
      headline: "De la 3D interactive qui fonctionne dans le navigateur et dans votre application.",
      sub: "Configurateurs de produits, visionneuses 3D, aperçus en réalité augmentée et visualisation en temps réel : conçus, modélisés et développés par une seule équipe, puis connectés à votre site, votre boutique ou votre application.",
    },
    intro: [
      "Le développement de logiciels 3D consiste à concevoir et à programmer des expériences 3D interactives qui s'exécutent en temps réel : un produit que le client peut faire pivoter et personnaliser, un bâtiment que l'acheteur peut parcourir, une machine qu'une équipe commerciale peut démonter à l'écran. TDM les réalise pour les distributeurs, les industriels, les promoteurs immobiliers et les éditeurs de logiciels qui veulent que leurs clients explorent un produit au lieu de regarder des photos à plat.",
      "Ce travail réunit deux compétences généralement achetées séparément : la production de contenus 3D et l'ingénierie logicielle. Nos artistes 3D préparent des modèles assez légers pour se charger rapidement, et nos développeurs construisent l'application autour d'eux avec des bibliothèques WebGL et WebGPU telles que Three.js, React Three Fiber et Babylon.js, ou avec Unity et Unreal Engine lorsque le projet exige une application native ou des graphismes plus lourds.",
      "Parce que TDM crée aussi des sites web, des boutiques en ligne et des applications mobiles, la partie 3D n'arrive pas sous la forme d'une démo isolée. Un configurateur peut transmettre les options choisies à votre panier ou à votre formulaire de devis, une visionneuse peut s'insérer dans une fiche produit existante, et un aperçu en réalité augmentée peut s'ouvrir depuis le même bouton sur iPhone et sur Android.",
    ],
    features: [
      {
        title: "Configurateurs de produits 3D",
        desc: "Vos clients modifient les couleurs, les matériaux, les dimensions et les composants, et voient le résultat immédiatement. Les règles d'options, la logique de prix et la liaison avec votre panier, votre formulaire de devis ou votre CRM font partie de la réalisation.",
      },
      {
        title: "Visionneuses 3D pour le web",
        desc: "Faire pivoter, zoomer et inspecter un produit ou un espace dans une page web classique, avec des points d'intérêt, des annotations et des vues éclatées là où ils aident à expliquer le produit.",
      },
      {
        title: "Aperçus en réalité augmentée",
        desc: "Des aperçus « dans votre espace » à partir de fichiers glTF et USDZ, avec AR Quick Look sur iOS, Scene Viewer sur Android et WebXR, pour que le client puisse placer un produit dans sa propre pièce depuis son téléphone.",
      },
      {
        title: "Visualisation en temps réel",
        desc: "Visites virtuelles de bâtiments, de showrooms et de sites industriels, et démonstrations interactives de produits, réalisées avec Unity, Unreal Engine ou dans le navigateur selon l'endroit où elles doivent fonctionner.",
      },
      {
        title: "Chaîne d'optimisation des modèles",
        desc: "Les modèles CAO ou très détaillés existants sont allégés, retopologisés, texturés et compressés en fichiers glTF prêts pour le web, afin que les scènes se chargent rapidement sur des téléphones et des ordinateurs portables ordinaires.",
      },
      {
        title: "Intégration à votre plateforme",
        desc: "Intégration dans Shopify, WordPress, Magento, des sites Next.js sur mesure et des applications mobiles natives, avec des données produits tirées de votre catalogue plutôt que saisies deux fois.",
      },
    ],
    process: [
      {
        title: "Cadrage & plan technique",
        desc: "Nous définissons ce que l'utilisateur doit pouvoir faire, sur quels appareils l'expérience doit fonctionner, et quel moteur ou quelle bibliothèque convient. Vous recevez un périmètre écrit et un devis.",
      },
      {
        title: "Audit & préparation des modèles",
        desc: "Nous passons en revue les modèles, fichiers CAO et textures dont vous disposez déjà, puis nous créons ou optimisons ce qui manque afin que chaque élément respecte le budget de performance.",
      },
      {
        title: "Prototype",
        desc: "Un prototype fonctionnel, avec un seul produit ou une seule scène, valide l'interaction, la qualité visuelle et le comportement au chargement avant la production du catalogue complet.",
      },
      {
        title: "Développement & intégration",
        desc: "Nous développons l'application complète, la connectons à vos données produits, à votre panier ou à votre back-end, et ajoutons des événements analytics pour que vous puissiez voir comment elle est utilisée.",
      },
      {
        title: "Tests, lancement & support",
        desc: "L'expérience est testée sur différents navigateurs, téléphones et débits de connexion, déployée sur votre site ou sur les stores d'applications, puis maintenue à mesure que les produits et les appareils évoluent.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un configurateur de produits 3D, et mon entreprise en a-t-elle besoin ?",
        a: "Un configurateur de produits 3D permet au client de choisir des options telles que la couleur, le matériau, la taille ou les accessoires, et de voir le produit exact se mettre à jour en 3D. Il convient aux entreprises qui vendent des produits à nombreuses variantes ou fabriqués à la commande : mobilier, véhicules, bijoux, machines, cuisines, emballages. Si vos produits n'existent qu'en un petit nombre de versions fixes, une simple visionneuse 3D ou de bons rendus peuvent suffire, et nous vous le dirons.",
      },
      {
        q: "Quelle technologie TDM utilise-t-elle pour la 3D sur le web ?",
        a: "Pour les projets dans le navigateur, nous utilisons WebGL et WebGPU via Three.js, React Three Fiber ou Babylon.js, avec des modèles livrés au format glTF. Pour les applications natives, les grands environnements ou les graphismes haut de gamme, nous utilisons Unity ou Unreal Engine. Le choix dépend des appareils visés, de la qualité visuelle attendue et de la plateforme sur laquelle votre site ou votre application fonctionne déjà.",
      },
      {
        q: "Une visionneuse 3D va-t-elle ralentir mon site ?",
        a: "Elle ne le devrait pas si les modèles sont correctement préparés. Nous fixons dès le départ un budget de poids et de performance, nous compressons la géométrie et les textures, nous ne chargeons la scène 3D que lorsqu'elle est nécessaire, et nous prévoyons une image de remplacement pour les appareils qui ne peuvent pas l'exécuter. Le reste de la page se charge normalement.",
      },
      {
        q: "Pouvez-vous utiliser nos fichiers CAO ou nos modèles 3D existants ?",
        a: "Oui. Les exports CAO tels que les fichiers STEP, IGES, SolidWorks ou Rhino, ainsi que les modèles issus de Blender, 3ds Max ou Maya, peuvent tous servir de point de départ. Les fichiers d'ingénierie sont généralement bien trop lourds pour un usage en temps réel : nous les convertissons et les optimisons. Si vous n'avez aucun contenu 3D, notre équipe de modélisation le crée à partir de plans, de photos et d'échantillons.",
      },
      {
        q: "La réalité augmentée fonctionne-t-elle à la fois sur iPhone et sur Android ?",
        a: "Oui. Nous préparons un fichier USDZ pour AR Quick Look sur iOS et un fichier glTF pour Scene Viewer sur Android, et un seul bouton sur la page ouvre celui qui correspond à l'appareil du visiteur. Aucun téléchargement d'application n'est nécessaire pour ce type d'aperçu en réalité augmentée. Des fonctionnalités de réalité augmentée plus avancées peuvent être intégrées à une application native.",
      },
      {
        q: "Combien coûte le développement d'un logiciel 3D ?",
        a: "Le coût dépend du nombre de produits ou de scènes, du nombre d'options configurables, de la qualité visuelle attendue, de l'existence ou non de modèles 3D, et du degré d'intégration de l'expérience avec votre boutique ou vos systèmes. TDM cadre le projet lors d'une consultation gratuite et vous remet ensuite un devis écrit.",
      },
    ],
  },
  {
    slug: "3d-modeling",
    sector: "3d-design",
    name: "Modélisation 3D",
    navLabel: "Modélisation 3D",
    shortDesc:
      "Des modèles 3D précis de produits, de personnages, d'environnements et d'objets, réalisés selon les exigences techniques du web, du jeu vidéo, de l'impression et de la visualisation.",
    metaTitle: "Modélisation 3D : produits & personnages | TDM",
    metaDescription:
      "TDM crée des modèles 3D précis de produits, personnages, environnements et objets pour le web, le jeu, l'impression et la visualisation, aux formats voulus.",
    hero: {
      headline: "Des modèles 3D conçus pour l'usage auquel ils sont destinés.",
      sub: "Produits, personnages, environnements et accessoires : modélisés, texturés et livrés au bon format pour votre site web, votre moteur de jeu, votre moteur de rendu ou votre imprimante 3D.",
    },
    intro: [
      "La modélisation 3D est la création d'un objet numérique en trois dimensions qui peut ensuite être rendu, animé, intégré à un jeu ou à une application, ou imprimé. Le service de modélisation 3D de TDM produit ces objets pour les marques, les boutiques e-commerce, les studios de jeux et d'applications, les architectes et les industriels qui ont besoin de modèles précis et n'ont pas d'artiste 3D en interne.",
      "Un modèle parfait dans un contexte peut être inutilisable dans un autre. Un rendu exige une géométrie dense et des matériaux détaillés, une visionneuse web ou un jeu exige un faible nombre de polygones et des textures efficaces, et une impression 3D exige un maillage fermé et étanche. Nous demandons où ira le modèle avant de commencer, puis nous le construisons selon ce cahier des charges.",
      "Nos artistes travaillent sur Blender, Autodesk Maya, 3ds Max et ZBrush, et texturent dans Substance 3D Painter avec des matériaux physiquement réalistes (PBR). Vous pouvez commander un seul élément ou une bibliothèque complète, et les fichiers vous appartiennent : libre à vous de les transmettre au prestataire de rendu, au développeur ou à l'imprimeur de votre choix.",
    ],
    features: [
      {
        title: "Modélisation de produits",
        desc: "Des modèles aux dimensions exactes de produits physiques, à partir de dessins techniques, de fichiers CAO, de photos de référence ou d'échantillons, avec des proportions, des matériaux et des finitions fidèles.",
      },
      {
        title: "Modélisation de personnages",
        desc: "Personnages, créatures et mascottes stylisés ou réalistes : sculptés, retopologisés, dépliés en UV et texturés, avec un rigging disponible pour qu'ils soient prêts à être animés.",
      },
      {
        title: "Modélisation d'environnements & d'accessoires",
        desc: "Intérieurs, extérieurs, paysages et les objets qui les peuplent, conçus en ensembles modulaires pour les jeux, les scènes de visualisation, les showrooms virtuels et les décors de films.",
      },
      {
        title: "Modèles prêts pour le jeu & le temps réel",
        desc: "Maillages low-poly avec normal maps bakées, niveaux de détail, UV propres et jeux de textures PBR, exportés pour Unity, Unreal Engine ou le web aux formats FBX et glTF.",
      },
      {
        title: "Textures & matériaux",
        desc: "Des matériaux physiquement réalistes pour le métal, le tissu, le verre, le plastique, le bois et la peau, peints à la main ou créés d'après référence, pour que les surfaces réagissent correctement à la lumière.",
      },
      {
        title: "Modèles pour l'impression 3D",
        desc: "Des maillages étanches, à la bonne échelle, avec l'épaisseur de paroi et les tolérances qu'exige votre procédé d'impression, fournis en STL, OBJ ou 3MF.",
      },
    ],
    process: [
      {
        title: "Brief & références",
        desc: "Vous nous envoyez des dessins, des photos, des mesures ou des croquis et nous indiquez où le modèle sera utilisé. Nous confirmons le cahier des charges, les formats de fichiers et le devis.",
      },
      {
        title: "Blockout",
        desc: "Une version simplifiée du modèle établit l'échelle, les proportions et la silhouette. Vous validez la forme générale avant le début du travail de détail.",
      },
      {
        title: "Modélisation détaillée",
        desc: "Nous construisons la géométrie finale : sculpture haute définition là où c'est nécessaire, topologie propre, et une version optimisée si le modèle est destiné au temps réel.",
      },
      {
        title: "UV, textures & matériaux",
        desc: "Le modèle est déplié et texturé, les matériaux sont paramétrés, et des rendus d'aperçu vous sont envoyés pour recueillir vos commentaires.",
      },
      {
        title: "Validation & livraison",
        desc: "Une fois vos corrections intégrées, nous exportons le modèle aux formats convenus, le vérifions dans le logiciel cible et vous remettons les fichiers sources et les exports.",
      },
    ],
    faqs: [
      {
        q: "De quoi avez-vous besoin de ma part pour créer un modèle 3D ?",
        a: "Plus il y a de références, plus le résultat est précis. Pour les produits, les dessins techniques ou les fichiers CAO sont l'idéal. À défaut, des photos nettes de chaque côté accompagnées des mesures clés conviennent, de même qu'un échantillon physique. Pour les personnages et les environnements, nous travaillons à partir de concept art, de croquis ou d'une description écrite accompagnée de références visuelles.",
      },
      {
        q: "Quels formats de fichiers vais-je recevoir ?",
        a: "Nous livrons au format qu'exige votre prochaine étape. Les plus courants sont FBX et OBJ pour l'échange général, glTF ou GLB pour le web, USDZ pour la réalité augmentée sur les appareils Apple, STL ou 3MF pour l'impression, ainsi que les fichiers natifs Blender, Maya ou 3ds Max. Les textures sont fournies séparément, à la résolution convenue.",
      },
      {
        q: "Quelle est la différence entre un modèle high-poly et un modèle low-poly ?",
        a: "Un modèle high-poly comporte un très grand nombre de polygones et conserve les détails fins, ce qui convient aux rendus fixes et aux animations en gros plan. Un modèle low-poly utilise beaucoup moins de polygones et stocke le détail dans des textures, ce qui lui permet de tourner de façon fluide dans les jeux, les applications et les navigateurs. De nombreux projets ont besoin des deux, et nous créons généralement la version low-poly à partir de la version high-poly.",
      },
      {
        q: "Pouvez-vous modéliser un produit qui n'existe pas encore ?",
        a: "Oui. Nous modélisons régulièrement des produits à partir de croquis de concept ou de premiers plans d'ingénierie, afin qu'ils puissent être présentés à des investisseurs, des distributeurs ou des clients avant la fabrication. Si le design lui-même reste à développer, cela relève de notre service de modélisation et design de produits.",
      },
      {
        q: "À qui appartiennent les modèles 3D une fois terminés ?",
        a: "À vous. Une fois le projet réglé, les modèles finaux, les textures et les fichiers sources appartiennent à votre entreprise et vous êtes libre de les utiliser avec n'importe quel autre prestataire. Les conditions de propriété sont inscrites dans le contrat avant le début des travaux.",
      },
      {
        q: "Comment la modélisation 3D est-elle tarifée ?",
        a: "Le prix dépend de la complexité de chaque objet, du niveau de détail, de l'inclusion ou non du texturing et du rigging, de la qualité des références fournies et du nombre d'éléments. Envoyez-nous vos références lors d'une consultation gratuite et TDM vous remettra un devis pour la prestation concernée.",
      },
    ],
  },
  {
    slug: "3d-rendering",
    sector: "3d-design",
    name: "Rendu 3D photoréaliste",
    navLabel: "Rendu 3D",
    shortDesc:
      "Des images fixes et des animations photoréalistes, rendues à partir de modèles 3D, pour le marketing, l'e-commerce, l'immobilier et les lancements de produits.",
    metaTitle: "Rendu 3D photoréaliste : images & animations | TDM",
    metaDescription:
      "TDM produit des rendus 3D et animations photoréalistes pour le marketing, l'e-commerce, l'immobilier et les lancements : images fixes, vues 360° et films.",
    hero: {
      headline: "Des images photoréalistes, sans séance photo.",
      sub: "Packshots, mises en situation, vues architecturales et animations : rendus à partir de modèles 3D, avec un éclairage, des matériaux et une post-production de qualité studio.",
    },
    intro: [
      "Le rendu 3D photoréaliste transforme un modèle 3D en une image ou une animation qui ressemble à une photographie ou à une séquence filmée. TDM le propose aux marques e-commerce qui ont besoin d'images produits dans chaque couleur et sous chaque angle, aux promoteurs immobiliers qui vendent un bien avant sa construction, et aux entreprises qui lancent un produit pas encore sorti de la chaîne de production.",
      "Le rendu remplace une grande partie de ce qu'exige une prise de vue physique. Aucun échantillon à expédier, aucun studio à réserver, aucun décor à construire. Dès lors qu'un produit ou un bâtiment existe sous forme de scène 3D, un nouvel angle, un nouveau coloris, un nouvel arrière-plan ou une nouvelle saison n'est qu'une modification du fichier, ce qui rend le rendu bien adapté aux grands catalogues et aux projets encore en développement.",
      "Nous éclairons et rendons les scènes avec V-Ray, Corona Renderer, Blender Cycles, Redshift et Unreal Engine, et nous les finalisons dans Photoshop, After Effects et DaVinci Resolve. Les livrables sont dimensionnés selon leur usage : fiches produits de marketplaces, bannières de site web, brochures imprimées, panneaux d'affichage, vidéos pour les réseaux sociaux ou film de lancement.",
    ],
    features: [
      {
        title: "Rendus de produits",
        desc: "Des images studio épurées sur fond blanc ou coloré, des gros plans de détail, des vues en coupe et des vues éclatées, cohérentes sur l'ensemble de votre gamme et pour chaque variante.",
      },
      {
        title: "Mises en situation & scènes d'ambiance",
        desc: "Votre produit placé dans une pièce décorée, dans un cadre extérieur ou en cours d'utilisation, le tout entièrement construit en 3D pour que l'environnement puisse être modifié à chaque campagne ou pour chaque marché.",
      },
      {
        title: "Visualisation architecturale",
        desc: "Vues extérieures, perspectives intérieures, vues aériennes et plans d'étage rendus pour les promoteurs, les architectes et les agents qui commercialisent des biens sur plan ou rénovés.",
      },
      {
        title: "Animation 3D & films produits",
        desc: "Mouvements de caméra autour d'un produit, animations d'assemblage et de fonctionnalités, survols architecturaux, montés avec titres, musique et son pour le web, les réseaux sociaux ou les événements.",
      },
      {
        title: "Vues 360° & séquences d'images",
        desc: "Des séquences d'images qui permettent aux acheteurs de faire pivoter un produit sur une fiche, mises au format de votre plateforme e-commerce ou de votre marketplace.",
      },
      {
        title: "Post-production & livraison multiformat",
        desc: "Étalonnage, retouche et compositing, avec des fichiers finaux exportés dans les tailles, les ratios et les profils colorimétriques qu'exige chaque canal ou chaque imprimeur.",
      },
    ],
    process: [
      {
        title: "Brief & liste des visuels",
        desc: "Nous convenons des images ou des séquences nécessaires, des angles, de l'ambiance et des formats de sortie, et nous réunissons les modèles, les plans, les échantillons de matériaux et la charte de marque.",
      },
      {
        title: "Modélisation & mise en place de la scène",
        desc: "Les modèles fournis sont vérifiés et corrigés, ou créés par notre équipe, puis disposés dans une scène avec des caméras positionnées pour chaque visuel.",
      },
      {
        title: "Ébauches d'éclairage & de matériaux",
        desc: "Vous recevez des aperçus en basse résolution montrant la composition, l'éclairage et les matériaux : c'est à cette étape qu'il faut demander des changements d'angle, de couleur ou de stylisme.",
      },
      {
        title: "Rendu final",
        desc: "Les visuels validés sont rendus en pleine résolution, avec des passes séparées pour les reflets, les ombres et les masques afin de garder la main en post-production.",
      },
      {
        title: "Post-production & livraison",
        desc: "Les images sont retouchées et étalonnées, les animations sont montées et mises en musique, et l'ensemble est livré aux formats convenus, avec les fichiers en calques sur demande.",
      },
    ],
    faqs: [
      {
        q: "Le rendu 3D est-il préférable à la photographie de produits ?",
        a: "Chacun a sa place. Le rendu est la meilleure option lorsque le produit n'est pas encore fabriqué, lorsque vous avez de nombreuses couleurs ou configurations, lorsque l'article est volumineux ou difficile à expédier, ou lorsque vous voulez des vues qu'un appareil photo ne peut pas saisir, comme des vues en coupe. La photographie est souvent plus simple pour une petite gamme de produits existants, pour l'alimentaire ou pour tout ce qui est porté par une personne. TDM propose les deux et recommandera la solution la mieux adaptée au brief.",
      },
      {
        q: "De quoi avez-vous besoin pour démarrer un projet de rendu ?",
        a: "D'un modèle 3D ou d'un fichier CAO si vous en avez un ; sinon, de plans, de dimensions et de photos pour que nous puissions le créer. Il nous faut aussi des références de matériaux et de couleurs, votre charte de marque ou vos consignes de stylisme le cas échéant, des exemples d'images qui vous plaisent, et la liste des supports sur lesquels les visuels seront publiés.",
      },
      {
        q: "Les rendus peuvent-ils être utilisés sur Amazon, Noon et d'autres marketplaces ?",
        a: "Oui. Nous rendons les images principales sur fond blanc pur et les images secondaires selon les dimensions en pixels et les règles de cadrage publiées par chaque marketplace. Les marketplaces attendent des images qu'elles représentent fidèlement le produit : nous reproduisons donc les matériaux, les couleurs et les proportions réels d'après vos références, sans les idéaliser.",
      },
      {
        q: "Pouvez-vous réaliser le rendu d'un bâtiment ou d'un intérieur qui n'a pas encore été construit ?",
        a: "Oui. À partir de plans d'architecte, de fichiers CAO ou BIM et d'un descriptif des matériaux, nous produisons des vues extérieures et intérieures qui montrent le bien achevé. Les promoteurs et les agents les utilisent pour leurs brochures, leurs palissades de chantier, les portails d'annonces et leurs présentations commerciales.",
      },
      {
        q: "Combien de séries de corrections sont incluses ?",
        a: "Des points de validation sont intégrés au processus : un au stade de l'ébauche pour l'angle, l'éclairage et les matériaux, et un sur les images finales pour les corrections de détail. Le nombre de séries de corrections est indiqué dans votre devis afin que chacun sache ce qui est couvert. Les modifications apportées au design lui-même après validation font l'objet d'un devis séparé.",
      },
      {
        q: "Qu'est-ce qui influe sur le coût d'un rendu 3D ?",
        a: "Les principaux facteurs sont l'existence ou non d'un modèle 3D exploitable, le nombre d'images ou de secondes d'animation dont vous avez besoin, la complexité de la scène et la résolution de sortie. L'animation coûte plus cher que les images fixes, car chaque seconde contient de nombreuses images rendues. TDM établit un devis après une consultation gratuite et l'examen de vos références.",
      },
    ],
  },
  {
    slug: "interior-exterior-design",
    sector: "3d-design",
    name: "Design intérieur & extérieur",
    navLabel: "Intérieur & extérieur",
    shortDesc:
      "Conception et visualisation d'intérieurs et d'extérieurs pour les logements, les bureaux, les commerces et l'hôtellerie-restauration, du concept et de l'implantation jusqu'à un projet spécifié et réalisable.",
    metaTitle: "Design intérieur & extérieur en 3D | TDM",
    metaDescription:
      "TDM conçoit et visualise intérieurs et extérieurs pour logements, bureaux, commerces et hôtellerie : implantations, matériaux, éclairage, vues 3D et plans.",
    hero: {
      headline: "Voyez votre espace terminé avant le début des travaux.",
      sub: "Design intérieur et extérieur pour les logements, les bureaux, les boutiques, les restaurants et les hôtels : planifié dans le détail et présenté en 3D, pour que les décisions se prennent à l'écran plutôt que sur le chantier.",
    },
    intro: [
      "Le design intérieur et extérieur consiste à planifier l'apparence et le fonctionnement d'un espace : son implantation, ses matériaux, ses couleurs, son éclairage, son mobilier et, à l'extérieur, sa façade et ses aménagements paysagers. TDM conçoit et visualise ces espaces pour les particuliers propriétaires, les chefs d'entreprise qui aménagent un bureau, une boutique, un restaurant ou un hôtel, et les promoteurs qui ont besoin d'un logement témoin ou d'un concept de façade.",
      "Chaque projet est développé en 3D. Avant de déplacer une cloison ou de commander un canapé, vous voyez la pièce à hauteur d'œil, avec les finitions, le mobilier et l'éclairage proposés en place. Il devient ainsi bien plus facile de comparer les options, de repérer les problèmes d'implantation ou de proportions, et d'obtenir l'accord de vos associés, de votre bailleur ou de vos investisseurs.",
      "Le livrable est un dossier à partir duquel votre entreprise de travaux et vos fournisseurs peuvent travailler : plans d'implantation cotés, élévations, plans d'éclairage et de plafonds, et un descriptif des matériaux, du mobilier et des équipements. Nous préparons les plans dans AutoCAD, SketchUp et Revit, et nous visualisons dans 3ds Max avec V-Ray ou Corona. Pour les clients qui ne sont pas dans la même ville, l'ensemble du processus de conception se déroule à distance, à partir de vos plans, de vos mesures et de photos du site.",
    ],
    features: [
      {
        title: "Concept & planches d'ambiance",
        desc: "Une direction de design pour le projet : style, palette de couleurs, échantillons de matériaux et images de référence, présentés sous forme d'options afin que vous puissiez choisir avant le début du travail de détail.",
      },
      {
        title: "Aménagement de l'espace & implantations",
        desc: "Implantation du mobilier, circulations, zonage et rangements étudiés sur des plans à l'échelle, et confrontés au nombre de personnes qui utilisent l'espace et à ce qu'elles y font.",
      },
      {
        title: "Visualisation 3D des intérieurs",
        desc: "Des vues photoréalistes de chaque pièce clé montrant ensemble les finitions, les menuiseries, le mobilier et l'éclairage, avec des vues panoramiques disponibles pour faire le tour de la pièce.",
      },
      {
        title: "Design extérieur, façades & paysage",
        desc: "Traitements de façade, bardages, entrées, espaces assis en extérieur, terrasses, plantations et éclairage extérieur, présentés en vues de jour et de soirée.",
      },
      {
        title: "Spécification des matériaux, du mobilier & de l'éclairage",
        desc: "Un descriptif listant chaque finition, chaque équipement, chaque luminaire et chaque meuble avec ses dimensions et ses quantités, pour que les devis des fournisseurs reposent sur les mêmes informations.",
      },
      {
        title: "Dossier de plans pour les entreprises de travaux",
        desc: "Plans, élévations, coupes, plans de plafonds et détails de menuiserie qui communiquent clairement l'intention du projet à ceux qui le réalisent.",
      },
    ],
    process: [
      {
        title: "Brief & informations sur le site",
        desc: "Nous échangeons sur la façon dont vous souhaitez utiliser l'espace, sur vos goûts et sur votre budget, et nous réunissons les plans, les mesures et les photos, ou nous organisons un relevé par l'intermédiaire de votre contact sur place.",
      },
      {
        title: "Conception du concept",
        desc: "Vous recevez des planches d'ambiance et des options d'implantation. Nous les affinons ensemble jusqu'à ce que la direction et le plan soient validés.",
      },
      {
        title: "Développement du design en 3D",
        desc: "Le concept retenu est modélisé en 3D avec des matériaux et du mobilier réels, et les vues rendues vous sont transmises pour commentaires et corrections.",
      },
      {
        title: "Spécifications & plans",
        desc: "Une fois les visuels validés, nous produisons le dossier de plans et les descriptifs des finitions, du mobilier, des équipements et de l'éclairage.",
      },
      {
        title: "Remise du dossier & accompagnement à la réalisation",
        desc: "Nous remettons le dossier à vous et à votre entreprise de travaux, nous répondons à ses questions pendant le chantier, et nous examinons les substitutions proposées par les fournisseurs au regard du projet.",
      },
    ],
    faqs: [
      {
        q: "Que comprend un dossier de design intérieur ?",
        a: "Un dossier type contient le concept et les planches d'ambiance, les plans d'implantation du mobilier et des espaces, des vues 3D rendues des pièces principales, les plans d'éclairage et de plafonds, les élévations et les détails de menuiserie, ainsi qu'un descriptif des matériaux, du mobilier et des équipements. Le contenu exact est détaillé dans votre devis, et vous pouvez commander uniquement le concept et les visuels si c'est tout ce dont vous avez besoin.",
      },
      {
        q: "Pouvez-vous concevoir mon espace à distance ?",
        a: "Oui. Il nous faut un plan précis ou un jeu de mesures, des photos ou une visite vidéo de l'espace existant, et un échange sur l'usage que vous comptez en faire. Les présentations et les validations se font en visioconférence, et les plans sont transmis sous forme numérique à vous et à votre entreprise de travaux, où que se trouve le site.",
      },
      {
        q: "Réalisez-vous les travaux de construction ou d'aménagement ?",
        a: "Notre prestation porte sur la conception et la visualisation. Les travaux sont exécutés par l'entreprise de votre choix, que nous accompagnons avec des plans, des spécifications et des réponses aux questions de conception. Les études de structure, d'électricité, de génie climatique et les autres ouvrages d'ingénierie réglementés doivent être conçus et approuvés par des professionnels qualifiés là où se situe le bien.",
      },
      {
        q: "Concevez-vous des espaces commerciaux tels que des bureaux, des boutiques et des restaurants ?",
        a: "Oui. Les projets commerciaux sont pensés autour du parcours des clients, de l'organisation du travail du personnel, de l'identité de marque et des exigences d'exploitation de l'activité, comme le nombre de places assises, la surface d'exposition ou les espaces de service. Parce que TDM s'occupe aussi de branding et de marketing, l'intérieur peut être conçu pour s'accorder à votre identité visuelle et pour bien rendre en photo.",
      },
      {
        q: "Quelle est la différence entre le design intérieur et le rendu 3D ?",
        a: "Le design intérieur, ce sont les décisions : implantation, matériaux, éclairage et mobilier. Le rendu 3D, c'est l'image qui montre ces décisions. Si vous disposez déjà d'un projet abouti réalisé par un autre designer et qu'il ne vous faut que des images, notre service de rendu y répond. Si l'espace reste à concevoir, c'est le présent service qu'il vous faut.",
      },
      {
        q: "Combien coûte un projet de design intérieur ou extérieur ?",
        a: "Les honoraires dépendent de la surface de l'espace, du nombre de pièces ou de zones, du niveau de détail requis pour le dossier de plans et du nombre de vues rendues nécessaires. TDM échange sur le projet lors d'une consultation gratuite et envoie un devis établi à partir de vos plans.",
      },
    ],
  },
  {
    slug: "architecture-planning",
    sector: "3d-design",
    name: "Architecture & planification",
    navLabel: "Architecture",
    shortDesc:
      "Conception architecturale, planification des espaces, plans et visualisation pour les projets résidentiels et commerciaux, en coordination avec vos professionnels habilités localement.",
    metaTitle: "Architecture & planification : plans & 3D | TDM",
    metaDescription:
      "TDM assure conception architecturale, planification des espaces, plans et visualisation 3D, en coordination avec vos professionnels habilités localement.",
    hero: {
      headline: "La conception architecturale, dessinée et visualisée.",
      sub: "Conception, planification des espaces, dossiers de plans et visualisation 3D pour les maisons, les immeubles résidentiels et les projets commerciaux : préparés pour s'articuler avec votre architecte signataire local et vos ingénieurs.",
    },
    intro: [
      "L'architecture et la planification couvrent la conception d'un bâtiment et l'organisation de l'espace à l'intérieur et autour de celui-ci : son implantation sur la parcelle, la relation des pièces entre elles, son apparence et la manière dont tout cela est communiqué par des plans. TDM propose la conception architecturale, la planification des espaces, la production de plans et la visualisation aux propriétaires privés, aux promoteurs, aux investisseurs et aux entreprises qui projettent une construction neuve, une extension ou une reconversion.",
      "Nous menons un projet depuis un brief et une parcelle jusqu'à une conception aboutie, avec des plans coordonnés et des vues 3D. Vous disposez ainsi d'éléments concrets à évaluer, à chiffrer et à présenter avant de vous engager dans la construction, et vos consultants locaux disposent d'un projet clair à poursuivre.",
      "Les règles de construction et les conditions d'exercice professionnel diffèrent d'un pays à l'autre, et souvent d'une ville à l'autre. TDM n'intervient pas en tant qu'architecte signataire et ne signe ni ne tamponne aucun document destiné à une demande de permis. Les dépôts réglementaires sont coordonnés avec les professionnels habilités localement du client, qui vérifient le projet au regard des règles locales et le déposent sous leur propre autorité. Nous fournissons les plans et les maquettes dont ils ont besoin dans AutoCAD, Revit et d'autres formats standard.",
    ],
    features: [
      {
        title: "Concept & esquisse",
        desc: "Études de volumétrie, plan de masse, variantes de plans d'étage et langage architectural du bâtiment, développés à partir de votre brief, des données de la parcelle et de votre budget.",
      },
      {
        title: "Planification des espaces",
        desc: "Dimensions des pièces, proximités, circulations et tableaux de surfaces pour les logements, les bureaux, les locaux commerciaux, les cliniques et les établissements hôteliers, confrontés à l'usage futur du bâtiment.",
      },
      {
        title: "Dossiers de plans d'architecture",
        desc: "Plans de masse, plans d'étage, élévations, coupes et détails types produits dans AutoCAD ou sous forme de maquette BIM Revit, à un niveau de détail convenu pour chaque phase du projet.",
      },
      {
        title: "Maquettes 3D & visualisation",
        desc: "Une maquette 3D du bâtiment dans son contexte, avec des vues extérieures et intérieures rendues et des animations de visite virtuelle pour les décisions du client, les présentations aux investisseurs et la commercialisation.",
      },
      {
        title: "Études de faisabilité & de surfaces",
        desc: "Des études préliminaires montrant ce qu'une parcelle pourrait accueillir et comment la surface se répartit entre les usages, préparées comme éléments de conception pour vos propres vérifications financières et réglementaires.",
      },
      {
        title: "Coordination avec les professionnels locaux",
        desc: "Plans et fichiers de maquette transmis à votre architecte et à vos ingénieurs habilités localement, leurs remarques et les exigences réglementaires étant réintégrées dans le projet.",
      },
    ],
    process: [
      {
        title: "Brief & données du site",
        desc: "Nous consignons vos besoins, votre niveau de budget et l'usage prévu, et nous réunissons le relevé de la parcelle, les plans existants et les éventuelles contraintes d'urbanisme identifiées par vos conseils locaux.",
      },
      {
        title: "Variantes de concept",
        desc: "Nous présentons plusieurs implantations et volumétries avec des vues 3D simples, et vous choisissez la direction à développer.",
      },
      {
        title: "Développement du projet",
        desc: "La variante retenue est développée en plans, élévations et coupes détaillés, avec le choix des matériaux et la production de vues rendues.",
      },
      {
        title: "Dossier de plans",
        desc: "Nous préparons le jeu de plans coordonné et la maquette au niveau de détail convenu, et nous les transmettons dans les formats utilisés par vos consultants.",
      },
      {
        title: "Revue locale & révisions",
        desc: "Vos professionnels habilités vérifient le projet au regard de la réglementation locale et se chargent du dépôt. Nous révisons les plans pour tenir compte de leurs remarques et de celles de l'autorité compétente.",
      },
    ],
    faqs: [
      {
        q: "TDM peut-elle déposer des plans pour un permis de construire ?",
        a: "Non. Les demandes de permis et les autres dépôts réglementaires doivent être effectués par des professionnels habilités là où le projet est construit. TDM prépare la conception architecturale et les plans, et ces dépôts sont coordonnés avec votre architecte ou votre ingénieur habilité localement, qui vérifie la conformité, signe lorsque c'est requis et traite avec l'autorité compétente.",
      },
      {
        q: "Quels services d'architecture TDM propose-t-elle ?",
        a: "Concept et esquisse, planification des espaces, développement du projet, dossiers de plans d'architecture en CAO ou en BIM, modélisation 3D du bâtiment, images rendues et animations de visite virtuelle, ainsi que des études préliminaires de faisabilité et de surfaces. Les études de structure, de génie climatique, d'électricité et les autres études d'ingénierie sont réalisées par les ingénieurs que vous avez désignés, et nous coordonnons nos plans avec les leurs.",
      },
      {
        q: "Ai-je tout de même besoin d'un architecte ou d'un ingénieur local ?",
        a: "Pour tout ce qui nécessite un permis ou une autorisation réglementaire, oui. Un professionnel habilité localement doit assumer la responsabilité de la conformité aux règles et du dépôt. De nombreux clients font appel à TDM pour la conception, les plans et les visuels, et désignent un cabinet local pour la vérification, les autorisations et le suivi de chantier. Si ce cabinet est déjà en place, nous travaillons selon ses exigences dès le départ.",
      },
      {
        q: "Pouvez-vous travailler sur des projets hors des Émirats arabes unis ?",
        a: "Oui. Les travaux de conception, de plans et de visualisation sont réalisés à distance, à partir des relevés, des documents de la parcelle et de votre brief, pour des clients dans le Golfe, au Royaume-Uni, aux États-Unis, en Europe, en Afrique et en Asie. Les règles locales sont appliquées par l'intermédiaire des professionnels habilités que vous désignez sur le lieu du projet.",
      },
      {
        q: "Quels plans et fichiers vais-je recevoir ?",
        a: "Selon le périmètre convenu : plan de masse, plans d'étage, élévations, coupes, détails types et tableaux de surfaces aux formats PDF et DWG, une maquette Revit ou autre maquette BIM lorsque le projet en utilise une, et des images rendues ou des animations. La liste des livrables de chaque phase est précisée dans le devis.",
      },
      {
        q: "Comment les honoraires d'architecture et de planification sont-ils calculés ?",
        a: "Les honoraires reflètent la taille et le type de bâtiment, les phases que vous souhaitez couvrir, le niveau de détail des plans et le volume de visualisation. Une étude de concept pour une maison individuelle est une mission très différente d'un dossier de plans complet pour un immeuble à usage mixte. TDM examine votre brief lors d'une consultation gratuite et établit un devis pour le périmètre défini.",
      },
    ],
  },
  {
    slug: "product-modeling-design",
    sector: "3d-design",
    name: "Modélisation & design de produits",
    navLabel: "Design de produits",
    shortDesc:
      "Concept produit, design industriel et modèles 3D prêts pour le prototypage, les échanges avec les fabricants et les visuels marketing.",
    metaTitle: "Modélisation produit & design industriel | TDM",
    metaDescription:
      "TDM mène vos idées de produits du croquis au design industriel et aux modèles CAO prêts pour le prototypage, les échanges avec les fabricants et le marketing.",
    hero: {
      headline: "De l'idée de produit à un modèle que vous pouvez prototyper.",
      sub: "Croquis de concept, design industriel et CAO : un seul processus qui vous donne des fichiers pour un prototype, un brief clair pour les fabricants et des visuels pour commencer à vendre.",
    },
    intro: [
      "La modélisation et le design de produits consistent à transformer une idée de produit en un design physique défini, exprimé sous la forme d'un modèle CAO 3D avec des dimensions, des matériaux et des pièces réels. TDM propose ce service aux fondateurs qui ont une nouvelle idée de produit, aux marques qui élargissent une gamme existante et aux fabricants qui souhaitent faire redessiner un produit actuel.",
      "Un croquis ou une description ne suffit pas pour qu'une usine établisse un devis ou pour qu'un prototype soit fabriqué. Nous développons la forme, l'ergonomie et la construction du produit, puis nous le modélisons dans des outils de CAO volumique et surfacique tels que SolidWorks, Autodesk Fusion et Rhino, de sorte que chaque pièce possède une géométrie qui peut être mesurée, imprimée et examinée par un fabricant.",
      "Le même modèle sert le volet commercial. Avant même que l'outillage n'existe, nous produisons à partir des données CAO des rendus, des vues éclatées et des animations pour les présentations aux investisseurs, les pages de financement participatif, les présentations aux distributeurs et les campagnes de précommande, et les équipes web et marketing de TDM peuvent construire le lancement autour de ces visuels.",
    ],
    features: [
      {
        title: "Développement de concept & croquis",
        desc: "Plusieurs directions de design explorées au moyen de croquis et d'études 3D rapides, nourries par l'utilisateur cible, les produits concurrents et le niveau de prix que vous visez.",
      },
      {
        title: "Design industriel",
        desc: "Forme, proportions, ergonomie, interaction avec l'utilisateur, et choix de couleurs, de matériaux et de finitions qui définissent l'apparence du produit, son toucher et son usage.",
      },
      {
        title: "Modélisation CAO",
        desc: "Des modèles volumiques et surfaciques paramétriques de chaque pièce et de l'assemblage complet, construits aux dimensions réelles, avec l'espace prévu pour les composants internes.",
      },
      {
        title: "Prise en compte de la fabrication",
        desc: "Épaisseurs de paroi, angles de dépouille, découpage en pièces et méthodes de fixation étudiés en fonction du procédé envisagé, comme le moulage par injection, l'usinage CNC ou la tôlerie, puis affinés avec les retours de votre fabricant.",
      },
      {
        title: "Fichiers prêts pour le prototypage",
        desc: "Des exports STL et STEP préparés pour l'impression 3D ou le prototypage CNC, avec l'ajustement et l'assemblage vérifiés en CAO et des révisions effectuées après vos essais sur la pièce physique.",
      },
      {
        title: "Documentation technique & visuels",
        desc: "Plans cotés, vues éclatées et nomenclature des pièces pour les échanges avec les fournisseurs, ainsi que des rendus photoréalistes et des animations pour le marketing.",
      },
    ],
    process: [
      {
        title: "Brief & recherche",
        desc: "Nous définissons l'utilisateur, la fonction, les contraintes et le coût cible, et nous étudions les produits comparables ainsi que les composants qui doivent trouver place à l'intérieur.",
      },
      {
        title: "Conception du concept",
        desc: "Vous recevez des concepts esquissés et rendus illustrant différentes approches, et vous en retenez un à poursuivre.",
      },
      {
        title: "Développement CAO 3D",
        desc: "Le concept retenu est modélisé en détail : surfaces extérieures, agencement interne, découpage en pièces et méthode d'assemblage.",
      },
      {
        title: "Prototype & mise au point",
        desc: "Nous fournissons les fichiers pour un prototype réalisé par votre fournisseur ou par un service d'impression, puis nous ajustons le design selon l'ajustement, la prise en main et le fonctionnement du modèle physique.",
      },
      {
        title: "Fichiers finaux & remise",
        desc: "Vous recevez la CAO finale aux formats natifs et neutres, les plans techniques et les rendus marketing, prêts pour vos échanges avec les fabricants.",
      },
    ],
    faqs: [
      {
        q: "Je n'ai qu'une idée. TDM peut-elle concevoir le produit en partant de zéro ?",
        a: "Oui. Une description écrite, des croquis sommaires ou des exemples de produits similaires suffisent pour commencer. Nous clarifions ce que le produit doit faire et à qui il s'adresse, nous proposons des concepts de design, puis nous développons celui que vous retenez en un modèle 3D complet. Vous n'avez besoin ni de plans ni de connaissances techniques pour démarrer.",
      },
      {
        q: "Les fichiers seront-ils prêts pour la fabrication ?",
        a: "La CAO est construite en tenant compte du procédé de fabrication envisagé et livrée dans des formats utilisés par les usines, comme STEP et IGES, accompagnée de plans cotés. Chaque fabricant examine ensuite le design au regard de son propre outillage et de ses équipements, et demande normalement des ajustements. Nous effectuons ces modifications avec lui, mais l'industrialisation finale, la conception de l'outillage et les éventuels essais de sécurité ou certifications requis relèvent du fabricant et des organismes d'essai compétents.",
      },
      {
        q: "Fabriquez-vous des prototypes physiques ?",
        a: "Nous préparons les fichiers et les spécifications pour le prototypage et pouvons assurer la coordination, pour votre compte, avec un service d'impression 3D ou d'usinage, ou avec un fournisseur que vous utilisez déjà. Une fois que vous avez eu le prototype en main, nous mettons le design à jour en fonction de vos constats.",
      },
      {
        q: "Quelle est la différence entre le design de produits et la modélisation 3D ?",
        a: "La modélisation 3D reproduit un objet dont le design est déjà arrêté, généralement pour des images, des jeux ou le web. Le design de produits décide de ce qu'est l'objet : sa forme, ses pièces, ses matériaux et son mode d'assemblage, et le consigne dans une CAO de niveau ingénierie. Si votre produit existe déjà et qu'il vous faut des visuels, nos services de modélisation 3D ou de rendu sont plus adaptés.",
      },
      {
        q: "Comment la confidentialité de mon idée de produit est-elle assurée ?",
        a: "Si vous le souhaitez, nous signons un accord de confidentialité avant que vous ne partagiez des détails, et le contrat du projet stipule que le design et tous les fichiers vous appartiennent une fois la prestation réglée. Votre concept n'apparaît pas dans notre communication sans votre autorisation écrite.",
      },
      {
        q: "Combien coûte le design d'un produit ?",
        a: "Cela dépend de la complexité du produit, du nombre de pièces, de la présence ou non d'électronique ou de mécanismes que le boîtier doit accueillir, du nombre de directions de concept et de séries de prototypes que vous souhaitez, et de la documentation et des visuels nécessaires. TDM remet un devis après une consultation gratuite consacrée à votre idée.",
      },
    ],
  },
];

export const frDesign3dSector: Sector = {
  slug: "3d-design",
  name: "3D & Design",
  tagline: "Conçu, modélisé et montré avant d'être construit.",
  metaTitle: "3D & Design : modélisation, rendu, architecture | TDM",
  metaDescription:
    "Le pôle 3D & Design de TDM couvre logiciels 3D, modélisation, rendu photoréaliste, design intérieur et extérieur, architecture et design de produits.",
  hero: {
    headline: "La 3D et le design, du premier concept aux fichiers finaux.",
    sub: "Logiciels 3D interactifs, modélisation, rendu photoréaliste, design intérieur et extérieur, architecture et planification, design de produits : le tout livré par une seule équipe.",
  },
  intro: [
    "TDM 3D & Design crée les modèles, les images, les plans et les expériences interactives qui permettent de voir un produit ou un espace avant qu'il n'existe. Le pôle couvre six services : le développement de logiciels 3D, la modélisation 3D, le rendu 3D photoréaliste, le design intérieur et extérieur, l'architecture et la planification, ainsi que la modélisation et le design de produits.",
    "Ces services partagent les mêmes ressources 3D, et fonctionnent donc bien ensemble. Un produit conçu en CAO peut être rendu pour son lancement et intégré à un configurateur web. Un bâtiment peut être planifié, dessiné et visualisé à partir d'une seule maquette. Et parce que TDM crée aussi des sites web et pilote le marketing, les visuels finalisés rejoignent directement la boutique, la campagne ou le support commercial pour lesquels ils ont été réalisés.",
  ],
  faqs: [
    {
      q: "Quels services de 3D et de design TDM propose-t-elle ?",
      a: "TDM propose le développement de logiciels 3D (configurateurs de produits, visionneuses 3D, aperçus en réalité augmentée et visualisation en temps réel), la modélisation 3D, le rendu et l'animation 3D photoréalistes, le design intérieur et extérieur, l'architecture et la planification, ainsi que la modélisation de produits et le design industriel.",
    },
    {
      q: "TDM peut-elle travailler sur des projets de 3D et de design pour des clients hors des Émirats arabes unis ?",
      a: "Oui. TDM a son siège à Dubaï et travaille avec des clients dans l'ensemble du Golfe, au Royaume-Uni, aux États-Unis, en Europe, en Afrique et en Asie. Les projets de 3D et de design sont menés à partir de vos plans, de vos références, de vos mesures et de vos fichiers, avec des points de validation en visioconférence et des livrables transmis sous forme numérique.",
    },
    {
      q: "TDM valide-t-elle des plans d'architecture pour les permis de construire ?",
      a: "Non. TDM fournit la conception architecturale, les plans et la visualisation. Les demandes de permis et les dépôts réglementaires sont coordonnés avec les professionnels habilités localement du client, qui vérifient le projet au regard de la réglementation locale et le déposent sous leur propre autorité.",
    },
    {
      q: "Combien coûtent les services de 3D et de design ?",
      a: "Le coût dépend du service, de la complexité du produit ou de l'espace, du nombre de livrables et des références disponibles. TDM propose une consultation gratuite et remet un devis une fois le périmètre clarifié.",
    },
  ],
};
