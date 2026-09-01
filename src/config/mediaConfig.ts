export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  poster?: string;
  width: number;
  height: number;
  role: string;
}

export const mediaConfig = {
  videos: {
    signInVideo: {
      id: 'sign-in-auth',
      title: 'Real-Time Ingestion & Access',
      subtitle: 'Monitoring live inbound bank streams with verified access controls.',
      src: '/videos/clip1_of_recco.mp4',
      poster: '/posters/clip1_poster.jpg',
      width: 1920,
      height: 908,
      role: 'Onboarding & Live Inbound Feed Proof',
    },
    dashboardVideo: {
      id: 'dashboard-visibility',
      title: 'Enterprise Dashboard & Visibility',
      subtitle: 'Unified command center across Bank Data, Ledger Balances, and Operational Analytics.',
      src: '/videos/2ndCllipRecobit.mp4',
      poster: '/posters/clip2_poster.jpg',
      width: 1918,
      height: 912,
      role: 'Central Visibility & Balances Overview',
    },
    bankImportVideo: {
      id: 'bank-import-mapping',
      title: 'Smart Batch Mapper & Top 10 Picks',
      subtitle: 'Instant statement ingestion with 10 intelligent ledger suggestions per transaction.',
      src: '/videos/3rdClipRecobit.mp4',
      poster: '/posters/clip3_poster.jpg',
      width: 1920,
      height: 908,
      role: 'Top-10 Smart Batch Mapper Proof',
    },
    reconciliationVideo: {
      id: 'reconciliation-engine',
      title: 'Hybrid Reconciliation Engine',
      subtitle: 'Deterministic and semantic matching aligning bank statements with ERP ledgers at 98–99% confidence.',
      src: '/videos/4thClipRecobit.mp4',
      poster: '/posters/clip4_poster.jpg',
      width: 1918,
      height: 906,
      role: 'Primary Reconciliation & Exception Resolution Proof',
    },
    accessManagementAiVideo: {
      id: 'access-ai-assistant',
      title: 'Domain AI Agent & Governance',
      subtitle: 'Context-aware financial queries and Maker-Checker authorization roles.',
      src: '/videos/clip5thRecobit.mp4',
      poster: '/posters/clip5_poster.jpg',
      width: 1918,
      height: 906,
      role: 'Domain AI Agent & Workspace Directory Proof',
    },
  },
  brand: {
    logoText: 'RecoBit',
    markLetter: 'R',
    tagline: 'AI-Powered Enterprise Bank Reconciliation',
  },
} as const;

export type MediaConfig = typeof mediaConfig;
