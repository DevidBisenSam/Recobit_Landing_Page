'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './AmbientBackground.module.css';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // PILLAR C — CURSOR WARM AURA (Light Trail following the mouse)
  // =========================================================================
  useEffect(() => {
    const aura = cursorAuraRef.current;
    if (!aura) return;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let ax = cx;
    let ay = cy;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ax = lerp(ax, cx, 0.075);
      ay = lerp(ay, cy, 0.075);
      aura.style.transform = `translate(${ax - 200}px, ${ay - 200}px)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // =========================================================================
  // THREE.JS — PARTICLE SYSTEM WITH SCROLL VELOCITY SURGE (PILLAR B)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- TEXTURE A: Gossamer Solar Mote ---
    const createSolarMoteTexture = () => {
      const size = 64;
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d')!;
      const cx = size / 2, cy = size / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      g.addColorStop(0, 'rgba(255, 140, 40, 0.65)');
      g.addColorStop(0.4, 'rgba(255, 100, 10, 0.28)');
      g.addColorStop(0.75, 'rgba(255, 80, 0, 0.08)');
      g.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    // --- TEXTURE B: Warm Champagne Glint ---
    const createChampagneGlintTexture = () => {
      const size = 80;
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d')!;
      const cx = size / 2, cy = size / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34);
      g.addColorStop(0, 'rgba(255, 200, 80, 0.85)');
      g.addColorStop(0.25, 'rgba(255, 160, 40, 0.48)');
      g.addColorStop(0.55, 'rgba(255, 100, 10, 0.18)');
      g.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    // --- TEXTURE C: Diamond Solar Flare (4-point star) ---
    const createSolarFlareTexture = () => {
      const size = 128;
      const cx = size / 2, cy = size / 2;
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d')!;
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52);
      aura.addColorStop(0, 'rgba(255, 200, 80, 0.85)');
      aura.addColorStop(0.18, 'rgba(255, 140, 30, 0.42)');
      aura.addColorStop(0.5, 'rgba(255, 85, 0, 0.12)');
      aura.addColorStop(1, 'rgba(255, 85, 0, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, size, size);
      const hSpike = ctx.createLinearGradient(0, cy, size, cy);
      hSpike.addColorStop(0, 'rgba(255, 180, 60, 0)');
      hSpike.addColorStop(0.38, 'rgba(255, 210, 100, 0.5)');
      hSpike.addColorStop(0.5, 'rgba(255, 245, 200, 1)');
      hSpike.addColorStop(0.62, 'rgba(255, 210, 100, 0.5)');
      hSpike.addColorStop(1, 'rgba(255, 180, 60, 0)');
      ctx.fillStyle = hSpike;
      ctx.beginPath();
      ctx.moveTo(4, cy); ctx.lineTo(cx, cy - 3); ctx.lineTo(size - 4, cy); ctx.lineTo(cx, cy + 3);
      ctx.closePath(); ctx.fill();
      const vSpike = ctx.createLinearGradient(cx, 0, cx, size);
      vSpike.addColorStop(0, 'rgba(255, 180, 60, 0)');
      vSpike.addColorStop(0.38, 'rgba(255, 210, 100, 0.5)');
      vSpike.addColorStop(0.5, 'rgba(255, 245, 200, 1)');
      vSpike.addColorStop(0.62, 'rgba(255, 210, 100, 0.5)');
      vSpike.addColorStop(1, 'rgba(255, 180, 60, 0)');
      ctx.fillStyle = vSpike;
      ctx.beginPath();
      ctx.moveTo(cx, 4); ctx.lineTo(cx + 3, cy); ctx.lineTo(cx, size - 4); ctx.lineTo(cx - 3, cy);
      ctx.closePath(); ctx.fill();
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7);
      core.addColorStop(0, 'rgba(255, 255, 220, 1)');
      core.addColorStop(0.35, 'rgba(255, 230, 140, 0.95)');
      core.addColorStop(0.7, 'rgba(255, 160, 50, 0.5)');
      core.addColorStop(1, 'rgba(255, 85, 0, 0)');
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const solarMoteTex = createSolarMoteTexture();
    const champagneTex = createChampagneGlintTexture();
    const solarFlareTex = createSolarFlareTexture();

    // LAYER 1: DEEP (320 particles)
    const deepCount = 320;
    const deepPositions = new Float32Array(deepCount * 3);
    const deepAngles = new Float32Array(deepCount);
    const deepRadii = new Float32Array(deepCount);
    const deepSpeeds = new Float32Array(deepCount);
    for (let i = 0; i < deepCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 20.0;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 8;
      deepPositions[i3] = Math.cos(angle) * radius;
      deepPositions[i3 + 1] = y;
      deepPositions[i3 + 2] = Math.sin(angle) * radius + z;
      deepAngles[i] = angle;
      deepRadii[i] = radius;
      deepSpeeds[i] = (Math.random() * 0.0007 + 0.0002) * (Math.random() > 0.5 ? 1 : -1);
    }
    const deepGeom = new THREE.BufferGeometry();
    deepGeom.setAttribute('position', new THREE.BufferAttribute(deepPositions, 3));
    const deepMat = new THREE.PointsMaterial({
      size: 0.16, map: solarMoteTex, transparent: true, opacity: 0.28,
      blending: THREE.NormalBlending, depthWrite: false,
    });
    const deepLayer = new THREE.Points(deepGeom, deepMat);
    scene.add(deepLayer);

    // LAYER 2: MID CHAMPAGNE (160 particles)
    const midCount = 160;
    const midPositions = new Float32Array(midCount * 3);
    const midAngles = new Float32Array(midCount);
    const midRadii = new Float32Array(midCount);
    const midSpeeds = new Float32Array(midCount);
    const midBaseY = new Float32Array(midCount);
    for (let i = 0; i < midCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 14.0;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 5;
      midPositions[i3] = Math.cos(angle) * radius;
      midPositions[i3 + 1] = y;
      midPositions[i3 + 2] = Math.sin(angle) * radius + z;
      midAngles[i] = angle; midRadii[i] = radius;
      midSpeeds[i] = (Math.random() * 0.0012 + 0.0005) * (Math.random() > 0.5 ? 1 : -1);
      midBaseY[i] = y;
    }
    const midGeom = new THREE.BufferGeometry();
    midGeom.setAttribute('position', new THREE.BufferAttribute(midPositions, 3));
    const midMat = new THREE.PointsMaterial({
      size: 0.26, map: champagneTex, transparent: true, opacity: 0.42,
      blending: THREE.NormalBlending, depthWrite: false,
    });
    const midLayer = new THREE.Points(midGeom, midMat);
    scene.add(midLayer);

    // LAYER 3: HERO DIAMOND FLARES (42 particles)
    const heroCount = 42;
    const heroPositions = new Float32Array(heroCount * 3);
    const heroAngles = new Float32Array(heroCount);
    const heroRadii = new Float32Array(heroCount);
    const heroSpeeds = new Float32Array(heroCount);
    const heroBaseY = new Float32Array(heroCount);
    for (let i = 0; i < heroCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 10.0;
      const y = (Math.random() - 0.5) * 12;
      heroPositions[i3] = Math.cos(angle) * radius;
      heroPositions[i3 + 1] = y;
      heroPositions[i3 + 2] = Math.sin(angle) * radius;
      heroAngles[i] = angle; heroRadii[i] = radius;
      heroSpeeds[i] = (Math.random() * 0.0015 + 0.0007) * (Math.random() > 0.5 ? 1 : -1);
      heroBaseY[i] = y;
    }
    const heroGeom = new THREE.BufferGeometry();
    heroGeom.setAttribute('position', new THREE.BufferAttribute(heroPositions, 3));
    const heroMat = new THREE.PointsMaterial({
      size: 0.65, map: solarFlareTex, transparent: true, opacity: 0.72,
      blending: THREE.NormalBlending, depthWrite: false,
    });
    const heroLayer = new THREE.Points(heroGeom, heroMat);
    scene.add(heroLayer);

    // =========================================================================
    // PILLAR B — SCROLL VELOCITY SURGE
    // Track scroll speed and multiply particle sizes/opacity for "surge" effect
    // =========================================================================
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetVelocity = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      targetVelocity = Math.min(Math.abs(cur - lastScrollY) / 12, 1.0);
      lastScrollY = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mouse Parallax & Resize
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth; height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const t = clock.getElapsedTime();

      // Smooth velocity interpolation (ease towards target, decay to 0)
      scrollVelocity += (targetVelocity - scrollVelocity) * 0.08;
      targetVelocity *= 0.85; // natural decay

      if (!prefersReducedMotion) {
        // Scintillation + scroll velocity surge on opacity and size
        const velBoost = 1 + scrollVelocity * 1.8;
        deepMat.opacity = (0.18 + 0.10 * Math.sin(t * 1.1)) * velBoost;
        midMat.opacity = Math.min((0.34 + 0.12 * Math.cos(t * 1.7 + 1.1)) * velBoost, 0.85);
        heroMat.opacity = Math.min((0.54 + 0.18 * Math.sin(t * 2.2 + 0.7)) * velBoost, 1.0);

        // Particle size surge on fast scroll (creates "warping through space" feel)
        deepMat.size = 0.16 + scrollVelocity * 0.12;
        midMat.size = 0.26 + scrollVelocity * 0.18;
        heroMat.size = 0.65 + scrollVelocity * 0.45;

        // 3-plane parallax rotation
        deepLayer.rotation.y += 0.00018 + mouseX * 0.0012;
        deepLayer.rotation.x = mouseY * 0.025;
        midLayer.rotation.y += 0.00032 + mouseX * 0.0022;
        midLayer.rotation.x = mouseY * 0.048;
        heroLayer.rotation.y += 0.00055 + mouseX * 0.0038;
        heroLayer.rotation.x = mouseY * 0.075;

        // Orbital drift
        const dp = deepGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < deepCount; i++) {
          deepAngles[i] += deepSpeeds[i] * (1 + scrollVelocity * 2.5);
          const i3 = i * 3;
          dp[i3] = Math.cos(deepAngles[i]) * deepRadii[i];
          dp[i3 + 2] = Math.sin(deepAngles[i]) * deepRadii[i];
        }
        deepGeom.attributes.position.needsUpdate = true;

        const mp = midGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < midCount; i++) {
          midAngles[i] += midSpeeds[i] * (1 + scrollVelocity * 2.0);
          const i3 = i * 3;
          mp[i3] = Math.cos(midAngles[i]) * midRadii[i];
          mp[i3 + 2] = Math.sin(midAngles[i]) * midRadii[i];
          mp[i3 + 1] = midBaseY[i] + Math.sin(t * 0.45 + i * 0.38) * 0.18;
        }
        midGeom.attributes.position.needsUpdate = true;

        const hp = heroGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < heroCount; i++) {
          heroAngles[i] += heroSpeeds[i] * (1 + scrollVelocity * 1.5);
          const i3 = i * 3;
          hp[i3] = Math.cos(heroAngles[i]) * heroRadii[i];
          hp[i3 + 2] = Math.sin(heroAngles[i]) * heroRadii[i];
          hp[i3 + 1] = heroBaseY[i] + Math.sin(t * 0.62 + i * 0.55) * 0.22;
        }
        heroGeom.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      deepGeom.dispose(); midGeom.dispose(); heroGeom.dispose();
      deepMat.dispose(); midMat.dispose(); heroMat.dispose();
      solarMoteTex.dispose(); champagneTex.dispose(); solarFlareTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.ambientWrapper} aria-hidden="true">
      {/* Solar Nebula Gas Clouds */}
      <div className={styles.solarNebulaCore} />
      <div className={styles.nebulaCloud1} />
      <div className={styles.nebulaCloud2} />
      <div className={styles.nebulaCloud3} />
      {/* Cosmic Edge Vignette */}
      <div className={styles.cosmicVignette} />
      {/* PILLAR A — Film Grain / Noise Texture SVG overlay */}
      <div className={styles.filmGrain} />
      {/* PILLAR C — Cursor Warm Aura Light */}
      <div ref={cursorAuraRef} className={styles.cursorAura} />
      {/* Three.js Solar Stardust Canvas */}
      <canvas ref={canvasRef} className={styles.threeCanvas} />
    </div>
  );
};
