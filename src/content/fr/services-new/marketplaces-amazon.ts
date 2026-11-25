import type { Service, Sector } from "@/lib/types";

export const frAmazonServices: Service[] = [
  {
    slug: "amazon-account-management",
    sector: "marketplaces",
    name: "Gestion de compte Amazon",
    navLabel: "Gestion de compte Amazon",
    shortDesc:
      "La gestion complète de votre compte vendeur Amazon: fiches produits, catalogue, planification des stocks, prix, promotions et reporting, assurés par une seule équipe.",
    metaTitle: "Gestion de compte vendeur Amazon | TDM",
    metaDescription:
      "TDM gère votre compte vendeur Amazon de A à Z: fiches produits, catalogue, stocks, prix, promotions et reporting dans Seller Central. Consultation gratuite.",
    hero: {
      headline: "Votre compte Amazon, bien géré, jour après jour.",
      sub: "Fiches produits, catalogue, planification des stocks, prix, promotions et reporting: gérés dans votre propre compte Seller Central par une équipe qui vous rend des comptes.",
    },
    intro: [
      "La gestion de compte Amazon consiste à faire tourner un compte vendeur au quotidien pour votre compte: créer et tenir à jour les fiches produits, garder un catalogue propre, planifier les stocks avec vous, gérer les prix et les promotions, et rendre compte de ce que le compte a vendu et pourquoi. TDM (The Digital Marketing Services) propose ce service aux propriétaires de marques, aux vendeurs en marque propre, aux revendeurs et aux distributeurs qui vendent sur Amazon et veulent confier leur compte à des personnes qui travaillent dans Seller Central toute la journée, plutôt que de le caser entre deux autres tâches.",
      "Le travail se fait dans votre compte. Vous nous ajoutez via les autorisations utilisateur de Seller Central, avec un accès limité aux zones que nous gérons: le compte, les fiches produits, la marque et les données restent à vous. Nous travaillons aussi bien avec les vendeurs Expédié par Amazon (FBA) qu'avec les vendeurs qui expédient eux-mêmes (FBM), sur une seule marketplace ou sur plusieurs, avec les marques inscrites à Amazon Brand Registry comme avec les vendeurs qui ne le sont pas.",
      "La gestion de compte couvre le volet opérationnel de la vente sur Amazon. Si vous souhaitez aussi faire gérer votre publicité, faire suivre la santé de votre compte ou intégrer un assistant dédié à votre équipe, il s'agit de services TDM distincts, assurés par le même groupe; ils peuvent être réunis sous un interlocuteur unique afin que prix, stocks et publicités soient planifiés ensemble.",
    ],
    features: [
      {
        title: "Création & optimisation des fiches produits",
        desc: "Titres, puces, descriptions, termes de recherche backend et images rédigés et structurés à partir d'une recherche de mots-clés et des règles Amazon applicables à votre catégorie. Pour les vendeurs inscrits à Brand Registry, cela comprend le contenu A+ et un Brand Store.",
      },
      {
        title: "Gestion du catalogue",
        desc: "Nouveaux produits ajoutés un par un ou par fichier plat de catégorie, familles de variations créées et réparées, nœuds de navigation et attributs corrigés, fiches supprimées de la recherche, bloquées ou inactives repérées et rétablies avant qu'elles ne vous coûtent des ventes.",
      },
      {
        title: "Planification des stocks",
        desc: "Niveaux de stock, taux d'écoulement et dates de réapprovisionnement passés en revue avec vous, plans d'expédition FBA créés dans Seller Central, et stocks bloqués, vieillissants ou excédentaires traités. C'est vous qui décidez quoi acheter et quand: nous vous donnons les chiffres pour décider.",
      },
      {
        title: "Prix & Offre en vedette",
        desc: "Des prix fixés en fonction de vos marges après les frais de vente et d'expédition d'Amazon, avec des règles de repricing là où elles ont du sens, des prix minimum et maximum tenus à jour, et l'éligibilité à l'Offre en vedette (Buy Box) surveillée sur chaque produit actif.",
      },
      {
        title: "Promotions & offres",
        desc: "Coupons, remises exclusives Prime, Ventes Flash et autres types d'offres planifiés selon votre calendrier et les événements commerciaux d'Amazon, soumis dans les délais et vérifiés au regard de la marge de chaque produit.",
      },
      {
        title: "Reporting",
        desc: "Des rapports réguliers tirés des rapports d'activité de Seller Central et, pour les marques enregistrées, de Brand Analytics: ventes, sessions, conversion, état des stocks et actions menées, rédigés de façon que vous puissiez vérifier chaque chiffre dans votre propre compte.",
      },
    ],
    process: [
      {
        title: "Audit du compte",
        desc: "Nous examinons le compte tel qu'il est: qualité du catalogue, contenu des fiches, prix, état des stocks, frais, promotions et problèmes en cours, et nous vous disons clairement ce que nous avons constaté.",
      },
      {
        title: "Plan & priorités",
        desc: "Nous convenons de ce qui sera corrigé en premier, des produits qui comptent le plus, de la façon dont les décisions de stock seront partagées et de ce que les rapports doivent montrer.",
      },
      {
        title: "Nettoyage & mise en place",
        desc: "Les erreurs de catalogue sont corrigées, les fiches prioritaires réécrites, les variations restructurées, et les réglages de prix et de promotions alignés sur le plan.",
      },
      {
        title: "Gestion quotidienne",
        desc: "Le compte est travaillé chaque jour ouvré: fiches produits, alertes de stock, prix, offres, dossiers Seller Support et tout ce qu'Amazon signale, en vous tenant informé des décisions qui vous reviennent.",
      },
      {
        title: "Bilan & prochaines étapes",
        desc: "Chaque cycle de reporting se termine par un bilan des chiffres, de ce qui a changé, de ce que nous recommandons pour la suite et de ce dont nous avons besoin de votre part.",
      },
    ],
    faqs: [
      {
        q: "Que fait un gestionnaire de compte Amazon ?",
        a: "Un gestionnaire de compte Amazon prend en charge le volet opérationnel d'un compte vendeur: création et amélioration des fiches produits, tenue du catalogue, planification des stocks avec le vendeur, gestion des prix et des promotions, ouverture et suivi des dossiers Seller Support, et reporting sur les performances. Chez TDM, ce travail est assuré par une équipe dans votre propre compte Seller Central, et c'est vous qui validez les décisions touchant aux stocks, aux prix et au budget.",
      },
      {
        q: "Combien coûte la gestion d'un compte Amazon ?",
        a: "Cela dépend de la taille du catalogue, du nombre de marketplaces, du recours à FBA, à FBM ou aux deux, de l'état actuel du compte et des tâches que vous souhaitez confier. TDM ne publie pas de tarif fixe, car ces facteurs varient énormément d'un vendeur à l'autre. Nous examinons le compte lors d'une consultation gratuite et vous remettons un devis ensuite.",
      },
      {
        q: "Est-ce que je garde le contrôle de mon compte vendeur Amazon ?",
        a: "Oui. Le compte reste enregistré au nom de votre entreprise et vous en demeurez l'utilisateur principal. TDM travaille avec des autorisations d'utilisateur secondaire que vous accordez et pouvez retirer à tout moment, et nous n'avons pas besoin de vos identifiants principaux. Les coordonnées bancaires, les paramètres fiscaux et les autres zones sensibles peuvent rester réservés à vous seul.",
      },
      {
        q: "Gérez-vous les stocks, ou est-ce toujours moi qui décide quoi commander ?",
        a: "C'est vous qui décidez quoi commander et quand le payer. TDM suit les niveaux de stock et le taux d'écoulement, signale les produits qui s'épuisent ou qui dorment trop longtemps, prépare des recommandations de réapprovisionnement et crée les plans d'expédition FBA. Les achats, les relations fournisseurs et l'expédition physique restent entre vos mains ou celles de votre prestataire logistique, sauf accord contraire entre nous.",
      },
      {
        q: "TDM peut-il gérer un compte qui vend sur plusieurs marketplaces Amazon ?",
        a: "Oui. Nous gérons des comptes qui vendent sur une seule marketplace Amazon comme des comptes qui vendent sur plusieurs, y compris des comptes unifiés couvrant plusieurs régions. Chaque marketplace a ses propres fiches, ses frais, ses règles de catégorie et ses événements commerciaux: nous les planifions et en rendons compte séparément, tout en gardant un catalogue cohérent.",
      },
      {
        q: "TDM est-il un partenaire officiel d'Amazon ?",
        a: "Non. TDM est une agence indépendante, sans affiliation avec Amazon ni approbation de sa part. Nous travaillons dans Seller Central avec les mêmes outils que tout vendeur, grâce à l'accès que vous nous donnez.",
      },
    ],
  },
  {
    slug: "amazon-virtual-assistant",
    sector: "marketplaces",
    name: "Assistant virtuel Amazon",
    navLabel: "Assistant virtuel Amazon",
    shortDesc:
      "Des assistants virtuels Amazon formés, qui prennent en charge les tâches quotidiennes de votre compte vendeur et travaillent au sein de votre propre équipe.",
    metaTitle: "Assistant virtuel Amazon | TDM",
    metaDescription:
      "Un assistant virtuel Amazon formé par TDM: mises à jour des fiches, messages commandes et clients, dossiers et reporting, intégré à votre équipe.",
    hero: {
      headline: "Un assistant formé pour le travail quotidien de votre activité Amazon.",
      sub: "Mises à jour des fiches produits, messages liés aux commandes et aux clients, dossiers Seller Support et reporting: pris en charge par un assistant qui suit vos instructions, au sein de votre équipe.",
    },
    intro: [
      "Un assistant virtuel Amazon est un membre d'équipe à distance qui exécute les tâches courantes d'un compte vendeur Amazon: mise à jour des fiches produits, traitement des messages liés aux commandes et aux clients, ouverture et suivi des dossiers, préparation des rapports. TDM (The Digital Marketing Services) met à disposition des assistants déjà formés à Seller Central, pour les vendeurs qui savent comment ils veulent que leur compte soit géré et ont besoin de mains fiables pour le travail quotidien.",
      "Ce n'est pas la même chose que confier le compte à une agence. L'assistant suit vos processus, rejoint vos canaux de communication et reçoit ses directives de vous ou de votre responsable. TDM recrute, forme, emploie et encadre l'assistant, contrôle la qualité du travail et organise les remplacements: vous gagnez un membre d'équipe supplémentaire sans le recrutement ni la gestion RH qui vont habituellement avec.",
      "Chaque assistant dispose de son propre identifiant utilisateur Seller Central, avec les seules autorisations qu'exigent ses tâches: vous ne partagez donc jamais les identifiants principaux du compte. Vous pouvez commencer avec un assistant sur une liste de tâches définie, puis élargir son rôle à mesure que vous voyez comment il travaille.",
    ],
    features: [
      {
        title: "Mises à jour des fiches produits",
        desc: "Détails produits, images, prix et quantités modifiés un par un ou en masse par fichier plat, nouveaux produits importés dans vos modèles, et erreurs de fiches remontées avec leur cause lorsque Amazon en donne une.",
      },
      {
        title: "Appui au traitement des commandes",
        desc: "Commandes expédiées par le vendeur suivies jusqu'à l'envoi, numéros de suivi confirmés, retours et remboursements traités selon votre politique, et commandes en retard ou à problème portées à votre attention avant qu'elles ne pèsent sur vos indicateurs.",
      },
      {
        title: "Messages clients",
        desc: "Réponses à la messagerie acheteur-vendeur dans le délai de réponse fixé par Amazon et dans le respect de ses règles de communication, à partir de réponses que vous avez validées; les messages inhabituels ou sensibles vous sont transmis pour décision.",
      },
      {
        title: "Gestion des dossiers",
        desc: "Dossiers Seller Support ouverts avec les bons justificatifs, relancés jusqu'à ce qu'Amazon réponde correctement, et consignés pour que vous voyiez ce qui est en cours. Cela inclut les erreurs de fiches, les écarts de réception FBA et les demandes de remboursement.",
      },
      {
        title: "Stocks & administration FBA",
        desc: "Niveaux de stock vérifiés par rapport à vos seuils de réapprovisionnement, expéditions FBA créées et étiquetées dans Seller Central, réceptions rapprochées, et stocks bloqués ou invendables listés pour que vous décidiez de la suite.",
      },
      {
        title: "Reporting & saisie de données",
        desc: "Chiffres de ventes, de stocks, de retours et d'avis extraits de Seller Central vers le tableur ou le tableau de bord que vous utilisez déjà, au rythme que vous fixez, ainsi que des recherches sur les concurrents et les produits lorsque vous en faites la demande.",
      },
    ],
    process: [
      {
        title: "Définition du rôle",
        desc: "Nous passons en revue avec vous votre compte et votre journée de travail, et mettons par écrit les tâches, les horaires, les outils et le rattachement hiérarchique de l'assistant.",
      },
      {
        title: "Sélection",
        desc: "TDM vous propose un assistant dont la formation correspond à ces tâches. Vous échangez avec lui avant tout démarrage et pouvez demander quelqu'un d'autre.",
      },
      {
        title: "Accès & intégration",
        desc: "Vous créez un utilisateur Seller Central aux autorisations limitées, vous partagez vos procédures et vos modèles, et l'assistant apprend comment votre entreprise traite chaque tâche.",
      },
      {
        title: "Travail quotidien",
        desc: "L'assistant traite la liste de tâches convenue, vous rend compte dans vos propres canaux et signale tout ce qui sort de son périmètre au lieu de deviner.",
      },
      {
        title: "Encadrement & ajustements",
        desc: "Un superviseur TDM contrôle le travail, s'occupe des questions de performance et de remplacement, et ajuste le rôle ou ajoute des assistants à mesure que vos besoins évoluent.",
      },
    ],
    faqs: [
      {
        q: "Quelles tâches un assistant virtuel Amazon peut-il accomplir ?",
        a: "L'essentiel du travail courant dans Seller Central: création et mise à jour des fiches produits, imports en masse, suivi des commandes, retours et remboursements, messages clients, dossiers Seller Support, création d'expéditions FBA, demandes de remboursement, surveillance des avis, recherches sur les produits et les concurrents, et rapports réguliers. Les décisions de stratégie, d'achats et de budget restent les vôtres, sauf si vous les déléguez.",
      },
      {
        q: "Quelle est la différence entre un assistant virtuel Amazon et la gestion de compte Amazon ?",
        a: "Avec un assistant virtuel, vous dirigez le travail et l'assistant l'exécute au sein de votre équipe. Avec la gestion de compte, TDM planifie et gère le compte pour vous, puis vous en rend compte. Les vendeurs qui ont leurs propres processus et cherchent de la capacité choisissent généralement un assistant. Ceux qui veulent que le compte soit géré pour eux choisissent la gestion de compte.",
      },
      {
        q: "Combien coûte un assistant virtuel Amazon ?",
        a: "Le coût dépend du nombre d'heures dont vous avez besoin, des tâches concernées, du niveau de compétence qu'elles exigent et du nombre d'assistants souhaité. TDM vous présente les options lors d'une consultation gratuite et vous envoie un devis une fois le rôle défini.",
      },
      {
        q: "Est-il sûr de donner à un assistant virtuel l'accès à mon compte Amazon ?",
        a: "L'accès est accordé via les autorisations utilisateur de Seller Central, et non en partageant vos identifiants principaux. Vous choisissez les sections que l'assistant peut consulter ou modifier, vous pouvez lui fermer les paramètres de paiement et de fiscalité, et vous pouvez supprimer l'utilisateur à tout instant. Chaque assistant utilise un identifiant qui lui est propre, conformément aux règles d'Amazon sur l'accès aux comptes.",
      },
      {
        q: "Qui encadre l'assistant au quotidien ?",
        a: "Vous fixez les tâches et les priorités, puisque l'assistant travaille dans votre entreprise. TDM reste l'employeur et se charge du recrutement, de la formation, de l'assiduité, des contrôles qualité et du remplacement si le profil ne convient pas.",
      },
      {
        q: "Un assistant peut-il travailler sur d'autres marketplaces en plus d'Amazon ?",
        a: "Oui, si cela fait partie du rôle que vous définissez. TDM fournit également des assistants pour eBay et Walmart Marketplace, et un même assistant peut couvrir plusieurs canaux lorsque la charge de travail le permet.",
      },
    ],
  },
  {
    slug: "amazon-account-health",
    sector: "marketplaces",
    name: "Spécialiste de la santé du compte Amazon",
    navLabel: "Santé du compte Amazon",
    shortDesc:
      "Surveillance de la santé du compte, résolution des problèmes de politique et de performance, appels et plans d'action pour les comptes ou fiches Amazon suspendus.",
    metaTitle: "Santé du compte Amazon et appels de suspension | TDM",
    metaDescription:
      "TDM surveille la santé de votre compte Amazon, résout les problèmes de politique et de performance, et rédige appels et plans d'action en cas de suspension.",
    hero: {
      headline: "Gardez votre compte Amazon en règle.",
      sub: "Santé du compte surveillée, problèmes de politique et de performance traités tôt, appels et plans d'action rédigés lorsque Amazon désactive un compte ou retire une fiche.",
    },
    intro: [
      "Un spécialiste de la santé du compte Amazon surveille un compte vendeur au regard des politiques et des objectifs de performance d'Amazon, résout les infractions avant qu'elles ne mettent le compte en danger, et prépare les appels lorsqu'un compte ou une fiche a été désactivé. TDM (The Digital Marketing Services) propose ce service aux vendeurs qui veulent une protection continue pour un compte sain, comme à ceux qui font déjà face à des avertissements, à des fiches retirées ou à une suspension.",
      "Le travail s'articule autour de la page État du compte de Seller Central: l'évaluation de l'état du compte (Account Health Rating), les performances du service client, la conformité aux politiques et les performances d'expédition. Nous lisons chaque notification, établissons ce qu'Amazon reproche, réunissons les documents qui y répondent et répondons par le bon canal, sous la forme qu'Amazon attend.",
      "Nous sommes francs sur les limites. Amazon seul décide de rétablir ou non un compte ou une fiche, et aucune agence ne peut promettre l'issue d'un appel. Ce que TDM maîtrise, c'est la qualité du dossier: une cause première exacte, des mesures correctives réellement prises, des mesures préventives crédibles et les justificatifs qui les accompagnent.",
    ],
    features: [
      {
        title: "Surveillance de la santé du compte",
        desc: "L'évaluation de l'état du compte, les infractions aux politiques et les notifications de performance sont vérifiées régulièrement; tout élément nouveau est évalué et porté à votre attention avec une réponse recommandée.",
      },
      {
        title: "Indicateurs de performance",
        desc: "Taux de commandes défectueuses, taux d'expéditions tardives, taux d'annulation avant traitement et taux de suivi valide suivis par rapport aux objectifs d'Amazon, avec identification des commandes et des causes à l'origine de toute dégradation afin de corriger le processus.",
      },
      {
        title: "Résolution des infractions aux politiques",
        desc: "Plaintes pour atteinte à la propriété intellectuelle, plaintes sur l'authenticité et l'état des produits, signalements de produits soumis à restrictions, infractions aux règles des fiches et demandes de documents de sécurité ou de conformité: nous y répondons avec les factures, lettres d'autorisation et certificats qu'Amazon demande.",
      },
      {
        title: "Appels pour le rétablissement de fiches",
        desc: "Appels pour les fiches désactivées, supprimées de la recherche ou retirées, y compris les corrections apportées à la fiche elle-même et l'escalade lorsqu'une première réponse d'Amazon ne tient pas compte des justificatifs fournis.",
      },
      {
        title: "Appels de suspension & plans d'action",
        desc: "Pour les comptes désactivés, un plan d'action rédigé à partir des faits de votre dossier: cause première, mesures correctives et mesures préventives. Cela couvre les suspensions pour performance et pour infraction aux politiques, les notifications de comptes liés et les échecs de vérification d'identité ou de documents.",
      },
      {
        title: "Prévention & conformité",
        desc: "Un examen des fiches, de la documentation fournisseurs, des pratiques d'expédition et de service client au regard des politiques d'Amazon, avec des procédures écrites pour votre équipe et une attention portée aux retours de la Voix du client (Voice of the Customer) et aux motifs de retour avant qu'ils ne deviennent des infractions.",
      },
    ],
    process: [
      {
        title: "Examen du dossier",
        desc: "Nous lisons les notifications, la page État du compte et votre historique avec Amazon, et nous vous demandons les factures, les coordonnées des fournisseurs et les pièces en rapport avec le problème.",
      },
      {
        title: "Cause première",
        desc: "Nous déterminons ce qui s'est passé et pourquoi, y compris ce qui est désagréable à entendre. Un appel bâti sur la mauvaise cause est généralement rejeté.",
      },
      {
        title: "Corriger le problème",
        desc: "Avant tout envoi, le problème de fond est corrigé: fiches modifiées ou retirées, fournisseurs changés, processus d'expédition ou de messagerie réécrits.",
      },
      {
        title: "Préparation & envoi",
        desc: "Nous rédigeons l'appel ou le plan d'action avec ses justificatifs, vous le relisez et le validez, puis il est soumis via Seller Central ou par la voie qu'Amazon indique.",
      },
      {
        title: "Suivi & surveillance",
        desc: "Nous répondons aux demandes d'informations complémentaires d'Amazon, révisons et escaladons lorsque c'est justifié, et continuons à surveiller le compte par la suite.",
      },
    ],
    faqs: [
      {
        q: "TDM peut-il garantir le rétablissement de mon compte Amazon suspendu ?",
        a: "Non. Le rétablissement est décidé par Amazon, et quiconque le garantit promet quelque chose qui échappe à son contrôle. TDM prépare un appel complet et exact, avec les justificatifs qu'Amazon demande, et le suit jusqu'au bout. Certains dossiers ne peuvent pas être gagnés, et si nous pensons que le vôtre en fait partie, nous vous le dirons après l'avoir examiné.",
      },
      {
        q: "Qu'est-ce qu'un plan d'action Amazon ?",
        a: "Un plan d'action est le document qu'Amazon réclame lorsqu'il désactive un compte ou une fiche. Il comporte trois parties: la cause première du problème, les mesures correctives déjà prises pour le résoudre, et les mesures préventives qui empêcheront qu'il se reproduise. Amazon attend un document propre à l'infraction concernée et étayé par des justificatifs, pas des excuses générales.",
      },
      {
        q: "Pourquoi les comptes Amazon sont-ils suspendus ?",
        a: "Parmi les raisons fréquentes: des indicateurs de performance tombés sous les objectifs d'Amazon, des plaintes pour atteinte à la propriété intellectuelle ou sur l'authenticité, la vente de produits soumis à restrictions, des infractions aux règles des fiches, la manipulation des avis ou du classement, un lien avec un autre compte qu'Amazon a désactivé, et l'échec de la vérification d'identité ou d'entreprise. La notification et la page État du compte indiquent normalement laquelle s'applique.",
      },
      {
        q: "Combien de temps prend un appel auprès d'Amazon ?",
        a: "TDM ne peut pas donner de délai, car le temps de réponse est fixé par Amazon et varie selon le type d'infraction et l'équipe qui examine le dossier. Ce sur quoi vous pouvez agir, c'est la rapidité avec laquelle les documents sont réunis et le caractère complet du premier envoi, car les appels incomplets entraînent souvent des demandes à répétition.",
      },
      {
        q: "Combien coûte le suivi de la santé du compte Amazon ou un appel ?",
        a: "Cela dépend de votre besoin, surveillance continue ou aide sur un dossier précis, du type d'infraction, du nombre de fiches ou de marketplaces concernées et de la quantité de justificatifs à rassembler. TDM examine la situation lors d'une consultation gratuite et établit un devis ensuite.",
      },
      {
        q: "Ai-je besoin d'une surveillance de la santé du compte si mon compte est sain ?",
        a: "Cela mérite réflexion si Amazon représente une part importante de votre chiffre d'affaires. La plupart des suspensions font suite à des avertissements, des plaintes ou des baisses d'indicateurs qui étaient visibles en amont. La surveillance permet de les traiter pendant que le compte est encore actif, une position bien meilleure que celle d'un appel après désactivation.",
      },
    ],
  },
  {
    slug: "amazon-advertising",
    sector: "marketplaces",
    name: "Publicité Amazon",
    navLabel: "Publicité Amazon",
    shortDesc:
      "Des campagnes Sponsored Products, Sponsored Brands et Sponsored Display gérées en fonction de vos objectifs de rentabilité, et pas seulement du volume de ventes.",
    metaTitle: "Publicité Amazon et gestion PPC | TDM",
    metaDescription:
      "TDM gère votre PPC Amazon: campagnes Sponsored Products, Sponsored Brands et Sponsored Display pilotées selon des objectifs de profit, reporting vérifiable.",
    hero: {
      headline: "Des publicités Amazon gérées selon votre profit, pas selon vos dépenses.",
      sub: "Sponsored Products, Sponsored Brands, Sponsored Display et formats associés: structurés, enchéris et suivis au regard de la marge de chaque produit.",
    },
    intro: [
      "La gestion de la publicité Amazon recouvre la planification, la création et l'optimisation continue de campagnes au coût par clic qui placent vos produits dans les résultats de recherche Amazon et sur les pages produits. TDM (The Digital Marketing Services) gère Sponsored Products, Sponsored Brands, Sponsored Display et les formats associés pour les vendeurs (sellers) et les fournisseurs (vendors) qui veulent que la dépense publicitaire soit jugée au profit qu'elle laisse, et pas uniquement aux ventes qu'elle génère.",
      "Les objectifs sont fixés produit par produit à partir de vos propres chiffres: prix de vente, coût de revient, frais Amazon et marge que vous devez conserver. Nous en déduisons un ACOS (advertising cost of sales, part des ventes publicitaires absorbée par la dépense) de seuil de rentabilité et convenons d'une cible située en dessous; nous surveillons aussi le TACOS (total advertising cost of sales, dépense publicitaire rapportée aux ventes totales) pour voir si la publicité développe les ventes organiques ou se contente de payer des ventes que vous auriez réalisées de toute façon.",
      "Les campagnes tournent dans votre propre console publicitaire: l'historique, les données et les budgets restent donc sous votre contrôle. Comme la performance publicitaire sur Amazon dépend fortement de la fiche, du prix, des avis et du stock qui se trouvent derrière chaque annonce, nous signalons les problèmes relevés dans ces domaines au fil de l'eau et pouvons travailler aux côtés de la personne qui gère le compte.",
    ],
    features: [
      {
        title: "Sponsored Products",
        desc: "Des campagnes automatiques et manuelles avec ciblage par mots-clés et par produits, organisées pour que la dépense et le retour de chaque produit se lisent clairement, avec des enchères ajustées par type de correspondance et par emplacement.",
      },
      {
        title: "Sponsored Brands",
        desc: "Des annonces bandeau, Store spotlight et vidéo pour les vendeurs inscrits à Brand Registry, qui dirigent les acheteurs vers votre Brand Store ou une sélection de produits et sont mesurées avec les indicateurs de nouveaux clients de la marque (new-to-brand).",
      },
      {
        title: "Sponsored Display",
        desc: "Un ciblage par produits et par audiences qui touche les acheteurs sur les pages de produits concurrents et complémentaires, et qui réengage les personnes ayant consulté vos produits sans acheter.",
      },
      {
        title: "Gestion des mots-clés & des termes de recherche",
        desc: "Les rapports sur les termes de recherche sont exploités pour repérer les requêtes qui convertissent à ajouter et celles qui gaspillent le budget à bloquer par des mots-clés négatifs; pour les marques enregistrées, les données Search Query Performance servent à trouver où vous perdez des parts.",
      },
      {
        title: "Maîtrise des enchères & du budget",
        desc: "Des enchères fixées à partir du taux de conversion de chaque cible et de la marge du produit, des budgets réorientés vers les campagnes qui atteignent leurs objectifs, et des règles budgétaires préparées en amont des événements commerciaux d'Amazon.",
      },
      {
        title: "Reporting & formats publicitaires avancés",
        desc: "Des rapports présentant dépense, ventes, ACOS, TACOS et profit estimé par produit, ainsi que des campagnes Sponsored TV et Amazon DSP lorsque vos objectifs et votre budget les rendent pertinentes.",
      },
    ],
    process: [
      {
        title: "Marges & audit",
        desc: "Nous recueillons vos coûts et vos frais par produit, calculons l'ACOS de seuil de rentabilité, et auditons les campagnes existantes, les termes de recherche et les dépenses gaspillées.",
      },
      {
        title: "Stratégie & structure",
        desc: "Nous fixons une cible pour chaque produit ou groupe de produits, choisissons les formats publicitaires qui lui conviennent et concevons une structure de campagnes qui garde les données lisibles.",
      },
      {
        title: "Création & lancement",
        desc: "Campagnes, groupes d'annonces, cibles et mots-clés négatifs sont créés dans votre console publicitaire, vérifiés au regard de l'état de préparation des fiches et du stock, puis lancés.",
      },
      {
        title: "Optimisation",
        desc: "Les termes de recherche sont récoltés, les enchères et les emplacements ajustés, les cibles peu performantes mises en pause et les budgets rééquilibrés à mesure que les données arrivent.",
      },
      {
        title: "Rapport & plan",
        desc: "Vous recevez un rapport des résultats par rapport à la cible, avec une explication de ce qui a changé, et un plan pour la période suivante.",
      },
    ],
    faqs: [
      {
        q: "Qu'est-ce que le PPC Amazon et comment fonctionne-t-il ?",
        a: "Le PPC Amazon (pay-per-click, ou coût par clic) est une publicité dans laquelle vous enchérissez pour que vos produits apparaissent dans les résultats de recherche Amazon et sur les pages produits, et ne payez que lorsqu'un acheteur clique. Les principaux formats sont Sponsored Products, Sponsored Brands et Sponsored Display. L'emplacement est déterminé par une enchère qui met en balance votre offre et la pertinence de votre produit par rapport à la recherche de l'acheteur.",
      },
      {
        q: "Qu'est-ce qu'un bon ACOS sur Amazon ?",
        a: "Il n'existe pas de bon chiffre unique. Un ACOS raisonnable dépend de votre marge après coût de revient et frais Amazon, et de la finalité de la campagne: un lancement de produit peut justifier un ACOS plus élevé qu'un produit mature censé dégager du profit. TDM calcule l'ACOS de seuil de rentabilité de chaque produit et fixe les cibles à partir de là.",
      },
      {
        q: "Combien dois-je dépenser en publicité Amazon ?",
        a: "Le bon budget découle de vos marges, du coût des clics dans votre catégorie, du nombre de produits que vous voulez promouvoir et de la vitesse à laquelle vous voulez croître. La dépense publicitaire est payée directement à Amazon depuis votre compte, et les honoraires de gestion de TDM sont distincts. Nous abordons les deux lors d'une consultation gratuite et établissons un devis ensuite.",
      },
      {
        q: "Faut-il être inscrit à Brand Registry pour faire de la publicité sur Amazon ?",
        a: "Pas pour tout. Sponsored Products est accessible aux vendeurs professionnels dont les produits éligibles peuvent remporter l'Offre en vedette. Sponsored Brands, les Brand Stores et plusieurs outils de reporting exigent l'inscription à Amazon Brand Registry, qui exige elle-même une marque enregistrée ou en cours d'enregistrement.",
      },
      {
        q: "TDM peut-il promettre un retour précis sur les publicités Amazon ?",
        a: "Non. Les résultats dépendent de votre produit, de votre prix, de vos avis, de votre stock, de la concurrence et de l'enchère d'Amazon, et rien de tout cela ne peut être garanti. Ce à quoi nous nous engageons, c'est à gérer les campagnes selon des cibles convenues avec vous, à vous dire honnêtement lorsqu'un produit ne peut pas être promu de façon rentable, et à vous montrer des chiffres que vous pouvez vérifier dans votre propre console publicitaire.",
      },
      {
        q: "TDM reprendra-t-il mes campagnes existantes ou repartira-t-il de zéro ?",
        a: "Nous commençons par un audit. Les campagnes qui fonctionnent et portent un historique utile sont conservées et restructurées progressivement, afin que leurs données ne soient pas perdues. Les campagnes mal structurées ou impossibles à mesurer sont remplacées. Vous voyez les changements proposés avant qu'ils ne soient appliqués.",
      },
    ],
  },
];

export const frMarketplacesSector: Sector = {
  slug: "marketplaces",
  name: "Marketplaces",
  tagline: "Vos comptes Amazon, eBay et Walmart, gérés par des spécialistes.",
  metaTitle: "Services marketplaces Amazon, eBay et Walmart | TDM",
  metaDescription:
    "TDM gère vos comptes Amazon, eBay et Walmart: gestion de compte, assistants virtuels, santé du compte et publicité. Consultation gratuite.",
  hero: {
    headline: "La vente sur marketplaces, gérée de bout en bout.",
    sub: "Gestion de compte, assistants virtuels, santé du compte et publicité pour les vendeurs Amazon, eBay et Walmart: une seule équipe, qui travaille dans vos propres comptes.",
  },
  intro: [
    "TDM Marketplaces s'occupe des comptes vendeurs sur Amazon, eBay et Walmart Marketplace. Sur chaque plateforme, nous proposons les quatre mêmes services: gestion de compte, assistants virtuels formés, santé du compte et publicité. Ils s'adressent aux propriétaires de marques, aux vendeurs en marque propre, aux revendeurs et aux distributeurs qui veulent que le travail soit fait par des personnes qui passent leurs journées dans Seller Central, eBay Seller Hub et Walmart Seller Center.",
    "Vous pouvez prendre un seul service sur une seule marketplace ou en combiner plusieurs sur les trois. Le travail se fait toujours dans des comptes qui vous appartiennent, via un accès utilisateur que vous accordez et pouvez retirer, et il est restitué en chiffres que vous pouvez vérifier par vous-même. TDM est une agence indépendante, sans affiliation avec Amazon, eBay ou Walmart.",
  ],
  faqs: [
    {
      q: "Quels services marketplaces TDM propose-t-il ?",
      a: "TDM propose la gestion de compte, des assistants virtuels, la santé du compte et la publicité aux vendeurs présents sur Amazon, eBay et Walmart Marketplace. La gestion de compte couvre les fiches produits, le catalogue, la planification des stocks, les prix, les promotions et le reporting. La santé du compte couvre la surveillance, les problèmes de politique et de performance, et les appels. La publicité couvre les formats d'annonces sponsorisées propres à chaque plateforme.",
    },
    {
      q: "Sur quelles marketplaces TDM travaille-t-il ?",
      a: "Amazon, eBay et Walmart Marketplace. Beaucoup de vendeurs commencent par la plateforme où ils réalisent l'essentiel de leurs ventes et ajoutent les autres ensuite. Chaque marketplace a ses propres règles, ses frais et ses outils: nous traitons donc chaque compte selon ses spécificités, tout en gardant produits, prix et stocks cohérents de l'une à l'autre.",
    },
    {
      q: "Faut-il choisir la gestion de compte ou un assistant virtuel ?",
      a: "Choisissez la gestion de compte si vous voulez que TDM planifie et gère le compte, puis vous en rende compte. Choisissez un assistant virtuel si vous avez déjà votre propre façon de travailler et avez besoin d'une personne formée pour exécuter les tâches quotidiennes sous votre direction. Certains vendeurs utilisent les deux: un assistant pour le travail courant et des spécialistes TDM pour la publicité ou la santé du compte.",
    },
    {
      q: "Combien coûtent les services marketplaces de TDM ?",
      a: "Le coût dépend des services dont vous avez besoin, du nombre de marketplaces et de produits concernés, et de l'état actuel des comptes. TDM propose une consultation gratuite pour examiner votre situation et vous envoie un devis ensuite.",
    },
  ],
};
