// ============================================
// SCROLL MANAGER (Version Touch + Wheel)
// ============================================

export let currentSection = -1;
export let isTransitioning = false;
export let isMovingToSection = false;
export let targetPosition = null;

// --- VARIABLES INTERNES ---
let lastScrollTime = 0; // Pour le cooldown des messages iframe
let lastSectionChangeTime = 0;
let scrollAccumulator = 0;
let scrollTimeout;
let iframeExitAccumulator = 0;
let resistanceY = 0;
let touchStartY = 0; // Pour le tactile

const SCROLL_THRESHOLD = 150; // Seuil plus bas pour être réactif sur mobile

// --- RÉFÉRENCES ---
let camera = null;
let THREE = null;
let sectionCoords = null;

export function initScroll(dependencies) {
    camera = dependencies.camera;
    THREE = dependencies.THREE;
    sectionCoords = dependencies.sectionCoords;
    targetPosition = new THREE.Vector3(0, 6, 1);

    setupWheelListener();
    setupTouchListener(); // <--- LA NOUVEAUTÉ ESSENTIELLE
    setupMessageListener();
    setupNavClickListeners();
}

function changeSection(direction) {
    lastSectionChangeTime = Date.now();
    const totalSections = 5;
    let nextIndex;

    if (direction > 0) nextIndex = (currentSection + 1) % totalSections;
    else nextIndex = (currentSection - 1 + totalSections) % totalSections;

    goToSection(nextIndex);
    scrollAccumulator = 0;
    resistanceY = 0;
}

// Logique commune Souris + Doigt pour éviter de répéter le code
function handleScrollLogic(deltaY) {
    const now = Date.now();
    
    // Bloquer si transition en cours
    if (isTransitioning || isMovingToSection || (now - lastSectionChangeTime < 1500)) {
        scrollAccumulator = 0;
        return;
    }

    clearTimeout(scrollTimeout);
    scrollAccumulator += deltaY;

    // Résistance visuelle
    resistanceY += Math.sign(deltaY) * Math.min(Math.abs(deltaY), 30);
    resistanceY = Math.max(Math.min(resistanceY, 100), -100);

    scrollTimeout = setTimeout(() => { scrollAccumulator = 0; }, 150);

    if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

    const direction = scrollAccumulator > 0 ? 1 : -1;

    // Si on est dans le livre ou making of, on attend le message de l'iframe, on ne force pas le scroll ici
    if (currentSection === 1 || currentSection === 2) return;

    changeSection(direction);
}

// 1. SOURIS (PC)
function setupWheelListener() {
    window.addEventListener('wheel', (e) => {
        if (currentSection === -1) return;
        const overlay = document.getElementById('project-overlay');
        if (overlay && overlay.classList.contains('visible')) return;

        let delta = e.deltaY;
        // Boost trackpad vs souris
        if (Math.abs(delta) < 40) delta *= 3.5; 
        else delta *= 0.8;

        handleScrollLogic(delta);
    }, { passive: false });
}

// 2. DOIGT (MOBILE) - C'est ce qu'il te manquait !
function setupTouchListener() {
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (currentSection === -1) return;
        const overlay = document.getElementById('project-overlay');
        if (overlay && overlay.classList.contains('visible')) return;

        // Si on est sur la galerie horizontale ou les compétences, on laisse le scroll natif horizontal
        const target = e.target;
        if (target.closest('.gallery-viewport') || target.closest('.competences-bento')) {
            // Ici on ne fait RIEN, on laisse le navigateur gérer le scroll horizontal
            return; 
        }

        // Sinon, on gère le changement de section vertical
        const touchY = e.touches[0].clientY;
        const deltaY = (touchStartY - touchY) * 2.5; // Facteur de sensibilité
        touchStartY = touchY;

        handleScrollLogic(deltaY);
    }, { passive: false });
}

// 3. MESSAGES IFRAME (Inchangé, mais nécessaire)
function setupMessageListener() {
    window.addEventListener('message', (event) => {
        if (isTransitioning || isMovingToSection) return;

        // Navigation directe
        if (event.data && event.data.type === 'navigate') {
            goToSection(event.data.section);
            return;
        }

        // Scroll aux bords
        if (event.data && event.data.type === 'scroll' && event.data.atBoundary) {
            const now = Date.now();
            if (now - lastScrollTime < 1500) {
                iframeExitAccumulator = 0;
                return;
            }
            iframeExitAccumulator += 1;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { iframeExitAccumulator = 0; }, 200);

            if (iframeExitAccumulator > 15) {
                lastScrollTime = now;
                if (event.data.direction === 'down') changeSection(1);
                else if (event.data.direction === 'up') changeSection(-1);
                iframeExitAccumulator = 0;
            }
        }
    });
}

// 4. NAVIGATION CLICS (Inchangé)
function setupNavClickListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => goToSection(parseInt(item.dataset.section)));
    });
    const centerBtn = document.getElementById('header-center-btn');
    if (centerBtn) centerBtn.addEventListener('click', () => goToSection(parseInt(centerBtn.dataset.section)));
    const cta = document.getElementById('cta-projects');
    if (cta) cta.addEventListener('click', (e) => { e.preventDefault(); goToSection(3); });
    
    // Liens internes génériques
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('internal-link')) {
            e.preventDefault();
            const target = parseInt(e.target.dataset.target);
            goToSection(target);
        }
    });
}

export function goToSection(index) {
    if (index === currentSection && !isTransitioning && !isMovingToSection) return;

    // --- SCROLL HINT ---
    const scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) scrollHint.classList.toggle('visible', index === 0);

    // --- LAZY LOADING ---
    loadIframeIfNeeded(index);

    // --- RESET IFRAME ---
    let location = 'start';
    if (currentSection > index) location = 'end';
    if (currentSection === 0 && index === 4) location = 'end';
    if (currentSection === 4 && index === 0) location = 'start';
    sendResetToIframe(index, location);

    // --- À PROPOS ---
    if (index === 1) {
        handleSectionAbout(index);
        return;
    }

    // --- GÉNÉRAL ---
    handleSectionGeneral(index);
}

// Helpers
function loadIframeIfNeeded(index) {
    const tableauIframe = document.getElementById('iframe-tableau');
    const livreIframe = document.getElementById('iframe-livre');
    const makingOfFrame = document.querySelector('.section[data-section="2"] iframe');
    const projFrame = document.querySelector('.section[data-section="3"] iframe');

    if (index === 2 && makingOfFrame && !makingOfFrame.getAttribute('src')) makingOfFrame.src = makingOfFrame.dataset.src;
    if (index === 3 && projFrame && !projFrame.getAttribute('src')) projFrame.src = projFrame.dataset.src;
    if (tableauIframe && !tableauIframe.getAttribute('src')) tableauIframe.src = tableauIframe.dataset.src;
    if (livreIframe && !livreIframe.getAttribute('src')) livreIframe.src = livreIframe.dataset.src;
}

function sendResetToIframe(index, location) {
    const livreIframe = document.getElementById('iframe-livre');
    const makingOfFrame = document.querySelector('.section[data-section="2"] iframe');
    if (index === 1 && livreIframe) livreIframe.contentWindow.postMessage({ type: 'reset', location }, '*');
    if (index === 2 && makingOfFrame) makingOfFrame.contentWindow.postMessage({ type: 'reset', location }, '*');
}

function handleSectionAbout(index) {
    const tableauIframe = document.getElementById('iframe-tableau');
    const livreIframe = document.getElementById('iframe-livre');
    isTransitioning = true;

    document.querySelectorAll('.section').forEach(sec => {
        sec.style.transition = 'none'; sec.classList.remove('active');
        sec.style.opacity = '0'; sec.style.visibility = 'hidden'; sec.style.pointerEvents = 'none';
    });
    document.body.offsetHeight; // Force reflow

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.nav-item[data-section="1"]')?.classList.add('active');

    if (tableauIframe) tableauIframe.style.opacity = '0';
    if (livreIframe) livreIframe.style.opacity = '0';

    setTimeout(() => { if (tableauIframe) { tableauIframe.style.transition = 'opacity 1.2s ease'; tableauIframe.style.opacity = '1'; } }, 1500);

    const startPos = camera.position.clone();
    const centerPos = new THREE.Vector3(0, 0, 3);
    const animDuration = 2000;
    const startTime = performance.now();
    isMovingToSection = true;

    function animateToCenter(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / animDuration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        camera.position.lerpVectors(startPos, centerPos, ease);
        camera.lookAt(0, 0, 0);

        if (t < 1) requestAnimationFrame(animateToCenter);
        else {
            currentSection = index;
            targetPosition.copy(centerPos);
            isTransitioning = false;
            isMovingToSection = false;
            updateNavAndSections(index);
            setTimeout(() => { if (livreIframe) { livreIframe.style.transition = 'opacity 0.8s ease'; livreIframe.style.opacity = '1'; } }, 500);
        }
    }
    requestAnimationFrame(animateToCenter);
}

function handleSectionGeneral(index) {
    isMovingToSection = true;
    currentSection = index;
    document.querySelectorAll('.section').forEach(sec => { sec.classList.remove('active'); sec.style.opacity = '0'; sec.style.visibility = 'hidden'; });

    // C'est ici qu'on gère le recul caméra sur mobile (Z = 18 au lieu de 14)
    if (index === 0 && window.innerWidth < 768) targetPosition.set(0, 2, 18);
    else targetPosition.copy(sectionCoords[index]);

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');
    isTransitioning = false;
}

function updateNavAndSections(index) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');
    document.querySelectorAll('.section').forEach(sec => { sec.classList.remove('active'); sec.style.opacity = '0'; sec.style.visibility = 'hidden'; });
    const activeSec = document.querySelector(`.section[data-section="${index}"]`);
    if (activeSec) { activeSec.classList.add('active'); activeSec.style.opacity = '1'; activeSec.style.visibility = 'visible'; }
}

export function setCurrentSection(val) { currentSection = val; }
export function setIsTransitioning(val) { isTransitioning = val; }
export function setIsMovingToSection(val) { isMovingToSection = val; }
export function getResistanceY() { return resistanceY; }
export function decayResistanceY() { resistanceY *= 0.9; if (Math.abs(resistanceY) < 0.01) resistanceY = 0; }
