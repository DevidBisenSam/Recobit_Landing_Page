'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, ShieldCheck, Database, HardDrive, Sparkles } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene10FinalizePush.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene10FinalizePush: React.FC = () => {
  const { scene10Finalize } = storyContent;
  const [pushed, setPushed] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFinalize = () => {
    setPushed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5500', '#10B981', '#0F172A', '#F59E0B'],
    });
  };

  return (
    <section ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.tag}>{scene10Finalize.tag}</div>
          <h2 className={styles.title}>{scene10Finalize.title}</h2>
          <p className={styles.body}>{scene10Finalize.body}</p>

          <div ref={cardRef} className={styles.finalizeCard}>
            {/* Interactive Pipeline Architecture */}
            <div className={styles.pushFlowRow}>
              <div className={styles.flowNode}>
                <div className={`${styles.nodeCircle} ${styles.nodeRecoBit}`}>R</div>
                <span className={styles.nodeTitle}>RecoBit Session</span>
                <span className={styles.nodeSub}>459 Lines Reconciled</span>
              </div>

              <div className={styles.flowArrow}>
                <ArrowRight size={28} />
              </div>

              <div className={styles.flowNode}>
                <div className={`${styles.nodeCircle} ${styles.nodeRustAgent}`}>
                  <ShieldCheck size={28} />
                </div>
                <span className={styles.nodeTitle}>Secure Rust Agent</span>
                <span className={styles.nodeSub}>Zero Port Forwarding</span>
              </div>

              <div className={styles.flowArrow}>
                <ArrowRight size={28} />
              </div>

              <div className={styles.flowNode}>
                <div className={`${styles.nodeCircle} ${styles.nodeErp}`}>
                  <Database size={28} />
                </div>
                <span className={styles.nodeTitle}>Tally Prime / ERP</span>
                <span className={styles.nodeSub}>Auto-Voucher Posting</span>
              </div>
            </div>

            {/* Action Button & Status */}
            {pushed ? (
              <div className={styles.successBanner}>
                <CheckCircle2 size={18} />
                <span>
                  Reconciliation Session Finalized! 459 Vouchers Posted (e.g. BRN0426/2578). Audit Hash
                  Archived.
                </span>
              </div>
            ) : (
              <button className={styles.finalizeBtn} onClick={handleFinalize}>
                <Sparkles size={18} />
                <span>Finalize & Push to ERP</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
