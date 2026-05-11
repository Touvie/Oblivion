// FIX: const book supprimé — document.getElementById('book') retournait null
// (aucun élément avec id="book" dans le DOM, variable jamais utilisée)
const container = document.querySelector('.book-container');
const allPages = document.querySelectorAll('.page, .cover');
const indicator = document.getElementById('page-indicator');

let currentPage = 0;
const totalPages = allPages.length;

const pageNames = {
    0: "Couverture", 1: "Situation", 2: "L'Italie", 3: "Exploration",
    4: "Projets Groupes", 5: "Atout Littéraire", 6: "Usage & Données",
    7: "Pourquoi MMI ?", 8: "Conclusion", 9: "Épilogue", 10: "Fin"
};

function flipTo(pageNum) {
    if (pageNum < 0 || pageNum > totalPages) return;

    const scene = document.querySelector('.book-scene');
    scene.classList.remove('open', 'closed-final');

    if (pageNum === totalPages) scene.classList.add('closed-final');
    else if (pageNum > 0) scene.classList.add('open');

    // Volet gauche
    const pageLeft = document.querySelector('.page-left');
    if (pageNum > 0 && pageNum < totalPages) {
        setTimeout(() => { if (currentPage > 0 && currentPage < totalPages) pageLeft.classList.add('visible'); }, 800);
    } else {
        pageLeft.classList.remove('visible');
    }

    // Retournement
    allPages.forEach(page => {
        const idx = parseInt(page.dataset.page);
        if (idx < pageNum) page.classList.add('flipped');
        else page.classList.remove('flipped');
    });

    currentPage = pageNum;
    indicator.textContent = pageNames[currentPage] || `Page ${currentPage}`;
}

// Navigation CLIC
allPages.forEach(page => {
    page.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-image')) return;
        const idx = parseInt(page.dataset.page);
        if (page.classList.contains('flipped')) flipTo(idx);
        else flipTo(idx + 1);
    });
});

// Boutons navigation Making Of
document.querySelectorAll('.making-of-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const label = btn.textContent;
        let section = 2; // Par défaut Making Of
        if (label.includes('Projets')) section = 3;
        window.parent.postMessage({ type: 'navigate', section: section }, '*');
    });
});

// === SCROLL UNIFIÉ (TRACKPAD/SOURIS) & LOCK ===
let isPageTurning = false;
let pageScrollAccumulator = 0;
let pageScrollTimeout;

window.addEventListener('wheel', (e) => {
    if (isPageTurning) return;

    let rawDelta = e.deltaY;
    let effectiveDelta = rawDelta;

    if (Math.abs(rawDelta) < 40) effectiveDelta = rawDelta * 3.0;
    else effectiveDelta = rawDelta * 0.6;

    pageScrollAccumulator += effectiveDelta;

    clearTimeout(pageScrollTimeout);
    pageScrollTimeout = setTimeout(() => { pageScrollAccumulator = 0; }, 100);

    if (Math.abs(pageScrollAccumulator) < 60) return;

    const direction = pageScrollAccumulator > 0 ? 1 : -1;
    pageScrollAccumulator = 0;

    // Sorties
    if (currentPage >= totalPages && direction > 0) {
        window.parent.postMessage({ type: 'scroll', direction: 'down', atBoundary: true }, '*');
        return;
    }
    if (currentPage === 0 && direction < 0) {
        window.parent.postMessage({ type: 'scroll', direction: 'up', atBoundary: true }, '*');
        return;
    }

    isPageTurning = true;
    if (direction > 0) flipTo(currentPage + 1);
    else flipTo(currentPage - 1);

    setTimeout(() => { isPageTurning = false; }, 1200);

}, { passive: true });

// === RECEPTION MESSAGES (RESET) ===
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'reset') {
        flipTo(0);
    }
});

document.getElementById('next-page').onclick = () => flipTo(currentPage + 1);
document.getElementById('prev-page').onclick = () => flipTo(currentPage - 1);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') flipTo(currentPage + 1);
    if (e.key === 'ArrowLeft') flipTo(currentPage - 1);
});

window.addEventListener('load', () => flipTo(0));

function openLightbox(img) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    lb.classList.add('active');
}
document.getElementById('lightbox').onclick = function() { this.classList.remove('active'); };
