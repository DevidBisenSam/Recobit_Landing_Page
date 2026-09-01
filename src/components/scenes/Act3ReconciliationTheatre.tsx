'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Act3ReconciliationTheatre.module.css';

gsap.registerPlugin(ScrollTrigger);

const sampleMatches = [
  {
    bankDate: '2026-05-30',
    bankNarr: 'RTGS MAHBR52026053024064075 COROMANDEL INTERNATION SBIN0004266',
    bankAmount: '₹1,25,00,000.00',
    erpDate: '2026-05-30',
    erpNarr: 'BEING AMT ISSUE TOWARDS SUPPLY OF FERTI GAYU',
    erpParty: 'Coromandel International Limited, Pune',
    erpAmount: '₹1,25,00,000.00',
    confidence: '99% MATCH',
    matchedFields: 'Amount, Date, Narration',
  },
  {
    bankDate: '2026-05-30',
    bankNarr: 'RTGS MAHBR52026053024064369 DAFTARI AGRO PVT LTD PUNB0046700',
    bankAmount: '₹41,00,000.00',
    erpDate: '2026-05-30',
    erpNarr: 'BEING AMT ISSUE TOWARDS SUPPLY OF SEED AGNST 8% CD GAYU',
    erpParty: 'Daftari Agro Private Limited, Wardha',
    erpAmount: '₹41,00,000.00',
    confidence: '98% MATCH',
    matchedFields: 'Amount, Date, Narration',
  },
  {
    bankDate: '2026-05-30',
    bankNarr: 'RTGS MAHBR52026053024072705 MAHINDRA AGRI SOLUTION HDFC0000007',
    bankAmount: '₹31,50,000.00',
    erpDate: '2026-05-30',
    erpNarr: 'BEING AMT ISSUE TOWARDS SUPPLY OF SEED AGNST 8% CD GAYU',
    erpParty: 'Mahindra Agri Solutions Limited, Mumbai',
    erpAmount: '₹31,50,000.00',
    confidence: '98% MATCH',
    matchedFields: 'Amount, Date, Narration',
  },
];

export const Act3ReconciliationTheatre: React.FC = () => {
  const { scene07Reconciliation } = storyContent;
  const { reconciliationVideo } = mediaConfig.videos;
  const [activeTab, setActiveTab] = useState('matched');
  const [bulkResolved, setBulkResolved] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const masterCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(masterCardRef.current, {
        scrollTrigger: {
          trigger: masterCardRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBulkResolve = () => {
    setBulkResolved(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF5500', '#10B981', '#0F172A'],
    });
  };

  return (
    <section id="act-3-reconciliation" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <Zap size={15} />
            <span>ACT 3 / THE RECONCILIATION THEATRE</span>
          </div>
          <h2 className={styles.title}>
            Two worlds aligned: <span className="text-gradient-orange">Bank Statement vs ERP Books.</span>
          </h2>
          <p className={styles.body}>
            Deterministic mathematical verification pairs with semantic AI to reconcile feeds at 98–99% confidence.
            Users focus solely on exceptions and resolve clusters in bulk.
          </p>
        </div>

        {/* Master Reconciliation Theatre Card */}
        <div ref={masterCardRef} className={styles.masterCard}>
          <div className={styles.cardTopBar}>
            <div className={styles.accountTitle}>
              BANK OF MAHARASHTRA CASH CREDIT A/C NO 60306318689
            </div>
            <div className={styles.topPills}>
              <span className={styles.feedPill}>Bank: 459</span>
              <span className={styles.feedPill}>Books: 4,348</span>
              <div className={styles.reconPercent}>
                {bulkResolved ? '100% Reconciled' : '56.5% Reconciled'}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {scene07Reconciliation.categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tabBtn} ${activeTab === cat.id ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.label}</span>
                <span className={styles.tabBadge}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Side by Side Matches */}
          <div>
            {sampleMatches.map((row, idx) => (
              <div key={idx} className={styles.matchRow}>
                {/* Left: Bank Statement Feed */}
                <div className={styles.sideBox}>
                  <span className={styles.sideLabel}>Bank Statement (Source Feed)</span>
                  <span className={styles.sideDate}>{row.bankDate}</span>
                  <span className={styles.sideNarr}>{row.bankNarr}</span>
                  <span className={styles.sideAmt}>{row.bankAmount}</span>
                  <div className={styles.confidenceTag}>
                    <Sparkles size={12} />
                    <span>{row.confidence} ({row.matchedFields})</span>
                  </div>
                </div>

                {/* Right: ERP General Ledger */}
                <div className={styles.sideBox}>
                  <span className={styles.sideLabel}>Accounting Books (ERP Voucher)</span>
                  <span className={styles.sideDate}>{row.erpDate}</span>
                  <span className={styles.sideNarr}>{row.erpNarr}</span>
                  <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                    {row.erpParty}
                  </span>
                  <span className={styles.sideAmt}>{row.erpAmount}</span>
                </div>

                {/* Action */}
                <div className={styles.actionCol}>
                  <button className={styles.resolveBtn}>
                    <CheckCircle2 size={14} />
                    <span>MARK RESOLVED</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Interactive Bulk Action & ERP Sync Bar */}
          <div className={styles.triageBar}>
            <div className={styles.triageLeft}>
              <ShieldCheck size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                Exception Clusters: 96 Narration Mismatches identified
              </span>
            </div>

            {bulkResolved ? (
              <div className={styles.pushedStatus}>
                <Check size={15} />
                <span>All 96 Mismatches Resolved & Pushed to ERP (Vch BRN0426/2578)</span>
              </div>
            ) : (
              <button className={styles.bulkResolveBtn} onClick={handleBulkResolve}>
                <Sparkles size={15} />
                <span>1-Click Bulk Resolve (96 records)</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
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
