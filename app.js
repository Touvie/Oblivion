import * as THREE from 'three';

// --- DATA PROJETS (Extrait des PDF) ---
        const projectsData = {
            "portfolio": {
                title: "Portfolio Interactif",
                tags: ["Three.js", "WebGL", "Storytelling"],
                content: `
                    <h3>Un récit en trois dimensions</h3>
                    <p>Ce portfolio n'est pas qu'une simple vitrine : c'est une exploration technique et narrative. L'objectif était de transformer une navigation web classique en une expérience immersive.</p>
                    <p>Au lieu de lister mes compétences, j'ai voulu les démontrer : la gestion de la 3D avec Three.js, l'optimisation des shaders pour l'animation du trou noir, et une structure narrative inspirée des schémas littéraires.</p>
                    <h3>Défis techniques</h3>
                    <p>Le plus grand défi a été d'équilibrer la performance et l'esthétique. Le système de particules et les effets de post-traitement (bloom) sont gourmands, il a fallu optimiser le code pour qu'il tourne correctement même sur des machines modestes.</p>
                `,
                link: null, // Déjà dessus
                linkLabel: "Vous y êtes déjà !"
            },
            "hermes": {
                title: "Éditions Hermès",
                tags: ["HTML", "CSS", "Identité Visuelle"],
                content: `
                    <h3>Présentation</h3>
                    <p>Ce projet de groupe consistait à imaginer une maison d'édition de A à Z : son identité, sa collection et le premier titre de celle-ci. De mon côté, j'ai élaboré un plan de diffusion et de distribution cohérent, puis j'ai conçu et géré le site web des Éditions Hermès, afin d'offrir une vitrine numérique fidèle à l'esprit de la maison.</p>
                    
                    <h3>Volonté Artistique</h3>
                    <p>Le site des Éditions Hermès adopte volontairement une esthétique très sobre. J'ai choisi une interface simple, presque dépouillée, en écho direct à la charte graphique minimaliste que nous avions définie. C'était une manière de montrer ma capacité à m'adapter à un univers visuel précis, sans le surcharger.</p>
                    <p>Je me suis toutefois autorisé un <em>easter egg</em> discret, comme une petite trace personnelle glissée derrière la façade, preuve que la rigueur peut cohabiter avec un clin d'œil subtil.</p>
                    
                    <h3>Conclusion</h3>
                    <p>Imaginer le site d'une maison d'édition fictive m'a donné envie de travailler, un jour, pour une maison bien réelle. En intégrant sa charte graphique au mieux, j'ai réellement pris plaisir à construire un espace lisible, cohérent et accueillant.</p>
                    <p>Cette deuxième expérience de création de site web renforce mon envie d'aller plus loin dans les principes d'UI et d'UX design, pour affiner mes choix, comprendre davantage les usages et améliorer encore mes futures créations.</p>
                `,
                link: "https://touvie.github.io/Hermes/",
                linkLabel: "Visiter le site"
            },
            "escale": {
                title: "Stop Motion - Pas prévu",
                tags: ["Stop Motion", "Origami", "Montage"],
                content: `
                    <h3>Présentation générale</h3>
                    <p>Dans le cadre d'un partenariat avec le salon littéraire <em>Les Escales du Livre</em>, situé à Bordeaux au cœur de l'écosystème Darwin, deux camarades et moi avons imaginé puis réalisé une vidéo de promotion autour de l'album <em>Pas prévu</em> d'Élo, publié à L'École des loisirs.</p>
                    <p>La cible étant de très jeunes enfants autour de quatre ans, nous avons choisi le <strong>stop motion</strong> et des personnages façonnés en <strong>origami</strong>, afin de rester proches de cet univers de simplicité, de jeu et de petites mains encore hésitantes.</p>
                    
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/zUz145uZZLE" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    </div>

                    <h3>Ce que j'ai appris</h3>
                    <p>C'était la première fois que je me confrontais à l'écriture d'un script pensé pour un tournage. Écrire en anticipant la mise en scène, puis confronter ces idées au réel du plateau, révèle très vite des contraintes que l'on n'imagine pas au début. Cette découverte progressive, presque empirique, m'a beaucoup plu.</p>
                    <p>J'ai également appris à manipuler un logiciel de montage (CapCut sur ordinateur) et à comprendre comment une vidéo prend forme, image après image.</p>
                    
                    <h3>Conclusion</h3>
                    <p>Cette première immersion dans le domaine du multimédia, que je ne connaissais alors qu'en surface, m'a offert un point d'ancrage clair : je veux poursuivre dans cette voie. Elle confirme mon désir de me tourner vers les Métiers du Multimédia et de l'Internet, où l'image, l'histoire et l'expérimentation se rencontrent.</p>
                `,
                link: "#",
                linkLabel: "Voir la vidéo sur YouTube"
            },
            "frise": {
                title: "Frise Chronologique",
                tags: ["Figma", "UX/UI", "Prototypage"],
                content: `
                    <h3>Présentation</h3>
                    <p>Dans le cadre d'un projet réunissant la musique, la littérature et l'histoire de l'art, deux camarades et moi avons été chargés de concevoir une frise chronologique complète, sur le support de notre choix. Elle devait rassembler des dates essentielles pour chacune des trois disciplines. Nous avons choisi de la réaliser sur <strong>Figma</strong>, afin d'exploiter ses possibilités de mise en page et d'interactivité.</p>
                    
                    <h3>La frise</h3>
                    <p>Nous avons imaginé la frise comme un ensemble de trois lignes temporelles parallèles, chacune consacrée à une matière. Le prototypage entièrement réalisé sur Figma nous a permis de créer une interface claire, où l'on peut cliquer sur des boutons pour faire apparaître les périodes, les mouvements et les événements. La frise n'est donc pas une simple image statique : elle fonctionne comme une petite interface interactive.</p>
                    
                    <h3>Conclusion</h3>
                    <p>C'est avec ce projet que j'ai vraiment pris en main Figma. J'ai découvert comment construire un prototype interactif, en reliant des pages, en définissant des transitions et en rendant la navigation fluide. Cette approche m'a donné une première idée concrète de ce que peut être une interface pensée pour l'utilisateur.</p>
                `,
                // Modification ici pour supporter plusieurs boutons
                buttons: [
                    { label: "Voir le Prototype", url: "https://www.figma.com/proto/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=122-430&t=k7SPQ3ya9DfJXzZ8-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=129%3A1547" }, // Remplace par le lien proto
                    { label: "Voir les Maquettes (Design)", url: "https://www.figma.com/design/QujD1wpP5gShSFdK1rJn37/Frise-chronoogique?node-id=0-1&t=k7SPQ3ya9DfJXzZ8-1" }
                ]
            },
            "traiteur": {
                title: "Site Traiteur",
                tags: ["HTML", "CSS", "WIP"],
                content: `
                    <div style="display:flex; justify-content:center; align-items:center; height:100%; min-height:200px;">
                        <h3 style="color: var(--accent); font-family: 'Space Mono'; text-transform: uppercase;">🚧 Fonctionnalité en cours de développement</h3>
                    </div>
                `,
                link: null,
                linkLabel: null
            },
            "italie": {
                title: "Projet Italie",
                tags: ["Premier Site", "HTML", "Découverte"],
                content: `
                    <h3>Le point de départ</h3>
                    <p>Il y a un an, j'ai créé mon premier site web lors d'un cours d'informatique. Le sujet : l'Italie. Trois sections en cards – Nourriture, Monuments, Villes – structurées en HTML et stylisées en CSS. Les bases les plus basiques de la basitude.</p>
                    <h3>Une révélation</h3>
                    <p>Mais j'ai aimé le faire. Pas seulement le résultat, dont l'UI est sommaire, mais le processus lui-même : structurer l'information, choisir les couleurs, voir mes modifications s'afficher en direct. J'y ai passé plus de temps que les autres. Pas par obligation, mais parce que quelque chose dans cette façon de créer me plaisait vraiment.</p>
                `,
                link: "https://touvie.github.io/Italie",
                linkLabel: "Visiter le site"
            }
        };

        // GESTION MODAL
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
            
            // Tags
            modalTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'overlay-tag';
                span.innerText = tag;
                modalTags.appendChild(span);
            });

            // Footer Button(s)
            modalFooter.innerHTML = '';
            
            if (data.buttons) {
                // Cas avec plusieurs boutons (comme la Frise)
                data.buttons.forEach(btnData => {
                    const btn = document.createElement('a');
                    btn.className = 'overlay-btn';
                    btn.href = btnData.url;
                    btn.target = "_blank";
                    btn.innerText = `[ ${btnData.label} ]`;
                    modalFooter.appendChild(btn);
                });
            } else if (data.link && data.link !== "#") {
                // Cas classique (un seul lien)
                const btn = document.createElement('a');
                btn.className = 'overlay-btn';
                btn.href = data.link;
                btn.target = "_blank";
                btn.innerText = `[ ${data.linkLabel} ]`;
                modalFooter.appendChild(btn);
            } else if (data.linkLabel) {
                // Cas sans lien actif
                const span = document.createElement('span');
                span.style.fontFamily = "'Space Mono'";
                span.style.fontSize = "10px";
                span.style.color = "rgba(255,255,255,0.5)";
                span.innerText = data.linkLabel;
                modalFooter.appendChild(span);
            }

            modal.classList.add('visible');
        }

        closeModal.addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        // Fermer en cliquant en dehors
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });

        // Initialisation des écouteurs sur les cartes
       function setupProjectCards() {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // On empêche le comportement par défaut (au cas où)
                    e.preventDefault(); 
                    
                    const pid = card.dataset.project;
                    
                    // Si c'est Portfolio -> On va au Making Of (Section 2)
                    if (pid === 'portfolio') {
                        goToSection(2);
                        return; 
                    }

                    // Pour tous les autres -> On ouvre l'overlay
                    if(pid) openModal(pid);
                });
            });
        }
        
        // GPU DETECTION
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
            sphereSegments: gpuTier === 'low' ? 32 : 64,
            aboutSphereRadius: 4.7,
            aboutParticleSize: 0.8
        };
        
        let scene, camera, renderer, bgMesh, stars, blackHole, glowSphere, accretionDisk;
        let aboutPoints; // Nouvelle variable pour la sphère "À propos"
        
        let currentSection = -1; 
        let targetSectionIndex = -1;
        let isTransitioning = false; 
        let isMovingToSection = false;
        
        // --- VARIABLE POUR LE SCROLL ---
        let lastScrollTime = 0; 
        let scrollAccumulator = 0;
        let scrollTimeout;
        const SCROLL_THRESHOLD = 600; 
        let resistanceY = 0; // La valeur qui simule l'élastique
        
        const noiseFunctions = `vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

        // === TEXTURE DE BRUIT PRÉCALCULÉE ===
function generateNoiseTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    
    // Génération de bruit simplifié (Perlin-like)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Bruit multi-octaves simple
            let value = 0;
            value += Math.sin(x * 0.05) * Math.cos(y * 0.05) * 0.5;
            value += Math.sin(x * 0.1 + y * 0.1) * 0.3;
            value += Math.random() * 0.2;
            
            // Normaliser entre 0 et 255
            const normalized = ((value + 1) * 0.5) * 255;
            const i = (y * size + x) * 4;
            imageData.data[i] = normalized;     // R
            imageData.data[i+1] = normalized;   // G
            imageData.data[i+2] = normalized;   // B
            imageData.data[i+3] = 255;          // A
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

        function init() {
            const container = document.getElementById('canvas-container');
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 3000);
            
            // DÉPART SPLASH (Décalé pour éviter le Gimbal Lock)
            camera.position.set(0, 6, 1); 
            camera.lookAt(0,0,0);

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
                fragmentShader: `uniform sampler2D u_texture; varying vec2 vUv; void main() { vec4 texColor = texture2D(u_texture, vUv); texColor.rgb = pow(texColor.rgb, vec3(3.0)); texColor.rgb *= 1.5; gl_FragColor = vec4(texColor.rgb, 1.0); }`
            });
            bgMesh = new THREE.Mesh(bgGeo, bgMat);
            bgMesh.rotation.x = Math.PI * 0.1;
            bgMesh.rotation.z = Math.PI * 0.15;
            scene.add(bgMesh);

            // ETOILES
            const starsCount = 4000; const starsGeo = new THREE.BufferGeometry(); const starsPos = new Float32Array(starsCount * 3);
            for(let i=0; i<starsCount; i++) {
                const r = 500 + Math.random() * 800; const theta = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1);
                starsPos[i*3] = r * Math.sin(phi) * Math.cos(theta); starsPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta); starsPos[i*3+2] = r * Math.cos(phi);
            }
            starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
            stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.8 }));
            scene.add(stars);

            // TROU NOIR
            const BH_RADIUS = 4.0;
            const coreGeo = new THREE.SphereGeometry(BH_RADIUS, CONFIG.sphereSegments, CONFIG.sphereSegments);
            const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            blackHole = new THREE.Mesh(coreGeo, coreMat);
            scene.add(blackHole);

            // GLOW
            const glowGeo = new THREE.SphereGeometry(BH_RADIUS * 1.05, CONFIG.sphereSegments, CONFIG.sphereSegments);
            const glowMat = new THREE.ShaderMaterial({
                uniforms: { glowColor: { value: new THREE.Color(0xffaa33) }, viewVector: { value: new THREE.Vector3() }, power: { value: 3.5 }, intensity: { value: 1.4 } },
                vertexShader: `uniform vec3 viewVector; varying float vIntensity; uniform float power; void main() { vec3 vNormal = normalize(normalMatrix * normal); vec3 vNormel = normalize(normalMatrix * viewVector); vIntensity = pow(0.7 - dot(vNormal, vNormel), power); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                fragmentShader: `uniform vec3 glowColor; uniform float intensity; varying float vIntensity; void main() { vec3 glow = glowColor * vIntensity * intensity; gl_FragColor = vec4(glow, 1.0); }`,
                side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
            });
            glowSphere = new THREE.Mesh(glowGeo, glowMat);
            scene.add(glowSphere);

           // DISQUE ACCRETION (OPTIMISÉ)
const noiseTexture = generateNoiseTexture(256);
const diskSegments = gpuTier === 'low' ? 128 : 192;
const diskGeo = new THREE.RingGeometry(BH_RADIUS * 1.1, 60.0, diskSegments, 1);

const diskMat = new THREE.ShaderMaterial({
    uniforms: { 
        u_time: { value: 0 },
        u_noiseTexture: { value: noiseTexture }
    },
    vertexShader: `
        varying vec3 vPos;
        varying vec2 vUv;
        void main() {
            vPos = position;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPos;
        varying vec2 vUv;
        uniform float u_time;
        uniform sampler2D u_noiseTexture;
        
        mat2 rotate2d(float angle) {
            return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        }
        
        void main() {
            vec3 pos = vPos;
            float r = length(pos.xy);
            
            // Twist basé sur la distance
            float twistAngle = 3.0 * log(r);
            float shearTime = min(u_time, 20.0);
            float shearSpeed = 2.0 / (r * 0.5 + 0.1);
            float shearOffset = shearTime * shearSpeed;
            float globalSpeed = 0.2;
            float globalOffset = u_time * globalSpeed;
            twistAngle -= (shearOffset + globalOffset);
            
            vec2 twistedCoords = rotate2d(twistAngle) * pos.xy;
            
            // LECTURE DE LA TEXTURE au lieu du calcul de bruit
            vec2 noiseUV = twistedCoords * 0.05 + vec2(u_time * 0.02, u_time * 0.015);
            float noiseVal = texture2D(u_noiseTexture, noiseUV).r;
            
            // Ajouter une deuxième lecture pour plus de détail
            vec2 noiseUV2 = twistedCoords * 0.12 + vec2(u_time * 0.03);
            noiseVal += 0.5 * texture2D(u_noiseTexture, noiseUV2).r;
            noiseVal = noiseVal * 0.5 + 0.25;
            
            float arms = smoothstep(0.3, 0.7, noiseVal);
            
            // Couleurs
            vec3 colorCore = vec3(1.0, 0.95, 0.8);
            vec3 colorInner = vec3(1.0, 0.5, 0.05);
            vec3 colorOuter = vec3(0.6, 0.05, 0.0);
            
            float radialPos = (r - 4.5) / (55.0 - 4.5);
            vec3 baseColor = mix(colorInner, colorOuter, pow(radialPos, 0.5));
            baseColor = mix(baseColor, colorCore, smoothstep(0.1, 0.0, radialPos));
            
            float rings = sin(r * 2.0 + noiseVal * 2.0);
            baseColor *= (0.9 + 0.1 * rings);
            
            vec3 finalColor = baseColor * (arms * 1.5 + 0.2);
            
            float alpha = smoothstep(4.2, 5.0, r) * smoothstep(55.0, 35.0, r);
            alpha *= smoothstep(0.1, 0.6, noiseVal);
            
            gl_FragColor = vec4(finalColor, alpha);
        }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

accretionDisk = new THREE.Mesh(diskGeo, diskMat);
accretionDisk.rotation.x = -Math.PI / 2;
scene.add(accretionDisk);

            // --- SCROLL HANDLING AVEC ACCUMULATEUR ---
            window.addEventListener('wheel', (e) => {
                if (currentSection === -1) return; // Ignore on Splash
                
                // Si une transition est déjà en cours, on ignore
                if (isTransitioning || isMovingToSection) return;
                
                // Si l'overlay projet est ouvert, on n'intercepte pas le scroll
                if (document.getElementById('project-overlay').classList.contains('visible')) return;

                const now = Date.now();
                // Cooldown
                if (now - lastScrollTime < 1500) return; // Change le temps de sécurité ici

                clearTimeout(scrollTimeout);
                
                // --- RÉSISTANCE VISUELLE (ELASTIQUE) ---
                // On ajoute le delta à la valeur de résistance (avec un facteur pour la sensibilité)
                // Plus on scroll, plus resistanceY augmente
                resistanceY += e.deltaY * 0.09;

                // On limite la résistance visuelle pour pas que la caméra parte trop loin
                resistanceY = Math.max(Math.min(resistanceY, 150), -150);

                scrollAccumulator += e.deltaY;
                
                // Reset de l'accumulateur si l'utilisateur arrête de scroller
                scrollTimeout = setTimeout(() => {
                    scrollAccumulator = 0;
                }, 200); // Slightly longer reset window

                // Seulement si le seuil est dépassé (SEUIL PLUS HAUT = PLUS DUR À DÉCLENCHER)
                if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

                const totalSections = 5;
                const direction = scrollAccumulator > 0 ? 1 : -1;

                // --- GESTION INTELLIGENTE DU SCROLL TEXTE ---
                
                // Cas 1 : Section "À Propos" (Index 1) - Contient du texte scrollable
                if (currentSection === 1) {
                    const wrapper = document.querySelector('.apropos-wrapper');
                    const isAtBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 50; 
                    const isAtTop = wrapper.scrollTop <= 0;

                    if (direction > 0) { // Scroll vers le bas
                        if (isAtBottom) {
                            goToSection(2); // Go to Making Of
                            lastScrollTime = now;
                            scrollAccumulator = 0;
                            resistanceY = 0; // Reset visuel
                        }
                    } else { // Scroll vers le haut
                        if (isAtTop) {
                            goToSection(0); // Go back to Accueil
                            lastScrollTime = now;
                            scrollAccumulator = 0;
                            resistanceY = 0;
                        }
                    }
                    return;
                }

                // Cas 2 : Section "Making Of" (Index 2) - Contient du texte scrollable
                if (currentSection === 2) {
                    const wrapper = document.querySelector('.makingof-container');
                    const isAtBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 50;
                    const isAtTop = wrapper.scrollTop <= 0;
                    
                    if (direction > 0) { // Scroll vers le bas
                        if (isAtBottom) {
                            goToSection(3); // Go to Projets
                            lastScrollTime = now;
                            scrollAccumulator = 0;
                            resistanceY = 0;
                        }
                    } else { // Scroll vers le haut
                        if (isAtTop) {
                            goToSection(1); // Go back to About
                            lastScrollTime = now;
                            scrollAccumulator = 0;
                            resistanceY = 0;
                        }
                    }
                    return;
                }

                // Cas 3 : Toutes les autres sections
                if (direction > 0) {
                    goToSection((currentSection + 1) % totalSections);
                    lastScrollTime = now;
                    scrollAccumulator = 0;
                    resistanceY = 0;
                } else {
                    goToSection((currentSection - 1 + totalSections) % totalSections);
                    lastScrollTime = now;
                    scrollAccumulator = 0;
                    resistanceY = 0;
                }

            }, { passive: false }); 

            // Prevent spam click
            let splashClicked = false;

            function onSplashClick() {
                if (splashClicked) return;
                splashClicked = true;
                
                // DEZOOM CANVAS
                document.getElementById('canvas-container').classList.add('zoom-out');
                
                startIntroSequence();
            }

            document.getElementById('splash-btn').addEventListener('click', onSplashClick);
            document.getElementById('header-center-btn').addEventListener('click', () => { goToSection(2); });

            // Écouteur Scroll pour la Parallaxe À Propos
            const aboutWrapper = document.querySelector('.apropos-wrapper');
            if(aboutWrapper) {
                aboutWrapper.addEventListener('scroll', () => {
                    const scrollY = aboutWrapper.scrollTop;
                    const docHeight = aboutWrapper.scrollHeight - aboutWrapper.clientHeight;
                    const scrollPercent = scrollY / docHeight;
                    if(aboutPoints) {
                        aboutPoints.position.y = scrollPercent * 2.0; 
                    }
                });
            }

            setupNavigation();
            setupProjectCards(); 
            animate();
        }

        function startIntroSequence() {
            const btn = document.getElementById('splash-btn');
            const subQuote = document.querySelector('.splash-quote-sub');
            const mainQuote = document.querySelector('.splash-quote-main');
            const header = document.querySelector('.splash-header-wrapper');
            const splashScreen = document.getElementById('splash-screen');

            // 1. Fade out button immediately
            if(btn) btn.classList.add('fade-out-up');

            // 2. Cascade fade out for text elements
            if(subQuote) {
                setTimeout(() => { subQuote.classList.add('fade-out-up'); }, 200);
            }
            if(mainQuote) {
                setTimeout(() => { mainQuote.classList.add('fade-out-up'); }, 400);
            }
            if(header) {
                setTimeout(() => { header.classList.add('fade-out-up'); }, 600);
            }
            
            // 3. Déclenchement de l'effet "Iris Out"
            setTimeout(() => {
                if(splashScreen) splashScreen.classList.add('iris-out');
            }, 800);

            // 4. Start Camera Move
            setTimeout(() => {
                isTransitioning = true;
                
                const pos1 = new THREE.Vector3(0, 6, 1);
                const pos2 = new THREE.Vector3(0, 120, 1); 
                const pos3 = new THREE.Vector3(40, 5, 40);
                const pos4 = new THREE.Vector3(0, 2, 10);
                if(window.innerWidth < 768) pos4.set(0, 2, 14);

                const startTime = performance.now();
                const d1 = 3000;
                const d2 = 3000;
                const d3 = 3000;

                function introLoop(now) {
                    const elapsed = now - startTime;
                    
                    if (elapsed < d1) {
                        const t = elapsed / d1;
                        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                        camera.position.lerpVectors(pos1, pos2, ease);
                        camera.lookAt(0,0,0);
                        requestAnimationFrame(introLoop);
                    } else if (elapsed < d1 + d2) {
                        const t = (elapsed - d1) / d2;
                        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
                        camera.position.lerpVectors(pos2, pos3, ease);
                        camera.lookAt(0,0,0);
                        requestAnimationFrame(introLoop);
                    } else if (elapsed < d1 + d2 + d3) {
                        const t = (elapsed - d1 - d2) / d3;
                        const ease = 1 - Math.pow(1 - t, 3); 
                        camera.position.lerpVectors(pos3, pos4, ease);
                        camera.lookAt(0,0,0);
                        requestAnimationFrame(introLoop);
                    } else {
                        currentSection = 0;
                        targetSectionIndex = 0;
                        targetPosition.copy(pos4);
                        camera.position.copy(pos4);
                        
                        document.getElementById('header').classList.add('visible');
                        document.getElementById('scroll-hint').classList.add('visible'); 
                        
                        const activeSec = document.querySelector('.section[data-section="0"]');
                        if (activeSec) {
                            activeSec.classList.add('active');
                            activeSec.style.opacity = '1';
                            activeSec.style.visibility = 'visible';
                        }
                        
                        if(splashScreen) splashScreen.style.display = 'none';

                        isTransitioning = false;
                    }
                }
                requestAnimationFrame(introLoop);

            }, 3000); 
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function setupProjectToast() {
            const toast = document.getElementById('toast');
            document.querySelectorAll('.project-card').forEach(card => {
                if(!card.getAttribute('href')) { 
                    card.addEventListener('click', () => {
                        if(toast) {
                            toast.classList.add('visible');
                            setTimeout(() => { toast.classList.remove('visible'); }, 3000);
                        }
                    });
                }
            });
        }

        const sectionCoords = [
            new THREE.Vector3(0, 2, 10),     // 0: Accueil
            new THREE.Vector3(0, 0, 8),      // 1: À propos
            new THREE.Vector3(0, 60, 5),     // 2: Projets
            new THREE.Vector3(0, 30, 40),    // 3: Compétences
            new THREE.Vector3(0, 10, 150),   // 4: Contact
            new THREE.Vector3(40, 20, 40)    // 5: Making Of
        ];
        
        let targetPosition = new THREE.Vector3(0, 6, 1); 

        function setupNavigation() {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => goToSection(parseInt(item.dataset.section)));
            });
            document.getElementById('cta-projects').addEventListener('click', (e) => {
                e.preventDefault(); goToSection(3); 
            });
            
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('internal-link')) {
                    e.preventDefault();
                    const target = parseInt(e.target.dataset.target);
                    goToSection(target);
                }
            });
        }

        function goToSection(index) {
    if(index === currentSection && !isTransitioning) return;
    
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
        s.style.visibility = 'hidden';
    });
    
    const hint = document.getElementById('scroll-hint');
    if(index === 0) {
        setTimeout(() => hint.classList.add('visible'), 1000);
    } else {
        hint.classList.remove('visible');
    }

    currentSection = index;
    targetSectionIndex = index;
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // === ANIMATION SPÉCIALE POUR "À PROPOS" ===
    if (index === 1) {
        isTransitioning = true;
        isMovingToSection = true;
        
        document.querySelector('.nav-item[data-section="1"]')?.classList.add('active');
        
        // Réinitialiser les iframes à invisible
        const tableauIframe = document.getElementById('iframe-tableau');
        const livreIframe = document.getElementById('iframe-livre');
        if (tableauIframe) tableauIframe.style.opacity = '0';
        if (livreIframe) livreIframe.style.opacity = '0';
        
        // Animation de caméra vers le centre
        const startPos = camera.position.clone();
        const centerPos = new THREE.Vector3(0, 0, 8);
        const animDuration = 2000;
        const startTime = performance.now();
        
        function animateToCenter(now) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / animDuration, 1);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            
            camera.position.lerpVectors(startPos, centerPos, ease);
            camera.lookAt(0, 0, 0);
            
            if (t < 1) {
                requestAnimationFrame(animateToCenter);
            } else {
                targetPosition.copy(centerPos);
                isTransitioning = false;
                isMovingToSection = false;
                
                // Afficher la section
                const activeSec = document.querySelector('.section[data-section="1"]');
                if (activeSec) {
                    activeSec.classList.add('active');
                    activeSec.style.opacity = '1';
                    activeSec.style.visibility = 'visible';
                }
                
                // Afficher le Tableau d'abord
                if (tableauIframe) {
                    tableauIframe.style.transition = 'opacity 0.8s ease';
                    tableauIframe.style.opacity = '1';
                }
                
                // Afficher le Livre après délai
                setTimeout(() => {
                    if (livreIframe) {
                        const src = livreIframe.src;
                        livreIframe.src = '';
                        livreIframe.src = src;

                        setTimeout(() => {
                        livreIframe.style.transition = 'opacity 0.8s ease';
                        livreIframe.style.opacity = '1';
                    }, 100);
                }
            }, 900);
            }
        }
        
        requestAnimationFrame(animateToCenter);
        return; // On sort ici, pas besoin du reste
    }
    // === FIN ANIMATION SPÉCIALE ===
    
    // Pour toutes les autres sections
    isMovingToSection = true;
    
    if(index === 0 || index === 1) {
        document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');
    } else if (index === 3 || index === 4) {
        document.querySelector(`.nav-item[data-section="${index}"]`)?.classList.add('active');
    }

    if (index === 0 && window.innerWidth < 768) {
        targetPosition.set(0, 2, 14); 
    } else {
        targetPosition.copy(sectionCoords[index]);
    }
    
    if(index === 1) {
        const wrapper = document.querySelector('.apropos-wrapper');
        if(wrapper) wrapper.scrollTop = 0;
    }
    if(index === 2) {
        const wrapper = document.querySelector('.makingof-container');
        if(wrapper) wrapper.scrollTop = 0;
    }
}

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            if(accretionDisk) accretionDisk.material.uniforms.u_time.value = time;
            if(glowSphere) glowSphere.material.uniforms.viewVector.value.subVectors(camera.position, glowSphere.position);
            
            resistanceY *= 0.9;
            if(Math.abs(resistanceY) < 0.01) resistanceY = 0;

            if (currentSection !== -1 && !isTransitioning) { 
                let finalTarget = targetPosition.clone();
                finalTarget.y -= resistanceY * 0.05; 

                camera.position.lerp(finalTarget, 0.04);
                camera.lookAt(0, 0, 0); 
                
                if(isMovingToSection) {
                    const dist = camera.position.distanceTo(targetPosition);
                    if(dist < 2.0) { 
                        isMovingToSection = false; 
                        const activeSec = document.querySelector(`.section[data-section="${currentSection}"]`);
                        if(activeSec) {
                            activeSec.classList.add('active');
                            activeSec.style.opacity = '1';
                            activeSec.style.visibility = 'visible';
                            
                            if(!document.getElementById('project-overlay').classList.contains('visible') && currentSection === 0) {
                                document.getElementById('scroll-hint').classList.add('visible');
                            }
                        }
                    }
                }
            }

            let targetFOV = 60;
            camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.04);
            camera.updateProjectionMatrix();

            const distToCenter = camera.position.length();

            // NOUVELLE LOGIQUE POUR LES IFRAMES
            // Dans ton code, "À Propos" est la section 1
            const isReadingBook = (currentSection === 1);

            if (isReadingBook) {
                // On cache tout le Trou Noir pour voir le Tableau.html derrière
                blackHole.visible = false;
                accretionDisk.visible = false;
                glowSphere.visible = false;
                stars.visible = false;
                bgMesh.visible = false;
            } else {
                // On rallume tout pour les autres sections
                blackHole.visible = true;
                accretionDisk.visible = true;
                glowSphere.visible = true;
                stars.visible = true;
                bgMesh.visible = true;
            }

            renderer.setScissorTest(false);
            renderer.clear();
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            
            renderer.render(scene, camera);
        }
        
        function initWordSwitch() {
            const ws = document.getElementById('wordSwitch');
            if(!ws) return;
            const w = ws.querySelectorAll('.word'); let ai=0;
            w.forEach(wd => {
                const txt=wd.textContent; const isC=wd.classList.contains('word-code');
                wd.innerHTML=txt.split('').map((c,k)=>`<span class="letter ${isC?(['<','>'].includes(c)?'letter-bracket':'letter-text'):''}" style="transition-delay:${k*25}ms">${c===' '?'&nbsp;':c}</span>`).join('');
            });
            function sw() {
                const ni=(ai+1)%w.length; const cw=w[ai]; const nw=w[ni];
                cw.querySelectorAll('.letter').forEach(l=>l.classList.add('out'));
                nw.querySelectorAll('.letter').forEach(l=>l.classList.add('in'));
                setTimeout(()=>{
                    cw.classList.remove('word-active'); cw.classList.add('word-next');
                    nw.classList.remove('word-next'); nw.classList.add('word-active');
                    cw.querySelectorAll('.letter').forEach(l=>l.classList.remove('out'));
                    nw.querySelectorAll('.letter').forEach(l=>l.classList.remove('in'));
                    ai=ni;
                }, cw.textContent.length*25+400);
            }
            setTimeout(()=>{sw(); setInterval(sw,4000);},2000);
        }

        init();

        // --- GESTION AUTOPLAY DES VIDÉOS (VISIBILITÉ) ---
        function setupVideoObserver() {
            const videos = document.querySelectorAll('.lazy-video');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play().catch(e => { console.log("Autoplay bloqué par le navigateur", e); });
                    } else {
                        video.pause();
                    }
                });
            }, {
                threshold: 0.5 
            });
            videos.forEach(video => {
                observer.observe(video);
            });
        }
        setupVideoObserver();
        initWordSwitch();
