'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import { ProductVideoFrame } from '@/components/common/ProductVideoFrame';
import styles from './Scene01Hook.module.css';

const sampleInboundFeed = [
  { time: '12:03:18', ref: 'TXN-ZLTLQ4', narration: 'UPI/394805395421/HDFC/SHREE COLLECTION', amount: '₹92,522.14', status: 'MATCHED' },
  { time: '12:03:16', ref: 'TXN-CNA0VZ', narration: 'IMPS/615009616036/PARMATMA EK KRUSHI', amount: '₹31,550.68', status: 'SETTLED' },
  { time: '12:03:14', ref: 'TXN-Y7HZBX', narration: 'RTGS MAHBR52026053024064075 COROMANDEL', amount: '₹1,25,00,000.00', status: 'MATCHED' },
  { time: '12:03:12', ref: 'TXN-G1Y4MF', narration: 'NEFT SBINN52026053023501045 HEMANE KRUSHI', amount: '₹1,00,000.00', status: 'SETTLED' },
  { time: '12:03:09', ref: 'TXN-UNIV4G', narration: 'UPI 209022548268/UBIN/GAJANAN GIRHEPUNJE', amount: '₹30,000.00', status: 'MATCHED' },
];

export const Scene01Hook: React.FC = () => {
  const { hero } = storyContent;
  const { signInVideo } = mediaConfig.videos;
  const [activeView, setActiveView] = useState<'feed' | 'video'>('feed');

  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const feedCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(
          subheadlineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          statsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          feedCardRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.heroBackgroundGrid} />

      <div className="container">
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badgeRow}>
            <Sparkles size={14} />
            <span>{hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            Stop searching for the <span className="text-gradient-orange">right ledger.</span>
          </h1>

          {/* Subheadline */}
          <p ref={subheadlineRef} className={styles.subheadline}>
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctaGroup}>
            <a href="#the-problem" className={styles.primaryCta}>
              <span>{hero.primaryCta}</span>
              <ArrowRight size={17} />
            </a>
            <a href="#book-demo" className={styles.secondaryCta}>
              <span>{hero.secondaryCta}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div ref={statsRef} className={styles.statsRow}>
            {hero.stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statValue}>
                  <span className={idx === 0 ? 'text-gradient-orange' : ''}>{stat.value}</span>
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Live Inbound Feed Card / Video Switcher */}
          <div ref={feedCardRef} className={styles.liveFeedWrapper}>
            <div className={styles.liveFeedCard}>
              <div className={styles.feedHeader}>
                <div className={styles.feedTitleGroup}>
                  <div className={styles.liveDot} />
                  <span className={styles.feedTitle}>Live Inbound Bank Stream</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setActiveView('feed')}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: activeView === 'feed' ? '#FF5500' : 'transparent',
                      color: activeView === 'feed' ? '#FFFFFF' : '#64748B',
                      border: activeView === 'feed' ? 'none' : '1px solid rgba(15, 23, 42, 0.1)',
                    }}
                  >
                    Live Table Feed
                  </button>
                  <button
                    onClick={() => setActiveView('video')}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: activeView === 'video' ? '#FF5500' : 'transparent',
                      color: activeView === 'video' ? '#FFFFFF' : '#64748B',
                      border: activeView === 'video' ? 'none' : '1px solid rgba(15, 23, 42, 0.1)',
                    }}
                  >
                    Real Ingestion Video Proof
                  </button>
                </div>
              </div>

              <div style={{ display: activeView === 'feed' ? 'block' : 'none' }}>
                <table className={styles.feedTable}>
                  <thead>
                    <tr>
                      <th>TIME</th>
                      <th>REF NO</th>
                      <th>PARTICULARS (BANK NARRATION)</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleInboundFeed.map((row, idx) => (
                      <tr key={idx} className={styles.feedRow}>
                        <td className={styles.timeCell}>{row.time}</td>
                        <td className={styles.timeCell}>{row.ref}</td>
                        <td className={styles.narrationCell}>{row.narration}</td>
                        <td className={styles.amountCell}>{row.amount}</td>
                        <td>
                          <span
                            className={`${styles.statusPill} ${
                              row.status === 'MATCHED' ? styles.statusMatched : styles.statusSettled
                            }`}
                          >
                            <CheckCircle2 size={11} />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: activeView === 'video' ? 'block' : 'none', padding: '1rem', background: '#0B0F17' }}>
                <ProductVideoFrame
                  src={signInVideo.src}
                  poster={signInVideo.poster}
                  title={signInVideo.title}
                  subtitle={signInVideo.subtitle}
                  badge="ONBOARDING & INBOUND FEED"
                  urlPath="app.recobit.fi/auth/register"
                />
              </div>
            </div>

            {/* Scroll Down Hint */}
            <div className={styles.scrollPrompt}>
              <span>Scroll to experience the story</span>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
