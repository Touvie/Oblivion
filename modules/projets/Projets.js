// === DATA PROJETS ===
const projectsData = {
    portfolio: {
        title: "Portfolio Interactif",
        tags: ["Three.js", "WebGL", "Storytelling"],
        content: `
            <h3>Un récit en trois dimensions</h3>
            <p>Ce portfolio n'est pas qu'une simple vitrine : c'est une exploration technique et narrative. L'objectif était de transformer une navigation web classique en une expérience immersive.</p>
            <p>Au lieu de lister mes compétences, j'ai voulu les démontrer : la gestion de la 3D avec Three.js, l'optimisation des shaders pour l'animation du trou noir, et une structure narrative inspirée des schémas littéraires.</p>
            <h3>Défis techniques</h3>
            <p>Le plus grand défi a été d'équilibrer la performance et l'esthétique.</p>
        `,
        link: null,
        linkLabel: "Vous y êtes déjà !"
    },
    affiche4: {
        title: "Collision",
        tags: ["Design", "Créativité", "Print", "No IA", "Made by human", "Figma"],
        content: `
            <h3>Concept</h3>
            <p>Je crée chaque mois une nouvelle affiche. 12 affiches créatives à l'année, garanties sans un token d'IA.</p>
            <h3>Présentation Générale</h3>
            <p>Affiche du mois d'Avril 2026, encore en cours de finalisation.</p>
            <p>Elle représente la collision entre deux astres spatiaux. Le principe est de jouer sur les ombres portées, les formes géométriques simples et les couleurs chaudes.</p>

            <figure class="modal-figure">
               <img src="images/Avril.webp" alt="" class="zoomable-image">
               <figcaption class="modal-caption">Collision</figcaption>
            </figure>
        `,
        link: null,
        linkLabel: null,
    },
    hermes: {
        title: "Éditions Hermès",
        tags: ["HTML", "CSS", "Identité Visuelle", "Maison d'Edition", "IA"],
        content: `
            <h3>Présentation</h3>
            <p>Ce projet de groupe consistait à imaginer une maison d'édition de A à Z : son identité, sa collection et le premier titre de celle-ci. De mon côté, j'ai élaboré un <strong>plan de diffusion et de distribution cohérent</strong>, puis j'ai conçu et géré le <strong>site web des Éditions Hermès</strong>, afin d'offrir une vitrine numérique fidèle à l'esprit de la maison.</p>
            <h3>Volontés</h3>
            <p>Le site des Éditions Hermès adopte volontairement une esthétique très sobre. J'ai choisi une interface simple, presque dépouillée, en écho direct à la <strong>charte graphique minimaliste</strong> que nous avions définie. C'était une manière de montrer ma capacité à m'adapter à un univers visuel précis, sans le surcharger.
                Je me suis toutefois autorisé un <em>easter egg</em>, comme une petite trace personnelle glissée derrière la façade, preuve que la rigueur peut cohabiter avec un clin d'œil subtil.</p>
            <h3>Conclusion</h3>
            <p>Imaginer le site d'une maison d'édition fictive m'a donné envie de travailler, un jour, pour une maison bien réelle. En intégrant sa charte graphique au mieux, j'ai réellement pris plaisir à construire un espace lisible, cohérent et accueillant.
                Cette deuxième expérience de création de site web renforce mon envie d'aller plus loin dans les <strong>principes d'UI et d'UX design</strong>, pour affiner mes choix, comprendre davantage les usages et améliorer encore mes futures créations.</p>
        
            <figure class="modal-figure">
               <img src="images/Hermes2.webp" alt="Hero du site" class="zoomable-image">
               <figcaption class="modal-caption">Hero du site</figcaption>
            </figure>
            `,
        link: "https://touvie.github.io/Hermes/",
        linkLabel: "Visiter le site"
    },
    escale: {
        title: "Stop Motion - Pas prévu",
        tags: ["Stop Motion", "Origami", "Montage", "No IA"],
        content: `
            <h3>Présentation</h3>
            <p>Dans le cadre d'un partenariat avec le salon littéraire <strong>Les Escales du Livre</strong>, situé à Bordeaux au cœur de l'écosystème Darwin, deux camarades et moi avons imaginé puis réalisé une vidéo de promotion autour de <em>Pas prévu</em> d'Élo, publié à L'École des loisirs.
                Le public cible étant de très jeunes enfants — autour de quatre ans — nous avons choisi le <strong>stop motion</strong> et des personnages façonnés en <strong>origami</strong>, afin de rester proches de cet univers de simplicité, de jeu et de petites mains encore hésitantes.</p>
            <h3>Ce que j'ai appris</h3>
            <p>C'était la première fois que je me confrontais à l'écriture d'un <strong>script pensé pour un tournage</strong>. Écrire en anticipant la mise en scène, puis confronter ces idées au réel du plateau, révèle très vite des contraintes que l'on n'imagine pas au début. Cette découverte progressive, presque empirique, m'a beaucoup plu.
               J'ai également appris à manipuler un logiciel de montage — <strong>CapCut, sur ordinateur</strong> — et à comprendre comment une vidéo prend forme, image après image.</p>
            <h3>Conclusion</h3>
            <p>Cette première immersion dans le domaine du multimédia, que je ne connaissais alors qu'en surface, m'a offert un point d'ancrage clair : je veux poursuivre dans cette voie. Elle confirme mon désir de me tourner vers les <strong>Métiers du Multimédia et de l'Internet</strong>, où l'image, l'histoire et l'expérimentation se rencontrent.</p>

            <figure class="modal-figure">
                <iframe
                    src="https://www.youtube.com/embed/zUz145uZZLE"
                    title="YouTube video player"
                    class="zoomable-image"
                    style="width: 100%; aspect-ratio: 16/9; height: auto; cursor: auto;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
                <figcaption class="modal-caption">Vidéo promotionnelle : Pas Prévu</figcaption>
            </figure>
        `,
        link: "https://www.youtube.com/embed/zUz145uZZLE",
        linkLabel: "Voir la vidéo"
    },
    frise: {
        title: "Frise Chronologique",
        tags: ["Figma", "UX/UI", "Prototypage", "made by human", "No IA"],
        content: `
            <h3>Présentation</h3>
            <p>Dans le cadre d'un projet réunissant la musique, la littérature et l'histoire de l'art, deux camarades et moi avons été chargés de concevoir une <strong>frise chronologique complète</strong>, sur le support de notre choix. Elle devait rassembler des dates essentielles pour chacune des trois disciplines. Nous avons choisi de la réaliser sur <strong>Figma</strong>, afin d'exploiter ses possibilités de mise en page et d'interactivité.</p>
            <h3>Volontés</h3>
            <p>Nous avons imaginé la frise comme un ensemble de <strong>trois lignes temporelles parallèles</strong>, chacune consacrée à une matière. Le prototypage entièrement réalisé sur Figma nous a permis de créer une interface claire, où l'on peut <strong>cliquer sur des boutons pour faire apparaître les périodes, les mouvements et les événements</strong>. La frise n'est donc pas une simple image statique : elle fonctionne comme une petite interface interactive.</p>
            <h3>Conclusion</h3>
            <p>C'est avec ce projet que j'ai vraiment pris en main <strong>Figma</strong>. J'ai découvert comment construire un <strong>prototype interactif</strong>, en reliant des pages, en définissant des transitions et en rendant la navigation fluide. Cette approche m'a donné une première idée concrète de ce que peut être une interface pensée pour l'utilisateur.</p>

            <figure class="modal-figure">
                <iframe
                    src="https://embed.figma.com/proto/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=122-430&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=129%3A1547&embed-host=share"
                    allowfullscreen
                    class="zoomable-image"
                    style="width: 100%; aspect-ratio: 16/9; height: auto; cursor: auto;">
                </iframe>
                <figcaption class="modal-caption">Prototype interactif de la frise</figcaption>
            </figure>
        `,
        link: "https://www.figma.com/design/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=0-1&t=Rvu3tRhCN4L04AsB-1",
        linkLabel: "Voir la maquette"
    },
    affiche: {
        title: "Большой Брат",
        tags: ["Design", "Créativité", "Print", "No IA", "Made by human", "Figma"],
        content: `
            <h3>Concept</h3>
            <p>Je crée chaque mois une nouvelle affiche. 12 affiches créatives à l'année, garanties sans un token d'IA.</p>
            <h3>Présentation Générale</h3>
            <p>Cette affiche est la première d'une série de travaux personnels qui ne comporte pas un octet d'IA de la réflexion à la conception.</p>
            <p>Elle adopte volontairement une forme abstraite et codée : sa structure reprend celle du plan du métro de Moscou, non pas comme une citation immédiatement reconnaissable, mais comme un réseau sous-jacent, presque invisible, à l'image des systèmes qu'elle évoque.</p>
            <p>L'esthétique emprunte au langage du circuit électronique et du processeur graphique afin de représenter une société pensée comme un maillage numérique tentaculaire. Au centre, un œil symbolise le pouvoir central — le Kremlin — non pas comme une entité humaine, mais comme une instance de surveillance diffuse. Inspiration Big Brother</p>
            <p>L'interaction permet ainsi de rendre perceptible un glissement : d'un réseau apparemment neutre et technologique vers une lecture politique plus oppressante.</p>

            <figure class="modal-figure">
               <!-- FIX: Images/ → images/ -->
               <img src="images/Big_Brother.webp" alt="Affiche Big Brother positif Moscou" class="zoomable-image">
               <figcaption class="modal-caption">Figure 1 : Большой Брат (positif)</figcaption>
               <br><br>
               <img src="images/Big_Brother2.webp" alt="Affiche Big Brother négatif Moscou" class="zoomable-image">
               <figcaption class="modal-caption">Figure 2 : Большой Брат (négatif)</figcaption>
            </figure>
        `,
        link: null,
        linkLabel: null
    },
    affiche2: {
        title: "Vectorial Vitrail",
        tags: ["Design", "Créativité", "Print", "No IA", "Made by human", "Figma"],
        content: `
            <h3>Concept</h3>
            <p>Je crée chaque mois une nouvelle affiche. 12 affiches créatives à l'année, garanties sans un token d'IA.</p>
            <h3>Présentation Générale</h3>
            <p>L'idée de base était de représenter un vitrail, comme on peut en trouver dans les églises. Pour créer l'effet au mieux, j'ai utilisé une combinaison de l'effet glass et du noise. Une fois le squelette du vitrail terminé, la question s'est portée sur la couleur. Celle-ci est un gradient arc-en-ciel volontairement très visible, pour jouer sur le deuxième élément central de l'affiche, les ombres. Il y a un jeu d'ombres entre les couleurs pour en accentuer la profondeur et donner une légère impression de vitrail en 3D. À noter que les vrais vitraux fonctionnent grâce à une source lumineuse placée derrière la vitre, un effet que je n'ai pas réussi à reproduire sous forme de shader et qui reste une piste à explorer. Cette prémisse, utiliser l'ombre pour créer du faux relief, sera un élément central que je compte pleinement maîtriser dans mes projets futurs.</p>

            <figure class="modal-figure">
               <img src="images/Fevrier.webp" alt="" class="zoomable-image">
               <figcaption class="modal-caption">Vectorial Vitrail with noise</figcaption>
               <br><br>
               <img src="images/Fevrier2.webp" alt="" class="zoomable-image">
               <figcaption class="modal-caption">Vectorial Vitrail without noise</figcaption>
            </figure>
        `,
        link: null,
        linkLabel: null
    },
    affiche3: {
        title: "Zootrope circulaire",
        tags: ["Design", "Créativité", "Print", "No IA", "Made by human", "Figma"],
        vinyl: true,
        content: `
            <h3>Concept</h3>
            <p>Je crée chaque mois une nouvelle affiche. 12 affiches créatives à l'année, garanties sans un token d'IA.</p>
            <h3>Présentation Générale</h3>
            <p>Pour l'affiche de Mars j'ai eu l'idée de faire un vinyle sous forme de zootrope. En recherchant ce qui avait déjà été fait sur le sujet, je me suis rendu compte que la plupart jouaient beaucoup sur la symétrie. Le principe même de la zootropie est que l'image semble créer une scène animée directement sur le vinyle. Ici ce n'est pas le cas, ou du moins pas exactement. C'est une expérimentation en plusieurs phases. Au centre nous avons ce qui peut s'apparenter à une fleur géométrique et symétrique. L'élément beau du vinyle lors de son arrêt. Ensuite nous avons les 4 formes turquoises qui doivent donner une impression de rotation extérieure par rapport à la grande fleur centrale. Et puis enfin nous avons le bord fait de lignes arrondies. C'est d'une certaine manière l'élément qui gagne le plus lorsque le vinyle se met à tourner ; on a une vraie impression d'animation fluide et continue. Lors de ma prochaine création de vinyle en zootrope, c'est plutôt cet aspect que je souhaiterai développer. La rotation du vinyle est disponible en 33 tours, 45 tours, 70 tours (oui des vinyles peuvent aller à cette vitesse) et 200 tours (non les vinyles ne vont pas à cette vitesse mais c'est joli quand même).</p>
            <div class="vinyl-player">
                <img src="images/Mars.webp" alt="Zootrope Vinyle" id="vinyl-disc" class="vinyl-disc">
                <div class="vinyl-controls">
                    <button class="vinyl-btn" data-rpm="0">■ Stop</button>
                    <button class="vinyl-btn" data-rpm="33">33 RPM</button>
                    <button class="vinyl-btn vinyl-btn-active" data-rpm="45">45 RPM</button>
                    <button class="vinyl-btn" data-rpm="70">70 RPM</button>
                    <button class="vinyl-btn" data-rpm="200">200 RPM</button>
                </div>
            </div>
        `,
        link: null,
        linkLabel: null
    },
    italie: {
        title: "Projet Italie",
        tags: ["Premier Site", "HTML", "Découverte", "IA"],
        content: `
            <h3>Le point de départ</h3>
            <p>Ce projet fut le premier présenté ici. C'est le premier site web que j'ai réalisé dans le cadre d'un travail scolaire à l'IUT. J'ai choisi de le présenter ici non pas car il est particulièrement intéressant, mais comme archive, comme point de départ. Mettre ce projet en avant permet de mettre en évidence d'où je suis partie, et quels sont les progrès réalisés en l'espace d'un an.</p>
        
            <figure class="modal-figure">
               <img src="images/Italie2.webp" alt="Hero du site" class="zoomable-image">
               <figcaption class="modal-caption">Hero du site</figcaption>
            </figure>
        `,
        link: "https://touvie.github.io/Italie",
        linkLabel: "Visiter le site"
    },
    affiche5: {
        title: "Affiche de Mai",
        tags: ["Design", "Créativité", "Print", "No IA", "Made by human", "InDesign"],
        content: `
            <h3>Concept</h3>
            <p>Je crée chaque mois une nouvelle affiche. 12 affiches créatives à l'année, garanties sans un token d'IA.</p>
            <h3>Présentation Générale</h3>
            <p>Première affiche qui sera créer avec Adobe Indesign. L'objectif de cette affiche sera principalement la typographie.</p>
        `,
        link: null,
        linkLabel: null
    },
    geolibri: {
        title: "Géolibri · La Librairie de Darwin",
        tags: ["HTML", "CSS", "JavaScript", "Site web", "IA"],
        content: `
            <h3>Présentation</h3>
            <p>Ceci est une proposition de site web pour la librairie Géolibri implantée au cœur de Darwin, l'ancienne caserne militaire reconvertie en espace culturel bordelais. La librairie n'ayant pas de site, ce projet est une initiative personnelle pour leur en concevoir un. Son offre tourne autour de trois axes : écologie, sciences sociales et littérature de voyage.</p>
            <h3>Volontés</h3>
            <p>Le site reflète l'identité singulière du lieu : une librairie ancrée dans un espace en mouvement, ouvert et engagé. L'objectif est de concevoir une interface claire et chaleureuse, qui donne envie d'entrer autant que de naviguer.</p>
            <h3>Fonctionnalités</h3>
            <p>Le site intègre les informations pratiques de la librairie (horaires, adresse, contact), une section de coups de cœur des libraires, ainsi que les événements en cours — dédicaces et rencontres, entrée libre.</p>

            <figure class="modal-figure">
               <img src="images/Geolibri2.webp" alt="Hero du site" class="zoomable-image">
               <figcaption class="modal-caption">Hero du site</figcaption>
            </figure>
        `,
        link: "https://touvie.github.io/Geolibri/",
        linkLabel: "Visiter le site"
    },
    moscou: {
        title: "Metro Moscovite",
        tags: ["HTML", "CSS", "JavaScript", "Diaporama", "IA"],
        content: `
            <h3>Présentation</h3>
            <p>Dans le cadre d'un exposé de russe, j'ai choisi de ne pas faire une présentation Canva comme tout le monde. À la place, j'ai construit un diaporama interactif entièrement en code : HTML, CSS et JavaScript.</p>
            <h3>Contenu</h3>
            <p>Le diaporama présente deux grandes parties du réseau moscovite : les stations soviétiques classiques, surnommées les "palais du peuple", et les stations modernes de la BKL (Big Circle Line), inaugurées entre 2021 et 2023. Chaque station a sa propre identité visuelle, reproduite fidèlement dans le code via des feuilles de style dédiées.</p>
            <h3>Approche technique</h3>
            <p>Chaque type de station possède son propre thème CSS. La navigation se fait au clavier ou à la souris, avec des transitions animées entre les slides. Les images sont locales et les données séparées dans un fichier <code>data.js</code> indépendant du moteur de rendu.</p>
        
        <figure class="modal-figure">
               <img src="images/Station_Trad.webp" alt="station traditionnelle" class="zoomable-image">
               <figcaption class="modal-caption">Station Комсомо́льская</figcaption>
               <br><br>
               <img src="images/Station_Moderne.webp" alt="station moderne" class="zoomable-image">
               <figcaption class="modal-caption"> Staion Терехово</figcaption>
        </figure>
            `,
        link: "Metro_Moscovite/index.html",
        linkLabel: "Voir le diaporama"
    },
    lab: {
        title: "Laboratoire Numérique",
        tags: ["Three.js", "WebGL", "Particules", "Expérimentation", "IA"],
        content: `
            <h3>Présentation</h3>
            <p>Avant de construire ce portfolio, j'ai exploré, expérimenté, cassé des choses. Ce laboratoire regroupe les expériences interactives nées de ces explorations — des visualisations en temps réel qui n'avaient pas vocation à devenir des projets finalisés, mais qui méritaient d'exister quelque part.</p>
            <h3>Murmuration</h3>
            <p>25 000 particules organisées en huit nuées, simulant le comportement d'un vol d'étourneaux. Chaque particule suit des règles locales de cohésion, d'alignement et de séparation, rendues dans un shader GPU personnalisé. Un bouton permet de faire basculer la nuée vers une sphère parfaite et d'observer la transition fluide entre chaos organique et ordre géométrique.</p>
            <h3>Big Bang</h3>
            <p>37 500 particules disposées en sphère. Un seul bouton déclenche la séquence : contraction, implosion, explosion. La progression est contrôlable à la main via un slider. La vitesse, la boucle et la pause sont configurables en temps réel.</p>
            <p>Contrôles : clic-glisser pour tourner, molette pour zoomer.</p>
            <div style="display:flex; gap: 16px; margin-top: 20px; flex-wrap: wrap; justify-content: center;">
                <a href="Lab_Numerique/Murmuration/index.html" target="_blank" style="display:block; text-decoration:none;">
                    <video autoplay loop muted playsinline style="width:480px; height:360px; object-fit:cover; display:block; border:1px solid rgba(255,255,255,0.2); border-radius:4px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.7)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'"><source src="videos/Murmuration.webm" type="video/webm"></video>
                    <span style="display:block; text-align:center; font-family:'Space Mono'; font-size:10px; color:rgba(255,255,255,0.5); margin-top:6px; letter-spacing:1px;">MURMURATION</span>
                </a>
                <a href="Lab_Numerique/BigBang/index.html" target="_blank" style="display:block; text-decoration:none;">
                    <video autoplay loop muted playsinline style="width:480px; height:360px; object-fit:cover; display:block; border:1px solid rgba(255,255,255,0.2); border-radius:4px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.7)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'"><source src="videos/BigBang.webm" type="video/webm"></video>
                    <span style="display:block; text-align:center; font-family:'Space Mono'; font-size:10px; color:rgba(255,255,255,0.5); margin-top:6px; letter-spacing:1px;">BIG BANG</span>
                </a>
            </div>
        `,
        link: null,
        linkLabel: null
    },
    figma: {
        title: "Animation Figma",
        tags: ["Figma", "UI", "Motion", "made by human", "No IA"],
        content: `
            <h3>Présentation</h3>
            <p>Dans le monde du numérique, il y a des univers qui marquent plus que d'autres. Nothing en fait partie. Pour les moldus, Nothing est une marque tech anglaise notamment connue pour les écouteurs et les téléphones. La particularité de cette entreprise est sans aucun doute son parti-pris graphique très poussé. Nothing est une marque que j'apprécie beaucoup pour l'originalité et l'audace de leur univers qu'ils transposent dans leurs produits tech.</p>
            <h3>Intention</h3>
            <p>Lors de la sortie du Nothing phone 3a, j'ai eu l'idée de créer à l'aide de Figma une petite animation en l'honneur de la sortie du téléphone. C'est la première animation que je faisais avec l'outil d'UX et d'UI design.</p>
            <h3>Conclusion</h3>
            <p>L'idée n'était pas de faire quelque chose de parfait ou de grandiose. Je l'ai fait car je suis persuadé qu'on apprend toujours mieux en pratique plutôt qu'en théorie. Et car j'aime faire ça, tout simplement. Le prochain sera fait sur blender, qui sait ?</p>

            <figure class="modal-figure">
                <video controls loop muted autoplay width="100%" class="zoomable-image"
                    style="cursor: pointer; border: 1px solid var(--accent); width: auto; max-width: 100%; max-height: 60vh; display: block;">
                    <source src="videos/Figma_Nothing.webm" type="video/webm">
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>
                <figcaption class="modal-caption">Prototypage Nothing</figcaption>
            </figure>

            <figure class="modal-figure">
                <video controls loop muted autoplay width="100%" class="zoomable-image"
                    style="cursor: pointer; border: 1px solid var(--accent); width: auto; max-width: 100%; max-height: 60vh; display: block;">
                    <source src="videos/Figma_Circle.webm" type="video/webm">
                </video>
                <figcaption class="modal-caption">Animation circulaire</figcaption>
            </figure>
        `,
        link: null,
        linkLabel: null
    }
};

// === VARIABLES ===
const modal = document.getElementById('modal');

// === VINYL PLAYER ===
let vinylRaf = null;
let vinylAngle = 0;
let vinylRPM = 0;
let vinylLastTime = null;

function vinylTick(timestamp) {
    if (!vinylLastTime) vinylLastTime = timestamp;
    const delta = (timestamp - vinylLastTime) / 1000;
    vinylLastTime = timestamp;
    vinylAngle += (vinylRPM / 60) * 360 * delta;
    const disc = document.getElementById('vinyl-disc');
    if (disc) disc.style.transform = `rotate(${vinylAngle}deg)`;
    vinylRaf = requestAnimationFrame(vinylTick);
}

function setVinylSpeed(rpm) {
    vinylRPM = rpm;
    if (rpm === 0) {
        if (vinylRaf) { cancelAnimationFrame(vinylRaf); vinylRaf = null; }
        vinylLastTime = null;
    } else if (!vinylRaf) {
        vinylLastTime = null;
        vinylRaf = requestAnimationFrame(vinylTick);
    }
}

function stopVinyl() {
    if (vinylRaf) { cancelAnimationFrame(vinylRaf); vinylRaf = null; }
    vinylRPM = 0;
    vinylLastTime = null;
}

function setupVinylPlayer() {
    const disc = document.getElementById('vinyl-disc');
    if (!disc) return;
    vinylAngle = 0;
    setVinylSpeed(45);
    document.querySelectorAll('.vinyl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.vinyl-btn').forEach(b => b.classList.remove('vinyl-btn-active'));
            btn.classList.add('vinyl-btn-active');
            setVinylSpeed(parseInt(btn.dataset.rpm));
        });
    });
}

// FIX: closeModal() factorisé — remplace 3 blocs identiques
function closeModal() {
    modal.classList.remove('visible');
    modal.querySelectorAll('video').forEach(v => v.pause());
    stopVinyl();
    document.getElementById('modal-body').innerHTML = '';
}

// === SCROLL HORIZONTAL DE LA GALERIE ===
const galleryViewport = document.querySelector('.gallery-viewport');

window.addEventListener('wheel', (e) => {
    if (modal.classList.contains('visible')) return;
    if (e.deltaY !== 0) {
        e.preventDefault();
        galleryViewport.scrollLeft += e.deltaY;
    }
}, { passive: false });

// === MODALE ===
document.querySelectorAll('.frame').forEach(frame => {
    frame.addEventListener('click', () => {
        const projectId = frame.dataset.project;
        if (projectId === 'portfolio') {
            window.parent.postMessage({ type: 'navigate', section: 2 }, '*');
            return;
        }
        const data = projectsData[projectId];
        if (!data) return;

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-body').innerHTML = data.content;

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'modal-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        const footer = document.getElementById('modal-footer');
        footer.innerHTML = '';
        if (data.link) {
            const link = document.createElement('a');
            link.href = data.link;
            link.target = '_blank';
            link.className = 'modal-link';
            link.textContent = `[ ${data.linkLabel} ]`;
            footer.appendChild(link);
        } else if (data.linkLabel) {
            const span = document.createElement('span');
            span.style.cssText = "font-family: 'Space Mono'; font-size: 11px; color: rgba(255,255,255,0.4);";
            span.textContent = data.linkLabel;
            footer.appendChild(span);
        }

        modal.classList.add('visible');
        setupImageZoom();
        if (data.vinyl) setupVinylPlayer();
    });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
});

// === GESTION LIGHTBOX (ZOOM IMAGE) ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function setupImageZoom() {
    const images = document.querySelectorAll('img.zoomable-image');

    images.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('visible');
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
            const captionText = this.nextElementSibling ? this.nextElementSibling.innerText : '';
            lightboxCaption.textContent = captionText;
        });
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('visible');
        setTimeout(() => { lightbox.style.display = "none"; }, 300);
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('visible');
            setTimeout(() => { lightbox.style.display = "none"; }, 300);
        }
    });
}

// === TRACKING DU CADRE PORTFOLIO POUR THREE.JS ===
const portfolioFrame = document.querySelector('.frame-portfolio');

galleryViewport.addEventListener('scroll', () => {
    const rect = portfolioFrame.getBoundingClientRect();
    const frameCenterX = rect.left + (rect.width / 2);
    const screenCenterX = window.innerWidth / 2;
    const offsetX = frameCenterX - screenCenterX;

    window.parent.postMessage({
        type: 'syncBlackHole',
        offsetX: offsetX
    }, '*');
}, { passive: true });

// === BUFFER DROIT DE LA GALERIE ===
window.addEventListener('load', () => {
    const canvas = document.querySelector('.gallery-canvas');
    canvas.style.minWidth = (galleryViewport.scrollWidth + window.innerWidth * 0.04) + 'px';
});

// === RECEPTION MESSAGES (RESET) ===
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'reset') {
        const galleryViewport = document.querySelector('.gallery-viewport');
        if (galleryViewport) {
            galleryViewport.scrollLeft = 0;
            galleryViewport.dispatchEvent(new Event('scroll'));
        }
    }
});
