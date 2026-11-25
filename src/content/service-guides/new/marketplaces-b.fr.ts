import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "marketplaces/walmart-account-management": {
    title: "Ce qu'il faut savoir avant de confier la gestion de votre compte Walmart Marketplace",
    sections: [
      {
        heading: "Walmart Marketplace est-il le bon canal pour vous aujourd'hui ?",
        body: [
          "Walmart.com s'adresse aux acheteurs des États-Unis. Demandez-vous donc d'abord si vous pouvez livrer des clients américains dans des délais compétitifs et reprendre leurs retours. Si ce n'est pas le cas, réglez la logistique avant de payer qui que ce soit pour gérer un compte.",
          "Vérifiez ensuite votre marge. Walmart attend que votre prix soutienne la comparaison avec celui du même produit ailleurs en ligne, et sa commission sur les ventes varie selon la catégorie. Notre calculateur gratuit de rentabilité marketplace montre quels articles restent rentables à un prix que Walmart acceptera.",
        ],
      },
      {
        heading: "Ce qui détermine le coût de la gestion",
        body: ["Le tarif reflète la charge de travail que le compte génère chaque mois, et quelques éléments la fixent :"],
        bullets: [
          "Le nombre d'articles et de variantes, et la propreté de vos données produit.",
          "S'il s'agit d'une nouvelle candidature ou de la reprise d'un compte qui compte déjà des articles dépubliés et des erreurs.",
          "Le mode d'expédition des commandes : votre propre entrepôt, un fournisseur, Walmart Fulfillment Services, ou une combinaison.",
          "La façon dont le catalogue arrive chez Walmart : à la main, par tableur ou par un flux d'intégration.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "Avant la moindre mise en ligne, on vous demandera des documents et des données : informations légales et fiscales pour la candidature, identifiants produit tels que les GTIN, prix de revient, prix le plus bas que vous acceptez par article, niveaux de stock et règles d'expédition et de retour.",
          "Le travail passe ensuite de la configuration du compte à un premier lot d'articles prioritaires, puis au reste du catalogue, puis à la gestion quotidienne. La durée de chaque étape dépend de l'examen mené par Walmart, de la taille du catalogue et de la qualité de vos données : le calendrier est donc convenu dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Jugez le compte sur des chiffres que vous pouvez consulter vous-même dans Seller Center : le nombre d'articles publiés et achetables, la fréquence à laquelle votre offre remporte la Buy Box, et les ventes une fois les frais et l'expédition déduits.",
          "Méfiez-vous de quiconque promet l'approbation de Walmart, demande l'identifiant du propriétaire au lieu d'être ajouté comme utilisateur, veut ouvrir le compte à son nom, ou présente des ventes sans montrer ce qui a mal tourné ce mois-là.",
        ],
      },
    ],
    faqs: [
      { q: "Puis-je vendre sur Walmart Marketplace depuis l'extérieur des États-Unis ?", a: "Walmart accepte les candidatures d'entreprises établies dans un certain nombre de pays hors des États-Unis, mais les conditions évoluent : vérifiez les exigences en vigueur sur ses pages d'inscription vendeur. Le test pratique est le même pour tous : des documents d'entreprise vérifiés et la capacité de livrer des clients américains et d'accepter leurs retours." },
      { q: "Walmart Marketplace vaut-il la peine si je vends déjà sur Amazon ?", a: "Souvent, car il présente le même stock à d'autres acheteurs. Ce n'est toutefois pas un simple copier-coller : les règles de contenu et les modèles de création d'articles diffèrent, et un prix plus bas sur un autre site peut entraîner la dépublication de votre offre Walmart." },
      { q: "Ai-je besoin de codes UPC ou GTIN pour vendre sur Walmart ?", a: "Dans la plupart des cas, oui. Walmart utilise les identifiants produit pour décider si votre produit rejoint une page article existante ou en crée une nouvelle. Des codes erronés produisent donc des fiches mal associées. Des exemptions existent pour certains produits et doivent être demandées à Walmart." },
    ],
  },
  "marketplaces/walmart-virtual-assistant": {
    title: "Ce qu'il faut savoir avant d'engager un assistant virtuel Walmart",
    sections: [
      {
        heading: "Un assistant est-il le bon recrutement pour vous aujourd'hui ?",
        body: [
          "Un assistant devient rentable quand le compte fonctionne déjà et que la routine dévore vos journées : les commandes arrivent régulièrement, les articles se publient, et vous savez comment vous voulez que les retours et les questions soient traités.",
          "Vérifiez ce que le canal rapporte avant d'y ajouter un coût de personnel. Notre calculateur gratuit de rentabilité marketplace indique le bénéfice par commande une fois les frais et l'expédition retirés.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'un assistant",
        body: ["Vous payez du temps qualifié : le coût dépend donc de la quantité dont vous avez besoin et de son degré de spécialisation :"],
        bullets: [
          "Le volume de commandes et sa répartition sur la semaine, puisque Walmart tient compte des dates d'expédition.",
          "Le nombre de systèmes que l'assistant doit apprendre en plus de Seller Center : logiciel d'entrepôt, portail fournisseur, outil de support client.",
          "Si le poste comprend des tâches de jugement comme l'amélioration du contenu, ou seulement de la saisie et du traitement de commandes.",
          "L'état de vos procédures. Un travail non documenté est plus long à transmettre et à superviser.",
        ],
      },
      {
        heading: "À quoi vous attendre quand l'assistant commence",
        body: [
          "On vous demandera une liste de tâches classées par priorité, la procédure écrite de chacune, vos modèles de réponse, vos plafonds de remboursement et de remplacement, et le nom d'une personne capable de répondre vite aux questions. L'assistant reçoit un accès personnel à Seller Center, limité aux droits que les tâches exigent.",
          "Attendez-vous à un démarrage encadré : l'assistant traite un ensemble restreint de tâches pendant que le résultat est contrôlé, et la liste s'élargit à mesure que la fiabilité est démontrée. Le rythme dépend de la complexité du travail et il est convenu dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Évaluez un assistant sur ce que Walmart mesure : commandes confirmées avant la date d'expédition, numéros de suivi valides, messages clients traités à temps, et erreurs de flux corrigées au lieu de s'accumuler.",
          "Parmi les signaux d'alerte : des mots de passe partagés, un assistant à qui vous ne parlez jamais directement, des comptes rendus quotidiens qui énumèrent l'activité sans aucune exception, et un prestataire sans solution pour les congés ou la maladie.",
        ],
      },
    ],
    faqs: [
      { q: "Quelles tâches ne faut-il pas confier à un assistant virtuel Walmart ?", a: "Gardez les décisions qui ont un poids commercial ou juridique : la stratégie tarifaire et les prix planchers, le choix des produits à mettre en vente, les paramètres bancaires et fiscaux, et les réponses aux avis de suspension ou de non-respect des règles. Un assistant peut préparer les informations pour chacune, mais c'est au propriétaire ou à un responsable de décider." },
      { q: "De combien d'heures d'assistant virtuel par semaine un vendeur Walmart a-t-il besoin ?", a: "Il n'existe pas de chiffre standard : tout dépend du nombre de commandes, de la taille du catalogue et du nombre de retours et de messages reçus. Une méthode pratique consiste à noter chaque tâche effectuée dans Seller Center pendant une semaine type avec le temps qu'elle prend, puis à ajouter une marge pour les pics saisonniers." },
      { q: "Faut-il engager un assistant Walmart indépendant ou passer par une agence ?", a: "Un indépendant convient à une liste de tâches réduite et stable, mais vous assumez le recrutement, la formation, le contrôle et le risque que la personne parte sans préavis. Une agence ajoute la supervision et un remplaçant en cas d'absence, ce qui coûte généralement plus cher." },
    ],
  },
  "marketplaces/walmart-account-health": {
    title: "Ce qu'il faut savoir avant de faire appel à un spécialiste de la santé de compte Walmart",
    sections: [
      {
        heading: "Avez-vous besoin d'un spécialiste aujourd'hui ?",
        body: [
          "Trois situations justifient une aide extérieure. Vous avez reçu un avertissement ou une suspension sans savoir ce qui l'a provoqué. Vos indicateurs se dégradent et vous ne voyez pas pourquoi. Ou bien le compte est sain, croît vite, et personne dans votre équipe n'a le temps de le surveiller.",
          "Les problèmes de santé de compte sont parfois des problèmes de marge déguisés : des vendeurs rognent sur les transporteurs ou le stock parce que l'article rapporte à peine. Notre calculateur gratuit de rentabilité marketplace montre si un produit peut supporter le niveau de service qu'exige Walmart.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Le prix dépend de l'ampleur de ce qu'il faut examiner et de la durée de la mission :"],
        bullets: [
          "Si le compte est suspendu, sous avertissement ou simplement sous surveillance.",
          "Le nombre de problèmes distincts soulevés par Walmart, et s'ils portent sur la performance, sur les règles ou sur les deux.",
          "L'état de vos archives. Des factures, des données de suivi ou des documents fournisseurs manquants demandent du temps à reconstituer.",
          "Si les corrections restent dans Seller Center ou touchent aussi votre entrepôt, vos transporteurs et vos fournisseurs.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la mission lancée",
        body: [
          "On vous demandera tous les messages envoyés par Walmart, un accès en lecture à Seller Center, des exports de commandes et de suivi, ainsi que les factures fournisseurs ou lettres d'autorisation des articles concernés. Transmettez tout, y compris ce qui est gênant.",
          "L'ordre des étapes est fixe, même si le rythme ne l'est pas : établir les faits, corriger la cause, puis écrire à Walmart. Envoyer un appel avant que la correction soit réelle est l'erreur la plus fréquente. Le calendrier dépend de la rapidité avec laquelle les pièces peuvent être réunies et de l'examen propre à Walmart : le plan fixe donc des étapes, pas des dates promises.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Un bon travail est précis. Vous devez recevoir un diagnostic écrit qui nomme les commandes, les articles ou les processus à l'origine de chaque problème, la liste de ce qui a été modifié, puis un rapport régulier présentant chaque indicateur en regard de l'exigence actuelle de Walmart.",
          "Écartez quiconque garantit le rétablissement du compte, prétend avoir un contact chez Walmart, ne facture qu'une lettre type, suggère d'ouvrir un second compte pour contourner une suspension, ou propose de modifier des factures.",
        ],
      },
    ],
    faqs: [
      { q: "Combien de temps prend un appel de suspension Walmart ?", a: "Il n'y a pas de réponse fixe. Walmart examine les appels selon son propre calendrier, et le délai varie selon le motif de la suspension et la qualité du dossier. Ce que vous maîtrisez, c'est la rapidité avec laquelle un plan complet et exact est déposé." },
      { q: "Walmart bloque-t-il mes paiements si mon compte est suspendu ?", a: "C'est possible. Le contrat entre Walmart et ses vendeurs lui permet de retenir des fonds dans certaines circonstances, par exemple pour couvrir les remboursements et les réclamations sur des commandes récentes. Qu'il le fasse ou non, et pour combien de temps, dépend de votre dossier : lisez l'avis reçu et la section paiements de Seller Center." },
      { q: "Puis-je continuer à vendre pendant qu'un avertissement de performance est en cours ?", a: "En général, oui. Un avertissement signale qu'un indicateur est en dessous du niveau requis, il ne retire pas le droit de vendre. Allégez la charge sur ce qui défaille, par exemple en mettant en pause les articles que vous ne pouvez pas expédier à temps, et corrigez la cause avant le prochain examen de vos chiffres." },
    ],
  },
  "marketplaces/walmart-advertising": {
    title: "Ce qu'il faut savoir avant de payer pour la gestion de vos publicités Walmart",
    sections: [
      {
        heading: "Vos articles sont-ils prêts à être mis en avant ?",
        body: [
          "La publicité sur Walmart récompense les articles qui se vendent déjà un peu sans aide. Un article au prix compétitif, en stock, livré vite et doté de quelques avis transforme les clics en commandes.",
          "Avant un premier échange, calculez votre seuil de rentabilité. Notre calculateur d'ACoS gratuit part de votre prix, de vos coûts et de vos frais et indique la part maximale d'une vente que vous pouvez consacrer à la publicité sans perdre d'argent. Les rapports de Walmart utilisent le ROAS, qui est le même ratio inversé.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Séparez bien deux factures. Les dépenses publicitaires sont facturées par Walmart au clic et doivent passer par un compte annonceur à votre nom. Les honoraires de gestion rémunèrent les personnes qui planifient et ajustent les campagnes, et ils dépendent de :"],
        bullets: [
          "Le nombre d'articles mis en avant et le nombre de campagnes qu'ils nécessitent.",
          "Les formats utilisés. Les annonces de marque et les vidéos demandent des créations en plus des enchères.",
          "Le montant des dépenses gérées, car les budgets plus importants exigent un contrôle plus serré.",
          "L'ampleur des corrections à apporter aux fiches avant que les annonces puissent donner des résultats.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois les campagnes lancées",
        body: [
          "On vous demandera les coûts et les frais par article, une liste de produits prioritaires, les termes de recherche sur lesquels vous ne devez pas apparaître, et un accès à Walmart Ad Center.",
          "La période d'ouverture sert à recueillir des données : des campagnes larges montrent quelles recherches mènent à des commandes. Les dépenses sont ensuite resserrées sur ce qui fonctionne, et c'est seulement après que le budget est augmenté. La durée de chaque phase dépend de votre budget et du nombre de clics que produit votre catégorie, et elle est convenue dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Regardez au-delà du rapport publicitaire. Les ventes attribuées comprennent des commandes que vous auriez obtenues de toute façon. La question utile est donc de savoir si les ventes totales et le bénéfice total des articles mis en avant ont augmenté une fois les annonces actives.",
          "Signaux d'alerte : des campagnes créées dans un compte auquel vous ne pouvez pas vous connecter, de fortes enchères sur votre propre nom de marque présentées comme un succès, aucun mot-clé négatif longtemps après le lancement, et une promesse de ROAS faite avant que quiconque ait vu vos marges.",
        ],
      },
    ],
    faqs: [
      { q: "Qu'est-ce qu'un bon ACoS ou un bon ROAS sur Walmart ?", a: "Il n'existe pas de chiffre universel. Un bon résultat est celui qui laisse un bénéfice après le coût du produit, les frais de Walmart et l'expédition, et cette limite se situe à un endroit différent pour chaque article. Calculez le seuil de rentabilité de chaque produit et fixez l'objectif en dessous." },
      { q: "La publicité sur Walmart est-elle moins chère que sur Amazon ?", a: "Cela varie selon la catégorie et change à mesure que de nouveaux annonceurs arrivent : personne ne peut en faire une règle. L'approche fiable consiste à tester avec un budget limité et à comparer le coût par commande sur chaque marketplace à partir de vos propres chiffres." },
      { q: "Puis-je faire de la publicité sur Walmart si mes articles sont nouveaux et sans avis ?", a: "Oui, à condition que l'article respecte les règles d'éligibilité de Walmart, mais attendez-vous à une conversion plus faible tant que les avis ne sont pas là. Beaucoup de vendeurs commencent par des campagnes automatiques avec des enchères modestes pour recueillir des données de termes de recherche pendant que les avis s'accumulent, et gardent les budgets plus importants en réserve." },
    ],
  },
  "consulting/digital-strategy-consulting": {
    title: "Ce qu'il faut savoir avant d'engager un consultant en stratégie digitale",
    sections: [
      {
        heading: "Une mission de stratégie est-elle adaptée à votre situation aujourd'hui ?",
        body: [
          "Un travail de stratégie justifie son coût quand il y a une vraie décision à prendre et assez d'historique pour l'éclairer : un budget à répartir, une plateforme à choisir, un marché à ouvrir. Il faut aussi un dirigeant qui agira sur le résultat. Une feuille de route que personne n'a l'autorité d'appliquer est un document coûteux.",
          "Vous pouvez faire une partie du chemin seul. Notre modèle gratuit de stratégie de marketing digital vous guide à travers les objectifs, l'audience, les canaux et les indicateurs, et le remplir montre vite à quelles questions vous savez répondre et lesquelles demandent une aide extérieure.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Les honoraires d'un consultant suivent le temps que des profils expérimentés consacrent à votre entreprise. Les principaux facteurs :"],
        bullets: [
          "L'étendue de la question. Examiner un seul canal n'est pas le même travail qu'examiner toute l'activité digitale.",
          "La fiabilité de votre suivi. Si l'analytique et les chiffres de vente ne concordent pas, une partie du travail sert à établir à quels chiffres se fier.",
          "Le nombre de parties prenantes à interroger et à mettre d'accord.",
          "La forme du livrable : un plan écrit seul, ou aussi des ateliers et des présentations à la direction.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la mission lancée",
        body: [
          "Attendez-vous à fournir vous-même une part du travail. On vous demandera d'organiser les accès, de partager des chiffres parfois sensibles comme les marges et les budgets, et de rendre vos équipes et vos prestataires actuels disponibles pour des échanges francs.",
          "À mi-parcours, vous devez voir des conclusions provisoires et pouvoir les contester, afin que les recommandations finales ne soient pas une surprise. Le calendrier dépend du périmètre et de la réactivité de votre côté, et il figure dans le plan que vous validez.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Une bonne stratégie vous est propre. Testez-la en vous demandant si le même document pourrait être remis tel quel à un concurrent. Elle doit savoir dire non et montrer les preuves qui fondent chaque priorité.",
          "Signaux d'alerte : des recommandations qui se trouvent toutes être des services vendus par le consultant, un plan de vingt priorités sans ordre, des conseils sans aucun chiffre tiré de vos propres comptes, et un consultant qui n'a jamais parlé aux personnes qui font le travail.",
        ],
      },
    ],
    faqs: [
      { q: "Quelle est la différence entre une stratégie digitale et un plan marketing ?", a: "Une stratégie digitale décide où l'entreprise se battra en ligne et dans quoi elle investira : canaux, site web, systèmes et données, sur un horizon plus long. Un plan marketing se place en dessous et détaille les campagnes, les contenus et les budgets d'une période à venir." },
      { q: "Faut-il engager un consultant ou recruter un responsable digital à plein temps ?", a: "Un consultant convient à une question définie qui a une fin : un audit, une décision, un plan. Un recrutement à plein temps convient au pilotage continu de l'exécution. Beaucoup d'entreprises font appel à un consultant pour fixer le cap et définir le poste, puis recrutent sur cette base, ce qui évite d'embaucher un spécialiste du mauvais canal." },
      { q: "À quelle fréquence faut-il revoir une stratégie digitale ?", a: "Suivez régulièrement l'avancement au regard des indicateurs, et revoyez la stratégie elle-même quand un élément important change : un nouveau concurrent, une évolution des coûts sur un canal principal, une nouvelle gamme de produits ou un changement dans vos objectifs." },
    ],
  },
  "consulting/product-studio-for-startups": {
    title: "Ce qu'il faut savoir avant de confier votre startup à un studio produit",
    sections: [
      {
        heading: "Un studio est-il adapté à votre situation aujourd'hui ?",
        body: [
          "Un studio a du sens quand vous avez des preuves que le problème est réel, par exemple des conversations avec des personnes qui le rencontrent, et un budget prévu à la fois pour le développement et pour la période qui suit le lancement. Si vous avez un cofondateur technique, vous n'aurez peut-être besoin que d'aide en design ou en marketing.",
          "Pour voir la taille réelle de votre première version, essayez notre générateur gratuit de périmètre de MVP. Il transforme votre idée en une courte liste de fonctionnalités indispensables et d'éléments à laisser de côté.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Au-delà de la liste des fonctionnalités, ce sont ces choix qui pèsent le plus sur le budget :"],
        bullets: [
          "Si l'idée peut d'abord être testée avec une application web, ou s'il faut des applications natives iOS et Android dès le premier jour.",
          "Les rôles d'utilisateurs. Un produit avec des clients, des prestataires et des administrateurs revient presque à trois produits.",
          "Le niveau de finition attendu pour la première version. Des illustrations et des animations sur mesure coûtent plus cher qu'une interface standard et soignée.",
          "Ce qui se passe après le lancement : l'hébergement, les services tiers et les évolutions sont des coûts récurrents, pas ponctuels.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "Vous êtes le responsable du produit, et le studio aura régulièrement besoin de votre temps : pour répondre aux questions, relire les maquettes, tester les versions et décider de ce qu'il faut retirer.",
          "On vous demandera les recherches dont vous disposez, des exemples de produits que vous appréciez, et l'accès aux comptes de noms de domaine, de boutiques d'applications et de prestataires de paiement, qui doivent être ouverts au nom de votre société.",
          "Le travail va de la définition au design, puis au développement et à la mise en ligne, avec un point de décision après chaque étape où vous pouvez arrêter ou changer de direction. Les dates dépendent du périmètre fixé pendant la phase de cadrage et sont inscrites dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Jugez l'avancement sur un logiciel que vous pouvez manipuler, pas sur des rapports. À chaque revue, comparez la version au périmètre écrit, demandez ce qui a été plus difficile que prévu et consultez la liste des défauts connus.",
          "Signaux d'alerte : un devis ferme remis avant que quiconque ait rédigé un périmètre, du code conservé dans le dépôt privé du studio, chaque nouvelle idée acceptée sans un mot sur son coût, et un plan de lancement qui ne commence qu'une fois le développement terminé.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il choisir un studio produit, des freelances ou un cofondateur technique ?", a: "Un cofondateur apporte un engagement de long terme en échange de parts et il est difficile à trouver. Des freelances peuvent être engagés compétence par compétence, mais vous devenez le chef de projet qui fait tenir ensemble le design, le code et le marketing. Un studio fournit une équipe coordonnée pour une période définie." },
      { q: "Les studios produit travaillent-ils contre des parts au lieu d'honoraires ?", a: "Certains studios le font, en totalité ou en partie, et les conditions varient beaucoup. Posez la question directement dès le départ, et prenez un conseil juridique avant d'accepter de céder des parts. Ce qui est convenu doit être écrit dans le contrat avant le début du travail." },
      { q: "Puis-je plutôt utiliser des outils no-code pour créer mon MVP ?", a: "Parfois, et la question mérite d'être posée. Si la première version se compose surtout de formulaires, de listes et de paiements, un outil no-code peut tester la demande avec moins de développement. Les limites apparaissent avec une logique inhabituelle, de gros volumes de données, des exigences de performance ou des fonctions mobiles natives." },
    ],
  },
  "development/game-development": {
    title: "Ce qu'il faut savoir avant de commander un jeu vidéo",
    sections: [
      {
        heading: "Un jeu est-il le bon projet pour vous aujourd'hui ?",
        body: [
          "Commencez par l'objectif. Un jeu de campagne, un jeu de formation et un titre commercial ne réussissent pas sur les mêmes critères : temps passé et contacts recueillis, compétences retenues, ou ventes et fidélité des joueurs. Pensez ensuite à la façon dont les joueurs le trouveront, car un bon jeu vers lequel personne n'est dirigé reste sans joueurs.",
          "Mettre l'idée par écrit est le test le plus rapide. Notre générateur gratuit de document de game design transforme votre concept en un plan structuré couvrant l'audience, la plateforme, la boucle de jeu et le contenu, et ses vides montrent ce qui reste à décider.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Le volume de contenu et l'ambition technique fixent le budget. Au-delà du choix de la plateforme, regardez :"],
        bullets: [
          "Le style graphique. Une animation dessinée image par image et des personnages 3D détaillés demandent bien plus d'heures que des formes simples ou un style épuré.",
          "Les fonctions en ligne. Les classements, la sauvegarde de la progression dans le cloud et le multijoueur en temps réel nécessitent des serveurs qu'il faut exploiter et payer après la sortie.",
          "La musique originale, l'enregistrement de voix et la localisation en plusieurs langues.",
          "Les licences : conditions du moteur, comptes développeur des boutiques et éventuels éléments tiers.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la production lancée",
        body: [
          "On vous demandera des références : des jeux que vous aimez et que vous n'aimez pas, votre charte graphique s'il s'agit d'un jeu de marque, et le contenu pédagogique s'il enseigne quelque chose. Il vous faudra aussi des comptes développeur sur les boutiques où vous comptez publier, enregistrés au nom de votre organisation.",
          "Votre rôle principal est de jouer aux versions et de donner votre avis tôt. Des remarques sur un prototype brut sont faciles à prendre en compte, les mêmes remarques une fois les graphismes terminés ne le sont pas.",
          "Les boutiques examinent les jeux avant de les publier et peuvent demander des modifications : la date de sortie est donc prévue avec une marge pour cela, et le calendrier est inscrit dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Observez des personnes qui n'ont jamais vu le jeu y jouer sans explications. Si elles comprennent presque aussitôt quoi faire et choisissent de rejouer, le cœur du jeu fonctionne.",
          "Signaux d'alerte : aucune version jouable avant un stade avancé du projet, des graphismes soignés montrés avant que les mécaniques aient été testées, une conception qui grossit à chaque réunion, des éléments aux licences floues, et un studio incapable de vous montrer un jeu qu'il a publié.",
        ],
      },
    ],
    faqs: [
      { q: "Les outils d'IA peuvent-ils réduire le coût de création d'un jeu ?", a: "Ils peuvent accélérer certaines parties de la production, comme les croquis de concept, les graphismes provisoires et une partie du code, mais la conception, la direction artistique finale, les tests et l'équilibrage demandent toujours des personnes. Certaines boutiques demandent aux développeurs de déclarer les contenus générés par IA : demandez donc à votre développeur ce qui a été utilisé et où." },
      { q: "Comment un jeu gagne-t-il de l'argent ?", a: "Les principaux modèles sont l'achat unique, le jeu gratuit financé par la publicité, le jeu gratuit avec achats intégrés facultatifs, et l'abonnement. Les jeux de marque et de formation ne rapportent en général rien directement et sont financés par le résultat marketing ou pédagogique." },
      { q: "Ai-je besoin d'un éditeur pour sortir un jeu ?", a: "Non. Toute personne disposant d'un compte développeur peut publier sur l'App Store, Google Play, Steam ou son propre site. Un éditeur peut apporter un financement, du marketing et des relations avec les boutiques en échange d'une part des revenus." },
    ],
  },
};
