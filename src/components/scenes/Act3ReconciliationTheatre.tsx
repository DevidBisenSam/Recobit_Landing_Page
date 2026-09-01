'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check, Landmark, Building2, Layers, Clock, AlertTriangle, Receipt } from 'lucide-react';
import styles from './Act3ReconciliationTheatre.module.css';

gsap.registerPlugin(ScrollTrigger);

const segregationCategories = [
  {
    id: 'matched',
    title: '1. Matched Entries',
    shortTitle: 'Matched Entries',
    count: '262 Records',
    status: '99% Auto-Aligned',
    statusColor: '#10B981',
    desc: 'Deterministic math + semantic patterns auto-reconcile bank & ledger entries without human intervention.',
    icon: CheckCircle2,
    bankExample: 'RTGS MAHBR52026053024064075 COROMANDEL INTERNATION',
    erpExample: 'Coromandel International Limited (Pune) • Vch #2570',
    amount: '₹1,25,00,000.00',
  },
  {
    id: 'unmatched',
    title: '2. Unmatched Exceptions',
    shortTitle: 'Unmatched Exceptions',
    count: '126 Records',
    status: 'Ready for 1-Click Triage',
    statusColor: '#F59E0B',
    desc: 'Auto-clustered by narration typo, date lag, or counterparty alias for 1-tap bulk resolution.',
    icon: AlertTriangle,
    bankExample: 'RTGS MAHBR52026053024064369 DAFTARI AGRO PVT LTD',
    erpExample: 'Daftari Agro Private Limited (Wardha) • Vch #2571',
    amount: '₹41,00,000.00',
  },
  {
    id: 'missing_books',
    title: '3. Missing in Books',
    shortTitle: 'Missing in Books',
    count: '0 Pending',
    status: 'Auto-Drafted Vouchers',
    statusColor: '#64748B',
    desc: 'Auto-drafts missing ERP vouchers so you never lose track of untracked bank receipts or debits.',
    icon: Layers,
    bankExample: 'Direct NEFT Inflow from Regional Vendor #892',
    erpExample: 'Auto-Generates Draft ERP Receipt Voucher',
    amount: '₹3,50,000.00',
  },
  {
    id: 'missing_stmt',
    title: '4. Missing in Statement',
    shortTitle: 'Missing in Statement',
    count: '5 Records',
    status: 'Clearing In-Transit',
    statusColor: '#0284C7',
    desc: 'Monitors issued cheques and in-transit transfers across clearing cycles automatically.',
    icon: Clock,
    bankExample: 'Awaiting Bank Clearing Cycle Confirmation',
    erpExample: 'Outward Cheque Payment Vch #CHQ-99182',
    amount: '₹18,20,000.00',
  },
  {
    id: 'bank_charges',
    title: '5. Bank Charges',
    shortTitle: 'Bank Charges',
    count: '71 Records',
    status: 'Auto-Grouped Fees',
    statusColor: '#8B5CF6',
    desc: 'Isolates GST, RTGS fees, and loan interest debits and routes them directly to bank charge expense ledgers.',
    icon: Receipt,
    bankExample: 'CHG/MAHBR/RTGS CHARGES MAY 2026/GST 18%',
    erpExample: 'Bank Charges & Commission Expense Account',
    amount: '₹590.00',
  },
];

export const Act3ReconciliationTheatre: React.FC = () => {
  const [activePodIdx, setActivePodIdx] = useState(0);
  const [bulkResolved, setBulkResolved] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(panelRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
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

  const handleBulkResolve = () => {
    setBulkResolved(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#FF5500', '#10B981', '#0F172A', '#FFAA00'],
    });
  };

  const currentCat = segregationCategories[activePodIdx];
  const IconComp = currentCat.icon;

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

        {/* 5 Segregation Pods Grid */}
        <div ref={gridRef} className={styles.segregationGrid}>
          {segregationCategories.map((cat, idx) => {
            const CatIcon = cat.icon;
            const isActive = activePodIdx === idx;
            return (
              <div
                key={cat.id}
                className={`${styles.podCard} ${isActive ? styles.podCardActive : ''}`}
                onClick={() => setActivePodIdx(idx)}
              >
                <div>
                  <div className={styles.podHeader}>
                    <span className={styles.podNumber}>Bucket 0{idx + 1}</span>
                    <CatIcon size={16} color={isActive ? '#FF5500' : cat.statusColor} />
                  </div>
                  <div className={styles.podTitle}>{cat.title}</div>
                  <div className={styles.podCountLarge}>{cat.count}</div>
                  <div className={styles.podStatus} style={{ color: cat.statusColor }}>
                    {cat.status}
                  </div>
                  <p className={styles.podDesc}>{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Live Transformation Showcase Panel */}
        <div ref={panelRef} className={styles.featuredDisplayPanel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderTitle}>
              <IconComp size={18} color="#FF5500" />
              <span>Live Demonstration • {currentCat.title}</span>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: currentCat.statusColor,
                background: '#F1F5F9',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
              }}
            >
              {currentCat.status}
            </span>
          </div>

          <div className={styles.panelContent}>
            <div className={styles.sideBySideFlow}>
              {/* Left Side: Bank Feed */}
              <div className={styles.sideCard}>
                <div className={styles.sideTypeTag}>
                  <Landmark size={14} color="#FF5500" />
                  <span>Inbound Bank Feed</span>
                </div>
                <div className={styles.sideHeading}>{currentCat.bankExample}</div>
                <div className={styles.sideMeta}>Bank Statement Source • Amount: {currentCat.amount}</div>
              </div>

              {/* Center Match Alignment Bridge */}
              <div className={styles.flowConnector}>
                <div className={styles.matchBadge}>
                  <Sparkles size={13} />
                  <span>⇄ Auto-Aligned Match</span>
                </div>
              </div>

              {/* Right Side: ERP Books Match */}
              <div className={styles.sideCard}>
                <div className={styles.sideTypeTag}>
                  <Building2 size={14} color="#10B981" />
                  <span>ERP General Ledger</span>
                </div>
                <div className={styles.sideHeading}>{currentCat.erpExample}</div>
                <div className={styles.sideMeta}>Tally Prime / ERP • Amount: {currentCat.amount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Click Bulk Action Bar */}
        <div className={styles.bulkActionRow}>
          <div className={styles.bulkActionLeft}>
            <ShieldCheck size={22} color="#10B981" />
            <div>
              <div className={styles.bulkActionTitle}>
                {bulkResolved
                  ? 'All 96 Exceptions Resolved & Synchronized with Tally Prime'
                  : 'Automated Exception Cluster: 96 Narration Mismatches Identified'}
              </div>
              <div className={styles.bulkActionSubtitle}>
                One click confirms ranked suggestions for entire batches simultaneously.
              </div>
            </div>
          </div>

          {bulkResolved ? (
            <div className={styles.resolvedBadge}>
              <Check size={16} />
              <span>Vouchers Posted: BRN0426/2578</span>
            </div>
          ) : (
            <button className={styles.bulkResolveBtn} onClick={handleBulkResolve}>
              <Sparkles size={16} />
              <span>1-Click Bulk Resolve (96 records)</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Demo Curiosity Teaser */}
        <div className={styles.curiosityTeaser}>
          <div>
            <div className={styles.teaserHeading}>
              Want to see RecoBit running on your own company’s bank statements?
            </div>
            <div className={styles.teaserSub}>
              We will set up a live private session with your actual statement format and ERP ledgers.
            </div>
          </div>
          <a href="#book-demo" className={styles.teaserBtn}>
            <span>Book Private Walkthrough</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
