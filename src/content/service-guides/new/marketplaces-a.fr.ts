import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "marketplaces/amazon-account-management": {
    title: "Ce qu'il faut savoir avant de confier votre compte Amazon à une agence",
    sections: [
      {
        heading: "Externaliser votre compte Amazon, est-ce le bon moment ?",
        body: [
          "Confier la gestion quotidienne d'un compte Seller Central a du sens lorsque Amazon génère déjà un chiffre d'affaires réel, ou pourrait clairement le faire, et que le travail dépasse les heures que vous pouvez y consacrer. Les signes habituels : des fiches produits que personne n'a retouchées depuis leur mise en ligne, des ruptures de stock pendant vos meilleures semaines et des notifications d'Amazon qui restent non lues.",
          "C'est trop tôt si vous en êtes encore à vérifier qu'un produit se vend, ou si votre marge après les frais d'Amazon est faible ou inconnue. Commencez par là : notre calculateur gratuit de rentabilité marketplace indique ce qu'une unité vous laisse une fois déduits les frais, l'expédition et le coût d'achat. Utilisez les frais affichés dans votre propre compte, car ils varient selon la catégorie et la marketplace.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'une gestion de compte Amazon",
        body: [
          "La gestion est tarifée selon la charge de travail, et quelques éléments fixent cette charge :",
          "Distinguez les honoraires de l'agence de ce que vous payez à Amazon. Les frais de vente, les frais FBA et les frais de stockage sont prélevés par Amazon sur votre compte, quel que soit le gestionnaire.",
        ],
        bullets: [
          "Le nombre de produits actifs, et la part d'entre eux qui sont des fiches parentes avec variations.",
          "Le nombre de marketplaces Amazon où vous vendez, chacune ayant ses propres fiches, sa langue et ses règles.",
          "Le recours à FBA, à FBM ou aux deux, car chaque mode apporte ses tâches récurrentes.",
          "L'état actuel du catalogue : des fiches supprimées de la recherche et des familles de variations cassées imposent une phase de nettoyage avant le travail courant.",
          "L'inclusion ou non de contenus comme les pages A+, un Brand Store ou de nouvelles images produits.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois la gestion lancée",
        body: [
          "On vous demandera un accès utilisateur secondaire à Seller Central, votre coût d'achat par produit, les délais de vos fournisseurs et votre charte de marque si vous en avez une. Sans les coûts et les délais d'approvisionnement, personne ne peut fixer un prix ni planifier le stock correctement : préparez-les.",
          "Le travail passe ensuite en général d'un audit au nettoyage des problèmes les plus graves, puis à une routine régulière accompagnée de rapports. Attendez-vous à des questions au début : quels produits comptent le plus, quels prix planchers s'appliquent, qui valide une promotion. La durée de chaque étape dépend de la taille et de l'état du compte, et elle est convenue avec vous dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Jugez-le sur des chiffres que vous pouvez consulter vous-même dans Seller Central : les sessions, le taux de conversion par session, le pourcentage d'Offre en vedette, la disponibilité en stock de vos produits clés et le bénéfice par produit après frais. Les ventes seules peuvent tromper, puisqu'une baisse de prix ou une forte promotion augmente le chiffre d'affaires tout en réduisant ce qu'il vous reste.",
          "Méfiez-vous d'une agence Amazon lorsque :",
        ],
        bullets: [
          "Elle demande votre identifiant principal au lieu d'une invitation d'utilisateur.",
          "Elle promet un classement, un chiffre de ventes ou une part de l'Offre en vedette.",
          "Elle propose de vous obtenir des avis. Amazon interdit les avis payés ou incités, et le compte mis en danger est le vôtre.",
          "Ses rapports énumèrent les tâches réalisées, jamais leur effet sur les ventes ou la marge.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il choisir une agence Amazon, un freelance ou un responsable en interne ?", a: "Un responsable en interne convient à une entreprise où Amazon pèse assez pour occuper un poste à temps plein et où un cadre peut le diriger. Un freelance coûte moins cher et peut être très compétent, mais tout repose sur la disponibilité et l'étendue des compétences d'une seule personne. Une agence vous apporte plusieurs spécialistes et une continuité en cas d'absence. Dans les trois cas, gardez le compte, l'enregistrement de la marque et les données à votre nom." },
      { q: "Faut-il être inscrit à Brand Registry avant d'engager un gestionnaire de compte Amazon ?", a: "Non. Un compte peut être bien géré sans cela. Brand Registry donne toutefois accès à des outils qui rendent le travail plus efficace, comme le contenu A+, un Brand Store, Brand Analytics et des moyens de signaler les fiches qui portent atteinte à votre marque. Il exige une marque déposée ou en cours de dépôt : si la marque vous appartient, mieux vaut lancer cette démarche tôt." },
      { q: "Quelle est la différence entre Seller Central et Vendor Central ?", a: "Seller Central est l'interface des vendeurs tiers, qui mettent eux-mêmes leurs produits en ligne et vendent directement aux clients d'Amazon. Vendor Central s'adresse aux fournisseurs qui vendent leur stock en gros à Amazon, lequel le revend ensuite ; l'accès se fait sur invitation d'Amazon. Les deux fonctionnent différemment pour la maîtrise des prix, le paiement et la logistique. Le service de gestion de compte de TDM est construit autour de Seller Central." },
    ],
  },
  "marketplaces/amazon-virtual-assistant": {
    title: "Ce qu'il faut savoir avant d'engager un assistant virtuel Amazon",
    sections: [
      {
        heading: "Un assistant virtuel Amazon est-il fait pour vous maintenant ?",
        body: [
          "Un assistant vous convient lorsque vous savez déjà comment chaque tâche de votre compte doit être réalisée et que vous manquez simplement d'heures pour le faire. Si vous pouvez écrire les étapes pour mettre à jour une fiche, répondre à un message sur un retard de livraison ou déposer une demande de remboursement FBA, une personne formée peut les reprendre.",
          "Ce n'est pas le bon recrutement si vous cherchez quelqu'un pour décider de la stratégie, fixer les prix en partant de zéro ou sauver un compte en difficulté. Un assistant exécute bien des consignes ; sans consignes, il attendra ou devinera. Avant d'ajouter un coût récurrent, vérifiez que le compte peut le supporter : notre calculateur gratuit de rentabilité marketplace montre ce que chaque vente laisse après les frais d'Amazon.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'un assistant Amazon",
        body: [
          "Le prix suit le poste : plus le poste est clair, plus le devis est juste. Les principaux facteurs sont :",
          "Comptez aussi votre propre temps. Quelqu'un de votre côté doit briefer l'assistant, répondre à ses questions et contrôler le travail, surtout au début.",
        ],
        bullets: [
          "Le nombre d'heures par semaine, et la nécessité ou non qu'elles recoupent votre journée de travail ou un fuseau horaire précis.",
          "La nature des tâches : de simples modifications de fiches demandent moins d'expérience que des demandes de remboursement ou des imports par fichier plat.",
          "La langue dans laquelle vos acheteurs écrivent, si les messages clients font partie du poste.",
          "Le besoin d'une seule personne ou de plusieurs, et de renforts pendant les périodes de forte activité.",
        ],
      },
      {
        heading: "À quoi vous attendre pendant la première étape",
        body: [
          "On vous demandera de lister les tâches, de transmettre vos procédures écrites et vos réponses types validées, et de créer un utilisateur Seller Central doté des seules autorisations nécessaires. Si vous n'avez aucune procédure écrite, enregistrez votre écran en réalisant chaque tâche une fois. Cela suffit en général pour démarrer.",
          "Commencez par un petit ensemble de tâches, contrôlez le résultat de près, puis ajoutez-en à mesure que la confiance s'installe. Convenez tôt de la manière dont les questions vous parviennent et des décisions que l'assistant peut prendre seul, par exemple accorder un remboursement en dessous d'un seuil que vous fixez. Le rythme de la passation dépend du nombre de tâches et de la qualité de leur documentation, et il est convenu dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail d'un assistant",
        body: [
          "Regardez l'exactitude et le suivi, pas les heures déclarées. Les modifications de fiches sont-elles justes du premier coup ? Les messages des acheteurs reçoivent-ils une réponse dans le délai fixé par Amazon ? Chaque dossier ouvert auprès du support vendeur a-t-il une prochaine étape notée en face ? Un court journal quotidien ou hebdomadaire rend ces points faciles à vérifier.",
          "Voici les signes que quelque chose ne va pas :",
        ],
        bullets: [
          "Des erreurs répétées après avoir été signalées.",
          "Le silence face à une consigne peu claire, suivi d'une supposition.",
          "Des demandes d'autorisations Seller Central plus larges que ce que les tâches exigent.",
          "Un prestataire sans superviseur désigné et sans solution prévue en cas d'absence.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il engager un assistant Amazon freelance ou passer par une agence ?", a: "Un freelance engagé en direct est en général la voie la moins chère, et elle fonctionne si vous avez le temps de recruter, de former et de contrôler la personne vous-même. Les risques sont l'absence, le départ et le fait que personne ne relise son travail. En passant par une agence, vous payez le recrutement, la formation, la supervision et un remplacement si nécessaire. Choisissez selon le temps d'encadrement dont vous disposez, pas seulement selon le tarif horaire." },
      { q: "Pour combien d'heures par semaine ai-je besoin d'un assistant virtuel Amazon ?", a: "Cela dépend de votre volume de commandes, de la taille de votre catalogue et du nombre de tâches que vous déléguez. La méthode pratique consiste à noter, tâche par tâche, le temps que vous ou votre équipe passez au travail courant du compte pendant une semaine normale. Ce relevé devient la fiche de poste et montre si une aide à temps partiel suffit." },
      { q: "Un assistant virtuel Amazon peut-il gérer mes campagnes PPC ?", a: "Un assistant peut prendre en charge la partie routinière de la publicité : télécharger les rapports sur les termes de recherche, appliquer les changements d'enchères que vous avez définis, ajouter des mots-clés négatifs à partir d'une liste que vous validez. Décider des objectifs, de la structure et du budget est un travail de spécialiste, qu'il vaut mieux laisser à quelqu'un qui gère des publicités à temps plein. C'est pourquoi TDM propose la gestion de la publicité Amazon comme un service distinct." },
    ],
  },
  "marketplaces/amazon-account-health": {
    title: "Ce qu'il faut savoir avant de faire appel à un spécialiste de la santé du compte Amazon",
    sections: [
      {
        heading: "Avez-vous besoin d'un spécialiste maintenant ?",
        body: [
          "Ce service se justifie à deux moments. Le premier est urgent : Amazon a désactivé votre compte ou retiré des fiches qui portent vos ventes, et le prochain envoi compte. Le second est plus discret : le compte est actif, mais les avertissements, les réclamations ou des indicateurs en baisse s'accumulent sur la page Santé du compte et personne n'en a la charge.",
          "Un avertissement isolé sur une fiche, dont la cause est évidente, par exemple un document qu'Amazon nomme et que vous possédez déjà, peut souvent être traité par vous directement. Faites-vous aider lorsque la cause n'est pas claire, lorsqu'un premier appel a été rejeté ou lorsque les produits touchés représentent une grande part du chiffre d'affaires. Il est utile de savoir ce que rapporte chaque produit avant de décider de l'effort à consacrer à sa défense, et notre calculateur gratuit de rentabilité marketplace vous donne ce chiffre.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Le travail fait l'objet d'un devis par dossier ou sous forme de surveillance continue, et les facteurs diffèrent de ceux d'une gestion de compte ordinaire :",
        ],
        bullets: [
          "Le type de problème. Une réclamation portant sur l'authenticité ou la propriété intellectuelle exige des documents fournisseurs qu'un problème d'expédition tardive ne demande pas.",
          "Le nombre d'appels déjà envoyés, car les soumissions précédentes doivent être lues et prises en compte.",
          "L'état de vos justificatifs : des factures, des autorisations de fournisseurs et des certificats de conformité complets, qui correspondent aux coordonnées de votre entreprise, réduisent le travail.",
          "Le périmètre touché, une fiche, un groupe de produits ou le compte entier, et le nombre de marketplaces concernées.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le dossier ouvert",
        body: [
          "Attendez-vous à ce qu'on vous demande tout : les notifications exactes d'Amazon, les appels précédents et les réponses reçues, les factures fournisseurs et un récit honnête de ce qui s'est passé. Taire un détail gênant est un moyen sûr d'obtenir un second rejet, car le spécialiste écrit alors sur le mauvais problème.",
          "Le travail suit cet ordre : diagnostic, corrections réelles dans l'entreprise, rédaction, votre validation, puis soumission. Vient ensuite l'attente, et parfois de nouvelles questions d'Amazon. Personne en dehors d'Amazon ne maîtrise le délai de réponse : organisez donc votre trésorerie et votre stock en supposant que la réponse peut tarder. Pour une surveillance continue, convenez de la fréquence des contrôles du compte et de la façon dont les nouvelles notifications vous seront signalées.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Un bon plan d'action se lit comme s'il ne pouvait concerner que votre entreprise : il nomme les commandes, les produits, les fournisseurs et les changements de processus en cause. Lisez le projet avant son envoi. Si vous pouviez y mettre le nom d'un autre vendeur sans que rien ne paraisse déplacé, c'est un modèle type.",
          "Écartez un prestataire si vous constatez l'un de ces points :",
        ],
        bullets: [
          "Une promesse de réactivation, ou l'affirmation de disposer de contacts internes chez Amazon.",
          "Le conseil d'ouvrir un nouveau compte vendeur pendant que l'ancien est désactivé, ce qui enfreint la politique d'Amazon et peut aggraver la situation.",
          "Toute suggestion de modifier des factures ou d'autres documents. Soumettre de faux justificatifs peut mettre fin à toute chance de réactivation.",
          "Un devis remis avant que quiconque ait lu la notification d'Amazon.",
        ],
      },
    ],
    faqs: [
      { q: "Dois-je rédiger moi-même mon appel auprès d'Amazon ?", a: "Vous le pouvez, et pour un problème simple dont la cause est claire, cela suffit souvent. Amazon n'exige pas l'intervention d'un tiers. La difficulté est que les vendeurs sous pression ont tendance à argumenter, à accuser l'acheteur ou à envoyer des excuses générales, et ces appels sont couramment rejetés. Si votre première tentative a échoué ou si la notification est vague, un second lecteur expérimenté est utile avant un nouvel envoi." },
      { q: "Puis-je ouvrir un nouveau compte Amazon si le mien est suspendu ?", a: "Non. La politique d'Amazon n'autorise pas un vendeur à ouvrir un autre compte pour contourner une désactivation, et Amazon relie les comptes entre eux grâce aux informations professionnelles et personnelles qui s'y rattachent. Un nouveau compte ouvert de cette façon est normalement désactivé comme lié au premier, et il complique l'appel initial. La voie du retour consiste à résoudre le problème sur le compte existant." },
      { q: "Quelle est la différence entre la désactivation d'une fiche et celle d'un compte ?", a: "La désactivation d'une fiche retire de la vente un produit, ou un groupe de produits, tandis que le reste de votre catalogue continue de se vendre. La désactivation d'un compte arrête toute vente sur le compte. Les problèmes de fiches se contestent produit par produit, avec des preuves propres à ce produit. Un dossier au niveau du compte demande un plan d'action qui couvre le fonctionnement de l'entreprise. Des infractions de fiches non résolues peuvent finir par constituer un problème au niveau du compte, d'où l'intérêt de ne pas les laisser ouvertes." },
    ],
  },
  "marketplaces/amazon-advertising": {
    title: "Ce qu'il faut savoir avant d'engager une agence Amazon PPC",
    sections: [
      {
        heading: "Vos produits sont-ils prêts pour la publicité Amazon ?",
        body: [
          "Sur Amazon, les publicités envoient les acheteurs vers une page produit, et c'est la page qui vend. Avant de payer des clics, vérifiez que la fiche a des images nettes et un contenu complet, que le prix est compétitif, que le produit détient l'Offre en vedette et que le stock suffit pour tenir toute une campagne. Un produit avec peu d'avis, ou de mauvais avis, convertira mal, aussi bon que soit le ciblage.",
          "Vérifiez ensuite le calcul. Votre ACoS de rentabilité est votre marge avant dépense publicitaire, exprimée en pourcentage du prix de vente ; au-dessus, chaque vente issue de la publicité perd de l'argent. Notre calculateur ACoS gratuit le détermine à partir de votre prix, de vos coûts et de vos frais. Si ce seuil est très bas, corrigez le prix ou les coûts avant de faire de la publicité.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'une gestion Amazon PPC",
        body: [
          "Deux factures entrent en jeu. Les clics sont facturés par Amazon sur votre compte vendeur, et les honoraires de gestion rémunèrent les personnes qui pilotent les campagnes. La partie gestion dépend de :",
          "Le prix des clics lui-même varie selon la catégorie et la saison, et il est fixé par l'enchère, pas par une agence.",
        ],
        bullets: [
          "Le nombre de produits mis en avant, et leur degré de différence les uns par rapport aux autres.",
          "Les formats publicitaires utilisés : Sponsored Products seul représente moins de travail que l'ajout de vidéos Sponsored Brands, de Sponsored Display ou du DSP.",
          "Le nombre de marketplaces et de langues, puisque les mots-clés ne se traduisent pas terme à terme.",
          "L'état des campagnes existantes. Un compte rempli de campagnes sans structure demande plus de démêlage qu'un départ à neuf.",
          "La nécessité ou non de produire des créations comme des vidéos ou des pages de Brand Store.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois les campagnes confiées",
        body: [
          "On vous demandera un accès à la console publicitaire, votre coût d'achat et vos frais pour chaque produit, l'état de votre stock et vos priorités : quels produits pousser, lesquels protéger, lesquels laisser de côté. Décidez à l'avance si un produit en lancement peut fonctionner à perte pendant un temps, et quelle perte est acceptable.",
          "Les campagnes nouvelles ou restructurées doivent accumuler des données de clics et de ventes avant que les enchères puissent être jugées, si bien que les premiers chiffres fluctuent. Amazon attribue en outre les ventes aux publicités pendant une fenêtre d'attribution qui suit le clic, ce qui signifie que les jours les plus récents d'un rapport sont incomplets. La durée de la phase de stabilisation dépend de votre budget et de votre volume de ventes, et elle est convenue dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Lisez les résultats publicitaires à côté des ventes totales. L'ACoS montre ce que les publicités coûtent au regard des ventes qui leur sont attribuées. Le TACoS, la dépense publicitaire divisée par l'ensemble des ventes, montre si le produit dans son ensemble se porte mieux. Demandez quelle part de la dépense va aux recherches portant sur le nom de votre propre marque, car ces ventes flattent les chiffres et beaucoup auraient eu lieu de toute façon.",
          "Les signaux d'alerte chez un prestataire Amazon PPC :",
        ],
        bullets: [
          "Des rapports qui affichent l'ACoS ou le ROAS, jamais le bénéfice.",
          "Un objectif unique appliqué à tous les produits, quelle que soit la marge.",
          "Aucun travail sur les termes de recherche ou les mots-clés négatifs visible dans l'historique des modifications.",
          "Des honoraires indexés sur la dépense publicitaire sans objectif d'efficacité convenu, ce qui récompense le fait de dépenser plus.",
          "Des campagnes créées dans un compte publicitaire qui ne vous appartient pas.",
        ],
      },
    ],
    faqs: [
      { q: "Quelle est la différence entre ACoS, TACoS et ROAS ?", a: "L'ACoS est la dépense publicitaire divisée par les ventes attribuées aux publicités, exprimée en pourcentage. Le ROAS est le même rapport inversé : les ventes publicitaires divisées par la dépense publicitaire. Le TACoS est la dépense publicitaire divisée par les ventes totales, ventes organiques comprises. L'ACoS et le ROAS indiquent l'efficacité des publicités. Le TACoS indique à quel point le produit dépend de la publicité, et un TACoS en baisse avec des ventes stables est en général bon signe." },
      { q: "Faut-il enchérir sur le nom de ma propre marque sur Amazon ?", a: "Souvent oui, à un niveau maîtrisé. Des concurrents peuvent placer des publicités sur les recherches portant sur votre marque, et une campagne défensive modeste vous garde le haut de la page. Le piège est que les campagnes de marque affichent un ACoS très bas qui masque des résultats plus faibles ailleurs. Présentez séparément la dépense de marque et la dépense hors marque, et jugez le compte sur la partie hors marque." },
      { q: "Faut-il utiliser des campagnes automatiques ou manuelles sur Amazon ?", a: "La plupart des comptes utilisent les deux. Dans une campagne automatique, Amazon décide sur quelles recherches et quelles pages produits votre publicité apparaît, à partir de votre fiche, ce qui sert à découvrir des termes auxquels vous n'aviez pas pensé. Les campagnes manuelles vous laissent choisir les mots-clés ou les produits et fixer une enchère pour chacun. Une méthode courante consiste à déplacer les termes de recherche qui ont fait leurs preuves des campagnes automatiques vers les manuelles et à bloquer ceux qui gaspillent le budget." },
    ],
  },
  "marketplaces/ebay-account-management": {
    title: "Ce qu'il faut savoir avant d'externaliser votre compte eBay",
    sections: [
      {
        heading: "La vente sur eBay en gestion déléguée est-elle faite pour vous maintenant ?",
        body: [
          "eBay convient mieux à certains stocks qu'à d'autres. Les objets d'occasion, reconditionnés ou de collection, les pièces détachées, les fins de série et les produits compatibles avec de nombreux modèles y trouvent en général preneur, à côté des produits neufs classiques. Si votre gamme s'y prête et que vous détenez un stock que vous pouvez expédier de façon fiable, une équipe externe peut faire d'eBay un canal régulier au lieu d'un canal d'appoint.",
          "Attendez si vous mettez en vente quelques objets de temps en temps ; les outils de mise en vente intégrés à eBay suffisent pour cela. Connaissez aussi vos chiffres avant de vous engager : la commission sur le prix de vente final, l'abonnement boutique éventuel et les frais de port sont prélevés sur chaque vente. Notre calculateur gratuit de rentabilité marketplace montre ce qu'il reste par objet. Prenez les taux de frais dans votre propre compte eBay, car ils diffèrent selon la catégorie et le site.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'une gestion eBay",
        body: [
          "Le devis reflète la quantité de travail à faire chaque jour. Sur eBay, cela se ramène à :",
          "Demandez ce qui est inclus et ce qui ne l'est pas. Les photos, les frais de port et les frais propres à eBay restent normalement en dehors des honoraires de gestion.",
        ],
        bullets: [
          "Le nombre d'annonces en ligne, et la part de celles qui comportent des variantes ou nécessitent des données de compatibilité.",
          "Le degré de complétude de vos données produits. Un flux fournisseur avec identifiants et attributs se met en vente plus facilement qu'un dossier de photos.",
          "Le volume de commandes, et la prise en charge ou non des messages des acheteurs, des offres et des retours.",
          "La vente à prix fixe uniquement, ou aussi aux enchères, lesquelles demandent un calendrier et une surveillance.",
          "Le nombre de sites eBay et de langues dans lesquels vous vendez.",
        ],
      },
      {
        heading: "À quoi vous attendre au démarrage du travail",
        body: [
          "On vous demandera d'inviter l'équipe par l'accès multi-utilisateur au compte, et de fournir vos coûts, l'état de vos stocks, vos conditions de retour et le prix ou l'offre le plus bas que vous accepteriez pour chaque groupe de produits. Ces limites comptent sur eBay, car Best Offer et les offres envoyées aux personnes qui suivent un objet font que les prix se négocient tous les jours.",
          "Les premiers travaux sont en général peu spectaculaires : règles de vente pour la livraison, les retours et le paiement remises en ordre, caractéristiques de l'objet renseignées, annonces en double supprimées. Les nouvelles annonces et les promotions viennent ensuite, une fois la base saine. La durée de chaque étape dépend de la taille du catalogue et de la qualité des données, et elle figure dans le plan que vous validez.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Seller Hub vous fournit les preuves. Suivez les impressions, le taux de clics depuis la recherche, le taux de conversion des ventes et le taux d'écoulement, et vérifiez que votre niveau de vendeur reste à Above Standard ou mieux. Comparez le bénéfice après frais et port, pas le chiffre d'affaires.",
          "Interrogez un gestionnaire eBay qui fait l'une des choses suivantes :",
        ],
        bullets: [
          "Il met fin à des annonces et les recrée en masse sans raison annoncée, ce qui fait perdre leur historique de ventes.",
          "Il bourre les titres de noms de marques ou de mots-clés sans rapport, ce qui enfreint les règles d'eBay sur la manipulation de la recherche.",
          "Il oriente les acheteurs vers un contact ou un paiement en dehors d'eBay, ce que la plateforme interdit.",
          "Il ne sait pas dire qui traite les retours et les litiges lorsqu'une échéance tombe en dehors des heures de bureau.",
        ],
      },
    ],
    faqs: [
      { q: "Ai-je besoin d'un abonnement Boutique eBay ?", a: "Vous pouvez vendre sur eBay sans abonnement. Une Boutique est un abonnement récurrent qui apporte un quota d'annonces sans frais d'insertion, une vitrine avec vos propres catégories et des outils promotionnels supplémentaires. Sa rentabilité dépend du nombre d'annonces que vous gardez en ligne et de leurs catégories. Comparez les niveaux d'abonnement affichés dans votre propre compte à vos frais d'insertion actuels avant de choisir." },
      { q: "Faut-il vendre aux enchères ou à prix fixe sur eBay ?", a: "Le prix fixe convient aux produits dont la valeur de marché est connue et dont vous pouvez renouveler le stock, ce qui couvre la plupart des produits de détail. Les enchères conviennent aux objets rares ou difficiles à évaluer, comme les objets de collection, pour lesquels ce sont les enchérisseurs en concurrence qui fixent le prix. Une enchère peu demandée peut se clore en dessous de ce que vous espériez : fixez donc un prix de départ acceptable pour vous. Beaucoup de vendeurs utilisent le prix fixe pour la gamme et les enchères pour certains objets choisis." },
      { q: "eBay vaut-il la peine si je vends déjà sur Amazon ?", a: "Cela peut être le cas, car les deux fonctionnent différemment. Sur Amazon, les vendeurs d'un même produit partagent une seule page produit. Sur eBay, chaque vendeur a sa propre annonce, avec son titre, ses photos et ses conditions, et peut vendre des produits d'occasion et reconditionnés dans la plupart des catégories. Vous y gagnez davantage de maîtrise et une seconde source de ventes, au prix d'annonces, de règles et de messages d'acheteurs à gérer séparément." },
    ],
  },
  "marketplaces/ebay-virtual-assistant": {
    title: "Ce qu'il faut savoir avant d'engager un assistant virtuel eBay",
    sections: [
      {
        heading: "Un assistant eBay est-il le bon recrutement maintenant ?",
        body: [
          "Sur eBay, la routine ne s'arrête jamais : les questions des acheteurs avant d'enchérir ou d'acheter, les offres à accepter ou à refuser, les commandes à expédier dans votre délai de traitement, les demandes de retour assorties d'échéances. Si cette routine dévore les heures que vous devriez passer à trouver du stock, et si vous pouvez expliquer comment vous voulez que chaque étape soit faite, un assistant est un recrutement logique.",
          "Si vos ventes sur eBay sont encore occasionnelles, la charge de travail risque de ne pas remplir les heures que vous paieriez. Calculez ce que vous laisse une vente moyenne avec notre calculateur gratuit de rentabilité marketplace, puis comparez le coût de l'assistant aux ventes que vous pourriez ajouter ou au temps que vous récupéreriez.",
        ],
      },
      {
        heading: "Ce qui détermine le coût d'un assistant eBay",
        body: [
          "Les devis se construisent à partir du poste que vous décrivez. Voici les points qui font le plus bouger le montant :",
          "Un poste flou coûte plus cher au bout du compte, parce que le temps part en questions et en reprises.",
        ],
        bullets: [
          "Le nombre d'heures et les jours couverts, week-ends compris si vos acheteurs attendent des réponses ces jours-là.",
          "La quantité de mises en vente et l'état de la matière de départ : des données produits finalisées, ou des objets à identifier et à décrire d'après des photos.",
          "Le rôle de l'assistant sur les offres et les remboursements : négocier et décider dans des limites fixées, ou seulement les préparer pour vous.",
          "Les autres outils dans lesquels il doit travailler, comme un logiciel de gestion de stock, le portail d'un transporteur ou une boîte de réception partagée.",
        ],
      },
      {
        heading: "À quoi vous attendre quand l'assistant commence",
        body: [
          "Avant le premier jour, on vous demandera une liste de tâches, des exemples d'annonces que vous jugez bonnes, vos réponses enregistrées, vos limites de remboursement et d'offre, ainsi qu'un accès délégué avec les autorisations correspondantes. Les vendeurs qui expédient depuis leur propre réserve doivent aussi expliquer comment les commandes parviennent à la personne qui prépare les colis.",
          "Le schéma habituel est l'observation, puis le travail supervisé, puis le travail autonome avec des contrôles ponctuels. Tenez un journal partagé simple de ce qui a été mis en vente, expédié et répondu chaque jour. La vitesse à laquelle vous passez d'une phase à la suivante dépend du nombre de tâches et de la qualité de vos consignes, et elle est convenue dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Mesurez ce qu'eBay mesure lui-même. Les commandes ont-elles été marquées comme expédiées, avec un suivi, dans le délai de traitement ? Les demandes de retour et les signalements d'objet non reçu ont-ils reçu une réponse avant l'échéance ? Les nouvelles annonces ont-elles toutes les caractéristiques de l'objet obligatoires renseignées, dans la bonne catégorie ? Votre tableau de bord vendeur montre si les expéditions tardives et les litiges non résolus augmentent.",
          "Réagissez vite si vous remarquez :",
        ],
        bullets: [
          "Des annonces copiées sur d'autres vendeurs, photos comprises, ce qui enfreint les règles d'eBay sur les images et les textes et peut entraîner le retrait d'annonces.",
          "Des offres acceptées en dessous de votre plancher pour que le nombre de ventes paraisse élevé.",
          "Des litiges avec des acheteurs laissés en attente jusqu'au dernier jour avant l'échéance.",
          "Un identifiant unique partagé par plusieurs personnes, si bien que nul ne peut dire qui a fait quoi.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il passer par un freelance ou par une agence pour un assistant virtuel eBay ?", a: "S'adresser directement à un freelance limite le coût et peut bien fonctionner pour une tâche étroite comme la mise en vente. Les échéances d'eBay pour les litiges et les retours sont le point faible, puisqu'une seule personne ne peut pas couvrir tous les jours. Une agence ajoute un superviseur, un remplaçant formé et un responsable si la qualité baisse. Décidez en demandant ce qu'il advient de vos litiges ouverts lorsque l'assistant est indisponible." },
      { q: "Un assistant virtuel eBay peut-il rechercher des produits à vendre pour moi ?", a: "Il peut faire la recherche : vérifier les prix de vente réalisés et le taux d'écoulement dans Terapeak, comparer les annonces concurrentes, établir une présélection avec des marges estimées et demander des devis aux fournisseurs. La décision d'achat, la négociation des conditions et la dépense elle-même doivent rester entre vos mains. Considérez la présélection de l'assistant comme un élément de votre jugement, et vérifiez vous-même un échantillon des chiffres." },
      { q: "Faut-il des procédures écrites avant d'engager un assistant eBay ?", a: "Il vous faut quelque chose, sans que ce soit forcément soigné. Une note d'une page par tâche, qui couvre les étapes, la règle à appliquer et le moment où il faut vous consulter, suffit pour commencer. Des enregistrements d'écran conviennent aussi. Un assistant peut mettre ces notes au propre en vraies procédures à mesure qu'il apprend, ce qui vous laisse une documentation que vous n'aviez pas auparavant." },
    ],
  },
  "marketplaces/ebay-account-health": {
    title: "Ce qu'il faut savoir avant de faire appel à un spécialiste de la santé du compte eBay",
    sections: [
      {
        heading: "Avez-vous besoin d'une aide extérieure pour votre statut eBay ?",
        body: [
          "La plupart des vendeurs eBay découvrent ce service à un mauvais moment : le tableau de bord affiche Below Standard, un lot d'annonces a été retiré, les limites de vente ont été abaissées ou le compte est restreint. Si vous en êtes là, la question utile est de savoir si vous connaissez la cause. Lorsque l'avis désigne un problème clair et réparable, vous pouvez peut-être le régler vous-même. Lorsque les défauts continuent d'arriver sans que vous compreniez pourquoi, un spécialiste vous évite de deviner.",
          "L'autre bon moment se situe avant tout cela, quand eBay représente une part sérieuse de vos revenus et qu'une seule mauvaise évaluation ferait mal. Pour mesurer l'enjeu, passez vos chiffres dans notre calculateur gratuit de rentabilité marketplace, puis refaites le calcul avec les frais plus élevés qui peuvent s'appliquer à un compte Below Standard, en prenant les taux affichés dans votre propre compte.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Le prix dépend du type d'aide et de la quantité de recherches nécessaires :",
        ],
        bullets: [
          "Un appel ou un audit ponctuel, ou une surveillance régulière d'un cycle d'évaluation à l'autre.",
          "Le nombre de défauts, de litiges et d'annonces retirées à examiner un par un.",
          "L'endroit où se trouve la cause. Un défaut d'annonce se corrige dans Seller Hub ; un défaut lié au transporteur, au fournisseur ou à l'entrepôt oblige à changer le fonctionnement de votre entreprise.",
          "Le nombre de sites eBay et de catégories où le compte vend, puisque les indicateurs de service sont comparés au sein des catégories.",
          "Le degré d'organisation de vos archives : preuves de suivi, factures fournisseurs, messages des acheteurs.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail commencé",
        body: [
          "On vous demandera les avis d'eBay tels que vous les avez reçus, un accès au tableau de bord vendeur et aux indicateurs de service, ainsi que vos registres d'expédition et de retours. Attendez-vous à des questions directes sur l'exactitude du stock, le délai de traitement et les transporteurs que vous utilisez, car beaucoup de défauts naissent dans les opérations quotidiennes et non sur eBay même.",
          "Le travail se divise ensuite. Les points urgents assortis d'échéances, comme les litiges ouverts, sont traités en premier. Les causes sont corrigées ensuite, et c'est seulement après qu'un appel ou une demande de retrait de défaut est préparé pour que vous le soumettiez. Le rétablissement d'un niveau de vendeur est progressif par nature : eBay évalue sur une période de référence passée, si bien que les anciens défauts continuent de compter jusqu'à ce qu'ils en sortent. Ce qui peut être fait, et à quelle échéance, figure dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Un bon travail se voit à la baisse des nouveaux défauts, pas seulement à un appel accepté. Demandez un relevé simple : chaque défaut, sa cause, ce qui a été changé. Vérifiez ensuite la tendance sur votre propre tableau de bord et dans les indicateurs de service de vos catégories.",
          "Considérez ces points comme des raisons de chercher ailleurs :",
        ],
        bullets: [
          "Une réactivation garantie, ou l'évocation d'un contact au sein d'eBay.",
          "La suggestion de créer un nouveau compte pour contourner une suspension, ce qu'eBay n'autorise pas.",
          "Des pressions sur les acheteurs pour qu'ils modifient leur évaluation en échange d'un remboursement, ce qui enfreint les règles d'eBay sur les évaluations.",
          "Un appel qui s'excuse longuement et ne nomme ni cause ni changement.",
        ],
      },
    ],
    faqs: [
      { q: "Comment devenir vendeur Top Rated sur eBay ?", a: "C'est eBay qui fixe les critères, et ils portent sur l'ancienneté du compte, un volume minimal de ventes, de faibles taux de défauts et d'expéditions tardives, peu de litiges clos sans résolution par le vendeur et un suivi transmis à temps. Les chiffres exacts diffèrent selon le site eBay et changent de temps à autre : consultez-les dans votre tableau de bord vendeur, qui indique aussi où vous en êtes pour chacun." },
      { q: "Une évaluation négative affecte-t-elle mon niveau de vendeur eBay ?", a: "Pas directement. Le niveau de vendeur est calculé à partir des défauts de transaction, des expéditions tardives et des litiges clos sans résolution par le vendeur, et les évaluations ne font pas partie de ces mesures. Elles comptent malgré tout, parce que les acheteurs les lisent avant d'acheter et qu'une série de plaintes renvoie en général aux mêmes fautes que celles qui causent les défauts. Corrigez la cause et les deux s'améliorent." },
      { q: "Pourquoi eBay a-t-il limité ce que je peux vendre ?", a: "eBay applique des limites de vente mensuelles, sur le nombre d'objets et sur leur valeur totale, surtout aux comptes récents et à ceux pour lesquels il souhaite d'abord voir davantage d'historique. Les limites sont revues à mesure que vous accumulez des ventes et un bon service, et vous pouvez demander à eBay de les relever. Une demande a plus de poids lorsque vos indicateurs sont propres et que vous pouvez montrer le stock et l'entreprise qui se trouvent derrière le compte." },
    ],
  },
  "marketplaces/ebay-advertising": {
    title: "Ce qu'il faut savoir avant de payer pour la gestion de votre publicité eBay",
    sections: [
      {
        heading: "Faut-il déjà sponsoriser vos annonces eBay ?",
        body: [
          "La mise en avant est rentable quand une annonce convertit déjà et a simplement besoin d'être vue par plus de monde. Regardez d'abord les impressions et le taux de conversion des ventes de chaque annonce dans Seller Hub. Beaucoup de vues et peu de ventes désignent le prix, les photos ou les conditions de livraison, et la publicité ne fera que rendre cela plus coûteux. Peu de vues avec un bon taux de conversion : voilà le cas où la publicité aide.",
          "Trouvez ensuite votre plafond. Dans une campagne au coût par vente, les frais publicitaires s'ajoutent aux frais de vente habituels d'eBay : le taux publicitaire que vous pouvez supporter correspond donc à la marge qui reste après le coût d'achat, les frais et le port, moins le bénéfice que vous voulez conserver. Notre calculateur ACoS gratuit vous donne ce seuil de rentabilité.",
        ],
      },
      {
        heading: "Ce qui détermine le coût de la gestion des publicités eBay",
        body: [
          "Ce qu'eBay facture pour les publicités et ce qu'une agence facture pour les gérer sont deux lignes différentes. La seconde dépend de :",
          "Le coût des publicités elles-mêmes est dicté par la concurrence dans votre catégorie, qu'aucun gestionnaire ne maîtrise.",
        ],
        bullets: [
          "Le nombre d'annonces sponsorisées, et le nombre de groupes de marge entre lesquels elles se répartissent.",
          "Les types de campagnes utilisés. Les campagnes au coût par vente sur tout un catalogue demandent des révisions de taux ; les campagnes au coût par clic demandent en plus un travail sur les mots-clés, les enchères et le budget.",
          "L'inclusion ou non de campagnes hors site.",
          "L'ampleur des corrections d'annonces nécessaires avant que la mise en avant ait un sens.",
          "Le nombre de sites eBay sur lesquels vous faites de la publicité.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois les campagnes en cours",
        body: [
          "On vous demandera des autorisations publicitaires sur le compte, vos coûts par groupe de produits et une décision sur les annonces qui ne doivent jamais être sponsorisées, par exemple celles dont la marge ou le stock est trop faible.",
          "Commencez petit. Une première étape raisonnable sponsorise un ensemble limité d'annonces, afin de pouvoir comparer les ventes sponsorisées et les autres. Un point à comprendre tôt : dans les campagnes au coût par vente, une vente compte comme vente publicitaire lorsque l'acheteur a cliqué sur la publicité et acheté pendant la fenêtre d'attribution d'eBay, même si cet acheteur vous aurait peut-être trouvé de toute façon. Les résultats se lisent donc une fois cette fenêtre refermée, et le rythme des bilans est convenu dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Le test honnête est le bénéfice total par annonce, ventes organiques et sponsorisées réunies, avant et après. Si les ventes sponsorisées montent pendant que les ventes organiques baissent d'autant, vous payez des frais sur des ventes que vous aviez déjà. Demandez les deux colonnes dans chaque rapport.",
          "Soyez prudent lorsque vous voyez :",
        ],
        bullets: [
          "Le taux publicitaire suggéré par eBay appliqué à tout le catalogue sans égard pour vos marges.",
          "Toutes les annonces sponsorisées par une règle automatique, y compris celles qui n'ont aucune place pour des frais.",
          "Des budgets au coût par clic laissés actifs sur des mots-clés qui accumulent les clics sans aucune vente.",
          "Des rapports qui s'arrêtent aux impressions et aux clics.",
        ],
      },
    ],
    faqs: [
      { q: "Les Promoted Listings d'eBay améliorent-elles le classement organique ?", a: "eBay ne dit pas que payer des publicités fait monter la position organique d'une annonce. Les ventes supplémentaires s'ajoutent bien à l'historique de ventes de l'annonce, qui est l'un des éléments pris en compte par la recherche Best Match d'eBay : un effet indirect est donc possible. Ne l'intégrez pas à votre calcul de marge. Décidez de la mise en avant d'après le bénéfice que laissent les ventes sponsorisées elles-mêmes." },
      { q: "Qui peut utiliser les Promoted Listings d'eBay ?", a: "eBay fixe des règles d'éligibilité pour les vendeurs et pour les annonces. Elles ont en général exigé un niveau de vendeur Above Standard ou Top Rated et un historique de ventes récent, et tous les formats d'annonce ou toutes les catégories ne sont pas admis. La vérification la plus simple est l'onglet Publicité de Seller Hub : il montre quels types de campagnes votre compte peut créer et quelles annonces sont éligibles." },
      { q: "Comment calculer mon taux publicitaire de rentabilité sur eBay ?", a: "Prenez le prix de vente, y compris les frais de port payés par l'acheteur. Soustrayez le coût d'achat, les frais de vente d'eBay, votre coût de port et d'emballage et les taxes que vous devez reverser. Divisez ce qui reste par le prix de vente. Le résultat, en pourcentage, est le taux publicitaire auquel une vente sponsorisée ne rapporte rien. Votre taux de travail doit se situer en dessous, de l'écart correspondant au bénéfice qu'il vous faut." },
    ],
  },
};
