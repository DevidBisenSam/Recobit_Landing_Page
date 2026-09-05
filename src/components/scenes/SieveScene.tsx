'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SieveScene.module.css';

gsap.registerPlugin(ScrollTrigger);

// Dynamic import — SSR disabled (react-pageflip needs browser window APIs)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
  loading: () => <div className={styles.bookPlaceholder} />,
}) as React.ComponentType<any>;

// ─── 5 RECONCILIATION PAGES WITH DEDICATED DETAIL FOR LEFT PAGES ─────────────────────
const CARDS = [
  {
    id: 'exact',
    folioNo: '01',
    tabLabel: '01 MATCHED',
    stamp: '✓ 100% MATCHED & RECONCILED',
    badge: '01 · EXACT 100% MATCH',
    status: 'AUTO-MATCHED',
    title: 'Matched Entries',
    desc: 'Transactions where Date, Amount, and Bank Reference match exactly between Bank Statement and Company Books. Cleared instantly with zero manual effort.',
    rulesLabel: 'MATCH CRITERIA',
    rules: ['✓ Exact Amount Match', '✓ Bank Reference Match', '✓ Same Date'],
    stat: '8,940',
    statLabel: 'Entries automatically matched with zero difference',
    confidence: '100% Exact Match',
    next: 'Next: Unmatched Entries (420)',
    accentColor: '#059669',
    accentLight: 'rgba(5,150,105,0.1)',
    leftEvidence: {
      heading: 'MATCHED ENTRIES (100% MATCH)',
      sub: 'Bank Statement and Company Books match exactly with zero difference',
      bankRow: {
        date: '14-APR-2026',
        ref: 'NEFT Inflow — Infosys Ltd',
        utr: 'UTR: AXISN2610492811',
        amount: '₹8,94,250.00',
        type: 'Bank Statement (Credit)',
      },
      booksRow: {
        date: '14-APR-2026',
        ref: 'Infosys Technologies A/c',
        vch: 'Voucher: RCT-0892',
        amount: '₹8,94,250.00',
        type: 'Company Books (Debit)',
      },
      auditChecks: [
        { label: 'Amount Difference', val: '₹0.00 (Exact Match)' },
        { label: 'Date Match', val: 'Same Date (14-Apr)' },
        { label: 'Status', val: 'Matched & Cleared' },
      ],
      note: 'Matched automatically without any manual checking.',
    },
  },
  {
    id: 'unmatched',
    folioNo: '02',
    tabLabel: '02 UNMATCHED',
    stamp: '⚠️ QUICK REVIEW NEEDED',
    badge: '02 · MINOR DIFFERENCES',
    status: 'NEEDS REVIEW',
    title: 'Unmatched Entries',
    desc: 'Entries with date differences, unclear bank narrations, or small deductions. RecoBit flags the exact reasons clearly—taking away daily reconciliation confusion.',
    rulesLabel: 'DIFFERENCES DETECTED',
    rules: ['📅 Date Difference', '🏷️ Party Name Difference', '₹ Small Deduction'],
    stat: '420',
    statLabel: 'Entries with clear reasons ready for 1-click review',
    confidence: 'Reason Identified',
    next: 'Next: In Bank, Missing in Books (380)',
    accentColor: '#D97706',
    accentLight: 'rgba(217,119,6,0.1)',
    leftEvidence: {
      heading: 'UNMATCHED ENTRIES (NEEDS REVIEW)',
      sub: 'Exact reasons shown for every difference — no manual searching through statements',
      bankRow: undefined,
      booksRow: undefined,
      items: [
        {
          label: '📅 Date Difference',
          tag: '3 Days Lag',
          desc: 'Bank value date is 12-Apr; entered in books on 15-Apr. Linked automatically.',
        },
        {
          label: '🏷️ Party Name Difference',
          tag: 'Party Found',
          desc: 'Bank statement says "UPI/RAHUL ENTERPRISES". Auto-linked to party "Rahul Traders" in books.',
        },
        {
          label: '₹ Small Amount Difference',
          tag: '₹90 Bank Fee',
          desc: '₹50,000 payment received as ₹49,910. Difference of ₹90 identified as bank deduction.',
        },
      ],
      auditChecks: [
        { label: 'Reason Status', val: 'Exact Reason Identified' },
        { label: 'Action Required', val: '1-Click Approve' },
      ],
      note: 'Shows the exact reason for every difference — solves daily confusion instantly.',
    },
  },
  {
    id: 'missingBooks',
    folioNo: '03',
    tabLabel: '03 INFLOWS',
    stamp: '⚡ AUTO-VOUCHER READY',
    badge: '03 · DIRECT BANK DEPOSITS',
    status: 'RECEIPT DETECTED',
    title: 'In Bank, Missing in Books',
    desc: 'Direct customer NEFT/UPI deposits reflecting in your bank statement that have no voucher in your daybook. Create receipt vouchers in 1 click.',
    rulesLabel: 'EASY VOUCHER CREATION',
    rules: ['📥 Direct Deposits', '⚡ 1-Click Voucher', '📋 Customer Suggested'],
    stat: '380',
    statLabel: 'Direct deposits ready for 1-click entry in books',
    confidence: 'Customer Identified',
    next: 'Next: In Books, Missing in Bank (180)',
    accentColor: '#2563EB',
    accentLight: 'rgba(37,99,235,0.1)',
    leftEvidence: {
      heading: 'IN BANK, MISSING IN BOOKS',
      sub: 'Customer payments received in bank that need a receipt voucher in books',
      bankRow: undefined,
      booksRow: undefined,
      items: [
        {
          label: '📥 Direct Bank Deposit',
          tag: '₹1,45,000.00',
          desc: 'Customer paid directly via NEFT. Visible in bank statement, but missing in books.',
        },
        {
          label: '🔍 Customer Identified',
          tag: 'Sharma Industries',
          desc: 'System identified customer "Sharma Industries" from past payment records.',
        },
        {
          label: '⚡ Ready Receipt Voucher',
          tag: 'Receipt Voucher',
          desc: 'Debit: Bank ₹1,45,000 | Credit: Sharma Industries ₹1,45,000. Ready to post in 1 click.',
        },
      ],
      auditChecks: [
        { label: 'Customer Match', val: 'Found from Past Records' },
        { label: 'Voucher Type', val: 'Receipt Voucher (1-Click)' },
      ],
      note: 'Create missing receipt vouchers in your books with just one click.',
    },
  },
  {
    id: 'missingBank',
    folioNo: '04',
    tabLabel: '04 TRANSIT',
    stamp: '⏳ PENDING IN BANK',
    badge: '04 · ENTRIES PENDING IN BANK',
    status: 'AWAITING CLEARING',
    title: 'In Books, Missing in Bank',
    desc: 'All entries logged in your books that have not yet cleared the bank statement—including cheques issued to suppliers, cheques deposited, and online payments in transit.',
    rulesLabel: 'ALL BOOK ENTRIES PENDING IN BANK',
    rules: ['📤 Cheques Issued', '📥 Cheques Deposited', '⏳ Online Transfers in Transit'],
    stat: '180',
    statLabel: 'Entries in books awaiting bank clearance',
    confidence: 'Transit Monitored',
    next: 'Next: Bank Charges (80)',
    accentColor: '#7C3AED',
    accentLight: 'rgba(124,58,237,0.1)',
    leftEvidence: {
      heading: 'IN BOOKS, MISSING IN BANK',
      sub: 'All entries entered in books that are waiting to reflect in the bank statement',
      bankRow: undefined,
      booksRow: undefined,
      items: [
        {
          label: '📤 Cheques Issued to Suppliers',
          tag: 'Unpresented Cheques',
          desc: 'Payment cheques issued & logged in daybook, waiting for suppliers to deposit in bank.',
        },
        {
          label: '📥 Cheques Deposited by You',
          tag: 'Awaiting Bank Credit',
          desc: 'Customer cheques entered in books & deposited, waiting for bank clearance credit.',
        },
        {
          label: '⏳ Online Payments in Transit',
          tag: 'Settlement Lag',
          desc: 'NEFT, RTGS, or vendor payout entries recorded in books pending banking settlement.',
        },
      ],
      auditChecks: [
        { label: 'Cheques & Transfers', val: 'All Transit Types Monitored' },
        { label: 'Reconciliation', val: 'Zero Suspense Imbalance' },
      ],
      note: 'Tracks all cheques and transit entries easily without manual registers.',
    },
  },
  {
    id: 'charges',
    folioNo: '05',
    tabLabel: '05 CHARGES',
    stamp: '⚡ 1-CLICK PUSH TO LEDGER',
    badge: '05 · DEDICATED BANK CHARGES TAB',
    status: 'CHARGES ISOLATED',
    title: 'Bank Charges',
    desc: 'All bank service fees, IMPS/NEFT charges, and deductions are isolated into this dedicated tab—so you can push them directly to your Bank Charges expense ledger in 1 single click.',
    rulesLabel: '1-CLICK EXPENSE POSTING',
    rules: ['📑 Charges Isolated in Tab', '⚡ 1-Click Push to Ledger', '🛡️ Clean Vendor Accounts'],
    stat: '80',
    statLabel: 'Bank charge entries ready for 1-click ledger posting',
    confidence: 'Ready to Post',
    next: 'Reconciliation Complete',
    accentColor: '#0284C7',
    accentLight: 'rgba(2,132,199,0.1)',
    leftEvidence: {
      heading: 'BANK CHARGES',
      sub: 'All bank charges isolated into a separate tab — push to your expense ledger in 1 click',
      bankRow: undefined,
      booksRow: undefined,
      items: [
        {
          label: '📑 IMPS / NEFT & Service Fees',
          tag: 'Charges Detected',
          desc: 'Bank service fees, transaction charges, and statement deductions isolated from main entries.',
        },
        {
          label: '⚡ 1-Click Push to Ledger',
          tag: 'Push to Expense',
          desc: 'Push all charges directly to "Bank Charges Account" in your books with just a single click.',
        },
        {
          label: '🛡️ Clean Party Ledgers',
          tag: 'Vendor Ledgers Pure',
          desc: 'Bank charges are separated cleanly so they never corrupt vendor accounts or distort balances.',
        },
      ],
      auditChecks: [
        { label: 'Charges Tab', val: 'Isolated in Separate Tab' },
        { label: 'Posting Action', val: '1-Click Push to Expense Ledger' },
      ],
      note: 'Push all bank charges to your expense ledger in 1 single click.',
    },
  },
];

// ─── SUB-COMPONENTS FOR FLIPBOOK PAGES (forwardRef required) ──────────────────

// PAGE 0: Front Cover — Realistic Mahogany Hardwood with Minimal Gold Foil Stamping
const CoverPage = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={styles.page}>
    <div className={styles.pageCover}>
      <div className={styles.coverCornerTL} />
      <div className={styles.coverCornerTR} />
      <div className={styles.coverCornerBL} />
      <div className={styles.coverCornerBR} />
      <div className={styles.coverGoldFrame} />

      <div className={styles.coverSpine}>
        <div className={styles.coverSpineSeam} />
        <span className={styles.coverSpineText}>BANK RECONCILIATION REGISTER</span>
      </div>

      <div className={styles.coverBody}>
        <div className={styles.coverEmblem}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8))' }}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <polyline points="3 3 3 8 8 8" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <polyline points="21 21 21 16 16 16" />
          </svg>
        </div>
        <h2 className={styles.coverBrand}>RECOBIT</h2>
        <h3 className={styles.coverTitle}>AUTOMATED BANK RECONCILIATION</h3>
        <div className={styles.coverDividerBar} />
        <div className={styles.coverAccent}>5-WAY TRANSACTION CLEARING</div>
      </div>
    </div>
  </div>
));
CoverPage.displayName = 'CoverPage';

// PAGES 1, 3, 5, 7, 9: Left Page Reconciliation Detail
const EvidencePage = React.forwardRef<
  HTMLDivElement,
  { card: typeof CARDS[0] }
>(({ card }, ref) => {
  const ev = card.leftEvidence;
  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.pageInnerLeft}>
        <div className={styles.pageEvidence}>
          <div className={styles.evidenceSpine}>
            <div className={styles.evidencePunchHole} />
            <div className={styles.evidencePunchHole} />
            <div className={styles.evidencePunchHole} />
          </div>

          <div className={styles.evidenceBody}>
            <div className={styles.evidenceTopBar}>
              <span className={styles.evidenceFolioTag} style={{ color: card.accentColor }}>
                PAGE {card.folioNo} · {card.title.toUpperCase()}
              </span>
              <span className={styles.evidenceDocTitle}>STATEMENT VS BOOKS</span>
            </div>

            <div className={styles.evidenceHeader}>
              <h4 className={styles.evidenceTitle} style={{ color: card.accentColor }}>
                {ev.heading}
              </h4>
              <p className={styles.evidenceSub}>{ev.sub}</p>
            </div>

            <div className={styles.evidenceList}>
              {/* If 1:1 Match Evidence */}
              {ev.bankRow && ev.booksRow && (
                <div className={styles.matchPairContainer}>
                  <div className={styles.matchPairRow}>
                    <span className={styles.matchPairLabel}>BANK STATEMENT</span>
                    <div className={styles.matchPairDetails}>
                      <span className={styles.matchPairText}>
                        {ev.bankRow.date} · {ev.bankRow.ref}
                      </span>
                      <span className={styles.matchPairAmount}>{ev.bankRow.amount}</span>
                    </div>
                  </div>
                  <div className={styles.matchPairRow}>
                    <span className={styles.matchPairLabel}>COMPANY BOOKS</span>
                    <div className={styles.matchPairDetails}>
                      <span className={styles.matchPairText}>
                        {ev.booksRow.date} · {ev.booksRow.ref}
                      </span>
                      <span className={styles.matchPairAmount}>{ev.booksRow.amount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* If Breakdown Items List */}
              {ev.items &&
                ev.items.map((item, idx) => (
                  <div key={idx} className={styles.evidenceItem}>
                    <div className={styles.evidenceItemRow}>
                      <span className={styles.evidenceItemLabel}>{item.label}</span>
                      <span
                        className={styles.evidenceItemTag}
                        style={{ background: card.accentLight, color: card.accentColor }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <span className={styles.evidenceItemDesc}>{item.desc}</span>
                  </div>
                ))}
            </div>

            {/* Reconciliation Checks */}
            <div className={styles.evidenceChecksRow}>
              {ev.auditChecks.map((check, idx) => (
                <div key={idx} className={styles.evidenceCheckCard}>
                  <span className={styles.evidenceCheckLabel}>{check.label}</span>
                  <span className={styles.evidenceCheckVal} style={{ color: card.accentColor }}>
                    {check.val}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.evidenceFooterNote}>
              ✓ {ev.note}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
EvidencePage.displayName = 'EvidencePage';

// PAGES 2, 4, 6, 8, 10: Right Page Action Folio
const FolioPage = React.forwardRef<
  HTMLDivElement,
  { card: typeof CARDS[0] }
>(({ card }, ref) => (
  <div ref={ref} className={styles.page}>
    <div className={styles.pageInnerRight}>
      <div className={styles.folioSheet}>
        <div className={styles.folioSpine}>
          <div className={styles.punchHole} />
          <div className={styles.punchHole} />
          <div className={styles.punchHole} />
        </div>

        <div className={styles.folioBody}>
          <div className={styles.folioTopBar}>
            <div className={styles.folioRefGroup}>
              <span className={styles.folioRefTag}>PAGE</span>
              <span className={styles.folioRefNum} style={{ color: card.accentColor }}>
                0{card.folioNo} OF 05
              </span>
            </div>
            <div className={styles.folioRegisterTitle}>BANK RECONCILIATION</div>
            <div className={styles.folioFyTag} style={{ color: card.accentColor }}>
              {card.title.toUpperCase()}
            </div>
          </div>

          <div className={styles.folioCardHeader}>
            <div className={styles.folioBadgeRow}>
              <span
                className={styles.folioBadge}
                style={{ background: card.accentLight, color: card.accentColor }}
              >
                <span className={styles.folioBadgeDot} style={{ background: card.accentColor }} />
                {card.badge}
              </span>
              <span className={styles.folioStatusPill}>{card.status}</span>
            </div>
            <h3 className={styles.folioTitle} style={{ color: card.accentColor }}>
              {card.title}
            </h3>
            <p className={styles.folioDesc}>{card.desc}</p>
          </div>

          <div className={styles.folioRulesBox}>
            <span className={styles.folioRulesHeader}>{card.rulesLabel}</span>
            <div className={styles.folioChipsRow}>
              {card.rules.map((rule, i) => (
                <span key={i} className={styles.folioChip}>
                  {rule}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.folioFooter}>
            <div className={styles.folioFooterLeft}>
              <span className={styles.folioStatNum} style={{ color: card.accentColor }}>
                {card.stat}
              </span>
              <span className={styles.folioStatLabel}>{card.statLabel}</span>
            </div>
            <div className={styles.folioFooterRight}>
              <div
                className={styles.auditRubberStamp}
                style={{ color: card.accentColor, borderColor: card.accentColor }}
              >
                {card.stamp}
              </div>
              <span
                className={styles.folioPill}
                style={{ background: card.accentLight, color: card.accentColor }}
              >
                {card.confidence}
              </span>
              <span className={styles.folioNext}>↓ {card.next}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
FolioPage.displayName = 'FolioPage';

// PAGE 11: Back Cover — Real Mahogany Hardwood with Gold Embossed Seal (Book Closed)
const BackCoverPage = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={styles.page}>
    <div className={styles.pageBackCover}>
      <div className={styles.coverCornerTL} />
      <div className={styles.coverCornerTR} />
      <div className={styles.coverCornerBL} />
      <div className={styles.coverCornerBR} />
      <div className={styles.coverGoldFrame} />

      <div className={styles.backCoverMedallion}>
        <div className={styles.backCoverWaxSeal}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8))' }}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <polyline points="3 3 3 8 8 8" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <polyline points="21 21 21 16 16 16" />
          </svg>
        </div>
        <h3 className={styles.backCoverGoldTitle}>RECONCILIATION COMPLETE</h3>
        <p className={styles.backCoverSub}>
          BANK PASSBOOK &amp; GENERAL LEDGER BALANCED
        </p>
        <p className={styles.backCoverAudit}>
          NET VARIANCE : NIL · AUDIT TRAIL VERIFIED
        </p>
      </div>
    </div>
  </div>
));
BackCoverPage.displayName = 'BackCoverPage';

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const SieveScene: React.FC = () => {
  const sectionRef          = useRef<HTMLDivElement>(null);
  const introBeatRef        = useRef<HTMLDivElement>(null);
  const introEyebrowRef     = useRef<HTMLDivElement>(null);
  const introPunchBlockRef  = useRef<HTMLDivElement>(null);
  const introSubRef         = useRef<HTMLParagraphElement>(null);
  const introDividerRef     = useRef<HTMLDivElement>(null);
  const introCoolLineRef    = useRef<HTMLParagraphElement>(null);

  const pinContainerRef     = useRef<HTMLDivElement>(null);
  const bookWrapRef         = useRef<HTMLDivElement>(null);
  const bookRef             = useRef<any>(null);
  const pageFlipInstanceRef = useRef<any>(null);
  const currentSpreadRef    = useRef<number>(0);
  const userHasScrolledRef  = useRef<boolean>(false);
  const autoOpenTimerRef    = useRef<NodeJS.Timeout | null>(null);

  const outroBeatRef     = useRef<HTMLDivElement>(null);
  const outroEyebrowRef  = useRef<HTMLParagraphElement>(null);
  const outroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const manualCardRef    = useRef<HTMLDivElement>(null);
  const strikeLineRef    = useRef<HTMLSpanElement>(null);
  const versusRef        = useRef<HTMLDivElement>(null);
  const recobitCardRef   = useRef<HTMLDivElement>(null);
  const trustBadgesRef   = useRef<HTMLDivElement>(null);

  const [bookReady, setBookReady]     = useState(false);
  const [spreadState, setSpreadState] = useState(0);

  // 1. AUTO-OPEN FIRST PAGE AFTER 1.8 SECONDS (Only triggers when user arrives at the book)
  const triggerAutoOpenIfNeeded = useCallback(() => {
    if (userHasScrolledRef.current || currentSpreadRef.current !== 0) return;
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);

    autoOpenTimerRef.current = setTimeout(() => {
      if (!userHasScrolledRef.current && currentSpreadRef.current === 0) {
        const pf = pageFlipInstanceRef.current || bookRef.current?.pageFlip?.();
        if (pf) {
          currentSpreadRef.current = 1;
          setSpreadState(1);
          pf.flipNext?.();
        }
      }
    }, 1800);
  }, []);

  // Fallback to guarantee bookReady initializes even if onInit is delayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookReady(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // 2. MASTER PINNED SCROLLTRIGGERS (DESKTOP) VS RESPONSIVE SCROLL ANIMATIONS (TABLET & MOBILE)
  useEffect(() => {
    if (!bookReady) return;

    const mm = gsap.matchMedia(sectionRef);

    // ── DESKTOP MONITOR / LAPTOP: PINNED SCRUB TIMELINES (100% PRESERVED) ───
    mm.add('(min-width: 1201px) and (hover: hover) and (pointer: fine)', () => {
      // SCREEN 1: PINNED EDITORIAL HOOK (80% PROBLEM PUNCH)
      if (introBeatRef.current) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            id: 'sieve-intro-pin',
            trigger: introBeatRef.current,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        introTl
          .fromTo(
            introEyebrowRef.current,
            { y: -30, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
            0
          )
          .fromTo(
            introPunchBlockRef.current,
            { y: 35, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'power3.out' },
            0.06
          )
          .fromTo(
            introSubRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.24, ease: 'power2.out' },
            0.16
          )
          .fromTo(
            introDividerRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.2, ease: 'power2.out' },
            0.24
          )
          .fromTo(
            introCoolLineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.26, ease: 'power2.out' },
            0.30
          )
          .to({}, { duration: 0.35 }, 0.50)
          .to(
            [
              introEyebrowRef.current,
              introPunchBlockRef.current,
              introSubRef.current,
              introDividerRef.current,
              introCoolLineRef.current,
            ],
            {
              y: -25,
              opacity: 0,
              duration: 0.2,
              ease: 'power2.in',
            },
            0.82
          );
      }

      // SCREEN 2: 3D WOODEN BOOK PINNING & PAGE-FLIP SCRUBBING
      if (pinContainerRef.current) {
        ScrollTrigger.create({
          id: 'sieve-book-pin',
          trigger: pinContainerRef.current,
          start: 'top top',
          end: '+=3500',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          onEnter: () => {
            triggerAutoOpenIfNeeded();
          },
          onUpdate: (self) => {
            userHasScrolledRef.current = true;
            if (autoOpenTimerRef.current) {
              clearTimeout(autoOpenTimerRef.current);
              autoOpenTimerRef.current = null;
            }
            const p = self.progress;

            let targetSpread = 0;
            if (p < 0.10) targetSpread = 0;
            else if (p < 0.26) targetSpread = 1;
            else if (p < 0.42) targetSpread = 2;
            else if (p < 0.58) targetSpread = 3;
            else if (p < 0.74) targetSpread = 4;
            else if (p < 0.90) targetSpread = 5;
            else targetSpread = 6;

            if (targetSpread !== currentSpreadRef.current) {
              const prevSpread = currentSpreadRef.current;
              currentSpreadRef.current = targetSpread;
              setSpreadState(targetSpread);

              const pf = pageFlipInstanceRef.current || bookRef.current?.pageFlip?.();
              if (pf) {
                const targetPage = targetSpread === 0 ? 0 : targetSpread === 6 ? 11 : targetSpread * 2;
                if (targetSpread === prevSpread + 1) {
                  pf.flipNext?.();
                } else if (targetSpread === prevSpread - 1) {
                  pf.flipPrev?.();
                } else {
                  pf.flip?.(targetPage);
                }
              }
            }
          },
        });
      }

      // SCREEN 3: MASTER PINNED OUTRO TRANSFORMATION BENCHMARK
      if (outroBeatRef.current) {
        const outroTl = gsap.timeline({
          scrollTrigger: {
            id: 'sieve-outro-pin',
            trigger: outroBeatRef.current,
            start: 'top top',
            end: '+=1300',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        outroTl
          .fromTo(
            outroEyebrowRef.current,
            { opacity: 0, y: -25, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'power2.out' },
            0
          )
          .fromTo(
            outroHeadlineRef.current,
            { opacity: 0, y: 30, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            manualCardRef.current,
            { x: -70, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.26, ease: 'power3.out' },
            0.12
          )
          .fromTo(
            strikeLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.20, ease: 'power2.inOut' },
            0.24
          )
          .fromTo(
            versusRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)' },
            0.28
          )
          .fromTo(
            recobitCardRef.current,
            { x: 70, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.26, ease: 'power3.out' },
            0.32
          )
          .fromTo(
            trustBadgesRef.current,
            { y: 25, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(1.5)' },
            0.42
          )
          .to({}, { duration: 0.45 }, 0.55);
      }
    });

    // ── TABLET & MOBILE (PORTRAIT & LANDSCAPE): SMOOTH SCROLL ENTRANCE ANIMATIONS ──
    mm.add('(max-width: 1200px), (pointer: coarse), (hover: none)', () => {
      // SCREEN 1 (80% HOOK): Smooth staggered scroll entrance on tablet & mobile
      if (introBeatRef.current) {
        const introMobTl = gsap.timeline({
          scrollTrigger: {
            trigger: introBeatRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        introMobTl
          .fromTo(
            introEyebrowRef.current,
            { y: -25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(
            introPunchBlockRef.current,
            { y: 35, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.25'
          )
          .fromTo(
            introSubRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            introDividerRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
          )
          .fromTo(
            introCoolLineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '-=0.2'
          );
      }

      // SCREEN 2 (5-STREAM MOBILE CARDS): Header + Cards appear one-by-one on scroll
      const headerEl = sectionRef.current?.querySelector(`.${styles.mobileSectionHeader}`);
      if (headerEl) {
        gsap.fromTo(
          headerEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const mobileCards = sectionRef.current?.querySelectorAll(`.${styles.mobileCard}`);
      mobileCards?.forEach((cardEl) => {
        gsap.fromTo(
          cardEl,
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardEl,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // SCREEN 3 (THE RECOBIT TRANSFORMATION): Executive benchmark animation with red strike line & pulse
      if (outroBeatRef.current) {
        const outroMobTl = gsap.timeline({
          scrollTrigger: {
            trigger: outroBeatRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        outroMobTl
          .fromTo(
            outroEyebrowRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          )
          .fromTo(
            outroHeadlineRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.25'
          )
          .fromTo(
            manualCardRef.current,
            { y: 35, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            strikeLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
            '-=0.1'
          )
          .fromTo(
            versusRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' },
            '-=0.2'
          )
          .fromTo(
            recobitCardRef.current,
            { y: 35, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.25'
          )
          .fromTo(
            trustBadgesRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '-=0.2'
          );
      }
    });

    ScrollTrigger.refresh();
    const win = window as unknown as { lenis?: { resize: () => void } };
    win.lenis?.resize?.();

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      mm.revert();
    };
  }, [bookReady, triggerAutoOpenIfNeeded]);

  const onFlip = useCallback((e: any) => {
    if (e?.object) {
      pageFlipInstanceRef.current = e.object;
    }
    const page = e?.data ?? 0;
    let spread = 0;
    if (page === 0) spread = 0;
    else if (page >= 11) spread = 6;
    else spread = Math.ceil(page / 2);

    currentSpreadRef.current = spread;
    setSpreadState(spread);
  }, []);

  const onInit = useCallback((e: any) => {
    if (e?.object) {
      pageFlipInstanceRef.current = e.object;
    }
    setBookReady(true);
  }, []);

  return (
    <section ref={sectionRef} id="auto-matching" className={styles.sceneSection}>

      {/* =================================================================== */}
      {/* SCREEN 1: FRESH 100vh EDITORIAL HOOK (80% PROBLEM PUNCH)           */}
      {/* Clean, uncluttered, pinned so user experiences the animated punch  */}
      {/* =================================================================== */}
      <div ref={introBeatRef} className={styles.introScreen}>
        <div className={styles.introContent}>
          <div ref={introEyebrowRef} className={styles.introEyebrow}>
            <span className={styles.introEyebrowDot} />
            <span>WHERE FINANCE TEAMS LOSE DAYS</span>
          </div>

          <div ref={introPunchBlockRef} className={styles.introPunchBlock}>
            <span className={styles.introBigNum}>80%</span>
            <h3 className={styles.introPunchSub}>
              OF TIME IN RECONCILIATION <span className={styles.introPunchAccent}>IS SPENT SEARCHING FOR MATCHES</span>
            </h3>
          </div>

          <p ref={introSubRef} className={styles.introSub}>
            Before reconciliation even starts, your finance team is buried in unsorted bank data —
            manually comparing rows, hunting for missing customer entries, and guessing deposits.
          </p>

          <div ref={introDividerRef} className={styles.introDivider} />

          <p ref={introCoolLineRef} className={styles.introCoolLine}>
            Say goodbye to manual tick-marking. Every transaction from your bank and
            ledger is automatically classified into{' '}
            <span className={styles.orangeHighlight}>5 clear accounting buckets</span>{' '}
            — instantly.
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCREEN 2 (DESKTOP): PINNED 3D WOODEN BOOK STAGE (80% W & 80% H)     */}
      {/* 100% UNTOUCHED DESKTOP FLIPBOOK — NO HEADER, NO FOOTER              */}
      {/* =================================================================== */}
      <div ref={pinContainerRef} className={styles.pinContainer}>
        <div className={styles.bookStage}>
          <div
            ref={bookWrapRef}
            className={`${styles.bookWrapper} ${
              spreadState === 0
                ? styles.bookWrapperCoverCenter
                : spreadState === 6
                ? styles.bookWrapperBackCenter
                : styles.bookWrapperSpreadCenter
            }`}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={580}
              height={560}
              size="fixed"
              minWidth={320}
              maxWidth={640}
              minHeight={380}
              maxHeight={620}
              showCover={true}
              flippingTime={450}
              className={styles.flipBook}
              style={{}}
              drawShadow={false}
              maxShadowOpacity={0}
              usePortrait={false}
              autoSize={false}
              clickEventForward={false}
              useMouseEvents={false}
              swipeDistance={30}
              showPageCorners={false}
              disableFlipByClick={false}
              mobileScrollSupport={false}
              onFlip={onFlip}
              onInit={onInit}
            >
              {/* SPREAD 0: FRONT COVER (Single page on right, book closed) */}
              <CoverPage />

              {/* SPREAD 1: 01 MATCHED ENTRIES */}
              <EvidencePage card={CARDS[0]} />
              <FolioPage card={CARDS[0]} />

              {/* SPREAD 2: 02 UNMATCHED ENTRIES */}
              <EvidencePage card={CARDS[1]} />
              <FolioPage card={CARDS[1]} />

              {/* SPREAD 3: 03 IN BANK, MISSING IN BOOKS */}
              <EvidencePage card={CARDS[2]} />
              <FolioPage card={CARDS[2]} />

              {/* SPREAD 4: 04 IN BOOKS, MISSING IN BANK */}
              <EvidencePage card={CARDS[3]} />
              <FolioPage card={CARDS[3]} />

              {/* SPREAD 5: 05 CONTRA & BANK CHARGES */}
              <EvidencePage card={CARDS[4]} />
              <FolioPage card={CARDS[4]} />

              {/* SPREAD 6: BACK COVER (Single page on left, book closed) */}
              <BackCoverPage />
            </HTMLFlipBook>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCREEN 2 (MOBILE & TABLET): FULL-WIDTH CRISP 5-STREAM LEDGER CARDS  */}
      {/* Content strictly matches the right page of the book for all 5 cards */}
      {/* =================================================================== */}
      <div className={styles.mobileCardsSection}>
        <div className={styles.mobileCardsContainer}>
          <div className={styles.mobileSectionHeader}>
            <span className={styles.mobileEyebrow}>
              <span className={styles.mobileEyebrowDot} />
              5-WAY AUTOMATED ENGINE
            </span>
            <h3 className={styles.mobileMainHeading}>
              <span className={styles.mobileHeadingLine1}>Clear Every Transaction</span>
              <span className={styles.mobileHeadingLine2}>Into 5 Accounting Buckets</span>
            </h3>
            <p className={styles.mobileSubHeading}>
              Designed for senior accountants and finance teams — instant clarity without manual tick-marking.
            </p>
          </div>

          <div className={styles.mobileCardsList}>
            {CARDS.map((card) => (
              <div
                key={card.id}
                className={styles.mobileCard}
                style={{ borderLeftColor: card.accentColor }}
              >
                {/* 1. Folio Top Bar */}
                <div className={styles.mobileCardTopBar}>
                  <div className={styles.mobileCardRefGroup}>
                    <span className={styles.mobileCardRefLabel}>PAGE</span>
                    <span
                      className={styles.mobileCardRefNum}
                      style={{ color: card.accentColor }}
                    >
                      0{card.folioNo} OF 05
                    </span>
                  </div>
                  <span className={styles.mobileCardRegisterTag}>
                    BANK RECONCILIATION
                  </span>
                  <span
                    className={styles.mobileCardFyTag}
                    style={{ color: card.accentColor }}
                  >
                    {card.title.toUpperCase()}
                  </span>
                </div>

                {/* 2. Badge & Status Pill Row */}
                <div className={styles.mobileCardBadgeRow}>
                  <span
                    className={styles.mobileCardBadge}
                    style={{
                      background: card.accentLight,
                      color: card.accentColor,
                    }}
                  >
                    <span
                      className={styles.mobileCardBadgeDot}
                      style={{ background: card.accentColor }}
                    />
                    {card.badge}
                  </span>
                  <span className={styles.mobileCardStatusPill}>
                    {card.status}
                  </span>
                </div>

                {/* 3. Title & Description */}
                <h4
                  className={styles.mobileCardTitle}
                  style={{ color: card.accentColor }}
                >
                  {card.title}
                </h4>
                <p className={styles.mobileCardDesc}>{card.desc}</p>

                {/* 4. Rules & Matching Criteria Box */}
                <div className={styles.mobileCardRulesBox}>
                  <span className={styles.mobileCardRulesLabel}>
                    {card.rulesLabel}
                  </span>
                  <div className={styles.mobileCardChipsWrap}>
                    {card.rules.map((rule, i) => (
                      <span key={i} className={styles.mobileCardChip}>
                        {rule}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Footer: Stat Number + Rubber Stamp + Next Indicator */}
                <div className={styles.mobileCardFooter}>
                  <div className={styles.mobileCardStatBlock}>
                    <span
                      className={styles.mobileCardStatNum}
                      style={{ color: card.accentColor }}
                    >
                      {card.stat}
                    </span>
                    <span className={styles.mobileCardStatLabel}>
                      {card.statLabel}
                    </span>
                  </div>

                  <div className={styles.mobileCardStampBlock}>
                    <div
                      className={styles.mobileCardStamp}
                      style={{
                        color: card.accentColor,
                        borderColor: card.accentColor,
                      }}
                    >
                      {card.stamp}
                    </div>
                    <span
                      className={styles.mobileCardConfidence}
                      style={{
                        background: card.accentLight,
                        color: card.accentColor,
                      }}
                    >
                      {card.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCREEN 3: OUTRO TRANSFORMATION BENCHMARK (Weeks vs. Minutes)        */}
      {/* =================================================================== */}
      <div ref={outroBeatRef} className={styles.outroBeat}>
        <p ref={outroEyebrowRef} className={styles.outroEyebrow}>
          <span className={styles.outroEyebrowDot} />
          <span>THE RECOBIT TRANSFORMATION</span>
        </p>
        <h2 ref={outroHeadlineRef} className={styles.outroHeadline}>
          Weeks &amp; Months of Reconciliation Drag,{' '}
          <span className={styles.outroHeadlineGreen}>Cut Down to Hours &amp; Minutes</span>
        </h2>
        <div className={styles.outroCardsRow}>
          <div ref={manualCardRef} className={styles.benchmarkCardManual}>
            <span className={styles.benchmarkTagManual}>TRADITIONAL MANUAL RECONCILIATION</span>
            <div className={styles.benchmarkValManualWrap}>
              <span className={styles.benchmarkValManual}>WEEKS</span>
              <span ref={strikeLineRef} className={styles.manualStrikeLine} />
            </div>
            <p className={styles.benchmarkSubManual}>
              Manual row-by-row tick marking · Unsorted suspense entries · Dragging out for weeks &amp; months
            </p>
          </div>
          <div ref={versusRef} className={styles.benchmarkVersus}>
            <div className={styles.versusArrowWrap}>
              <span className={styles.versusArrow}>➔</span>
            </div>
            <span className={styles.versusLabel}>INSTANT</span>
          </div>
          <div ref={recobitCardRef} className={styles.benchmarkCardRecobit}>
            <div className={styles.cardSheen} />
            <span className={styles.benchmarkTagRecobit}>
              <span className={styles.recobitLivePulse} />
              WITH RECOBIT 5-WAY ENGINE
            </span>
            <div className={styles.benchmarkValRecobitWrap}>
              <span className={styles.benchmarkValRecobit}>MINUTES</span>
            </div>
            <p className={styles.benchmarkSubRecobit}>
              Automatic 5-way sorting · Instant party suggestions · Same-day ledger close
            </p>
          </div>
        </div>

        {/* Accounting Fact Pill Badges — replaces the book demo button */}
        <div ref={trustBadgesRef} className={styles.trustBadgesRow}>
          <div className={styles.trustBadgeItem}>
            <span className={styles.trustBadgeIcon}>📒</span>
            <span>Tally Prime · SAP · Excel — All Supported</span>
          </div>
          <div className={styles.trustBadgeDivider}>•</div>
          <div className={styles.trustBadgeItem}>
            <span className={styles.trustBadgeIcon}>✅</span>
            <span>Bank Statement to Ledger — Balanced in Minutes</span>
          </div>
          <div className={styles.trustBadgeDivider}>•</div>
          <div className={styles.trustBadgeItem}>
            <span className={styles.trustBadgeIcon}>🔒</span>
            <span>100% On-Premises · Zero Data Leaves Your Office</span>
          </div>
        </div>
      </div>

    </section>
  );
};
