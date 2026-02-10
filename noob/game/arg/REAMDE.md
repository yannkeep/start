# Audit Complet — RÉSISTANCE CITOYENNE v2

**Date :** 10 février 2026  
**Périmètre :** 5 fichiers, 1.769 lignes, 85 KB  
**Verdict global :** Fondation solide, architecture propre, mais un bug critique d'économie XP et des manques significatifs en accessibilité et profondeur de jeu.

---

## 1. SYNTHÈSE EXÉCUTIVE

| Domaine | Note | Verdict |
|---------|------|---------|
| Syntaxe / Intégrité | ✅ 10/10 | Zéro erreur, zéro doublon, tout cross-référencé |
| Architecture | ✅ 9/10 | Séparation data/engine/app propre, un seul couplage à clarifier |
| Mobile-First CSS | ✅ 9/10 | 9 breakpoints min-width, 0 max-width, touch targets 44px |
| Économie de jeu | ⚠️ 4/10 | **Bug critique** : impossible d'atteindre le rang max |
| Profondeur de jeu | ⚠️ 5/10 | Objectifs = simples checkboxes, pas de contenu interactif réel |
| Accessibilité | ❌ 2/10 | 0 ARIA, 0 role, 0 tabindex, 0 focus management |
| Performance | ⚠️ 6/10 | 38 onclick inline, 8 innerHTML complets, 0 virtualisation |
| Sécurité | ✅ 8/10 | 14 appels esc(), 0 eval(), mais innerHTML reste un vecteur |
| Contenu | ✅ 8/10 | 12 missions riches, 40 flashcards, 14 citations, données vérifiées |
| Fonctionnalités manquantes | ⚠️ 5/10 | Pas de recherche, timer, journal, stats, onboarding, PWA, partage |

---

## 2. BUG CRITIQUE — ÉCONOMIE XP CASSÉE

### Le problème

```
XP gagnable par objectifs :     1.130
XP gagnable par outils :        1.175
XP gagnable par achievements :  2.135
────────────────────────────────────
TOTAL MAXIMUM :                 4.440 XP
Rang LÉGENDE requis :           6.000 XP
DÉFICIT :                      -1.560 XP  ← IMPOSSIBLE
```

**Le rang LÉGENDE est mathématiquement inatteignable.** Le joueur sera bloqué à MAÎTRE·SSE (4.000 XP) sans jamais pouvoir progresser.

### Causes

1. **`mission.xpBase` n'est jamais distribué.** Chaque mission affiche un `xpBase` (total : 1.190 XP) mais aucun code ne l'attribue au joueur. C'est purement décoratif.

2. **Double comptage trompeur.** Les achievements `mission_complete`, `five_missions`, `all_missions` donnent de l'XP qui est déjà la récompense des objectifs individuels — mais même avec ce « double dip », le total reste insuffisant.

### Corrections proposées

**Option A — Distribuer xpBase à la complétion de mission :**
```javascript
// Dans completeObjective(), après la vérification allDone :
if(allDone){
  addXP(m.xpBase); // ← AJOUTER
  unlock('mission_complete');
}
```
Nouveau total : 4.440 + 1.190 = **5.630 XP** — encore insuffisant de 370.

**Option B (recommandée) — Réduire le seuil LÉGENDE :**
```javascript
{ name:'LÉGENDE', min:5000, icon:'🔥', color:'#ff6ec7' }  // au lieu de 6000
```
Ou ajouter des sources d'XP récurrentes (voir §7).

---

## 3. INTÉGRITÉ TECHNIQUE

### ✅ Ce qui fonctionne parfaitement

| Vérification | Résultat |
|---|---|
| Syntaxe JS (3 fichiers) | ✓ Aucune erreur |
| Fonctions définies | 43, aucun doublon |
| onclick HTML → fonctions JS | 10/10 trouvés |
| onclick app.js inline → fonctions JS | 31/31 trouvés |
| Références cross-fichiers | data→engine ✓, engine→app ✓ |
| IDs objectifs | 55, tous uniques |
| Références mission→tool | toutes valides |
| Triggers achievements | 20/20 tous câblés |
| Accolades | 487/487 (data 212, engine 91, app 184) |
| Parenthèses | 630/630 |
| Backticks | 72 (pair) |

### ⚠️ Points d'attention

**Constantes cross-fichiers non-explicites :**
- `DEMO_FLASHCARDS` : utilisé dans engine.js mais défini dans data.js → fonctionne car chargé avant, mais fragile.
- `QUOTES` : utilisé dans app.js mais défini dans data.js → même situation.
- Recommandation : documenter l'ordre de chargement ou utiliser un module bundler.

**8 fonctions engine non-appelées directement depuis app.js :**
- `getNextRank`, `vibrate`, `csvLine`, `parseCSV`, etc. — Fonctions internes légitimes, pas de code mort réel, mais `vibrate()` n'est appelé que depuis `engine.js` lui-même.

---

## 4. PROFONDEUR DE JEU — ANALYSE CRITIQUE

### Le problème central

Les objectifs de mission sont de **simples checkboxes sans vérification**. Le joueur peut cocher « Documenter les 5 boucles destructrices » sans jamais les avoir vues. Il n'y a aucune différence entre « j'ai lu et compris » et « j'ai cliqué sans lire ».

### Ce qui manque pour un vrai jeu éducatif

| Fonctionnalité | État | Impact |
|---|---|---|
| Contenu dans les objectifs (texte, données, quiz) | ❌ Absent | Le joueur n'apprend rien en cochant |
| Quiz de validation avant complétion | ❌ Absent | Pas de vérification de la compréhension |
| Briefing interactif (cliquer pour révéler) | ❌ Absent | Lecture passive |
| Missions avec étapes séquentielles | ❌ Absent | Tout est une flat list |
| Liens entre missions (prérequis narratifs) | ❌ Absent | Les missions sont isolées |
| Dossier « Intel » consultable par mission | ❌ Absent | Les chiffres sont affichés mais pas exploitables |
| Système de « preuves » à collecter | ❌ Absent | Gamification superficielle |
| Flashcards liées aux missions | ❌ Absent | Flashcards et missions sont déconnectées |
| Outil pré-rempli selon la mission | ❌ Absent | L'outil est vide même si la mission le recommande |

### Diagnostic

Le jeu a la **coquille** d'un RPG éducatif (rangs, XP, achievements, missions) mais le **contenu interactif** d'une simple todo-list. C'est un gestionnaire de tâches gamifié, pas un jeu d'apprentissage.

---

## 5. ACCESSIBILITÉ — ÉTAT CRITIQUE

| Critère WCAG | État | Priorité |
|---|---|---|
| `aria-label` sur boutons icône-seul | ❌ 0 attribut | **P1** |
| `role="button"` sur divs cliquables | ❌ 0 attribut | **P1** |
| `tabindex` pour navigation clavier | ❌ 0 attribut | **P1** |
| Gestion du focus après navigation | ❌ aucun `.focus()` | **P1** |
| `aria-live` pour les toasts | ❌ absent | **P2** |
| `aria-expanded` pour le lore dépliable | ❌ absent | **P2** |
| `prefers-reduced-motion` | ❌ absent | **P2** |
| `prefers-color-scheme` (auto dark/light) | ❌ absent | **P3** |
| Skip to content link | ❌ absent | **P3** |
| Contraste des couleurs (t3 sur bg) | ⚠️ Non vérifié | **P2** |

**Un utilisateur clavier ou lecteur d'écran ne peut pas utiliser ce jeu du tout.**

---

## 6. CSS — DÉTAIL

### ✅ Points forts
- **100% mobile-first** : 9 breakpoints `min-width`, 0 `@media(max-width)`
- 4 thèmes visuels cohérents via CSS variables
- Touch targets ≥44px sur les éléments interactifs principaux
- `safe-area-inset-bottom` pour les encoches iPhone
- `overscroll-behavior-y: contain` pour éviter le pull-to-refresh
- `-webkit-tap-highlight-color: transparent`
- Scrollbar custom discrète
- `backdrop-filter: blur()` sur header et nav

### ⚠️ Points à améliorer

| Problème | Impact |
|---|---|
| `body { overflow: hidden }` absent → scroll bounce sur certains mobiles | Mineur |
| Pas de `@media print` | Moyen — impossible d'imprimer une mission |
| Pas de `@supports` pour `backdrop-filter` | Mineur — fallback transparent sur anciens navigateurs |
| `.fc-front, .fc-back` en `position: absolute` avec `min-height` → la carte ne s'adapte pas au contenu long | **Moyen** — réponses longues coupées |
| Pas de `scroll-snap` sur le carousel de flashcards (si ajouté) | Mineur |
| Breakpoints non harmonisés : 480/500/600/700/800/900px (6 points différents) | Mineur — simplifier à 3-4 |

### Flashcard height bug

```css
/* Problème : la carte a une min-height fixe mais le contenu peut dépasser */
.fc-front,.fc-back { position:absolute; inset:0; /* ... */ }
.fc-inner { position:relative; width:100%; min-height:200px; }
```

Si la réponse fait 300px de haut, elle sera coupée. **Correction :** utiliser un JS qui mesure le contenu et ajuste `min-height` dynamiquement, ou passer en `position: relative` avec un trick CSS pour le flip.

---

## 7. PISTES D'AMÉLIORATION — ROADMAP

### 🔴 P0 — Corrections critiques

1. **Fixer l'économie XP** : distribuer `xpBase` à la complétion de mission ET ajouter un bonus XP récurrent (flashcards = +2XP/carte, timer quotidien = +10XP).

2. **Fixer la hauteur des flashcards** : mesurer le contenu dynamiquement.

3. **Ajouter `aria-label`** au minimum sur les 10 boutons du header et de la bottom nav.

### 🟡 P1 — Profondeur de jeu (impact maximal)

4. **Contenu intégré dans les objectifs.** Chaque objectif devrait avoir un champ `content` (texte pédagogique, 2-3 paragraphes) que le joueur lit avant de pouvoir cocher. Exemple :

```javascript
{id:'az1', text:'Identifier les 8 failles du budget Arizona', xp:20,
 content: `Les 8 failles identifiées sont :\n1. Transfert non-financé vers les CPAS...\n2. Piège du taux marginal >100%...`}
```

5. **Mini-quiz par mission.** Après avoir coché tous les objectifs, un quiz de 5 questions (puisées dans les flashcards liées) valide la compréhension avant de débloquer la récompense xpBase.

6. **Flashcards liées aux missions.** Chaque mission a un champ `flashcardIds` qui filtre les cartes pertinentes. Bouton « Réviser cette mission » dans la vue mission.

7. **Outils pré-remplis.** Quand on ouvre un outil depuis une mission, les champs sont pré-remplis avec le contenu de cette mission (SWOT d'Arizona, 5 Pourquoi de Deborsu, etc.).

8. **Système de « Preuves » (Evidence Locker).** Chaque mission a des documents/liens/données à « collecter ». Affichage dans un onglet dédié. Gamification : « 3/5 preuves collectées ».

### 🟢 P2 — Fonctionnalités manquantes

9. **Recherche globale.** Un champ de recherche qui filtre missions, outils, flashcards, achievements en temps réel. 20 lignes de JS.

10. **Vue Statistiques / Dashboard analytique.**
    - Temps passé par mission
    - Taux de réussite flashcards par thème
    - Graphique de progression XP dans le temps
    - Heatmap d'activité (quel jour, quelle heure)

11. **Timer Pomodoro citoyen.** 25 min de travail + 5 min de pause. +10XP par session. Intégré dans la vue mission.

12. **Journal de bord.** Notes libres datées, liées à une mission ou pas. Exportable en markdown.

13. **Mode Examen.** Flashcards en mode chronométré (30s/carte), score final, classement personnel.

14. **Onboarding / Tutorial.** Au premier lancement, un guided tour de 5 étapes (highlight chaque section). Achievement « Explorer·rice » débloqué naturellement.

15. **PWA + Service Worker.** Manifeste, icône, offline-first. Le jeu doit fonctionner dans le métro.

16. **Partage social.** Bouton « Partager ma progression » → image PNG générée avec rang, stats, quote.

### 🔵 P3 — Polish

17. **Animations d'entrée.** Staggered reveal sur les cartes mission, transition slide entre vues (pas juste `innerHTML`).

18. **Son.**  Bip discret à la complétion d'objectif, fanfare au rank-up. Toggle mute.

19. **Mode Impression.** `@media print` pour exporter une mission complète avec ses objectifs, intel, outils remplis.

20. **Thème clair.** Un 5e thème light pour usage en journée/projection.

21. **Internationalisation (i18n).** Toutes les strings dans un fichier `lang/fr.js`. Préparer `nl.js` pour la Flandre et `en.js` pour Erasmus+.

22. **Tests automatisés.** Au minimum : tests unitaires sur l'économie XP (vérifier que le rang max est atteignable), sur la complétude des triggers d'achievements, sur l'intégrité des données.

---

## 8. ARCHITECTURE PROPOSÉE (si expansion)

```
resistance/
├── index.html
├── manifest.json          ← PWA
├── sw.js                  ← Service Worker
├── css/
│   └── style.css
├── js/
│   ├── data.js            ← Contenu statique
│   ├── engine.js           ← Moteur de jeu
│   ├── app.js              ← UI/Rendering
│   ├── quiz.js             ← Module quiz        ← NOUVEAU
│   ├── stats.js            ← Module statistiques ← NOUVEAU
│   ├── journal.js          ← Module journal      ← NOUVEAU
│   └── evidence.js         ← Module preuves      ← NOUVEAU
├── lang/
│   ├── fr.js
│   └── nl.js
├── content/
│   ├── arizona.json        ← Contenu détaillé par mission
│   ├── deborsu.json
│   └── ...
└── img/
    └── icons/
```

---

## 9. RÉSUMÉ DES PRIORITÉS

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Fixer économie XP (xpBase + seuil) | 15 min | ⬛⬛⬛⬛⬛ |
| 2 | Ajouter contenu dans les objectifs | 2-3h | ⬛⬛⬛⬛⬛ |
| 3 | ARIA basique (labels, roles) | 30 min | ⬛⬛⬛⬛ |
| 4 | Fixer hauteur flashcards | 20 min | ⬛⬛⬛ |
| 5 | Mini-quiz par mission | 1-2h | ⬛⬛⬛⬛ |
| 6 | Recherche globale | 30 min | ⬛⬛⬛ |
| 7 | Vue statistiques | 1-2h | ⬛⬛⬛ |
| 8 | Journal de bord | 1h | ⬛⬛⬛ |
| 9 | PWA + offline | 1h | ⬛⬛⬛ |
| 10 | Outils pré-remplis par mission | 2h | ⬛⬛⬛⬛ |

---

*Audit réalisé par analyse statique du code source + vérification croisée des données. Aucun test utilisateur réel effectué.*
