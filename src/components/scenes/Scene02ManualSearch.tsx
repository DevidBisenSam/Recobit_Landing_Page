'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Scene02ManualSearch.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene02ManualSearch: React.FC = () => {
  const { scene02ManualSearch } = storyContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(narrativeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
    <section id="the-problem" ref={sectionRef} className={styles.sceneWrapper}>
      <div className={styles.gridOverlay} />
      <div className="container">
        <div className={styles.sceneLayout}>
          {/* Narrative Column */}
          <div ref={narrativeRef} className={styles.narrativeCol}>
            <div className={styles.sceneTag}>
              <AlertCircle size={15} color="#EF4444" />
              <span>{scene02ManualSearch.tag}</span>
            </div>

            <h2 className={styles.sceneTitle}>{scene02ManualSearch.title}</h2>

            <p className={styles.sceneBody}>{scene02ManualSearch.body}</p>

            <div className={styles.painHighlight}>
              <AlertTriangle size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>80% of Reconciliation Time</strong> is spent searching and cross-referencing
                cryptic bank narrations against endless accounting ledgers.
              </div>
            </div>
          </div>

          {/* Interactive Search Simulator */}
          <div ref={cardRef} className={styles.simulationCard}>
            <div className={styles.cardHeader}>
              <span>ERP MANUAL LEDGER LOOKUP</span>
              <span className={styles.incomingBadge}>UNRESOLVED VOUCHER</span>
            </div>

            {/* Inbound Transaction Narration */}
            <div className={styles.incomingTxnRow}>
              <span className={styles.txnLabel}>Raw Bank Statement Narration:</span>
              <div className={styles.txnNarration}>
                UPI/394805395421/HDFC/SHREE COLLECTION/Cs
              </div>
            </div>

            {/* Simulated Search Box with Confusing Options */}
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  readOnly
                  value={scene02ManualSearch.searchSimulation.query}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.resultCountText}>
                <HelpCircle size={14} />
                <span>
                  Found {scene02ManualSearch.searchSimulation.totalCandidates} matching ledgers across
                  chart of accounts
                </span>
              </div>

              <ul className={styles.candidatesList}>
                {scene02ManualSearch.searchSimulation.confusingOptions.map((item, idx) => (
                  <li key={idx} className={styles.candidateItem}>
                    <div className={styles.candidateInfo}>
                      <span className={styles.candidateCode}>{item.code}</span>
                      <span className={styles.candidateName}>{item.name}</span>
                    </div>
                    <span className={styles.candidateMatch}>{item.match} match</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Fatigue Status */}
            <div className={styles.fatigueFooter}>
              <span>⚠️ Manual verification required for each line</span>
              <span>Avg 4–8 hours / account</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
