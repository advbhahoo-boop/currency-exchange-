
export const CURRENCIES = ['USD', 'AED', 'EUR', 'GBP', 'KWD', 'CHF'] as const;

export type Currency = typeof CURRENCIES[number];

export type Wallet = {
  [key in Currency]: number;
};

export interface CurrencyMetadata {
  name: string;
  flag: string; // emoji
}

export interface AppContextType {
  wallet: Wallet;
  buyCurrency: (currency: Currency, usdAmount: number) => boolean;
  convertCurrency: (from: Currency, to: Currency, fromAmount: number) => boolean;
  getTotalBalanceUSD: () => number;
}

// FIX: Add missing types for the game context and Teen Patti game logic.
// These types were causing compilation errors across multiple files.
// Game Context
export interface GameContextType {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  updateBalance: (amount: number) => void;
}

// Teen Patti Game Types
export type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export enum HandRank {
  HighCard,
  Pair,
  Flush,
  Straight,
  Trio,
  StraightFlush,
}

export interface HandResult {
  rank: HandRank;
  description: string;
  value: number;
}
