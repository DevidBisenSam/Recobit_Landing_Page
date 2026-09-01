'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Target, Layers, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Brain, Check } from 'lucide-react';
import styles from './Act2Top10Mapper.module.css';

gsap.registerPlugin(ScrollTrigger);

const topPicksDemo = [
  { rank: 1, name: 'Shree Collection Traders Pvt Ltd', reason: 'High semantic match with historical counterparty pattern', confidence: '99%' },
  { rank: 2, name: 'Shree Collections Retail A/C', reason: 'Frequent past voucher association for HDFC channel', confidence: '84%' },
  { rank: 3, name: 'Shree Krishna Collections (Bhandara)', reason: 'Matched GSTIN prefix & counterparty alias', confidence: '72%' },
];

export const Act2Top10Mapper: React.FC = () => {
  const [selectedPick, setSelectedPick] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
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

  const handlePickSelect = (idx: number) => {
    setSelectedPick(idx);
    setConfirmed(true);
  };

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

        {/* 2-Column Luxury Interface Grid */}
        <div className={styles.interactiveGrid}>
          {/* Left: Interactive AI Narration Decomposer */}
          <div ref={cardRef} className={styles.mapperCard}>
            <div className={styles.mapperHeader}>
              <div className={styles.fileBadge}>
                <Sparkles size={16} color="#FF5500" />
                <span>AI Narration Decomposer</span>
              </div>
              <span className={styles.progressTag}>PATTERN RECOGNITION ACTIVE</span>
            </div>

            <div className={styles.activeTxnSection}>
              <div className={styles.txnMeta}>
                <span>RAW INCOMING BANK LINE</span>
                <span>EXTRACTION CONFIDENCE: 99%</span>
              </div>
              <div className={styles.txnNarrationBox}>
                <span>UPI/394805395421/HDFC/SHREE COLLECTION/Cs</span>
                <span className={styles.amountTag}>₹20,000.00 CR</span>
              </div>
              <div className={styles.tokensRow}>
                <span className={styles.tokenChip}>Channel: UPI</span>
                <span className={styles.tokenChip}>Ref: 394805395421</span>
                <span className={styles.tokenChip}>Bank: HDFC</span>
                <span className={`${styles.tokenChip} ${styles.tokenChipActive}`}>Counterparty: SHREE COLLECTION</span>
              </div>
            </div>

            <div className={styles.suggestionsSection}>
              <div className={styles.suggestionsTitle}>
                <span>Top Ranked Ledger Accounts</span>
                <span style={{ color: '#FF5500', fontWeight: 700 }}>1-Click Confirm</span>
              </div>

              <ul className={styles.picksList}>
                {topPicksDemo.map((pick, idx) => (
                  <li
                    key={idx}
                    className={`${styles.pickItem} ${selectedPick === idx ? styles.pickItemActive : ''}`}
                    onClick={() => handlePickSelect(idx)}
                  >
                    <div className={styles.pickLeft}>
                      <div className={styles.rankBadge}>
                        {selectedPick === idx && confirmed ? <Check size={12} /> : pick.rank}
                      </div>
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

          {/* Right: How RecoBit Works (Curiosity & Architectural Value) */}
          <div ref={explainerRef} className={styles.explainerCol}>
            <div className={styles.explainerCard}>
              <div className={styles.explainerHeader}>
                <div className={styles.explainerIcon}>
                  <Brain size={18} />
                </div>
                <h3 className={styles.explainerTitle}>Zero Static Keyword Rules</h3>
              </div>
              <p className={styles.explainerDesc}>
                Traditional regex and keyword rules break whenever a bank updates their narration structure.
                RecoBit dynamically isolates counterparties, tax tags, and reference IDs.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerHeader}>
                <div className={styles.explainerIcon}>
                  <Target size={18} />
                </div>
                <h3 className={styles.explainerTitle}>Ranked 1-to-10 Decision Matrix</h3>
              </div>
              <p className={styles.explainerDesc}>
                Instead of searching through thousands of accounts in a dropdown, your team is presented
                with the highest-confidence ledger picks ordered by relevance.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerHeader}>
                <div className={styles.explainerIcon}>
                  <ShieldCheck size={18} />
                </div>
                <h3 className={styles.explainerTitle}>Continuous Financial Memory</h3>
              </div>
              <p className={styles.explainerDesc}>
                Confirmed matches reinforce organizational pattern memory across multiple branches and bank
                accounts with full Maker-Checker audit control.
              </p>
            </div>

            <div className={styles.statsBanner}>
              <div className={styles.statItem}>
                <span className={styles.statVal}>3,000+</span>
                <span className={styles.statLbl}>Ledgers Filtered Instantly</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statVal}>85–95%</span>
                <span className={styles.statLbl}>Time Reduction per Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
