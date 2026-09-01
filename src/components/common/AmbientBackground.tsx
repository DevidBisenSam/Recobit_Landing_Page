'use client';

import React, { useEffect, useRef } from 'react';
import styles from './AmbientBackground.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  isBokeh?: boolean;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create rich financial data particles + floating soft bokeh bubbles
    const particleCount = Math.min(65, Math.floor(width / 22));
    const particles: Particle[] = [];
    const colors = ['#FF5500', '#FF7A33', '#FFAA00', '#10B981', '#CBD5E1'];

    // 1. Standard node particles
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.6 - 0.2, // smoothly drift upwards
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        isBokeh: false,
      });
    }

    // 2. Large soft floating glowing bokeh bubbles
    const bokehCount = Math.min(18, Math.floor(width / 75));
    for (let i = 0; i < bokehCount; i++) {
      const baseAlpha = Math.random() * 0.22 + 0.08;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.15,
        size: Math.random() * 28 + 14, // large soft bubbles
        color: Math.random() > 0.3 ? '#FF5500' : '#10B981',
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        isBokeh: true,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render floating bubbles and particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Wrap boundaries
        if (p.y < -40) {
          p.y = height + 40;
          p.x = Math.random() * width;
        }
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;

        if (p.isBokeh) {
          // Draw soft radiant glowing bubble
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color === '#FF5500' ? 'rgba(255, 85, 0, 0.35)' : 'rgba(16, 185, 129, 0.3)');
          gradient.addColorStop(0.6, p.color === '#FF5500' ? 'rgba(255, 120, 0, 0.15)' : 'rgba(16, 185, 129, 0.1)');
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        } else {
          // Draw crisp node particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.isBokeh) continue;
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = '#FF5500';
              ctx.globalAlpha = (1 - dist / 130) * 0.18;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.ambientWrapper} aria-hidden="true">
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />
      <div className={styles.glowOrb3} />
      <div className={styles.glowOrb4} />
      <div className={styles.glowOrb5} />
      <div className={styles.glowOrb6} />
      <div className={styles.glowOrb7} />
      <canvas ref={canvasRef} className={styles.ambientCanvas} />
    </div>
  );
};
