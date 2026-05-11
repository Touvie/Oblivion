const stations = [
    // --- DIAPO 1 : INTRO ---
    {
        name: "Intro",
        styleType: "style-intro",
        subtitle: "", line: "", year: "", stationDesc: "",
        zoomPoint: "center center",
        teaserSize: "12vw",
        themeColor: "#000",
        images: [
            { label: "Cover", url: "Images/Intro.webp", imgDesc: "" }
        ]
    },

    // TRANSITION
    {
        name: "Transition Visuelle",
        styleType: "style-fullscreen",
        subtitle: "", line: "", year: "", stationDesc: "",
        zoomPoint: "center center", teaserSize: "0vw", themeColor: "#000",
        images: [
            { label: "Visuel", url: "Images/Trad.webp", imgDesc: "" }
        ]
    },

    // =========================================================
    // PARTIE STATIONS TRADITIONNELLES
    // =========================================================

    {
        name: "Комсомо́льская <br> <span style='font-size: 0.9em'>(Komsomolskaïa)</span>",
        splashTitle: "Комсомо́льская<br><span style='font-size: 0.2em'>Komsomolskaïa</span>",
        styleType: "style-ancien",
        subtitle: "Le Baroque Stalinien",
        line: "Ligne 5 (Cercle)",
        year: "1952",
        stationDesc: "Point culminant du style Impérial. Plafond orné de 8 mosaïques illustrant le discours de Staline de 1941. Anecdote : Staline y figurait mais a été effacé lors de la déstalinisation.",
        zoomPoint: "50.5% 50%",
        teaserSize: "9vw",
        themeColor: "#c5a05a",
        images: [
            { label: "Hall Principal", url: "Images/Komsomolskaia/Hall.webp", imgDesc: "Hall jaune aux motifs floraux très jolie" },
            { label: "Hall Principal", url: "Images/Komsomolskaia/Hall2.webp", imgDesc: "Hall jaune aux motifs floraux mais la nuit" },
            { label: "Hall Principal", url: "Images/Komsomolskaia/Hall3.webp", imgDesc: "Hall jaune aux motifs floraux mais d'en bas" },
            { label: "Détail Plafond", url: "Images/Komsomolskaia/Plafond.webp", imgDesc: "Mosaïques des grands généraux russes." },
        ]
    },
    {
        name: "Пло́щадь Револю́ции<br><span style='font-size: 0.9em'>(Plochtchad Revoliutsii)</span>",
        splashTitle: "Пло́щадь Револю́ции<br><span style='font-size: 0.2em'>Plochtchad Revoliutsii</span>",
        styleType: "style-ancien",
        subtitle: "Le Peuple de Bronze",
        line: "Ligne 3",
        year: "1938",
        stationDesc: "76 statues de bronze par Manizer. Superstition célèbre : toucher le museau du chien du garde-frontière porte bonheur aux examens (toucher le coq porterait malheur !).",
        zoomPoint: "52% 37%",
        teaserSize: "10vw",
        themeColor: "#1d3461",
        images: [
            { label: "Hall", url: "Images/Revoliutsii/Hall.webp", imgDesc: "Les arches abritant les statues." },
            { label: "Statut", url: "Images/Revoliutsii/Statut.webp", imgDesc: "deux statues de gens tah Stakhanov" },
            { label: "Symbole", url: "Images/Revoliutsii/Symbole.webp", imgDesc: "Avenir Radieux" },
            { label: "Escalator", url: "Images/Revoliutsii/Escalator.webp", imgDesc: "Tkt ils sont d'origines" }
        ]
    },
    {
        name: "Тага́нская<br><span style='font-size: 0.9em'>(Taganskaya)</span>",
        splashTitle: "Тага́нская<br><span style='font-size: 0.2em'>Taganskaya</span>",
        styleType: "style-ancien",
        subtitle: "Gloire Médiévale",
        line: "Ligne 5",
        year: "1950",
        stationDesc: "Panneaux en majolique bleue (faïence) inspirés du gothique et de l'artisanat médiéval. Profils de héros de l'armée rouge mêlés à des motifs floraux.",
        zoomPoint: "54% 50%",
        teaserSize: "10vw",
        themeColor: "#0c6eaf",
        images: [
            { label: "Hall", url: "Images/Taganskaya/Hall.webp", imgDesc: "Ambiance Mille et une nuit" },
            { label: "Statut", url: "Images/Taganskaya/Statut.webp", imgDesc: "Le PETIT papa des peuples" },
            { label: "Symbole", url: "Images/Taganskaya/Rond.webp", imgDesc: "Il est beau mon plafond" }
        ]
    },
    {
        name: "Новослобо́дская<br><span style='font-size: 0.9em'>(Novoslobodskaya)</span>",
        splashTitle: "Новослобо́дская<br><span style='font-size: 0.2em'>Novoslobodskaya</span>",
        styleType: "style-ancien",
        subtitle: "L'Église Souterraine",
        line: "Ligne 5",
        year: "1952",
        stationDesc: "32 vitraux éclairés de l'intérieur, dessinés par Korin. Mosaïque 'La Paix dans le monde' où Staline a été remplacé par une colombe.",
        zoomPoint: "50.5% 50%",
        teaserSize: "8vw",
        themeColor: "#f0f1a8",
        images: [
            { label: "Hall", url: "Images/Novoslabodskaya/Hall.webp", imgDesc: "Vitraux" },
            { label: "Fresque", url: "Images/Novoslabodskaya/Fresque.webp", imgDesc: "La mosaïque de la madame" },
            { label: "Vitre", url: "Images/Novoslabodskaya/Vitre.webp", imgDesc: "Jolie arche un peu pixelisée" }
        ]
    },
    {
        name: "Ки́евская<br><span style='font-size: 0.9em'>(Kyivskaya)</span>",
        splashTitle: "Ки́евская<br><span style='font-size: 0.2em'>Kyivskaya</span>",
        styleType: "style-ancien",
        subtitle: "Amitié Russo-Ukrainienne",
        line: "Ligne 5",
        year: "1954",
        stationDesc: "Voulue par Khrouchtchev pour célébrer l'Ukraine. 24 panneaux de mosaïque racontant l'histoire commune. Station la plus riche en portraits de Staline à l'origine.",
        zoomPoint: "51.5% 50%",
        teaserSize: "8vw",
        themeColor: "#f0f1a8",
        images: [
            { label: "Hall", url: "Images/Kyivskaya/Hall.webp", imgDesc: "Station sous lumière bleu" },
            { label: "Hall2", url: "Images/Kyivskaya/Hall2.webp", imgDesc: "Station sans lumière bleu mais avec des pixels" },
            { label: "Fresque", url: "Images/Kyivskaya/Fresque.webp", imgDesc: "Mosaïque mosaïcale" }
        ]
    },
    {
        name: "Белору́сская<br><span style='font-size: 0.9em'>(Belorusskaya)</span>",
        splashTitle: "Белору́сская<br><span style='font-size: 0.2em'>Belorusskaya</span>",
        styleType: "style-ancien",
        subtitle: "Hommage Biélorusse",
        line: "Ligne 5",
        year: "1952",
        stationDesc: "Plafond orné de 12 mosaïques illustrant la vie biélorusse (broderies, costumes). Une mosaïque célèbre montre la tradition du 'pain et du sel'.",
        zoomPoint: "50.5% 50%",
        teaserSize: "8vw",
        themeColor: "#f0f1a8",
        images: [
            { label: "Hall", url: "Images/Belorusskaya/Hall.webp", imgDesc: "Motifs au sol inspirés de broderies" },
            { label: "Fresque", url: "Images/Belorusskaya/Couloir.webp", imgDesc: "Détails du plafond" },
            { label: "Fresque", url: "Images/Belorusskaya/Rail.webp", imgDesc: "Vue des voies" },
            { label: "Fresque", url: "Images/Belorusskaya/Statuts.webp", imgDesc: "Groupe de partisans sculptés" }
        ]
    },

    // TRANSITION
    {
        name: "Transition Visuelle",
        styleType: "style-fullscreen",
        subtitle: "", line: "", year: "", stationDesc: "",
        zoomPoint: "center center", teaserSize: "0vw", themeColor: "#000",
        images: [
            { label: "Visuel", url: "Images/Moderne.webp", imgDesc: "" }
        ]
    },


    // =========================================================
    // PARTIE STATIONS MODERNES
    // =========================================================

    {
        name: "Рижская<br><span style='font-size: 0.9em'>(Rizhskaya)</span>",
        splashTitle: "Рижская<br><span style='font-size: 0.2em'>Rizhskaya</span>",
        styleType: "style-moderne",
        subtitle: "Le Portail (Tunnel Doré)",
        line: "Ligne 11 (BKL)",
        year: "2023",
        stationDesc: "Concept 'Welcoming Gateway'. Arches métalliques lumineuses. Anecdote : Les murs devaient être blancs, mais ont été peints en noir par économie, créant ce contraste unique.",
        zoomPoint: "43% 40%",
        teaserSize: "10vw",
        themeColor: "#faf75b",
        images: [
            { label: "Hall", url: "Images/Rizhskaya/Hall.webp", imgDesc: "Ambiance Dune un peu" },
            { label: "Porte", url: "Images/Rizhskaya/Porte.webp", imgDesc: "La porta del futuro" },
            { label: "Rail", url: "Images/Rizhskaya/Rail2.webp", imgDesc: "Plan de la station vu des rails" },
            { label: "Escalator", url: "Images/Rizhskaya/Rail.webp", imgDesc: "Plan de la station en vrai" },
            { label: "Escalator", url: "Images/Rizhskaya/Escalator.webp", imgDesc: "Début de la passion escalator" }
        ]
    },
    {
        name: "Мичуринский проспект<br><span style='font-size: 0.9em'>(Michurinsky Prospekt)</span>",
        splashTitle: "Мичуринский проспект<br><span style='font-size: 0.2em'>Michurinsky Prospekt</span>",
        styleType: "style-moderne",
        subtitle: "Le Palais Sino-Russe",
        line: "Ligne 8 / BKL",
        year: "2018",
        stationDesc: "Première station construite par une entreprise chinoise (CRCC). Colonnes rouges (prospérité) et fleurs de prunier au plafond (symbole de persévérance et d'amitié).",
        zoomPoint: "35% 35%",
        teaserSize: "10vw",
        themeColor: "#dc2626",
        images: [
            { label: "Hall Rouge", url: "https://www.artlebedev.com/metro/michurinsky-prospekt/michurinsky-prospekt-01.jpg", imgDesc: "Magnifique Paifang COMMUNISTE" },
            { label: "Hall 2", url: "Images/Prospekt/Hall2.webp", imgDesc: "Admirez la beauté des ram de métro svp" },
            { label: "Escalator", url: "Images/Prospekt/Escalator.webp", imgDesc: "Admirez la beauté des escalators" },
            { label: "Dehors", url: "Images/Prospekt/Dehors.webp", imgDesc: "Vue du parc Michurinsky" }
        ]
    },
    {
        name: "Воронцовская<br><span style='font-size: 0.9em'>(Vorontsovskaya)</span>",
        splashTitle: "Воронцовская<br><span style='font-size: 0.2em'>Vorontsovskaya</span>",
        styleType: "style-moderne",
        subtitle: "L'Odyssée Spatiale",
        line: "Ligne 11 (BKL)",
        year: "2021",
        stationDesc: "Architecture paramétrique évoquant la Voie Lactée. Colonnes triangulaires et plafond complexe pour un effet de vaisseau spatial.",
        zoomPoint: "49% 62%",
        teaserSize: "9vw",
        themeColor: "#555555",
        images: [
            { label: "Hall", url: "Images/Vorontsovskaya/Hall.webp", imgDesc: "Plafond paramétrique stellaire, plus paramétrique que stellaire" },
            { label: "Poteau", url: "Images/Vorontsovskaya/Poteau.webp", imgDesc: "Il est beau mon poteau" },
            { label: "Poteau encore", url: "Images/Vorontsovskaya/Poteau2.webp", imgDesc: "Vous avez vu mon poteau ?" },
            { label: "Escalator", url: "Images/Vorontsovskaya/Escalator.webp", imgDesc: "Un escalator ça faisait longtemps" }
        ]
    },
    {
        name: "Давыдково<br><span style='font-size: 0.9em'>(Davydkovo)</span>",
        splashTitle: "Давыдково<br><span style='font-size: 0.2em'>Davydkovo</span>",
        styleType: "style-moderne",
        subtitle: "Héros du Quotidien",
        line: "Ligne 11 (BKL)",
        year: "2021",
        stationDesc: "Unique station dédiée à une institution civile (les Sauveteurs). Code couleur officiel (Orange/Bleu). Bas-reliefs racontant de vraies missions de sauvetage.",
        zoomPoint: "57% 40%",
        teaserSize: "10vw",
        themeColor: "#e25c0e",
        images: [
            { label: "Hall", url: "Images/Davydkovo/Hall.webp", imgDesc: "Orange is the new White" },
            { label: "Frise", url: "Images/Davydkovo/Frise.webp", imgDesc: "Bas-reliefs de mission de pin-pon" },
            { label: "Embleme", url: "Images/Davydkovo/Embleme.webp", imgDesc: "Devise : Prévention, Sauvetage, Aide... et Marie Jésus" },
            { label: "Escalator", url: "Images/Davydkovo/Escalator.webp", imgDesc: "Una qualidad da escalator mamaaa" }
        ]
    },
    {
        name: "Аминьевская<br><span style='font-size: 0.9em'>(Aminyevskaya)</span>",
        splashTitle: "Аминьевская<br><span style='font-size: 0.2em'>Aminyevskaya</span>",
        styleType: "style-moderne",
        subtitle: "La Vague (Sécurisée)",
        line: "Ligne 11 (BKL)",
        year: "2021",
        stationDesc: "Plafond ondulé imitant des vagues. Anecdote : Un toit en verre était prévu, mais annulé pour respecter les normes anti-terroristes (attaques par drone).",
        zoomPoint: "50% 45%",
        teaserSize: "10vw",
        themeColor: "#3498db",
        images: [
            { label: "Hall", url: "Images/Aminyevskaya/Hall.webp", imgDesc: "Je divague, vague" },
            { label: "Hall2", url: "Images/Aminyevskaya/Hall2.webp", imgDesc: "Plus Pole que marin" },
            { label: "Rail", url: "Images/Aminyevskaya/Rail.webp", imgDesc: "Toujours de belles rames de métro" },
            { label: "Escalator", url: "Images/Aminyevskaya/Escalator.webp", imgDesc: "Pour ou contre le comique de répétition ?" }
        ]
    },
    {
        name: "Терехово<br><span style='font-size: 0.9em'>(Terekhovo)</span>",
        splashTitle: "Терехово<br><span style='font-size: 0.2em'>Terekhovo</span>",
        styleType: "style-moderne",
        subtitle: "La Beauté du Béton",
        line: "Ligne 11 (BKL)",
        year: "2021",
        stationDesc: "Surnommée le 'Plus beau bunker'. Utilisation innovante du béton fibré pour des courbes douces. Silhouettes humaines imprimées directement sur les colonnes.",
        zoomPoint: "52% 40%",
        teaserSize: "10vw",
        themeColor: "#dddddd",
        images: [
            { label: "Hall", url: "Images/Terekhovo/Hall.webp", imgDesc: "Bienvenue au Paradis" },
            { label: "Hall2", url: "Images/Terekhovo/Hall2.webp", imgDesc: "Paradis vu des rails" },
            { label: "Fresque", url: "Images/Terekhovo/Fresque.webp", imgDesc: "Admirez le niveau de détail svp" },
            { label: "Escalator", url: "Images/Terekhovo/Escalator.webp", imgDesc: "Escalator to le Paradis" }
        ]
    },

    // --- CONCLUSION ---
    {
        name: "Conclusion",
        styleType: "style-conclusion",
        subtitle: "Synthèse & Futur",
        line: "Fin",
        year: "2035",
        stationDesc: "<ul><li><strong>3 Phases</strong> Le Palais (Staline) > L'Utile (Khrouchtchev) > La Tech (Sobianine).</li><li><strong>Identité</strong> Toujours 'Le plus beau métro du monde'.</li><li><strong>Futur (2035)</strong> Des trains qui deviennent eux-mêmes des œuvres d'art.</li></ul>",
        zoomPoint: "center center",
        teaserSize: "12vw",
        themeColor: "#ffffff",
        images: [
            { label: "Vidéo Futur", url: "Videos/Futur.webm", imgDesc: "Animation du futur réseau." }
        ]
    }
];
