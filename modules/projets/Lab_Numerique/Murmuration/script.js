const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggle-btn');

let isSphere = false;
let transitionProgress = 0;
let targetMode = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);

camera.position.set(0, 0, 50);

const controls = {
    spherical: { radius: 50, theta: 0, phi: Math.PI / 2 },
    target: new THREE.Vector3(0, 0, 0),
    isDragging: false,
    lastX: 0,
    lastY: 0
};

const updateCameraPosition = () => {
    const { radius, theta, phi } = controls.spherical;
    camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
    camera.position.y = radius * Math.cos(phi);
    camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(controls.target);
};

renderer.domElement.addEventListener('mousedown', (e) => {
    controls.isDragging = true;
    controls.lastX = e.clientX;
    controls.lastY = e.clientY;
});

renderer.domElement.addEventListener('mousemove', (e) => {
    if (!controls.isDragging) return;
    controls.spherical.theta -= (e.clientX - controls.lastX) * 0.01;
    controls.spherical.phi -= (e.clientY - controls.lastY) * 0.01;
    controls.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, controls.spherical.phi));
    controls.lastX = e.clientX;
    controls.lastY = e.clientY;
});

renderer.domElement.addEventListener('mouseup', () => { controls.isDragging = false; });

renderer.domElement.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = controls.spherical.radius < 20 ? 0.05 / 3 : 0.05;
    controls.spherical.radius += e.deltaY * zoomSpeed;
    controls.spherical.radius = Math.max(3, Math.min(150, controls.spherical.radius));
}, { passive: false });

const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        opacity: { value: 0.6 },
        transitionProgress: { value: 0 }
    },
    vertexShader: `
        uniform float time;
        uniform float transitionProgress;
        attribute float size;
        attribute vec3 customColor;
        attribute float birdId;
        attribute float flockPhase;
        attribute vec3 initialOffset;
        attribute vec3 spherePosition;
        varying vec3 vColor;

        vec3 flockCenter(float t, float phase) {
            return vec3(
                sin(t * 0.3 + phase) * 2.0,
                cos(t * 0.2 + phase * 1.3) * 1.5,
                sin(t * 0.25 + phase * 0.8) * 2.5
            );
        }

        float smoothTransition(float t) {
            return t * t * (3.0 - 2.0 * t);
        }

        vec3 calculateMurmuPosition(float currentTime) {
            float t = currentTime + birdId * 0.1;
            float localTime = t + flockPhase * 6.28;

            vec3 center = flockCenter(localTime, flockPhase);
            vec3 offset = initialOffset * 0.3;

            float swirl = sin(localTime * 2.0 + birdId * 3.14) * 0.8;
            float spiral = cos(localTime * 1.5 + birdId * 2.0) * 0.6;

            float wave1 = sin(initialOffset.x * 2.0 + localTime * 3.0) * 0.4;
            float wave2 = cos(initialOffset.z * 1.5 + localTime * 2.5) * 0.3;
            float wave3 = sin((initialOffset.x + initialOffset.z) * 1.2 + localTime * 4.0) * 0.2;

            float neighborInfluence = sin(birdId * 10.0 + localTime * 2.0) * 0.3;

            vec3 murmuPos;
            murmuPos.x = center.x + offset.x + swirl + wave1 + neighborInfluence;
            murmuPos.y = center.y + offset.y + spiral + wave2;
            murmuPos.z = center.z + offset.z + wave3;

            float radius = length(murmuPos.xz);
            float angle = atan(murmuPos.z, murmuPos.x);
            float newAngle = angle + sin(localTime * 0.8) * 0.5;
            float newRadius = radius + cos(localTime * 1.2 + birdId) * 0.2;

            murmuPos.x = cos(newAngle) * newRadius;
            murmuPos.z = sin(newAngle) * newRadius;

            float breathe = sin(localTime * 0.6) * 0.2 + 1.0;
            murmuPos *= breathe * 1.5;

            return murmuPos;
        }

        void main() {
            vColor = customColor;

            vec3 murmuPos = calculateMurmuPosition(time);

            vec3 spherePos = spherePosition * 3.0;
            float breathe = sin(time * 0.5) * 0.05 + 1.0;
            spherePos *= breathe;
            float wave = sin(time * 2.0 + birdId * 6.28) * 0.025;
            spherePos *= (1.0 + wave);
            float orbit = sin(time * 0.3 + birdId * 3.14) * 0.1;
            spherePos.x += orbit * cos(time * 0.4);
            spherePos.z += orbit * sin(time * 0.4);
            float rotationSpeed = time * 0.2;
            float cosRot = cos(rotationSpeed);
            float sinRot = sin(rotationSpeed);
            float newX = spherePos.x * cosRot - spherePos.z * sinRot;
            float newZ = spherePos.x * sinRot + spherePos.z * cosRot;
            spherePos.x = newX;
            spherePos.z = newZ;

            float progress = smoothTransition(transitionProgress);
            vec3 finalPos = mix(murmuPos, spherePos, progress);

            vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
            gl_PointSize = size * (120.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;

        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - smoothstep(0.3, 0.5, dist)) * opacity;
            alpha *= (1.0 - dist * 0.3);
            gl_FragColor = vec4(vColor, alpha);
        }
    `,
    transparent: true,
    depthWrite: false
});

const count = 25000;
const positions      = new Float32Array(count * 3);
const initialOffsets = new Float32Array(count * 3);
const colors         = new Float32Array(count * 3);
const sizes          = new Float32Array(count);
const birdIds        = new Float32Array(count);
const flockPhases    = new Float32Array(count);
const spherePositions = new Float32Array(count * 3);

const flockCount = 8;
const particlesPerFlock = Math.floor(count / flockCount);

for (let i = 0; i < count; i++) {
    const flockIndex = Math.floor(i / particlesPerFlock);
    const flockPhase = (flockIndex / flockCount) * Math.PI * 2;
    const localIndex = i % particlesPerFlock;
    const t = localIndex / particlesPerFlock;

    const angle  = t * Math.PI * 12 + Math.random() * 0.5;
    const radius = Math.pow(Math.random(), 0.3) * 2;
    const height = (Math.random() - 0.5) * 1.5;

    initialOffsets[i * 3]     = Math.cos(angle) * radius;
    initialOffsets[i * 3 + 1] = height;
    initialOffsets[i * 3 + 2] = Math.sin(angle) * radius;

    positions[i * 3] = positions[i * 3 + 1] = positions[i * 3 + 2] = 0;

    const baseShade = 0.92 + Math.random() * 0.08;
    const variation = Math.random() > 0.8 ? -0.05 : 0;
    colors[i * 3]     = baseShade + variation;
    colors[i * 3 + 1] = baseShade + variation * 0.5;
    colors[i * 3 + 2] = baseShade + variation * 0.2;

    sizes[i]      = 0.1 + Math.random() * 0.08;
    birdIds[i]    = Math.random();
    flockPhases[i] = flockPhase + (Math.random() - 0.5) * 0.3;

    const phi   = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    spherePositions[i * 3]     = Math.cos(theta) * Math.sin(phi);
    spherePositions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi);
    spherePositions[i * 3 + 2] = Math.cos(phi);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',       new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('initialOffset',  new THREE.BufferAttribute(initialOffsets, 3));
geometry.setAttribute('customColor',    new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size',           new THREE.BufferAttribute(sizes, 1));
geometry.setAttribute('birdId',         new THREE.BufferAttribute(birdIds, 1));
geometry.setAttribute('flockPhase',     new THREE.BufferAttribute(flockPhases, 1));
geometry.setAttribute('spherePosition', new THREE.BufferAttribute(spherePositions, 3));

scene.add(new THREE.Points(geometry, particleMaterial));

const clock = new THREE.Clock();
const transitionSpeed = 0.003;

(function animate() {
    requestAnimationFrame(animate);
    particleMaterial.uniforms.time.value = clock.getElapsedTime() * 0.3;

    if (transitionProgress < targetMode) {
        transitionProgress = Math.min(1, transitionProgress + transitionSpeed);
    } else if (transitionProgress > targetMode) {
        transitionProgress = Math.max(0, transitionProgress - transitionSpeed);
    }
    particleMaterial.uniforms.transitionProgress.value = transitionProgress;

    updateCameraPosition();
    renderer.render(scene, camera);
})();

toggleBtn.addEventListener('click', () => {
    isSphere = !isSphere;
    targetMode = isSphere ? 1 : 0;
    toggleBtn.textContent = isSphere ? '🐦 Murmuration' : '⚫ Sphère';
    toggleBtn.style.backgroundColor = isSphere ? '#2d3748' : '#4a5568';
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

updateCameraPosition();
