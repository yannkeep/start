# 🤝 Guide de contribution

Merci de vouloir contribuer à **POLiT!KA** ! Ce guide vous aidera à participer efficacement au projet.

## 📋 Table des matières

- [Code de conduite](#-code-de-conduite)
- [Comment contribuer](#-comment-contribuer)
- [Signaler un bug](#-signaler-un-bug)
- [Proposer une amélioration](#-proposer-une-amélioration)
- [Soumettre du code](#-soumettre-du-code)
- [Standards de code](#-standards-de-code)
- [Processus de review](#-processus-de-review)

---

## 📜 Code de conduite

Ce projet adhère à un code de conduite simple :

- **Respect** — Traitez tout le monde avec respect
- **Inclusion** — Accueillez les contributions de tous
- **Constructivité** — Les critiques doivent être constructives
- **Bienveillance** — Assumez la bonne foi des autres

---

## 🚀 Comment contribuer

### Types de contributions

| Type | Description | Difficulté |
|------|-------------|------------|
| 🐛 Bug fix | Corriger un problème existant | 🟢 Facile |
| 📖 Documentation | Améliorer les guides et README | 🟢 Facile |
| 🌍 Traduction | Ajouter une nouvelle langue | 🟡 Moyen |
| 🎨 Design | Nouveaux thèmes ou améliorations UI | 🟡 Moyen |
| 📊 Données | Mise à jour des données politiques | 🟡 Moyen |
| 📦 Module | Créer un nouveau module | 🔴 Avancé |
| ⚙️ Core | Modifier le hub central | 🔴 Avancé |

### Première contribution ?

Cherchez les issues avec le label `good first issue` — elles sont parfaites pour débuter !

---

## 🐛 Signaler un bug

### Avant de signaler

1. Vérifiez que le bug n'est pas déjà signalé dans les [Issues](https://github.com/votre-username/politika/issues)
2. Testez avec la dernière version
3. Essayez dans un autre navigateur

### Comment signaler

Créez une [nouvelle issue](https://github.com/votre-username/politika/issues/new) avec :

```markdown
## 🐛 Description du bug
[Description claire et concise]

## 📝 Étapes pour reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Observer l'erreur

## ✅ Comportement attendu
[Ce qui devrait se passer]

## ❌ Comportement actuel
[Ce qui se passe réellement]

## 📸 Captures d'écran
[Si applicable]

## 🌐 Environnement
- Navigateur : [ex: Chrome 120]
- OS : [ex: Windows 11]
- Module : [ex: Flashcards]
```

---

## 💡 Proposer une amélioration

### Avant de proposer

1. Vérifiez la [Roadmap](README.md#-roadmap)
2. Cherchez dans les issues existantes
3. Réfléchissez à l'impact sur l'architecture low-tech

### Comment proposer

Créez une issue avec le label `enhancement` :

```markdown
## 💡 Résumé
[Description courte de l'amélioration]

## 🎯 Motivation
[Pourquoi cette amélioration est utile]

## 📐 Solution proposée
[Comment vous imaginez l'implémentation]

## 🔄 Alternatives considérées
[Autres approches possibles]

## ➕ Contexte additionnel
[Tout autre détail utile]
```

---

## 💻 Soumettre du code

### Processus

1. **Fork** le repository
2. **Clone** votre fork localement
3. **Créez une branche** pour votre modification
4. **Développez** votre contribution
5. **Testez** manuellement dans plusieurs navigateurs
6. **Committez** avec un message clair
7. **Push** vers votre fork
8. **Ouvrez une Pull Request**

### Commandes

```bash
# 1. Fork via l'interface GitHub, puis :
git clone https://github.com/VOTRE-USERNAME/politika.git
cd politika

# 2. Créer une branche
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug-xyz

# 3. Développer...

# 4. Commit
git add .
git commit -m "feat: ajoute le module XYZ"

# 5. Push
git push origin feature/ma-nouvelle-fonctionnalite

# 6. Ouvrir une PR via GitHub
```

### Format des commits

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description courte

[corps optionnel]

[footer optionnel]
```

**Types :**
- `feat` — Nouvelle fonctionnalité
- `fix` — Correction de bug
- `docs` — Documentation
- `style` — Formatage (pas de changement de code)
- `refactor` — Refactoring
- `test` — Ajout de tests
- `chore` — Maintenance

**Exemples :**
```
feat(flashcards): ajoute le mode révision espacée
fix(panopticon): corrige le rendu du graphe D3.js
docs(readme): met à jour les instructions d'installation
style(hub): améliore l'espacement des cartes
```

---

## 📏 Standards de code

### Architecture

| Règle | Description |
|-------|-------------|
| **Fichiers autonomes** | Chaque module = 1 fichier HTML complet |
| **Zéro dépendance** | Pas de npm, pas de build |
| **Vanilla JS** | Pas de framework (React, Vue, etc.) |
| **CSS inline** | Styles dans `<style>` du fichier |
| **Données localStorage** | Persistance côté client |

### HTML

```html
<!-- ✅ Bon -->
<button class="btn btn-primary" onclick="handleClick()">
  Action
</button>

<!-- ❌ Éviter -->
<button class="btn btn-primary" id="myBtn">Action</button>
<script>
  document.getElementById('myBtn').addEventListener('click', handleClick);
</script>
```

### CSS

```css
/* ✅ Utiliser les variables CSS */
.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

/* ❌ Éviter les valeurs en dur */
.card {
  background: #1a1a24;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
}
```

### JavaScript

```javascript
// ✅ Fonctions simples et lisibles
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ✅ Gestion d'erreurs
function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) data = JSON.parse(saved);
  } catch(e) {
    console.error('Erreur chargement:', e);
  }
}

// ❌ Éviter les one-liners illisibles
const loadData = () => { try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) {} };
```

### Format de données

Respectez le schéma `kern-schema.json` :

```json
{
  "version": 2,
  "updated": "YYYY-MM-DD",
  "meta": { "platform": "KERN / POLiT!KA" },
  "items": [
    {
      "id": "snake_case_unique",
      "title": "Titre",
      "description": "Description",
      "tags": ["tag1", "tag2"],
      "created": "YYYY-MM-DD"
    }
  ]
}
```

---

## 🔍 Processus de review

### Checklist PR

Avant de soumettre, vérifiez :

- [ ] Le code suit les standards ci-dessus
- [ ] Testé sur Chrome, Firefox, Safari
- [ ] Fonctionne en mode hors-ligne
- [ ] Pas de console.log de debug
- [ ] Les données sont sauvegardées correctement
- [ ] Le fichier est autonome (pas de dépendances cassées)
- [ ] La PR a une description claire

### Délai de review

- 🟢 **Bug fixes** : 1-2 jours
- 🟡 **Petites features** : 3-5 jours
- 🔴 **Gros changements** : 1-2 semaines

### Critères d'acceptation

1. **Fonctionnel** — Le code fait ce qu'il promet
2. **Compatible** — Fonctionne avec l'existant
3. **Maintenable** — Code lisible et documenté
4. **Low-tech** — Respecte la philosophie du projet

---

## 🌍 Traductions

### Ajouter une langue

1. Créez un fichier `i18n/[lang].json`
2. Traduisez toutes les clés
3. Testez l'interface complète
4. Soumettez une PR

### Structure i18n

```json
{
  "lang": "nl",
  "name": "Nederlands",
  "translations": {
    "hub.title": "Maak je partij, win de verkiezingen",
    "hub.subtitle": "Van gewone burger tot winnende kandidaat",
    "nav.home": "Home",
    "nav.modules": "Modules",
    "nav.data": "Gegevens"
  }
}
```

---

## 📊 Mise à jour des données politiques

### Sources officielles

| Niveau | Source |
|--------|--------|
| Européen | europarl.europa.eu |
| Fédéral | lachambre.be, senate.be |
| Régional | parlement-wallonie.be, vlaamsparlement.be |
| Communal | ibz.be |

### Processus

1. Vérifiez les sources officielles
2. Mettez à jour `data/belgique-YYYY.json`
3. Documentez les changements
4. Soumettez une PR avec les sources

---

## ❓ Questions ?

- 💬 [Discussions GitHub](https://github.com/votre-username/politika/discussions)
- 📧 contact@politika.be

---

Merci de contribuer à **POLiT!KA** ! Ensemble, renforçons la démocratie citoyenne. 🗳️
