'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene04Pivot.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene04Pivot: React.FC = () => {
  const { scene04Pivot } = storyContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      tl.from(quoteRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          pillRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.pivotSection}>
      <div className={styles.glowCenter} />
      <div className={styles.gridLines} />
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.tagPill}>
            <Zap size={14} />
            <span>{scene04Pivot.tag}</span>
          </div>

          <h2 ref={quoteRef} className={styles.quoteText}>
            "{scene04Pivot.quote}"
          </h2>

          <p ref={subtextRef} className={styles.subtext}>
            {scene04Pivot.subtext}
          </p>

          <div ref={pillRef} className={styles.entryPill}>
            <div className={styles.brandDot} />
            <span>RecoBit Intelligent Layer Active</span>
            <Sparkles size={16} color="#FF5500" />
          </div>
        </div>
      </div>
    </section>
  );
};
