'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowDown } from 'lucide-react';
import styles from './HeroFilmScene.module.css';

gsap.registerPlugin(ScrollTrigger);

export const HeroFilmScene: React.FC = () => {
  const [isIntroLocked, setIsIntroLocked] = useState(true);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const screen1Ref = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLElement>(null);
  const letterR = useRef<SVGTextElement>(null);
  const letterE = useRef<SVGTextElement>(null);
  const letterC = useRef<SVGTextElement>(null);
  const letterO = useRef<SVGTextElement>(null);
  const letterB = useRef<SVGTextElement>(null);
  const letterI = useRef<SVGTextElement>(null);
  const letterT = useRef<SVGTextElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Force browser to always land on Screen 1 upon refresh/load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Stop Lenis virtual scroll while intro animation is active
    const win = window as unknown as { lenis?: { stop: () => void; start: () => void; scrollTo: (t: number, opts: { immediate: boolean }) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0, { immediate: true });
      win.lenis.stop();
    } else {
      const lenisCheck = setInterval(() => {
        const w = window as unknown as { lenis?: { stop: () => void; scrollTo: (t: number, opts: { immediate: boolean }) => void } };
        if (w.lenis) {
          w.lenis.scrollTo(0, { immediate: true });
          w.lenis.stop();
          clearInterval(lenisCheck);
        }
      }, 25);
      setTimeout(() => clearInterval(lenisCheck), 1000);
    }

    // Lock page completely — no scroll, no wheel, no touch, no keys
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeys = (e: KeyboardEvent) => {
      const blocked = [
        'Space', 'PageUp', 'PageDown', 'End', 'Home',
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
      ];
      if (blocked.includes(e.code) || [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchstart', preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', preventKeys, { capture: true });

    const unlockInteraction = () => {
      setIsIntroLocked(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll, { capture: true });
      window.removeEventListener('touchmove', preventScroll, { capture: true });
      window.removeEventListener('touchstart', preventScroll, { capture: true });
      window.removeEventListener('keydown', preventKeys, { capture: true });

      // Resume Lenis smooth scrolling
      const w = window as unknown as { lenis?: { start: () => void } };
      w.lenis?.start();
    };

    const ctx = gsap.context(() => {
      // 2. Initial State: Wide horizontal spread & deep vertical separation
      gsap.set(letterR.current, { x: -85, y: -95, opacity: 0 });
      gsap.set(letterE.current, { x: -50, y: 95, opacity: 0 });
      gsap.set(letterC.current, { x: -25, y: -95, opacity: 0 });
      gsap.set(letterO.current, { x: 0, y: 95, opacity: 0 });
      gsap.set(letterB.current, { x: 25, y: -95, opacity: 0 });
      gsap.set(letterI.current, { x: 50, y: 95, opacity: 0 });
      gsap.set(letterT.current, { x: 85, y: -95, opacity: 0 });

      gsap.set(topBarRef.current, { y: -25, opacity: 0 });
      gsap.set(subTextRef.current, { x: 30, opacity: 0 });
      gsap.set(bottomBarRef.current, { y: 25, opacity: 0 });

      const allLetters = [
        letterR.current,
        letterE.current,
        letterC.current,
        letterO.current,
        letterB.current,
        letterI.current,
        letterT.current,
      ].filter(Boolean);

      const topLetters = [letterR.current, letterC.current, letterB.current, letterT.current].filter(Boolean);
      const bottomLetters = [letterE.current, letterO.current, letterI.current].filter(Boolean);

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: unlockInteraction,
      });

      // Step 1: Blank Screen (Hold for 350ms)
      tl.to({}, { duration: 0.35 })

      // Step 2: Fade in wide-spread letters (RCBT top, EOI bottom)
        .to(topLetters, {
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .to(
          bottomLetters,
          {
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.6'
        )

      // Step 3: Hold the wide-gap split on screen (1.35s)
        .to({}, { duration: 1.35 })

      // Step 4: The 2D Convergence ("dur ke letter pass aate hue dikhenge")
        .to(
          allLetters,
          {
            x: 0,
            y: 0,
            duration: 1.65,
            ease: 'expo.inOut',
          }
        )

      // Step 5: Unveil Subtitle & Tagline, Top Bar, Bottom Bar!
        .to(
          subTextRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          topBarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.75'
        )
        .to(
          bottomBarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.75'
        );

      // NOTE: Bottom bar does NOT hide on scroll — it stays 100% visible on Screen 1 as requested!
    }, sectionRef);

    // 3. Scroll tracking for Sticky Frosted Top Bar
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.75;
      setIsScrolledPastHero(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unlockInteraction();
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  // =========================================================================
  // PILLAR D — Scroll-Triggered Text Reveal per Answer Block
  // PILLAR E — Depth Parallax on Sticky Question Column
  // =========================================================================
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // PILLAR D: Each answer block — headline + body reveal from bottom with clip-path
      // This creates the dramatic "content materializing as you scroll" feel
      gsap.utils.toArray<HTMLElement>(`.${styles.lenisAnswerBlock}`).forEach((block) => {
        const headline = block.querySelector(`.${styles.lenisAnswerHeadline}`);
        const body = block.querySelector(`.${styles.lenisAnswerBody}`);

        // Set initial state: invisible, shifted down, clipped
        if (headline) {
          gsap.set(headline, { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
        }
        if (body) {
          gsap.set(body, { y: 22, opacity: 0 });
        }

        // Animate in when block enters viewport
        ScrollTrigger.create({
          trigger: block,
          start: 'top 82%',
          end: 'top 40%',
          onEnter: () => {
            const tl = gsap.timeline();
            if (headline) {
              tl.to(headline, {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.8,
                ease: 'power3.out',
              });
            }
            if (body) {
              tl.to(body, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
              }, '-=0.45');
            }
          },
          onLeaveBack: () => {
            // Re-hide when scrolled back up — so it re-animates next time
            if (headline) gsap.set(headline, { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
            if (body) gsap.set(body, { y: 22, opacity: 0 });
          },
          once: false,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToStory = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const win = window as unknown as {
      lenis?: {
        scrollTo: (target: string | HTMLElement, opts?: Record<string, unknown>) => void;
      };
    };
    if (win.lenis) {
      win.lenis.scrollTo('#product-showcase', {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const target = document.getElementById('product-showcase');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={sectionRef} className={styles.heroMasterWrapper}>
      {/* Full-screen blocker: prevents any clicks, movement, drag, or interactions during intro animation */}
      {isIntroLocked && (
        <div
          className={styles.interactionLockOverlay}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onMouseUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-hidden="true"
        />
      )}



      {/* ========================================================================= */}
      {/* STICKY FROSTED HEADER (Screen 2 onwards - secondary importance)           */}
      {/* ========================================================================= */}
      <header
        className={`${styles.fixedNavBar} ${isScrolledPastHero ? styles.fixedNavBarVisible : ''}`}
        aria-hidden={!isScrolledPastHero}
      >
        <div className={styles.fixedNavContainer}>
          <div className={styles.fixedNavBrand}>RECOBIT</div>
          <nav className={styles.fixedNavLinks}>
            <a href="#product-showcase">WHY RECOBIT</a>
            <a href="#deployment-modes">SETUP OPTIONS</a>
            <a href="#auto-matching">RECONCILIATION</a>
          </nav>
          <a
            href="#book-demo"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('book-demo');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={styles.fixedNavCta}
          >
            BOOK DEMO
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SCREEN 1: 1:1 REVERTED HERO STAGE (BUTTON STAYS 100% VISIBLE ON SCROLL)   */}
      {/* ========================================================================= */}
      <section ref={screen1Ref} className={styles.screen1MonumentalStage}>
        {/* Minimal Editorial Top Bar */}
        <header ref={topBarRef} className={styles.lenisTopBar}>
          <nav className={styles.topBarLeft}>
            <a href="#product-showcase" onClick={scrollToStory}>WHY RECOBIT</a>
            <a href="#deployment-modes">SETUP OPTIONS</a>
            <a href="#auto-matching">RECONCILIATION</a>
          </nav>

          <nav className={styles.topBarRight}>
            <a
              href="#book-demo"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('book-demo');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={styles.topBarCta}
            >
              BOOK DEMO
            </a>
          </nav>
        </header>

        <div className={styles.centerLockup}>
          {/* Monumental Kinetic SVG Wordmark */}
          <div className={styles.monumentalWordmark}>
            <svg
              viewBox="0 0 1300 320"
              fill="#FF5500"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.heroWordmarkSvg}
            >
              <style>{`
                .wm-char {
                  font-family: var(--font-display);
                  font-size: 136px;
                  font-weight: 900;
                  letter-spacing: -0.04em;
                  text-anchor: middle;
                  user-select: none;
                  opacity: 0;
                  will-change: transform, opacity;
                }
              `}</style>
              {/* Top Row: R (far left) */}
              <text ref={letterR} x="170" y="160" className="wm-char" style={{ transform: 'translate(-85px, -95px)', opacity: 0 }}>R</text>
              {/* Bottom Row: E (between R and C) */}
              <text ref={letterE} x="330" y="160" className="wm-char" style={{ transform: 'translate(-50px, 95px)', opacity: 0 }}>E</text>
              {/* Top Row: C */}
              <text ref={letterC} x="490" y="160" className="wm-char" style={{ transform: 'translate(-25px, -95px)', opacity: 0 }}>C</text>
              {/* Bottom Row: O (center between C and B) */}
              <text ref={letterO} x="650" y="160" className="wm-char" style={{ transform: 'translate(0px, 95px)', opacity: 0 }}>O</text>
              {/* Top Row: B */}
              <text ref={letterB} x="810" y="160" className="wm-char" style={{ transform: 'translate(25px, -95px)', opacity: 0 }}>B</text>
              {/* Bottom Row: I (between B and T) */}
              <text ref={letterI} x="960" y="160" className="wm-char" style={{ transform: 'translate(50px, 95px)', opacity: 0 }}>I</text>
              {/* Top Row: T (far right) */}
              <text ref={letterT} x="1110" y="160" className="wm-char" style={{ transform: 'translate(85px, -95px)', opacity: 0 }}>T</text>
            </svg>
          </div>

          {/* Elegant Two-Line Subtitle Block */}
          <div ref={subTextRef} className={styles.monumentalSubTextWrapper}>
            <div className={styles.monumentalSubHeading}>
              AUTOMATED BANK RECONCILIATION
            </div>
            <p className={styles.monumentalTagline}>
              Turn weeks of bank statement matching into minutes of 100% accurate books.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Stacked Scroll on Left, Brand Meta in Center, Electric Pill on Right */}
        <div ref={bottomBarRef} className={styles.lenisBottomBar}>
          {/* Left: Stacked Brutalist Scroll to Unravel (Lenis style) */}
          <a href="#product-showcase" onClick={scrollToStory} className={styles.stackedScrollPrompt}>
            <span className={styles.stackedScrollTop}>SCROLL</span>
            <span className={styles.stackedScrollBottom}>
              TO EXPLORE <ChevronDown size={14} className={styles.bounceDown} />
            </span>
          </a>

          {/* Center: Subtle Brand Tagline */}
          <div className={styles.brandMicroTag}>
            <span className={styles.microTagTitle}>THE BANK RECONCILIATION PLATFORM</span>
            <span className={styles.microTagSub}>BY RECOBIT TECHNOLOGIES</span>
          </div>

          {/* Right: Electric Solar Capsule Pill (Does NOT hide on scroll) */}
          <button
            type="button"
            className={styles.startStoryPill}
            onClick={scrollToStory}
            title="Click to explore automated reconciliation"
          >
            <span className={styles.pulseDot} />
            <span className={styles.pillLabel}>SIMPLIFY RECONCILIATION</span>
            <ArrowDown size={15} className={styles.pillArrow} />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCREEN 2: 1:1 LENIS STICKY EDITORIAL SCROLL (WHY RECOBIT?)                */}
      {/* ========================================================================= */}
      <section id="product-showcase" className={styles.screen2LenisSection}>
        <div className={styles.lenisGridContainer}>
          {/* Left Column: Pinned / Sticky Question with Vertical Accent Line */}
          <div className={styles.lenisStickyQuestionCol}>
            <div className={styles.lenisStickyInner}>
              <div className={styles.lenisVerticalBar} />
              <h2 className={styles.lenisStickyQuestion}>
                <span className={styles.questionLine}>WHY</span>
                <span className={styles.questionLine}>RECOBIT?</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Natural Vertical Answers Flow that Scrolls past the Sticky Question */}
          <div className={styles.lenisScrollingAnswersCol}>
            {/* Answer 1: The 80% Ledger Search Problem */}
            <div className={styles.lenisAnswerBlock}>
              <h3 className={styles.lenisAnswerHeadline}>
                NO MORE HUNTING FOR VOUCHERS ROW BY ROW
              </h3>
              <p className={styles.lenisAnswerBody}>
                Accountants spend up to 80% of their time manually ticking entries between the bank passbook and daybook. RecoBit automatically compares both statements and separates matched entries from suspense items—so you only review the differences.
              </p>
            </div>

            {/* Answer 2: Weeks & Months Delay Collapsed */}
            <div className={styles.lenisAnswerBlock}>
              <h3 className={styles.lenisAnswerHeadline}>
                MONTH-END CLOSING BACKLOGS FINISHED ON THE SAME DAY
              </h3>
              <p className={styles.lenisAnswerBody}>
                Waiting for monthly bank statements delays your accounts closing. RecoBit cuts out manual cross-checking, clearing huge backlogs of transactions in minutes.
              </p>
            </div>

            {/* Answer 3: Narration & Suspense Entries */}
            <div className={styles.lenisAnswerBlock}>
              <h3 className={styles.lenisAnswerHeadline}>
                CLEAR SUSPENSE ENTRIES WITH SMART NARRATION MATCHING
              </h3>
              <p className={styles.lenisAnswerBody}>
                Bank narration codes (NEFT/RTGS/UPI/IMPS) are messy and shortened. RecoBit automatically reads the party name, invoice number, and bank reference from the narration, suggesting the exact ledger with zero guesswork.
              </p>
            </div>

            {/* Answer 4: 1-Click Direct ERP Sync */}
            <div className={styles.lenisAnswerBlock}>
              <h3 className={styles.lenisAnswerHeadline}>
                DIRECT VOUCHER POSTING TO TALLY &amp; ACCOUNTING SOFTWARE
              </h3>
              <p className={styles.lenisAnswerBody}>
                No need to re-type entries or make manual Excel sheets. Once you approve the reconciliation, missing vouchers and bank charges post directly into your Tally or ERP daybook in a single click with complete audit records.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
