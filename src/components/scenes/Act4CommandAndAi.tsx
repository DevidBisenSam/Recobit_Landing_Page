'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, LineChart, ShieldCheck, Sparkles, UserCheck, Database, Eye, Video } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Act4CommandAndAi.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Act4CommandAndAi: React.FC = () => {
  const { scene13AiAgent } = storyContent;
  const { dashboardVideo, accessManagementAiVideo } = mediaConfig.videos;
  const { dashboardBankData, dashboardAnalytics, aiAssistantChat, workspaceDirectory } = mediaConfig.images;
  const [activeQuery, setActiveQuery] = useState(0);
  const [mediaMode, setMediaMode] = useState<'video' | 'screenshots'>('video');

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(rightRef.current, {
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
            Once mechanical comparison work is automated, leadership gains a clear command center across bank
            balances, employee throughput, Maker-Checker governance, and natural-language financial queries.
          </p>
        </div>

        {/* Media Mode Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
          <button
            onClick={() => setMediaMode('video')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: mediaMode === 'video' ? '#FF5500' : '#FFFFFF',
              color: mediaMode === 'video' ? '#FFFFFF' : '#334155',
              border: '1px solid',
              borderColor: mediaMode === 'video' ? '#FF5500' : '#E2E8F0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Video size={14} />
            <span>Product Motion Footage</span>
          </button>
          <button
            onClick={() => setMediaMode('screenshots')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: mediaMode === 'screenshots' ? '#FF5500' : '#FFFFFF',
              color: mediaMode === 'screenshots' ? '#FFFFFF' : '#334155',
              border: '1px solid',
              borderColor: mediaMode === 'screenshots' ? '#FF5500' : '#E2E8F0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Eye size={14} />
            <span>High-Res UI Captures</span>
          </button>
        </div>

        {/* Dual Panel Grid */}
        <div className={styles.dualPanelGrid}>
          {/* Left Panel: Real Central Dashboard */}
          <div ref={leftRef} className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Central Bank & Ledger Command Hub</span>
              <span className={styles.panelBadge}>LIVE SOFTWARE PROOF</span>
            </div>

            {mediaMode === 'screenshots' ? (
              <div style={{ background: '#0F172A', overflow: 'hidden' }}>
                <img
                  src={dashboardBankData}
                  alt="Real RecoBit Bank Accounts and Dr/Cr Balances Dashboard"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: '#F8FAFC',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '0.8rem',
                    color: '#64748B',
                  }}
                >
                  Real Capture: Multi-Bank Account balances & Dr/Cr verification
                </div>
              </div>
            ) : (
              <ProductVideoFrame
                src={dashboardVideo.src}
                poster={dashboardVideo.poster}
                title={dashboardVideo.title}
                subtitle={dashboardVideo.subtitle}
                badge="DASHBOARD VISIBILITY"
                urlPath="app.recobit.fi/dashboard/analytics"
              />
            )}
          </div>

          {/* Right Panel: Domain AI Agent & Chat Console */}
          <div ref={rightRef} className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bot size={16} color="#FF7A33" />
                <span className={styles.panelTitle}>RecoBit Financial AI Agent</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                DIRECT LEDGER CONTEXT
              </span>
            </div>

            {mediaMode === 'screenshots' ? (
              <div style={{ background: '#0F172A', overflow: 'hidden' }}>
                <img
                  src={aiAssistantChat}
                  alt="Real RecoBit AI Assistant Financial Query Stream"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: '#F8FAFC',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '0.8rem',
                    color: '#64748B',
                  }}
                >
                  Real Capture: Domain AI querying unmapped bank accounts & ledgers
                </div>
              </div>
            ) : (
              <>
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

                <ProductVideoFrame
                  src={accessManagementAiVideo.src}
                  poster={accessManagementAiVideo.poster}
                  title={accessManagementAiVideo.title}
                  subtitle={accessManagementAiVideo.subtitle}
                  badge="AI & DIRECTORY PROOF"
                  urlPath="app.recobit.fi/ai-assistant"
                />
              </>
            )}
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
