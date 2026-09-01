'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Target, Layers, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { SemanticCore3D } from '@/components/3d/SemanticCore3D';
import styles from './Act2Top10Mapper.module.css';

gsap.registerPlugin(ScrollTrigger);

const topPicksDemo = [
  { rank: 1, name: 'Shree Collection Traders Pvt Ltd', reason: 'High semantic match with historical counterparty pattern', confidence: '99%' },
  { rank: 2, name: 'Shree Collections Retail A/C', reason: 'Frequent past voucher association for HDFC channel', confidence: '84%' },
  { rank: 3, name: 'Shree Krishna Collections (Bhandara)', reason: 'Matched GSTIN prefix & counterparty alias', confidence: '72%' },
];

export const Act2Top10Mapper: React.FC = () => {
  const [selectedPick, setSelectedPick] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(explainerRef.current, {
        scrollTrigger: {
          trigger: explainerRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="act-2-mapping" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <Sparkles size={15} />
            <span>ACT 2 / THE INTELLIGENT SHIFT</span>
          </div>
          <h2 className={styles.title}>
            From infinite search to <span className="text-gradient-orange">Top 10 Ranked Matches.</span>
          </h2>
          <p className={styles.body}>
            RecoBit breaks down cryptic narrations into clean counterparty patterns. Instead of scrolling
            through thousands of accounts, your team confirms ranked picks in a single click.
          </p>
        </div>

        {/* 2-Column Conceptual Intelligence Grid */}
        <div className={styles.interactiveGrid}>
          {/* Left: Smart Batch Mapper Concept Card */}
          <div ref={cardRef} className={styles.mapperCard}>
            <div className={styles.mapperHeader}>
              <div className={styles.fileBadge}>
                <Sparkles size={16} color="#FF5500" />
                <span>AI Narration Decomposer</span>
              </div>
              <span className={styles.progressTag}>AUTOMATED PATTERN MATCH</span>
            </div>

            <div className={styles.activeTxnSection}>
              <div className={styles.txnMeta}>
                <span>INCOMING STATEMENT FEED</span>
                <span>PATTERN CONFIDENCE: 99%</span>
              </div>
              <div className={styles.txnNarrationBox}>
                <span>UPI/394805395421/HDFC/SHREE COLLECTION/Cs</span>
                <span className={styles.amountTag}>₹20,000.00 CR</span>
              </div>
            </div>

            <div className={styles.suggestionsSection}>
              <div className={styles.suggestionsTitle}>
                <span>Top 10 High-Confidence Ledger Picks</span>
                <span style={{ color: '#FF5500' }}>1-Click Confirm</span>
              </div>

              <ul className={styles.picksList}>
                {topPicksDemo.map((pick, idx) => (
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

          {/* Right: 3D Semantic Core & Value Pillars */}
          <div ref={explainerRef} className={styles.explainerCol}>
            {/* 3D Model Card */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 85, 0, 0.3)',
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 85, 0, 0.15)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#FF7A33',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  zIndex: 2,
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF5500' }} />
                <span>3D Semantic Neural Engine</span>
              </div>
              <SemanticCore3D />
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  background: '#0B0F17',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.78rem',
                  color: '#94A3B8',
                  textAlign: 'center',
                }}
              >
                Decomposes payment channels, invoice hashes, and party aliases in real time.
              </div>
            </div>

            {/* Quick Benefits */}
            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Zap size={18} />
              </div>
              <h3 className={styles.explainerTitle}>Instant Semantic Recognition</h3>
              <p className={styles.explainerDesc}>
                Extracts counterparty names, payment channels (UPI/NEFT/RTGS), and invoice hashes automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
