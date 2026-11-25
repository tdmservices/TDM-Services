import type { Sector, Service } from "@/lib/types";

export const frAiServices: Service[] = [
  {
    slug: "ai-development",
    sector: "ai",
    name: "Développement IA",
    navLabel: "Développement IA",
    shortDesc:
      "Applications et assistants IA sur mesure, construits sur de grands modèles de langage : assistants conversationnels, recherche dans vos propres documents et fonctionnalités IA dans les produits que vous exploitez déjà.",
    metaTitle: "Développement IA : applications LLM sur mesure | TDM",
    metaDescription:
      "TDM développe des applications IA sur mesure sur de grands modèles de langage : assistants, réponses tirées de vos documents, IA dans vos produits, testées.",
    hero: {
      headline: "Des applications IA sur mesure, construites autour de votre activité.",
      sub: "Assistants conversationnels, réponses tirées de vos propres documents et fonctionnalités IA dans votre produit existant : conçus, développés, testés et maintenus par TDM.",
    },
    intro: [
      "Le service de développement IA de TDM conçoit et réalise des logiciels sur mesure, bâtis sur de grands modèles de langage, pour les entreprises qui veulent confier à l'IA une mission précise : répondre aux clients, aider les équipes à trouver l'information, rédiger des documents ou ajouter une fonctionnalité intelligente à un produit existant. Il s'adresse aux entreprises qui ont dépassé le stade de l'essai d'un chatbot grand public et qui ont désormais besoin d'un outil qui connaît leurs propres contenus, respecte leurs règles et s'intègre à leurs systèmes.",
      "Livré à lui-même, un modèle de langage ne sait rien de vos tarifs, de vos politiques ni de vos clients. Le travail d'ingénierie, c'est tout ce qui entoure le modèle : retrouver la bonne information de l'entreprise au bon moment, rédiger les instructions qui façonnent son comportement, le connecter à vos données et à vos outils, et vérifier ses réponses avant qu'elles n'atteignent un utilisateur. C'est cette partie que nous construisons.",
      "Nous travaillons avec les principaux modèles commerciaux d'Anthropic, d'OpenAI et de Google ainsi qu'avec des modèles open source, et nous choisissons projet par projet selon la qualité des réponses, le coût d'exploitation, la rapidité et les endroits où vos données sont autorisées à transiter. Comme TDM développe aussi des sites web, des applications mobiles et des systèmes de gestion, l'IA est livrée au sein d'un produit fonctionnel, avec une véritable interface, des comptes utilisateurs et un hébergement, et non sous la forme d'une démo isolée.",
    ],
    features: [
      {
        title: "Assistants conversationnels pour clients et équipes",
        desc: "Des assistants pour votre site web, votre application, WhatsApp ou vos outils internes, qui répondent sur votre ton, s'en tiennent aux sujets que vous définissez et passent la conversation à une personne quand il le faut.",
      },
      {
        title: "Recherche dans les documents de l'entreprise",
        desc: "Génération augmentée par récupération (RAG) : nous indexons vos manuels, politiques, contrats et base de connaissances dans une base de données vectorielle, afin que l'assistant réponde à partir de vos contenus et cite sa source.",
      },
      {
        title: "Fonctionnalités IA dans vos produits existants",
        desc: "Résumés, recherche intelligente, aide à la rédaction, classification, recommandations et extraction de données ajoutés au site web, à l'application ou au CRM que vous exploitez déjà, via les API des fournisseurs de modèles.",
      },
      {
        title: "Ingénierie des prompts et des modèles",
        desc: "Prompts système, sorties structurées, appels d'outils et choix du modèle mis au point par des tests, pour que chaque tâche utilise le modèle qui la traite bien, à un coût d'exploitation raisonnable.",
      },
      {
        title: "Évaluation et garde-fous",
        desc: "Jeux de tests construits à partir de questions réelles, notation automatisée des réponses, filtres en entrée et en sortie, et règles définissant ce que l'assistant doit refuser ou faire remonter, exécutés avant le lancement et après chaque modification.",
      },
      {
        title: "Déploiement, supervision et maîtrise des coûts",
        desc: "Hébergement, contrôle des accès, journalisation des conversations, tableaux de bord d'utilisation et plafonds de dépenses, pour que vous voyiez ce que fait l'application et ce qu'elle coûte à faire tourner.",
      },
    ],
    process: [
      {
        title: "Cas d'usage et périmètre",
        desc: "Nous définissons la mission que l'IA doit remplir, qui l'utilisera, de quelles données elle a besoin et à quoi ressemble une bonne réponse, puis nous confirmons que la tâche se prête bien à un modèle de langage.",
      },
      {
        title: "Données et architecture",
        desc: "Nous examinons vos contenus et vos systèmes, choisissons le modèle, l'approche de récupération et la configuration d'hébergement, et convenons de la manière dont les données sensibles seront traitées.",
      },
      {
        title: "Prototype",
        desc: "Nous construisons une version fonctionnelle sur un échantillon de vos contenus réels, pour que vous puissiez la tester avec vos propres questions avant d'engager le développement complet.",
      },
      {
        title: "Développement et évaluation",
        desc: "Nous développons l'application complète, la connectons à vos systèmes et la confrontons au jeu d'évaluation, en ajustant les prompts, la récupération et les garde-fous jusqu'à ce que les réponses atteignent le niveau convenu.",
      },
      {
        title: "Lancement et amélioration",
        desc: "Nous déployons, suivons les conversations réelles, corrigeons les lacunes que l'usage en conditions réelles révèle et mettons l'application à jour à mesure que vos contenus et les modèles sous-jacents évoluent.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que le développement IA sur mesure ?",
        a: "Le développement IA sur mesure consiste à construire un logiciel autour d'un grand modèle de langage pour qu'il accomplisse une tâche définie pour votre entreprise, à partir de vos propres informations. Par exemple : un assistant de support qui répond à partir de votre centre d'aide, un outil interne qui recherche dans les contrats, ou une fonctionnalité de votre application qui rédige des projets de réponse. Cela diffère de l'usage d'un chatbot grand public, car l'application est connectée à vos données, limitée à vos règles et intégrée à votre propre produit.",
      },
      {
        q: "Avec quels modèles d'IA TDM travaille-t-elle ?",
        a: "Nous développons avec les modèles Claude d'Anthropic, les modèles GPT d'OpenAI, Gemini de Google et des modèles open source qui peuvent être hébergés de façon privée. Le choix dépend de la tâche, de la qualité requise, du coût par requête et de toute restriction sur le lieu où les données peuvent être traitées. Nous concevons l'application de sorte que le modèle puisse être remplacé plus tard sans tout reconstruire.",
      },
      {
        q: "L'IA donnera-t-elle des réponses fausses ou inventera-t-elle des choses ?",
        a: "Tout modèle de langage peut produire une réponse fausse, et personne ne peut honnêtement promettre que cela n'arrivera jamais. Nous réduisons le risque en faisant répondre l'assistant à partir de vos documents, sources à l'appui, en le limitant à des sujets définis, en le testant sur un ensemble de questions réelles et en orientant les cas incertains ou sensibles vers une personne. Vous voyez les résultats des tests avant le lancement et décidez si le niveau est acceptable pour votre usage.",
      },
      {
        q: "Les données de notre entreprise sont-elles en sécurité lorsque nous utilisons l'IA ?",
        a: "Cela dépend de la façon dont l'application est configurée, et c'est pourquoi nous réglons la question dès la conception. Nous utilisons les API professionnelles des fournisseurs, soumises à leurs conditions relatives aux données, plutôt que les applications grand public ; nous limitons ce qui est envoyé au modèle à ce que la tâche exige ; nous appliquons les droits des utilisateurs à la récupération, pour que chacun ne voie que ce qu'il est autorisé à voir ; et nous pouvons recourir à des modèles hébergés de façon privée lorsque les données ne doivent pas quitter votre environnement.",
      },
      {
        q: "Pouvez-vous ajouter de l'IA à notre site web, notre application ou notre logiciel existant ?",
        a: "Oui. La plupart des projets ajoutent de l'IA à quelque chose qui existe déjà. Nous nous connectons via vos API ou votre base de données actuelles, construisons le composant IA comme un service distinct et ajoutons l'interface là où vos utilisateurs travaillent déjà, de sorte que le reste de votre produit demeure inchangé.",
      },
      {
        q: "Combien coûte le développement d'une application IA ?",
        a: "Le coût de développement dépend du nombre de cas d'usage, de la quantité de contenu à préparer, des intégrations requises et du niveau de tests qu'exige votre secteur. Il existe aussi un coût d'exploitation lié à l'utilisation du modèle, qui augmente avec le nombre de requêtes. TDM cadre le projet lors d'une consultation gratuite et vous remet un devis pour le développement, accompagné d'une estimation des coûts d'utilisation récurrents.",
      },
    ],
  },
  {
    slug: "mcp-development",
    sector: "ai",
    name: "Développement MCP",
    navLabel: "Développement MCP",
    shortDesc:
      "Serveurs et connecteurs Model Context Protocol qui permettent aux assistants IA de consulter votre CRM, vos bases de données et vos outils internes et d'y agir, avec des accès que vous maîtrisez.",
    metaTitle: "Développement MCP : serveurs et connecteurs MCP | TDM",
    metaDescription:
      "TDM crée des serveurs et connecteurs Model Context Protocol (MCP) pour que les assistants IA consultent et utilisent vos CRM, bases et outils, de façon sûre.",
    hero: {
      headline: "Connectez les assistants IA aux systèmes qui font tourner votre entreprise.",
      sub: "TDM développe des serveurs et des connecteurs MCP qui donnent à des assistants comme Claude et ChatGPT un accès contrôlé à votre CRM, à vos bases de données et à vos outils internes.",
    },
    intro: [
      "Le service de développement MCP de TDM réalise des serveurs et des connecteurs Model Context Protocol : les logiciels qui permettent à un assistant IA de rechercher des informations dans les systèmes de votre entreprise et d'y exécuter des tâches. Il s'adresse aux entreprises dont les équipes utilisent déjà des assistants IA et veulent les faire travailler sur les données réelles de l'entreprise, ainsi qu'aux éditeurs de logiciels qui souhaitent que leur propre produit soit utilisable depuis ces assistants.",
      "Le Model Context Protocol, ou MCP, est un standard ouvert pour connecter les assistants IA à des systèmes extérieurs. En clair, il fonctionne comme une prise universelle. Sans lui, un assistant ne connaît que ce que vous collez dans la conversation. Avec un serveur MCP en place, un collaborateur peut demander à l'assistant de retrouver les commandes en cours d'un client, de résumer les tickets de support de la semaine ou de créer une tâche de suivi, et l'assistant va chercher ou met à jour cette information dans le système réel.",
      "La valeur d'un connecteur tient à ce qu'il est autorisé à faire. Nous concevons chaque serveur MCP autour d'une courte liste d'actions clairement définies, rattachons chaque requête aux droits de la personne qui la formule et conservons une trace de ce que l'assistant a fait. Votre équipe dispose d'un assistant capable d'accomplir un travail utile, et vous gardez la maîtrise de ce qu'il peut voir et modifier.",
    ],
    features: [
      {
        title: "Serveurs MCP sur mesure",
        desc: "Des serveurs écrits avec les SDK MCP officiels, qui exposent vos systèmes aux assistants IA sous forme d'outils, de ressources et de prompts, conçus pour un hébergement distant ou pour un usage local sur les postes des collaborateurs.",
      },
      {
        title: "Connecteurs pour CRM, bases de données et outils internes",
        desc: "Connexions à des plateformes telles que HubSpot, Salesforce et GoHighLevel, aux bases de données SQL, aux ERP et aux systèmes de tickets, aux espaces de stockage de fichiers et aux logiciels sur mesure que votre entreprise a développés.",
      },
      {
        title: "Authentification et droits d'accès",
        desc: "Connexion OAuth, périmètres d'accès par utilisateur et modes lecture seule ou lecture-écriture, pour que l'assistant n'atteigne que ce que la personne qui l'utilise est déjà autorisée à atteindre.",
      },
      {
        title: "Conception d'outils pour un usage fiable",
        desc: "Noms d'outils, descriptions, schémas d'entrée et messages d'erreur clairs, car un assistant n'utilise correctement un connecteur que si chaque outil indique exactement ce qu'il fait.",
      },
      {
        title: "Étapes de validation et journaux d'audit",
        desc: "Confirmation avant les actions sensibles telles que l'envoi, la suppression ou le paiement, ainsi qu'un journal de chaque appel effectué par l'assistant, conservé pour contrôle.",
      },
      {
        title: "Hébergement, documentation et maintenance",
        desc: "Déploiement sur votre cloud ou sur le nôtre, instructions de configuration pour chaque assistant utilisé par votre équipe, et mises à jour lorsque vos systèmes ou la spécification MCP évoluent.",
      },
    ],
    process: [
      {
        title: "Cartographier les tâches",
        desc: "Nous dressons la liste de ce que votre équipe veut demander à un assistant, des systèmes qui détiennent l'information et des actions qui doivent rester interdites.",
      },
      {
        title: "Concevoir les outils et les accès",
        desc: "Nous spécifions chaque outil que le serveur proposera, les données qu'il renvoie, qui peut l'appeler et quelles actions nécessitent la confirmation d'une personne.",
      },
      {
        title: "Développer le serveur",
        desc: "Nous développons le serveur MCP à partir des API ou des bases de données de vos systèmes, avec authentification, limites de débit et gestion des erreurs incluses.",
      },
      {
        title: "Tester avec de vrais assistants",
        desc: "Nous connectons le serveur aux assistants que vous utilisez et lançons des requêtes réalistes, en vérifiant que le bon outil est choisi, que les résultats sont corrects et que les droits d'accès tiennent.",
      },
      {
        title: "Déployer et transmettre",
        desc: "Nous hébergeons le serveur, le déployons auprès de vos utilisateurs, documentons son fonctionnement et restons disponibles pour les évolutions à mesure que vos besoins grandissent.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que le MCP (Model Context Protocol) ?",
        a: "Le MCP est un standard ouvert, introduit par Anthropic et désormais pris en charge par plusieurs fournisseurs d'IA, qui définit la façon dont un assistant IA se connecte à des systèmes externes. Un serveur MCP se place devant un système tel que votre CRM et décrit à l'assistant ce qu'il peut y consulter et ce qu'il peut y faire. L'assistant utilise ensuite ces capacités au cours d'une conversation, au lieu de s'appuyer uniquement sur ce que l'utilisateur saisit.",
      },
      {
        q: "À quoi sert un serveur MCP dans une entreprise ?",
        a: "Il permet aux collaborateurs de travailler avec les systèmes de l'entreprise par l'intermédiaire d'un assistant IA. Les usages types : consulter des fiches clients, interroger les chiffres de ventes ou de stock, rechercher dans les documents internes, rédiger et consigner des réponses, créer des tâches et mettre à jour des fiches. Les éditeurs de logiciels publient aussi des serveurs MCP pour que leurs clients puissent utiliser le produit depuis un assistant.",
      },
      {
        q: "Est-il sûr de donner à un assistant IA l'accès à nos systèmes ?",
        a: "C'est aussi sûr que le connecteur est strict. Nous construisons des serveurs qui n'exposent que les actions précises que vous approuvez, appliquent les droits existants de chaque utilisateur, exigent une confirmation pour les actions qui modifient ou envoient quoi que ce soit d'important et journalisent chaque appel. Nous recommandons aussi de commencer par un accès en lecture seule et d'ajouter les actions d'écriture une fois l'équipe à l'aise.",
      },
      {
        q: "Quels assistants IA fonctionnent avec les serveurs MCP ?",
        a: "Le MCP est pris en charge par Claude et par un nombre croissant d'autres assistants et outils de développement IA, dont ChatGPT. La prise en charge diffère selon les produits et les formules et évolue avec le temps ; nous confirmons donc dès le départ quels assistants votre équipe utilise et testons le serveur avec chacun d'eux.",
      },
      {
        q: "Avons-nous besoin du MCP si notre logiciel dispose déjà d'une API ?",
        a: "Une API est écrite pour des programmeurs, tandis qu'un serveur MCP présente les mêmes capacités sous une forme qu'un assistant IA peut découvrir et utiliser de lui-même. Si votre système a une API, le serveur MCP est généralement une couche construite par-dessus. S'il n'en a pas, nous pouvons nous connecter via la base de données ou développer les points d'accès manquants.",
      },
      {
        q: "Combien coûte le développement d'un serveur MCP ?",
        a: "Le coût dépend du nombre de systèmes connectés, du nombre d'outils que propose le serveur, de l'état des API existantes et des exigences de sécurité. Un connecteur en lecture seule vers un seul système bien documenté représente un chantier bien plus modeste qu'un serveur qui écrit dans plusieurs systèmes. Nous établissons un devis après avoir examiné vos systèmes lors d'une consultation gratuite.",
      },
    ],
  },
  {
    slug: "ai-automation",
    sector: "ai",
    name: "Automatisation par l'IA",
    navLabel: "Automatisation IA",
    shortDesc:
      "Agents IA et automatisations qui prennent en charge le travail intellectuel répétitif, comme la qualification des leads, le tri du support, le traitement des documents et le reporting, avec un contrôle humain là où il compte.",
    metaTitle: "Automatisation IA : agents IA pour l'entreprise | TDM",
    metaDescription:
      "TDM crée des agents IA pour le travail intellectuel répétitif : qualification des leads, tri du support, documents et reporting, avec contrôle humain si besoin.",
    hero: {
      headline: "Des agents IA pour le travail répétitif que votre équipe ne devrait pas faire.",
      sub: "Qualification des leads, tri du support, traitement des documents et reporting, assurés par des agents IA que TDM construit, vos collaborateurs contrôlant les décisions qui comptent.",
    },
    intro: [
      "Le service d'automatisation par l'IA de TDM construit des agents IA et des automatisations qui accomplissent le travail intellectuel répétitif d'une entreprise : lire les messages entrants, les trier et y répondre, extraire des informations de documents, mettre à jour des fiches et préparer des rapports. Il s'adresse aux entreprises où des collaborateurs qualifiés passent une grande partie de leur journée à lire, recopier et répondre de manière routinière, selon un schéma récurrent.",
      "L'automatisation traditionnelle suit des règles fixes et s'arrête dès que les données en entrée sont désordonnées. Un agent IA peut lire un e-mail rédigé dans n'importe quel style, comprendre une facture scannée ou décider laquelle de plusieurs étapes suivantes s'applique. Il devient ainsi possible d'automatiser un travail qui exigeait jusque-là qu'une personne lise et juge, à condition de donner à l'agent des instructions claires, les bons outils et des limites fermes.",
      "Nous ne confions pas tout le processus à un agent en espérant que tout se passe bien. Chaque automatisation est découpée en étapes : l'agent traite le volume courant et une personne valide tout ce qui est coûteux, sensible ou incertain. Chaque action est journalisée, pour que vous puissiez vérifier ce qui a été fait et pourquoi, et ajuster les règles à mesure que vous découvrez où l'on peut confier davantage à l'agent.",
    ],
    features: [
      {
        title: "Qualification et suivi des leads",
        desc: "Des agents qui répondent aux nouvelles demandes, posent les questions de qualification, notent et orientent le lead, fixent le rendez-vous et rédigent le résumé dans votre CRM.",
      },
      {
        title: "Tri du support et projets de réponse",
        desc: "Tickets, e-mails et chats entrants classés par sujet et par urgence, traités à partir de votre base de connaissances lorsque la réponse est connue et transmis à la bonne personne lorsqu'elle ne l'est pas.",
      },
      {
        title: "Traitement des documents",
        desc: "Factures, contrats, formulaires, CV et pièces d'identité lus par OCR et modèles de langage, champs clés extraits, vérifiés au regard de vos règles et saisis dans vos systèmes.",
      },
      {
        title: "Reporting et recherche",
        desc: "Des agents qui collectent les chiffres dans vos outils, compilent les rapports récurrents, résument les appels et les réunions, et surveillent les sources que vous désignez pour repérer les changements qui méritent d'être connus.",
      },
      {
        title: "Contrôle humain et validations",
        desc: "Files de validation, seuils de confiance et règles d'escalade qui placent une personne devant les remboursements, les paiements, les formulations juridiques et tout cas sur lequel l'agent a un doute.",
      },
      {
        title: "Supervision et piste d'audit",
        desc: "Journaux de chaque exécution, alertes en cas d'échec, contrôles d'exactitude sur échantillons et suivi des coûts d'utilisation, pour que l'automatisation reste visible après sa mise en service.",
      },
    ],
    process: [
      {
        title: "Analyse du processus",
        desc: "Nous nous installons aux côtés des personnes qui font le travail, cartographions chaque étape et identifions les tâches assez fréquentes et assez régies par des règles pour être automatisées en premier.",
      },
      {
        title: "Conception de l'agent",
        desc: "Nous définissons ce que l'agent lit, les outils qu'il peut utiliser, ce qu'il ne doit jamais faire et les points où une personne donne son accord.",
      },
      {
        title: "Développement et connexion",
        desc: "Nous construisons l'agent et le relions à votre boîte de réception, à votre CRM, à votre outil de support, à votre espace documentaire et à vos autres outils via leurs API.",
      },
      {
        title: "Pilote supervisé",
        desc: "L'agent travaille sur des cas réels, chaque résultat étant relu par votre équipe, et nous corrigeons ses instructions à partir des cas où il se trompe.",
      },
      {
        title: "Déploiement et ajustement",
        desc: "Nous élargissons les responsabilités de l'agent par étapes, continuons de mesurer son exactitude et l'affinons à mesure que votre processus évolue.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que l'automatisation par l'IA ?",
        a: "L'automatisation par l'IA utilise des modèles de langage pour accomplir des tâches qui impliquent de lire, de comprendre et de décider, et pas seulement de déplacer des données d'un champ à un autre. Un agent IA peut interpréter un e-mail en texte libre, extraire des chiffres d'un document ou choisir l'étape suivante d'un processus, puis agir au moyen des outils qui lui ont été confiés. Elle étend l'automatisation à un travail jusque-là trop varié pour des règles fixes.",
      },
      {
        q: "Quelle est la différence entre l'automatisation par l'IA et l'automatisation des workflows ?",
        a: "L'automatisation des workflows exécute une séquence définie : quand ceci se produit, faire cela. Elle convient aux tâches prévisibles et structurées. L'automatisation par l'IA ajoute du discernement à la séquence et peut donc traiter des données non structurées, comme des messages, des documents et des notes vocales. En pratique, les deux se combinent : un workflow déplace les données et une étape IA traite la partie qui demande de la compréhension.",
      },
      {
        q: "Quelles tâches d'entreprise se prêtent aux agents IA ?",
        a: "Les bonnes candidates sont volumineuses, suivent un schéma reconnaissable et ont un coût faible lorsqu'une erreur est rattrapée par le contrôle. Exemples courants : qualifier des leads, trier les demandes de support et y répondre, traiter des factures et des formulaires, présélectionner des candidatures, préparer des rapports et tenir à jour les fiches du CRM. Pour les tâches aux conséquences juridiques, financières ou de sécurité graves, la décision finale doit rester entre les mains d'une personne.",
      },
      {
        q: "Les agents IA vont-ils remplacer mes collaborateurs ?",
        a: "L'objectif est de supprimer le travail routinier, pas les personnes. Les agents prennent en charge la lecture, le tri et la saisie de données répétitifs, et vos collaborateurs gèrent les exceptions, les relations et les décisions. L'usage que vous faites du temps ainsi libéré est un choix d'entreprise qui vous appartient. Un agent a toujours besoin de quelqu'un qui soit responsable du processus et qui contrôle ce qu'il produit.",
      },
      {
        q: "Comment empêchez-vous un agent IA de commettre des erreurs coûteuses ?",
        a: "Nous limitons ce qu'il peut faire. L'agent ne dispose que des outils que la tâche exige, les actions sensibles attendent une validation humaine, les cas à faible niveau de confiance sont escaladés et chaque exécution est enregistrée. Nous commençons par un pilote supervisé au cours duquel tous les résultats sont vérifiés, et nous n'étendons l'autonomie de l'agent que là où ses résultats le justifient. Aucune configuration n'élimine totalement les erreurs, et c'est pourquoi les étapes de contrôle restent en place.",
      },
      {
        q: "Comment l'automatisation par l'IA est-elle tarifée ?",
        a: "Le prix reflète le nombre de processus automatisés, les systèmes à connecter, le volume de travail et l'ampleur du contrôle et des tests nécessaires. Les coûts d'exploitation comprennent l'utilisation des modèles et les éventuels frais de plateforme. Après une consultation gratuite et un examen de votre processus actuel, TDM vous adresse un devis qui distingue le développement des coûts récurrents.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    sector: "ai",
    name: "Automatisation des workflows",
    navLabel: "Automatisation des workflows",
    shortDesc:
      "Vos outils connectés et vos processus courants automatisés avec n8n, Make.com, Zapier et GoHighLevel, pour que les données circulent entre vos systèmes sans recopie manuelle.",
    metaTitle: "Automatisation workflows : n8n, Make, Zapier, GHL | TDM",
    metaDescription:
      "TDM connecte vos outils et automatise vos processus avec n8n, Make.com, Zapier et GoHighLevel : routage des leads, relances, facturation, reporting et plus.",
    hero: {
      headline: "Vos outils connectés. Vos processus courants qui tournent tout seuls.",
      sub: "TDM conçoit et réalise des automatisations dans n8n, Make.com, Zapier et GoHighLevel pour que l'information circule entre vos systèmes sans que personne ait à la ressaisir.",
    },
    intro: [
      "Le service d'automatisation des workflows de TDM connecte les logiciels qu'une entreprise utilise déjà et automatise les étapes qui les séparent, à l'aide de n8n, Make.com, Zapier et GoHighLevel. Il s'adresse aux entreprises dont les collaborateurs recopient à la main des données des formulaires vers des tableurs puis vers des CRM, font leurs relances de mémoire ou perdent des leads dans les interstices entre les outils.",
      "Un workflow est un enchaînement d'étapes déclenché par un événement : un formulaire est envoyé, un paiement arrive, une affaire change d'étape. L'automatisation fait alors ce qu'une personne ferait autrement : créer le contact, envoyer la confirmation, prévenir le commercial, émettre la facture et mettre à jour le rapport. Bien construite, elle s'exécute à chaque fois, dans le même ordre, à toute heure.",
      "Les quatre plateformes conviennent à des situations différentes, et une partie de notre travail consiste à choisir entre elles. Zapier est la voie la plus rapide pour des liaisons simples entre applications répandues. Make.com gère les scénarios à embranchements et à étapes multiples, avec davantage de contrôle sur les données. n8n peut être hébergé sur votre propre serveur, ce qui convient aux gros volumes, à la logique sur mesure et aux exigences plus strictes en matière de données. GoHighLevel est une plateforme CRM et marketing avec automatisation intégrée, très bien adaptée aux pipelines de vente, à la prise de rendez-vous et aux relances par e-mail, SMS et WhatsApp.",
    ],
    features: [
      {
        title: "Cartographie des processus et plan d'automatisation",
        desc: "Votre processus actuel documenté étape par étape, avec le travail manuel, les délais et les doubles saisies repérés, et une liste hiérarchisée de ce qu'il faut automatiser.",
      },
      {
        title: "Workflows n8n",
        desc: "Installations n8n auto-hébergées ou cloud pour la logique complexe, les étapes de code sur mesure, les gros volumes et les cas où vous voulez garder vos données et vos identifiants sur une infrastructure que vous contrôlez.",
      },
      {
        title: "Automatisations Make.com et Zapier",
        desc: "Scénarios et Zaps qui relient vos formulaires, votre CRM, vos e-mails, vos tableurs, votre comptabilité, votre e-commerce et vos applications de messagerie, avec filtres, routeurs et mise en forme des données correctement configurés.",
      },
      {
        title: "Configuration et automatisation GoHighLevel",
        desc: "Pipelines, calendriers, formulaires, tunnels de vente et workflows configurés dans GoHighLevel : capture de leads, réponses instantanées, séquences de nurturing, rappels et demandes d'avis.",
      },
      {
        title: "Intégrations sur mesure",
        desc: "Connexions par API et webhooks pour les outils qui n'ont pas de connecteur prêt à l'emploi, y compris les systèmes internes, afin qu'aucun élément de votre environnement ne reste en dehors du flux.",
      },
      {
        title: "Gestion des erreurs, documentation et support",
        desc: "Nouvelles tentatives, alertes en cas d'échec et journaux d'exécution sur chaque workflow, documentation écrite de ce que fait chacun, et maintenance lorsqu'une application modifie son API.",
      },
    ],
    process: [
      {
        title: "Audit",
        desc: "Nous passons en revue vos outils et retraçons la façon dont le travail circule aujourd'hui de l'un à l'autre, en notant où du temps se perd et où les erreurs s'introduisent.",
      },
      {
        title: "Choix de la plateforme et conception",
        desc: "Nous retenons la plateforme adaptée à votre volume, à votre budget et à votre aisance technique, puis nous schématisons chaque workflow avec ses déclencheurs, ses conditions et ses résultats, pour validation de votre part.",
      },
      {
        title: "Réalisation",
        desc: "Nous créons les workflows dans vos propres comptes, pour qu'ils vous appartiennent, et connectons chaque application avec le minimum d'accès nécessaire.",
      },
      {
        title: "Tests",
        desc: "Nous exécutons chaque chemin avec de vraies données d'exemple, y compris les cas délicats : champs manquants, doublons, paiements échoués et services indisponibles.",
      },
      {
        title: "Mise en service et maintenance",
        desc: "Nous activons les workflows, surveillons les premières exécutions, formons votre équipe à lire les journaux et à faire des modifications simples, et restons disponibles pour les évolutions.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que l'automatisation des workflows ?",
        a: "L'automatisation des workflows consiste à utiliser un logiciel pour exécuter un processus métier répétable sans étapes manuelles. Un événement dans un outil déclenche des actions dans d'autres : un nouveau lead est ajouté au CRM, attribué à un commercial, reçoit un message de bienvenue et est consigné dans un rapport. Elle supprime les ressaisies, raccourcit les délais de réponse et garantit qu'aucune étape n'est oubliée.",
      },
      {
        q: "Dois-je utiliser n8n, Make.com ou Zapier ?",
        a: "Zapier est le plus facile à prendre en main et se connecte au plus large éventail d'applications ; il convient donc aux automatisations simples et aux équipes non techniques. Make.com est plus à l'aise avec les embranchements complexes et la transformation de données, et offre un contrôle plus fin sur chaque étape. n8n est le plus flexible, peut tourner sur votre propre serveur et convient aux équipes techniques, aux usages intensifs ou aux données sensibles. De nombreuses entreprises en utilisent plusieurs, et notre recommandation se fonde sur vos processus, pas sur une préférence de notre part.",
      },
      {
        q: "Qu'est-ce que GoHighLevel et quand est-ce pertinent ?",
        a: "GoHighLevel est une plateforme tout-en-un de vente et de marketing qui réunit un CRM, des pipelines, des calendriers, des formulaires, des tunnels de vente, l'e-mail, le SMS et son propre outil de création de workflows. Elle est pertinente pour les entreprises de services et les agences qui veulent la capture de leads, les relances et la prise de rendez-vous au même endroit plutôt que dans plusieurs outils distincts. Si vous exploitez déjà un CRM bien établi, le connecter avec n8n, Make.com ou Zapier est souvent la meilleure voie.",
      },
      {
        q: "Pouvez-vous automatiser des outils qui ne s'intègrent pas entre eux ?",
        a: "En général, oui. Si les deux outils disposent d'une API ou peuvent envoyer et recevoir des webhooks, nous pouvons les connecter via l'une des plateformes d'automatisation, même en l'absence de connecteur officiel. Lorsqu'un outil n'offre ni l'un ni l'autre, nous étudions des alternatives comme l'analyse d'e-mails, les exports de fichiers ou une connexion à la base de données, et nous vous disons clairement si une liaison fiable n'est pas possible.",
      },
      {
        q: "À qui appartiennent les automatisations une fois construites ?",
        a: "À vous. Nous travaillons dans des comptes enregistrés au nom de votre entreprise, vous remettons la documentation et montrons à votre équipe comment fonctionne chaque workflow. Vous pouvez les exploiter vous-même, nous en confier la maintenance ou les transmettre à un autre développeur.",
      },
      {
        q: "Qu'est-ce qui influence le coût de l'automatisation des workflows ?",
        a: "Les principaux facteurs sont le nombre de workflows dont vous avez besoin, le nombre d'étapes et de conditions que chacun contient, la nécessité ou non d'intégrations sur mesure et la propreté des données existantes. Les plateformes facturent en outre leurs propres abonnements, qui varient selon l'usage. Nous détaillons ces deux volets dans un devis établi à la suite d'une consultation gratuite.",
      },
    ],
  },
  {
    slug: "ai-data-systems",
    sector: "ai",
    name: "IA et systèmes de données",
    navLabel: "IA et données",
    shortDesc:
      "Les fondations de données dont dépend l'IA : pipelines, entrepôt central, données propres et cohérentes, tableaux de bord, et applications IA construites par-dessus.",
    metaTitle: "IA et données : pipelines et tableaux de bord | TDM",
    metaDescription:
      "TDM construit les fondations de données dont l'IA a besoin : pipelines, entrepôts de données, données propres et cohérentes, tableaux de bord et analyse IA.",
    hero: {
      headline: "Mettez vos données en ordre, puis faites-y travailler l'IA.",
      sub: "Pipelines, entrepôt central, données nettoyées et tableaux de bord sur lesquels votre équipe peut compter, avec des analyses et des assistants IA construits sur ce socle.",
    },
    intro: [
      "Le service IA et systèmes de données de TDM construit l'infrastructure de données dont une entreprise a besoin avant que l'IA puisse être utile : des pipelines qui collectent les données de chaque outil, un entrepôt qui les stocke en un seul endroit, un nettoyage et une modélisation qui les rendent cohérentes, des tableaux de bord qui en rendent compte, et des applications IA qui s'appuient dessus. Il s'adresse aux entreprises dont l'information est dispersée entre un CRM, une boutique en ligne, des comptes publicitaires, un logiciel de comptabilité et des tableurs, sans version unique des chiffres.",
      "Les réponses de l'IA ne valent que ce que valent les données sur lesquelles elle s'appuie. Si les fiches clients sont en double, si les noms de produits diffèrent d'un système à l'autre et si les chiffres de vente se contredisent d'un rapport au suivant, un assistant IA répétera ces erreurs avec aplomb. C'est en corrigeant d'abord les fondations que l'on rend fiables les projets IA qui suivent.",
      "Nous construisons avec des outils éprouvés : des entrepôts cloud comme BigQuery, Snowflake et PostgreSQL, des outils d'ingestion comme Airbyte et Fivetran, dbt pour la transformation, et Looker Studio, Power BI ou Metabase pour le reporting. L'ensemble est dimensionné pour votre entreprise : une petite structure obtient une installation simple et peu exigeante en maintenance, et non une plateforme de grande entreprise pour laquelle elle devrait recruter une équipe.",
    ],
    features: [
      {
        title: "Pipelines de données",
        desc: "Extraction automatisée et planifiée depuis votre CRM, votre plateforme e-commerce, vos comptes publicitaires, vos outils d'analytics et de finance et vos bases de données vers une destination unique, avec détection et signalement des échecs.",
      },
      {
        title: "Mise en place de l'entrepôt de données",
        desc: "Un entrepôt central conçu autour de votre activité : schémas, rôles d'accès, maîtrise des coûts et sauvegardes, hébergé dans le compte cloud et la région de votre choix.",
      },
      {
        title: "Nettoyage et modélisation",
        desc: "Dédoublonnage, nommage standardisé, rapprochement des clients et des produits entre systèmes et définitions convenues pour chaque indicateur, le tout documenté et versionné.",
      },
      {
        title: "Tableaux de bord et reporting",
        desc: "Des tableaux de bord pour la direction, les ventes, le marketing et les opérations, qui s'actualisent automatiquement et tirent chaque chiffre des mêmes tables modélisées.",
      },
      {
        title: "L'IA sur vos données",
        desc: "Réponses à des questions en langage naturel à partir de l'entrepôt, synthèses écrites automatiques de la performance, prévisions, segmentation des clients et alertes d'anomalies.",
      },
      {
        title: "Gouvernance et qualité des données",
        desc: "Tests automatisés sur les données entrantes, droits d'accès par rôle, règles de traitement des données personnelles et traçabilité de l'origine de chaque chiffre.",
      },
    ],
    process: [
      {
        title: "Audit des données",
        desc: "Nous recensons chaque source, évaluons son degré de complétude et de cohérence et consignons les questions métier auxquelles les données doivent pouvoir répondre.",
      },
      {
        title: "Architecture",
        desc: "Nous sélectionnons les outils d'entrepôt, d'ingestion et de reporting, concevons le modèle de données et estimons ce que la plateforme coûtera à exploiter.",
      },
      {
        title: "Pipelines et entrepôt",
        desc: "Nous connectons les sources, chargeons l'historique et construisons la couche de transformation qui convertit les enregistrements bruts en tables propres et définies.",
      },
      {
        title: "Tableaux de bord et couche IA",
        desc: "Nous réalisons les rapports dont chaque équipe a besoin et ajoutons les fonctionnalités IA, en vérifiant les résultats par rapport à des chiffres auxquels vous vous fiez déjà.",
      },
      {
        title: "Transmission et supervision",
        desc: "Nous documentons le système, formons votre équipe à son utilisation, mettons en place des alertes de qualité et l'étendons à mesure que de nouvelles sources et de nouvelles questions apparaissent.",
      },
    ],
    faqs: [
      {
        q: "Pourquoi l'IA a-t-elle besoin de données propres ?",
        a: "Un modèle d'IA travaille avec ce qu'on lui donne. Si les enregistrements sous-jacents contiennent des doublons, des lacunes ou des définitions contradictoires, ses analyses et ses réponses seront fausses tout en paraissant sûres. Des données propres et bien structurées sont le principal facteur qui détermine si un projet IA d'entreprise produit des résultats sur lesquels on peut agir.",
      },
      {
        q: "Qu'est-ce qu'un entrepôt de données, et une petite entreprise en a-t-elle besoin ?",
        a: "Un entrepôt de données est une base de données conçue pour l'analyse, qui regroupe en un seul endroit les données de tous vos systèmes. Une entreprise en a besoin lorsqu'elle établit ses rapports à partir de plusieurs outils et que les chiffres ne concordent plus, ou lorsqu'elle veut que l'IA travaille sur l'ensemble de ses données. Pour une petite entreprise, il peut s'agir d'une installation modeste et peu coûteuse, et nous vous le disons si une approche plus simple vous suffit pour l'instant.",
      },
      {
        q: "Qu'est-ce qu'un pipeline de données ?",
        a: "Un pipeline de données est un processus automatisé qui copie les données d'un système source vers une destination selon un calendrier, puis les nettoie et les restructure pour qu'elles soient exploitables. Il remplace les exports manuels et les imports dans des tableurs, de sorte que les rapports et les outils IA travaillent toujours sur des données à jour.",
      },
      {
        q: "Pouvons-nous interroger nos données en langage courant ?",
        a: "Oui, une fois les données modélisées. Nous construisons des assistants qui transforment une question, par exemple quels produits ont vu leurs ventes baisser le mois dernier, en requête sur l'entrepôt et renvoient la réponse avec les chiffres qui la sous-tendent. L'exactitude dépend de définitions d'indicateurs claires ; cette couche vient donc après le travail de modélisation, et nous la testons sur des résultats connus avant que votre équipe ne s'y fie.",
      },
      {
        q: "Avec quels outils et plateformes de données TDM travaille-t-elle ?",
        a: "Nous travaillons avec BigQuery, Snowflake, Amazon Redshift et PostgreSQL pour le stockage, Airbyte, Fivetran et des traitements Python sur mesure pour l'ingestion, dbt pour la transformation, et Looker Studio, Power BI, Tableau et Metabase pour les tableaux de bord. Si vous utilisez déjà un outil, nous construisons normalement dessus au lieu de le remplacer.",
      },
      {
        q: "Comment tarifez-vous un projet de données et d'IA ?",
        a: "Le tarif dépend du nombre de sources de données, de l'état des données, du nombre de tableaux de bord et des fonctionnalités IA requises. Le stockage cloud et les abonnements aux outils sont facturés par leurs fournisseurs et évoluent avec le volume. TDM examine votre installation lors d'une consultation gratuite, puis vous remet un devis et une estimation de ces coûts de plateforme.",
      },
    ],
  },
  {
    slug: "founder-ai-systems",
    sector: "ai",
    name: "Systèmes IA pour fondateurs",
    navLabel: "IA pour fondateurs",
    shortDesc:
      "Une mission unique, sur site : TDM se rend dans vos locaux, met en place un ensemble complet de systèmes IA autour de votre façon de diriger votre entreprise et vous forme à les gérer vous-même.",
    metaTitle: "Systèmes IA pour fondateurs : mission sur site | TDM",
    metaDescription:
      "Une mission unique dans vos locaux : TDM installe des systèmes IA adaptés à votre façon de diriger et vous forme à les gérer vous-même. Sans forfait mensuel.",
    hero: {
      headline: "Vos systèmes IA, installés sur site une fois pour toutes et remis entre vos mains.",
      sub: "TDM se rend dans vos locaux, construit des systèmes IA autour de votre façon de diriger votre entreprise et vous forme à les exploiter sans nous. Une seule mission. Aucun forfait mensuel.",
    },
    intro: [
      "Systèmes IA pour fondateurs est une mission unique, réalisée sur site, dans les locaux du fondateur. TDM conçoit et met en place un ensemble complet de systèmes IA autour de la façon dont vous dirigez personnellement votre entreprise, puis vous forme à tout gérer vous-même. Elle s'adresse aux fondateurs et aux dirigeants-propriétaires qui veulent que l'IA soit à l'œuvre dans leur journée, leur communication et leurs opérations, et qui veulent posséder et maîtriser le résultat plutôt que dépendre d'une agence.",
      "Il ne s'agit pas d'un forfait mensuel. Nous venons chez vous, réalisons le travail dans vos bureaux aux côtés de vous et de votre équipe, vous remettons tout, puis repartons. Les comptes, les configurations, les prompts et la documentation vous appartiennent. La mission est organisée de sorte qu'à son terme, vous puissiez exploiter, ajuster et étendre les systèmes sans appeler TDM.",
      "Être dans vos locaux, c'est tout l'intérêt. Nous voyons comment les décisions se prennent, où passe votre temps, ce qui arrive dans votre boîte de réception et quelles tâches vous seul pouvez accomplir. Les systèmes sont construits autour de cette réalité, à partir de vos documents et de vos outils réels, et la formation se fait sur l'installation que vous utiliserez dès le lendemain matin.",
    ],
    features: [
      {
        title: "Analyse sur site de votre façon de travailler",
        desc: "Du temps passé dans vos locaux à observer vos habitudes, vos outils et les passages de relais au sein de votre équipe, pour que les systèmes soient conçus pour votre entreprise et non à partir d'un modèle générique.",
      },
      {
        title: "Votre espace de travail IA personnel",
        desc: "Un assistant IA configuré avec les connaissances de votre entreprise, votre style d'écriture et vos consignes permanentes, avec des projets et des prompts enregistrés pour les tâches que vous répétez.",
      },
      {
        title: "Des systèmes pour la charge de travail du fondateur",
        desc: "L'appui de l'IA pour les e-mails et les messages, les comptes rendus de réunion et les actions à mener, les propositions et les documents, la recherche, le recrutement et les rapports réguliers que vous passez en revue.",
      },
      {
        title: "Connexions à vos outils métier",
        desc: "Votre assistant et vos automatisations reliés au CRM, à l'agenda, aux fichiers et aux outils de communication que vous utilisez déjà, configurés dans des comptes qui vous appartiennent.",
      },
      {
        title: "Formation pratique pour vous et votre équipe",
        desc: "Des séances pratiques sur votre propre installation : comment utiliser chaque système, comment rédiger de bonnes instructions, comment vérifier ce que produit l'IA et comment modifier les choses en toute sécurité.",
      },
      {
        title: "Transmission complète",
        desc: "Documentation écrite, bibliothèque de vos prompts et de vos workflows, tous les identifiants et droits d'administration transférés à votre nom, et un guide clair pour maintenir les systèmes vous-même.",
      },
    ],
    process: [
      {
        title: "Consultation et préparation",
        desc: "Avant de nous déplacer, nous échangeons sur votre entreprise, vos outils et vos priorités, convenons du périmètre et organisons les accès dont nous aurons besoin à notre arrivée.",
      },
      {
        title: "Découverte sur site",
        desc: "Dans vos locaux, nous passons en revue votre journée de travail, vos tâches récurrentes et les processus de votre équipe, et convenons des systèmes à construire.",
      },
      {
        title: "Mise en place et configuration",
        desc: "Nous installons les systèmes sur site, dans vos propres comptes, à partir de vos données réelles, et les ajustons avec vous à mesure que vous essayez chacun d'eux.",
      },
      {
        title: "Formation",
        desc: "Nous vous formons, ainsi que les membres de l'équipe que vous désignez, jusqu'à ce que vous puissiez exploiter, modifier et étendre chaque système sans aide.",
      },
      {
        title: "Transmission et départ",
        desc: "Nous remettons la documentation et les identifiants, vérifions que vous faites tout fonctionner vous-même et clôturons la mission.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que Systèmes IA pour fondateurs ?",
        a: "C'est une mission unique au cours de laquelle TDM se rend dans les locaux d'un fondateur, conçoit des systèmes IA autour de la façon dont ce fondateur dirige l'entreprise, les met en place et forme le fondateur à les gérer. Elle couvre la charge de travail propre au fondateur et les processus essentiels qui l'entourent. Le résultat est un ensemble opérationnel de systèmes IA que vous possédez et exploitez vous-même.",
      },
      {
        q: "S'agit-il d'un forfait mensuel ou d'un contrat continu ?",
        a: "Non. C'est une mission ponctuelle, avec un périmètre défini et une fin définie. Une fois les systèmes en place, la formation achevée et la transmission effectuée, le travail est terminé et aucun frais récurrent n'est dû à TDM. Vous continuerez de payer directement les fournisseurs d'IA et de logiciels pour les abonnements que vous utilisez.",
      },
      {
        q: "Pourquoi le travail est-il réalisé dans nos locaux et non à distance ?",
        a: "Parce que les systèmes sont construits autour de votre façon réelle de travailler, et que celle-ci se voit mal en visioconférence. Sur site, nous pouvons observer vos habitudes, parler à votre équipe, travailler sur vos outils réels et vous former en personne sur l'installation finalisée. Cela nous permet aussi d'ajuster les choses immédiatement, à mesure que vous les testez.",
      },
      {
        q: "Serai-je capable de gérer moi-même les systèmes IA par la suite ?",
        a: "C'est l'objet même de la mission. Nous choisissons des outils qu'un fondateur non technique peut maintenir, évitons les configurations qui exigent un développeur pour être modifiées, vous formons sur votre propre configuration et vous laissons une documentation écrite. Si quelque chose est trop complexe pour que vous le gériez seul, nous le disons pendant la conception et nous le simplifions.",
      },
      {
        q: "Et si nous voulons davantage d'aide plus tard ?",
        a: "Vous n'êtes pas lié à nous, et la transmission est conçue pour que vous n'ayez pas besoin d'aide supplémentaire. Si vous souhaitez plus tard quelque chose de plus important, comme une application IA sur mesure ou une nouvelle automatisation, vous pouvez le commander à TDM dans le cadre d'un projet distinct, ou à n'importe qui d'autre, puisque vous détenez tous les comptes et toute la documentation.",
      },
      {
        q: "Combien de temps cela prend-il et combien cela coûte-t-il ?",
        a: "Les deux dépendent de la taille de votre entreprise, du nombre de systèmes que vous souhaitez, des outils concernés, du nombre de personnes à former et de l'emplacement de vos locaux. Nous ne publions pas de chiffre fixe, car le périmètre diffère pour chaque fondateur. TDM convient du périmètre avec vous lors d'une consultation gratuite, puis établit un devis pour l'ensemble de la mission.",
      },
    ],
  },
];

export const frAiSector: Sector = {
  slug: "ai",
  name: "IA & Automatisation",
  tagline: "L'IA et l'automatisation intégrées au fonctionnement de votre entreprise.",
  metaTitle: "IA & Automatisation : IA, MCP et workflows | TDM",
  metaDescription:
    "TDM crée des applications IA, connecteurs MCP, agents IA, workflows automatisés et systèmes de données, et une mission IA unique sur site pour fondateurs.",
  hero: {
    headline: "Une IA et une automatisation qui accomplissent un vrai travail dans votre entreprise.",
    sub: "Applications IA sur mesure, connecteurs MCP, agents IA, automatisation des workflows et systèmes de données : conçus, réalisés et transmis par TDM.",
  },
  intro: [
    "TDM IA & Automatisation conçoit et réalise les systèmes IA qu'une entreprise peut mettre concrètement à profit : applications et assistants sur mesure bâtis sur de grands modèles de langage, connecteurs Model Context Protocol qui relient les assistants aux systèmes de l'entreprise, agents IA pour le travail intellectuel répétitif, automatisation des workflows dans n8n, Make.com, Zapier et GoHighLevel, et les fondations de données dont tout cela dépend. Pour les fondateurs, nous proposons aussi une mission unique dans leurs locaux, qui met en place leurs systèmes IA et les forme à tout faire fonctionner eux-mêmes.",
    "Nous partons du processus, pas de la technologie. Chaque projet commence par ce que votre équipe fait aujourd'hui et par les endroits où du temps se perd, puis recourt à l'outil le plus simple qui résout le problème : parfois un workflow, parfois un agent IA, parfois une application complète. Tout est construit dans des comptes qui vous appartiennent, testé sur vos données réelles, documenté et livré avec un contrôle humain en place là où une mauvaise réponse coûterait cher.",
  ],
  faqs: [
    {
      q: "Quels services d'IA et d'automatisation TDM propose-t-elle ?",
      a: "TDM propose le développement IA (applications et assistants sur mesure bâtis sur de grands modèles de langage), le développement MCP (connecteurs entre les assistants IA et vos systèmes), l'automatisation par l'IA (agents pour le travail intellectuel répétitif), l'automatisation des workflows avec n8n, Make.com, Zapier et GoHighLevel, l'IA et les systèmes de données (pipelines, entrepôts et tableaux de bord), et Systèmes IA pour fondateurs, une mission unique de mise en place et de formation sur site.",
    },
    {
      q: "Par où une entreprise doit-elle commencer avec l'IA ?",
      a: "Commencez par un seul processus fréquent, répétitif et bien compris, comme répondre aux demandes courantes ou faire entrer les leads dans le CRM. Un premier projet de petite taille montre ce que l'IA peut et ne peut pas faire avec vos données et facilite la décision suivante. Lors d'une consultation gratuite, nous passons vos processus en revue et suggérons par où commencer, y compris lorsqu'une simple automatisation convient mieux que l'IA.",
    },
    {
      q: "Avons-nous besoin d'une équipe technique pour utiliser ce que TDM construit ?",
      a: "Non. Nous construisons pour les personnes qui utiliseront le système, documentons son fonctionnement et formons votre équipe lors de la transmission. Les modifications simples peuvent généralement être faites par un collaborateur non technique. Pour les systèmes plus importants, nous pouvons assurer la maintenance, mais dans tous les cas les comptes et le travail restent les vôtres.",
    },
    {
      q: "Combien coûtent les projets d'IA et d'automatisation ?",
      a: "Le coût dépend du périmètre : le nombre de processus, les systèmes à connecter, l'état de vos données et les tests requis. La plupart des projets entraînent aussi des coûts d'exploitation payés aux fournisseurs d'IA et de logiciels. TDM établit un devis pour la prestation après une consultation gratuite, en présentant ces coûts d'exploitation séparément.",
    },
  ],
};
