import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "3d-design/3d-software-development": {
    title: "Ce qu'il faut savoir avant de commander un logiciel 3D interactif",
    sections: [
      {
        heading: "La 3D interactive est-elle adaptée à votre situation ?",
        body: [
          "La 3D interactive se justifie quand le fait de voir et de manipuler le produit change une décision : un acheteur qui hésite entre plusieurs finitions, ou une équipe commerciale qui explique comment une machine s'assemble. Si de bonnes photos rendent le même service, cet argent sera mieux employé ailleurs.",
          "Avant de demander des devis, il vous faut une liste claire des produits ou des scènes à couvrir, ainsi qu'une page, une boutique ou une application où l'expérience sera intégrée. Notre générateur gratuit de brief de projet 3D transforme ces réponses en un document que vous pouvez envoyer à n'importe quel prestataire.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Le prix d'une application 3D dépend du travail de production des éléments 3D et du travail de développement du logiciel qui les entoure.",
        ],
        bullets: [
          "Ce que l'utilisateur peut modifier : une visionneuse fixe est bien plus simple qu'un configurateur avec des règles sur les options compatibles entre elles.",
          "Les appareils sur lesquels elle doit fonctionner, car la prise en charge de téléphones anciens impose des limites plus strictes sur le poids des modèles et les effets.",
          "Les connexions à d'autres systèmes : prix en temps réel, stock, panier ou demande de devis.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le développement lancé",
        body: [
          "On vous demandera plus que des fichiers : vos règles produit (quelles options existent et quelles combinaisons sont interdites), un accès à une version de test de votre site ou de votre boutique, et une personne habilitée à valider les décisions.",
          "Un petit échantillon fonctionnel précède le développement complet. Validez-le sur le téléphone qu'utilisent vos clients, et non sur le poste de travail d'un designer. La durée de chaque étape dépend du brief et de l'état de vos éléments 3D, et elle est convenue dans le plan.",
        ],
      },
      {
        heading: "Comment juger le résultat, et les signaux d'alerte",
        body: [
          "Jugez-le sur vos propres appareils et avec une connexion mobile. Il doit se charger sans longue attente, afficher des couleurs et des matières fidèles au produit réel, et transmettre les bonnes options à la commande ou à la demande de contact.",
          "Méfiez-vous d'un prestataire qui ne fait ses démonstrations que sur un ordinateur puissant, n'a rien prévu pour les appareils incapables d'afficher la 3D, conserve le code source ou les modèles, ou établit un devis sans demander où l'expérience sera intégrée.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il développer un configurateur 3D sur mesure ou utiliser une plateforme existante ?", a: "Les plateformes de configuration et de visualisation prêtes à l'emploi conviennent aux produits standards avec des options simples, et fonctionnent généralement par abonnement. Un développement sur mesure convient aux règles d'options complexes, aux visuels inhabituels ou aux liens étroits avec vos propres systèmes, et le résultat vous appartient." },
      { q: "Qui met à jour un configurateur 3D quand les produits changent ?", a: "Les petites modifications, comme une nouvelle couleur ou un nouveau prix, peuvent souvent être faites par votre équipe si un écran d'administration ou un fichier de données est prévu dans le périmètre. Un nouveau produit demande un nouveau modèle préparé au même niveau d'exigence, ce qui relève en général d'un artiste 3D." },
      { q: "Les moteurs de recherche lisent-ils le contenu d'une visionneuse 3D ?", a: "Pas comme ils lisent du texte. Une scène 3D est dessinée dans un canevas : les noms et les caractéristiques qui y apparaissent ne sont donc généralement pas indexés comme contenu de la page. Gardez les informations produit importantes sous forme de texte et d'images classiques sur la page." },
    ],
  },
  "3d-design/3d-modeling": {
    title: "Ce qu'il faut savoir avant de commander des modèles 3D",
    sections: [
      {
        heading: "Un modèle 3D est-il ce dont vous avez besoin maintenant ?",
        body: [
          "Commandez un modèle quand vous savez ce que vous en ferez. L'usage détermine presque tout dans la manière de le construire : « un modèle 3D de notre produit » n'est donc pas encore un brief.",
          "Vérifiez aussi ce que vous possédez déjà : un fabricant ou une ancienne agence détient peut-être des fichiers CAO ou 3D qui peuvent être adaptés. Avant de demander des devis, listez chaque objet, l'usage prévu et les références dont vous disposez ; notre générateur gratuit de brief de projet 3D met tout cela en forme pour vous.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "La modélisation se facture au temps passé par l'artiste, et quelques éléments décident du temps qu'un objet demande :",
        ],
        bullets: [
          "La forme : les objets à arêtes nettes, comme les meubles ou l'électroménager, vont plus vite que les formes organiques comme les personnages, les tissus ou les plantes.",
          "La distance à laquelle la caméra s'approchera, car un détail qui n'est jamais vu n'a pas besoin d'être modélisé.",
          "La qualité de vos références, puisque deviner à partir de deux photos floues entraîne des allers-retours de correction supplémentaires.",
          "Le volume et la ressemblance : une gamme qui partage des pièces ou des matières coûte moins cher par article que des objets uniques sans rapport entre eux.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la modélisation lancée",
        body: [
          "On vous demandera de désigner une seule personne pour donner les retours, et de les donner aux points de contrôle convenus. Modifier les proportions coûte peu au début et cher une fois les textures peintes : examinez donc attentivement la première version brute, même si elle paraît inachevée.",
          "Pour un lot important, demandez qu'un premier objet soit terminé pour servir de référence. Les dates de livraison dépendent du nombre et de la complexité des objets et figurent dans le plan.",
        ],
      },
      {
        heading: "Comment juger un modèle, et les signaux d'alerte",
        body: [
          "Les signaux d'alerte apparaissent tôt : un prestataire qui ne demande jamais où le modèle sera utilisé, ne montre aucun maillage filaire dans son portfolio, ou rechigne à remettre les fichiers sources.",
          "À la réception des fichiers, ouvrez-les là où ils seront utilisés au lieu de les juger sur une image d'aperçu, et vérifiez que :",
        ],
        bullets: [
          "L'échelle est correcte à l'import du modèle, sans redimensionnement manuel.",
          "Les textures sont fournies et liées, à la résolution convenue.",
          "Il fonctionne de manière acceptable dans le moteur de jeu, la page web ou le logiciel d'impression visé.",
        ],
      },
    ],
    faqs: [
      { q: "Puis-je plutôt acheter un modèle 3D tout fait dans une banque de modèles ?", a: "Pour des objets génériques comme des chaises, des arbres ou des voitures, souvent oui. Lisez la licence attentivement, car certaines licences de banques de modèles restreignent l'usage commercial, la revente ou l'utilisation dans des jeux et des applications." },
      { q: "Peut-on créer un modèle 3D à partir d'un scan 3D ou de photos ?", a: "Oui. La photogrammétrie et le scan 3D capturent rapidement des objets réels. Le résultat brut est en général lourd et irrégulier, et les objets brillants, transparents ou très fins se scannent mal : un artiste le nettoie ou le reconstruit donc le plus souvent avant qu'il soit exploitable." },
      { q: "Les outils d'IA peuvent-ils générer des modèles 3D ?", a: "Les générateurs par IA peuvent produire une forme approximative à partir d'une description écrite ou d'une image. À ce jour, les résultats présentent souvent une géométrie désordonnée et des dimensions inexactes : ils atteignent donc rarement, sans reprise manuelle, le niveau requis pour une fiche produit, un personnage de jeu ou une impression." },
    ],
  },
  "3d-design/3d-rendering": {
    title: "Ce qu'il faut savoir avant de commander des rendus 3D",
    sections: [
      {
        heading: "Le rendu 3D est-il adapté à votre situation ?",
        body: [
          "Le rendu est le plus rentable quand le design est arrêté. Modifier la forme du produit après le début du travail oblige à revenir plusieurs étapes en arrière. Si le design évolue encore, demandez pour l'instant de simples vues de travail et gardez les images soignées pour le moment où il sera figé.",
          "Rédigez une liste des vues avant de demander des devis : notre générateur gratuit de brief de projet 3D vous aide à décrire chaque image, son usage et son format.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Au-delà du nombre d'images, le devis reflète ce qu'il faut construire et décider pour chacune :",
        ],
        bullets: [
          "Le fait que chaque vue ait ou non son propre décor : dix angles dans une même mise en scène de studio demandent bien moins de travail que dix pièces différentes.",
          "Les matières difficiles, car le verre, les liquides, la fourrure et les tissus sont plus longs à réussir que le métal peint ou le plastique.",
          "Les personnes et les êtres vivants, difficiles à rendre crédibles et souvent ajoutés à partir de photographies.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la production lancée",
        body: [
          "On vous demandera de valider les choses dans un ordre qui peut sembler inversé : d'abord des aperçus en gris uni ou en couleurs approximatives, pour fixer l'angle de caméra et la composition, puis les matières et l'éclairage, puis l'image finie. Demander un nouvel angle une fois l'image finale terminée oblige à la calculer de nouveau.",
          "Ayez des références physiques à portée de main. La couleur à l'écran varie d'un moniteur à l'autre : un code de peinture, un échantillon de matière ou une photo de la vraie finition à la lumière du jour tranche donc les désaccords plus vite que des adjectifs. Le calendrier dépend du nombre de vues et de la rapidité des retours, et il est fixé dans le plan.",
        ],
      },
      {
        heading: "Comment juger un rendu, et les signaux d'alerte",
        body: [
          "Placez le rendu à côté du produit réel ou de l'échantillon, s'il existe, et comparez les proportions, la couleur et l'état de surface. Regardez ensuite là où les rendus échouent d'ordinaire : des arêtes parfaitement vives, des surfaces sans aucune variation, des ombres qui n'ancrent pas l'objet au sol.",
          "Parmi les signaux d'alerte : un portfolio sans aucun sujet proche du vôtre, des aperçus retenus jusqu'à l'image finale, et des visuels qui flattent le produit au-delà de ce que vous livrerez.",
        ],
      },
    ],
    faqs: [
      { q: "Puis-je réutiliser la scène 3D pour de futures images ?", a: "En général, oui. Demandez dès le devis si les fichiers de scène, les modèles et les matières vous sont remis ou sont conservés par le studio." },
      { q: "Les images générées par IA peuvent-elles remplacer le rendu 3D ?", a: "Pour des images d'ambiance et des premières idées, oui. Les générateurs d'images ne partent pas de vos dimensions réelles : ils ont donc tendance à modifier des détails comme les proportions, les logos ou les coutures d'une image à l'autre. Quand l'image doit montrer exactement ce que le client recevra, sur de nombreuses vues cohérentes, le rendu d'un modèle exact reste la méthode fiable." },
      { q: "Quelle résolution faut-il pour l'impression et pour le web ?", a: "Cela dépend du format imprimé et de la distance d'observation. En règle générale, les brochures et les magazines s'impriment à environ 300 pixels par pouce, tandis que les grandes affiches vues de loin en demandent moins. Indiquez d'abord au studio l'usage le plus grand, car une grande image se réduit bien mais s'agrandit mal." },
    ],
  },
  "3d-design/interior-exterior-design": {
    title: "Ce qu'il faut savoir avant de faire appel à un designer d'intérieur ou d'extérieur",
    sections: [
      {
        heading: "Est-ce le bon moment pour faire appel à un designer ?",
        body: [
          "Le meilleur moment se situe avant toute commande ou démolition, et idéalement avant que le prix de l'entreprise de travaux soit arrêté. Un projet conçu après l'achat de la cuisine ou la pose des cloisons ne peut que composer avec ces décisions.",
          "Trois points doivent aussi être réglés, au moins dans les grandes lignes : ce que vous avez le droit de modifier, le budget des travaux eux-mêmes, et qui décide. Notre générateur gratuit de brief de projet 3D permet de réunir rapidement les pièces, le style et les contraintes sur une page avant un premier échange.",
        ],
      },
      {
        heading: "Ce qui détermine les honoraires de conception",
        body: [
          "Les honoraires suivent la quantité de réflexion et de dessin qu'un espace demande, ce qui n'est pas la même chose que sa surface :",
        ],
        bullets: [
          "Les cuisines, les salles de bains et les menuiseries sur mesure demandent bien plus de détails au mètre carré que les chambres ou les bureaux ouverts.",
          "Une rénovation complète, avec déplacement de cloisons et de réseaux, représente plus de travail que l'ameublement et les finitions d'un volume existant.",
          "Le niveau d'accompagnement que vous souhaitez pendant que l'entreprise est sur le chantier.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la conception lancée",
        body: [
          "Au début, on vous posera des questions qui semblent personnelles : comment vous vivez ou travaillez dans l'espace, ce que vous conservez, ce qui vous y agace aujourd'hui. Des réponses franches donnent un meilleur plan qu'un dossier d'images enregistrées.",
          "Les décisions se prennent dans un ordre fixe : d'abord le plan, puis l'ambiance, puis les produits précis. Modifier le plan après la réalisation des vues 3D oblige à les refaire. Le calendrier dépend de la taille du projet et de la rapidité de vos décisions, et il est inscrit dans le plan.",
        ],
      },
      {
        heading: "Comment juger un projet, et les signaux d'alerte",
        body: [
          "Un bon projet peut être réalisé par quelqu'un qui n'a jamais parlé au designer. Testez-le ainsi : remettez les plans et les nomenclatures à votre entreprise de travaux et voyez combien de questions reviennent. Vérifiez que le mobilier des vues 3D est dessiné à sa taille réelle, car un mobilier sous-dimensionné fait paraître n'importe quelle pièce spacieuse.",
          "Signaux d'alerte : de belles images sans plans derrière, des matériaux que le designer ne sait ni nommer ni trouver, aucune discussion sur le budget, et des commissions non déclarées versées par les fournisseurs recommandés.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il engager un architecte d'intérieur avant l'entreprise de travaux ?", a: "Dans la plupart des cas, oui. Avec un dossier de plans terminé, plusieurs entreprises peuvent chiffrer le même périmètre, et leurs devis deviennent comparables. Sans dossier, chaque entreprise chiffre ses propres hypothèses." },
      { q: "L'espace terminé ressemblera-t-il aux rendus 3D ?", a: "Il peut s'en approcher de près si les produits prescrits sont bien ceux qui sont posés et si l'éclairage est installé comme dessiné. Les écarts viennent le plus souvent de remplacements décidés sur le chantier, des variations naturelles de matériaux comme la pierre et le bois, et de la lumière du jour. Demandez des échantillons des principales finitions et regardez-les dans la pièce elle-même avant de commander." },
      { q: "Faire appel à un designer pour une seule pièce en vaut-il la peine ?", a: "Cela peut être le cas, surtout pour les pièces où les erreurs coûtent cher à corriger, comme une cuisine, une salle de bains ou une devanture de magasin. Pour un simple rafraîchissement, un concept et une liste d'achats peuvent suffire, sans dossier de plans complet." },
    ],
  },
  "3d-design/architecture-planning": {
    title: "Ce qu'il faut savoir avant de commander une conception architecturale",
    sections: [
      {
        heading: "Êtes-vous prêt à lancer la conception ?",
        body: [
          "La conception peut commencer dès que vous disposez d'un terrain ou d'un bâtiment et du droit d'y construire. Avant de payer des plans, renseignez-vous sur ce que les règles locales autorisent sur ce terrain : destination permise, hauteur, reculs et surface constructible. Un professionnel habilité localement est la bonne personne pour confirmer ces limites.",
          "Formulez vos besoins en nombre de pièces, de personnes et d'usages, et non comme l'image d'un bâtiment terminé. Notre générateur gratuit de brief de projet 3D vous fournit un document de départ structuré pour cela.",
        ],
      },
      {
        heading: "Ce qui détermine les honoraires",
        body: [
          "Les honoraires d'architecture suivent la quantité de conception et de coordination qu'un projet demande. Outre la taille du bâtiment, ces éléments comptent :",
        ],
        bullets: [
          "Construction neuve, extension ou transformation : travailler sur une structure existante exige des relevés et davantage de vérifications.",
          "La stabilité de votre programme, car un projet qui change de destination ou de taille en cours de route est en partie conçu deux fois.",
          "Le fait que vous ayez besoin de plans uniquement pour décider et chiffrer, ou d'un dossier assez détaillé pour construire.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la conception en cours",
        body: [
          "On vous demandera les documents du terrain, un relevé, les plans existants éventuels et le nom de votre professionnel habilité localement si vous en avez désigné un. Désignez cette personne tôt : sa lecture de la réglementation locale oriente la conception.",
          "La conception se resserre ensuite par étapes : des options, puis un projet développé, puis un jeu de plans coordonné. Chaque étape se termine par une décision de votre part. Le planning dépend de l'ampleur du projet et des relectures par d'autres intervenants : il est donc convenu avec vous dans le plan.",
        ],
      },
      {
        heading: "Comment juger les plans, et les signaux d'alerte",
        body: [
          "De bons plans concordent entre eux. Choisissez une pièce et suivez-la sur le plan, la coupe et la façade : les fenêtres, les niveaux et les cotes doivent correspondre. Vérifiez que les vues en rendu montrent le même bâtiment que les plans.",
          "Parmi les signaux d'alerte : quiconque affirme que l'autorisation est certaine, un projet conçu sans une seule question sur la réglementation locale, et des images livrées sans plans cotés.",
        ],
      },
    ],
    faqs: [
      { q: "Quelle est la différence entre un architecte et un concepteur en architecture ?", a: "Dans de nombreux pays, « architecte » est un titre protégé que seules les personnes inscrites auprès de l'organisme professionnel compétent peuvent porter, et elles seules peuvent assumer la responsabilité légale de certains dépôts. Les règles varient selon les pays : vérifiez donc ce que votre projet exige légalement là où il sera construit." },
      { q: "Faut-il faire réaliser une esquisse avant d'acheter un terrain ?", a: "Une courte esquisse de faisabilité peut être utile avant de vous engager, car elle montre à peu près ce qui pourrait tenir sur le terrain. Ce qui peut être construit est décidé par les règles d'urbanisme locales et par l'administration : faites donc confirmer les contraintes par un professionnel local avant de vous appuyer sur une étude pour un achat." },
      { q: "Qu'est-ce que le BIM, et en ai-je besoin pour mon projet ?", a: "Le BIM, ou modélisation des informations du bâtiment, signifie que le bâtiment est conçu comme une maquette 3D unique, dont sont tirés les plans, les coupes et les nomenclatures. Il est surtout utile sur les projets importants réunissant plusieurs bureaux d'études. Pour une petite maison, des plans CAO classiques suffisent souvent." },
    ],
  },
  "3d-design/product-modeling-design": {
    title: "Ce qu'il faut savoir avant de faire appel à un designer produit",
    sections: [
      {
        heading: "Votre idée est-elle prête pour la conception ?",
        body: [
          "Le travail de design se justifie plus facilement quand vous avez quelques preuves que le produit est attendu et une idée approximative du prix que les gens paieraient. Un designer peut rendre presque n'importe quoi fabricable à un certain prix ; la question est de savoir si ce prix vous laisse une marge.",
          "Avant le premier rendez-vous, notez qui est l'utilisateur, ce que le produit doit faire, où il sera vendu et le coût unitaire que vous devez atteindre. Notre générateur gratuit de brief de projet 3D organisera ces points.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Deux factures entrent en jeu : les honoraires de design, puis le coût de l'outillage et de la production, qui est de loin la plus lourde des deux pour la plupart des produits moulés. Les choix faits pendant le design fixent la seconde facture : le devis de design le moins cher n'est donc pas toujours la voie la moins coûteuse. Le travail de design lui-même dépend de :",
        ],
        bullets: [
          "La nouveauté du produit : redessiner un type de produit connu demande moins de travail qu'inventer un mécanisme.",
          "Le procédé de fabrication prévu et le volume attendu, puisque chacun impose des règles de conception différentes.",
          "Les normes que le produit doit respecter sur les marchés où vous le vendrez.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail de design lancé",
        body: [
          "Attendez-vous à des questions difficiles dès le début : coût cible, quantité de la première commande, et fonctions que vous abandonneriez en premier.",
          "Prévoyez un prototype physique, et servez-vous-en vraiment. Confiez-le à des personnes qui ressemblent à votre utilisateur et observez-les sans rien expliquer. Le nombre d'itérations nécessaires, et leur durée, dépendent du produit et sont convenus dans le plan.",
        ],
      },
      {
        heading: "Comment juger le design, et les signaux d'alerte",
        body: [
          "Un bon design produit se voit dans les fichiers autant que dans les images. La CAO doit s'ouvrir proprement dans un autre logiciel, les pièces doivent s'assembler sans se chevaucher, et les plans doivent porter les cotes et les matières dont une usine a besoin pour établir un devis.",
          "Soyez prudent si un designer ne demande jamais comment le produit sera fabriqué ni ce qu'il doit coûter, refuse de remettre les fichiers CAO natifs, ou affirme qu'un design passera à coup sûr la certification avant le moindre essai.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il breveter mon idée avant d'en parler à un designer produit ?", a: "Pas nécessairement, mais comprenez d'abord le risque. Dans de nombreux pays, divulguer publiquement une invention avant le dépôt peut compromettre votre possibilité de la breveter, raison pour laquelle les échanges se tiennent normalement sous accord de confidentialité. Savoir si votre idée est brevetable, et quand déposer, relève d'un conseil en propriété industrielle." },
      { q: "Ai-je besoin d'un designer produit ou d'un ingénieur ?", a: "Souvent des deux, à des moments différents. Un designer industriel définit l'apparence du produit, la sensation qu'il procure et la manière dont on l'utilise, ainsi que les pièces extérieures. Les ingénieurs en mécanique et en électronique font fonctionner l'intérieur et démontrent qu'il tiendra dans la durée." },
      { q: "Comment trouver un fabricant une fois le design terminé ?", a: "Partez du procédé dont votre produit a besoin et cherchez des usines qui fabriquent déjà des articles similaires à votre volume. Envoyez le même dossier de plans, de CAO et de quantités à plusieurs d'entre elles, et comparez leurs questions autant que leurs prix. Faites confirmer les quantités minimales de commande et la propriété de l'outillage." },
    ],
  },
};
