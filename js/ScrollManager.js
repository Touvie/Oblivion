// ============================================
// SCROLL MANAGER (Version Restreinte & Nettoyée)
// ============================================

export let currentSection = -1;
export let isTransitioning = false;
export let isMovingToSection = false;
export let targetPosition = null;

// --- VARIABLES INTERNES ---
let lastSectionChangeTime = 0;
let scrollAccumulator = 0;
let scrollTimeout;
let resistanceY = 0;
let touchStartY = 0;

const SCROLL_THRESHOLD = 150;

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
    setupTouchListener();
    setupMessageListener();
    setupNavClickListeners();
}

// Logique commune Souris + Doigt (Restreinte à 0 -> 1)
function handleScrollLogic(deltaY) {
    const now = Date.now();

    // Bloquer si transition en cours ou si on vient juste de changer de section
    if (isTransitioning || isMovingToSection || (now - lastSectionChangeTime < 1500)) {
        scrollAccumulator = 0;
        return;
    }

    clearTimeout(scrollTimeout);
    scrollAccumulator += deltaY;

    // Résistance visuelle (petit effet de rebond de la caméra)
    resistanceY += Math.sign(deltaY) * Math.min(Math.abs(deltaY), 30);
    resistanceY = Math.max(Math.min(resistanceY, 100), -100);

    scrollTimeout = setTimeout(() => { scrollAccumulator = 0; }, 150);

    if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

    const direction = scrollAccumulator > 0 ? 1 : -1;

    // --- LA RÈGLE STRICTE ---
    // On autorise UNIQUEMENT le scroll descendant depuis l'Accueil (0) vers À Propos (1)
    if (currentSection === 0 && direction === 1) {
        lastSectionChangeTime = Date.now();
        goToSection(1);
        scrollAccumulator = 0;
        resistanceY = 0;
    }
}

// 1. SOURIS (PC)
function setupWheelListener() {
    window.addEventListener('wheel', (e) => {
        if (currentSection === -1) return;
        const overlay = document.getElementById('project-overlay');
        if (overlay && overlay.classList.contains('visible')) return;

        let delta = e.deltaY;
        if (Math.abs(delta) < 40) delta *= 3.5;
        else delta *= 0.8;

        handleScrollLogic(delta);
    }, { passive: false });
}

// 2. DOIGT (MOBILE)
function setupTouchListener() {
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (currentSection === -1) return;
        const overlay = document.getElementById('project-overlay');
        if (overlay && overlay.classList.contains('visible')) return;

        const target = e.target;
        if (target.closest('.gallery-viewport') || target.closest('.competences-bento')) {
            return;
        }

        const touchY = e.touches[0].clientY;
        const deltaY = (touchStartY - touchY) * 2.5;
        touchStartY = touchY;

        handleScrollLogic(deltaY);
    }, { passive: false });
}

// 3. MESSAGES IFRAME (Uniquement pour la navigation au clic)
function setupMessageListener() {
    window.addEventListener('message', (event) => {
        if (isTransitioning || isMovingToSection) return;

        if (event.data && event.data.type === 'navigate') {
            goToSection(event.data.section);
        }
    });
}

// 4. NAVIGATION CLICS
function setupNavClickListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => goToSection(parseInt(item.dataset.section)));
    });
    const centerBtn = document.getElementById('header-center-btn');
    if (centerBtn) centerBtn.addEventListener('click', () => goToSection(parseInt(centerBtn.dataset.section)));
    const cta = document.getElementById('cta-projects');
    if (cta) cta.addEventListener('click', (e) => { e.preventDefault(); goToSection(3); });

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
    sendResetToIframe(index);

    // --- À PROPOS (Garde son animation spéciale) ---
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

function sendResetToIframe(index) {
    const livreIframe = document.getElementById('iframe-livre');
    const makingOfFrame = document.querySelector('.section[data-section="2"] iframe');
    const projetsFrame = document.querySelector('.section[data-section="3"] iframe');

    // On envoie un signal reset tout simple, sans se soucier de l'endroit
    if (index === 1 && livreIframe) livreIframe.contentWindow.postMessage({ type: 'reset' }, '*');
    if (index === 2 && makingOfFrame) makingOfFrame.contentWindow.postMessage({ type: 'reset' }, '*');
    if (index === 3 && projetsFrame) projetsFrame.contentWindow.postMessage({ type: 'reset' }, '*');
}

function handleSectionAbout(index) {
    const tableauIframe = document.getElementById('iframe-tableau');
    const livreIframe = document.getElementById('iframe-livre');
    isTransitioning = true;

    document.querySelectorAll('.section').forEach(sec => {
        sec.style.transition = 'none'; sec.classList.remove('active');
        sec.style.opacity = '0'; sec.style.visibility = 'hidden'; sec.style.pointerEvents = 'none';
    });
    document.body.offsetHeight;

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

        // C'est ici que la magie opère pour plonger dans le trou noir
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
