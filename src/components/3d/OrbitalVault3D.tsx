'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const OrbitalVault3D: React.FC<{ isReconciled?: boolean }> = ({ isReconciled }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. CORE FINANCIAL VAULT GLOBE ---
    const globeGeo = new THREE.SphereGeometry(1.35, 48, 48);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0x070c18,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    mainGroup.add(globe);

    // Inner Glowing Core inside Globe
    const innerLightGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const innerLightMat = new THREE.MeshBasicMaterial({
      color: isReconciled ? 0x10b981 : 0xff5500,
      transparent: true,
      opacity: 0.4,
    });
    const innerLight = new THREE.Mesh(innerLightGeo, innerLightMat);
    mainGroup.add(innerLight);

    // --- 2. SWIRLING FLUID / DATA RIBBONS (Inspired by Portfolio Globe) ---
    const ribbonsGroup = new THREE.Group();
    mainGroup.add(ribbonsGroup);

    // Ribbon Material (Glossy White/Orange with High Specular)
    const ribbonWhiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });

    const ribbonOrangeMat = new THREE.MeshPhysicalMaterial({
      color: 0xff5500,
      emissive: 0xff3300,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });

    const ribbonEmeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });

    // Create 6 parametric swirling ribbon arcs around the sphere
    const ribbonCount = 6;
    for (let r = 0; r < ribbonCount; r++) {
      const curvePoints = [];
      const numPoints = 80;
      const radiusBase = 1.55 + (r % 3) * 0.18;
      const angleOffset = (r / ribbonCount) * Math.PI * 2;
      const pitch = 0.8 + (r % 2) * 0.4;

      for (let p = 0; p <= numPoints; p++) {
        const t = (p / numPoints) * Math.PI * 1.8 - Math.PI * 0.9;
        const radius = radiusBase * Math.cos(t * 0.4);
        const x = radius * Math.cos(t * 1.2 + angleOffset);
        const y = t * pitch;
        const z = radius * Math.sin(t * 1.2 + angleOffset);
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 70, 0.065 + (r % 2) * 0.03, 12, false);
      const mat = r === 0 ? ribbonOrangeMat : r === 1 ? ribbonEmeraldMat : ribbonWhiteMat;
      const ribbonMesh = new THREE.Mesh(tubeGeo, mat);
      ribbonMesh.rotation.z = (r * Math.PI) / 6;
      ribbonsGroup.add(ribbonMesh);
    }

    // --- 3. 5 FLOATING CATEGORY GEMSTONES (Matched, Unmatched, Missing, etc.) ---
    const gemGeo = new THREE.DodecahedronGeometry(0.18, 0);
    const gemMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.1 }), // Matched
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.1 }), // Unmatched
      new THREE.MeshStandardMaterial({ color: 0x64748b, emissive: 0x334155, emissiveIntensity: 0.5, metalness: 0.9, roughness: 0.1 }), // Missing Books
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.1 }), // Missing Stmt
      new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.1 }), // Bank Charges
    ];

    const gemsGroup = new THREE.Group();
    mainGroup.add(gemsGroup);

    const gems: THREE.Mesh[] = [];
    for (let g = 0; g < 5; g++) {
      const gem = new THREE.Mesh(gemGeo, gemMaterials[g]);
      const angle = (g / 5) * Math.PI * 2;
      gem.position.set(Math.cos(angle) * 2.3, (Math.random() - 0.5) * 0.8, Math.sin(angle) * 2.3);
      gemsGroup.add(gem);
      gems.push(gem);
    }

    // --- 4. FLOATING DATA HALO PARTICLES ---
    const particleCount = 80;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = Math.random() > 0.5 ? 0.35 : 0.8;
      colors[i * 3 + 2] = 0.1;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particleCloud);

    // --- STUDIO LIGHTING ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xff5500, 3.2);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 2.5);
    cyanRim.position.set(-5, -2, 3);
    scene.add(cyanRim);

    const topWhite = new THREE.PointLight(0xffffff, 3, 20);
    topWhite.position.set(0, 4, 3);
    scene.add(topWhite);

    // --- MOUSE TRACKING & PARALLAX ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.4;
      mouseY = y * 0.9;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Smooth camera/group tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX + t * 0.25;
      mainGroup.rotation.x = targetY + Math.sin(t * 0.5) * 0.1;

      // Spin swirling ribbons
      ribbonsGroup.rotation.y = t * 0.4;
      ribbonsGroup.rotation.z = Math.sin(t * 0.3) * 0.2;

      // Orbit and rotate category gems
      gems.forEach((gem, idx) => {
        const speed = 0.5 + idx * 0.1;
        gem.rotation.x = t * speed;
        gem.rotation.y = t * (speed + 0.2);
      });
      gemsGroup.rotation.y = -t * 0.3;

      // Pulse inner light
      const pulse = Math.sin(t * 3) * 0.1 + 0.9;
      innerLight.scale.set(pulse, pulse, pulse);

      particleCloud.rotation.y = -t * 0.1;

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
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isReconciled]);

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
