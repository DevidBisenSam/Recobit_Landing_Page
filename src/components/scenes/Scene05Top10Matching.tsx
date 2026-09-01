'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CheckCircle2, FileSpreadsheet, Layers, ArrowRight, Zap, Target } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Scene05Top10Matching.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene05Top10Matching: React.FC = () => {
  const { scene05Top10 } = storyContent;
  const { bankImportVideo } = mediaConfig.videos;
  const [selectedPick, setSelectedPick] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const mapperCardRef = useRef<HTMLDivElement>(null);
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mapperCardRef.current, {
        scrollTrigger: {
          trigger: mapperCardRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(explainerRef.current, {
        scrollTrigger: {
          trigger: explainerRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top-10-matching" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.tag}>
            <Sparkles size={15} />
            <span>{scene05Top10.tag}</span>
          </div>
          <h2 className={styles.title}>{scene05Top10.title}</h2>
          <p className={styles.body}>{scene05Top10.body}</p>
        </div>

        {/* Interactive Top 10 Picks Demo */}
        <div className={styles.interactiveGrid}>
          {/* Smart Batch Mapper Card */}
          <div ref={mapperCardRef} className={styles.mapperCard}>
            <div className={styles.mapperHeader}>
              <div className={styles.fileBadge}>
                <FileSpreadsheet size={16} color="#16A34A" />
                <span>BOM_Statement_May2026.xlsx</span>
              </div>
              <span className={styles.progressTag}>Auto-Mapper Active</span>
            </div>

            <div className={styles.activeTxnSection}>
              <div className={styles.txnMeta}>
                <span>INBOUND VOUCHER #394805395421</span>
                <span>DATE: 30/05/2026</span>
              </div>
              <div className={styles.txnNarrationBox}>
                <span>UPI 394805395421/HDFC/SHREE COLLECTION/Cs</span>
                <span className={styles.amountTag}>₹20,000.00 CR</span>
              </div>
            </div>

            <div className={styles.suggestionsSection}>
              <div className={styles.suggestionsTitle}>
                <span>Intelligent Top Picks (Ranked by RecoBit Engine)</span>
                <span style={{ color: '#FF5500' }}>Click to Map</span>
              </div>

              <ul className={styles.picksList}>
                {scene05Top10.sampleTransaction.topPicks.map((pick, idx) => (
                  <li
                    key={idx}
                    className={`${styles.pickItem} ${selectedPick === idx ? styles.pickItemActive : ''}`}
                    onClick={() => setSelectedPick(idx)}
                  >
                    <div className={styles.pickLeft}>
                      <div className={styles.rankBadge}>{pick.rank}</div>
                      <div className={styles.pickDetails}>
                        <span className={styles.pickName}>{pick.name}</span>
                        <span className={styles.pickReason}>{pick.reason}</span>
                      </div>
                    </div>
                    <div className={styles.confidenceBadge}>{pick.confidence} Match</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Explainer Column */}
          <div ref={explainerRef} className={styles.explainerCol}>
            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Zap size={20} />
              </div>
              <h3 className={styles.explainerTitle}>Instant Semantic Recognition</h3>
              <p className={styles.explainerDesc}>
                RecoBit decomposes noisy bank narrations into core entities—counterparty names, payment
                mode (UPI/NEFT/RTGS), transaction hashes, and invoice references.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Target size={20} />
              </div>
              <h3 className={styles.explainerTitle}>One Click Assignment</h3>
              <p className={styles.explainerDesc}>
                Instead of searching through 3,000+ ledgers, the accountant chooses from the top suggestions
                or approves all high-confidence matches in bulk.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Layers size={20} />
              </div>
              <h3 className={styles.explainerTitle}>Adaptive Pattern Memory</h3>
              <p className={styles.explainerDesc}>
                Every confirmed mapping refines the domain model for your specific company, making future
                monthly reconciliations even faster.
              </p>
            </div>
          </div>
        </div>

        {/* Real Product Proof Video */}
        <div className={styles.videoSection}>
          <ProductVideoFrame
            src={bankImportVideo.src}
            poster={bankImportVideo.poster}
            title={bankImportVideo.title}
            subtitle={bankImportVideo.subtitle}
            badge="LIVE SOFTWARE PROOF — SMART BATCH MAPPER"
            urlPath="app.recobit.fi/transactions/batch-mapper"
          />
        </div>
      </div>
    </section>
  );
};
