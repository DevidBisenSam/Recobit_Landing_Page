'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, TrendingUp, Cpu, FastForward } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene06WorkloadScale.module.css';

gsap.registerPlugin(ScrollTrigger);

const batchRows = [
  { ref: 'TXN-9021', narr: 'IMPS/615010076720/AGRAWAL TRADERS', amount: '₹50,000.00', status: 'AUTO-MAPPED' },
  { ref: 'TXN-9022', narr: 'UPI 615035923249/BARB/MAA AMBE KRUSHI', amount: '₹20,000.00', status: 'AUTO-MAPPED' },
  { ref: 'TXN-9023', narr: 'IMPS/615010994425/ATULSABJIBHANDAR', amount: '₹2,00,000.00', status: 'AUTO-MAPPED' },
  { ref: 'TXN-9024', narr: 'NEFT SBIN002341/COROMANDEL PUNE', amount: '₹1,25,00,000.00', status: 'AUTO-MAPPED' },
  { ref: 'TXN-9025', narr: 'RTGS MAHBR52026/DAFTARI AGRO WARDHA', amount: '₹41,00,000.00', status: 'AUTO-MAPPED' },
];

export const Scene06WorkloadScale: React.FC = () => {
  const { scene06Scale } = storyContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const streamBoardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(streamBoardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scaleSection}>
      <div className={styles.glowBg} />
      <div className="container">
        <div className={styles.contentGrid}>
          {/* Text Column */}
          <div ref={textColRef} className={styles.textCol}>
            <div className={styles.tag}>{scene06Scale.tag}</div>
            <h2 className={styles.title}>{scene06Scale.title}</h2>
            <p className={styles.body}>{scene06Scale.body}</p>

            <div className={styles.metricBadgeRow}>
              <div className={styles.metricBox}>
                <span className={styles.metricVal}>10,000+</span>
                <span className={styles.metricLbl}>Rows / Minute Throughput</span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricVal}>0%</span>
                <span className={styles.metricLbl}>Cognitive Search Fatigue</span>
              </div>
            </div>
          </div>

          {/* Parallel Stream Board */}
          <div ref={streamBoardRef} className={styles.streamBoard}>
            <div className={styles.streamHeader}>
              <span className={styles.streamTitle}>Parallel Batch Mapping Engine</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                PROCESSING 388 ROWS
              </span>
            </div>

            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarFill} />
            </div>

            <div className={styles.streamList}>
              {batchRows.map((row, idx) => (
                <div key={idx} className={styles.streamRow}>
                  <div>
                    <span style={{ color: '#94A3B8', marginRight: '0.5rem' }}>{row.ref}</span>
                    <span className={styles.streamRowNarr}>{row.narr}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{row.amount}</span>
                    <span className={styles.streamStatus}>
                      <CheckCircle2 size={11} />
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
