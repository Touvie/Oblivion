import * as THREE from 'three';
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
} from './js/ScrollManager.js';

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
    sphereSegments: gpuTier === 'low' ? 32 : 64
};

// --- LOADING ---
let isLoaded = false;
let loaderProgress = 0;
let loaderInterval = null;
let textureReady = false;
let minTimeReady = false;

function updateLoader(pct) {
    const fill = document.getElementById('splash-loader-fill');
    const pctEl = document.getElementById('splash-loader-percent');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + ' %';
}

function startLoaderSimulation() {
    loaderInterval = setInterval(() => {
        if (loaderProgress < 90) {
            loaderProgress += (90 - loaderProgress) * 0.04 + 0.2;
            updateLoader(Math.min(Math.round(loaderProgress), 90));
        }
    }, 80);
    setTimeout(() => { minTimeReady = true; tryActivate(); }, 3000);
}

function tryActivate() {
    if (textureReady && minTimeReady) activateButton();
}

function onTextureLoad() {
    textureReady = true;
    tryActivate();
}

function activateButton() {
    if (isLoaded) return;
    clearInterval(loaderInterval);
    updateLoader(100);
    isLoaded = true;
    setTimeout(() => {
        const loader = document.getElementById('splash-loader');
        const btn = document.getElementById('splash-btn');
        if (loader) loader.classList.add('fade-out');
        if (btn) btn.classList.remove('loading');
    }, 500);
}

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
    startLoaderSimulation();
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
        uniforms: { u_texture: { value: textureLoader.load(milkyWayUrl, onTextureLoad) } },
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

    // Bouton Splash
    const splashBtn = document.getElementById('splash-btn');
    if (splashBtn) splashBtn.addEventListener('click', () => { if (isLoaded) startIntroSequence(); });

    // Sécurité : activer le bouton après 25s même si la texture ne charge pas
    setTimeout(() => { textureReady = true; tryActivate(); }, 25000);

    // CHEAT CODE : Touche "P" pour passer l'intro
    window.addEventListener('keydown', (e) => {
        if ((e.key === 'p' || e.key === 'P') && !document.getElementById('header').classList.contains('visible')) {
            skipIntroSequence();
        }
    });

    animate();
}

function skipIntroSequence() {
    const splashScreen = document.getElementById('splash-screen');
    const header = document.querySelector('.splash-header-wrapper');
    if (splashScreen) splashScreen.style.display = 'none';
    if (header) header.style.display = 'none';

    const isMobile = window.innerWidth < 768;
    const targetPos = new THREE.Vector3(0, 2, isMobile ? 18 : 10);

    camera.position.copy(targetPos);
    camera.lookAt(0, 0, 0);
    targetPosition.copy(targetPos);

    document.getElementById('canvas-container').classList.add('zoom-out');
    document.getElementById('header').classList.add('visible');
    document.getElementById('scroll-hint').classList.add('visible');

    setCurrentSection(0);
    setIsTransitioning(false);
    setIsMovingToSection(false);

    const activeSec = document.querySelector('.section[data-section="0"]');
    if (activeSec) {
        activeSec.classList.add('active');
        activeSec.style.opacity = '1';
        activeSec.style.visibility = 'visible';
    }
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

        const isMobile = window.innerWidth < 768;

        const pos1 = new THREE.Vector3(0, 6, 1);
        const pos2 = new THREE.Vector3(0, 120, 15);
        const pos3 = new THREE.Vector3(30, 5, 20);
        const pos4 = new THREE.Vector3(0, 2, isMobile ? 18 : 10);

        const cameraPath = new THREE.CatmullRomCurve3([pos1, pos2, pos3, pos4], false, 'centripetal');

        const startTime = performance.now();
        const totalDuration = 10000;

        function introLoop(now) {
            let t = Math.max(0, Math.min(1, (now - startTime) / totalDuration));

            if (t < 1) {
                const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                const currentPos = cameraPath.getPointAt(easeT);
                camera.position.copy(currentPos);

                const tilt = Math.sin(t * Math.PI) * 0.25;
                camera.up.set(Math.sin(tilt), Math.cos(tilt), 0).normalize();

                camera.lookAt(0, 0, 0);
                requestAnimationFrame(introLoop);
            } else {
                setCurrentSection(0);
                targetPosition.copy(pos4);
                camera.position.copy(pos4);
                camera.up.set(0, 1, 0);
                camera.lookAt(0, 0, 0);

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
    }, 2000);
}

let targetPortfolioOffsetX = 0;
let currentPortfolioOffsetX = 0;

window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'syncBlackHole') {
        targetPortfolioOffsetX = event.data.offsetX;
    }
});

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

    currentPortfolioOffsetX = THREE.MathUtils.lerp(currentPortfolioOffsetX, targetPortfolioOffsetX, 0.08);

    if (currentSection === 3) {
        camera.setViewOffset(
            window.innerWidth, window.innerHeight,
            -currentPortfolioOffsetX, 0,
            window.innerWidth, window.innerHeight
        );
    } else {
        targetPortfolioOffsetX = 0;
        currentPortfolioOffsetX = 0;
        camera.clearViewOffset();
    }

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
