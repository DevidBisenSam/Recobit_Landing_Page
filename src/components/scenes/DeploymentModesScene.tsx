'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import styles from './DeploymentModesScene.module.css';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: string;
  step: string;
  titleLines: string[];
  badge: string;
  badgeTheme: 'orange' | 'emerald' | 'blue';
  description: string;
  features: string[];
}

const cards: CardData[] = [
  {
    id: 'mode-web-connector',
    step: '01',
    titleLines: ['TALLY & ERP', 'AUTO-SYNC'],
    badge: 'MOST POPULAR',
    badgeTheme: 'orange',
    description:
      'Connects directly with your office Tally Prime or ERP. Fetches the daybook, matches with your bank statement, and pushes approved entries back into Tally automatically.',
    features: ['Direct Tally Daybook Sync', 'No IT Setup Needed', '100% Data Stays on Office Network'],
  },
  {
    id: 'mode-file-in-out',
    step: '02',
    titleLines: ['EXCEL & PDF', 'UPLOAD'],
    badge: 'QUICK START',
    badgeTheme: 'emerald',
    description:
      'Simply upload your Bank PDF or Excel statement and your Cashbook export. RecoBit auto-reads password-protected PDFs, matches entries in seconds, and generates a clean matched Excel report.',
    features: ['Auto-Reads Password-Protected PDFs', 'No Software Setup Required', 'Download Matched Excel Report'],
  },
  {
    id: 'mode-desktop-app',
    step: '03',
    titleLines: ['100% OFFLINE', 'DESKTOP APP'],
    badge: 'MAXIMUM PRIVACY',
    badgeTheme: 'blue',
    description:
      'Installed directly on your PC or Laptop like Tally. Works completely without internet. Ideal for CA firms, corporate accounts, and teams that do not want financial data on the cloud.',
    features: ['Works Completely Without Internet', 'Zero Financial Data Leaves Your PC', 'Handles Millions of Entries Easily'],
  },
];

export const DeploymentModesScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1025px)', () => {
      if (!sectionRef.current) return;

      const card0 = cardRefs.current[0];
      const card1 = cardRefs.current[1];
      const card2 = cardRefs.current[2];

      if (!card0 || !card1 || !card2) return;

      // Master Pinned Scroll Timeline for Desktop (100% Preserved)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // Initial positions:
      gsap.set(card0, { x: 0, y: 0, rotation: -1.5, opacity: 1, scale: 1 });
      gsap.set(card1, { x: 90, y: 280, rotation: 5, opacity: 0, scale: 0.94 });
      gsap.set(card2, { x: 180, y: 340, rotation: 8, opacity: 0, scale: 0.92 });

      // Phase 1: Card 1 floats UP and IN, settling over Card 0 (Scroll 0.2 -> 0.5)
      tl.to(
        card1,
        {
          x: 70,
          y: 0,
          rotation: 1.2,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.2
      );

      // Phase 2: Card 2 floats UP and IN, settling over Card 1 (Scroll 0.55 -> 0.85)
      tl.to(
        card2,
        {
          x: 140,
          y: 0,
          rotation: -0.8,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.55
      );

      // Hold final cascade till the end of pin
      tl.to([card0, card1, card2], { duration: 0.15 }, 0.95);
    });

    mm.add('(max-width: 1024px)', () => {
      // On Tablet/Mobile: Cards remain visible and in natural stacked order
      cardRefs.current.forEach((c) => {
        if (c) gsap.set(c, { clearProps: 'all', opacity: 1 });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="deployment-modes" ref={sectionRef} className={styles.pinSection}>
      <div className={styles.stageContainer}>
        {/* =================================================================== */}
        {/* LEFT: FLOATING LENIS-STYLE 01 / 02 / 03 CARDS STACK                 */}
        {/* =================================================================== */}
        <div className={styles.cardDeck}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`${styles.floatCard} ${styles[`theme_${card.badgeTheme}`]} ${
                hoveredCard === idx ? styles.cardIsHovered : ''
              } ${styles[`floatingBob_${idx}`]}`}
              style={{
                zIndex: hoveredCard === idx ? 80 : 10 + idx * 10,
              }}
            >
              {/* Card Top: Massive Anton Number (Lenis Style) */}
              <div className={styles.cardBigNumber}>{card.step}</div>

              {/* Card Center: Badge + Narrative + Feature Bullets */}
              <div className={styles.cardContent}>
                <span className={styles.cardBadge}>{card.badge}</span>
                <p className={styles.cardDescription}>{card.description}</p>

                <div className={styles.featureList}>
                  {card.features.map((feat, fIdx) => (
                    <div key={fIdx} className={styles.featureRow}>
                      <Check size={12} className={styles.checkIcon} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Punchy All-Caps Anton Title (Lenis Style) */}
              <div className={styles.cardBottomTitle}>
                {card.titleLines.map((line, lIdx) => (
                  <span key={lIdx} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* =================================================================== */}
        {/* RIGHT: MONUMENTAL TYPOGRAPHY & ACTIVE ARCHITECTURE TRACKER          */}
        {/* =================================================================== */}
        <div className={styles.headlineStage}>
          <div className={styles.tagBadge}>
            <span className={styles.tagDot} />
            <span>03 EASY WAYS TO USE RECOBIT</span>
          </div>

          <h2 className={styles.monumentalHeading}>
            <span className={styles.headingLineDark}>CHOOSE HOW</span>
            <span className={styles.headingLineDark}>YOU WORK.</span>
            <span className={styles.headingLineOrange}>ZERO IT FRICTION.</span>
          </h2>

          <p className={styles.headlineSub}>
            Use RecoBit in your web browser, connect directly with your office Tally system,
            or keep everything completely offline on your own PC. Your financial data stays
            strictly under your control.
          </p>
        </div>
      </div>
    </section>
  );
};
