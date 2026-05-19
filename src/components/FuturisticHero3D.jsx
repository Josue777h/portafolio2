import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getQualitySettings = (quality) => {
  if (quality === "low") {
    return { maxDpr: 1.1, antialias: false, shadows: false, bloom: false, sphereSeg: 32, shadowMapSize: 0 };
  }
  if (quality === "high") {
    return { maxDpr: 1.75, antialias: true, shadows: true, bloom: true, sphereSeg: 64, shadowMapSize: 1024 };
  }
  // auto
  const isSmall = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
  return isSmall
    ? { maxDpr: 1.25, antialias: false, shadows: false, bloom: false, sphereSeg: 32, shadowMapSize: 0 }
    : { maxDpr: 1.6, antialias: true, shadows: true, bloom: true, sphereSeg: 48, shadowMapSize: 512 };
};

const makeIconTexture = (label, bg = "#22d3ee") => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const r = canvas.width * 0.44;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = bg;
  ctx.globalAlpha = 0.95;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.font = "700 56px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + 1, y + 2);

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "700 56px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText(label, x, y);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  tex.generateMipmaps = true;
  return tex;
};

const FuturisticHero3D = ({ className = "", quality = "auto" }) => {
  const containerRef = useRef(null);
  const cleanupRef = useRef(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const settings = getQualitySettings(quality);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050a, 0.12);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0.0, 0.15, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: settings.antialias,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, settings.maxDpr));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = settings.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);
    // Make the canvas fill the container (avoid baseline gaps / whitespace in cards).
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // Environment (PBR reflections)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.04);
    scene.environment = envRT.texture;

    // Lights (cinematic neon, minimal)
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const planetLight = new THREE.DirectionalLight(0xffffff, 1.2);
    planetLight.position.set(2, 1, 3);
    scene.add(planetLight);

    const key = new THREE.PointLight(0x6d5cff, 14, 22);
    key.position.set(3.2, 1.2, 2.8);
    key.castShadow = settings.shadows;
    if (settings.shadows) {
      key.shadow.mapSize.width = settings.shadowMapSize;
      key.shadow.mapSize.height = settings.shadowMapSize;
    }
    scene.add(key);

    const fill = new THREE.PointLight(0x00d4ff, 10, 22);
    fill.position.set(-3.6, 0.4, 3.2);
    scene.add(fill);

    const rim = new THREE.PointLight(0xa855ff, 7, 24);
    rim.position.set(0.0, 2.1, -3.6);
    scene.add(rim);

    // Background gradient plane (keeps negative space clean)
    const bgMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uA: { value: new THREE.Color(0x020205) },
        uB: { value: new THREE.Color(0x050510) },
        uC: { value: new THREE.Color(0x080415) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uA;
        uniform vec3 uB;
        uniform vec3 uC;
        void main() {
          float g1 = smoothstep(0.0, 1.0, vUv.y);
          float g2 = smoothstep(0.0, 1.0, vUv.x);
          vec3 col = mix(uA, uB, g1);
          col = mix(col, uC, (1.0 - g2) * 0.4);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(100, 70), bgMat);
    bg.position.set(0, 0.2, -8.5);
    scene.add(bg);

    // Materials: metal + glass
    const metal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.2, 0.2, 0.4),
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 0.2,
    });

    const iconMaterial = (texture) => new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0,
      color: 0xffffff,
    });

    // Composition group (keep center mostly empty for text)
    const composition = new THREE.Group();
    scene.add(composition);

    // Planet (procedural, no network fetch)
    const diffuse = (() => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const g = ctx.createRadialGradient(128, 100, 20, 128, 128, 140);
      g.addColorStop(0, "#1b6cff");
      g.addColorStop(0.55, "#0a2a66");
      g.addColorStop(1, "#050814");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      // light noise
      const img = ctx.getImageData(0, 0, 256, 256);
      for (let i = 0; i < img.data.length; i += 4) {
        const n = (Math.random() - 0.5) * 18;
        img.data[i + 0] = Math.min(255, Math.max(0, img.data[i + 0] + n));
        img.data[i + 1] = Math.min(255, Math.max(0, img.data[i + 1] + n));
        img.data[i + 2] = Math.min(255, Math.max(0, img.data[i + 2] + n));
      }
      ctx.putImageData(img, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 2;
      tex.generateMipmaps = true;
      return tex;
    })();

    const planetGeom = new THREE.SphereGeometry(0.7, settings.sphereSeg, settings.sphereSeg);
    const planetMat = new THREE.MeshStandardMaterial({
      map: diffuse ?? null,
      color: 0x0b2b66,
      metalness: 0.05,
      roughness: 0.65,
      emissive: new THREE.Color(0x113366),
      emissiveIntensity: 0.25,
    });
    const planet = new THREE.Mesh(planetGeom, planetMat);
    planet.position.set(0, 0.08, 0);
    planet.castShadow = settings.shadows;
    planet.receiveShadow = settings.shadows;
    composition.add(planet);

    // Subtle Atmosphere Glow
    const atmosGeom = new THREE.SphereGeometry(0.71, settings.sphereSeg, settings.sphereSeg);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmos = new THREE.Mesh(atmosGeom, atmosMat);
    planet.add(atmos);

    // Orbital Rings (Subtle)
    const ringGeom = new THREE.TorusGeometry(1.3, 0.008, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 2.2;
    composition.add(ring1);

    const ring2 = ring1.clone();
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = Math.PI / 4;
    ring2.material = ringMat.clone();
    ring2.material.color.set(0x00d4ff);
    composition.add(ring2);

    // Flowing ribbon (transformed into a subtle energy stream)
    const curvePoints = [
      new THREE.Vector3(-3.5, -0.5, -1.0),
      new THREE.Vector3(-1.5, 1.0, -0.5),
      new THREE.Vector3(0.0, 0.2, -0.2),
      new THREE.Vector3(1.5, 1.2, -0.5),
      new THREE.Vector3(3.5, -0.5, -1.0),
    ];
    const ribbonCurve = new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.45);
    const ribbon = new THREE.Mesh(
      new THREE.TubeGeometry(ribbonCurve, 220, 0.04, 16, false),
      new THREE.MeshPhysicalMaterial({
        color: 0x4488ff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: new THREE.Color(0x2244ff),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.4
      })
    );
    composition.add(ribbon);

    // Social media sprites (procedural, no network fetch)
    const socialIcons = [
      { label: "f", color: "#1877f2" },
      { label: "w", color: "#25d366" },
      { label: "ig", color: "#e1306c" },
      { label: "in", color: "#0a66c2" },
      { label: "gh", color: "#111827" },
      { label: "x", color: "#0f172a" },
    ];

    const iconMeshes = [];
    socialIcons.forEach((icon, i) => {
      const texture = makeIconTexture(icon.label, icon.color);
      if (!texture) return;
      const material = iconMaterial(texture);
      const sprite = new THREE.Sprite(material);
      
      const a = (i / socialIcons.length) * Math.PI * 2;
      const r = 1.9 + Math.random() * 0.3;
      sprite.position.set(Math.cos(a) * r, (i % 2 === 0 ? 0.4 : -0.4), Math.sin(a) * r);
      sprite.scale.set(0.38, 0.38, 1);
      
      sprite.userData = { 
        a, 
        r, 
        speed: 0.15 + Math.random() * 0.2, 
        wobble: 0.3 + Math.random() * 0.4,
        originalY: sprite.position.y
      };
      
      composition.add(sprite);
      iconMeshes.push(sprite);
    });

    // Subtle particles (Starfield)
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.5 + Math.random() * 8.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3 + 0] = Math.cos(theta) * Math.cos(phi) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * radius;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * radius;
      sizes[i] = 0.4 + Math.random() * 1.2;
    }
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const particlesMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(0x6d5cff) },
        uColorB: { value: new THREE.Color(0x00d4ff) },
      },
      vertexShader: `
        attribute float aSize;
        uniform float uTime;
        varying float vFade;
        void main() {
          vec3 p = position;
          float t = uTime * 0.05;
          vFade = smoothstep(10.0, 2.0, length(p));
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * (1.0 / -mvPosition.z) * 100.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vFade;
        void main() {
          vec2 uv = gl_PointCoord.xy - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.1, d) * vFade;
          vec3 col = mix(uColorA, uColorB, vFade);
          gl_FragColor = vec4(col, a * 0.6);
        }
      `,
    });

    const particles = new THREE.Points(particlesGeom, particlesMat);
    particles.position.y = 0.08;
    scene.add(particles);

    // Postprocessing (optional - expensive)
    const composer = settings.bloom ? new EffectComposer(renderer) : null;
    const bloom = settings.bloom ? new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.4, 0.85) : null;
    if (composer) {
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(bloom);
    }

    // Interaction
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer?.setSize?.(w, h);
      bloom?.setSize?.(w, h);
      if (bloom) bloom.strength = w < 520 ? 0.3 : 0.45;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(rafId);
      } else {
        rafId = window.requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      const t = clock.getElapsedTime();

      // Cinematic camera drift (heavy feel: slow, damped)
      const targetX = clamp(pointer.x, -1, 1) * 0.22;
      const targetY = clamp(pointer.y, -1, 1) * 0.14;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (0.15 - targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.08, -0.3);

      // Subtle scene drift (keeps it alive, not distracting)
      composition.position.y = Math.sin(t * 0.22) * 0.05;
      composition.rotation.y = Math.sin(t * 0.18) * 0.07;

      // Planet rotation
      planet.rotation.y = t * 0.1;
      planet.rotation.x = 0.1;

      // Icons orbit + wobble
      iconMeshes.forEach((icon) => {
        const a = icon.userData.a + t * icon.userData.speed;
        const r = icon.userData.r + Math.sin(t * 0.3 + icon.userData.a) * 0.05;
        icon.position.x = Math.cos(a) * r;
        icon.position.z = Math.sin(a) * r;
        icon.position.y = icon.userData.originalY + Math.sin(t * 0.5 + icon.userData.a) * 0.1 * icon.userData.wobble;
        
        // Intensity based on Z position (closer = more intense color, less bloom)
        const zFactor = (icon.position.z + 2.5) / 5.0; 
        const intensity = 0.3 + clamp(zFactor, 0, 1) * 0.7;
        icon.material.color.setRGB(intensity, intensity, intensity);
      });

      particlesMat.uniforms.uTime.value = t;
      particles.rotation.y = t * 0.04;

      if (composer) composer.render();
      else renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    cleanupRef.current = () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      composer?.dispose?.();
      bloom?.dispose?.();
      pmrem.dispose();
      envRT.texture.dispose();

      particlesGeom.dispose();
      particlesMat.dispose();
      planetGeom.dispose();
      planetMat.dispose();
      diffuse?.dispose?.();
      atmosGeom.dispose();
      atmosMat.dispose();
      ribbon.geometry.dispose();
      ribbon.material.dispose();
      bg.geometry.dispose();
      bg.material.dispose();
      ringGeom.dispose();
      ringMat.dispose();

      iconMeshes.forEach(icon => {
        icon.material.map.dispose();
        icon.material.dispose();
      });

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };

    return () => cleanupRef.current();
  }, [quality]);

  return <div ref={containerRef} className={`relative overflow-hidden ${className}`} />;
};

export default FuturisticHero3D;
