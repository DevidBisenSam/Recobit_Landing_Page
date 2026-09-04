'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/common/Footer';
import styles from './BookDemoScene.module.css';

gsap.registerPlugin(ScrollTrigger);

const SOFTWARE_OPTIONS = ['Tally Prime', 'SAP / ERP', 'Excel / CSV', 'Zoho Books'];
const TIMING_OPTIONS  = ['Today – Next Slot', 'Tomorrow Morning', 'Tomorrow Afternoon', 'This Weekend'];

/* Ledger rows — what a manual Indian accounting register looks like */
const LEDGER_ROWS = [
  { date: '12-Aug', narr: 'NEFT CR INFOSYS LTD', amt: '₹8,94,250' },
  { date: '13-Aug', narr: 'HDFC Chq 001182', amt: '₹1,18,000' },
  { date: '13-Aug', narr: 'IMPS TELE PAYMENT',  amt: '₹8,250'    },
  { date: '14-Aug', narr: 'Auto Debit EMI Q3',  amt: '₹23,600'   },
  { date: '15-Aug', narr: 'UPI SHARMA ENT',      amt: '₹42,500'   },
  { date: '15-Aug', narr: 'Bank Charges Q2',     amt: '₹850'      },
];

/* ══════════════════════════════════════════════════════════════════════════════
   CSS 3D MAHOGANY REGISTER MODEL
   Matches the premium look of SieveScene's book model
   ══════════════════════════════════════════════════════════════════════════════ */
const ManualRegisterModel: React.FC = () => (
  <div className={styles.modelScene}>

    {/* ── THE 3D REGISTER BOOK ── */}
    <div className={styles.register3d}>

      {/* Top edge — visible pages stack */}
      <div className={styles.regEdgeTop} />

      {/* Right edge — book thickness */}
      <div className={styles.regEdgeRight}>
        <div className={styles.regPageLines}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={styles.regPageLine} />
          ))}
        </div>
      </div>

      {/* Front face — paper with mahogany spine */}
      <div className={styles.regFront}>

        {/* Mahogany spine — same treatment as book model */}
        <div className={styles.regSpine}>
          <div className={styles.regSpineHole} />
          <div className={styles.regSpineHole} />
          <div className={styles.regSpineText}>BANK RECONCILIATION REGISTER</div>
          <div className={styles.regSpineHole} />
          <div className={styles.regSpineHole} />
        </div>

        {/* Lined parchment paper body */}
        <div className={styles.regBody}>
          {/* Red ledger top rule — authentic Indian account book */}
          <div className={styles.regRedRule} />

          {/* Company name + FY tag at top */}
          <div className={styles.regCompanyHeader}>
            <span className={styles.regCompanyName}>ACCOUNTS DEPT</span>
            <span className={styles.regFyTag}>F.Y. 2025-26 · AUG</span>
          </div>

          {/* Column headers */}
          <div className={styles.regHeaderRow}>
            <span className={styles.regColHead}>DATE</span>
            <span className={styles.regColHead}>PARTICULARS</span>
            <span className={styles.regColHead}>AMOUNT</span>
            <span className={styles.regColHead}>STATUS</span>
          </div>

          {/* Ledger data rows */}
          <div className={styles.regRows}>
            {LEDGER_ROWS.map((row, i) => (
              <div key={i} className={styles.regRow}>
                <span className={styles.regCell}>{row.date}</span>
                <span className={styles.regCell}>{row.narr}</span>
                <span className={styles.regCell}>{row.amt}</span>
                <span className={styles.regCellPending}>???</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold corner brackets — same as the main book */}
      <div className={styles.regCornerTL} />
      <div className={styles.regCornerTR} />
      <div className={styles.regCornerBL} />
      <div className={styles.regCornerBR} />

      {/* Drop shadow */}
      <div className={styles.regShadow} />
    </div>

    {/* ══════════════════════════════════════════════════════════════════════
        SEQUENTIAL SVG CROSS DRAW ANIMATION
        Arm 1 (top-left → bottom-right) draws first 0-0.9s
        Arm 2 (top-right → bottom-left) draws next 0.9s-1.8s
        Both hold 1.8s-3.5s, fade out 3.5s-4s, pause 4-5s → repeat
        Using SVG stroke-dashoffset for authentic "drawn" effect
        ══════════════════════════════════════════════════════════════════════ */}
    <div className={styles.crossOverlay}>
      <svg
        className={styles.crossSvg}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ambient glow circle — fades in after arm1 starts */}
        <circle
          className={styles.crossCircle}
          cx="50"
          cy="50"
          r="44"
          fill="rgba(220,38,38,0.08)"
          stroke="rgba(220,38,38,0.22)"
          strokeWidth="1.5"
        />

        {/* Arm 1: Top-left (5,5) → Bottom-right (95,95) */}
        {/* pathLength="142" normalises dasharray to 142 regardless of viewBox scaling */}
        <line
          className={styles.crossArm1}
          x1="12" y1="12" x2="88" y2="88"
          stroke="#DC2626"
          strokeWidth="9.5"
          strokeLinecap="round"
          pathLength="142"
        />
        {/* Arm 1 highlight glint */}
        <line
          className={styles.crossArm1}
          x1="12" y1="12" x2="88" y2="88"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="142"
        />

        {/* Arm 2: Top-right (88,12) → Bottom-left (12,88) */}
        <line
          className={styles.crossArm2}
          x1="88" y1="12" x2="12" y2="88"
          stroke="#DC2626"
          strokeWidth="9.5"
          strokeLinecap="round"
          pathLength="142"
        />
        {/* Arm 2 highlight glint */}
        <line
          className={styles.crossArm2}
          x1="88" y1="12" x2="12" y2="88"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="142"
        />
      </svg>
    </div>

    {/* Caption below */}
    <div className={styles.modelCaption}>
      <span className={styles.captionDot} />
      <span>MANUAL RECONCILIATION — HOURS WASTED</span>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN BookDemoScene
   ══════════════════════════════════════════════════════════════════════════════ */
export const BookDemoScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [software, setSoftware] = useState('Tally Prime');
  const [timing,   setTiming]   = useState(TIMING_OPTIONS[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
    const win = window as unknown as { lenis?: { resize: () => void } };
    win.lenis?.resize?.();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
  };

  const waMsg = encodeURIComponent(
    `Hello RecoBit! I'd like to book a 15-min live demo.\nName: ${name || 'Interested CA'}\nSoftware: ${software}\nSlot: ${timing}`
  );
  const waUrl = `https://wa.me/919876543210?text=${waMsg}`;

  return (
    <section ref={sectionRef} id="book-demo" className={styles.demoSection}>
      {/* Ambient glows */}
      <div className={styles.ambientGlowOrange} />
      <div className={styles.ambientGlowGreen} />

      {/* ── SINGLE LINE HEADLINE ── */}
      <div className={styles.headlineStrip}>
        <h2 className={styles.mainHeadline}>
          Stop wasting time in manual reco —{' '}
          <span className={styles.headlineHighlight}>book a demo and save your time.</span>
        </h2>
      </div>

      {/* ── SPLIT: LEFT MODEL + RIGHT FORM ── */}
      <div className={styles.splitBody}>

        {/* LEFT: 3D mahogany register + sequential draw cross */}
        <div className={styles.leftModelWrap}>
          <ManualRegisterModel />
        </div>

        {/* RIGHT: Premium glass form */}
        <div className={styles.rightFormWrap}>
          <div className={styles.glassFormCard}>

            {!isSubmitted ? (
              <>
                {/* Single label — no subtitle, no extra heading */}
                <div className={styles.formTopLabel}>
                  <span className={styles.formDot} />
                  <h3 className={styles.formTopTitle}>Book a Live Free Demo</h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.formFields}>

                  {/* Full Name */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="CA Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.fieldInput}
                    />
                  </div>

                  {/* Phone */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Phone / WhatsApp</label>
                    <div className={styles.phoneFieldWrap}>
                      <div className={styles.phonePrefix}>
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.phoneFieldInput}
                      />
                    </div>
                  </div>

                  {/* Software + Slot */}
                  <div className={styles.fieldRowDouble}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Your Software</label>
                      <select
                        value={software}
                        onChange={(e) => setSoftware(e.target.value)}
                        className={styles.fieldSelect}
                      >
                        {SOFTWARE_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Preferred Slot</label>
                      <select
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className={styles.fieldSelect}
                      >
                        {TIMING_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button type="submit" className={styles.submitButton}>
                    <span className={styles.submitShimmer} />
                    <span>⚡ Book My Free Demo Slot</span>
                    <span>→</span>
                  </button>

                  {/* WhatsApp — full visible button, always clickable */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    <span className={styles.waLiveDot} />
                    <span>💬 Chat on WhatsApp Instead</span>
                  </a>

                </form>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className={styles.successWrap}>
                <div className={styles.successCircle}>✓</div>
                <h3 className={styles.successH}>Demo Confirmed!</h3>
                <p className={styles.successP}>
                  Thanks <strong>{name}</strong>! Our specialist will send you the meet link on WhatsApp shortly.
                </p>
                <div className={styles.successRecap}>
                  <div className={styles.recapItem}>
                    <span className={styles.recapLbl}>SOFTWARE</span>
                    <span className={styles.recapVal}>{software}</span>
                  </div>
                  <div className={styles.recapItem}>
                    <span className={styles.recapLbl}>SLOT</span>
                    <span className={styles.recapVal}>{timing}</span>
                  </div>
                </div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.successWaBtn}>
                  💬 Open WhatsApp Confirmation
                </a>
                <button type="button" onClick={handleReset} className={styles.successResetBtn}>
                  Book Another Slot
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── RICH EXECUTIVE FOOTER: Left, Center & Right content ── */}
      <Footer />
    </section>
  );
};
