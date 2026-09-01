'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const RobotAssistant3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for entire robot
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // --- MATERIALS (Studio Quality Physical Materials) ---
    const whiteChassisMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0xff3300,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050811,
      roughness: 0.05,
      metalness: 0.95,
      clearcoat: 1.0,
      reflectivity: 0.9,
    });

    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const eyeGlowOrangeMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
    });

    // --- 1. HEAD CHASSIS ---
    const headGeo = new THREE.SphereGeometry(1.0, 32, 32);
    headGeo.scale(1.05, 1.0, 0.95);
    const head = new THREE.Mesh(headGeo, whiteChassisMat);
    robotGroup.add(head);

    // --- 2. GLASS VISOR (Face Screen) ---
    const visorGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    visorGeo.scale(1.02, 0.75, 0.9);
    visorGeo.rotateX(Math.PI * 0.5);
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.05, 0.2);
    robotGroup.add(visor);

    // --- 3. GLOWING EYE EXPRESSION VISOR ---
    const eyeLeftGeo = new THREE.CapsuleGeometry(0.09, 0.22, 12, 16);
    eyeLeftGeo.rotateZ(Math.PI * 0.5);
    const eyeLeft = new THREE.Mesh(eyeLeftGeo, eyeGlowMat);
    eyeLeft.position.set(-0.32, 0.08, 0.95);
    robotGroup.add(eyeLeft);

    const eyeRightGeo = new THREE.CapsuleGeometry(0.09, 0.22, 12, 16);
    eyeRightGeo.rotateZ(Math.PI * 0.5);
    const eyeRight = new THREE.Mesh(eyeRightGeo, eyeGlowMat);
    eyeRight.position.set(0.32, 0.08, 0.95);
    robotGroup.add(eyeRight);

    // Center Scanning Reticle Dot
    const scanDotGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const scanDot = new THREE.Mesh(scanDotGeo, eyeGlowOrangeMat);
    scanDot.position.set(0, 0.08, 0.98);
    robotGroup.add(scanDot);

    // --- 4. HEADPHONE / EAR PODS ---
    const earGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32);
    earGeo.rotateZ(Math.PI * 0.5);

    const earLeft = new THREE.Mesh(earGeo, goldAccentMat);
    earLeft.position.set(-1.12, 0.05, 0);
    robotGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeo, goldAccentMat);
    earRight.position.set(1.12, 0.05, 0);
    robotGroup.add(earRight);

    // Glowing Ear Rings
    const earRingGeo = new THREE.TorusGeometry(0.24, 0.03, 16, 32);
    earRingGeo.rotateY(Math.PI * 0.5);

    const earRingL = new THREE.Mesh(earRingGeo, eyeGlowMat);
    earRingL.position.set(-1.2, 0.05, 0);
    robotGroup.add(earRingL);

    const earRingR = new THREE.Mesh(earRingGeo, eyeGlowMat);
    earRingR.position.set(1.2, 0.05, 0);
    robotGroup.add(earRingR);

    // --- 5. FLOATING ORBITAL DATA RINGS ---
    const orbitRingGeo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const orbitRingMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0xff4400,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing1.rotation.x = Math.PI * 0.35;
    robotGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(orbitRingGeo, new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }));
    orbitRing2.rotation.x = -Math.PI * 0.25;
    orbitRing2.rotation.y = Math.PI * 0.2;
    orbitRing2.scale.set(1.15, 1.15, 1.15);
    robotGroup.add(orbitRing2);

    // Floating Data Satellite Spheres
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const satMesh1 = new THREE.Mesh(satGeo, eyeGlowOrangeMat);
    satMesh1.position.set(1.65, 0, 0);
    orbitRing1.add(satMesh1);

    const satMesh2 = new THREE.Mesh(satGeo, eyeGlowMat);
    satMesh2.position.set(-1.65, 0, 0);
    orbitRing2.add(satMesh2);

    // --- 6. FLOATING BASE POD / NECK COLLAR ---
    const collarGeo = new THREE.TorusGeometry(0.65, 0.12, 16, 32);
    collarGeo.rotateX(Math.PI * 0.5);
    const collar = new THREE.Mesh(collarGeo, darkChassisMat);
    collar.position.set(0, -1.05, 0);
    robotGroup.add(collar);

    // --- STUDIO LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key Light (Orange Rim / Warm Studio)
    const keyLight = new THREE.DirectionalLight(0xff5500, 2.8);
    keyLight.position.set(4, 4, 4);
    scene.add(keyLight);

    // Fill Light (Cool Cyan Studio)
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Top Rim Light
    const rimLight = new THREE.PointLight(0xffffff, 2.5, 20);
    rimLight.position.set(0, 5, -2);
    scene.add(rimLight);

    // Bottom Underglow (Brand Orange Glow)
    const underGlow = new THREE.PointLight(0xff5500, 3, 10);
    underGlow.position.set(0, -2, 2);
    scene.add(underGlow);

    // --- MOUSE TRACKING & INTERACTIVITY ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.2;
      mouseY = y * 0.8;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
        const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
        mouseX = x * 1.0;
        mouseY = y * 0.6;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetRotationY += (mouseX - targetRotationY) * 0.06;
      targetRotationX += (mouseY - targetRotationX) * 0.06;

      robotGroup.rotation.y = targetRotationY + Math.sin(elapsedTime * 0.8) * 0.08;
      robotGroup.rotation.x = targetRotationX + Math.cos(elapsedTime * 0.6) * 0.05;

      // Floating / Breathing levitation
      robotGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Spin orbital data rings
      orbitRing1.rotation.z = elapsedTime * 0.6;
      orbitRing2.rotation.z = -elapsedTime * 0.45;

      // Scan Dot pulsation
      const pulse = Math.sin(elapsedTime * 4) * 0.2 + 0.8;
      scanDot.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '340px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    />
  );
};
