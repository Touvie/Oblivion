// === STATE ===
let isBigBangActive = false;
let isPaused        = false;
let animationSpeed  = 1;
let currentProgress = 0;
let isLooping       = false;
let bigBangProgress = 0;
let bigBangPhase    = 0; // 0=contraction 1=explosion 2=retour

// === UI REFS ===
const btnStart      = document.getElementById('btn-start');
const btnPause      = document.getElementById('btn-pause');
const btnReset      = document.getElementById('btn-reset');
const speedLabel    = document.getElementById('speed-label');
const speedRange    = document.getElementById('speed-range');
const progressLabel = document.getElementById('progress-label');
const progressRange = document.getElementById('progress-range');
const phaseBox      = document.getElementById('phase-box');
const loopBox       = document.getElementById('loop-box');
const statusBox     = document.getElementById('status-box');
const loopCheck     = document.getElementById('loop-check');

const activeEls = [btnPause, btnReset, speedLabel, speedRange, progressLabel, progressRange, phaseBox, loopBox, statusBox];

function updateUI() {
    btnStart.disabled = isBigBangActive && !isPaused;
    activeEls.forEach(el => el.classList.toggle('hidden', !isBigBangActive));

    if (isBigBangActive) {
        btnPause.textContent = isPaused ? '▶️ Reprendre' : '⏸️ Pause';
        btnPause.classList.toggle('paused', isPaused);
        speedLabel.textContent    = `Vitesse: ${animationSpeed.toFixed(1)}x`;
        progressLabel.textContent = `Progression: ${(currentProgress * 100).toFixed(1)}%`;
        progressRange.value       = currentProgress;
        const phases = ['🌑 Contraction', '💥 Explosion', '🌌 Retour'];
        phaseBox.textContent      = phases[bigBangPhase] || phases[0];
        statusBox.textContent     = isPaused ? 'État: EN PAUSE ⏸️' : 'État: EN LECTURE ▶️';
        statusBox.style.color     = isPaused ? '#5f5' : '#ff5';
    }
}

// === THREE.JS SETUP ===
const container = document.getElementById('container');
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer  = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0a0a0a, 1);
container.appendChild(renderer.domElement);

camera.position.z = 8;

// === CAMERA CONTROLS ===
let isDragging  = false;
let prevMouse   = { x: 0, y: 0 };
let camRotation = { x: 0, y: 0 };
let camDistance = 8;

container.addEventListener('mousedown', (e) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    camRotation.y += (e.clientX - prevMouse.x) * 0.005;
    camRotation.x += (e.clientY - prevMouse.y) * 0.005;
    camRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camRotation.x));
    prevMouse = { x: e.clientX, y: e.clientY };
});
container.addEventListener('mouseup',    () => { isDragging = false; });
container.addEventListener('mouseleave', () => { isDragging = false; });
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    camDistance += e.deltaY * 0.01;
    camDistance = Math.max(3, Math.min(20, camDistance));
}, { passive: false });

// === GEOMETRY ===
const count = 37500;
const spherePos = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.5;
    spherePos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    spherePos[i * 3 + 1] = r * Math.cos(phi);
    spherePos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
}

const colors = new Float32Array(count * 3).fill(1.0);
const sizes  = new Float32Array(count).fill(0.2);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',       new THREE.BufferAttribute(spherePos.slice(), 3));
geometry.setAttribute('targetPosition', new THREE.BufferAttribute(spherePos.slice(), 3));
geometry.setAttribute('customColor',    new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size',           new THREE.BufferAttribute(sizes, 1));

const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        morphProgress: { value: 1 },
        bigBangFactor: { value: 0 }
    },
    vertexShader: `
        uniform float morphProgress;
        uniform float bigBangFactor;
        attribute float size;
        attribute vec3 customColor;
        attribute vec3 targetPosition;
        varying vec3 vColor;
        varying float vIntensity;

        float random(vec3 pos) {
            return fract(sin(dot(pos, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        }

        void main() {
            vColor = customColor;
            vec3 pos = mix(position, targetPosition, morphProgress);
            float distanceFromCenter = length(pos);
            float randomFactor = random(pos);
            vIntensity = 0.0;

            if (bigBangFactor > 0.0) {
                vec3 direction = normalize(pos);

                if (bigBangFactor < 0.3) {
                    float contractionProgress = bigBangFactor / 0.3;
                    float contractionFactor = 1.0 - contractionProgress * 0.9;
                    float pulse = sin(contractionProgress * 20.0) * 0.02 * contractionProgress;
                    contractionFactor += pulse;
                    float rotationAngle = contractionProgress * 3.14159 * 2.0;
                    float cosA = cos(rotationAngle);
                    float sinA = sin(rotationAngle);
                    vec3 rotated = vec3(
                        pos.x * cosA - pos.z * sinA,
                        pos.y,
                        pos.x * sinA + pos.z * cosA
                    );
                    pos = rotated * contractionFactor;
                    vIntensity = contractionProgress;
                } else {
                    float explosionProgress = (bigBangFactor - 0.3) / 0.7;
                    float velocityFactor = 0.5 + randomFactor * 1.5;
                    float decelerationFactor = 1.0 - explosionProgress * 0.3;
                    float explosionFactor = 1.0 + explosionProgress * velocityFactor * 8.0 * decelerationFactor;
                    pos = pos * explosionFactor;
                    float clumping = sin(randomFactor * 100.0) * 0.3 * explosionProgress;
                    pos += direction * clumping;
                    float shockWave = abs(distanceFromCenter * explosionFactor - 3.0);
                    vIntensity = shockWave < 0.3 ? 1.0 - (shockWave / 0.3) : explosionProgress * 0.5;
                }
            }

            pos *= 2.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float sizeMultiplier = 1.0 + vIntensity * 2.0;
            gl_PointSize = size * sizeMultiplier * (100.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        varying vec3 vColor;
        varying float vIntensity;

        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - smoothstep(0.4, 0.5, dist)) * 0.8;
            alpha += vIntensity * 0.5 * (1.0 - smoothstep(0.3, 0.5, dist));
            vec3 finalColor = vColor + vec3(vIntensity * 0.3);
            gl_FragColor = vec4(finalColor, alpha);
        }
    `,
    transparent: true,
    depthWrite: false
});

scene.add(new THREE.Points(geometry, particleMaterial));

// === ANIMATION LOOP ===
(function animate() {
    requestAnimationFrame(animate);

    camera.position.x = camDistance * Math.sin(camRotation.y) * Math.cos(camRotation.x);
    camera.position.y = camDistance * Math.sin(camRotation.x);
    camera.position.z = camDistance * Math.cos(camRotation.y) * Math.cos(camRotation.x);
    camera.lookAt(0, 0, 0);

    if (isBigBangActive && !isPaused) {
        if (bigBangPhase === 0) {
            bigBangProgress += 0.003 * animationSpeed;
            if (bigBangProgress >= 0.3) bigBangPhase = 1;
        } else if (bigBangPhase === 1) {
            bigBangProgress += 0.002 * animationSpeed;
            if (bigBangProgress >= 1.0) {
                if (isLooping) {
                    bigBangPhase = 2;
                } else {
                    bigBangProgress = 1.0;
                    isPaused = true;
                    updateUI();
                }
            }
        } else if (bigBangPhase === 2) {
            bigBangProgress -= 0.002 * animationSpeed;
            if (bigBangProgress <= 0.0) {
                bigBangProgress = 0.0;
                bigBangPhase = 0;
            }
        }
        currentProgress = bigBangProgress;
        updateUI();
    }

    particleMaterial.uniforms.bigBangFactor.value = isBigBangActive ? bigBangProgress : 0;
    renderer.render(scene, camera);
})();

// === CONTROLS ===
btnStart.addEventListener('click', () => {
    isBigBangActive = true;
    isPaused        = false;
    bigBangProgress = 0;
    bigBangPhase    = 0;
    currentProgress = 0;
    updateUI();
});

btnPause.addEventListener('click', () => {
    isPaused = !isPaused;
    updateUI();
});

btnReset.addEventListener('click', () => {
    bigBangProgress = 0;
    bigBangPhase    = 0;
    currentProgress = 0;
    isBigBangActive = false;
    isPaused        = false;
    updateUI();
});

speedRange.addEventListener('input', () => {
    animationSpeed = parseFloat(speedRange.value);
    speedLabel.textContent = `Vitesse: ${animationSpeed.toFixed(1)}x`;
});

progressRange.addEventListener('input', () => {
    const val       = parseFloat(progressRange.value);
    bigBangProgress = val;
    currentProgress = val;
    bigBangPhase    = val < 0.3 ? 0 : 1;
    if (!isBigBangActive) {
        isBigBangActive = true;
        isPaused        = true;
    }
    updateUI();
});

loopCheck.addEventListener('change', () => {
    isLooping = loopCheck.checked;
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
