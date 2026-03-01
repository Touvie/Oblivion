// 1. EXPAND BUTTONS
document.querySelectorAll('.btn-expand').forEach(btn => {
    btn.addEventListener('click', () => {
        const txt = btn.previousElementSibling.querySelector('.full-text');
        txt.classList.toggle('visible');
        btn.textContent = txt.classList.contains('visible') ? '[ Réduire ]' : '[ Lire plus ]';
    });
});

// 2. ACCORDION LOGIC
document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
        h.parentElement.classList.toggle('active');
    });
});

// 3. EFFET ESCALIER VIEWPORT
const stairs = document.querySelectorAll('.stair-element');

function updateStairs() {
    if (window.innerWidth < 1000) return;

    const triggerPoint = window.innerHeight * 0.85;

    stairs.forEach((stair, index) => {
        const rect = stair.getBoundingClientRect();
        const top = rect.top;
        const distance = top - triggerPoint;

        if (distance > 0) {
            const offsetVW = (distance / 10) + (index * 2);
            stair.style.transform = `translateX(${offsetVW}vw)`;
            stair.style.opacity = Math.max(0, 1 - (distance / 500));
        } else {
            stair.style.transform = `translateX(0)`;
            stair.style.opacity = 1;
        }
    });
}

window.addEventListener('scroll', () => requestAnimationFrame(updateStairs));
window.addEventListener('resize', updateStairs);
updateStairs();

// 4. MODALE
const modal = document.createElement('div');
modal.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:999;display:none;justify-content:center;align-items:center;";
modal.innerHTML = '<span style="position:absolute;top:30px;right:30px;color:white;cursor:pointer;font-family:\'Space Mono\';font-size:20px;">[ FERMER ]</span><div id="modal-content" style="max-width:90%;max-height:90%;"></div>';
document.body.appendChild(modal);

modal.querySelector('span').addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

document.querySelectorAll('.card-media-wrapper, .acc-media-col').forEach(el => {
    el.addEventListener('click', () => {
        const content = el.querySelector('img, video, .acc-img');
        if (!content) return;

        const target = modal.querySelector('#modal-content');
        target.innerHTML = '';

        const clone = content.cloneNode(true);
        clone.style = "max-width:100%; max-height:85vh; border:1px solid #BFA181; display:block;";
        if (clone.tagName === 'VIDEO') clone.controls = true;

        target.appendChild(clone);
        modal.style.display = 'flex';
    });
});

// 5. LAZY LOADING VIDÉOS via IntersectionObserver
const lazyVideos = document.querySelectorAll('video[data-src]');

if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    }, { rootMargin: '200px' });

    lazyVideos.forEach(video => videoObserver.observe(video));
} else {
    // Fallback navigateurs sans IntersectionObserver
    lazyVideos.forEach(video => {
        video.src = video.dataset.src;
    });
}

// 6. RÉCEPTION MESSAGES (RESET)
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'reset') {
        window.scrollTo(0, 0);
        if (typeof updateStairs === 'function') {
            setTimeout(updateStairs, 50);
        }
    }
});
