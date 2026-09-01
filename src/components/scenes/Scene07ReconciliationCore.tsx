'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Scene07ReconciliationCore.module.css';

gsap.registerPlugin(ScrollTrigger);

const sampleMatches = [
  {
    bankDate: '2026-05-30',
    bankNarr: 'RTGS MAHBR52026053024064075 COROMANDEL INTERNATION SBIN0004266',
    bankAmount: '₹1,25,00,000.00',
    erpDate: '2026-05-30',
    erpNarr: 'BEING AMT ISSUE TOWARDS SUPPLY OF FERTI GAYU',
    erpParty: 'Coromandel International Limited, Pune (Ferti - Bhandara)',
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
    erpParty: 'Daftari Agro Private Limited, Wardha (Seed - Bhandara)',
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

export const Scene07ReconciliationCore: React.FC = () => {
  const { scene07Reconciliation } = storyContent;
  const { reconciliationVideo } = mediaConfig.videos;
  const [activeTab, setActiveTab] = useState('matched');

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reconciliation" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.tag}>{scene07Reconciliation.tag}</div>
          <h2 className={styles.title}>{scene07Reconciliation.title}</h2>
          <p className={styles.body}>{scene07Reconciliation.body}</p>
        </div>

        {/* Side by Side Reconcile Match Card */}
        <div ref={cardRef} className={styles.reconcileCard}>
          <div className={styles.cardTop}>
            <div className={styles.accountName}>
              BANK OF MAHARASHTRA CASH CREDIT A/C NO 60306318689
            </div>
            <div className={styles.balancePills}>
              <span className={styles.bankPill}>Bank: 459</span>
              <span className={styles.bankPill}>Books: 4,348</span>
              <div className={styles.reconPercent}>56.5% Reconciled</div>
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

          {/* Match Entries */}
          <div>
            {sampleMatches.map((row, idx) => (
              <div key={idx} className={styles.matchRow}>
                {/* Left: Bank Statement */}
                <div className={styles.sideBox}>
                  <span className={styles.sideLabel}>Bank Statement (Source Feed)</span>
                  <span className={styles.sideDate}>{row.bankDate}</span>
                  <span className={styles.sideNarration}>{row.bankNarr}</span>
                  <span className={styles.sideAmount}>{row.bankAmount}</span>
                  <div className={styles.confidenceTag}>
                    <Sparkles size={12} />
                    <span>{row.confidence} ({row.matchedFields})</span>
                  </div>
                </div>

                {/* Right: Accounting Books */}
                <div className={styles.sideBox}>
                  <span className={styles.sideLabel}>Accounting Books (ERP Voucher)</span>
                  <span className={styles.sideDate}>{row.erpDate}</span>
                  <span className={styles.sideNarration}>{row.erpNarr}</span>
                  <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                    {row.erpParty}
                  </span>
                  <span className={styles.sideAmount}>{row.erpAmount}</span>
                </div>

                {/* Action */}
                <div className={styles.actionCol}>
                  <button className={styles.resolveBtn}>
                    <CheckCircle size={14} />
                    <span>MARK RESOLVED</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Product Proof Video Frame */}
        <div className={styles.videoContainer}>
          <ProductVideoFrame
            src={reconciliationVideo.src}
            poster={reconciliationVideo.poster}
            title={reconciliationVideo.title}
            subtitle={reconciliationVideo.subtitle}
            badge="MARQUEE PRODUCT PROOF — RECONCILIATION ENGINE"
            urlPath="app.recobit.fi/reconcile/session-active"
          />
        </div>
      </div>
    </section>
  );
};
