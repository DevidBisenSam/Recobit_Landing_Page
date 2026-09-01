'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, AlertTriangle, FileSpreadsheet, FileText, Lock, Search, HelpCircle } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Act1ChaosEngine.module.css';

gsap.registerPlugin(ScrollTrigger);

const conflictingLedgers = [
  { code: 'L-0842', name: 'Shree Collection Traders Pvt Ltd (Pune)', match: '62%' },
  { code: 'L-1190', name: 'Shree Collections Retail A/C (Nagpur)', match: '58%' },
  { code: 'L-2451', name: 'Shree Krishna Collections (Bhandara)', match: '45%' },
  { code: 'L-3012', name: 'Shree Laxmi Collection Agency', match: '34%' },
  { code: 'L-0104', name: 'Shree Ram Collection Account', match: '28%' },
];

export const Act1ChaosEngine: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(rightColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="act-1-chaos" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <AlertCircle size={15} />
            <span>ACT 1 / THE BOTTLENECK</span>
          </div>
          <h2 className={styles.title}>
            Endless statement formats. <span style={{ color: '#EF4444' }}>3,000+ conflicting ledgers.</span>
          </h2>
          <p className={styles.body}>
            Every day, financial teams face hundreds of unstructured bank lines. Reformatting messy PDFs and
            manually hunting down the exact ledger in your ERP drains hours and introduces fatal closing errors.
          </p>
        </div>

        {/* Unified Chaos Grid */}
        <div className={styles.chaosGrid}>
          {/* Left Column: Format Friction */}
          <div ref={leftColRef} className={styles.formatCol}>
            <div className={styles.frictionCard}>
              <div className={styles.frictionIcon} style={{ background: '#FEE2E2', color: '#DC2626' }}>
                <FileText size={20} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>Unstructured Bank PDFs</span>
                <span className={styles.cardDesc}>
                  Embedded scan tables and non-standard columns break copy-paste scripts.
                </span>
              </div>
            </div>

            <div className={styles.frictionCard}>
              <div className={styles.frictionIcon} style={{ background: '#DCFCE7', color: '#16A34A' }}>
                <FileSpreadsheet size={20} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>Multi-Sheet Excel Workbooks</span>
                <span className={styles.cardDesc}>
                  Merged headers and varying date formats trigger silent upload rejections.
                </span>
              </div>
            </div>

            <div className={styles.frictionCard}>
              <div className={styles.frictionIcon} style={{ background: '#FEF3C7', color: '#D97706' }}>
                <Lock size={20} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>Encrypted Password Statements</span>
                <span className={styles.cardDesc}>
                  Daily email decryption creates friction before reconciliation even starts.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3,412 Candidates Ledger Maze */}
          <div ref={rightColRef} className={styles.mazeCard}>
            <div className={styles.mazeHeader}>
              <span className={styles.mazeTitle}>Manual ERP Ledger Search</span>
              <span className={styles.mazeBadge}>UNRESOLVED VOUCHER</span>
            </div>

            <div className={styles.rawTxnBar}>
              <span className={styles.rawLabel}>Incoming Bank Narration:</span>
              <div className={styles.rawNarration}>
                UPI/394805395421/HDFC/SHREE COLLECTION/Cs
              </div>
            </div>

            <div className={styles.searchBoxArea}>
              <div className={styles.inputWrapper}>
                <Search size={15} className={styles.searchIcon} />
                <input
                  type="text"
                  readOnly
                  value="SHREE COLL"
                  className={styles.searchField}
                />
              </div>

              <div className={styles.matchCountBanner}>
                <HelpCircle size={14} />
                <span>Found 3,412 conflicting candidates in Chart of Accounts</span>
              </div>

              <ul className={styles.optionsList}>
                {conflictingLedgers.map((item, idx) => (
                  <li key={idx} className={styles.optionItem}>
                    <div>
                      <div className={styles.optionName}>{item.name}</div>
                      <div className={styles.optionCode}>{item.code}</div>
                    </div>
                    <span className={styles.optionMatch}>{item.match} match</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mazeFooter}>
              <span>⚠️ 80% of reconciliation time is spent here</span>
              <span>4–8 hrs / account</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
