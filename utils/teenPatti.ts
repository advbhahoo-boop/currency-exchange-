
import { Card, Suit, Rank, HandRank, HandResult } from '../types';

const SUITS: Suit[] = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_VALUES: Record<Rank, number> = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

function createDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank })));
}

function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function dealHands(): { player: Card[], dealer: Card[] } {
    const deck = shuffleDeck(createDeck());
    return {
        player: deck.slice(0, 3),
        dealer: deck.slice(3, 6)
    };
}

export function evaluateHand(hand: Card[]): HandResult {
    const sortedHand = [...hand].sort((a, b) => RANK_VALUES[a.rank] - RANK_VALUES[b.rank]);
    const values = sortedHand.map(c => RANK_VALUES[c.rank]);
    const suits = sortedHand.map(c => c.suit);

    const isFlush = new Set(suits).size === 1;
    const isStraight = (values[2] - values[1] === 1 && values[1] - values[0] === 1) || (values[0] === 2 && values[1] === 3 && values[2] === 14); // A-2-3 straight
    const isTrio = values[0] === values[1] && values[1] === values[2];
    const isPair = values[0] === values[1] || values[1] === values[2];
    
    if (isStraight && isFlush) return { rank: HandRank.StraightFlush, description: "Straight Flush", value: 5 };
    if (isTrio) return { rank: HandRank.Trio, description: "Trio (Three of a Kind)", value: 4 };
    if (isStraight) return { rank: HandRank.Straight, description: "Straight", value: 3 };
    if (isFlush) return { rank: HandRank.Flush, description: "Flush", value: 2 };
    if (isPair) return { rank: HandRank.Pair, description: "Pair", value: 1 };
    
    return { rank: HandRank.HighCard, description: `High Card: ${sortedHand[2].rank}`, value: 0 };
}
