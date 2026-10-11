export interface SlideData {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  tagline?: string;
  theme: string;
  bullets?: string[];
  keyPhrase?: string;
  quote?: string;
  visualType: 
    | 'ship_horizon'
    | 'journal_route'
    | 'documents_table'
    | 'anticipation_horizon'
    | 'open_questions_chart'
    | 'fleet_movement'
    | 'law_library'
    | 'single_vs_fleet'
    | 'gap_proposal_blocks'
    | 'gap_community_movement'
    | 'golden_horizon'
    | 'founders_offer'
    | 'founders_commercial'
    | 'closing_fleet';
  partInfo?: {
    currentPart: number;
    totalParts: number;
    partTitle: string;
    linkedSlideId: number;
  };
  customBlocks?: Array<{
    title: string;
    description: string;
  }>;
  presenterNote: {
    pointsToCover: string[];
    audienceQuestion?: string;
    pacingHint?: string;
  };
}

export interface FoundersOfferConfig {
  programName: string;
  referencePrice: string;
  priceStatusNote: string;
  maxFoundingMembers: number;
  benefitsList: string[];
  scopeNote: string;
}

export interface PresentationConfig {
  brandName: string;
  founderName: string;
  bookTitle: string;
  slides: SlideData[];
  foundersOffer: FoundersOfferConfig;
}
