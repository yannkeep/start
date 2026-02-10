// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE — DATA MODULE
// All game content: missions, tools, achievements, flashcards, quotes
// ═══════════════════════════════════════════════════════════════════════════

const RANKS = [
  { name:'NÉOPHYTE',    min:0,    icon:'🌱', color:'#888' },
  { name:'INITIÉ·E',    min:200,  icon:'📖', color:'#2ed573' },
  { name:'ACTIVISTE',   min:500,  icon:'✊', color:'#ffa502' },
  { name:'STRATÈGE',    min:1200, icon:'🎯', color:'#00d9ff' },
  { name:'ARCHITECTE',  min:2500, icon:'🏗️', color:'#c8a2ff' },
  { name:'MAÎTRE·SSE',  min:4000, icon:'⚔️', color:'#7fffd4' },
  { name:'LÉGENDE',     min:6000, icon:'🔥', color:'#ff6ec7' }
];

// ═══ MISSIONS ═══
// All accessible from start. Completing objectives gives XP.
const MISSIONS = [
  {
    id:'arizona', name:'Décrypter l\'Arizona', icon:'🔍',
    cat:'analyse', difficulty:2, xpBase:100,
    brief:'Le gouvernement Arizona (N-VA, MR, Engagés, CD&V, Vooruit) prépare 23 milliards d\'austérité. 30.122 personnes seront exclues du chômage dès la Vague 1. Votre mission : décrypter les 8 failles du budget.',
    lore:'Février 2025. Bart De Wever forme la coalition Arizona après 211 jours de négociations. L\'accord prévoit la limitation des allocations chômage à 24 mois — une rupture du contrat social belge construit depuis 1944.',
    objectives:[
      {id:'az1', text:'Identifier les 8 failles du budget Arizona', xp:20},
      {id:'az2', text:'Documenter les 5 boucles de rétroaction destructrices', xp:25},
      {id:'az3', text:'Cartographier les 30.122 exclusions Vague 1', xp:15},
      {id:'az4', text:'Analyser le piège du taux marginal >100%', xp:20},
      {id:'az5', text:'Comparer Arizona vs ECP (24K€ vs 9,2 Mrd€)', xp:20}
    ],
    intel:[
      {label:'Exclusions V1', value:'30.122', color:'danger'},
      {label:'Exclusions 2027', value:'90.000 est.', color:'danger'},
      {label:'Budget austérité', value:'23 Mrd€', color:'warning'},
      {label:'Inactivité/an', value:'21-24 Mrd€', color:'warning'},
      {label:'Coût/heure inactivité', value:'1M€/h', color:'info'}
    ],
    tools:['swot','arbre','pourquoi']
  },
  {
    id:'deborsu', name:'Affaire Deborsu', icon:'📺',
    cat:'media', difficulty:2, xpBase:80,
    brief:'RTL-TVI diffuse "Tous Fraudeurs" avec un ratio de montage 120:1. Le documentaire stigmatise les allocataires sociaux pendant que l\'Arizona prépare les exclusions. Contre-attaquez par les faits.',
    lore:'Le cadrage épisodique (histoires individuelles) remplace systématiquement le cadrage thématique (causes systémiques). La synecdoque accusatoire — cas individuels érigés en symboles d\'un groupe entier — fabrique l\'ennemi intérieur précaire.',
    objectives:[
      {id:'db1', text:'Déconstruire le cadrage épisodique du documentaire', xp:20},
      {id:'db2', text:'Appliquer l\'analyse Herman-Chomsky au cas RTL-TVI', xp:25},
      {id:'db3', text:'Rédiger une plainte argumentée au CSA', xp:20},
      {id:'db4', text:'Produire un contre-récit sourcé et documenté', xp:15}
    ],
    intel:[
      {label:'Ratio montage', value:'120:1', color:'danger'},
      {label:'Belges AROPE', value:'2,1M (18,3%)', color:'warning'},
      {label:'Étudiants insécurité alim.', value:'58%', color:'danger'},
      {label:'BIM', value:'2,4M (21% pop.)', color:'warning'}
    ],
    tools:['domino','message','alliance']
  },
  {
    id:'art23', name:'Défense Art. 23', icon:'⚖️',
    cat:'juridique', difficulty:3, xpBase:120,
    brief:'L\'article 23 de la Constitution garantit le droit à la sécurité sociale. Le principe de standstill interdit toute régression. Le recours a été introduit le 29/10/2025. Préparez la bataille juridique.',
    lore:'Face à l\'impuissance des urnes, le citoyen belge s\'est tourné vers le juge. C\'est l\'ère de la judiciarisation du politique. Le lawfare citoyen n\'est pas un abus du droit — c\'est son usage légitime face à un État qui s\'en affranchit lui-même (+9.000 condamnations).',
    objectives:[
      {id:'j1', text:'Maîtriser l\'Art. 23 et le principe de standstill', xp:20},
      {id:'j2', text:'Documenter les 4 plaintes CEDH en cours', xp:25},
      {id:'j3', text:'Préparer un dossier d\'interpellation communale', xp:20},
      {id:'j4', text:'Identifier les précédents (Klimaatzaak, Camara)', xp:15},
      {id:'j5', text:'Rédiger une pétition fédérale (objectif 25K signatures)', xp:20}
    ],
    intel:[
      {label:'Recours déposé', value:'29/10/2025', color:'info'},
      {label:'Arrêt CC attendu', value:'Fin 2026', color:'warning'},
      {label:'Plaintes CEDH', value:'4 actives', color:'info'},
      {label:'Condamnations État', value:'+9.000', color:'danger'}
    ],
    tools:['checklist','smart','suivi']
  },
  {
    id:'troisguerres', name:'Les Trois Guerres Civiques', icon:'⚔️',
    cat:'doctrine', difficulty:3, xpBase:150,
    brief:'三种公民战法 — Transposition de la doctrine chinoise des « Trois Guerres » au combat civique belge. Opinion, Dé-sidération, Prétoire : les trois fronts simultanés de la résistance citoyenne.',
    lore:'En 2003, la Commission militaire centrale de la RPC officialise la doctrine des 三种战法 (Sānzhǒng zhànfǎ). La particratie belge, sans le théoriser, mène déjà ses propres « trois guerres » contre la citoyenneté active. Notre réponse : la même architecture, inversée éthiquement.',
    objectives:[
      {id:'tg1', text:'Comprendre la Guerre du Récit (舆论战 civique)', xp:25},
      {id:'tg2', text:'Maîtriser la Dé-sidération (心理战 civique)', xp:25},
      {id:'tg3', text:'Appliquer la Guerre du Prétoire (法律战 civique)', xp:25},
      {id:'tg4', text:'Cartographier les synergies entre les 3 guerres', xp:25},
      {id:'tg5', text:'Identifier les armes de la particratie sur chaque front', xp:25}
    ],
    intel:[
      {label:'Doctrine', value:'三种公民战法', color:'info'},
      {label:'Guerre I', value:'Récit (舆论战)', color:'mint'},
      {label:'Guerre II', value:'Dé-sidération (心理战)', color:'lilac'},
      {label:'Guerre III', value:'Prétoire (法律战)', color:'warning'}
    ],
    tools:['pestel','theorie','acteurs']
  },
  {
    id:'osint', name:'OSINT Citoyen', icon:'🔎',
    cat:'renseignement', difficulty:2, xpBase:90,
    brief:'L\'intelligence en sources ouvertes (OSINT) transforme le citoyen passif en veilleur actif. Apprenez à collecter, vérifier et exploiter les données publiques pour alimenter la résistance.',
    lore:'Le cycle est complet : la veille produit la donnée, l\'analyse la transforme en preuve, la preuve alimente le contentieux, le contentieux crée le fait juridique que le récit peut exploiter. La pyramide DIKW (Données → Information → Connaissance → Sagesse) guide chaque opération.',
    objectives:[
      {id:'os1', text:'Maîtriser la pyramide DIKW appliquée', xp:20},
      {id:'os2', text:'Pratiquer le lead-dexing (suivi nominatif des élus)', xp:25},
      {id:'os3', text:'Exploiter les données ouvertes belges (SPF, BNB, BfP)', xp:20},
      {id:'os4', text:'Produire un rapport OSINT admissible en justice', xp:25}
    ],
    intel:[
      {label:'Documents ouaisfieu', value:'70+ analyses', color:'mint'},
      {label:'Plateformes', value:'11 sites', color:'info'},
      {label:'Mandataires BE', value:'31.806', color:'warning'},
      {label:'Budget ouaisfieu', value:'870€ total', color:'mint'}
    ],
    tools:['domino','fleur','acteurs']
  },
  {
    id:'commune', name:'Interpellation Communale', icon:'🏛️',
    cat:'action', difficulty:1, xpBase:70,
    brief:'Le niveau communal est le premier front accessible. En Wallonie (art. L1122-14), à Bruxelles (25 personnes), chaque citoyen peut interpeller son conseil communal. Passez à l\'action locale.',
    lore:'La consultation populaire est ouverte dès 16 ans, sans condition de nationalité. L\'interpellation citoyenne est le couteau suisse de la pression locale — peu utilisé, redoutablement efficace quand il est bien préparé.',
    objectives:[
      {id:'co1', text:'Identifier votre commune et ses procédures d\'interpellation', xp:15},
      {id:'co2', text:'Rédiger une interpellation sur l\'impact Arizona local', xp:20},
      {id:'co3', text:'Calculer le surcoût CPAS pour votre commune', xp:20},
      {id:'co4', text:'Mobiliser les 25 signatures nécessaires (BXL)', xp:15}
    ],
    intel:[
      {label:'Seuil BXL', value:'25 personnes', color:'info'},
      {label:'Seuil Wallonie', value:'Art. L1122-14', color:'info'},
      {label:'Surcoût CPAS BXL', value:'80M€', color:'danger'},
      {label:'Compensation/an', value:'518€ (dérisoire)', color:'danger'}
    ],
    tools:['smart','checklist','message']
  },
  {
    id:'ecp', name:'Économie Contributive', icon:'🌱',
    cat:'alternative', difficulty:2, xpBase:100,
    brief:'L\'ECP (Économie Contributive Provisionnée) propose une alternative radicale : transformer 978.000 inactifs contraints en contributeurs valorisés sans perte de droits sociaux. Budget : 24.000€ vs 21-24 Mrd€/an d\'inactivité.',
    lore:'Le cadre existe déjà : ruling fiscal SDA + loi volontariat 2005. L\'ECP ne coûte pas — elle fait économiser. Chaque euro investi dans la contribution citoyenne en évite des dizaines en coûts d\'inactivité.',
    objectives:[
      {id:'ec1', text:'Comprendre le mécanisme ECP et le cadre légal existant', xp:20},
      {id:'ec2', text:'Comparer Arizona (9,2 Mrd austérité) vs ECP (24K€)', xp:20},
      {id:'ec3', text:'Identifier les 978.000 inactifs contraints', xp:15},
      {id:'ec4', text:'Rédiger un dossier de ruling fiscal SDA', xp:25},
      {id:'ec5', text:'Calculer le ROI citoyen (1M€/h économisé)', xp:20}
    ],
    intel:[
      {label:'Inactifs contraints', value:'978.000', color:'danger'},
      {label:'Coût inactivité', value:'1M€/h', color:'danger'},
      {label:'Budget ECP', value:'24.000€', color:'mint'},
      {label:'Cadre légal', value:'Ruling SDA + Loi 2005', color:'info'}
    ],
    tools:['theorie','swot','smart']
  },
  {
    id:'coalition', name:'Construction de Coalition', icon:'🤝',
    cat:'strategie', difficulty:2, xpBase:90,
    brief:'Seul on va plus vite, ensemble on va plus loin. Cartographiez les alliés potentiels : syndicats (1,5M membres), associations (BAPN, RWLP, LDH), académiques (DULBEA, IWEPS), et construisez un front commun.',
    lore:'Le militantisme classique sépare l\'éducation populaire, le plaidoyer et la communication en silos qui s\'ignorent. Le modèle des Trois Guerres exige leur intégration opérationnelle.',
    objectives:[
      {id:'cl1', text:'Cartographier alliés / neutres / opposants', xp:20},
      {id:'cl2', text:'Identifier 3-5 députés Vooruit/Engagés à basculer', xp:25},
      {id:'cl3', text:'Rédiger un protocole de partenariat PAC/CRISP', xp:20},
      {id:'cl4', text:'Trouver un partenaire Erasmus+ KA210', xp:25}
    ],
    intel:[
      {label:'Membres syndicaux', value:'1,5M', color:'info'},
      {label:'Objectif députés', value:'3-5 à basculer', color:'warning'},
      {label:'Erasmus+ KA210', value:'30-60K€', color:'mint'},
      {label:'Deadline Erasmus', value:'5 mars 2026', color:'danger'}
    ],
    tools:['alliance','acteurs','cibles']
  },
  {
    id:'particratie', name:'Anatomie de la Particratie', icon:'🏰',
    cat:'analyse', difficulty:3, xpBase:120,
    brief:'La Belgique est une particratie : le pouvoir est concentré dans les mains des présidents de parti. 31.806 mandataires, financement public >80%, listes bloquées, coalitions pré-négociées. Déconstruisez le système.',
    lore:'Le citoyen se sent réduit à du « bétail de vote » (stemvee). 75-80% de défiance envers les partis (Eurobaromètre 2025). La complexité institutionnelle — 6 parlements, 6 gouvernements — n\'est pas un bug, c\'est le bouclier psychologique du système.',
    objectives:[
      {id:'pa1', text:'Comprendre pilarisation, verzuiling et consociationalisme', xp:20},
      {id:'pa2', text:'Analyser le financement public des partis (>80%)', xp:20},
      {id:'pa3', text:'Documenter le mille-feuille institutionnel belge', xp:15},
      {id:'pa4', text:'Comparer avec la Suisse, les Pays-Bas, le Canada', xp:20},
      {id:'pa5', text:'Identifier les verrous constitutionnels (pas de référendum)', xp:25}
    ],
    intel:[
      {label:'Mandataires', value:'31.806 (1/km²)', color:'warning'},
      {label:'Financement public', value:'>80%', color:'danger'},
      {label:'Défiance partis', value:'75-80%', color:'danger'},
      {label:'Parlements', value:'6', color:'info'}
    ],
    tools:['pestel','arbre','fleur']
  },
  {
    id:'financement', name:'Chasse aux Financements', icon:'💰',
    cat:'logistique', difficulty:1, xpBase:80,
    brief:'Budget actuel : 870€ sur 2,5 ans. Objectif : sécuriser des financements pour pérenniser le projet sans compromettre l\'indépendance. 6 pistes identifiées.',
    lore:'Le moratoire Éducation Permanente 2026-2028 bloque la voie principale. Mais des alternatives existent : PCI FWB, Erasmus+ KA210, CERV Citoyens, Fondation Roi Baudouin, Décret OJ, crowdfunding.',
    objectives:[
      {id:'fi1', text:'Évaluer les 6 pistes de financement', xp:15},
      {id:'fi2', text:'Rédiger un dossier PCI FWB (5-35K€)', xp:20},
      {id:'fi3', text:'Préparer une candidature Erasmus+ KA210 (30-60K€)', xp:25},
      {id:'fi4', text:'Contacter la Fondation Roi Baudouin (3,75-50K€)', xp:15},
      {id:'fi5', text:'Lancer un crowdfunding citoyen (1-25K€)', xp:15}
    ],
    intel:[
      {label:'PCI FWB', value:'5-35K€ (95%)', color:'mint'},
      {label:'Erasmus+ KA210', value:'30-60K€ (80%)', color:'mint'},
      {label:'CERV', value:'50-300K€ (75%)', color:'info'},
      {label:'FRB', value:'3,75-50K€ (85%)', color:'mint'}
    ],
    tools:['smart','suivi','domino']
  },
  {
    id:'mld', name:'Dossier Malades Longue Durée', icon:'🏥',
    cat:'analyse', difficulty:2, xpBase:90,
    brief:'500.000+ MLD en Belgique — plus que de chômeurs. Les sanctions sont multipliées par 4 (de 2,5% à 10% des indemnités). 218.000 dossiers réexaminés. L\'Arizona vise les plus vulnérables.',
    lore:'La réactivation forcée des malades de longue durée est l\'angle mort du débat public. L\'INAMI estime à 100.000 les retours au travail — un chiffre irréaliste qui masque l\'ampleur du désastre social à venir.',
    objectives:[
      {id:'ml1', text:'Documenter les 218.000 dossiers MLD réexaminés', xp:20},
      {id:'ml2', text:'Analyser le quadruplement des sanctions', xp:20},
      {id:'ml3', text:'Calculer l\'irréalisme des 100K retours projetés', xp:20},
      {id:'ml4', text:'Rédiger un plaidoyer patient-partenaire', xp:25}
    ],
    intel:[
      {label:'MLD Belgique', value:'500.000+', color:'danger'},
      {label:'Dossiers réexaminés', value:'218.000', color:'danger'},
      {label:'Sanctions', value:'×4 (→10%)', color:'danger'},
      {label:'Retours projetés', value:'100K (irréaliste)', color:'warning'}
    ],
    tools:['pourquoi','arbre','message']
  },
  {
    id:'edperm', name:'Éducation Permanente', icon:'📚',
    cat:'strategie', difficulty:2, xpBase:100,
    brief:'L\'éducation permanente vise l\'émancipation par l\'analyse critique. Objectif ouaisfieu : reconnaissance FWB d\'ici 2042. Défi immédiat : le moratoire 2026-2028 bloque les nouvelles reconnaissances.',
    lore:'Le décret du 17 juillet 2003 définit le cadre. 4 axes : analyse critique, participation citoyenne active, émancipation individuelle et collective, exercice des droits. ouaisfieu coche toutes les cases — reste à le prouver formellement.',
    objectives:[
      {id:'ep1', text:'Comprendre le décret EP 2003 et ses 4 axes', xp:15},
      {id:'ep2', text:'Analyser le moratoire 2026-2028 et ses conséquences', xp:20},
      {id:'ep3', text:'Identifier les alternatives (PCI, opérateur reconnu)', xp:20},
      {id:'ep4', text:'Rédiger le dossier de candidature EP', xp:25},
      {id:'ep5', text:'Cartographier PAC et les mouvements existants', xp:20}
    ],
    intel:[
      {label:'Décret', value:'17 juillet 2003', color:'info'},
      {label:'Moratoire', value:'2026-2028', color:'danger'},
      {label:'Objectif', value:'Reconnaissance 2042', color:'mint'},
      {label:'PAC', value:'Plus grand mvt EP', color:'info'}
    ],
    tools:['theorie','suivi','smart']
  }
];

// ═══ TOOLS (VOIR / JUGER / AGIR) ═══
const TOOLS = [
  {id:1, key:'domino', name:'Domino du Changement', icon:'🎯', phase:'voir', xp:50,
   fields:['vision','obstacles','ressources'],
   help:'Définissez votre vision du changement, identifiez obstacles et ressources disponibles.'},
  {id:2, key:'profil', name:'Profil d\'Engagement', icon:'👤', phase:'voir', xp:50,
   fields:['motivations','competences','temps','limites'],
   help:'Analysez motivations, compétences, temps disponible et limites du groupe.'},
  {id:3, key:'fleur', name:'Fleur de Pouvoir', icon:'🌸', phase:'voir', xp:50,
   fields:['identites','privileges','oppressions'],
   help:'Cartographiez identités sociales, privilèges et systèmes d\'oppression.'},
  {id:4, key:'acteurs', name:'Cartographie Acteurs', icon:'🗺️', phase:'voir', xp:50,
   fields:['allies','opposants','neutres','cibles'],
   help:'Identifiez alliés, opposants, neutres et cibles prioritaires.'},
  {id:5, key:'swot', name:'Analyse SWOT', icon:'📊', phase:'juger', xp:75,
   fields:['forces','faiblesses','opportunites','menaces'],
   help:'Forces/Faiblesses internes, Opportunités/Menaces externes.'},
  {id:6, key:'pestel', name:'Analyse PESTEL', icon:'🌍', phase:'juger', xp:75,
   fields:['politique','economique','social','technologique','environnemental','legal'],
   help:'Macro-environnement : Politique, Économique, Social, Techno, Environnement, Légal.'},
  {id:7, key:'arbre', name:'Arbre à Problèmes', icon:'🌳', phase:'juger', xp:75,
   fields:['probleme_central','causes','effets'],
   help:'Problème central, causes profondes (racines), effets visibles (branches).'},
  {id:8, key:'pourquoi', name:'Les 5 Pourquoi', icon:'❓', phase:'juger', xp:75,
   fields:['symptome','pq1','pq2','pq3','pq4','pq5'],
   help:'Partez d\'un symptôme, posez 5× « Pourquoi? » pour remonter à la cause racine.'},
  {id:9, key:'theorie', name:'Théorie du Changement', icon:'📐', phase:'juger', xp:75,
   fields:['situation_actuelle','changement_vise','activites','resultats','impact'],
   help:'Chemin logique : situation → activités → résultats → impact.'},
  {id:10, key:'alliance', name:'Avec / Sans / Contre', icon:'⚔️', phase:'agir', xp:100,
   fields:['avec','sans','contre'],
   help:'Classez : avec qui s\'allier, sans qui agir, contre qui se mobiliser.'},
  {id:11, key:'smart', name:'Objectifs SMART', icon:'🎯', phase:'agir', xp:100,
   fields:['specifique','mesurable','atteignable','relevant','temporel'],
   help:'Spécifique, Mesurable, Atteignable, Relevant, Temporel.'},
  {id:12, key:'cibles', name:'Cibles & Alliances', icon:'🎪', phase:'agir', xp:100,
   fields:['cible_primaire','cible_secondaire','allies_potentiels','strategie'],
   help:'Cibles de plaidoyer et alliances à construire.'},
  {id:13, key:'message', name:'Construction du Message', icon:'📣', phase:'agir', xp:100,
   fields:['accroche','probleme','importance','cible','action'],
   help:'Accroche → Problème → Importance → Qui agit → Action demandée.'},
  {id:14, key:'checklist', name:'Check-list Rencontre', icon:'📋', phase:'agir', xp:100,
   fields:['objectif','arguments','documents','questions','suivi'],
   help:'Préparez rencontres : objectif, arguments, documents, questions, suivi.'},
  {id:15, key:'suivi', name:'Suivi & Évaluation', icon:'📈', phase:'agir', xp:100,
   fields:['indicateurs','sources','frequence','responsable','ajustements'],
   help:'Mesurer progrès : indicateurs, sources, fréquence, responsables.'}
];

// ═══ ACHIEVEMENTS ═══
const ACHIEVEMENTS = [
  {id:'first_mission', name:'Premier Briefing', desc:'Ouvrir une mission', icon:'📋', xp:15},
  {id:'first_obj', name:'Première Victoire', desc:'Compléter un objectif', icon:'✅', xp:25},
  {id:'mission_complete', name:'Mission Accomplie', desc:'Compléter tous les objectifs d\'une mission', icon:'🎖️', xp:100},
  {id:'five_missions', name:'Vétéran·e', desc:'Compléter 5 missions', icon:'⭐', xp:200},
  {id:'all_missions', name:'Résistance Totale', desc:'Compléter toutes les missions', icon:'🏆', xp:500},
  {id:'first_tool', name:'Premier Outil', desc:'Compléter un outil méthodologique', icon:'🛠️', xp:50},
  {id:'all_tools', name:'Arsenal Complet', desc:'Compléter les 15 outils', icon:'⚔️', xp:300},
  {id:'voir_done', name:'Vision Claire', desc:'Compléter tous les outils VOIR', icon:'👁️', xp:100},
  {id:'juger_done', name:'Jugement Sûr', desc:'Compléter tous les outils JUGER', icon:'⚖️', xp:100},
  {id:'agir_done', name:'Passage à l\'Action', desc:'Compléter tous les outils AGIR', icon:'✊', xp:100},
  {id:'first_file', name:'Premier Fichier', desc:'Importer un fichier', icon:'📁', xp:15},
  {id:'collector', name:'Archiviste', desc:'Avoir 10 fichiers', icon:'📊', xp:75},
  {id:'fc_session', name:'Révision', desc:'Terminer une session flashcards', icon:'📚', xp:30},
  {id:'fc_master', name:'Mémoire Vive', desc:'Réviser 100 cartes', icon:'🧠', xp:100},
  {id:'fc_perfect', name:'Sans Faute', desc:'Session parfaite (10+ cartes, 0 erreur)', icon:'💎', xp:75},
  {id:'night_owl', name:'Hibou Citoyen', desc:'Travailler entre 0h et 5h', icon:'🦉', xp:50},
  {id:'exporter', name:'Sauvegarde', desc:'Exporter un projet', icon:'💾', xp:25},
  {id:'three_guerres', name:'三种公民战法', desc:'Compléter la mission Trois Guerres', icon:'⚔️', xp:150},
  {id:'speed_run', name:'Blitz', desc:'Compléter 3 objectifs en 5 minutes', icon:'⚡', xp:75},
  {id:'explorer', name:'Explorateur·rice', desc:'Visiter toutes les sections du jeu', icon:'🧭', xp:50}
];

// ═══ FLASHCARDS DEMO ═══
const DEMO_FLASHCARDS = [
  {q:"Coalition Arizona — combien de partis?", a:"5 : N-VA, MR, Engagés, CD&V, Vooruit"},
  {q:"Premier ministre Arizona?", a:"Bart De Wever (N-VA)"},
  {q:"Durée max chômage après réforme?", a:"24 mois (2 ans)"},
  {q:"Exclusions Vague 1?", a:"30.122 personnes (janvier 2026)"},
  {q:"Exclusions cumulées 2027?", a:"90.000 estimées"},
  {q:"Art. 23 Constitution — que garantit-il?", a:"Droit à la sécurité sociale, protection santé, logement, travail, culture"},
  {q:"Principe de standstill?", a:"Interdit toute régression du niveau de protection sociale (effet cliquet)"},
  {q:"Date recours constitutionnel?", a:"29 octobre 2025"},
  {q:"Coût inactivité contrainte par heure?", a:"1 million d'euros/heure (21-24 Mrd€/an)"},
  {q:"Combien d'inactifs contraints en Belgique?", a:"978.000 personnes"},
  {q:"Budget ECP vs budget Arizona?", a:"ECP : 24.000€ | Arizona : 9,2 Mrd€ austérité"},
  {q:"Belges en risque de pauvreté (AROPE)?", a:"2,1 millions (18,3% population)"},
  {q:"Nombre de mandataires politiques belges?", a:"31.806 (littéralement 1/km²)"},
  {q:"Financement public des partis belges?", a:">80% (2× le niveau allemand)"},
  {q:"Nombre de parlements en Belgique?", a:"6 parlements + 6 gouvernements"},
  {q:"三种公民战法 — traduction?", a:"Les Trois Guerres Civiques (Sānzhǒng gōngmín zhànfǎ)"},
  {q:"Guerre I civique?", a:"Guerre du Récit (舆论战) — contre-narratifs, OSINT, lead-dexing"},
  {q:"Guerre II civique?", a:"Guerre de la Dé-sidération (心理战) — éducation permanente, montée en compétence"},
  {q:"Guerre III civique?", a:"Guerre du Prétoire (法律战) — contentieux stratégique, lobbying citoyen"},
  {q:"Ratio montage documentaire Deborsu?", a:"120:1 (120h tournées, 1h diffusée)"},
  {q:"BIM — que signifie et combien?", a:"Bénéficiaire Intervention Majorée — 2,4M (21% pop.)"},
  {q:"Sanctions MLD — multiplication?", a:"×4 : de 2,5% à 10% des indemnités"},
  {q:"Nombre de MLD en Belgique?", a:"500.000+ (plus que de chômeurs)"},
  {q:"Seuil interpellation BXL?", a:"25 personnes"},
  {q:"Compensation fédérale CPAS/an?", a:"518€ par personne (dérisoire)"},
  {q:"Surcoût CPAS Bruxelles?", a:"80 millions d'euros"},
  {q:"Moratoire Éducation Permanente?", a:"2026-2028 (pas de nouvelles reconnaissances)"},
  {q:"Budget total ouaisfieu?", a:"870€ sur 2,5 ans (0€ coûts opérationnels)"},
  {q:"Nombre analyses produites?", a:"70+ documents analytiques"},
  {q:"Étudiants insécurité alimentaire?", a:"58%"},
  {q:"Méthodologie ouaisfieu?", a:"Fork · Hack · Spread"},
  {q:"6 axes CCPLC?", a:"Observer, Documenter, Outiller, Former, Connecter, Évaluer"},
  {q:"DIKW?", a:"Données → Information → Connaissance → Sagesse (pyramide intelligence civile)"},
  {q:"Pilarisation (verzuiling)?", a:"Organisation société belge en « piliers » confessionnels/idéologiques (catholique, socialiste, libéral)"},
  {q:"Consociationalisme?", a:"Démocratie de consensus entre segments sociaux opposés — modèle belge"},
  {q:"Stemvee?", a:"« Bétail de vote » — expression décrivant le citoyen belge réduit à valider des coalitions pré-négociées"},
  {q:"Cadrage épisodique vs thématique?", a:"Épisodique : histoires individuelles (le fraudeur) | Thématique : causes systémiques (le système)"},
  {q:"Propagande sociologique (Ellul)?", a:"Production « naturelle » de contenu servant les intérêts dominants — par structure, non par conspiration"},
  {q:"Klimaatzaak?", a:"Condamnation de l'État belge pour inaction climatique — non exécutée"},
  {q:"Arrêt Camara (CEDH 2023)?", a:"Constatation d'une « défaillance systémique » belge dans l'accueil des demandeurs d'asile"}
];

// ═══ QUOTES ═══
const QUOTES = [
  {t:"Il est plus facile de tromper les gens que de les convaincre qu'ils ont été trompés.", a:"Mark Twain"},
  {t:"Ce n'est pas une guerre de l'information, mais une guerre sur le sens de l'information.", a:"Civil Affairs Assoc."},
  {t:"Ne doutez jamais qu'un petit groupe de citoyens engagés puisse changer le monde.", a:"Margaret Mead"},
  {t:"L'injustice quelque part est une menace pour la justice partout.", a:"Martin Luther King Jr."},
  {t:"Le silence devient lâcheté quand l'occasion exige de parler.", a:"Gandhi"},
  {t:"On ne subit pas l'avenir, on le fait.", a:"Georges Bernanos"},
  {t:"L'éducation permanente vise l'émancipation individuelle et collective.", a:"Décret du 17/07/2003"},
  {t:"Le code est une arme. L'information est une munition.", a:"ouaisfieu"},
  {t:"Face à l'impuissance des urnes, le citoyen s'est tourné vers le juge.", a:"Analyse particratie"},
  {t:"La complexité n'est pas un bug, c'est le bouclier psychologique du système.", a:"Trois Guerres Civiques"},
  {t:"978.000 personnes ne sont pas inactives par choix. Elles sont inactives par système.", a:"Plaidoyer ECP"},
  {t:"Surveiller, éveiller, contraindre.", a:"三种公民战法"},
  {t:"Chaque interaction doit faire monter l'utilisateur dans la pyramide DIKW.", a:"Doctrine ouaisfieu"},
  {t:"Fork · Hack · Spread.", a:"Méthodologie ouaisfieu"}
];
