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
  images: {
    authSignUp: '/images/product/real_auth_signup.png',
    inboundStream: '/images/product/real_inbound_stream.png',
    dashboardBankData: '/images/product/real_dashboard_bank_data.png',
    dashboardLedgerData: '/images/product/real_dashboard_ledger_data.png',
    dashboardAnalytics: '/images/product/real_dashboard_analytics.png',
    smartBatchMapper: '/images/product/real_smart_batch_mapper.png',
    top10PicksDropdown: '/images/product/real_top10_picks_dropdown.png',
    batchMappingProgress: '/images/product/real_batch_mapping_progress.png',
    reconciliationComparison: '/images/product/real_reconciliation_comparison.png',
    reconciliationCategories: '/images/product/real_reconciliation_categories.png',
    bulkExceptionResolve: '/images/product/real_bulk_exception_resolve.png',
    reconciliationFinalize: '/images/product/real_reconciliation_finalize.png',
    aiAssistantChat: '/images/product/real_ai_assistant_chat.png',
    aiAssistantQuery2: '/images/product/real_ai_assistant_query2.png',
    workspaceDirectory: '/images/product/real_workspace_directory.png',
  },
  brand: {
    logoText: 'RecoBit',
    markLetter: 'R',
    tagline: 'AI-Powered Enterprise Bank Reconciliation',
  },
} as const;

export type MediaConfig = typeof mediaConfig;
