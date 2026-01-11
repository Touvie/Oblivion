// MobileManager.js
export function initMobileOverlay() {
    // 1. Définition du HTML de l'overlay
    const overlayHTML = `
    <div id="mobile-orientation-overlay">
        <div class="mobile-content">
            <div class="rotate-icon">⟳</div>
            <h2>Mode Immersif Requis</h2>
            <p>Pour profiter du voyage, l'expérience doit être vécue en paysage et plein écran.</p>
            <button id="btn-fullscreen">Entrer dans le trou noir</button>
            <p class="force-rotate-msg">Merci de tourner votre appareil ↻</p>
        </div>
    </div>
    `;

    // 2. Injection du HTML dans la page (à la fin du body)
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    // 3. Logique du bouton (copiée de la réponse précédente)
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const rotateMsg = document.querySelector('.force-rotate-msg');

    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', async () => {
            const docEl = document.documentElement;
            
            // Demande de Plein Écran
            try {
                if (docEl.requestFullscreen) await docEl.requestFullscreen();
                else if (docEl.webkitRequestFullscreen) await docEl.webkitRequestFullscreen(); // Safari
            } catch (err) {
                console.warn("Plein écran refusé ou non supporté", err);
            }

            // Tentative de verrouillage orientation (Android)
            if (screen.orientation && screen.orientation.lock) {
                try {
                    await screen.orientation.lock("landscape");
                } catch (err) {
                    // Si échec (ex: iPhone), on affiche le message d'aide
                    if(rotateMsg) rotateMsg.style.display = 'block';
                    btnFullscreen.style.display = 'none';
                }
            } else {
                // Fallback pour iPhone/Safari
                if(rotateMsg) rotateMsg.style.display = 'block';
                btnFullscreen.style.display = 'none';
            }
        });
    }
}