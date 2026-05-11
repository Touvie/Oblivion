// --- VARIABLES & DOM ---
let currentStation = 0;
let currentImage = 0;
let autoPlayInterval;
let teaserActive = false;
let isAnimating = false;
let isPaused = false;

// Sélecteurs HTML (On récupère tous les éléments de la page)
const dom = {
    body: document.body,
    // Header & Textes
    headerBox: document.querySelector(".header-box"),
    lineName: document.getElementById("lineName"),
    stationName: document.getElementById("stationName"),
    year: document.getElementById("year"),
    subtitle: document.getElementById("subtitle"),
    
    // Descriptions
    stationDesc: document.getElementById("stationDesc"),
    imageSpecificDescBox: document.getElementById("imageSpecificDescBox"),
    imageSpecificDesc: document.getElementById("imageSpecificDesc"),
    
    // Blocs Spéciaux
    landingPage: document.getElementById("landingPage"), // Intro
    descLeft: document.getElementById("descLeft"),       // Conclusion/Sommaire Gauche
    descRight: document.getElementById("descRight"),     // Conclusion/Sommaire Droite
    
    // Images / Vidéos / Carrousel
    heroImage: document.getElementById("heroImage"),
    heroVideo: document.getElementById("heroVideo"),
    carousel: document.getElementById("carousel"),
    
    // Navigation & UI
    indicators: document.getElementById("indicators"),
    counter: document.getElementById("counter"),
    transitionOverlay: document.getElementById("transitionOverlay"),
    transitionText: document.getElementById("transitionText"),
    logo: document.getElementById("logo"),
    pauseBtn: document.getElementById("pauseBtn")
};

// --- FONCTION RENDER (C'est elle qui affiche la diapo) ---
function render() {
    const s = stations[currentStation];
    const imgData = s.images[currentImage];

    // 1. STYLE & COULEURS
    dom.body.className = s.styleType; 

    if (s.styleType === "style-moderne") {
        if(dom.logo) dom.logo.style.backgroundColor = s.themeColor;
        dom.subtitle.style.color = s.themeColor;
        dom.year.style.color = s.themeColor;
    } else {
        if(dom.logo) dom.logo.style.backgroundColor = "";
        dom.subtitle.style.color = "";
        dom.year.style.color = "";
    }

    // 2. TEXTES STANDARD
    dom.lineName.textContent = s.line;
    dom.stationName.innerHTML = s.name;    
    dom.year.textContent = s.year;
    dom.subtitle.textContent = s.subtitle;
    
    // --- RESET DES AFFICHAGES (On nettoie avant d'afficher) ---
    if(dom.landingPage) dom.landingPage.style.display = "none";
    dom.descLeft.style.display = "none";
    dom.descRight.style.display = "none";
    dom.imageSpecificDescBox.style.display = "flex"; // On réaffiche la boite standard
    if(dom.headerBox) dom.headerBox.style.display = "flex"; // On réaffiche le header
    dom.stationDesc.innerHTML = ""; // On vide la description haute
    
    // --- GESTION SPÉCIFIQUE SELON LE STYLE ---

    // CAS 1 : INTRO (LANDING PAGE)
    if (s.styleType === "style-intro") {
        if(dom.landingPage) dom.landingPage.style.display = "flex";
        
        // On cache tout le reste
        dom.imageSpecificDescBox.style.display = "none";
        if(dom.headerBox) dom.headerBox.style.display = "none";
        dom.carousel.innerHTML = ""; 
        
        // Image de fond
        if (s.images[0]) dom.heroImage.src = s.images[0].url;
        
        dom.heroVideo.style.display = "none";
        dom.heroImage.style.display = "block";
        
        return; // On arrête là pour l'intro
    }

    // CAS 2 : CONCLUSION OU SOMMAIRE (MODE SANDWICH)
    else if (s.styleType === "style-conclusion" || s.styleType === "style-sommaire") {
        // On cache la boite standard
        dom.imageSpecificDescBox.style.display = "none";
        
        // On affiche les colonnes latérales
        dom.descLeft.style.display = "flex";
        dom.descRight.style.display = "flex";

        // Découpage du texte en 2 colonnes
        const parser = new DOMParser();
        const doc = parser.parseFromString(s.stationDesc, 'text/html');
        const listItems = Array.from(doc.querySelectorAll('li'));
        
        if (listItems.length > 0) {
            const midIndex = Math.ceil(listItems.length / 2);
            const leftItems = listItems.slice(0, midIndex);
            const rightItems = listItems.slice(midIndex);
            dom.descLeft.innerHTML = "<ul>" + leftItems.map(li => li.outerHTML).join('') + "</ul>";
            dom.descRight.innerHTML = "<ul>" + rightItems.map(li => li.outerHTML).join('') + "</ul>";
        } else {
            dom.descLeft.innerHTML = s.stationDesc;
        }

        // GESTION DU MEDIA CENTRAL
        if (s.styleType === "style-sommaire") {
            // Sommaire : Pas de vidéo, Image de fond (ou rien si CSS caché)
            dom.heroVideo.style.display = "none";
            dom.heroImage.style.display = "block";
            // On met une image par sécurité, mais le CSS la cache
            if (s.images[0]) dom.heroImage.src = s.images[0].url; 
            dom.carousel.innerHTML = ""; 
        } else {
            // Conclusion : Vidéo (gérée plus bas)
            dom.carousel.innerHTML = ""; 
        }
    } 

    // CAS 3 : HISTOIRE (Gauche/Droite fixes)
    else if (s.styleType === "style-history") {
        dom.imageSpecificDesc.innerHTML = s.stationDesc; 
    } 

    // CAS 4 : STANDARD (Moderne / Ancien)
    else {
        dom.stationDesc.innerHTML = s.stationDesc;
        dom.imageSpecificDesc.textContent = imgData.imgDesc;
    }

    // --- GESTION MEDIA & CARROUSEL ---
    
    dom.heroVideo.style.display = "none";
    dom.heroImage.style.display = "block";
    dom.heroVideo.pause();

    let mediaUrl = imgData.url;

    // Gestion Carrousel
    if (s.styleType === "style-history") {
        if (s.images[0]) mediaUrl = s.images[0].url;
        if (s.images[1]) {
            dom.carousel.innerHTML = `<img class="img-droite-fixe" src="${s.images[1].url}" alt="">`;
        } else {
            dom.carousel.innerHTML = ""; 
        }
    } 
    else if (s.styleType === "style-conclusion" || s.styleType === "style-sommaire") {
        if (s.images[0]) mediaUrl = s.images[0].url;
        dom.carousel.innerHTML = ""; 
    }
    else {
        // Carrousel Interactif
        let c = "";
        s.images.forEach((img, idx) => {
             let activeStyle = (idx === currentImage && s.styleType === "style-moderne") ? `border-color: ${s.themeColor}; opacity: 1;` : "";
             c += `<div class="thumb${idx === currentImage ? " active" : ""}" style="${activeStyle}" onclick="jumpToImage(${idx})">
                    <img src="${img.url}" alt="">
                  </div>`;
        });
        dom.carousel.innerHTML = c;
    }

    // Affichage Vidéo ou Image
    if (mediaUrl && (mediaUrl.toLowerCase().endsWith(".mp4") || mediaUrl.toLowerCase().endsWith(".webm"))) {
        dom.heroImage.style.display = "none";
        dom.heroVideo.style.display = "block";
        dom.heroVideo.src = mediaUrl;
        dom.heroVideo.play().catch(e => console.log("Autoplay bloqué", e));
    } else {
        dom.heroImage.classList.remove("loaded");
        if (mediaUrl) {
            dom.heroImage.src = mediaUrl;
            dom.heroImage.onload = () => dom.heroImage.classList.add("loaded");
            if (dom.heroImage.complete) dom.heroImage.classList.add("loaded");
        }
    }

    if (s.images && s.images.length > 0) {
        s.images.forEach(imgData => {
            const preloadLink = new Image();
            preloadLink.src = imgData.url;
        });
    }

    // Compteur
    dom.counter.textContent = `0${currentStation + 1} / 0${stations.length}`;
}


// --- NAVIGATION & INTERACTION ---

function jumpToImage(index) {
    if (teaserActive || isAnimating) return;
    const s = stations[currentStation];
    // EXCLUSION : On ne change pas d'image sur ces styles
    if (s.styleType === "style-history" || s.styleType === "style-conclusion" || s.styleType === "style-intro" || s.styleType === "style-sommaire") return;

    currentImage = index;
    render();
    if (!isPaused) resetAutoPlay();
}

dom.pauseBtn.onclick = function() {
    isPaused = !isPaused;
    if (isPaused) {
        stopAutoPlay();
        dom.pauseBtn.textContent = "▶";
        dom.pauseBtn.classList.add("paused");
    } else {
        startAutoPlay();
        dom.pauseBtn.textContent = "❚❚";
        dom.pauseBtn.classList.remove("paused");
    }
};

function showTeaser(targetIndex) {
    if (teaserActive || isAnimating) return;
    const targetStation = stations[targetIndex];

    // --- MODIFICATION ICI ---
    // On ajoute "style-fullscreen" dans la liste des styles qui SANS animation
    if (targetStation.styleType === "style-history" || 
        targetStation.styleType === "style-conclusion" || 
        targetStation.styleType === "style-intro" || 
        targetStation.styleType === "style-sommaire" ||
        targetStation.styleType === "style-fullscreen") { // <--- AJOUTÉ
        
        currentStation = targetIndex;
        currentImage = 0; 
        render(); 
        return; 
    }
    // ------------------------

    teaserActive = true;
    stopAutoPlay();

    dom.transitionText.innerHTML = targetStation.splashTitle || targetStation.name;
    dom.transitionText.style.transformOrigin = targetStation.zoomPoint || "center center";
    dom.transitionText.style.fontSize = targetStation.teaserSize || "15vw";

    dom.transitionOverlay.classList.remove("zoom-active", "finished");
    dom.transitionOverlay.classList.add("active");

    setTimeout(() => {
        currentStation = targetIndex;
        currentImage = 0;
        render(); 
    }, 100);
}

function triggerZoomIn() {
    if (!teaserActive || isAnimating) return;
    isAnimating = true;
    dom.transitionOverlay.classList.add("zoom-active");
    
    setTimeout(() => {
        dom.transitionOverlay.classList.remove("active");
        dom.transitionOverlay.classList.add("finished");
        teaserActive = false;
        isAnimating = false;
        if (!isPaused) startAutoPlay();
    }, 1200); 
}

function nextImage() {
    const s = stations[currentStation];
    // Si c'est un style fixe, on ne fait rien (évite le bug des 4 clics)
    if (teaserActive || isAnimating || s.styleType === "style-history" || s.styleType === "style-conclusion" || s.styleType === "style-intro" || s.styleType === "style-sommaire") return;
    
    currentImage = (currentImage + 1) % s.images.length;
    render();
    if (!isPaused) resetAutoPlay();
}

function prevImage() {
    const s = stations[currentStation];
    if (teaserActive || isAnimating || s.styleType === "style-history" || s.styleType === "style-conclusion" || s.styleType === "style-intro" || s.styleType === "style-sommaire") return;
    
    const len = s.images.length;
    currentImage = (currentImage - 1 + len) % len;
    render();
    if (!isPaused) resetAutoPlay();
}

// Fonction pour le bouton "Explorer"
window.goNextStation = function() {
    let nextIdx = (currentStation + 1) % stations.length;
    showTeaser(nextIdx);
}

function goPrevStation() {
    let prevIdx = (currentStation - 1 + stations.length) % stations.length;
    showTeaser(prevIdx);
}

document.addEventListener("click", function(e) {
    if (e.target.closest("button, .thumb, #pauseBtn, #logo, a")) return;
    if (isAnimating) return;
    if (teaserActive) { triggerZoomIn(); return; }
    goNextStation();
});

document.onkeydown = function(e) {
    if (isAnimating) return; 
    
    if (teaserActive) {
        if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) triggerZoomIn();
        return;
    }
    
    if (e.key === " ") {
        dom.pauseBtn.click();
        return;
    }

    if (e.key === "ArrowRight") goNextStation();
    if (e.key === "ArrowLeft") goPrevStation();
    if (e.key === "ArrowDown") nextImage();
    if (e.key === "ArrowUp") prevImage();
};

function startAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        const s = stations[currentStation];
        // Autoplay actif SEULEMENT si ce n'est pas une page fixe
        if(!teaserActive && !isAnimating && !isPaused && 
           s.styleType !== "style-history" && 
           s.styleType !== "style-conclusion" && 
           s.styleType !== "style-intro" &&
           s.styleType !== "style-sommaire") {
            nextImage();
        }
    }, 4000);
}
function stopAutoPlay() { clearInterval(autoPlayInterval); }
function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

// Démarrage
render();
startAutoPlay();