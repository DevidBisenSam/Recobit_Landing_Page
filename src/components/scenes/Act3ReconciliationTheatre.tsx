'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check, Eye, SlidersHorizontal, Layers, Building2, Landmark } from 'lucide-react';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Act3ReconciliationTheatre.module.css';

gsap.registerPlugin(ScrollTrigger);

const segregationCategories = [
  { id: 'matched', label: 'Matched', count: 262, status: '99% Auto-Aligned', color: '#10B981' },
  { id: 'unmatched', label: 'Unmatched', count: 126, status: 'Needs Review', color: '#F59E0B' },
  { id: 'missing_books', label: 'Missing in Books', count: 0, status: '0 Pending', color: '#64748B' },
  { id: 'missing_stmt', label: 'Missing in Stmt', count: 5, status: 'In Transit', color: '#0284C7' },
  { id: 'bank_charges', label: 'Bank Charges', count: 71, status: 'Auto-Grouped', color: '#8B5CF6' },
];

const sampleEntries = [
  {
    id: 1,
    category: 'matched',
    tagText: '99% AUTO-ALIGNED MATCH',
    tagClass: styles.tagMatched,
    amount: '₹1,25,00,000.00',
    bank: {
      date: '30 May 2026',
      narr: 'RTGS MAHBR52026053024064075 COROMANDEL INTERNATION SBIN0004266',
      source: 'Bank of Maharashtra Statement',
    },
    erp: {
      date: '30 May 2026',
      party: 'Coromandel International Limited (Pune)',
      ref: 'Vch BRN0426/2570 • Tally Prime',
    },
  },
  {
    id: 2,
    category: 'unmatched',
    tagText: 'NARRATION MISMATCH CLUSTER',
    tagClass: styles.tagMismatch,
    amount: '₹41,00,000.00',
    bank: {
      date: '30 May 2026',
      narr: 'RTGS MAHBR52026053024064369 DAFTARI AGRO PVT LTD',
      source: 'Bank of Maharashtra Statement',
    },
    erp: {
      date: '30 May 2026',
      party: 'Daftari Agro Private Limited (Wardha)',
      ref: 'Vch BRN0426/2571 • Tally Prime',
    },
  },
  {
    id: 3,
    category: 'bank_charges',
    tagText: 'AUTO-IDENTIFIED BANK CHARGES',
    tagClass: styles.tagBankCharge,
    amount: '₹590.00',
    bank: {
      date: '30 May 2026',
      narr: 'CHG/MAHBR/RTGS CHARGES MAY 2026/GST 18%',
      source: 'Bank of Maharashtra Statement',
    },
    erp: {
      date: '30 May 2026',
      party: 'Bank Charges & Commission A/C',
      ref: 'Auto-Voucher Drafted',
    },
  },
];

export const Act3ReconciliationTheatre: React.FC = () => {
  const { reconciliationVideo } = mediaConfig.videos;
  const { reconciliationComparison } = mediaConfig.images;
  const [activeCategory, setActiveCategory] = useState('matched');
  const [bulkResolved, setBulkResolved] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'realImage'>('interactive');

  const sectionRef = useRef<HTMLDivElement>(null);
  const masterCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(masterCardRef.current, {
        scrollTrigger: {
          trigger: masterCardRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBulkResolve = () => {
    setBulkResolved(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF5500', '#10B981', '#0F172A', '#FFAA00'],
    });
  };

  const filteredEntries = sampleEntries.filter((e) =>
    activeCategory === 'matched' ? true : e.category === activeCategory
  );

  return (
    <section id="act-3-reconciliation" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <Zap size={15} />
            <span>ACT 3 / THE RECONCILIATION ENGINE</span>
          </div>
          <h2 className={styles.title}>
            Automatic Segregation. <span className="text-gradient-orange">Instant Bulk Resolution.</span>
          </h2>
          <p className={styles.body}>
            RecoBit automatically segregates thousands of lines into 5 distinct buckets. Your team focuses
            exclusively on exceptions, resolving entire clusters in a single bulk action.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', gap: '0.75rem' }}>
          <button
            onClick={() => setViewMode('interactive')}
            style={{
              padding: '0.4rem 0.95rem',
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
            <span>Live Segregation Engine</span>
          </button>
          <button
            onClick={() => setViewMode('realImage')}
            style={{
              padding: '0.4rem 0.95rem',
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
            <span>Real Software UI Capture</span>
          </button>
        </div>

        {/* Master Reconciliation Theatre Card */}
        <div ref={masterCardRef} className={styles.masterCard}>
          <div className={styles.cardTopBar}>
            <div className={styles.accountTitle}>
              BANK OF MAHARASHTRA CASH CREDIT A/C • RECONCILIATION SESSION
            </div>
            <div className={styles.topPills}>
              <span className={styles.feedPill}>Statement: 459</span>
              <span className={styles.feedPill}>Books: 4,348</span>
              <div className={styles.reconPercent}>
                {bulkResolved ? '100% Reconciled' : '56.5% Reconciled'}
              </div>
            </div>
          </div>

          {viewMode === 'realImage' ? (
            <div style={{ position: 'relative', width: '100%', background: '#0B0F17' }}>
              <img
                src={reconciliationComparison}
                alt="Real RecoBit Reconciliation Engine UI"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  background: '#F8FAFC',
                  borderTop: '1px solid #E2E8F0',
                  fontSize: '0.8rem',
                  color: '#475569',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <span>Live Software Capture: Bank Statement vs ERP Books Side-by-Side Verification</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>AI Match Confidence: 99% Verified</span>
              </div>
            </div>
          ) : (
            <>
              {/* 5 Segregation Pods */}
              <div className={styles.segregationPodsTrack}>
                {segregationCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.podBtn} ${activeCategory === cat.id ? styles.podBtnActive : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className={styles.podCount} style={{ color: activeCategory === cat.id ? '#FF5500' : undefined }}>
                      {cat.count}
                    </span>
                    <span className={styles.podLabel}>{cat.label}</span>
                    <span className={styles.podStatus}>{cat.status}</span>
                  </button>
                ))}
              </div>

              {/* Segregated Comparison Entries List */}
              <div className={styles.entriesList}>
                {filteredEntries.map((entry) => (
                  <div key={entry.id} className={styles.entryCard}>
                    <div className={styles.entryHeader}>
                      <span className={`${styles.categoryTag} ${entry.tagClass}`}>
                        <Sparkles size={12} />
                        <span>{entry.tagText}</span>
                      </span>
                      <span className={styles.amountDisplay}>{entry.amount}</span>
                    </div>

                    <div className={styles.twoSidesGrid}>
                      {/* Left: Bank Side */}
                      <div className={styles.sidePanel}>
                        <div className={styles.sideType}>
                          <Landmark size={13} color="#FF5500" />
                          <span>Bank Statement Line</span>
                        </div>
                        <div className={styles.sideMain}>{entry.bank.narr}</div>
                        <div className={styles.sideSub}>{entry.bank.date} • {entry.bank.source}</div>
                      </div>

                      {/* Right: ERP Side */}
                      <div className={styles.sidePanel}>
                        <div className={styles.sideType}>
                          <Building2 size={13} color="#10B981" />
                          <span>ERP General Ledger Match</span>
                        </div>
                        <div className={styles.sideMain}>{entry.erp.party}</div>
                        <div className={styles.sideSub}>{entry.erp.date} • {entry.erp.ref}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Interactive Bulk Action & ERP Sync Bar */}
              <div className={styles.triageBar}>
                <div className={styles.triageLeft}>
                  <ShieldCheck size={18} color="#10B981" />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    {bulkResolved
                      ? 'All 96 Mismatches Resolved & Synchronized to Tally Prime'
                      : 'Exception Group: 96 Narration Mismatches identified'}
                  </span>
                </div>

                {bulkResolved ? (
                  <div className={styles.pushedStatus}>
                    <Check size={15} />
                    <span>Pushed to ERP (Voucher Ref: BRN0426/2578)</span>
                  </div>
                ) : (
                  <button className={styles.bulkResolveBtn} onClick={handleBulkResolve}>
                    <Sparkles size={15} />
                    <span>1-Tap Bulk Resolve (96 records)</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Marquee Real Product Video Proof */}
        <div className={styles.videoContainer}>
          <ProductVideoFrame
            src={reconciliationVideo.src}
            poster={reconciliationVideo.poster}
            title={reconciliationVideo.title}
            subtitle={reconciliationVideo.subtitle}
            badge="MARQUEE PRODUCT PROOF — HYBRID RECONCILIATION"
            urlPath="app.recobit.fi/reconcile/session-active"
          />
        </div>
      </div>
    </section>
  );
};
