
import React from 'react';
import { Card } from '../../types';

interface PlayingCardProps {
  card: Card;
  isFaceUp: boolean;
}

const suitSymbols: Record<Card['suit'], { symbol: string, color: string }> = {
  Hearts: { symbol: '♥', color: 'text-red-500' },
  Diamonds: { symbol: '♦', color: 'text-red-500' },
  Clubs: { symbol: '♣', color: 'text-black' },
  Spades: { symbol: '♠', color: 'text-black' },
};

const PlayingCard: React.FC<PlayingCardProps> = ({ card, isFaceUp }) => {
  const { symbol, color } = suitSymbols[card.suit];

  return (
    <div className="w-20 h-28 md:w-28 md:h-40 perspective-1000">
      <div 
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${isFaceUp ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 p-1">
            <div className="w-full h-full rounded-md border-2 border-purple-300 flex items-center justify-center">
                 <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">RK</div>
            </div>
        </div>

        {/* Card Face */}
        <div className={`absolute w-full h-full backface-hidden rounded-lg bg-white shadow-lg rotate-y-180 flex flex-col justify-between p-1`}>
          <div className={`text-left text-xl md:text-2xl font-bold ${color}`}>
            <span>{card.rank}</span>
            <span>{symbol}</span>
          </div>
          <div className={`text-center text-3xl md:text-4xl ${color}`}>
            {symbol}
          </div>
          <div className={`text-right text-xl md:text-2xl font-bold ${color} transform rotate-180`}>
            <span>{card.rank}</span>
            <span>{symbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingCard;
