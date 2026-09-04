'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Force browser to never restore previous scroll position on reload/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis with iconic silky-smooth settings
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    lenis.scrollTo(0, { immediate: true });
    lenis.stop(); // Paused initially until HeroFilmScene intro animation completes!

    // Attach to window for programmatic scrolling
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Fluid downward arrow cursor matching nexstudio.tech
    const cursor = cursorRef.current;
    const arrowSvg = cursor?.querySelector('path');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let curX = mouseX;
    let curY = mouseY;
    let curAngle = 90; // 90deg is pointing down (natural rest)
    let targetAngle = 90;
    let isHoveringInteractive = false;
    let isPressed = false;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Only update angle if user moved with intentional distance
      if (dist > 3) {
        // Snappy quadrant alignment for clean intuitive feel:
        // Right: 0deg, Down: 90deg, Left: 180deg, Up: -90deg
        if (Math.abs(dx) > Math.abs(dy) * 1.35) {
          targetAngle = dx > 0 ? 0 : 180; // pure Right or Left
        } else if (Math.abs(dy) > Math.abs(dx) * 1.35) {
          targetAngle = dy > 0 ? 90 : -90; // pure Down or Up
        } else {
          // Diagonal direction
          targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) isVisible = true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (e.deltaY > 1) {
          targetAngle = 90; // Downward scroll -> Head points DOWN
        } else if (e.deltaY < -1) {
          targetAngle = -90; // Upward scroll -> Head points UP
        }
      } else {
        if (e.deltaX > 1) {
          targetAngle = 0; // Rightward scroll -> Head points RIGHT
        } else if (e.deltaX < -1) {
          targetAngle = 180; // Leftward scroll -> Head points LEFT
        }
      }
    };

    // Also bind directly to Lenis scroll instance
    lenis.on('scroll', (e: { direction: number; velocity: number }) => {
      if (e.direction === 1 && Math.abs(e.velocity) > 0.05) {
        targetAngle = 90; // Downward scroll -> Head points DOWN
      } else if (e.direction === -1 && Math.abs(e.velocity) > 0.05) {
        targetAngle = -90; // Upward scroll -> Head points UP
      }
    });

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseDown = () => {
      isPressed = true;
    };

    const onMouseUp = () => {
      isPressed = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select')) {
        isHoveringInteractive = true;
      } else {
        isHoveringInteractive = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    let rafId: number;

    const animateCursor = () => {
      // Snappy, fluid trailing physics
      curX += (mouseX - curX) * 0.25;
      curY += (mouseY - curY) * 0.25;

      // Smooth shortest-path angular interpolation to target direction
      let diff = (targetAngle - curAngle) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      curAngle += diff * 0.22;

      if (cursor) {
        const scale = isPressed ? 0.82 : isHoveringInteractive ? 1.35 : 1.0;
        cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) rotate(${curAngle}deg) scale(${scale})`;
        cursor.style.opacity = isVisible ? '1' : '0';

        if (arrowSvg) {
          arrowSvg.setAttribute(
            'fill',
            isHoveringInteractive ? '#FF5500' : 'url(#recobitCursorGrad)'
          );
          arrowSvg.setAttribute(
            'stroke',
            '#FFFFFF'
          );
        }
      }
      rafId = requestAnimationFrame(animateCursor);
    };
    rafId = requestAnimationFrame(animateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return (
    <>
      {/* Directional Velocity Arrow Cursor in Refined Editorial Slate */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform, opacity',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            filter:
              'drop-shadow(0 2px 6px rgba(15, 23, 42, 0.35)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))',
          }}
        >
          <defs>
            <linearGradient id="recobitCursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>
          </defs>
          <path
            d="M530 225C555 237 555 263 530 275L112 475C76 492 40 462 50 423L181 269C190 258 190 242 181 231L50 77C40 38 76 8 112 25L530 225Z"
            fill="url(#recobitCursorGrad)"
            stroke="#FFFFFF"
            strokeWidth="24"
            style={{
              transition: 'fill 0.2s ease, stroke 0.2s ease',
            }}
          />
        </svg>
      </div>
      {children}
    </>
  );
};
