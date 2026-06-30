export type CountryCode = "TH" | "VN" | "ID" | "MY" | "PH" | "SG";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  localBankNames: string[];
  gatewayLogo: string;
}

export interface JackpotConfig {
  grand: number;
  major: number;
  minor: number;
  currency: string;
}

export interface LiveWin {
  id: string;
  username: string;
  gameName: string;
  amount: number;
  currency: string;
  timestamp: string;
  country: CountryCode;
}

export interface EsportsMatch {
  id: string;
  game: string;
  teamA: string;
  teamB: string;
  oddsA: number;
  oddsB: number;
  oddsTie?: number;
  startTime: string;
  status: "LIVE" | "UPCOMING";
  category: "Sports" | "Esports";
  tournament: string;
  score?: string;
}

export interface PromoCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  bonusPercentage: number;
  maxAmount: number;
  minDeposit: number;
  terms: string;
  bgGradient: string;
}
