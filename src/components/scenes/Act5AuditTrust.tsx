'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Act5AuditTrust.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Act5AuditTrust: React.FC = () => {
  const { scene14Trust } = storyContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.timelineCard}`, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="act-5-trust" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <ShieldCheck size={15} />
            <span>ACT 5 / IMMUTABLE TRACEABILITY & AUDIT</span>
          </div>
          <h2 className={styles.title}>
            Every action accounted for. <span style={{ color: '#059669' }}>Nothing disappears.</span>
          </h2>
          <p className={styles.body}>
            From raw statement hashing and AI match confidence logs to manual overrides, checker approvals, and
            ERP voucher IDs, every single operation maintains a permanent cryptographic audit trail.
          </p>
        </div>

        {/* 5-Step Compact Horizontal Verification Track */}
        <div ref={gridRef} className={styles.timelineGrid}>
          {scene14Trust.timeline.map((item, idx) => (
            <div key={idx} className={styles.timelineCard}>
              <div className={styles.stepNum}>{item.step}</div>
              <div className={styles.stepTitle}>{item.title}</div>
              <div className={styles.stepDetail}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
