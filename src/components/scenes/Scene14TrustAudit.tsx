'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, CheckCircle2, Lock, History } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene14TrustAudit.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene14TrustAudit: React.FC = () => {
  const { scene14Trust } = storyContent;

  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.timelineCard}`, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="audit-trust" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.tag}>{scene14Trust.tag}</div>
          <h2 className={styles.title}>{scene14Trust.title}</h2>
          <p className={styles.body}>{scene14Trust.body}</p>

          <div ref={timelineRef} className={styles.timelineContainer}>
            {scene14Trust.timeline.map((item, idx) => (
              <div key={idx} className={styles.timelineCard}>
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDetail}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
