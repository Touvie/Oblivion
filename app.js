import * as THREE from 'three';
import { initMobileOverlay } from "./MobileManager.js";
import { 
    initScroll, 
    goToSection,
    currentSection,
    isTransitioning,
    isMovingToSection,
    targetPosition,
    setCurrentSection,
    setIsTransitioning,
    setIsMovingToSection,
    getResistanceY,
    decayResistanceY
} from './ScrollManager.js';

// --- DATA PROJETS ---
const projectsData = {
    "portfolio": {
        title: "Portfolio Interactif",
        tags: ["Three.js", "WebGL", "Storytelling"],
        content: `
            <h3>Un récit en trois dimensions</h3>
            <p>Ce portfolio n'est pas qu'une simple vitrine : c'est une exploration technique et narrative.</p>
            <h3>Défis techniques</h3>
            <p>Le plus grand défi a été d'équilibrer la performance et l'esthétique.</p>
        `,
        link: null,
        linkLabel: "Vous y êtes déjà !"
    },
    "hermes": {
        title: "Éditions Hermès",
        tags: ["HTML", "CSS", "Identité Visuelle"],
        content: `
            <h3>Présentation</h3>
            <p>Ce projet de groupe consistait à imaginer une maison d'édition de A à Z.</p>
            <h3>Volonté Artistique</h3>
            <p>Le site adopte volontairement une esthétique très sobre.</p>
            <h3>Conclusion</h3>
            <p>Imaginer le site d'une maison d'édition fictive m'a donné envie de travailler pour une maison bien réelle.</p>
        `,
        link: "https://touvie.github.io/Hermes/",
        linkLabel: "Visiter le site"
    },
    "escale": {
        title: "Stop Motion - Pas prévu",
        tags: ["Stop Motion", "Origami", "Montage"],
        content: `
            <h3>Présentation générale</h3>
            <p>Vidéo de promotion autour de l'album <em>Pas prévu</em> d'Élo.</p>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/zUz145uZZLE" allowfullscreen></iframe>
            </div>
            <h3>Ce que j'ai appris</h3>
            <p>Première confrontation à l'écriture d'un script pensé pour un tournage.</p>
        `,
        link: "#",
        linkLabel: "Voir la vidéo sur YouTube"
    },
    "frise": {
        title: "Frise Chronologique",
        tags: ["Figma", "UX/UI", "Prototypage"],
        content: `
            <h3>Présentation</h3>
            <p>Frise chronologique interactive réalisée sur Figma.</p>
        `,
        buttons: [
            { label: "Voir le Prototype", url: "https://www.figma.com/proto/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=122-430" },
            { label: "Voir les Maquettes", url: "https://www.figma.com/design/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=0-1" }
        ]
    },
    "traiteur": {
        title: "Site Traiteur",
        tags: ["HTML", "CSS", "WIP"],
        content: `<div style="display:flex; justify-content:center; align-items:center; min-height:200px;">
            <h3 style="color: var(--accent);">🚧 En cours de développement</h3>
        </div>`,
        link: null,
        linkLabel: null
    },
    "italie": {
        title: "Projet Italie",
        tags: ["Premier Site", "HTML", "Découverte"],
        content: `
            <h3>Le point de départ</h3>
            <p>Mon premier site web lors d'un cours d'informatique.</p>
            <h3>Une révélation</h3>
            <p>J'ai aimé le processus de création.</p>
        `,
        link: "https://touvie.github.io/Italie",
        linkLabel: "Visiter le site"
    }
};

// --- GESTION MODAL ---
const modal = document.getElementById('project-overlay');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalBody = document.getElementById('modal-body');
const modalFooter = document.getElementById('modal-footer');
const closeModal = document.querySelector('.overlay-close');

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalBody.innerHTML = data.content;
    
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'overlay-tag';
        span.innerText = tag;
        modalTags.appendChild(span);
    });

    modalFooter.innerHTML = '';
    
    if (data.buttons) {
        data.buttons.forEach(btnData => {
            const btn = document.createElement('a');
            btn.className = 'overlay-btn';
            btn.href = btnData.url;
            btn.target = "_blank";
            btn.innerText = `[ ${btnData.label} ]`;
            modalFooter.appendChild(btn);
        });
    } else if (data.link && data.link !== "#") {
        const btn = document.createElement('a');
        btn.className = 'overlay-btn';
        btn.href = data.link;
        btn.target = "_blank";
        btn.innerText = `[ ${data.linkLabel} ]`;
        modalFooter.appendChild(btn);
    } else if (data.linkLabel) {
        const span = document.createElement('span');
        span.style.cssText = "font-family:'Space Mono';font-size:10px;color:rgba(255,255,255,0.5)";
        span.innerText = data.linkLabel;
        modalFooter.appendChild(span);
    }

    modal.classList.add('visible');
}

closeModal.addEventListener('click', () => modal.classList.remove('visible'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('visible'); });

function setupProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const pid = card.dataset.project;
            if (pid === 'portfolio') { goToSection(2); return; }
            if (pid) openModal(pid);
        });
    });
}

// --- GPU DETECTION ---
function getGPUTier() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return 'low';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'low';
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
    if (/(intel|hd graphics|mali|adreno|powervr|open source|mesa|swiftshader)/.test(renderer)) return 'low';
    return 'high';
}

const gpuTier = getGPUTier();
const CONFIG = {
    pixelRatio: gpuTier === 'low' ? 1 : Math.min(window.devicePixelRatio, 2),
    particlesCount: gpuTier === 'low' ? 5000 : 20000,
    sphereSegments: gpuTier === 'low' ? 32 : 64
};

// --- VARIABLES THREE.JS (exportées pour ScrollManager) ---
export let scene, camera, renderer, bgMesh, stars, blackHole, glowSphere, accretionDisk;

// --- COORDONNÉES SECTIONS (exportées pour ScrollManager) ---
export const sectionCoords = [
    new THREE.Vector3(0, 2, 10),      // 0: Accueil
    new THREE.Vector3(0, 0, 8),       // 1: À propos
    new THREE.Vector3(30, 20, 30),    // 2: Making Of
    new THREE.Vector3(180, 180, 1),   // 3: Projets
    new THREE.Vector3(0, 0, 50)       // 4: Compétences
];

// --- TEXTURE BRUIT ---
function generateNoiseTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let value = 0;
            value += Math.sin(x * 0.05) * Math.cos(y * 0.05) * 0.5;
            value += Math.sin(x * 0.1 + y * 0.1) * 0.3;
            value += Math.random() * 0.2;
            
            const normalized = ((value + 1) * 0.5) * 255;
            const i = (y * size + x) * 4;
            imageData.data[i] = normalized;
            imageData.data[i+1] = normalized;
            imageData.data[i+2] = normalized;
            imageData.data[i+3] = 255;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// --- INIT ---
function init() {
    initMobileOverlay();

    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 3000);
    camera.position.set(0, 6, 1);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(CONFIG.pixelRatio);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const milkyWayUrl = 'https://cdn.eso.org/images/large/eso0932a.jpg';

    // FOND
    const bgGeo = new THREE.SphereGeometry(1500, CONFIG.sphereSegments, CONFIG.sphereSegments);
    bgGeo.scale(-1, 1, 1);
    const bgMat = new THREE.ShaderMaterial({
        uniforms: { u_texture: { value: textureLoader.load(milkyWayUrl) } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform sampler2D u_texture; varying vec2 vUv; void main() { vec4 texColor = texture2D(u_texture, vUv); texColor.rgb = pow(texColor.rgb, vec3(3.0)) * 1.5; gl_FragColor = vec4(texColor.rgb, 1.0); }`
    });
    bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.rotation.x = Math.PI * 0.1;
    bgMesh.rotation.z = Math.PI * 0.15;
    scene.add(bgMesh);

    // ÉTOILES
    const starsCount = 4000;
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
        const r = 500 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starsPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
        starsPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        starsPos[i*3+2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    // TROU NOIR
    const BH_RADIUS = 4.0;
    const coreGeo = new THREE.SphereGeometry(BH_RADIUS, CONFIG.sphereSegments, CONFIG.sphereSegments);
    blackHole = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
    scene.add(blackHole);

    // GLOW
    const glowGeo = new THREE.SphereGeometry(BH_RADIUS * 1.05, CONFIG.sphereSegments, CONFIG.sphereSegments);
    const glowMat = new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(0xffaa33) }, viewVector: { value: new THREE.Vector3() }, power: { value: 3.5 }, intensity: { value: 1.4 } },
        vertexShader: `uniform vec3 viewVector; varying float vIntensity; uniform float power; void main() { vec3 vNormal = normalize(normalMatrix * normal); vec3 vNormel = normalize(normalMatrix * viewVector); vIntensity = pow(0.7 - dot(vNormal, vNormel), power); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform vec3 glowColor; uniform float intensity; varying float vIntensity; void main() { gl_FragColor = vec4(glowColor * vIntensity * intensity, 1.0); }`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    });
    glowSphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowSphere);

    // DISQUE ACCRÉTION
    const noiseTexture = generateNoiseTexture(256);
    const diskSegments = gpuTier === 'low' ? 128 : 192;
    const diskGeo = new THREE.RingGeometry(BH_RADIUS * 1.1, 60.0, diskSegments, 1);
    const diskMat = new THREE.ShaderMaterial({
        uniforms: { u_time: { value: 0 }, u_noiseTexture: { value: noiseTexture } },
        vertexShader: `varying vec3 vPos; void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
            varying vec3 vPos;
            uniform float u_time;
            uniform sampler2D u_noiseTexture;
            mat2 rotate2d(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
            void main() {
                float r = length(vPos.xy);
                float twistAngle = 3.0 * log(r) - (min(u_time, 20.0) * 2.0 / (r * 0.5 + 0.1)) - (u_time * 0.2);
                vec2 tc = rotate2d(twistAngle) * vPos.xy;
                float n = texture2D(u_noiseTexture, tc * 0.05 + vec2(u_time * 0.02, u_time * 0.015)).r;
                n += 0.5 * texture2D(u_noiseTexture, tc * 0.12 + vec2(u_time * 0.03)).r;
                n = n * 0.5 + 0.25;
                float arms = smoothstep(0.3, 0.7, n);
                float rp = (r - 4.5) / 50.5;
                vec3 col = mix(vec3(1.0, 0.5, 0.05), vec3(0.6, 0.05, 0.0), pow(rp, 0.5));
                col = mix(col, vec3(1.0, 0.95, 0.8), smoothstep(0.1, 0.0, rp));
                col *= (0.9 + 0.1 * sin(r * 2.0 + n * 2.0)) * (arms * 1.5 + 0.2);
                float alpha = smoothstep(4.2, 5.0, r) * smoothstep(55.0, 35.0, r) * smoothstep(0.1, 0.6, n);
                gl_FragColor = vec4(col, alpha);
            }
        `,
        transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
    });
    accretionDisk = new THREE.Mesh(diskGeo, diskMat);
    accretionDisk.rotation.x = -Math.PI / 2;
    scene.add(accretionDisk);

    // INIT SCROLL MANAGER
    initScroll({
        camera: camera,
        THREE: THREE,
        sectionCoords: sectionCoords
    });

    setupProjectCards();

    // Bouton Splash
    const splashBtn = document.getElementById('splash-btn');
    if (splashBtn) splashBtn.addEventListener('click', startIntroSequence);

    animate();
}

// --- INTRO SEQUENCE ---
function startIntroSequence() {
    const btn = document.getElementById('splash-btn');
    const subQuote = document.querySelector('.splash-quote-sub');
    const mainQuote = document.querySelector('.splash-quote-main');
    const header = document.querySelector('.splash-header-wrapper');
    const splashScreen = document.getElementById('splash-screen');

    if (btn) btn.classList.add('fade-out-up');
    if (subQuote) setTimeout(() => subQuote.classList.add('fade-out-up'), 200);
    if (mainQuote) setTimeout(() => mainQuote.classList.add('fade-out-up'), 400);
    if (header) setTimeout(() => header.classList.add('fade-out-up'), 600);
    setTimeout(() => { if (splashScreen) splashScreen.classList.add('iris-out'); }, 800);

    setTimeout(() => {
        setIsTransitioning(true);

        const pos1 = new THREE.Vector3(0, 6, 1);
        const pos2 = new THREE.Vector3(0, 120, 1);
        const pos3 = new THREE.Vector3(40, 5, 40);
        const pos4 = new THREE.Vector3(0, 2, 10);
        if (window.innerWidth < 768) pos4.set(0, 2, 14);

        const startTime = performance.now();
        const d1 = 3000, d2 = 3000, d3 = 3000;

        function introLoop(now) {
            const elapsed = now - startTime;

            if (elapsed < d1) {
                const t = elapsed / d1;
                const ease = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
                camera.position.lerpVectors(pos1, pos2, ease);
                camera.lookAt(0, 0, 0);
                requestAnimationFrame(introLoop);
            } else if (elapsed < d1 + d2) {
                const t = (elapsed - d1) / d2;
                const ease = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
                camera.position.lerpVectors(pos2, pos3, ease);
                camera.lookAt(0, 0, 0);
                requestAnimationFrame(introLoop);
            } else if (elapsed < d1 + d2 + d3) {
                const t = (elapsed - d1 - d2) / d3;
                const ease = 1 - Math.pow(1 - t, 3);
                camera.position.lerpVectors(pos3, pos4, ease);
                camera.lookAt(0, 0, 0);
                requestAnimationFrame(introLoop);
            } else {
                setCurrentSection(0);
                targetPosition.copy(pos4);
                camera.position.copy(pos4);

                document.getElementById('canvas-container').classList.add('zoom-out');
                document.getElementById('header').classList.add('visible');
                document.getElementById('scroll-hint').classList.add('visible');

                const activeSec = document.querySelector('.section[data-section="0"]');
                if (activeSec) {
                    activeSec.classList.add('active');
                    activeSec.style.opacity = '1';
                    activeSec.style.visibility = 'visible';
                }

                if (splashScreen) splashScreen.style.display = 'none';
                setIsTransitioning(false);
            }
        }
        requestAnimationFrame(introLoop);
    }, 3000);
}

// --- ANIMATE ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (accretionDisk) accretionDisk.material.uniforms.u_time.value = time;
    if (glowSphere) glowSphere.material.uniforms.viewVector.value.subVectors(camera.position, glowSphere.position);

    decayResistanceY();

    if (currentSection !== -1 && !isTransitioning) {
        let finalTarget = targetPosition.clone();
        finalTarget.y -= getResistanceY() * 0.05;

        camera.position.lerp(finalTarget, 0.04);
        camera.lookAt(0, 0, 0);

        if (isMovingToSection) {
            const dist = camera.position.distanceTo(targetPosition);
            if (dist < 2.0) {
                setIsMovingToSection(false);
                const activeSec = document.querySelector(`.section[data-section="${currentSection}"]`);
                if (activeSec) {
                    activeSec.classList.add('active');
                    activeSec.style.opacity = '1';
                    activeSec.style.visibility = 'visible';
                }
            }
        }
    }

    camera.fov = THREE.MathUtils.lerp(camera.fov, 60, 0.04);
    camera.updateProjectionMatrix();

    // Visibilité du trou noir selon section
    const isReadingBook = (currentSection === 1 && !isTransitioning && !isMovingToSection);
    blackHole.visible = !isReadingBook;
    accretionDisk.visible = !isReadingBook;
    glowSphere.visible = !isReadingBook;
    stars.visible = !isReadingBook;
    bgMesh.visible = !isReadingBook;

    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

// --- WORD SWITCH ---
function initWordSwitch() {
    const ws = document.getElementById('wordSwitch');
    if (!ws) return;
    const w = ws.querySelectorAll('.word');
    let ai = 0;

    w.forEach(wd => {
        const txt = wd.textContent;
        const isC = wd.classList.contains('word-code');
        wd.innerHTML = txt.split('').map((c, k) =>
            `<span class="letter ${isC ? (['<','>'].includes(c) ? 'letter-bracket' : 'letter-text') : ''}" style="transition-delay:${k*25}ms">${c === ' ' ? '&nbsp;' : c}</span>`
        ).join('');
    });

    function sw() {
        const ni = (ai + 1) % w.length;
        const cw = w[ai], nw = w[ni];
        cw.querySelectorAll('.letter').forEach(l => l.classList.add('out'));
        nw.querySelectorAll('.letter').forEach(l => l.classList.add('in'));
        setTimeout(() => {
            cw.classList.remove('word-active');
            cw.classList.add('word-next');
            nw.classList.remove('word-next');
            nw.classList.add('word-active');
            cw.querySelectorAll('.letter').forEach(l => l.classList.remove('out'));
            nw.querySelectorAll('.letter').forEach(l => l.classList.remove('in'));
            ai = ni;
        }, cw.textContent.length * 25 + 400);
    }

    setTimeout(() => { sw(); setInterval(sw, 4000); }, 2000);
}

// --- LANCEMENT ---
init();
initWordSwitch();