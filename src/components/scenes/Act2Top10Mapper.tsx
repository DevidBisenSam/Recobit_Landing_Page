'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Target, Layers, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Bot } from 'lucide-react';
import { RobotAssistant3D } from '@/components/3d/RobotAssistant3D';
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
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(robotRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 35,
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

        {/* 2-Column 3D Robot Assistant + Intelligent Card Grid */}
        <div className={styles.interactiveGrid}>
          {/* Left: 3D AI Robot Assistant Targeting the Problem */}
          <div
            ref={robotRef}
            style={{
              background: 'linear-gradient(145deg, #0B0F17 0%, #111827 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 85, 0, 0.3)',
              boxShadow: '0 25px 55px -12px rgba(0, 0, 0, 0.3), 0 0 35px rgba(255, 85, 0, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div
              style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={16} color="#00F0FF" />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  RECOBIT CO-PILOT AGENT
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                }}
              >
                INTERACTIVE 3D
              </span>
            </div>

            {/* 3D Robot Model Canvas */}
            <RobotAssistant3D />

            <div
              style={{
                padding: '1rem 1.5rem',
                background: '#070B13',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.8125rem',
                color: '#94A3B8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span>Automated Semantic Narration Parsing</span>
              <span style={{ color: '#FF7A33', fontWeight: 700 }}>99% Accuracy Rationale</span>
            </div>
          </div>

          {/* Right: Smart Batch Mapper Concept Card */}
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
                <span>INCOMING RAW BANK LINE</span>
                <span>MATCH CONFIDENCE: 99%</span>
              </div>
              <div className={styles.txnNarrationBox}>
                <span>UPI/394805395421/HDFC/SHREE COLLECTION/Cs</span>
                <span className={styles.amountTag}>₹20,000.00 CR</span>
              </div>
            </div>

            <div className={styles.suggestionsSection}>
              <div className={styles.suggestionsTitle}>
                <span>Top 10 Ranked Ledger Suggestions</span>
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
        </div>
      </div>
    </section>
  );
};
