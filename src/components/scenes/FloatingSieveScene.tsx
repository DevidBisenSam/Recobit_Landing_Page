'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import styles from './FloatingSieveScene.module.css';

gsap.registerPlugin(ScrollTrigger);

interface CategoryDefinition {
  id: string;
  step: string;
  badge: string;
  title: string;
  desc: string;
  targetCount: number;
  unit: string;
  sub: string;
  themeClass: string;
  color: string;
}

const categories: CategoryDefinition[] = [
  {
    id: 'stream-matched',
    step: '01',
    badge: '85–92% Auto-Sync',
    title: 'Matched Entries',
    desc: 'Mathematical lock on Amount, Date, & Bank UTR.',
    targetCount: 8940,
    unit: 'Entries',
    sub: 'Direct to Tally Daybook',
    themeClass: styles.themeMatched,
    color: '#10B981',
  },
  {
    id: 'stream-unmatched',
    step: '02',
    badge: 'AI Top 10 Picks',
    title: 'Unmatched Exceptions',
    desc: 'Fuzzy, phonetic & semantic AI confidence scoring.',
    targetCount: 420,
    unit: 'Exceptions',
    sub: '1-Click Match Approve',
    themeClass: styles.themeUnmatched,
    color: '#F59E0B',
  },
  {
    id: 'stream-missing-books',
    step: '03',
    badge: 'Bank Inflow / Debit',
    title: 'Missing in Books',
    desc: 'Bank deposits or vendor payouts missing in ERP.',
    targetCount: 380,
    unit: 'Entries',
    sub: 'Auto-Create Voucher',
    themeClass: styles.themeMissingBooks,
    color: '#3B82F6',
  },
  {
    id: 'stream-missing-stmt',
    step: '04',
    badge: 'ERP Transit Items',
    title: 'Missing in Statement',
    desc: 'Cheques issued in Tally pending bank clearance.',
    targetCount: 180,
    unit: 'In Transit',
    sub: 'Uncleared Items Track',
    themeClass: styles.themeMissingStatement,
    color: '#8B5CF6',
  },
  {
    id: 'stream-bank-charges',
    step: '05',
    badge: 'Auto-Extracted',
    title: 'Bank Charges & Levies',
    desc: 'Isolated GST, interest, bank penalty, & forex spreads.',
    targetCount: 80,
    unit: 'Levies',
    sub: 'Auto-Book to Charge A/c',
    themeClass: styles.themeBankCharges,
    color: '#EF4444',
  },
];

const rawTokens = [
  { tag: 'CMS/00912/VND', amount: '₹4,50,000' },
  { tag: 'NEFT/INW/99218', amount: '₹12,400' },
  { tag: 'UPI/55410/MERCH', amount: '₹89,200' },
  { tag: 'IMPS/RET/44120', amount: '₹1,42,850' },
  { tag: 'FX/SWIFT/7710', amount: '$4,200' },
];

export const FloatingSieveScene: React.FC = () => {
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<(HTMLDivElement | null)[]>([]);
  const laserBarRef = useRef<HTMLDivElement>(null);
  const laserGlowRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const payoffDeckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // ── MASTER PINNED TIMELINE ACROSS 420VH TRACK ─────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: stickyStageRef.current,
          anticipatePin: 1,
        },
      });

      // ── PHASE 1: RAW TOKENS CASCADE IN ────────────────────────────────────
      tokensRef.current.forEach((tok, idx) => {
        if (!tok) return;
        tl.fromTo(
          tok,
          { y: -30, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          idx * 0.05
        );
      });

      // ── PHASE 2: LASER SIEVE BEAM IGNITES & GLOWS ─────────────────────────
      tl.fromTo(
        laserBarRef.current,
        { scaleX: 0.4, opacity: 0.2 },
        { scaleX: 1.0, opacity: 1.0, duration: 0.8, ease: 'power3.out' },
        0.2
      );

      tl.fromTo(
        laserGlowRef.current,
        { opacity: 0.2, scale: 0.8 },
        { opacity: 1.0, scale: 1.2, duration: 0.8, ease: 'power2.out' },
        0.25
      );

      // ── PHASE 3: 5 FIBER-OPTIC LASER ARCS DRAW OUT ────────────────────────
      pathsRef.current.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength() || 220;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.35);
      });

      // ── PHASE 4: THE 5 FLOATING COLUMNS POP IN & METRICS ROLL UP ──────────
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        tl.fromTo(
          card,
          { y: 40, opacity: 0.25, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1.0, duration: 0.8, ease: 'back.out(1.5)' },
          0.45 + idx * 0.08
        );
      });

      // Numerical Rollup
      categories.forEach((cat, idx) => {
        const counterEl = countersRef.current[idx];
        if (!counterEl) return;
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: cat.targetCount,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              counterEl.innerText = `${Math.floor(obj.val).toLocaleString('en-IN')} ${cat.unit}`;
            },
          },
          0.55 + idx * 0.06
        );
      });

      // ── PHASE 5: 1-CLICK RESOLVE & TIME WARP DECK ─────────────────────────
      tl.fromTo(
        payoffDeckRef.current,
        { y: 25, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1.0, duration: 0.9, ease: 'power3.out' },
        1.1
      );
    }, pinTrackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinTrackRef} id="auto-matching" className={styles.pinTrack}>
      <div ref={stickyStageRef} className={styles.stickyStage}>
        {/* Ambient Atmosphere */}
        <div className={styles.ambientAtmosphere}>
          <div ref={laserGlowRef} className={styles.laserCenterGlow} />
        </div>

        <div className={styles.floatingStageInner}>
          {/* ── 1. FLOATING EDITORIAL HEADER ── */}
          <div className={styles.floatingHeader}>
            <div className={styles.eyebrowPill}>
              <span className={styles.eyebrowDot} />
              <span>04 • THE AUTONOMOUS SIEVE</span>
            </div>
            <h2 className={styles.floatingMainHeading}>
              80% OF RECONCILIATION IS SEARCHING.{' '}
              <span className={styles.orangeHighlight}>WE AUTOMATE THE BIFURCATION.</span>
            </h2>
          </div>

          {/* ── 2. PHASE 1: FLOATING RAW INBOUND TOKENS ── */}
          <div className={styles.rawInboundCascade}>
            {rawTokens.map((tok, idx) => (
              <div
                key={tok.tag}
                ref={(el) => {
                  tokensRef.current[idx] = el;
                }}
                className={styles.floatingTxToken}
              >
                <span className={styles.tokenTag}>{tok.tag}</span>
                <span className={styles.tokenAmount}>{tok.amount}</span>
              </div>
            ))}
          </div>

          {/* ── 3. PHASE 2: THE LASER SIEVE BAR ── */}
          <div ref={laserBarRef} className={styles.laserSieveBar}>
            <div className={styles.laserLineCore} />
            <div className={styles.laserEmitterPill}>
              <Sparkles size={14} />
              <span>RECOBIT 5-STREAM AUTO-CLASSIFICATION SIEVE</span>
            </div>
          </div>

          {/* ── 4. FIBER OPTIC ARCS (SVG) ── */}
          <svg viewBox="0 0 1080 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fiberOpticArcsSvg}>
            {/* Arc 1 (Far Left) */}
            <path
              ref={(el) => {
                pathsRef.current[0] = el;
              }}
              d="M 540 0 C 540 32, 108 12, 108 65"
              stroke="#10B981"
              strokeWidth="2.5"
              className={styles.fiberLaserArc}
            />
            {/* Arc 2 (Mid Left) */}
            <path
              ref={(el) => {
                pathsRef.current[1] = el;
              }}
              d="M 540 0 C 540 28, 324 16, 324 65"
              stroke="#F59E0B"
              strokeWidth="2.5"
              className={styles.fiberLaserArc}
            />
            {/* Arc 3 (Center) */}
            <path
              ref={(el) => {
                pathsRef.current[2] = el;
              }}
              d="M 540 0 L 540 65"
              stroke="#3B82F6"
              strokeWidth="2.5"
              className={styles.fiberLaserArc}
            />
            {/* Arc 4 (Mid Right) */}
            <path
              ref={(el) => {
                pathsRef.current[3] = el;
              }}
              d="M 540 0 C 540 28, 756 16, 756 65"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              className={styles.fiberLaserArc}
            />
            {/* Arc 5 (Far Right) */}
            <path
              ref={(el) => {
                pathsRef.current[4] = el;
              }}
              d="M 540 0 C 540 32, 972 12, 972 65"
              stroke="#EF4444"
              strokeWidth="2.5"
              className={styles.fiberLaserArc}
            />
          </svg>

          {/* ── 5. PHASE 3: 5 FLOATING CATEGORICAL DATA COLUMNS ── */}
          <div className={styles.floatingColumnsGrid}>
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`${styles.floatingColumnCard} ${cat.themeClass}`}
              >
                <div className={styles.streamCardTop}>
                  <div className={styles.colHeaderRow}>
                    <span className={styles.colStepId}>{cat.step}</span>
                    <span className={styles.colBadgePill}>{cat.badge}</span>
                  </div>
                  <h3 className={styles.colTitle}>{cat.title}</h3>
                  <p className={styles.colDescription}>{cat.desc}</p>
                </div>

                <div className={styles.colFooterBlock}>
                  <span
                    ref={(el) => {
                      countersRef.current[idx] = el;
                    }}
                    className={styles.colLiveCounter}
                  >
                    {cat.targetCount.toLocaleString('en-IN')} {cat.unit}
                  </span>
                  <span className={styles.colSubLabel}>{cat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── 6. PHASE 4: 1-CLICK RESOLVE & TIME WARP DECK ── */}
          <div ref={payoffDeckRef} className={styles.floatingPayoffStage}>
            <div className={styles.floatingResolvePill}>
              <span>1-CLICK BULK EXECUTE • AUTO-POST TO TALLY DAYBOOK</span>
              <Zap size={15} />
            </div>

            <div className={styles.floatingTimeWarpPills}>
              <div className={styles.floatingTimePill}>
                <span className={styles.timePillTag}>MANUAL CLOSE</span>
                <span className={styles.timeManualSlashed}>14 DAYS : 08 HOURS</span>
              </div>

              <ArrowRight size={16} color="#FF5500" />

              <div className={styles.floatingTimePill}>
                <span className={styles.timePillTag}>RECOBIT RUNTIME</span>
                <span className={styles.timeRecoBitGlow}>00 DAYS : 18 MINS</span>
                <span className={styles.timeSavedBadge}>96.8% TIME SAVED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
