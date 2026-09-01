'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Check, CheckCheck, Clock, Layers, Lock } from 'lucide-react';
import { OrbitalVault3D } from '@/components/3d/OrbitalVault3D';
import styles from './Act3ReconciliationTheatre.module.css';

gsap.registerPlugin(ScrollTrigger);

const segregationCategories = [
  {
    id: 'matched',
    title: '1. Matched Entries',
    count: '262 Records',
    amount: '₹1.84 Cr Total',
    status: '99% Auto-Reconciled',
    desc: 'Deterministic math + semantic patterns match bank & ledger amounts and dates with zero human intervention.',
    color: '#10B981',
    accentClass: styles.tagMatched,
  },
  {
    id: 'unmatched',
    title: '2. Unmatched Exceptions',
    count: '126 Records',
    amount: 'Grouped Clusters',
    status: 'Ready for 1-Click Resolve',
    desc: 'Auto-clustered by narration typo, timing lag, or party alias for instant bulk resolution.',
    color: '#F59E0B',
    accentClass: styles.tagMismatch,
  },
  {
    id: 'missing_books',
    title: '3. Missing in Books',
    count: '0 Pending',
    amount: 'Clear',
    status: 'Auto-Created',
    desc: 'Auto-drafts missing ERP vouchers so you never lose track of untracked bank debits.',
    color: '#64748B',
    accentClass: styles.tagBankCharge,
  },
  {
    id: 'missing_stmt',
    title: '4. Missing in Statement',
    count: '5 Records',
    amount: 'In Transit',
    status: 'Lag Monitored',
    desc: 'Tracks unpresented cheques and in-transit transfers across clearing cycles automatically.',
    color: '#0284C7',
    accentClass: styles.tagMatched,
  },
  {
    id: 'bank_charges',
    title: '5. Bank Charges',
    count: '71 Records',
    amount: 'Auto-Grouped',
    status: '1-Click Voucher Push',
    desc: 'Identifies GST, RTGS fees, and interest debits and routes them directly to bank charge expense ledgers.',
    color: '#8B5CF6',
    accentClass: styles.tagBankCharge,
  },
];

export const Act3ReconciliationTheatre: React.FC = () => {
  const [bulkResolved, setBulkResolved] = useState(false);
  const [activePod, setActivePod] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const vaultCardRef = useRef<HTMLDivElement>(null);
  const podsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(vaultCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(podsRef.current, {
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

        {/* 3D Orbital Vault Core Card */}
        <div
          ref={vaultCardRef}
          style={{
            background: 'linear-gradient(145deg, #070B14 0%, #0F172A 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 85, 0, 0.28)',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(255, 85, 0, 0.12)',
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
              <span style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.03em' }}>
                3D AUTOMATED RECONCILIATION VAULT
              </span>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: bulkResolved ? '#10B981' : '#FF7A33',
                background: bulkResolved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 85, 0, 0.15)',
                border: bulkResolved ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 85, 0, 0.3)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
              }}
            >
              {bulkResolved ? '✓ 100% RECONCILED & ERP SYNCED' : '56.5% RECONCILED • READY FOR BULK TRIAGE'}
            </span>
          </div>

          {/* 3D High-Fidelity Orbital Vault Model Canvas */}
          <OrbitalVault3D isReconciled={bulkResolved} />

          <div
            style={{
              padding: '1rem 1.5rem',
              background: '#040711',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: '#94A3B8',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#FF7A33', fontWeight: 600 }}>● Bank Stream Vector</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>● ERP Ledger Vector</span>
              <span style={{ color: '#F59E0B', fontWeight: 600 }}>● 5 Segregated Financial Buckets</span>
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>85–95% Time Reduction</span>
          </div>
        </div>

        {/* 5 Segregation Feature Pods (Ultra-Clean Luxury Cards) */}
        <div ref={podsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {segregationCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => setActivePod(idx)}
              style={{
                background: activePod === idx ? '#FFF7ED' : 'rgba(255, 255, 255, 0.95)',
                border: activePod === idx ? '1px solid #FF5500' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem',
                boxShadow: activePod === idx ? '0 10px 25px rgba(255, 85, 0, 0.12)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginTop: '0.2rem' }}>
                  {cat.count}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color, marginTop: '0.15rem' }}>
                  {cat.status}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, marginTop: '0.5rem' }}>
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 1-Click Bulk Action Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            border: '1px solid rgba(255, 85, 0, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={22} color="#10B981" />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>
                {bulkResolved
                  ? 'All 96 Mismatches Resolved & Synchronized to Tally Prime'
                  : 'Automated Exception Cluster: 96 Narration Mismatches identified'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                One click confirms ranked suggestions for entire batches simultaneously.
              </div>
            </div>
          </div>

          {bulkResolved ? (
            <div
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Check size={16} />
              <span>Voucher Posted: BRN0426/2578</span>
            </div>
          ) : (
            <button className={styles.bulkResolveBtn} onClick={handleBulkResolve}>
              <Sparkles size={16} />
              <span>1-Click Bulk Resolve (96 records)</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Demo Curiosity Teaser Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 85, 0, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)',
            border: '1px solid rgba(255, 85, 0, 0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Want to see RecoBit running on your own company’s bank statements?
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '0.2rem' }}>
              We will set up a live private session with your actual statement format and ERP ledgers.
            </div>
          </div>
          <a
            href="#book-demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--brand-orange-gradient)',
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-orange-glow)',
            }}
          >
            <span>Book Private Walkthrough</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
