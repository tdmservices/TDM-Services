import type { ServiceGuides } from "../types";

export const guides: ServiceGuides = {
  "ai/ai-development": {
    title: "Ce qu'il faut savoir avant de commander une application d'IA sur mesure",
    sections: [
      {
        heading: "Un développement IA sur mesure est-il fait pour vous maintenant ?",
        body: [
          "Un développement sur mesure se justifie quand vous pouvez nommer une tâche précise, les personnes qui utiliseront l'outil et les contenus sur lesquels il doit s'appuyer. Si le besoin se résume encore à « il faudrait faire quelque chose avec l'IA », un abonnement à un assistant généraliste et une période d'usage réel par votre équipe vous en apprendront plus qu'un projet.",
          "Regardez aussi vos contenus : un assistant qui répond à partir de procédures périmées ou de grilles tarifaires contradictoires les répétera. Notre générateur gratuit de brief de projet IA vous aide à décrire la tâche, les utilisateurs et les données sous une forme que n'importe quel prestataire peut chiffrer.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: [
          "Une application d'IA entraîne deux factures : le développement, et l'usage facturé par le fournisseur du modèle à chaque requête. Demandez deux estimations distinctes. Le développement varie selon ces facteurs :",
        ],
        bullets: [
          "Le nombre de tâches distinctes confiées à l'application. Une tâche bien définie est bien plus simple à construire et à tester qu'un assistant généraliste.",
          "L'état de vos contenus : un texte propre s'indexe facilement, les PDF scannés et les tableurs demandent une préparation.",
          "Le nombre de systèmes dans lesquels elle doit lire ou écrire.",
          "Le public visé. Un assistant ouvert au public exige des tests et une surveillance plus stricts qu'un outil interne destiné à une petite équipe.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "Attendez-vous à ce qu'on vous demande très tôt des documents d'exemple, un accès à un environnement de test et, surtout, une liste de vraies questions accompagnées des réponses que vous jugeriez acceptables. Cette liste devient l'étalon de tout le projet : c'est donc la personne qui connaît le mieux le sujet qui doit la rédiger.",
          "Vous aurez aussi à trancher des points que vous seul pouvez décider : les sujets interdits, le moment où une conversation est transmise à une personne, et qui tient les contenus à jour après la mise en service. L'ordre et le calendrier des étapes dépendent du brief et sont fixés dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Jugez l'application sur vos propres questions, pas sur un scénario de démonstration. Demandez à voir le score obtenu sur le jeu de tests convenu, les cas en échec et ce qui a été modifié en conséquence.",
          "Méfiez-vous d'un prestataire qui chiffre avant d'avoir vu vos contenus, ne propose aucun moyen de mesurer la qualité des réponses, ne sait pas dire ce que coûte une requête type, ou lie l'application à un seul modèle au point qu'en changer reviendrait à tout recommencer.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il développer une application d'IA sur mesure ou utiliser un outil du marché ?", a: "Commencez par un produit du marché s'il fait le travail : de nombreux outils de support, CRM et suites bureautiques intègrent désormais des fonctions d'IA. Le sur-mesure se justifie quand l'outil ne peut pas accéder à vos données, ne peut pas suivre vos règles, ou quand la fonction fait partie du produit que vous vendez." },
      { q: "Faut-il entraîner ou affiner un modèle sur nos données ?", a: "En général, non. La plupart des applications professionnelles fournissent au modèle les documents utiles au moment de la question, une méthode appelée recherche documentaire (retrieval), plus facile à tenir à jour qu'un entraînement. L'affinage (fine-tuning) convient à une tâche étroite et répétitive où un format constant compte et pour laquelle vous disposez de nombreux bons exemples." },
      { q: "Qui tient un assistant IA à jour après son lancement ?", a: "Quelqu'un de votre côté doit être responsable des contenus, car l'assistant répète ce que disent les documents sources. Convenez avant le développement de la façon dont les nouveaux documents sont ajoutés et de la personne qui relit les conversations signalées. La maintenance technique peut rester chez le prestataire, mais la responsabilité de ce que dit l'assistant vous revient." },
    ],
  },
  "ai/mcp-development": {
    title: "Ce qu'il faut savoir avant de commander un serveur MCP",
    sections: [
      {
        heading: "Un serveur MCP est-il fait pour vous maintenant ?",
        body: [
          "Un serveur MCP mérite d'être construit quand vos équipes utilisent déjà un assistant IA au quotidien et y recopient sans cesse des données issues des mêmes systèmes. Si l'assistant ne fait pas encore partie des habitudes de travail, le connecteur restera inutilisé.",
          "Vérifiez qu'un connecteur n'existe pas déjà avant d'en payer un. De nombreux éditeurs de logiciels publient désormais leur propre serveur MCP, et la version officielle est généralement le meilleur choix lorsqu'elle couvre votre besoin. Un serveur sur mesure se justifie pour des systèmes internes, ou quand la version de l'éditeur expose plus que ce que vous voulez rendre accessible à vos équipes. Notre générateur gratuit de brief de projet IA permet de lister rapidement les systèmes, les tâches et les limites avant de demander un devis.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Le prix suit la quantité de conception soignée, pas la quantité de code. Les principaux facteurs sont :"],
        bullets: [
          "Le nombre d'actions que l'assistant peut effectuer, et la part de celles qui modifient des données au lieu de seulement les lire.",
          "La qualité de l'API du système concerné : documentée et stable, ou incomplète.",
          "Le mode d'authentification. Rattacher chaque requête au compte d'un utilisateur précis demande plus de travail qu'une clé unique partagée, et c'est presque toujours le bon choix.",
          "Le nombre d'assistants différents à prendre en charge et à tester.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "Le travail commence par des questions, pas par du code. On vous demandera des exemples de demandes formulées avec les mots de vos équipes, un compte de test pour chaque système et un interlocuteur capable d'accorder les accès à l'API.",
          "Attendez-vous à une série de décisions sur les limites : quels enregistrements sont hors périmètre, quelles actions exigent un clic de confirmation et ce qui est journalisé. Viennent ensuite les tests avec les personnes qui utiliseront le connecteur, car les formulations réelles révèlent des lacunes que les tests d'un développeur ne montrent jamais. Le calendrier est convenu dans le plan, puisqu'il dépend du nombre de systèmes et d'actions concernés.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Demandez à un collègue qui n'a pas participé au projet d'essayer le serveur avec des demandes ordinaires et observez trois choses : l'assistant choisit-il le bon outil, ne renvoie-t-il que ce que cette personne a le droit de voir, et indique-t-il clairement quand quelque chose échoue ?",
          "Signaux d'alerte : une clé administrateur unique partagée par tout le monde, un outil qui accepte des requêtes brutes sur la base de données, des actions de suppression ou d'envoi sans confirmation, et l'absence de journal. Un texte récupéré dans des e-mails ou des pages web peut contenir des instructions destinées à l'assistant : demandez donc comment la conception limite les dégâts si cela se produit.",
        ],
      },
    ],
    faqs: [
      { q: "Peut-on utiliser un serveur MCP existant au lieu d'en développer un ?", a: "Souvent, oui. Consultez d'abord la documentation de l'éditeur du logiciel. Préférez les serveurs publiés par l'entreprise qui conçoit le logiciel, et examinez le code et les autorisations de tout serveur tiers avant de le relier à des données réelles, car il agira avec les accès que vous lui donnez." },
      { q: "Quelle est la différence entre un serveur MCP local et un serveur MCP distant ?", a: "Un serveur local s'exécute sur l'ordinateur de l'utilisateur et est lancé par l'application de l'assistant, ce qui convient aux développeurs. Un serveur distant s'exécute à une adresse hébergée et s'utilise par Internet après authentification : toute une équipe peut donc s'en servir sans rien installer." },
      { q: "Relier un assistant via MCP signifie-t-il que nos données servent à entraîner des modèles d'IA ?", a: "MCP ne fait que transporter des données entre l'assistant et votre système. La suite dépend des conditions du fournisseur de l'assistant et de votre formule d'abonnement : lisez donc les conditions en vigueur pour le produit que vous utilisez. Le serveur peut aussi être conçu pour ne renvoyer que les champs nécessaires à une tâche." },
    ],
  },
  "ai/ai-automation": {
    title: "Ce qu'il faut savoir avant d'automatiser un travail avec des agents IA",
    sections: [
      {
        heading: "L'automatisation par l'IA est-elle faite pour vous maintenant ?",
        body: [
          "Le meilleur premier candidat est une tâche que votre équipe effectue déjà de la même façon plusieurs fois par semaine, et dont vous pourriez expliquer à une nouvelle recrue comment la réaliser et comment distinguer un bon résultat d'un mauvais. Si personne ne sait décrire les règles, un agent ne les découvrira pas.",
          "Comptez les heures avant de commander quoi que ce soit. Notre calculateur gratuit de ROI de l'automatisation transforme le temps que prend une tâche, sa fréquence et le coût de ce temps en un chiffre que vous pouvez comparer à un devis. Si le gain est faible, mieux organiser le processus peut être une meilleure dépense.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Le prix d'un agent dépend moins de l'IA que de tout ce qu'il doit manipuler et du niveau de contrôle que la tâche mérite :"],
        bullets: [
          "La variété des données d'entrée. Des e-mails dactylographiés dans une seule langue sont plus simples que des formulaires manuscrits, des notes vocales et un mélange de langues.",
          "Le nombre de systèmes dans lesquels l'agent lit et écrit.",
          "Le coût d'une erreur. Un travail qui touche à l'argent, aux contrats ou aux données personnelles demande davantage d'étapes de relecture et de tests.",
          "Le nombre d'exceptions du processus, puisque chacune exige une règle ou un renvoi vers une personne.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "On vous demandera des exemples réels, et en grand nombre : d'anciens e-mails, documents et tickets, avec ce que votre équipe a fait de chacun. Incluez les cas délicats, car un agent réglé uniquement sur des cas propres échoue au premier cas désordonné.",
          "Désignez une personne responsable du processus, qui a le temps de relire les résultats pendant l'essai, car ce sont ses corrections qui améliorent l'agent. Expliquez tôt aux équipes ce qui change et pourquoi. La durée de la période supervisée dépend de la tâche et est convenue dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Fixez les indicateurs avant le lancement : la part des cas traités sans correction, la part transmise à une personne et le coût par cas. Continuez à vérifier un échantillon à la main même quand tout semble bien se passer, car la qualité peut dériver lorsque vos données d'entrée ou le modèle utilisé changent.",
          "Parmi les signaux d'alerte : une promesse d'autonomie totale dès le premier jour, aucun test sur vos propres cas passés, aucun journal lisible, aucun moyen de mettre l'agent en pause rapidement, et des taux de précision annoncés sans dire comment ils ont été mesurés.",
        ],
      },
    ],
    faqs: [
      { q: "Quelle est la différence entre un agent IA et un chatbot ?", a: "Un chatbot répond à une personne qui lui écrit. Un agent reçoit un objectif et des outils, puis déroule les étapes lui-même : il lit les données d'entrée, décide quoi faire, agit dans vos systèmes et rend compte, souvent sans aucune conversation." },
      { q: "Faut-il remettre de l'ordre dans notre processus avant de l'automatiser avec l'IA ?", a: "Oui, au moins dans les grandes lignes. Vous n'avez pas besoin d'une documentation parfaite, mais d'un accord sur les étapes, sur les règles des cas courants et sur la personne qui tranche les exceptions. Cartographier le processus supprime souvent des étapes qui n'avaient jamais été nécessaires, ce qui est déjà une économie." },
      { q: "Que se passe-t-il quand le modèle d'IA derrière notre agent est mis à jour ou retiré ?", a: "Les fournisseurs publient de nouvelles versions de modèles et en retirent d'anciennes, et le comportement peut varier d'une version à l'autre. Un agent bien conçu précise la version exacte du modèle qu'il utilise et est exécuté sur un jeu de tests composé de cas passés avant tout changement. Demandez si ces nouveaux tests font partie du contrat de maintenance." },
    ],
  },
  "ai/workflow-automation": {
    title: "Ce qu'il faut savoir avant d'automatiser vos workflows",
    sections: [
      {
        heading: "L'automatisation des workflows est-elle faite pour vous maintenant ?",
        body: [
          "L'automatisation est rentable quand un processus est stable. Si vous modifiez encore toutes les deux semaines la façon de traiter les prospects, attendez que les étapes se stabilisent, car chaque changement oblige à reconstruire le workflow. Il en va de même pour les outils : automatisez après avoir choisi votre CRM, pas avant.",
          "Un bon test consiste à se demander à quelle fréquence une tâche revient et combien de temps elle prend à la main. Notre calculateur gratuit de ROI de l'automatisation fait ce calcul pour vous et montre si le gain justifie la mise en place. Commencez par un processus qui pose problème, par exemple des réponses trop lentes aux nouvelles demandes.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Vous payez deux choses : le travail de conception et de réalisation, et les abonnements aux plateformes, qui doivent être à votre nom. Ce qui fait varier le premier poste :"],
        bullets: [
          "Le nombre d'applications concernées et l'existence d'un connecteur prêt à l'emploi pour chacune.",
          "Les embranchements. Une suite d'étapes en ligne droite est simple, alors qu'un flux avec conditions, attentes et boucles demande bien plus d'efforts à construire et à tester.",
          "La qualité des données. Doublons, formats incohérents et champs manquants doivent être traités avant que les enregistrements puissent circuler sans risque.",
          "Le choix d'héberger vous-même la plateforme, comme n8n le permet, ce qui ajoute l'installation et l'entretien d'un serveur.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "On vous demandera un accès à chaque outil, ainsi qu'une personne capable d'expliquer ce qui se passe aujourd'hui, y compris les exceptions qui n'existent que dans la tête des gens. Attendez-vous à des questions qui paraissent tatillonnes : que doit-il se passer si la même personne remplit deux fois le formulaire, ou si le paiement échoue après l'envoi de la facture ? Les réponses constituent la conception.",
          "Avant toute mise en service, chaque workflow doit vous être présenté en langage clair et recevoir votre accord. Le calendrier dépend du nombre de workflows et de l'état de vos données, et il est arrêté dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Jugez une automatisation sur ce qui se passe quand quelque chose tourne mal, puisque le chemin normal est la partie facile. Demandez à voir une exécution en échec : qui a été alerté, ce qui a été relancé et comment l'enregistrement a été récupéré.",
          "Signaux d'alerte : des workflows construits dans le compte du prestataire au lieu du vôtre, des mots de passe échangés par messagerie, aucun nom ni aucune note dans les workflows, et un workflow unique et énorme qui fait tout, que personne n'osera modifier plus tard.",
        ],
      },
    ],
    faqs: [
      { q: "Puis-je créer mes automatisations moi-même, sans développeur ?", a: "Pour des liaisons simples entre deux applications répandues, oui : Zapier et Make.com sont conçus pour des non-programmeurs et proposent des modèles. Une aide devient utile quand un flux comporte plusieurs embranchements, touche à l'argent ou aux messages envoyés aux clients, ou ne doit pas échouer en silence." },
      { q: "Que se passe-t-il quand une automatisation tombe en panne ?", a: "Les automatisations tombent en panne pour des raisons banales : une application modifie son API, une connexion expire, un champ est renommé. Un workflow bien conçu alerte une personne désignée avec assez de détails pour agir. Demandez comment les exécutions en échec sont rejouées, afin que les prospects ou les commandes arrivés pendant la panne ne soient pas perdus." },
      { q: "L'automatisation des workflows vaut-elle la peine pour une petite entreprise ?", a: "Souvent plus que pour une grande, car une petite équipe ressent chaque heure passée à ressaisir. Le critère est la fréquence : une tâche effectuée plusieurs fois par jour rentabilise l'automatisation bien plus vite qu'une tâche effectuée une fois par mois. Commencez par les processus qui touchent aux clients ou à la trésorerie." },
    ],
  },
  "ai/ai-data-systems": {
    title: "Ce qu'il faut savoir avant d'investir dans un système de données et d'IA",
    sections: [
      {
        heading: "Un projet data est-il fait pour vous maintenant ?",
        body: [
          "Le signe le plus net, ce sont les désaccords sur les chiffres. Si les ventes, le marketing et la finance arrivent chacun à la même réunion avec un chiffre d'affaires différent, ou si un rapport récurrent coûte à quelqu'un de longues séances d'exports et de copier-coller, le problème vient des fondations, et aucun outil de tableaux de bord ni aucun assistant IA ne le réglera seul.",
          "Si vous fonctionnez avec un ou deux systèmes et que leurs rapports intégrés répondent à vos questions, vous n'avez sans doute pas encore besoin d'un entrepôt de données. Notez les questions auxquelles vous ne savez pas répondre aujourd'hui, car cette liste est le véritable brief. Notre générateur gratuit de brief de projet IA vous fournit une structure pour cela.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Le coût suit le désordre, pas la taille de l'entreprise. Les principaux facteurs :"],
        bullets: [
          "Le nombre de sources, et pour chacune l'existence d'un connecteur standard ou la nécessité d'une extraction sur mesure.",
          "Le degré d'incohérence des données : clients en double, codes produits différents d'un système à l'autre, champs en texte libre.",
          "La profondeur d'historique à charger et le niveau de fraîcheur attendu des données.",
          "Le nombre d'indicateurs qui exigent une définition partagée, ce qui relève plus d'une discussion métier que d'une question technique.",
        ],
      },
      {
        heading: "À quoi vous attendre une fois le travail lancé",
        body: [
          "On vous demandera un accès en lecture à chaque source, des exemples de rapports auxquels vous vous fiez aujourd'hui, et un décideur capable de trancher les définitions : ce qu'est un client actif, à quel moment une vente est enregistrée, quelle devise s'applique. Ces débats sont normaux, et constituent souvent la partie la plus utile du projet.",
          "Attendez-vous à ce que les premiers résultats révèlent des problèmes dans les systèmes sources eux-mêmes, comme des champs que personne ne remplit. Certains se corrigent dans le pipeline, d'autres exigent de changer la façon dont votre équipe saisit les données. L'ordre et le calendrier des travaux sont détaillés dans le plan, puisqu'ils dépendent de ce que l'audit met au jour.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Choisissez quelques chiffres dont vous êtes sûr, par exemple le chiffre d'affaires facturé d'une période clôturée tiré de la comptabilité, et vérifiez que le nouveau système les reproduit. Demandez ensuite ce qui se passe quand un chargement échoue pendant la nuit : qui est prévenu, et le tableau de bord signale-t-il que ses données ne sont plus à jour ?",
          "Soyez prudent si un prestataire veut commencer par les tableaux de bord ou par une couche de chat IA avant que les définitions soient arrêtées, conserve l'entrepôt dans son propre compte cloud, ou laisse la logique de transformation sans documentation.",
        ],
      },
    ],
    faqs: [
      { q: "Peut-on continuer à utiliser des tableurs pour le reporting ?", a: "Les tableurs conviennent très bien pour explorer et pour de petites analyses menées par une seule personne. Ils deviennent un risque quand plusieurs personnes modifient des copies, quand des formules masquent des corrections manuelles et quand un rapport repose sur une seule personne qui se souvient des étapes. Gardez-les comme un endroit où consulter des chiffres issus d'une source unique et maîtrisée." },
      { q: "Qui doit être responsable du système de données dans l'entreprise ?", a: "Désignez un responsable côté métier, et pas seulement un responsable technique. Cette personne valide les définitions des indicateurs, décide qui peut voir quoi et est informée lorsque les contrôles de qualité échouent. Sans responsable, les définitions dérivent et les anciens désaccords sur les chiffres reviennent." },
      { q: "Quel est l'effet du droit de la protection des données sur un entrepôt de données ?", a: "Copier des données personnelles dans un entrepôt constitue un traitement à part entière : les obligations habituelles s'appliquent donc, à savoir une finalité claire, uniquement les champs nécessaires, des accès limités selon le rôle, des durées de conservation et la suppression sur demande. Prenez conseil auprès de votre délégué à la protection des données ou de votre avocat pour votre situation." },
    ],
  },
  "ai/founder-ai-systems": {
    title: "Ce qu'il faut savoir avant de réserver une mise en place de l'IA sur site",
    sections: [
      {
        heading: "Cette mission est-elle faite pour vous maintenant ?",
        body: [
          "Elle convient à un dirigeant qui est lui-même le goulet d'étranglement : la messagerie, les propositions commerciales, les validations et le reporting passent tous par vous, et vous êtes prêt à changer votre façon de travailler. Elle ne convient pas à quelqu'un qui espère déléguer entièrement le sujet, car les systèmes sont construits autour de vos habitudes et vous devrez les utiliser ensuite.",
          "Si vous avez déjà essayé un assistant IA pour quelques tâches, vous saurez pour quelles parties de votre journée vous voulez de l'aide. Lister ces tâches à l'avance, par exemple avec notre générateur gratuit de brief de projet IA, rend le premier échange bien plus précis.",
        ],
      },
      {
        heading: "Ce qui détermine le coût",
        body: ["Les abonnements logiciels sont à part et vous les réglez à chaque fournisseur : demandez donc avant la visite la liste des formules dont vous aurez besoin. La mission elle-même dépend autant de questions pratiques que de questions techniques :"],
        bullets: [
          "Le nombre de domaines de votre travail couverts : les e-mails seulement, ou aussi les réunions, les documents, le recrutement et le reporting.",
          "Le nombre d'outils à connecter, et le fait que vos formules actuelles pour ces outils autorisent ou non les intégrations.",
          "Le nombre de personnes formées en même temps que vous.",
          "L'emplacement de vos locaux, qui détermine le déplacement.",
        ],
      },
      {
        heading: "À quoi vous attendre avant et pendant la visite",
        body: [
          "Avant la visite, on vous demandera de préparer les accès administrateur à vos comptes, des exemples de documents que vous rédigez souvent et une courte liste des tâches qui occupent l'essentiel de votre semaine. Prévenez votre équipe de ce qui se prépare, car on lui demandera comment le travail vous parvient.",
          "Pendant la visite, réservez du temps réel dans votre agenda. La mission échoue si vous êtes en réunion pendant que les systèmes sont configurés sans vous. Attendez-vous à réaliser les tâches vous-même en étant accompagné, ce qui est plus lent que de regarder et bien plus utile. La durée de la visite dépend du périmètre convenu et est confirmée dans le plan.",
        ],
      },
      {
        heading: "Comment juger le travail, et les signaux d'alerte",
        body: [
          "Le test peut se faire avant le départ de quiconque : pouvez-vous, seul, mener à bien chaque tâche convenue avec la nouvelle configuration, modifier une instruction, ajouter un document aux connaissances de l'assistant et désactiver une automatisation ? Vérifiez que chaque compte est enregistré avec l'adresse e-mail de votre entreprise et que vous détenez les droits d'administrateur.",
          "Signaux d'alerte pour toute offre de ce type : des comptes ouverts au nom du prestataire, une formation délivrée sous forme de diaporama au lieu d'une pratique sur votre travail réel, et une passation qui débouche discrètement sur un contrat d'assistance que vous n'avez pas demandé.",
        ],
      },
    ],
    faqs: [
      { q: "Quels abonnements d'IA devrai-je payer ?", a: "Cela dépend des systèmes retenus, mais il s'agit en général d'une formule professionnelle pour un assistant IA, à laquelle s'ajoutent les outils d'automatisation ou de prise de notes prévus par la conception. Les formules professionnelles comptent parce qu'elles s'accompagnent de fonctions d'administration et de conditions sur les données adaptées aux informations d'une entreprise." },
      { q: "Est-il sûr de placer des documents confidentiels de l'entreprise dans un assistant IA ?", a: "Cela peut l'être, avec la bonne formule et les bons réglages. Utilisez des comptes professionnels, pas des comptes personnels, et lisez les conditions du fournisseur pour savoir si vos contenus servent à entraîner des modèles. Décidez à l'avance quelles catégories de documents restent totalement à l'écart, par exemple certains dossiers juridiques ou relatifs au personnel." },
      { q: "Comment amener mon équipe à utiliser l'IA après la mise en place ?", a: "L'adoption suit l'exemple. Quand le dirigeant utilise les systèmes au vu de tous et partage ce qui a fonctionné, l'équipe l'imite. Confiez à chacun une ou deux tâches concrètes à réaliser avec l'IA plutôt qu'une consigne générale de s'en servir, et convenez de ce qui doit toujours être vérifié par une personne." },
    ],
  },
};
