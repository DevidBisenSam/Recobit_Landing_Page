'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Sparkles, MessageSquare, Database, LineChart, Shield } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Scene13AiAgent.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Scene13AiAgent: React.FC = () => {
  const { scene13AiAgent } = storyContent;
  const { accessManagementAiVideo } = mediaConfig.videos;
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(consoleRef.current, {
        scrollTrigger: {
          trigger: consoleRef.current,
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

  const currentPrompt = scene13AiAgent.samplePrompts[activeQueryIdx];

  return (
    <section id="ai-agent" ref={sectionRef} className={styles.sceneWrapper}>
      <div className={styles.glowBg} />
      <div className="container">
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.tag}>
            <Sparkles size={14} />
            <span>{scene13AiAgent.tag}</span>
          </div>
          <h2 className={styles.title}>{scene13AiAgent.title}</h2>
          <p className={styles.body}>{scene13AiAgent.body}</p>
        </div>

        {/* Console Demo & Benefits Grid */}
        <div className={styles.contentGrid}>
          {/* Interactive Chat Console */}
          <div ref={consoleRef} className={styles.consoleCard}>
            <div className={styles.consoleHeader}>
              <div className={styles.botBadge}>
                <Bot size={18} />
                <span>RecoBit Financial AI Agent</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10B981' }}>ONLINE / CONTEXT READY</span>
            </div>

            <div className={styles.chatMessages}>
              <div className={styles.userQueryBubble}>{currentPrompt.q}</div>
              <div className={styles.agentResponseBubble}>{currentPrompt.a}</div>
            </div>

            <div className={styles.querySwitchers}>
              <button
                className={`${styles.queryBtn} ${activeQueryIdx === 0 ? styles.queryBtnActive : ''}`}
                onClick={() => setActiveQueryIdx(0)}
              >
                Query 1: Bank Accounts
              </button>
              <button
                className={`${styles.queryBtn} ${activeQueryIdx === 1 ? styles.queryBtnActive : ''}`}
                onClick={() => setActiveQueryIdx(1)}
              >
                Query 2: Unmapped Volume
              </button>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className={styles.benefitsCol}>
            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Direct Database Context</h3>
              <p className={styles.benefitDesc}>
                Not a public LLM trained on Wikipedia. RecoBit’s agent operates strictly on your authorized
                financial ledger schemas, transaction histories, and closing states.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Zero SQL or BI Setup Required</h3>
              <p className={styles.benefitDesc}>
                Ask in plain business language. RecoBit formulates deterministic queries, validates results,
                and synthesizes financial answers in sub-seconds.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Executive Triage Assistance</h3>
              <p className={styles.benefitDesc}>
                Identify high-variance parties, compute uncleared cheque balances, and assess employee closing
                speed effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Real Product Proof Video */}
        <div className={styles.videoContainer}>
          <ProductVideoFrame
            src={accessManagementAiVideo.src}
            poster={accessManagementAiVideo.poster}
            title={accessManagementAiVideo.title}
            subtitle={accessManagementAiVideo.subtitle}
            badge="LIVE SOFTWARE PROOF — DOMAIN AI AGENT"
            urlPath="app.recobit.fi/ai-assistant"
          />
        </div>
      </div>
    </section>
  );
};
