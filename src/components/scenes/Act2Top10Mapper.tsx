'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Target, Layers, FileSpreadsheet, Eye, SlidersHorizontal } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Act2Top10Mapper.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Act2Top10Mapper: React.FC = () => {
  const { scene05Top10 } = storyContent;
  const { bankImportVideo } = mediaConfig.videos;
  const { top10PicksDropdown, smartBatchMapper } = mediaConfig.images;
  const [selectedPick, setSelectedPick] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'realImage'>('interactive');

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
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
    <section id="act-2-mapping" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <Sparkles size={15} />
            <span>ACT 2 / THE INTELLIGENT SHIFT</span>
          </div>
          <h2 className={styles.title}>
            From infinite search to <span className="text-gradient-orange">Top 10 High-Confidence Picks.</span>
          </h2>
          <p className={styles.body}>
            RecoBit decomposes cryptic narrations into clean counterparty patterns. Instead of scrolling
            endlessly, your team confirms ranked picks in a single decision.
          </p>
        </div>

        {/* Interactive / Real Image Switcher Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
          <button
            onClick={() => setViewMode('interactive')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: viewMode === 'interactive' ? '#FF5500' : '#FFFFFF',
              color: viewMode === 'interactive' ? '#FFFFFF' : '#334155',
              border: '1px solid',
              borderColor: viewMode === 'interactive' ? '#FF5500' : '#E2E8F0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <SlidersHorizontal size={14} />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => setViewMode('realImage')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: viewMode === 'realImage' ? '#FF5500' : '#FFFFFF',
              color: viewMode === 'realImage' ? '#FFFFFF' : '#334155',
              border: '1px solid',
              borderColor: viewMode === 'realImage' ? '#FF5500' : '#E2E8F0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Eye size={14} />
            <span>Real Software Capture</span>
          </button>
        </div>

        {/* Interactive Top 10 Mapper Demo */}
        <div className={styles.interactiveGrid}>
          {/* Left: Smart Batch Mapper Card */}
          <div ref={cardRef} className={styles.mapperCard}>
            <div className={styles.mapperHeader}>
              <div className={styles.fileBadge}>
                <FileSpreadsheet size={16} color="#16A34A" />
                <span>BOM_Statement_May2026.xlsx</span>
              </div>
              <span className={styles.progressTag}>
                {viewMode === 'realImage' ? 'REAL SOFTWARE SCREENSHOT' : 'Auto-Mapper Active'}
              </span>
            </div>

            {viewMode === 'realImage' ? (
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#0F172A' }}>
                <img
                  src={top10PicksDropdown}
                  alt="Real RecoBit Smart Batch Mapper Top 10 Picks"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: '#F8FAFC',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '0.8rem',
                    color: '#64748B',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Software Capture: Top 10 Ranked Counterparty Suggestions</span>
                  <span style={{ color: '#FF5500', fontWeight: 700 }}>Confidence: 99% — 68%</span>
                </div>
              </div>
            ) : (
              <>
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
                    <span>RecoBit Ranked Suggestions</span>
                    <span style={{ color: '#FF5500' }}>1-Click Confirm</span>
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
              </>
            )}
          </div>

          {/* Right: Explainer Column */}
          <div ref={explainerRef} className={styles.explainerCol}>
            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Zap size={18} />
              </div>
              <h3 className={styles.explainerTitle}>Instant Semantic Recognition</h3>
              <p className={styles.explainerDesc}>
                Extracts counterparty names, payment channels (UPI/NEFT/RTGS), and invoice hashes automatically.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Target size={18} />
              </div>
              <h3 className={styles.explainerTitle}>Single-Click Decision</h3>
              <p className={styles.explainerDesc}>
                Replaces 5 minutes of repetitive chart-of-accounts scrolling with one decisive click.
              </p>
            </div>

            <div className={styles.explainerCard}>
              <div className={styles.explainerIcon}>
                <Layers size={18} />
              </div>
              <h3 className={styles.explainerTitle}>Parallel Scalability (10,000+ Rows)</h3>
              <p className={styles.explainerDesc}>
                Scales seamlessly from 50 monthly entries to tens of thousands across multi-bank entities.
              </p>
            </div>
          </div>
        </div>

        {/* Real Product Proof Video Frame */}
        <div className={styles.videoSection}>
          <ProductVideoFrame
            src={bankImportVideo.src}
            poster={bankImportVideo.poster}
            title={bankImportVideo.title}
            subtitle={bankImportVideo.subtitle}
            badge="REAL PRODUCT PROOF — SMART BATCH MAPPER"
            urlPath="app.recobit.fi/transactions/batch-mapper"
          />
        </div>
      </div>
    </section>
  );
};
