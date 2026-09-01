# RecoBit — Enterprise Product Film & Scroll-Driven Marketing Website

## 1. Product Summary & Mission
RecoBit is an AI-powered enterprise bank transaction processing and reconciliation platform engineered to eliminate the manual overhead of financial matching. It bridges raw corporate bank statements (PDF, Excel, MT940, CSV) with ERP general ledgers (Tally Prime, SAP, Oracle, Zoho, custom ERPs) using a hybrid deterministic and semantic AI matching engine.

### Core Value Proposition
- **Primary Message**: Time saving through intelligent automation.
- **The Core Problem**: In traditional accounting, up to 80% of reconciliation effort is wasted merely hunting through thousands of ledgers and manually cross-referencing statement lines.
- **The RecoBit Solution**: Instant statement ingestion, intelligent Top-10 ledger suggestions, confidence-scored reconciliation (98–99%), automated exception grouping, 1-click bulk resolution, natural-language AI queries across financial data, and immutable Maker-Checker audit trails.

---

## 2. Advertisement Goal & Target Audience
- **Primary Goal**: Deliver a cinematic, mobile-first, scroll-driven interactive product film that immerses financial decision-makers into the emotional arc:
  $$\text{Manual Chaos} \longrightarrow \text{Frustration} \longrightarrow \text{RecoBit Enters} \longrightarrow \text{Automated Clarity} \longrightarrow \text{Time Saved} \longrightarrow \text{Control} \longrightarrow \text{Action}$$
- **Target Audience**:
  - CFOs & Controllers (Closing speed, compliance, mathematical accuracy, 300–500% 3-year ROI)
  - Finance Managers & Senior Accountants (Team oversight, Maker-Checker authorization, exception triage)
  - Accountants & Bookkeepers (Elimination of repetitive manual ledger search, bulk resolution)
  - IT & ERP Administrators (Lightweight secure Rust agent bridge, zero firewall breaches, zero VPNs required)

---

## 3. Brand Identity & Visual Language
- **Brand Colors**:
  - `Brand Orange`: `#FF5500` / `#FA541C` (High attention, energy, precision)
  - `Brand Orange Glow`: `rgba(255, 85, 0, 0.12)` - `rgba(255, 85, 0, 0.25)`
  - `Slate 950` / Deep Black: `#0B0F17` (Enterprise depth, high-contrast headings)
  - `Slate 900`: `#0F172A`
  - `Slate 700` / Charcoal: `#334155` (Subheadings, body readability)
  - `Slate 500` / Muted: `#64748B` (Supporting metadata)
  - `Canvas Neutral`: `#F8F9FA` / `#FAFAFA`
  - `Card Pure White`: `#FFFFFF` with ultra-fine border `rgba(15, 23, 42, 0.08)`
  - `Success Green`: `#059669` / `#10B981` (Matched, settled, resolved badges)
  - `Warning Amber`: `#F59E0B` / `#D97706` (Unresolved exceptions, mismatch alerts)
  - `AI Cyan / Teal`: `#0D9488` / `#06B6D4` (Semantic suggestions, AI agent)
- **Visual Structure**:
  - Crisp editorial financial typography (Outfit / Plus Jakarta Sans / Inter).
  - Clean modular cards, fine tabular grids, real data pill chips.
  - Interactive scroll transformations instead of static text blocks.

---

## 4. Narrative Storyboard & Exact Section Order

The website is structured as a continuous 15-scene narrative reel:

1. **Scene 01: The Hook (Hero)** — The Ledger Bottleneck: The massive scale of modern transaction inflow breaking manual ledger mapping.
2. **Scene 02: The Manual Search** — The Ledger Maze: Searching through thousands of similar accounts with fatigue and error risk.
3. **Scene 03: The Statement & Import Grind** — PDF/Excel format fragmentation and friction.
4. **Scene 04: The Pivot** — "What if your system already knew what you were looking for?" RecoBit enters.
5. **Scene 05: Intelligent Matching (Top 10 Picks)** — Real-time narration understanding, ranked top suggestions, 1-click ledger assignment.
6. **Scene 06: Workload at Scale** — Scaling from 1 transaction to 10,000+ without cognitive strain.
7. **Scene 07: The Reconciliation Engine (Core Product Story)** — Bank Statement vs Books (Tally Prime / ERP), hybrid deterministic rules + semantic AI.
8. **Scene 08: Categorized Clarity** — Clean categorization: Matched, Unmatched, Missing in Books, Missing in Statement, Bank Charges.
9. **Scene 09: Exception Focus & Bulk Operations** — The new accountant role: Review exceptions only. Bulk resolve narration/date/amount mismatches in seconds.
10. **Scene 10: Human Finalization & ERP Push** — Maker sign-off, push verified vouchers directly into ERP with permanent session retention.
11. **Scene 11: Real-Time Operational Dashboard** — Live central visibility: Bank Data, Ledger Data, and Financial Analytics.
12. **Scene 12: Enterprise Access Management** — Maker-Checker governance: Owner Admin, Admin Checkers, User Makers, directory security.
13. **Scene 13: Grounded Domain AI Agent** — "Ask your financial data a question." Natural-language queries over ledgers, accounts, and performance.
14. **Scene 14: Trust, Auditability & Traceability** — Match $\rightarrow$ Override $\rightarrow$ Review $\rightarrow$ ERP Push $\rightarrow$ Immutable Audit Log.
15. **Scene 15: The Final Payoff & High-Impact CTA** — Compelling close: "Stop searching. Reconcile smarter." Direct demo scheduling.

---

## 5. Centralized Media Architecture

All product videos and visual proof are registered centrally in `src/config/mediaConfig.ts`:

| Semantic Key | Asset Path | Role in Story | Real Product Proof Demonstrated |
| :--- | :--- | :--- | :--- |
| `signInVideo` | `/videos/clip1_of_recco.mp4` | Supporting onboarding | Live inbound feed, secure sign-in/up |
| `dashboardVideo` | `/videos/2ndCllipRecobit.mp4` | Scene 11 Visibility | Central dashboard, Bank Data, Dr/Cr balances |
| `bankImportVideo` | `/videos/3rdClipRecobit.mp4` | Scene 05 Top-10 Matching | Smart Batch Mapper, Top-10 suggestions, bulk mapping |
| `reconciliationVideo`| `/videos/4thClipRecobit.mp4` | Scene 07-09 Reconciliation | Bank vs Books, 98-99% confidence match, bulk resolution |
| `accessManagementAiVideo` | `/videos/clip5thRecobit.mp4` | Scene 12-13 Access & AI | AI Assistant query stream, Workspace directory roles |

---

## 6. Animation & Motion Philosophy
- **Engine**: GSAP 3.12+ with ScrollTrigger and Lenis smooth scrolling.
- **Rules**:
  - Purposeful motion only: every animation explains data transformation (chaos $\rightarrow$ order, search $\rightarrow$ pick, mismatch $\rightarrow$ resolve).
  - Progressive disclosure: scrolling pulls the user naturally into the next proof step.
  - Mobile-first adaptations: on mobile viewports (<768px), pinned multi-column layouts gracefully simplify into fluid vertical scrub sequences.
  - `prefers-reduced-motion`: strictly respected with instant clean state transitions.

---

## 7. Technical Architecture & Component Tree

```
src/
├── app/
│   ├── layout.tsx         # Root layout with Lenis provider & metadata SEO
│   ├── page.tsx           # 15-scene narrative composition
│   └── globals.css        # Global reset & responsive clamp scales
├── config/
│   ├── mediaConfig.ts     # Central video and asset registry
│   └── storyContent.ts    # Centralized copywriting & copy tokens
├── styles/
│   └── tokens.css         # RecoBit design tokens (colors, shadows, typography)
├── components/
│   ├── common/
│   │   ├── SmoothScroll.tsx       # Lenis + GSAP RAF synchronization
│   │   ├── Navbar.tsx             # Frosted sticky header with live status
│   │   ├── ProductVideoFrame.tsx  # High-performance browser-frame video player
│   │   └── Footer.tsx             # Enterprise footer & compliance links
│   └── scenes/
│       ├── Scene01Hook.tsx
│       ├── Scene02ManualSearch.tsx
│       ├── Scene03ImportBottleneck.tsx
│       ├── Scene04Pivot.tsx
│       ├── Scene05Top10Matching.tsx
│       ├── Scene06WorkloadScale.tsx
│       ├── Scene07ReconciliationCore.tsx
│       ├── Scene08CategorizedClarity.tsx
│       ├── Scene09ExceptionBulkActions.tsx
│       ├── Scene10FinalizePush.tsx
│       ├── Scene11DashboardVisibility.tsx
│       ├── Scene12AccessManagement.tsx
│       ├── Scene13AiAgent.tsx
│       ├── Scene14TrustAudit.tsx
│       └── Scene15FinalCta.tsx
```

---

## 8. Current Implementation Status
- [x] Initial project setup & dependency installation (Next.js, React, TypeScript, GSAP, Lenis, Lucide).
- [x] Project architecture & `CLAUDE.md` documentation established.
- [x] Design tokens (`tokens.css`) & Global styles (`globals.css`).
- [x] Centralized media configuration (`mediaConfig.ts`) & story content (`storyContent.ts`).
- [x] Common layout components (SmoothScroll, Navbar, ProductVideoFrame, Footer).
- [x] Storyboard Scenes 01 to 15 implementation & review.
- [x] Mobile, tablet & desktop visual polish & responsive validation.
- [x] Production build & automated keyword/SSR verification (`npm run build` passing with 0 errors).
