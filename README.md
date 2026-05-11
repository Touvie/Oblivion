# Oblivion

Cher visiteur, bonjour !
Je savais bien que des gens viendront ici.

Contenu de la nouvelle version Oblivion V14 :

- Intégration du diaporama Metro_Moscovite (16 slides, assets WebP/WebM),
- Ajout du Laboratoire Numérique : Murmuration + Big Bang (Three.js, vanilla JS),
- Ajout des affiches Avril et Mai 2026,
- Ajout des projets Géolibri et Animation Figma,
- Nouvelles vidéos WebM dans la modal Figma (Nothing + Circle),
- Effet négatif au hover généralisé à tous les tableaux,
- Nettoyage CSS orphelins Metro_Moscovite.

Arborescence de fichier de Mai 2026 :

```text
📁 Oblivion/
│
├── 📄 index.html
├── 📄 Styles.css
├── 📄 app.js
│
├── 📁 assets/
│   ├── 🖼️ Favicon.ico
│   └── 🎞️ header-center.gif
│
├── 📁 js/
│   └── 📄 ScrollManager.js
│
└── 📁 modules/
    │
    ├── 📁 a-propos/
    │   ├── 📁 tableau/
    │   │   ├── 📄 Tableau.html
    │   │   ├── 📄 tableau.css
    │   │   └── 📄 tableau.js
    │   └── 📁 livre/
    │       ├── 📄 Livre.html
    │       ├── 📄 livre.css
    │       ├── 📄 livre.js
    │       └── 📁 images/
    │           └── 🖼️ Infographie.webp
    │
    ├── 📁 making-of/
    │   ├── 📄 Making-Of.html
    │   ├── 📄 making-of.css
    │   ├── 📄 making-of.js
    │   ├── 📁 images/
    │   │   ├── 🖼️ Awwwards.webp
    │   │   ├── 🖼️ Livre.webp
    │   │   ├── 🖼️ Mantis.webp
    │   │   ├── 🖼️ Maquette_Competences.webp
    │   │   ├── 🖼️ Maquette_Projet.webp
    │   │   ├── 🖼️ Material.webp
    │   │   ├── 🖼️ New.webp
    │   │   ├── 🖼️ Plan.webp
    │   │   ├── 🖼️ Prince.webp
    │   │   ├── 🖼️ Renard.webp
    │   │   ├── 🖼️ Retour.webp
    │   │   ├── 🖼️ Skybox.webp
    │   │   └── 🖼️ Splash.webp
    │   └── 📁 videos/
    │       ├── 🎬 Clawd.webm
    │       ├── 🎬 Rick.webm
    │       ├── 🎬 Third.webm
    │       └── 🎬 Quatro.webm
    │
    ├── 📁 projets/
    │   ├── 📄 Projets.html
    │   ├── 📄 Projets.css
    │   ├── 📄 Projets.js
    │   ├── 📁 images/
    │   │   ├── 🖼️ Avril.webp
    │   │   ├── 🖼️ Big_Brother.webp
    │   │   ├── 🖼️ Big_Brother2.webp
    │   │   ├── 🖼️ BigBang.webp
    │   │   ├── 🖼️ Escale.webp
    │   │   ├── 🖼️ Fevrier.webp
    │   │   ├── 🖼️ Fevrier2.webp
    │   │   ├── 🖼️ Frise.webp
    │   │   ├── 🖼️ geolibri.webp
    │   │   ├── 🖼️ Geolibri2.webp
    │   │   ├── 🖼️ Hermes.webp
    │   │   ├── 🖼️ Hermes2.webp
    │   │   ├── 🖼️ Italie2.webp
    │   │   ├── 🖼️ Mars.webp
    │   │   ├── 🖼️ Metro.webp
    │   │   ├── 🖼️ Murmuration.webp
    │   │   ├── 🖼️ Projets_Figma.webp
    │   │   ├── 🖼️ Rome.webp
    │   │   ├── 🖼️ Station_Moderne.webp
    │   │   └── 🖼️ Station_Trad.webp
    │   ├── 📁 videos/
    │   │   ├── 🎬 BigBang.webm
    │   │   ├── 🎬 Figma_Circle.webm
    │   │   ├── 🎬 Figma_Nothing.webm
    │   │   └── 🎬 Murmuration.webm
    │   ├── 📁 Metro_Moscovite/
    │   │   ├── 📄 index.html
    │   │   ├── 📄 data.js
    │   │   ├── 📄 script.js
    │   │   ├── 📄 style-global.css
    │   │   ├── 📄 style-ancien.css
    │   │   ├── 📄 style-moderne.css
    │   │   ├── 📄 style-intro.css
    │   │   ├── 📄 style-conclusion.css
    │   │   ├── 📄 style-fullscreen.css
    │   │   ├── 📁 Images/
    │   │   │   ├── 🖼️ Intro.webp
    │   │   │   ├── 🖼️ Moderne.webp
    │   │   │   ├── 🖼️ Trad.webp
    │   │   │   ├── 📁 Aminyevskaya/
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Hall2.webp
    │   │   │   │   └── 🖼️ Rail.webp
    │   │   │   ├── 📁 Belorusskaya/
    │   │   │   │   ├── 🖼️ Couloir.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Rail.webp
    │   │   │   │   └── 🖼️ Statuts.webp
    │   │   │   ├── 📁 Davydkovo/
    │   │   │   │   ├── 🖼️ Embleme.webp
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Frise.webp
    │   │   │   │   └── 🖼️ Hall.webp
    │   │   │   ├── 📁 Komsomolskaia/
    │   │   │   │   ├── 🖼️ Fresque.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Hall2.webp
    │   │   │   │   ├── 🖼️ Hall3.webp
    │   │   │   │   └── 🖼️ Plafond.webp
    │   │   │   ├── 📁 Kyivskaya/
    │   │   │   │   ├── 🖼️ Fresque.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   └── 🖼️ Hall2.webp
    │   │   │   ├── 📁 Novoslabodskaya/
    │   │   │   │   ├── 🖼️ Fresque.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   └── 🖼️ Vitre.webp
    │   │   │   ├── 📁 Prospekt/
    │   │   │   │   ├── 🖼️ Dehors.webp
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Hall2.webp
    │   │   │   │   └── 🖼️ Michurinsky_Prospect_ceiling.webp
    │   │   │   ├── 📁 Revoliutsii/
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Statut.webp
    │   │   │   │   └── 🖼️ Symbole.webp
    │   │   │   ├── 📁 Rizhskaya/
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Porte.webp
    │   │   │   │   ├── 🖼️ Rail.webp
    │   │   │   │   └── 🖼️ Rail2.webp
    │   │   │   ├── 📁 Taganskaya/
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   ├── 🖼️ Rond.webp
    │   │   │   │   └── 🖼️ Statut.webp
    │   │   │   ├── 📁 Terekhovo/
    │   │   │   │   ├── 🖼️ Escalator.webp
    │   │   │   │   ├── 🖼️ Fresque.webp
    │   │   │   │   ├── 🖼️ Hall.webp
    │   │   │   │   └── 🖼️ Hall2.webp
    │   │   │   └── 📁 Vorontsovskaya/
    │   │   │       ├── 🖼️ Escalator.webp
    │   │   │       ├── 🖼️ Hall.webp
    │   │   │       ├── 🖼️ Poteau.webp
    │   │   │       └── 🖼️ Poteau2.webp
    │   │   └── 📁 Videos/
    │   │       └── 🎬 Futur.webm
    │   └── 📁 Lab_Numerique/
    │       ├── 📁 Murmuration/
    │       │   ├── 📄 index.html
    │       │   ├── 📄 style.css
    │       │   └── 📄 script.js
    │       └── 📁 BigBang/
    │           ├── 📄 index.html
    │           ├── 📄 style.css
    │           └── 📄 script.js
    │
    └── 📁 competences/
        ├── 📄 Competences.html
        ├── 📄 Competences.css
        └── 📁 images/
            ├── 🖼️ Blender.webp
            ├── 🖼️ Canva.webp
            ├── 🖼️ Capcut.webp
            ├── 🖼️ Claude.webp
            ├── 🖼️ Figma.webp
            ├── 🖼️ Github.webp
            ├── 🖼️ Obsidian.webp
            ├── 🖼️ Scratch.webp
            ├── 🖼️ TouchDesigner.webp
            └── 🖼️ VSCode.webp

```

C'est tout pour aujourd'hui, en vous souhaitant une agréable et bonne journée,
Myself
