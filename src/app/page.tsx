import { HeroFilmScene } from '@/components/scenes/HeroFilmScene';
import { Act1ChaosEngine } from '@/components/scenes/Act1ChaosEngine';
import { Act2Top10Mapper } from '@/components/scenes/Act2Top10Mapper';
import { Act3ReconciliationTheatre } from '@/components/scenes/Act3ReconciliationTheatre';
import { Act4CommandAndAi } from '@/components/scenes/Act4CommandAndAi';
import { Act5AuditTrust } from '@/components/scenes/Act5AuditTrust';
import { Act6FinalCta } from '@/components/scenes/Act6FinalCta';

export default function Home() {
  return (
    <>
      {/* 01. The Cinematic Hook */}
      <HeroFilmScene />

      {/* Act 1: The Bottleneck & 3,000+ Ledger Maze */}
      <Act1ChaosEngine />

      {/* Act 2: The Intelligent Shift (Top 10 Picks & Video Proof) */}
      <Act2Top10Mapper />

      {/* Act 3: The Marquee Reconciliation Theatre (Bank vs Books + 1-Click Bulk Resolve + ERP Push) */}
      <Act3ReconciliationTheatre />

      {/* Act 4: Command & Financial AI Intelligence (Dashboard Video + AI Agent + Governance) */}
      <Act4CommandAndAi />

      {/* Act 5: Immutable Traceability & Audit Peace of Mind */}
      <Act5AuditTrust />

      {/* Act 6: The Final Payoff & Conversion Scheduler */}
      <Act6FinalCta />
    </>
  );
}
