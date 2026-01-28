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
               J'ai également appris à manipuler un logiciel de montage — <strong>CapCut, sur ordinateur</strong> — et à comprendre comment une vidéo prend forme, image après image.
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
        tags: ["Figma", "UX/UI", "Prototypage", "No IA"],
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
        tags: ["Design", "Créativité", "Print", "No IA"],
        content: `
            <h3>Présentation Générale</h3>
            <p>Cette affiche est la première d'une série de travaux personnels qui ne comporte pas un octet d'IA de la réflexion à la conception.</p>
            <p>Elle adopte volontairement une forme abstraite et codée : sa structure reprend celle du plan du métro de Moscou, non pas comme une citation immédiatement reconnaissable, mais comme un réseau sous-jacent, presque invisible, à l'image des systèmes qu'elle évoque.</p>
            <p>L'esthétique emprunte au langage du circuit électronique et du processeur graphique afin de représenter une société pensée comme un maillage numérique tentaculaire. Au centre, un œil symbolise le pouvoir central — le Kremlin — non pas comme une entité humaine, mais comme une instance de surveillance diffuse. Inspiration Big Brother</p>
            <p>L'interaction permet ainsi de rendre perceptible un glissement : d'un réseau apparemment neutre et technologique vers une lecture politique plus oppressante.</p>
        
            <figure class="modal-figure">
               <img src="Images/Big_Brother.png" alt="Affiche Big Brother positif Moscou" class="zoomable-image">
               <figcaption class="modal-caption">Figure 1 : Большой Брат (positif)</figcaption>
               <br><br>
               <img src="Images/Big_Brother2.png" alt="Affiche Big Brother négatif Moscou" class="zoomable-image">
               <figcaption class="modal-caption">Figure 2 : Большой Брат (négatif)</figcaption>
            </figure>
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
        `,
        link: "https://touvie.github.io/Italie",
        linkLabel: "Visiter le site"
    },
    traiteur: {
        title: "Animation Figma",
        tags: ["Figma", "UI", "Motion", "No IA"],
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
                    <source src="Videos/Figma_Nothing.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>
                <figcaption class="modal-caption">Prototypage Nothing</figcaption>
            </figure>
        `,
        link: null,
        linkLabel: null
    }
};

// === VARIABLES ===
const modal = document.getElementById('modal');

// === SCROLL AVEC ACCUMULATION (comme les autres iframes) ===
let scrollAccumulator = 0;
let scrollTimeout;
const SCROLL_THRESHOLD = 150; // Plus bas car pas de contenu scrollable

window.addEventListener('wheel', (e) => {
    // Bloquer si modale ouverte
    if (modal.classList.contains('visible')) return;

    clearTimeout(scrollTimeout);

    // Normalisation souris vs trackpad
    let rawDelta = e.deltaY;
    let effectiveDelta = rawDelta;

    if (Math.abs(rawDelta) < 40) {
        effectiveDelta = rawDelta * 3.0;
    } else {
        effectiveDelta = rawDelta * 0.6;
    }

    scrollAccumulator += effectiveDelta;

    // Reset si arrêt du scroll
    scrollTimeout = setTimeout(() => {
        scrollAccumulator = 0;
    }, 150);

    // Vérification du seuil
    if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

    const direction = scrollAccumulator > 0 ? 'down' : 'up';
    
    // Envoie le message au parent
    window.parent.postMessage({ 
        type: 'scroll', 
        direction: direction,
        atBoundary: true 
    }, '*');

    // Reset après envoi
    scrollAccumulator = 0;

}, { passive: true });

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
    });
});

document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('visible');
    const videos = document.querySelectorAll('video');
    videos.forEach(v => v.pause());
});

document.getElementById('modal-backdrop').addEventListener('click', () => {
    modal.classList.remove('visible');
    const videos = document.querySelectorAll('video');
    videos.forEach(v => v.pause());
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
        modal.classList.remove('visible');
        const videos = document.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }
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

if(lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('visible');
        setTimeout(() => { lightbox.style.display = "none"; }, 300);
    });
}

if(lightbox) {
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.classList.remove('visible');
            setTimeout(() => { lightbox.style.display = "none"; }, 300);
        }
    });
}
