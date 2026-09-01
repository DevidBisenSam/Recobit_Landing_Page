'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, BookOpen, LineChart, Shield } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Scene11DashboardVisibility.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene11DashboardVisibility: React.FC = () => {
  const { scene11Dashboard } = storyContent;
  const { dashboardVideo } = mediaConfig.videos;

  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.pillarCard}`, {
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="dashboard-visibility" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.tag}>{scene11Dashboard.tag}</div>
          <h2 className={styles.title}>{scene11Dashboard.title}</h2>
          <p className={styles.body}>{scene11Dashboard.body}</p>
        </div>

        {/* 3 Core Pillars */}
        <div ref={pillarsRef} className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>
              <Landmark size={20} />
            </div>
            <h3 className={styles.pillarTitle}>Bank Data Hub</h3>
            <p className={styles.pillarDesc}>
              Centralized view of all corporate bank accounts, Dr/Cr opening & closing balances, and raw
              imported statement lines.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>
              <BookOpen size={20} />
            </div>
            <h3 className={styles.pillarTitle}>Ledger Data Sync</h3>
            <p className={styles.pillarDesc}>
              Live general ledger transactions aligned against statement counterparties with real-time voucher
              reference lookups.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>
              <LineChart size={20} />
            </div>
            <h3 className={styles.pillarTitle}>Executive Analytics</h3>
            <p className={styles.pillarDesc}>
              Reconciliation throughput speed, auto-matching success rates, pending exceptions, and closing
              cycle metrics.
            </p>
          </div>
        </div>

        {/* Real Product Proof Video */}
        <div className={styles.videoSection}>
          <ProductVideoFrame
            src={dashboardVideo.src}
            poster={dashboardVideo.poster}
            title={dashboardVideo.title}
            subtitle={dashboardVideo.subtitle}
            badge="LIVE SOFTWARE PROOF — CENTRAL DASHBOARD"
            urlPath="app.recobit.fi/dashboard/bank-data"
          />
        </div>
      </div>
    </section>
  );
};
