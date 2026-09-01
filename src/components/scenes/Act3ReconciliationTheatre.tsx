'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check, Landmark, Building2 } from 'lucide-react';
import { ReconciliationVisualizer3D } from '@/components/3d/ReconciliationVisualizer3D';
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
      narr: 'RTGS MAHBR52026053024064075 COROMANDEL INTERNATION',
      source: 'Bank Statement Stream',
    },
    erp: {
      date: '30 May 2026',
      party: 'Coromandel International Limited (Pune)',
      ref: 'Tally Prime / ERP Voucher',
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
      source: 'Bank Statement Stream',
    },
    erp: {
      date: '30 May 2026',
      party: 'Daftari Agro Private Limited (Wardha)',
      ref: 'Tally Prime / ERP Voucher',
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
      source: 'Bank Statement Stream',
    },
    erp: {
      date: '30 May 2026',
      party: 'Bank Charges & Commission A/C',
      ref: 'Auto-Grouped Voucher',
    },
  },
];

export const Act3ReconciliationTheatre: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('matched');
  const [bulkResolved, setBulkResolved] = useState(false);

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
      particleCount: 80,
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
            RecoBit automatically segregates thousands of records into 5 distinct buckets. Your team focuses
            exclusively on exceptions, resolving entire clusters in a single bulk action.
          </p>
        </div>

        {/* 3D Dual-Stream Alignment Hologram Card */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.96)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 85, 0, 0.25)',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 35px rgba(255, 85, 0, 0.12)',
            overflow: 'hidden',
            marginBottom: '2rem',
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
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} color="#FF7A33" />
              <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                3D Dual-Stream Alignment Engine
              </span>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: bulkResolved ? '#10B981' : '#FF7A33',
                background: bulkResolved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 85, 0, 0.15)',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
              }}
            >
              {bulkResolved ? '✓ 100% RECONCILED' : '56.5% RECONCILED'}
            </span>
          </div>

          <ReconciliationVisualizer3D isReconciled={bulkResolved} />

          <div
            style={{
              padding: '0.85rem 1.5rem',
              background: '#0B0F17',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: '#94A3B8',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <span style={{ color: '#FF7A33' }}>● Bank Statement Stream</span>
              <span style={{ color: '#10B981' }}>● ERP Books Stream</span>
            </div>
            <span style={{ color: '#E2E8F0', fontWeight: 600 }}>Deterministic & Semantic AI Alignment</span>
          </div>
        </div>

        {/* Master Reconciliation Theatre Card */}
        <div ref={masterCardRef} className={styles.masterCard}>
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
                  ? 'All 96 Mismatches Resolved & Synchronized to Tally Prime / ERP'
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
        </div>

        {/* Demo Curiosity Teaser Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 85, 0, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)',
            border: '1px solid rgba(255, 85, 0, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
              Want to see how RecoBit handles your custom multi-bank statement rules?
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Experience complete end-to-end reconciliation on your actual ledger structure during a private demo.
            </div>
          </div>
          <a
            href="#book-demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--brand-orange-gradient)',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(255, 85, 0, 0.25)',
            }}
          >
            <span>Request Demo Walkthrough</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};
