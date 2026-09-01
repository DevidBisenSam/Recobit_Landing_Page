'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, LineChart, ShieldCheck, Sparkles, UserCheck, Database, ArrowRight, CheckCircle2, DollarSign, Wallet } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import styles from './Act4CommandAndAi.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Act4CommandAndAi: React.FC = () => {
  const { scene13AiAgent } = storyContent;
  const [activeQuery, setActiveQuery] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentPrompt = scene13AiAgent.samplePrompts[activeQuery];

  return (
    <section id="act-4-command" ref={sectionRef} className={styles.sceneWrapper}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sceneHeader}>
          <div className={styles.actTag}>
            <LineChart size={15} />
            <span>ACT 4 / COMMAND & FINANCIAL AI INTELLIGENCE</span>
          </div>
          <h2 className={styles.title}>
            Complete operational visibility. <span className="text-gradient-orange">Grounded Domain AI.</span>
          </h2>
          <p className={styles.body}>
            Leadership gains instant real-time clarity over company bank balances, operator throughput,
            Maker-Checker authorizations, and natural-language financial intelligence.
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className={styles.dualPanelGrid}>
          {/* Left Panel: Executive Command Metrics Card */}
          <div ref={leftRef} className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Multi-Bank Command Hub</span>
              <span className={styles.panelBadge}>LIVE VISIBILITY</span>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#FAFAFB' }}>
              {/* Account Balance Card 1 */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>
                    Bank of Maharashtra • Cash Credit
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    A/C 60306318689 • 459 Stmt Lines
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                    ₹4.82 Cr CR
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>
                    100% Reconciled
                  </div>
                </div>
              </div>

              {/* Account Balance Card 2 */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A' }}>
                    HDFC Bank • Main Operational A/C
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    A/C 5020003182 • 1,280 Stmt Lines
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                    ₹12.45 Cr CR
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>
                    100% Reconciled
                  </div>
                </div>
              </div>

              {/* Executive Stat Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FF5500' }}>4.8 hrs → 12 min</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Closing Speed per Account</div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>99.4%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Zero-Error Audit Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Domain AI Agent & Chat Console */}
          <div ref={rightRef} className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bot size={16} color="#FF7A33" />
                <span className={styles.panelTitle}>RecoBit Domain Financial AI</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                NATURAL LANGUAGE QUERIES
              </span>
            </div>

            <div className={styles.chatBox}>
              <div className={styles.chatMessages}>
                <div className={styles.userBubble}>{currentPrompt.q}</div>
                <div className={styles.agentBubble}>{currentPrompt.a}</div>
              </div>

              <div className={styles.querySwitchers}>
                <button
                  className={`${styles.queryBtn} ${activeQuery === 0 ? styles.queryBtnActive : ''}`}
                  onClick={() => setActiveQuery(0)}
                >
                  Prompt 1: Bank Accounts
                </button>
                <button
                  className={`${styles.queryBtn} ${activeQuery === 1 ? styles.queryBtnActive : ''}`}
                  onClick={() => setActiveQuery(1)}
                >
                  Prompt 2: Unmapped Volume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Maker-Checker Governance Strip */}
        <div className={styles.governanceStrip}>
          <div className={styles.governanceLeft}>
            <ShieldCheck size={20} color="#10B981" />
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>
                Multi-Role Maker-Checker Governance Protocol
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Strict authorization separation: Operational users draft mappings; Admin Checkers authorize ERP push.
              </div>
            </div>
          </div>

          <div className={styles.govBadges}>
            <span className={styles.roleChip}>Owner Admin (Full Authority)</span>
            <span className={styles.roleChip}>Admin Checker (Authorizing Privilege)</span>
            <span className={styles.roleChip}>User Maker (Draft Only)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
