'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ReconciliationVisualizer3D: React.FC<{ isReconciled?: boolean }> = ({ isReconciled }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Left Ring: Bank Stream (Orange)
    const ringGeo1 = new THREE.TorusGeometry(1.2, 0.08, 16, 60);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0xff3300,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const bankRing = new THREE.Mesh(ringGeo1, ringMat1);
    bankRing.position.x = -1.3;
    scene.add(bankRing);

    // Right Ring: Books Stream (Emerald Green)
    const ringGeo2 = new THREE.TorusGeometry(1.2, 0.08, 16, 60);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const booksRing = new THREE.Mesh(ringGeo2, ringMat2);
    booksRing.position.x = 1.3;
    scene.add(booksRing);

    // Connecting Alignment Beams
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.6,
    });

    const linesGroup = new THREE.Group();
    const lineCount = 8;

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const points = [];
      points.push(new THREE.Vector3(-1.3 + Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0));
      points.push(new THREE.Vector3(1.3 + Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMaterial);
      linesGroup.add(line);
    }
    scene.add(linesGroup);

    // Ambient & Point Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0xff5500, 3, 50);
    light1.position.set(-2, 2, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x10b981, 3, 50);
    light2.position.set(2, -2, 4);
    scene.add(light2);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      bankRing.rotation.x = t * 0.4;
      bankRing.rotation.y = t * 0.3;

      booksRing.rotation.x = -t * 0.4;
      booksRing.rotation.y = -t * 0.3;

      linesGroup.rotation.z = t * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [isReconciled]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '280px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};
