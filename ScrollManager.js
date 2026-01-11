// ============================================
// SCROLL MANAGER
// Gestion centralisée du scroll et navigation
// ============================================

// --- VARIABLES EXPORTÉES (pour app.js) ---
export let currentSection = -1;
export let isTransitioning = false;
export let isMovingToSection = false;
export let targetPosition = null; // Initialisé dans initScroll()

// --- VARIABLES INTERNES ---
let lastScrollTime = 0;
let lastSectionChangeTime = 0;
let scrollAccumulator = 0;
let scrollTimeout;
let iframeExitAccumulator = 0;
let resistanceY = 0;

const SCROLL_THRESHOLD = 250;

// --- RÉFÉRENCES EXTERNES (injectées via initScroll) ---
let camera = null;
let THREE = null;
let sectionCoords = null;

// ============================================
// INITIALISATION
// ============================================
export function initScroll(dependencies) {
    camera = dependencies.camera;
    THREE = dependencies.THREE;
    sectionCoords = dependencies.sectionCoords;
    targetPosition = new THREE.Vector3(0, 6, 1);

    setupWheelListener();
    setupMessageListener();
    setupNavClickListeners();
}

// ============================================
// CHANGE SECTION (logique de direction)
// ============================================
function changeSection(direction) {
    lastSectionChangeTime = Date.now();
    const totalSections = 5;
    let nextIndex;

    if (direction > 0) {
        nextIndex = (currentSection + 1) % totalSections;
    } else {
        nextIndex = (currentSection - 1 + totalSections) % totalSections;
    }

    goToSection(nextIndex);

    // Reset après déclenchement
    scrollAccumulator = 0;
    resistanceY = 0;
}

// ============================================
// LISTENER WHEEL (scroll molette/trackpad)
// ============================================
function setupWheelListener() {
    window.addEventListener('wheel', (e) => {
        if (currentSection === -1) return;

        // Bloquer si overlay projet ouvert
        const overlay = document.getElementById('project-overlay');
        if (overlay && overlay.classList.contains('visible')) return;

        const now = Date.now();

        // Mur temporel : bloquer pendant transitions
        if (isTransitioning || isMovingToSection || (now - lastSectionChangeTime < 1500)) {
            scrollAccumulator = 0;
            return;
        }

        clearTimeout(scrollTimeout);

        // Normalisation souris vs trackpad
        let rawDelta = e.deltaY;
        let effectiveDelta = rawDelta;

        if (Math.abs(rawDelta) < 40) {
            // Trackpad : boost car petites valeurs fréquentes
            effectiveDelta = rawDelta * 3.5;
        } else {
            // Souris : calmer les sauts brusques
            effectiveDelta = rawDelta * 0.8;
        }

        scrollAccumulator += effectiveDelta;

        // Résistance visuelle (effet élastique)
        resistanceY += Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), 30);
        resistanceY = Math.max(Math.min(resistanceY, 100), -100);

        // Reset si arrêt du scroll
        scrollTimeout = setTimeout(() => {
            scrollAccumulator = 0;
        }, 150);

        // Vérification du seuil
        if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

        const direction = scrollAccumulator > 0 ? 1 : -1;

        // Sections iframe (Livre/Making Of) : géré par message listener
        if (currentSection === 1 || currentSection === 2) {
            return;
        }

        changeSection(direction);

    }, { passive: false });
}

// ============================================
// LISTENER MESSAGE (communication iframes)
// ============================================
function setupMessageListener() {
    window.addEventListener('message', (event) => {
        if (isTransitioning || isMovingToSection) return;

        // Navigation directe depuis iframe
        if (event.data && event.data.type === 'navigate') {
            goToSection(event.data.section);
            return;
        }

        // Scroll aux bords des iframes
        if (event.data && event.data.type === 'scroll' && event.data.atBoundary) {
            const now = Date.now();

            // Cooldown après transition
            if (now - lastScrollTime < 1500) {
                iframeExitAccumulator = 0;
                return;
            }

            // Accumulation des messages d'insistance
            iframeExitAccumulator += 1;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                iframeExitAccumulator = 0;
            }, 200);

            // Seuil de sortie : > 15 messages rapides (moins sensible)
            if (iframeExitAccumulator > 15) {
                lastScrollTime = now;

                if (event.data.direction === 'down') {
                    changeSection(1);
                } else if (event.data.direction === 'up') {
                    changeSection(-1);
                }

                iframeExitAccumulator = 0;
            }
        }
    });
}

// ============================================
// LISTENERS NAVIGATION (clics header + CTA)
// ============================================
function setupNavClickListeners() {
    // Items du header
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            goToSection(parseInt(item.dataset.section));
        });
    });

    // Bouton central header (Making Of)
    const headerCenterBtn = document.getElementById('header-center-btn');
    if (headerCenterBtn) {
        headerCenterBtn.addEventListener('click', () => {
            goToSection(parseInt(headerCenterBtn.dataset.section));
        });
    }

    // Bouton CTA projets
    const ctaProjects = document.getElementById('cta-projects');
    if (ctaProjects) {
        ctaProjects.addEventListener('click', (e) => {
            e.preventDefault();
            goToSection(3);
        });
    }

    // Liens internes
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('internal-link')) {
            e.preventDefault();
            const target = parseInt(e.target.dataset.target);
            goToSection(target);
        }
    });
}

// ============================================
// GO TO SECTION (navigation principale)
// ============================================
export function goToSection(index) {
    // Déjà sur la section et pas en mouvement
    if (index === currentSection && !isTransitioning && !isMovingToSection) return;

    // --- SCROLL HINT ---
    const scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) {
        scrollHint.classList.toggle('visible', index === 0);
    }

    // --- LAZY LOADING IFRAMES ---
    loadIframeIfNeeded(index);

    // --- CALCUL DIRECTION POUR RESET IFRAME ---
    let location = 'start';
    if (currentSection > index) location = 'end';
    if (currentSection === 0 && index === 4) location = 'end';
    if (currentSection === 4 && index === 0) location = 'start';

    // Envoi message aux iframes concernées
    sendResetToIframe(index, location);

    // --- CAS SPÉCIAL : SECTION 1 (À PROPOS) ---
    if (index === 1) {
        handleSectionAbout(index);
        return;
    }

    // --- CAS GÉNÉRAL : SECTIONS 0, 2, 3, 4 ---
    handleSectionGeneral(index);
}

// ============================================
// HELPERS POUR goToSection
// ============================================

function loadIframeIfNeeded(index) {
    const tableauIframe = document.getElementById('iframe-tableau');
    const livreIframe = document.getElementById('iframe-livre');
    const makingOfFrame = document.querySelector('.section[data-section="2"] iframe');
    const projFrame = document.querySelector('.section[data-section="3"] iframe');

    if (index === 2 && makingOfFrame && !makingOfFrame.getAttribute('src')) {
        makingOfFrame.src = makingOfFrame.dataset.src;
    }
    if (index === 3 && projFrame && !projFrame.getAttribute('src')) {
        projFrame.src = projFrame.dataset.src;
    }
    if (tableauIframe && !tableauIframe.getAttribute('src')) {
        tableauIframe.src = tableauIframe.dataset.src;
    }
    if (livreIframe && !livreIframe.getAttribute('src')) {
        livreIframe.src = livreIframe.dataset.src;
    }
}

function sendResetToIframe(index, location) {
    const livreIframe = document.getElementById('iframe-livre');
    const makingOfFrame = document.querySelector('.section[data-section="2"] iframe');

    if (index === 1 && livreIframe) {
        const send = () => livreIframe.contentWindow.postMessage({ type: 'reset', location }, '*');
        send();
        livreIframe.onload = send;
    }

    if (index === 2 && makingOfFrame) {
        const send = () => makingOfFrame.contentWindow.postMessage({ type: 'reset', location }, '*');
        send();
        makingOfFrame.onload = send;
    }
}

function handleSectionAbout(index) {
    const tableauIframe = document.getElementById('iframe-tableau');
    const livreIframe = document.getElementById('iframe-livre');

    isTransitioning = true;

    // === FORCER LE HIDE IMMÉDIAT (sans transition) ===
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.transition = 'none';  // Désactiver les transitions
        sec.classList.remove('active');
        sec.style.opacity = '0';
        sec.style.visibility = 'hidden';
        sec.style.pointerEvents = 'none';
    });

    // Forcer un reflow pour appliquer immédiatement
    document.body.offsetHeight;

    // === Mettre à jour la nav immédiatement ===
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.nav-item[data-section="1"]')?.classList.add('active');

    // Cacher les iframes d'abord
    if (tableauIframe) tableauIframe.style.opacity = '0';
    if (livreIframe) livreIframe.style.opacity = '0';

    // Fondu d'apparition tableau
    setTimeout(() => {
        if (tableauIframe) {
            tableauIframe.style.transition = 'opacity 1.2s ease';
            tableauIframe.style.opacity = '1';
        }
    }, 1500);

    // Animation caméra
    const startPos = camera.position.clone();
    const centerPos = new THREE.Vector3(0, 0, 3);
    const animDuration = 2000;
    const startTime = performance.now();

    isMovingToSection = true;
    // NE PAS mettre currentSection = index ici !

    function animateToCenter(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / animDuration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        camera.position.lerpVectors(startPos, centerPos, ease);
        camera.lookAt(0, 0, 0);

        if (t < 1) {
            requestAnimationFrame(animateToCenter);
        } else {
            // SEULEMENT ICI on change la section
            currentSection = index;
            targetPosition.copy(centerPos);
            isTransitioning = false;
            isMovingToSection = false;

            updateNavAndSections(index);

            // Fondu livre
            setTimeout(() => {
                if (livreIframe) {
                    livreIframe.style.transition = 'opacity 0.8s ease';
                    livreIframe.style.opacity = '1';
                }
            }, 500);
        }
    }

    requestAnimationFrame(animateToCenter);
}

function handleSectionGeneral(index) {
    isMovingToSection = true;
    currentSection = index;

    // Cacher toutes les sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.opacity = '0';
        sec.style.visibility = 'hidden';
    });

    // Définir la cible caméra
    if (index === 0 && window.innerWidth < 768) {
        targetPosition.set(0, 2, 14);
    } else {
        targetPosition.copy(sectionCoords[index]);
    }

    // Mettre à jour nav
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');

    isTransitioning = false;
}

function updateNavAndSections(index) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');

    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.opacity = '0';
        sec.style.visibility = 'hidden';
    });

    const activeSec = document.querySelector(`.section[data-section="${index}"]`);
    if (activeSec) {
        activeSec.classList.add('active');
        activeSec.style.opacity = '1';
        activeSec.style.visibility = 'visible';
    }
}

// ============================================
// GETTERS/SETTERS (pour app.js)
// ============================================
export function setCurrentSection(val) { currentSection = val; }
export function setIsTransitioning(val) { isTransitioning = val; }
export function setIsMovingToSection(val) { isMovingToSection = val; }
export function getResistanceY() { return resistanceY; }
export function decayResistanceY() {
    resistanceY *= 0.9;
    if (Math.abs(resistanceY) < 0.01) resistanceY = 0;
}