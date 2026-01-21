# 🏗️ Architecture technique

## Vue d'ensemble

POLiT!KA est une plateforme **low-tech** composée de fichiers HTML autonomes. Chaque module fonctionne indépendamment sans serveur ni build process.

```
┌─────────────────────────────────────────────────────────────┐
│                      POLiT!KA HUB                           │
│                     (index.html)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ L'iNTRO! │  │ L'iSTORE │  │Flashcards│  │  Kanban  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │             │          │
│       └─────────────┴─────────────┴─────────────┘          │
│                         │                                   │
│              ┌──────────▼──────────┐                       │
│              │    localStorage     │                       │
│              │   (données JSON)    │                       │
│              └─────────────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Principes fondamentaux

| Principe | Description | Pourquoi |
|----------|-------------|----------|
| **Low-tech** | HTML/CSS/JS vanilla uniquement | Accessibilité, durabilité, réappropriation |
| **Autonome** | Chaque fichier fonctionne seul | Pas de dépendance, pas de build |
| **Offline-first** | localStorage pour la persistance | Fonctionne sans internet |
| **Interopérable** | Format JSON standardisé | Échange de données entre modules |
| **Accessible** | Objectif WCAG 2.1 AA | Inclusion de tous les utilisateurs |

## Structure des fichiers

```
politika/
├── index.html              # Hub central (point d'entrée)
│
├── modules/                # Modules autonomes
│   ├── intro.html          # Profils & projets
│   ├── istore.html         # Catalogue ressources
│   ├── flashcards.html     # Quiz interactifs
│   ├── kanban.html         # Gestion de projets
│   ├── panopticon.html     # Graphe réseau
│   ├── repertoire-ep.html  # Cartographie associations
│   ├── ascension.html      # Jeu narratif
│   └── etoile-noire.html   # ARG
│
├── data/                   # Schémas et données
│   └── kern-schema.json    # Schéma unifié
│
├── assets/                 # Ressources statiques
│   └── logo.svg            # Logo POLiT!KA
│
└── docs/                   # Documentation
    └── ARCHITECTURE.md     # Ce fichier
```

## Stockage des données

### Clés localStorage

Chaque module utilise sa propre clé :

```javascript
// Hub central
localStorage.getItem('politika_data')
localStorage.getItem('politika_theme')

// Modules
localStorage.getItem('intro_data')
localStorage.getItem('istore_data')
localStorage.getItem('flashcards_data')
localStorage.getItem('kanban_data')
localStorage.getItem('panopticon_data')
localStorage.getItem('ascension_data')
localStorage.getItem('etoile_noire_data')
```

### Format de données

Tous les modules suivent le schéma `kern-schema.json` :

```json
{
  "version": 2,
  "updated": "2026-01-07",
  "meta": {
    "platform": "KERN / POLiT!KA",
    "author": "Collectif"
  },
  "items": [...],
  "profiles": [...],
  "projects": [...],
  "entities": [...],
  "decks": [...],
  "boards": [...]
}
```

### Propriétés communes

Tous les objets partagent ces propriétés :

```javascript
{
  "id": "snake_case_unique",   // Identifiant unique
  "created": "2026-01-07",     // Date de création
  "updated": "2026-01-07",     // Date de modification
  "tags": ["tag1", "tag2"]     // Tags pour recherche
}
```

## Architecture des modules

### Structure type d'un module

```html
<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module Name</title>
    <style>
        /* === VARIABLES CSS === */
        :root {
            --accent: #ef4444;
            --bg: #0a0a0f;
            --panel: #111118;
            --text: #f1f5f9;
            --muted: #94a3b8;
            --border: rgba(255,255,255,0.08);
        }
        
        /* === STYLES === */
        /* Tout le CSS inline */
    </style>
</head>
<body>
    <!-- === HTML === -->
    
    <script>
        // === CONSTANTS ===
        const STORAGE_KEY = 'module_data';
        
        // === STATE ===
        let data = { version: 2, items: [] };
        
        // === INIT ===
        document.addEventListener('DOMContentLoaded', init);
        
        function init() {
            loadData();
            render();
        }
        
        // === DATA ===
        function loadData() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) data = JSON.parse(saved);
            } catch(e) {
                console.error('Load error:', e);
            }
        }
        
        function saveData() {
            data.updated = new Date().toISOString().split('T')[0];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        
        // === RENDER ===
        function render() {
            // Mise à jour du DOM
        }
        
        // === IMPORT/EXPORT ===
        function exportData() {
            const blob = new Blob([JSON.stringify(data, null, 2)], 
                                  {type: 'application/json'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'module-data.json';
            a.click();
        }
        
        function importData(file) {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    data = JSON.parse(e.target.result);
                    saveData();
                    render();
                } catch(err) {
                    alert('Erreur import');
                }
            };
            reader.readAsText(file);
        }
    </script>
</body>
</html>
```

## Système de thèmes

### Variables CSS

```css
:root {
    /* Couleurs de base */
    --accent: #ef4444;
    --accent-dark: #dc2626;
    
    /* Thème sombre (défaut) */
    --bg: #0a0a0f;
    --panel: #111118;
    --card: #1a1a24;
    --text: #f1f5f9;
    --muted: #94a3b8;
    --border: rgba(255,255,255,0.08);
}

[data-theme="light"] {
    --bg: #f8fafc;
    --panel: #ffffff;
    --card: #f1f5f9;
    --text: #0f172a;
    --muted: #64748b;
    --border: rgba(0,0,0,0.08);
}
```

### Accents dynamiques

```css
[data-accent="rouge"] { --accent: #ef4444; }
[data-accent="bleu"] { --accent: #3b82f6; }
[data-accent="vert"] { --accent: #22c55e; }
/* etc. */
```

### Presets partis politiques

```css
[data-preset="ps"] { --accent: #e30613; }
[data-preset="mr"] { --accent: #0047ab; }
[data-preset="ecolo"] { --accent: #00a651; }
/* etc. */
```

## Communication inter-modules

### Via localStorage

```javascript
// Module A écrit
localStorage.setItem('shared_profiles', JSON.stringify(profiles));

// Module B lit
const profiles = JSON.parse(localStorage.getItem('shared_profiles') || '[]');
```

### Via URL parameters

```javascript
// Module A ouvre Module B avec paramètres
window.open('module-b.html?profile=' + profileId);

// Module B lit les paramètres
const params = new URLSearchParams(window.location.search);
const profileId = params.get('profile');
```

### Via Export/Import JSON

```javascript
// Export global depuis le Hub
function exportAllData() {
    const allData = {
        politika: JSON.parse(localStorage.getItem('politika_data')),
        intro: JSON.parse(localStorage.getItem('intro_data')),
        flashcards: JSON.parse(localStorage.getItem('flashcards_data')),
        // ...
    };
    // Téléchargement du fichier
}
```

## Gamification

### Système XP

```javascript
const LEVELS = [
    { level: 1, name: 'Citoyen éveillé', xp: 0 },
    { level: 2, name: 'Observateur actif', xp: 100 },
    { level: 3, name: 'Militant engagé', xp: 300 },
    // ...
];

function addXP(amount) {
    data.xp += amount;
    checkLevelUp();
    saveData();
}

function checkLevelUp() {
    const newLevel = LEVELS.filter(l => data.xp >= l.xp).pop();
    if (newLevel.level > data.level) {
        data.level = newLevel.level;
        showLevelUpAnimation(newLevel);
    }
}
```

## Performance

### Optimisations appliquées

| Technique | Impact |
|-----------|--------|
| CSS inline | Pas de requête externe |
| JS vanilla | Pas de framework lourd |
| Lazy rendering | DOM minimal |
| localStorage | Pas de requête serveur |
| SVG inline | Icônes légères |

### Tailles typiques

| Module | Taille | Complexité |
|--------|--------|------------|
| Hub | ~50 KB | Élevée |
| Flashcards | ~55 KB | Moyenne |
| Kanban | ~48 KB | Moyenne |
| L'iNTRO! | ~75 KB | Élevée |
| L'iSTORE! | ~68 KB | Élevée |

## Accessibilité

### Objectifs WCAG 2.1 AA

- [ ] Contraste couleurs ≥ 4.5:1
- [x] Navigation clavier
- [ ] Attributs ARIA
- [x] Focus visible
- [ ] Textes alternatifs

### Bonnes pratiques

```html
<!-- Boutons accessibles -->
<button aria-label="Fermer" onclick="close()">×</button>

<!-- Labels explicites -->
<label for="name">Nom complet</label>
<input id="name" type="text" required>

<!-- Skip links -->
<a href="#main" class="skip-link">Aller au contenu</a>
```

## Tests

### Tests manuels recommandés

1. **Multi-navigateurs** : Chrome, Firefox, Safari, Edge
2. **Responsive** : Mobile, Tablette, Desktop
3. **Offline** : Mode avion après chargement initial
4. **Import/Export** : Cycle complet de données
5. **Thèmes** : Tous les thèmes et accents

### Checklist pré-release

- [ ] Fonctionne sans serveur (file://)
- [ ] Données persistantes après refresh
- [ ] Export/Import fonctionnels
- [ ] Pas d'erreurs console
- [ ] Responsive mobile
- [ ] Thèmes appliqués correctement

## Évolutions futures

### Court terme
- Mode PWA (manifest.json, service worker)
- Synchronisation GitHub Gist

### Moyen terme
- Backend léger optionnel (Supabase)
- API REST pour intégrations

### Long terme
- Fonctionnalités collaboratives
- Modules additionnels communautaires
