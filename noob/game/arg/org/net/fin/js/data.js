// ═══════════════════════════════════════════════════════════════════════════
// RÉSISTANCE CITOYENNE v3 — DATA (enrichi: contenu objectifs, quiz, prefill)
// ═══════════════════════════════════════════════════════════════════════════

var RANKS = [
  {name:'NÉOPHYTE',min:0,icon:'🌱',color:'#888'},
  {name:'INITIÉ·E',min:200,icon:'📖',color:'#2ed573'},
  {name:'ACTIVISTE',min:500,icon:'✊',color:'#ffa502'},
  {name:'STRATÈGE',min:1200,icon:'🎯',color:'#00d9ff'},
  {name:'ARCHITECTE',min:2500,icon:'🏗️',color:'#c8a2ff'},
  {name:'MAÎTRE·SSE',min:4000,icon:'⚔️',color:'#7fffd4'},
  {name:'LÉGENDE',min:5500,icon:'🔥',color:'#ff6ec7'}
];

var MISSIONS = [
  {
    id:'arizona',name:'Décrypter l\'Arizona',icon:'🔍',cat:'analyse',difficulty:2,xpBase:100,
    brief:'Le gouvernement Arizona (N-VA, MR, Engagés, CD&V, Vooruit) prépare 23 milliards d\'austérité. 30.122 personnes exclues du chômage dès la Vague 1. Décryptez les 8 failles.',
    lore:'Février 2025. Bart De Wever forme la coalition Arizona après 211 jours. L\'accord prévoit la limitation à 24 mois — une rupture du contrat social belge construit depuis 1944.',
    objectives:[
      {id:'az1',text:'Identifier les 8 failles du budget Arizona',xp:20,
       content:'Les 8 failles identifiées :\n\n1. Transfert non-financé vers les CPAS — Les 30.122 exclus atterrissent au CPAS, surcoût compensé à seulement 518€/personne/an (dérisoire vs coût réel 15.000€).\n2. Piège du taux marginal >100% — Reprendre un emploi partiel fait perdre plus qu\'il ne rapporte.\n3. Sous-estimation coûts santé — +30% consultations, +45% hospitalisations (KCE). Non budgété.\n4. Effet domino logement — Perte capacité locative → expulsions → hébergement d\'urgence.\n5. Perte recettes TVA et cotisations — Moins de consommation = moins de TVA. Cercle vicieux.\n6. Coût judiciaire — Recours massifs Art. 23, CEDH. Non provisionné.\n7. Décrochage scolaire enfants — 1 enfant sur 4 en risque AROPE.\n8. Irréversibilité sociale — Après 6 mois d\'exclusion, retour chute de 60% à 15%.'},
      {id:'az2',text:'Documenter les 5 boucles de rétroaction destructrices',xp:25,
       content:'5 boucles auto-entretenues :\n\nBoucle 1 — Précarité → Santé → Coûts : Exclusion → stress → pathologies → soins → dépenses INAMI non budgétées.\nBoucle 2 — Exclusion → CPAS → Communes : Perte allocation → RIS → surcoût communal → hausse additionnels.\nBoucle 3 — Chômage → Consommation → Emploi : Moins de revenus → moins de dépenses → fermetures → plus de chômage.\nBoucle 4 — Précarité → Logement → Urgence : Impayés → expulsions → hébergement 3× plus cher.\nBoucle 5 — Stigmatisation → Isolement → Inemployabilité : Cadrage Deborsu → honte → retrait → perte réseau.'},
      {id:'az3',text:'Cartographier les 30.122 exclusions Vague 1',xp:15,
       content:'Répartition géographique Vague 1 (janvier 2026) :\n\n• Bruxelles : ~8.500 (28%)\n• Wallonie : ~14.000 (46%) — Hainaut et Liège principaux\n• Flandre : ~7.600 (25%) — Anvers et Limbourg\n\nProfil type : 45-55 ans, faible qualification, problèmes de santé non reconnus MLD.\nVagues suivantes : V2 (juil. 2026) +25.000 | V3 (janv. 2027) +35.000 | Total 2027 : ~90.000.'},
      {id:'az4',text:'Analyser le piège du taux marginal >100%',xp:20,
       content:'Le « piège à l\'emploi » : chaque euro gagné fait perdre plus d\'un euro en allocations.\n\nCalcul réel (bénéficiaire RIS isolé 1.263€/mois + emploi mi-temps 950€ brut) :\n• Gain brut : +950€\n• Perte RIS : -1.263€\n• Perte BIM soins : ~-80€\n• Perte tarif social énergie : ~-60€\n• Coût transport/garde : ~-200€\n• Bilan net : -653€/mois\n\nTravailler fait perdre 653€. Mathématiquement irrationnel. Le budget Arizona ne prévoit aucun lissage.'},
      {id:'az5',text:'Comparer Arizona vs ECP (24K€ vs 9,2 Mrd€)',xp:20,
       content:'Arizona : 9,2 Mrd€ de coupes, logique punitive, 90.000 exclusions, cadre contesté Art.23, transfert CPAS massif, ROI négatif.\nECP : 24.000€ pilote, logique inclusive, 978.000 bénéficiaires potentiels, cadre existant (ruling SDA + loi 2005), aucun transfert CPAS, ROI positif.\n\nL\'ECP coûte 383.000× moins et couvre 10× plus de personnes.'}
    ],
    quiz:[
      {q:'Combien de personnes exclues en Vague 1?',choices:['10.000','30.122','50.000','90.000'],correct:1},
      {q:'Quel est le piège du taux marginal?',choices:['Gagner plus en travaillant','Perdre plus qu\'on ne gagne','Payer plus d\'impôts','Aucun effet'],correct:1},
      {q:'Compensation CPAS par personne/an?',choices:['5.000€','2.000€','518€','1.263€'],correct:2},
      {q:'Après 6 mois d\'exclusion, retour chute à...',choices:['45%','30%','15%','5%'],correct:2}
    ],
    intel:[
      {label:'Exclusions V1',value:'30.122',color:'danger'},
      {label:'Exclusions 2027',value:'90.000 est.',color:'danger'},
      {label:'Budget austérité',value:'23 Mrd€',color:'warning'},
      {label:'Coût/heure inactivité',value:'1M€/h',color:'warning'}
    ],
    tools:['swot','arbre','pourquoi'],
    prefill:{swot:{forces:'Données chiffrées solides, précédents juridiques Art.23, soutien syndical',faiblesses:'Pas de relais médiatique, complexité du sujet, fatigue militante',opportunites:'Recours CC en cours, moratoire = fenêtre pression, Erasmus+ KA210',menaces:'Narratif assistanat, calendrier Arizona, fracturation syndicale'}},
    fcTags:['arizona','coalition','chômage','exclusion','cpas','budget']
  },
  {
    id:'deborsu',name:'Affaire Deborsu',icon:'📺',cat:'media',difficulty:2,xpBase:80,
    brief:'RTL-TVI diffuse "Tous Fraudeurs" avec un ratio 120:1. Le documentaire stigmatise les allocataires pendant que l\'Arizona prépare les exclusions.',
    lore:'La synecdoque accusatoire — cas individuels érigés en symboles d\'un groupe — fabrique l\'ennemi intérieur précaire.',
    objectives:[
      {id:'db1',text:'Déconstruire le cadrage épisodique',xp:20,
       content:'Le cadrage épisodique (Iyengar, 1991) présente via des histoires individuelles plutôt que des analyses systémiques.\n\nDans « Tous Fraudeurs » : 120h tournées → 1h diffusée (ratio 120:1). Aucun contexte structural : fraude réelle <3%, zéro expert sociologue.\n\nEffet cognitif : le spectateur attribue la responsabilité à l\'individu (« il fraude par choix ») plutôt qu\'au système.\n\nAlternatif : Fraude sociale = 0,3% du budget vs fraude fiscale = 6-8% du PIB (30-50 Mrd€). Rapport 1:200.'},
      {id:'db2',text:'Appliquer l\'analyse Herman-Chomsky',xp:25,
       content:'5 filtres de Herman & Chomsky (1988) appliqués à RTL-TVI :\n\n1. Propriété : RTL Group/Bertelsmann — pas d\'intérêt à questionner le modèle dominant.\n2. Publicité : Annonceurs fuient les contenus critiquant banques/entreprises.\n3. Sources : Contrôleurs ONEM (répressif) vs chercheurs IWEPS/DULBEA (analytique) — seuls les premiers sont invités.\n4. Flak : Pression lobbies patronaux FEB/VOKA.\n5. Idéologie : Le « fraudeur social » remplace le « communiste » comme ennemi intérieur.\n\nRTL ne choisit pas consciemment — le système de filtres produit naturellement ce contenu (propagande sociologique d\'Ellul).'},
      {id:'db3',text:'Rédiger une plainte argumentée au CSA',xp:20,
       content:'Base légale : Art. 9 §1 (dignité), Art. 9 §2 (discrimination), Art. 36 (honnêteté info) du décret SMA.\n\nArguments :\n1. Ratio 120:1 = sélection tendancieuse (art. 36)\n2. Absence de contradiction\n3. Timing coordonné avec agenda Arizona\n4. Synecdoque accusatoire (art. 9 §2)\n5. Non-respect vie privée\n\nProcédure : plainte csa.be, 30 jours après diffusion, réponse sous 60 jours.'},
      {id:'db4',text:'Produire un contre-récit sourcé',xp:15,
       content:'Structure du contre-récit :\n\n1. Les faits vs le récit : Fraude sociale = 0,3%. Fraude fiscale = 200× plus.\n2. Les vrais chiffres : 2,1M AROPE (18,3%). 2,4M BIM (21%). 58% étudiants insécurité alimentaire.\n3. Les parcours de vie : Derrière chaque « fraudeur » montré, 100 personnes en détresse non montrées.\n4. L\'alternative : ECP qui transforme l\'inactivité en contribution.\n\nCanaux : ouaisfieu, RWLP, BAPN, LDH, réseaux sociaux.'}
    ],
    quiz:[
      {q:'Ratio de montage du documentaire?',choices:['10:1','60:1','120:1','200:1'],correct:2},
      {q:'Combien de filtres Herman-Chomsky?',choices:['3','5','7','10'],correct:1},
      {q:'Fraude sociale = quel % du budget?',choices:['3%','1%','0,3%','5%'],correct:2}
    ],
    intel:[
      {label:'Ratio montage',value:'120:1',color:'danger'},
      {label:'Belges AROPE',value:'2,1M (18,3%)',color:'warning'},
      {label:'Étudiants insécurité alim.',value:'58%',color:'danger'},
      {label:'BIM',value:'2,4M (21% pop.)',color:'warning'}
    ],
    tools:['domino','message','alliance'],
    prefill:{message:{accroche:'Pour chaque « fraudeur » montré par RTL, 200 personnes en détresse sont invisibilisées.',probleme:'Le documentaire utilise un ratio 120:1 sans contexte structural.',importance:'Fraude sociale = 0,3% du budget. Fraude fiscale = 200× plus.',cible:'CSA, parlementaires FWB, journalistes',action:'Déposer plainte CSA, diffuser contre-récit, interpeller parlementaires'}},
    fcTags:['deborsu','média','fraude','rtl','csa','cadrage']
  },
  {
    id:'art23',name:'Défense Art. 23',icon:'⚖️',cat:'juridique',difficulty:3,xpBase:120,
    brief:'L\'article 23 de la Constitution garantit la sécurité sociale. Le standstill interdit toute régression. Recours introduit le 29/10/2025.',
    lore:'Face à l\'impuissance des urnes, le citoyen s\'est tourné vers le juge. Le lawfare citoyen est l\'usage légitime du droit.',
    objectives:[
      {id:'j1',text:'Maîtriser l\'Art. 23 et le standstill',xp:20,
       content:'Art. 23 : « Chacun a le droit de mener une vie conforme à la dignité humaine » — garantit sécurité sociale, santé, aide sociale.\n\nStandstill (cliquet) : La Cour constitutionnelle interdit de réduire significativement le niveau de protection existant sans justification d\'intérêt général.\n\nApplication Arizona : La limitation à 24 mois = régression significative par rapport au système actuel (durée illimitée sous conditions). L\'État devra prouver la proportionnalité.'},
      {id:'j2',text:'Documenter les 4 plaintes CEDH en cours',xp:25,
       content:'4 procédures CEDH actives :\n\n1. Plainte « Climat social » (2025) — Art. 3 CEDH (traitements dégradants), inspirée arrêt Camara.\n2. Plainte « Accès au juge » (2025) — Art. 6 CEDH, délais de recours trop courts pour personnes précarisées.\n3. Arrêt Camara (2023) — « Défaillance systémique » belge (demandeurs asile). Précédent applicable.\n4. Klimaatzaak (2021) — État condamné, décision non exécutée → montre les limites.\n\nStratégie : saturation judiciaire coordonnée (CC + CEDH + tribunaux du travail).'},
      {id:'j3',text:'Préparer un dossier d\'interpellation communale',xp:20,
       content:'Bruxelles : 25 signatures (ordonnance 17/07/2020).\nWallonie : Art. L1122-14 CDLD, droit individuel.\n\nStructure : identification commune + calcul surcoût CPAS local + interpellation Conseil communal + question écrite préalable + mobilisation signataires.\n\nExemple BXL : Surcoût = 87M€/an. Compensation fédérale = 3,1M€. Déficit = catastrophique.'},
      {id:'j4',text:'Identifier les précédents juridiques',xp:15,
       content:'Précédents clés :\n\n• Klimaatzaak (2021) : Condamnation État pour inaction climatique. Non exécuté.\n• Arrêt Camara (CEDH 2023) : « Défaillance systémique » belge.\n• CC arrêt 135/2011 : Annulation d\'une réduction sociale disproportionnée (standstill).\n• +9.000 condamnations de l\'État belge — pattern systémique, pas erreurs isolées.'},
      {id:'j5',text:'Rédiger une pétition fédérale (objectif 25K)',xp:20,
       content:'Art. 28 Constitution : 25.000+ signatures = débat parlementaire obligatoire.\n\nStructure : Exposé des faits (limitation 24 mois, 90.000 exclusions, violation Art. 23) → Demande (moratoire jusqu\'à l\'arrêt CC) → Signatures (nom, adresse, signature).\n\nCanaux : Change.org + collecte physique. Relais syndicaux FGTB (1,5M) + CSC.\nCalendrier : Avant Vague 2 (juillet 2026).'}
    ],
    quiz:[
      {q:'Art. 23 garantit le droit à...',choices:['La liberté d\'expression','La sécurité sociale','Le vote obligatoire','La propriété'],correct:1},
      {q:'Standstill signifie...',choices:['Gel des salaires','Interdiction de régression','Arrêt des négocias','Statu quo'],correct:1},
      {q:'Signatures nécessaires pour interpeller (BXL)?',choices:['10','25','100','500'],correct:1},
      {q:'Condamnations de l\'État belge?',choices:['+1.000','+5.000','+9.000','+15.000'],correct:2}
    ],
    intel:[
      {label:'Recours déposé',value:'29/10/2025',color:'info'},
      {label:'Arrêt CC attendu',value:'Fin 2026',color:'warning'},
      {label:'Plaintes CEDH',value:'4 actives',color:'info'},
      {label:'Condamnations État',value:'+9.000',color:'danger'}
    ],
    tools:['checklist','smart','suivi'],
    prefill:{smart:{specifique:'Moratoire exclusions V2 (juillet 2026)',mesurable:'25.000 signatures + 3 interpellations communales',atteignable:'Oui avec relais syndicaux FGTB/CSC (1,5M membres)',relevant:'Protection Art. 23 + calendrier CC',temporel:'Avant 1er juillet 2026'}},
    fcTags:['art23','constitution','standstill','cedh','juridique']
  },
  {
    id:'troisguerres',name:'Les Trois Guerres Civiques',icon:'⚔️',cat:'doctrine',difficulty:3,xpBase:150,
    brief:'三种公民战法 — Transposition de la doctrine chinoise au combat civique belge. Opinion, Dé-sidération, Prétoire : trois fronts simultanés.',
    lore:'En 2003, la Commission militaire centrale de la RPC officialise les 三种战法. Notre réponse : la même architecture, inversée.',
    objectives:[
      {id:'tg1',text:'Comprendre la Guerre du Récit (舆论战)',xp:25,
       content:'Guerre du Récit (舆论战 Yúlùn zhàn) civique :\n\n• OSINT citoyen : Collecter données publiques (SPF, BNB, Eurostat)\n• Lead-dexing : Suivi nominatif de chaque élu (votes, déclarations, mandats)\n• Contre-récit documenté : Pas d\'opinion — des faits sourcés, vérifiables\n• Saturation informationnelle positive : Tellement de contenu factuel que le récit dominant est noyé\n\nOutils : ouaisfieu (70+ analyses), infographies, flashcards, datasets ouverts.'},
      {id:'tg2',text:'Maîtriser la Dé-sidération (心理战)',xp:25,
       content:'Dé-sidération (心理战 Xīnlǐ zhàn) = sortir de la paralysie :\n\n• Éducation permanente : Rendre le complexe compréhensible\n• Montée en compétence : De « je ne comprends rien » à « je peux analyser »\n• Pyramide DIKW : Données → Information → Connaissance → Sagesse\n• Désapprentissage : Déconstruire les fausses évidences\n\nIndicateur : Le citoyen formé explique le budget Arizona à son voisin en 5 minutes.'},
      {id:'tg3',text:'Appliquer la Guerre du Prétoire (法律战)',xp:25,
       content:'Guerre du Prétoire (法律战 Fǎlǜ zhàn) — lawfare citoyen :\n\n1. Recours constitutionnel (Art. 23) — déposé 29/10/2025\n2. Plaintes CEDH (Art. 3, 6, 14) — 4 actives\n3. Interpellations communales — 589 communes = 589 fronts\n4. Pétitions fédérales — 25K = débat obligatoire\n5. Tribunaux du travail — recours individuels massifs\n6. Plainte CSA — volet Deborsu\n\nPrincipe : 1.000 recours individuels coordonnés > 1 recours collectif. L\'État a +9.000 condamnations.'},
      {id:'tg4',text:'Cartographier les synergies entre les 3 guerres',xp:25,
       content:'Les 3 guerres combinées :\n\nRécit → Prétoire : Données OSINT = pièces à conviction\nPrétoire → Récit : Condamnation = fait médiatique\nDé-sidération → Les deux : Citoyen formé peut témoigner, rédiger, produire\n\nCycle vertueux : Veille → Analyse → Publication → Mobilisation → Recours → Condamnation → Nouveau cycle.\n\nPoint critique : Si un front s\'arrête, les deux autres perdent. D\'où l\'infrastructure résiliente (11 plateformes).'},
      {id:'tg5',text:'Identifier les armes de la particratie',xp:25,
       content:'La particratie mène ses propres « trois guerres » :\n\nRécit : Contrôle médias (RTL/RTBF CA politisés), cadrage épisodique, novlangue (« activation » = exclusion).\nSidération : Complexité institutionnelle (6 parlements → « pas ma compétence »), volume législatif (1.200+ pages/an).\nLawfare : Non-exécution condamnations, longueur procédures (CC 12-18 mois), coût accès juge.\n\nNotre avantage : La particratie est lente, rigide, prévisible. Le citoyen connecté est rapide, agile, imprévisible.'}
    ],
    quiz:[
      {q:'三种战法 se traduit par...',choices:['Trois stratégies','Trois guerres','Trois chemins','Trois doctrines'],correct:1},
      {q:'La Dé-sidération vise à...',choices:['Effrayer l\'adversaire','Sortir le citoyen de la paralysie','Créer de la confusion','Infiltrer'],correct:1},
      {q:'Avantage citoyen vs particratie?',choices:['Plus de budget','Plus rapide et agile','Plus nombreux','Plus d\'avocats'],correct:1}
    ],
    intel:[
      {label:'Doctrine',value:'三种公民战法',color:'info'},
      {label:'Guerre I',value:'Récit (舆论战)',color:'mint'},
      {label:'Guerre II',value:'Dé-sidération (心理战)',color:'lilac'},
      {label:'Guerre III',value:'Prétoire (法律战)',color:'warning'}
    ],
    tools:['pestel','theorie','acteurs'],prefill:{},
    fcTags:['trois guerres','doctrine','récit','sidération','prétoire']
  },
  {
    id:'osint',name:'OSINT Citoyen',icon:'🔎',cat:'renseignement',difficulty:2,xpBase:90,
    brief:'L\'intelligence en sources ouvertes transforme le citoyen passif en veilleur actif. Collectez, vérifiez, exploitez.',
    lore:'Le cycle : veille → donnée → preuve → contentieux → fait juridique → récit.',
    objectives:[
      {id:'os1',text:'Maîtriser la pyramide DIKW',xp:20,
       content:'D — Données : Chiffres bruts. « 30.122 » seul ne dit rien.\nI — Information : Donnée contextualisée. « 30.122 exclusions en janvier 2026. »\nK — Connaissance : Info analysée. « Ces exclusions coûteront 87M€ aux CPAS car compensation = 518€/an vs coût 15.000€/an. »\nW — Sagesse : Connaissance opérationnalisée. « Déposer recours CC AVANT Vague 1 + 25 interpellations simultanées. »\n\nChaque outil ouaisfieu fait monter d\'un cran. Flashcards = D→I. Analyses = I→K. Plaidoyers = K→W.'},
      {id:'os2',text:'Pratiquer le lead-dexing',xp:25,
       content:'Lead-dexing = suivi systématique et nominatif de chaque élu.\n\nSuivre : Votes plénière/commission, déclarations vs votes (incohérences), mandats cumulés, présences.\n\nSources belges : lachambre.be (comptes-rendus), transparencia.be (mandats/rémunérations), CRISP, Moniteur belge.\n\n31.806 mandataires (1/km²). Objectif : fiche par député Arizona (89 fédéraux) avec historique de vote.'},
      {id:'os3',text:'Exploiter les données ouvertes belges',xp:20,
       content:'Sources : SPF/Statbel (démographie, AROPE), BNB (macro), Bureau du Plan (projections), IWEPS (Wallonie), IBSA (Bruxelles), Eurostat (comparaisons), KCE (santé), INAMI, ONEM.\n\nFormat : API ou exports CSV/Excel. Tout téléchargeable, vérifiable, citeable en justice.\n\nPrincipe : Ne jamais affirmer sans source. Chaque chiffre doit pointer vers une URL institutionnelle.'},
      {id:'os4',text:'Produire un rapport OSINT admissible en justice',xp:25,
       content:'Critères admissibilité :\n\n1. Traçabilité : source URL + date + capture horodatée\n2. Méthodologie documentée : comment, par qui, quand, quels outils\n3. Chaîne de custody : hash SHA-256 de chaque document\n4. Contradiction : mentionner aussi les données contraires\n5. Qualification : distinguer fait / déduction / opinion\n\nLes 70+ analyses ouaisfieu suivent cette méthodo. Chaque document est reproductible (Fork·Hack·Spread).'}
    ],
    quiz:[
      {q:'DIKW signifie...',choices:['Data, Info, Knowledge, Wisdom','Direct, Indirect, Key, Wide','Design, Implement, Know, Win','Data, Index, Key, Write'],correct:0},
      {q:'Mandataires en Belgique?',choices:['10.000','21.000','31.806','45.000'],correct:2},
      {q:'Site pour mandats des élus?',choices:['lachambre.be','transparencia.be','moniteur.be','crisp.be'],correct:1}
    ],
    intel:[
      {label:'Documents ouaisfieu',value:'70+ analyses',color:'mint'},
      {label:'Plateformes',value:'11 sites',color:'info'},
      {label:'Mandataires BE',value:'31.806',color:'warning'},
      {label:'Budget ouaisfieu',value:'870€ total',color:'mint'}
    ],
    tools:['domino','fleur','acteurs'],prefill:{},
    fcTags:['osint','données','veille','dikw','mandataires']
  },
  {
    id:'commune',name:'Interpellation Communale',icon:'🏛️',cat:'action',difficulty:1,xpBase:70,
    brief:'Le niveau communal est le premier front accessible. Chaque citoyen peut interpeller son conseil communal.',
    lore:'La consultation populaire communale est ouverte dès 16 ans, sans condition de nationalité.',
    objectives:[
      {id:'co1',text:'Identifier votre commune et ses procédures',xp:15,
       content:'Bruxelles : 25 signatures (ordonnance 17/07/2020), droit de poser questions orales.\nWallonie : Art. L1122-14 CDLD, droit individuel.\nFlandre : Decreet Lokaal Bestuur, pétition et interpellation.\n\nÉtapes : 1. Identifier commune (ibz.be) 2. Consulter règlement d\'ordre intérieur 3. Identifier procédure 4. Dates prochains conseils.'},
      {id:'co2',text:'Rédiger une interpellation Arizona locale',xp:20,
       content:'Modèle d\'interpellation :\n\nObjet : Impact limitation 24 mois sur le CPAS de [commune]\n\nConsidérant que : exclusion de [X] personnes, surcoût CPAS, compensation 518€/an = 3,5% du coût réel.\n\nQuestions : 1. Combien de personnes concernées? 2. Surcoût CPAS? 3. Budget prévu? 4. Mesures d\'accompagnement?\n\nDemande : Motion communale demandant un moratoire.'},
      {id:'co3',text:'Calculer le surcoût CPAS local',xp:20,
       content:'Formule : Surcoût = (Exclus × Coût RIS) − (Exclus × Compensation fédérale)\n\nVariables : RIS isolé = 15.156€/an. RIS cohabitant = 10.104€/an. Compensation = 518€/an. Transfert CPAS ~70%.\n\nExemple BXL 19 communes : Exclusions V1 ~8.500. Transfert CPAS (70%) ~5.950. Surcoût brut : 90,2M€. Compensation : 3,1M€. Surcoût net : ~87M€/an.'},
      {id:'co4',text:'Mobiliser les 25 signatures',xp:15,
       content:'Cercle 1 (1-10) : Famille, amis, voisins. Face-à-face 5 min/personne.\nCercle 2 (10-20) : Réseau associatif, maison de quartier, comité parents.\nCercle 3 (20-25) : Stand lieu public, porte-à-porte ciblé.\n\nDocuments : feuille signatures, résumé 1 page, infographie « Combien coûtera Arizona à notre commune? ».\nCalendrier : 2 semaines, lancer 3 semaines avant le conseil visé.'}
    ],
    quiz:[
      {q:'Signatures nécessaires (BXL)?',choices:['10','25','50','100'],correct:1},
      {q:'En Wallonie, combien de personnes?',choices:['1 (individuel)','10','25','50'],correct:0},
      {q:'Coût RIS isolé annuel?',choices:['8.000€','12.000€','15.156€','20.000€'],correct:2}
    ],
    intel:[
      {label:'Seuil BXL',value:'25 personnes',color:'info'},
      {label:'Seuil Wallonie',value:'Art. L1122-14',color:'info'},
      {label:'Surcoût CPAS BXL',value:'87M€',color:'danger'},
      {label:'Compensation/an',value:'518€',color:'danger'}
    ],
    tools:['smart','checklist','message'],prefill:{},
    fcTags:['commune','cpas','interpellation','signatures']
  },
  {
    id:'ecp',name:'Économie Contributive',icon:'🌱',cat:'alternative',difficulty:2,xpBase:100,
    brief:'L\'ECP propose : transformer 978.000 inactifs contraints en contributeurs valorisés sans perte de droits. Budget : 24.000€.',
    lore:'Le cadre existe : ruling SDA + loi volontariat 2005. L\'ECP ne coûte pas — elle fait économiser.',
    objectives:[
      {id:'ec1',text:'Comprendre le mécanisme ECP',xp:20,
       content:'Principe : Permettre aux inactifs contraints (chômage LD, invalidité, RIS) de contribuer à des projets d\'utilité sociale SANS perdre allocations.\n\nCadre légal existant : Ruling fiscal SDA (sécurisation statut), Loi 03/07/2005 (volontariat), Art. 100 §2 INAMI (reprise progressive invalides).\n\nExemples : Numérisation archives, tutorat scolaire, jardins partagés, repair cafés, veille citoyenne.'},
      {id:'ec2',text:'Comparer Arizona (9,2 Mrd€) vs ECP (24K€)',xp:20,
       content:'Arizona : 9,2 Mrd€ coupes, punitive, 90.000 exclusions, contesté Art.23, transfert CPAS, ROI négatif.\nECP : 24.000€ pilote, inclusive, 978.000 potentiels, cadre existant, aucun transfert, ROI positif.\n\nL\'ECP coûte 383.000× moins et couvre 10× plus de personnes. Le coût inactivité (1M€/h) rend toute alternative moins chère que le statu quo.'},
      {id:'ec3',text:'Identifier les 978.000 inactifs contraints',xp:15,
       content:'Chômeurs LD : ~180.000. Invalides/MLD : ~500.000. RIS/CPAS : ~150.000. NEET jeunes : ~80.000. Découragés : ~68.000.\n\nPas inactifs « par choix » mais par système : absence postes adaptés, formation, transport, garde enfants, santé mentale.\n\nCoût total : 21-24 Mrd€/an = 1M€/heure (allocations + soins supplémentaires + perte cotisations/TVA + coûts sociaux).'},
      {id:'ec4',text:'Rédiger un dossier ruling SDA',xp:25,
       content:'Structure : 1. Identification ASBL porteuse 2. Description activité (contributions citoyennes) 3. Question fiscale (défraiements imposables?) 4. Analyse juridique (seuils 40,67€/jour, 1.626,69€/an) 5. Demande confirmation conservation statut social.\n\nDélai : réponse sous 3 mois. Décision contraignante 5 ans.'},
      {id:'ec5',text:'Calculer le ROI citoyen',xp:20,
       content:'Économies par contributeur/an : réduction soins -1.200€ (KCE), réduction CPAS -2.000€, réduction judiciaire -500€, gain TVA +800€. Total ~4.500€/contributeur.\n\n100 contributeurs = 450K€ économies pour 24K€ investis → ROI 18,75×.\n10.000 contributeurs = 45M€.\n978.000 = 4,4 Mrd€/an = 18% du coût inactivité actuel.'}
    ],
    quiz:[
      {q:'Coût inactivité par heure?',choices:['100K€','500K€','1M€','5M€'],correct:2},
      {q:'Inactifs contraints?',choices:['200.000','500.000','978.000','1.500.000'],correct:2},
      {q:'Ruling SDA valable combien d\'années?',choices:['1','3','5','10'],correct:2}
    ],
    intel:[
      {label:'Inactifs contraints',value:'978.000',color:'danger'},
      {label:'Coût inactivité',value:'1M€/h',color:'danger'},
      {label:'Budget ECP',value:'24.000€',color:'mint'},
      {label:'Cadre légal',value:'Ruling SDA + Loi 2005',color:'info'}
    ],
    tools:['theorie','swot','smart'],prefill:{},
    fcTags:['ecp','contributive','inactivité','ruling']
  },
  {
    id:'coalition',name:'Construction Coalition',icon:'🤝',cat:'strategie',difficulty:2,xpBase:90,
    brief:'Cartographiez les alliés : syndicats (3M membres), associations, académiques. Construisez un front commun.',
    lore:'Le modèle des Trois Guerres exige l\'intégration éducation populaire + plaidoyer + communication.',
    objectives:[
      {id:'cl1',text:'Cartographier alliés / neutres / opposants',xp:20,
       content:'Alliés actifs : FGTB (~1,5M), CSC (~1,6M), RWLP, BAPN, LDH, DULBEA, IWEPS, Solidaris, MC.\nNeutres à basculer : Députés Vooruit/Engagés sensibles, RTBF Investigation, CPAS (impactés mais prudents).\nOpposants : N-VA (architecte), MR (aligné), FEB/VOKA (lobbies patronaux), RTL-TVI.'},
      {id:'cl2',text:'Identifier 3-5 députés à basculer',xp:25,
       content:'Coalition étroite → 3-5 voix qui basculent = blocage.\n\nVooruit : Députés ex-syndicalistes, mal à l\'aise avec limitation. Levier : contradiction programme/vote. Méthode : lead-dexing public.\nEngagés : Députés sociaux-chrétiens. Levier : Art. 23 = doctrine sociale. Méthode : interpellations ciblées.\n\nStratégie : pas d\'attaque frontale — montrer que voter la mesure sera électoralement coûteux. Fournir données CPAS locales.'},
      {id:'cl3',text:'Rédiger un protocole de partenariat',xp:20,
       content:'Engagements ouaisfieu : analyses sourcées, infrastructure numérique, animation EP, licence CC-BY-SA.\nEngagements partenaire : relais réseau, locaux pour ateliers, co-signature interpellations, soutien candidatures.\nGouvernance : comité trimestriel, évaluation semestrielle, droit de retrait.\nBudget commun : 0€ (principe ouaisfieu).'},
      {id:'cl4',text:'Trouver un partenaire Erasmus+ KA210',xp:25,
       content:'KA210 : 30-60K€ forfait, 6-24 mois, 2+ organisations de 2+ pays UE.\n\nPistes : France (ATD, Anticor), Pays-Bas (Open State Foundation), Allemagne (Abgeordnetenwatch), Espagne (Civio, Xnet).\n\nDeadline : 5 mars 2026. Taux succès ~80% pour premiers dépôts.\nAction : contacter 5 organisations cette semaine.'}
    ],
    quiz:[
      {q:'Membres syndicaux FGTB+CSC?',choices:['500K','1M','3M','5M'],correct:2},
      {q:'Budget Erasmus+ KA210?',choices:['10-20K€','30-60K€','100-200K€','500K€+'],correct:1},
      {q:'Deadline Erasmus+ en cours?',choices:['1er février','5 mars 2026','15 avril','1er juin'],correct:1}
    ],
    intel:[
      {label:'Membres syndicaux',value:'~3M (FGTB+CSC)',color:'info'},
      {label:'Députés à cibler',value:'3-5',color:'warning'},
      {label:'Erasmus+ KA210',value:'30-60K€',color:'mint'},
      {label:'Deadline',value:'5 mars 2026',color:'danger'}
    ],
    tools:['alliance','acteurs','cibles'],prefill:{},
    fcTags:['coalition','syndicats','partenariat','erasmus']
  },
  {
    id:'particratie',name:'Anatomie de la Particratie',icon:'🏰',cat:'analyse',difficulty:3,xpBase:120,
    brief:'31.806 mandataires, financement public >80%, listes bloquées. Déconstruisez le système.',
    lore:'Le citoyen = « bétail de vote » (stemvee). 75-80% de défiance envers les partis.',
    objectives:[
      {id:'pa1',text:'Comprendre pilarisation et consociationalisme',xp:20,
       content:'Pilarisation (verzuiling) : société organisée en piliers (catholique, socialiste, libéral), chacun avec écoles, hôpitaux, syndicats, médias.\n\nConsociationalisme (Lijphart 1968) : stabilité par négociation entre élites. Ce qui était pacification est devenu contrôle — les partis se partagent le pouvoir entre eux plutôt qu\'avec les citoyens.'},
      {id:'pa2',text:'Analyser le financement public (>80%)',xp:20,
       content:'>80% financement public (2× Allemagne, 3× France). ~70M€/an dotation fédérale. N-VA ~12M€, PS ~10M€, MR ~9M€.\n\nConséquence : Les partis ne dépendent pas des citoyens financièrement. Circuit fermé d\'auto-financement.\n\nComparaison : BE >80% | DE ~40% | FR ~25% | UK <5%.'},
      {id:'pa3',text:'Documenter le mille-feuille institutionnel',xp:15,
       content:'6 parlements + 6 gouvernements + 10 provinces + 589 communes.\n31.806 mandataires (1/365 hab, 1/km²). Chevauchement compétences permanent. « Pas ma compétence » = excuse structurelle. Aucun référendum.\n\nComplexité = bouclier psychologique du système : conçu pour décourager.'},
      {id:'pa4',text:'Comparer avec Suisse, Pays-Bas, Canada',xp:20,
       content:'Suisse : Référendum initiative populaire (100K signatures), 4×/an. Citoyen a le dernier mot.\nPays-Bas : Dé-pilarisé depuis 1960. Référendum consultatif aboli 2018.\nCanada : Référendums possibles (Québec), pétitions avec réponse obligatoire.\n\nBelgique : Aucun référendum, aucune initiative populaire, pétition = simple demande. Cumule contraintes sans contrepoids.'},
      {id:'pa5',text:'Identifier les verrous constitutionnels',xp:25,
       content:'5 verrous :\n1. Pas de référendum\n2. Listes bloquées de facto (dévolution)\n3. Majorité spéciale (2/3 + groupes linguistiques)\n4. Sonnette d\'alarme (blocage par groupe)\n5. Formation gouvernement sans délai (211 jours Arizona, 541 en 2010)\n\nLe système est verrouillé de l\'intérieur. Les outils de changement sont contrôlés par les bénéficiaires du statu quo.'}
    ],
    quiz:[
      {q:'Mandataires en Belgique?',choices:['10.000','21.000','31.806','50.000'],correct:2},
      {q:'Financement public partis belges?',choices:['>50%','>60%','>80%','>95%'],correct:2},
      {q:'Parlements en Belgique?',choices:['3','4','6','8'],correct:2}
    ],
    intel:[
      {label:'Mandataires',value:'31.806 (1/km²)',color:'warning'},
      {label:'Financement public',value:'>80%',color:'danger'},
      {label:'Défiance partis',value:'75-80%',color:'danger'},
      {label:'Parlements',value:'6',color:'info'}
    ],
    tools:['pestel','arbre','fleur'],prefill:{},
    fcTags:['particratie','mandataires','financement','pilarisation']
  },
  {
    id:'financement',name:'Chasse aux Financements',icon:'💰',cat:'logistique',difficulty:1,xpBase:80,
    brief:'Budget actuel : 870€ sur 2,5 ans. Sécuriser des financements sans compromettre l\'indépendance.',
    lore:'Le moratoire EP 2026-2028 bloque la voie principale. Mais des alternatives existent.',
    objectives:[
      {id:'fi1',text:'Évaluer les 6 pistes de financement',xp:15,
       content:'PCI FWB : 5-35K€ (95% prob.) | Erasmus+ KA210 : 30-60K€ (80%) | CERV : 50-300K€ (75%) | FRB : 3,75-50K€ (85%) | Décret OJ : 5-20K€ (60%) | Crowdfunding : 1-25K€ (variable).\n\nStratégie : postuler simultanément PCI + FRB + Erasmus (diversification).'},
      {id:'fi2',text:'Rédiger un dossier PCI FWB',xp:20,
       content:'PCI (Projet Cohésion & Inclusion) : 5-35K€, taux 95%, appel permanent.\n\nStructure : Identification + Description + Budget + Calendrier + Indicateurs.\n\nPoints forts ouaisfieu : 2,5 ans de production, méthodologie innovante (IA civile), coût opérationnel = 0€, impact mesurable.'},
      {id:'fi3',text:'Préparer candidature Erasmus+ KA210',xp:25,
       content:'KA210 : 30-60K€ forfait, 2+ organisations de 2+ pays UE, 6-24 mois.\n\nCritères : Pertinence (25%), Qualité plan (30%), Partenariat (20%), Impact (25%). Score min : 60/100.\n\nPartenaire nécessaire dans autre pays UE. Deadline : 5 mars 2026.'},
      {id:'fi4',text:'Contacter la Fondation Roi Baudouin',xp:15,
       content:'FRB : Fonds démocratie (3,75-50K€), appels Participation citoyenne et Pauvreté/exclusion.\n\nAtouts : Innovation, faible coût, reproductibilité.\nProcessus : dossier en ligne, jury, réponse 2-3 mois.\nContact : info@kbs-frb.be | +32 2 511 18 40.'},
      {id:'fi5',text:'Lancer un crowdfunding',xp:15,
       content:'Plateformes : KissKissBankBank, Ulule, GoFundMe. Objectif réaliste : 2.500-5.000€.\n\nCampagne : vidéo 2min, contreparties (analyses, stickers, flashcards physiques), 30 jours.\n\nAvantage : financement + communication + mobilisation. Chaque donateur = ambassadeur.'}
    ],
    quiz:[
      {q:'Budget total ouaisfieu?',choices:['0€','870€','5.000€','25.000€'],correct:1},
      {q:'Taux financement PCI?',choices:['50%','75%','95%','100%'],correct:2},
      {q:'Budget KA210?',choices:['5-10K€','30-60K€','100-200K€','500K€+'],correct:1}
    ],
    intel:[
      {label:'PCI FWB',value:'5-35K€ (95%)',color:'mint'},
      {label:'Erasmus+ KA210',value:'30-60K€ (80%)',color:'mint'},
      {label:'CERV',value:'50-300K€ (75%)',color:'info'},
      {label:'FRB',value:'3,75-50K€ (85%)',color:'mint'}
    ],
    tools:['smart','suivi','domino'],prefill:{},
    fcTags:['financement','erasmus','pci','crowdfunding']
  },
  {
    id:'mld',name:'Dossier MLD',icon:'🏥',cat:'analyse',difficulty:2,xpBase:90,
    brief:'500.000+ MLD. Sanctions ×4. 218.000 dossiers réexaminés. L\'Arizona vise les plus vulnérables.',
    lore:'La réactivation forcée des MLD est l\'angle mort du débat public.',
    objectives:[
      {id:'ml1',text:'Documenter les 218.000 dossiers réexaminés',xp:20,
       content:'INAMI : réexamen massif. Processus : convocation médecin-conseil → évaluation capacité résiduelle → plan réintégration → sanctions si non-coopération.\n\nProblèmes : 65% pathologies multiples, médecins non-spécialistes, marché du travail inadapté.\n\nProjection INAMI : 100.000 retours. Réalité (référence Pays-Bas) : 15-20.000 max.'},
      {id:'ml2',text:'Analyser le quadruplement des sanctions',xp:20,
       content:'Avant : 2,5% réduction. Après : 10% (×4).\n\nImpact : indemnité isolé ~1.200€/mois → sanction passe de -30€ à -120€. Pour personne sous seuil de pauvreté, = catastrophe.\n\nProfil sanctionnés : 70% santé mentale. Le « refus de coopérer » est souvent une incapacité. Non pris en compte.'},
      {id:'ml3',text:'Calculer l\'irréalisme des 100K retours',xp:20,
       content:'Expérience Pays-Bas (2015) : taux retour effectif = 8% (vs 20% projeté). Appliqué BE : 8% × 218.000 = 17.440.\n\nObstacles : inadéquation offre/demande, âge moyen 52 ans (discrimination >50 ans), pathologies réelles non résolubles par plan administratif.\n\nGain budgétaire = illusoire.'},
      {id:'ml4',text:'Rédiger un plaidoyer patient-partenaire',xp:25,
       content:'Modèle Montréal (patient-partenaire).\n\nStructure : 1. Données (500K+ MLD, 218K réexaminés, ×4 sanctions) 2. Témoignages anonymisés 3. Alternative : réactivation accompagnée 4. Demande : moratoire sanctions + évaluation indépendante.\n\nCanaux : LUSS, Solidaris/MC, médecins généralistes, commission Santé.\n\nArt. 100 §2 INAMI permet DÉJÀ la reprise progressive — il suffit de l\'utiliser.'}
    ],
    quiz:[
      {q:'MLD en Belgique?',choices:['100K','250K','500K+','1M'],correct:2},
      {q:'Sanctions multipliées par...',choices:['2','3','4','5'],correct:2},
      {q:'Taux retour réaliste?',choices:['50K','30K','15-20K','5K'],correct:2}
    ],
    intel:[
      {label:'MLD',value:'500.000+',color:'danger'},
      {label:'Dossiers réexaminés',value:'218.000',color:'danger'},
      {label:'Sanctions',value:'×4 (→10%)',color:'danger'},
      {label:'Retours projetés',value:'100K (irréaliste)',color:'warning'}
    ],
    tools:['pourquoi','arbre','message'],prefill:{},
    fcTags:['mld','invalidité','inami','sanctions']
  },
  {
    id:'edperm',name:'Éducation Permanente',icon:'📚',cat:'strategie',difficulty:2,xpBase:100,
    brief:'Viser la reconnaissance FWB d\'ici 2042. Le décret 2003 définit le cadre. ouaisfieu coche toutes les cases.',
    lore:'Le moratoire 2026-2028 bloque la voie directe. Mais on peut préparer le terrain.',
    objectives:[
      {id:'ep1',text:'Comprendre le décret EP 2003 et ses 4 axes',xp:15,
       content:'4 axes : 1. Analyse critique (70+ analyses ouaisfieu) 2. Participation citoyenne (interpellations, pétitions) 3. Émancipation (formation OSINT, Trois Guerres) 4. Exercice des droits (Art. 23, lawfare).\n\nTypes : Association EP (axe 1), Organisation EP (axes 1+2), Mouvement EP (4 axes). ouaisfieu vise Mouvement.'},
      {id:'ep2',text:'Analyser le moratoire 2026-2028',xp:20,
       content:'FWB : moratoire nouvelles reconnaissances EP 2026-2028. Raisons : contraintes budgétaires, rationalisation secteur.\n\nConséquences : impossible de postuler avant 2029. Alternatives : opérateur reconnu, PCI, préparation dossier.'},
      {id:'ep3',text:'Identifier les alternatives',xp:20,
       content:'1. Partenariat PAC (plus grand mouvement EP, 100+ régionales) → ouaisfieu comme « projet de PAC ».\n2. PCI FWB (5-35K€, appel permanent) → prouver l\'impact sans reconnaissance.\n3. ASBL autonome → produire 5 ans de preuves, postuler 2029-2031, reconnaissance 2035-2042.\n\nRecommandé : combiner 1+2 (couverture PAC + financement PCI).'},
      {id:'ep4',text:'Rédiger le dossier de candidature EP',xp:25,
       content:'Structure : 1. Présentation (historique, mission, équipe) 2. 4 axes (avec preuves documentées) 3. Public cible 4. Méthodologie (Fork·Hack·Spread, IA civile) 5. Implantation territoriale (11 plateformes + ateliers BXL) 6. Plan quinquennal.\n\nOù : Bruxelles (Recyclart, Pianofabriek). Quand : candidature formelle dès réouverture (2029+).'},
      {id:'ep5',text:'Cartographier PAC et les mouvements existants',xp:20,
       content:'Mouvements reconnus : PAC (100+ régionales, socialiste), Vie Féminine (chrétien, 50K membres), Équipes Populaires, CESEP.\nOrganisations : Lire et Écrire, Cultures & Santé, Barricade.\n\nBudget total EP FWB : ~35M€/an.\n\nNiche ouaisfieu : intelligence civile numérique. Aucun opérateur fait civic tech + OSINT + IA. Argument différenciant clé.'}
    ],
    quiz:[
      {q:'Axes décret EP 2003?',choices:['2','3','4','6'],correct:2},
      {q:'Moratoire EP...',choices:['2024-2025','2025-2027','2026-2028','2027-2030'],correct:2},
      {q:'Plus grand mouvement EP?',choices:['CESEP','Lire et Écrire','PAC','Équipes Populaires'],correct:2}
    ],
    intel:[
      {label:'Décret',value:'17 juillet 2003',color:'info'},
      {label:'Moratoire',value:'2026-2028',color:'danger'},
      {label:'Objectif',value:'Reconnaissance 2042',color:'mint'},
      {label:'PAC',value:'Plus grand mvt EP',color:'info'}
    ],
    tools:['theorie','suivi','smart'],prefill:{},
    fcTags:['éducation permanente','décret','moratoire','pac']
  }
];

var TOOLS = [
  {id:1,key:'domino',name:'Domino du Changement',icon:'🎯',phase:'voir',xp:50,fields:['vision','obstacles','ressources'],help:'Vision du changement, obstacles et ressources.'},
  {id:2,key:'profil',name:'Profil d\'Engagement',icon:'👤',phase:'voir',xp:50,fields:['motivations','competences','temps','limites'],help:'Motivations, compétences, temps et limites du groupe.'},
  {id:3,key:'fleur',name:'Fleur de Pouvoir',icon:'🌸',phase:'voir',xp:50,fields:['identites','privileges','oppressions'],help:'Identités sociales, privilèges, systèmes d\'oppression.'},
  {id:4,key:'acteurs',name:'Cartographie Acteurs',icon:'🗺️',phase:'voir',xp:50,fields:['allies','opposants','neutres','cibles'],help:'Alliés, opposants, neutres, cibles prioritaires.'},
  {id:5,key:'swot',name:'Analyse SWOT',icon:'📊',phase:'juger',xp:75,fields:['forces','faiblesses','opportunites','menaces'],help:'Forces/Faiblesses internes, Opportunités/Menaces externes.'},
  {id:6,key:'pestel',name:'Analyse PESTEL',icon:'🌍',phase:'juger',xp:75,fields:['politique','economique','social','technologique','environnemental','legal'],help:'Macro: Politique, Économique, Social, Techno, Environnement, Légal.'},
  {id:7,key:'arbre',name:'Arbre à Problèmes',icon:'🌳',phase:'juger',xp:75,fields:['probleme_central','causes','effets'],help:'Problème central, causes (racines), effets (branches).'},
  {id:8,key:'pourquoi',name:'Les 5 Pourquoi',icon:'❓',phase:'juger',xp:75,fields:['symptome','pq1','pq2','pq3','pq4','pq5'],help:'Symptôme → 5× Pourquoi → cause racine.'},
  {id:9,key:'theorie',name:'Théorie du Changement',icon:'📐',phase:'juger',xp:75,fields:['situation_actuelle','changement_vise','activites','resultats','impact'],help:'Situation → activités → résultats → impact.'},
  {id:10,key:'alliance',name:'Avec / Sans / Contre',icon:'⚔️',phase:'agir',xp:100,fields:['avec','sans','contre'],help:'Avec qui, sans qui, contre qui.'},
  {id:11,key:'smart',name:'Objectifs SMART',icon:'🎯',phase:'agir',xp:100,fields:['specifique','mesurable','atteignable','relevant','temporel'],help:'Spécifique, Mesurable, Atteignable, Relevant, Temporel.'},
  {id:12,key:'cibles',name:'Cibles & Alliances',icon:'🎪',phase:'agir',xp:100,fields:['cible_primaire','cible_secondaire','allies_potentiels','strategie'],help:'Cibles de plaidoyer et alliances.'},
  {id:13,key:'message',name:'Construction du Message',icon:'📣',phase:'agir',xp:100,fields:['accroche','probleme','importance','cible','action'],help:'Accroche → Problème → Importance → Cible → Action.'},
  {id:14,key:'checklist',name:'Check-list Rencontre',icon:'📋',phase:'agir',xp:100,fields:['objectif','arguments','documents','questions','suivi'],help:'Objectif, arguments, documents, questions, suivi.'},
  {id:15,key:'suivi',name:'Suivi & Évaluation',icon:'📈',phase:'agir',xp:100,fields:['indicateurs','sources','frequence','responsable','ajustements'],help:'Indicateurs, sources, fréquence, responsables.'}
];

var ACHIEVEMENTS = [
  {id:'first_mission',name:'Premier Briefing',desc:'Ouvrir la liste des missions',icon:'📋',xp:15},
  {id:'first_obj',name:'Première Victoire',desc:'Compléter un objectif',icon:'✅',xp:25},
  {id:'first_read',name:'Apprenti·e',desc:'Lire le contenu d\'un objectif',icon:'📖',xp:20},
  {id:'mission_complete',name:'Mission Accomplie',desc:'Terminer une mission',icon:'🎖️',xp:100},
  {id:'quiz_pass',name:'Examen Réussi',desc:'Réussir un quiz (≥60%)',icon:'🎓',xp:50},
  {id:'quiz_perfect',name:'Score Parfait',desc:'100% à un quiz',icon:'💯',xp:100},
  {id:'five_missions',name:'Vétéran·e',desc:'Compléter 5 missions',icon:'⭐',xp:200},
  {id:'all_missions',name:'Résistance Totale',desc:'Compléter toutes les missions',icon:'🏆',xp:500},
  {id:'first_tool',name:'Premier Outil',desc:'Compléter un outil',icon:'🛠️',xp:50},
  {id:'all_tools',name:'Arsenal Complet',desc:'Compléter les 15 outils',icon:'⚔️',xp:300},
  {id:'voir_done',name:'Vision Claire',desc:'Tous les outils VOIR',icon:'👁️',xp:100},
  {id:'juger_done',name:'Jugement Sûr',desc:'Tous les outils JUGER',icon:'⚖️',xp:100},
  {id:'agir_done',name:'Passage à l\'Action',desc:'Tous les outils AGIR',icon:'✊',xp:100},
  {id:'first_file',name:'Premier Fichier',desc:'Importer un fichier',icon:'📁',xp:15},
  {id:'collector',name:'Archiviste',desc:'10 fichiers',icon:'📊',xp:75},
  {id:'fc_session',name:'Révision',desc:'Terminer une session flashcards',icon:'📚',xp:30},
  {id:'fc_master',name:'Mémoire Vive',desc:'100 cartes révisées',icon:'🧠',xp:100},
  {id:'fc_perfect',name:'Sans Faute',desc:'Session parfaite (10+ cartes)',icon:'💎',xp:75},
  {id:'night_owl',name:'Hibou Citoyen',desc:'Travailler entre 0h et 5h',icon:'🦉',xp:50},
  {id:'exporter',name:'Sauvegarde',desc:'Exporter un projet',icon:'💾',xp:25},
  {id:'three_guerres',name:'三种公民战法',desc:'Mission Trois Guerres',icon:'⚔️',xp:150},
  {id:'speed_run',name:'Blitz',desc:'3 objectifs en 5 minutes',icon:'⚡',xp:75},
  {id:'explorer',name:'Explorateur·rice',desc:'Visiter toutes les sections',icon:'🧭',xp:50},
  {id:'prefill_used',name:'Contextualisation',desc:'Utiliser un outil pré-rempli',icon:'🔗',xp:30}
];

var DEMO_FLASHCARDS = [
  {q:"Coalition Arizona — combien de partis?",a:"5 : N-VA, MR, Engagés, CD&V, Vooruit",tags:['arizona']},
  {q:"Premier ministre Arizona?",a:"Bart De Wever (N-VA)",tags:['arizona']},
  {q:"Durée max chômage après réforme?",a:"24 mois",tags:['arizona']},
  {q:"Exclusions Vague 1?",a:"30.122 personnes",tags:['arizona']},
  {q:"Exclusions cumulées 2027?",a:"90.000 estimées",tags:['arizona']},
  {q:"Art. 23 — que garantit-il?",a:"Droit à la sécurité sociale, santé, logement, travail, culture",tags:['art23']},
  {q:"Principe de standstill?",a:"Interdit toute régression sociale",tags:['art23']},
  {q:"Date recours constitutionnel?",a:"29 octobre 2025",tags:['art23']},
  {q:"Coût inactivité par heure?",a:"1 million d'euros",tags:['ecp']},
  {q:"Inactifs contraints?",a:"978.000 personnes",tags:['ecp']},
  {q:"Budget ECP vs Arizona?",a:"24K€ vs 9,2 Mrd€",tags:['ecp']},
  {q:"Belges AROPE?",a:"2,1M (18,3%)",tags:['arizona']},
  {q:"Mandataires belges?",a:"31.806 (1/km²)",tags:['particratie']},
  {q:"Financement public partis?",a:">80%",tags:['particratie']},
  {q:"Parlements en Belgique?",a:"6",tags:['particratie']},
  {q:"三种公民战法?",a:"Les Trois Guerres Civiques",tags:['trois guerres']},
  {q:"Guerre I civique?",a:"Récit (舆论战) — OSINT, contre-narratifs",tags:['trois guerres']},
  {q:"Guerre II civique?",a:"Dé-sidération (心理战) — éducation permanente",tags:['trois guerres']},
  {q:"Guerre III civique?",a:"Prétoire (法律战) — lawfare citoyen",tags:['trois guerres']},
  {q:"Ratio montage Deborsu?",a:"120:1",tags:['deborsu']},
  {q:"BIM?",a:"Bénéficiaire Intervention Majorée — 2,4M",tags:['arizona']},
  {q:"Sanctions MLD multipliées par?",a:"4 (de 2,5% à 10%)",tags:['mld']},
  {q:"MLD en Belgique?",a:"500.000+",tags:['mld']},
  {q:"Seuil interpellation BXL?",a:"25 personnes",tags:['commune']},
  {q:"Compensation CPAS/an?",a:"518€ (dérisoire)",tags:['commune']},
  {q:"Surcoût CPAS Bruxelles?",a:"~87M€/an",tags:['commune']},
  {q:"Moratoire Éducation Permanente?",a:"2026-2028",tags:['éducation permanente']},
  {q:"Budget total ouaisfieu?",a:"870€ sur 2,5 ans",tags:['financement']},
  {q:"Analyses produites?",a:"70+",tags:['osint']},
  {q:"Étudiants insécurité alimentaire?",a:"58%",tags:['arizona']},
  {q:"Méthodologie ouaisfieu?",a:"Fork · Hack · Spread",tags:['osint']},
  {q:"DIKW?",a:"Données → Information → Connaissance → Sagesse",tags:['osint']},
  {q:"Pilarisation?",a:"Organisation en piliers confessionnels/idéologiques",tags:['particratie']},
  {q:"Consociationalisme?",a:"Démocratie consensus entre segments opposés",tags:['particratie']},
  {q:"Stemvee?",a:"« Bétail de vote »",tags:['particratie']},
  {q:"Cadrage épisodique?",a:"Histoires individuelles (vs thématique: causes systémiques)",tags:['deborsu']},
  {q:"Herman-Chomsky : combien de filtres?",a:"5 filtres de propagande",tags:['deborsu']},
  {q:"Klimaatzaak?",a:"État condamné pour inaction climatique (non exécuté)",tags:['art23']},
  {q:"Arrêt Camara?",a:"Défaillance systémique belge (CEDH 2023)",tags:['art23']},
  {q:"Décret EP — combien d'axes?",a:"4 : analyse, participation, émancipation, droits",tags:['éducation permanente']}
];

var QUOTES = [
  {t:"Il est plus facile de tromper les gens que de les convaincre qu'ils ont été trompés.",a:"Mark Twain"},
  {t:"Ce n'est pas une guerre de l'information, mais une guerre sur le sens de l'information.",a:"Civil Affairs Assoc."},
  {t:"Ne doutez jamais qu'un petit groupe de citoyens engagés puisse changer le monde.",a:"Margaret Mead"},
  {t:"L'injustice quelque part est une menace pour la justice partout.",a:"Martin Luther King Jr."},
  {t:"Le silence devient lâcheté quand l'occasion exige de parler.",a:"Gandhi"},
  {t:"On ne subit pas l'avenir, on le fait.",a:"Georges Bernanos"},
  {t:"L'éducation permanente vise l'émancipation individuelle et collective.",a:"Décret 17/07/2003"},
  {t:"Le code est une arme. L'information est une munition.",a:"ouaisfieu"},
  {t:"Face à l'impuissance des urnes, le citoyen s'est tourné vers le juge.",a:"Analyse particratie"},
  {t:"La complexité n'est pas un bug, c'est le bouclier psychologique du système.",a:"Trois Guerres Civiques"},
  {t:"978.000 personnes ne sont pas inactives par choix. Elles sont inactives par système.",a:"Plaidoyer ECP"},
  {t:"Surveiller, éveiller, contraindre.",a:"三种公民战法"},
  {t:"Chaque interaction doit faire monter dans la pyramide DIKW.",a:"Doctrine ouaisfieu"},
  {t:"Fork · Hack · Spread.",a:"Méthodologie ouaisfieu"}
];
