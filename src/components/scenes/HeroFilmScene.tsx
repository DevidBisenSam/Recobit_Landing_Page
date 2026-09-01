'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown, Sparkles, Eye, SlidersHorizontal } from 'lucide-react';
import { storyContent } from '@/config/storyContent';
import { mediaConfig } from '@/config/mediaConfig';
import styles from './HeroFilmScene.module.css';

export const HeroFilmScene: React.FC = () => {
  const { hero } = storyContent;
  const { inboundStream } = mediaConfig.images;
  const [heroView, setHeroView] = useState<'interactive' | 'realStream'>('interactive');

  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.1,
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
          cardRef.current,
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
      <div className="container">
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badgePill}>
            <div className={styles.pulseGreen} />
            <span>{hero.badge}</span>
            <Sparkles size={14} />
          </div>

          {/* Master Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            Stop searching for the <span className="text-gradient-orange">right ledger.</span>
          </h1>

          {/* Subheadline */}
          <p ref={subheadlineRef} className={styles.subheadline}>
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctaGroup}>
            <a href="#act-1-chaos" className={styles.primaryCta}>
              <span>{hero.primaryCta}</span>
              <ArrowRight size={17} />
            </a>
            <a href="#book-demo" className={styles.secondaryCta}>
              <span>{hero.secondaryCta}</span>
            </a>
          </div>

          {/* Floating Inbound Transaction Hero Visual */}
          <div ref={cardRef} className={styles.floatingHeroCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.terminalDots}>
                  <div className={styles.dot} style={{ background: '#EF4444' }} />
                  <div className={styles.dot} style={{ background: '#F59E0B' }} />
                  <div className={styles.dot} style={{ background: '#10B981' }} />
                </div>
                <span className={styles.cardHeaderTitle}>Inbound Statement Pipeline</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => setHeroView(heroView === 'interactive' ? 'realStream' : 'interactive')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#FF5500',
                    background: 'rgba(255,85,0,0.1)',
                    border: '1px solid rgba(255,85,0,0.3)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  {heroView === 'interactive' ? <Eye size={12} /> : <SlidersHorizontal size={12} />}
                  <span>{heroView === 'interactive' ? 'View Real Inbound Capture' : 'Interactive View'}</span>
                </button>
              </div>
            </div>

            {heroView === 'realStream' ? (
              <div style={{ background: '#0F172A', overflow: 'hidden' }}>
                <img
                  src={inboundStream}
                  alt="Real RecoBit Live Inbound Transaction Stream"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ) : (
              <div className={styles.incomingTxnDisplay}>
                <div className={styles.txnMetaRow}>
                  <span>LIVE RAW VOUCHER INTAKE</span>
                  <span>STATUS: UNMAPPED SEARCH REQUIRED</span>
                </div>
                <div className={styles.txnBox}>
                  <span className={styles.txnNarrationText}>
                    UPI/394805395421/HDFC/SHREE COLLECTION/Cs
                  </span>
                  <span className={styles.txnAmountText}>₹20,000.00 CR</span>
                </div>
              </div>
            )}

            <div className={styles.cardFooterStats}>
              <div className={styles.statCell}>
                <span className={styles.statCellVal} style={{ color: '#FF5500' }}>
                  85–95%
                </span>
                <span className={styles.statCellLbl}>Time Reduction</span>
              </div>
              <div className={styles.statCell}>
                <span className={styles.statCellVal}>99%</span>
                <span className={styles.statCellLbl}>AI Match Confidence</span>
              </div>
              <div className={styles.statCell}>
                <span className={styles.statCellVal}>1-Click</span>
                <span className={styles.statCellLbl}>Direct ERP Sync</span>
              </div>
            </div>
          </div>

          {/* Scroll Prompt */}
          <a href="#act-1-chaos" className={styles.scrollDownHint}>
            <span>Scroll to enter the product story</span>
            <ChevronDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
