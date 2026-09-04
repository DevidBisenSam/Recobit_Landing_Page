'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Lock, User, Users, Printer, FileCheck } from 'lucide-react';
import styles from './AuditTrailScene.module.css';

gsap.registerPlugin(ScrollTrigger);

export const AuditTrailScene: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'team' | 'solo'>('team');
  const [printing, setPrinting] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const makerNodeRef = useRef<HTMLDivElement>(null);
  const checkerNodeRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const photonRef = useRef<HTMLDivElement>(null);
  const certBarRef = useRef<HTMLDivElement>(null);
  const hashTextRef = useRef<HTMLSpanElement>(null);

  // Live streaming hexadecimal hash simulation
  useEffect(() => {
    const chars = '0123456789ABCDEF';
    const interval = setInterval(() => {
      if (hashTextRef.current) {
        let hash = '0x';
        for (let i = 0; i < 6; i++) hash += chars[Math.floor(Math.random() * chars.length)];
        hash += '...';
        for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * chars.length)];
        hashTextRef.current.textContent = hash;
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 900) return;

    const ctx = gsap.context(() => {
      // Master Scroll-driven timeline across 500vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Beat 1: Maker node pulses with energy
      tl.fromTo(
        makerNodeRef.current,
        { scale: 0.95, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.2
      );

      // Beat 2: Core lock charges up with energy
      tl.fromTo(
        coreRef.current,
        { scale: 0.9 },
        { scale: 1.05, duration: 0.8, ease: 'back.out(1.8)' },
        1.2
      );

      // Beat 3: Checker node flashes emerald green
      tl.fromTo(
        checkerNodeRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.8, ease: 'power2.out' },
        2.2
      );

      // Beat 4: Certificate bar slides up into view
      tl.fromTo(
        certBarRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        3.0
      );

    }, trackRef);

    return () => ctx.revert();
  }, [activeMode]);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 300);
  };

  return (
    <div ref={trackRef} id="act-5-trust" className={styles.scrollTrack}>
      <div className={styles.stickyStage}>

        {/* ================================================================
            HEADER — Minimal, High-Impact
            ================================================================ */}
        <div className={styles.vaultHeader}>
          <div className={styles.vaultEyebrow}>
            <span className={styles.eyebrowRadar} />
            <span>05 · INTERNAL CONTROL &amp; AUDIT READY</span>
          </div>

          <h2 className={styles.vaultHeadline}>
            Zero Human Mistakes.{' '}
            <span className={styles.headlineGradient}>100% Audit-Proof.</span>
          </h2>

          <p className={styles.vaultSubline}>
            Every match, correction, and balance confirmation is fully recorded with date and user details.
            Perfect for independent accountants as well as multi-person finance teams.
          </p>

          {/* Dual-Mode Interactive Morphing Switcher */}
          <div className={styles.modeSelector}>
            <button
              type="button"
              className={`${styles.modeToggleBtn} ${activeMode === 'team' ? styles.modeToggleActive : ''}`}
              onClick={() => setActiveMode('team')}
              title="View enterprise Maker-Checker dual control"
            >
              <Users size={14} />
              <span>Team Mode (Maker &amp; Checker)</span>
            </button>
            <button
              type="button"
              className={`${styles.modeToggleBtn} ${activeMode === 'solo' ? styles.modeToggleActive : ''}`}
              onClick={() => setActiveMode('solo')}
              title="View solo accountant automated self-audit"
            >
              <User size={14} />
              <span>Single User Mode (Self-Check)</span>
            </button>
          </div>
        </div>

        {/* ================================================================
            CENTER 3D KINETIC MACHINE (Laser Conduit + 3D Glass Nodes)
            ================================================================ */}
        <div className={styles.kineticStage}>

          {/* Laser Conduit (Energy Beam) */}
          <div className={styles.laserConduit}>
            <div ref={photonRef} className={styles.laserPhoton} />
          </div>

          {/* Node 1: THE MAKER (Left) */}
          <div
            ref={makerNodeRef}
            className={`${styles.nodeMaker} ${activeMode === 'solo' ? styles.nodeMakerSolo : ''}`}
          >
            <div className={styles.makerCoreOrb}>
              <div className={styles.makerPulseRing} />
              <ShieldCheck size={24} />
            </div>

            <span className={styles.nodeRoleTag}>
              {activeMode === 'team' ? 'ROLE 01 · MAKER' : 'SINGLE ACCOUNTANT'}
            </span>

            <h3 className={styles.nodeTitle}>
              {activeMode === 'team' ? 'The Maker' : 'Self-Check Verification'}
            </h3>

            <p className={styles.nodeSub}>
              {activeMode === 'team'
                ? 'Accountant checks statements & reviews matches'
                : 'Automated verification on every entry'}
            </p>

            <div className={styles.nodeHudBox}>
              <div className={styles.hudRow}>
                <span>TOTAL ENTRIES</span>
                <span className={styles.hudValBlue}>10,000 VOUCHERS</span>
              </div>
              <div className={styles.hudRow}>
                <span>MATCH ACCURACY</span>
                <span className={styles.hudValGreen}>100% ACCURATE</span>
              </div>
              <div className={styles.hudRow}>
                <span>BALANCE DIFFERENCE</span>
                <span className={styles.hudValGreen}>₹0.00 ZERO DIFFERENCE</span>
              </div>
            </div>
          </div>

          {/* Center: THE IMMUTABLE VAULT CORE */}
          <div ref={coreRef} className={styles.vaultCore}>
            <div className={styles.coreOuterRing} />
            <div className={styles.coreInnerDisc}>
              <span className={styles.coreLockIcon}>🔒</span>
              <span ref={hashTextRef} className={styles.coreHashStream}>
                AUDIT REF #9402
              </span>
            </div>
            <span className={styles.coreStatusBadge}>
              {activeMode === 'team' ? 'TAMPER-PROOF AUDIT LOCK' : 'AUTOMATED INTEGRITY'}
            </span>
          </div>

          {/* Node 2: THE CHECKER (Right) */}
          <div
            ref={checkerNodeRef}
            className={`${styles.nodeChecker} ${activeMode === 'solo' ? styles.nodeCheckerSolo : ''}`}
          >
            <div className={styles.checkerCoreOrb}>
              <div className={styles.checkerRadarSweep} />
              <Lock size={22} />
            </div>

            <span className={styles.nodeRoleTagChecker}>ROLE 02 · CHECKER</span>

            <h3 className={styles.nodeTitle}>The Checker</h3>

            <p className={styles.nodeSub}>
              Senior Accountant or CA verifies &amp; approves daybook push
            </p>

            <div className={styles.nodeHudBox}>
              <div className={styles.hudRow}>
                <span>FOUR-EYES CHECK</span>
                <span className={styles.hudValGreen}>SENIOR SIGN-OFF</span>
              </div>
              <div className={styles.hudRow}>
                <span>AUTHORIZATION</span>
                <span className={styles.hudValGreen}>SUPERVISOR APPROVED</span>
              </div>
              <div className={styles.hudRow}>
                <span>DAYBOOK SYNC</span>
                <span className={styles.hudValGreen}>VOUCHERS LOCKED</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================
            BOTTOM HOLOGRAPHIC CERTIFICATE (Scroll Payoff)
            ================================================================ */}
        <div ref={certBarRef} className={styles.certificateBar}>
          <div className={styles.certLeft}>
            <div className={styles.certSealBadge}>
              <FileCheck size={18} />
            </div>
            <div className={styles.certTextWrap}>
              <span className={styles.certTitle}>
                100% AUDIT-READY · VERIFIED RECONCILIATION REPORT
              </span>
              <span className={styles.certSub}>
                Session #REC-9402 · Complete User Activity Record · Ready for CA &amp; Year-End Audits
              </span>
            </div>
          </div>

          <button
            type="button"
            className={styles.printBtnPrimary}
            onClick={handlePrint}
            title="Download or Print Verified Reconciliation Report"
          >
            <Printer size={15} />
            <span>{printing ? 'Preparing Document...' : 'Print Verified Reconciliation Report (PDF)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
