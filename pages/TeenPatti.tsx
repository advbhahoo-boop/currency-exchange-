
import React, { useState, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import { Card as CardType, HandResult } from '../types';
import { dealHands, evaluateHand } from '../utils/teenPatti';
import PlayingCard from '../components/teenpatti/PlayingCard';

const BET_AMOUNTS = [10, 50, 100, 500];
const MULTIPLIERS = [2, 5, 10];

const TeenPatti: React.FC = () => {
  const { balance, updateBalance } = useGame();
  const [bet, setBet] = useState(10);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [playerResult, setPlayerResult] = useState<HandResult | null>(null);
  const [dealerResult, setDealerResult] = useState<HandResult | null>(null);
  const [gameMessage, setGameMessage] = useState('Place your bet!');
  const [isRevealed, setIsRevealed] = useState(false);
  const [winnings, setWinnings] = useState(0);

  const handleDeal = useCallback(() => {
    if (balance < bet) {
      setGameMessage("Not enough balance!");
      return;
    }

    updateBalance(-bet);
    setIsRevealed(false);
    setWinnings(0);
    setGameMessage("Dealing cards...");

    const { player, dealer } = dealHands();
    setPlayerHand(player);
    setDealerHand(dealer);
    
    setTimeout(() => {
        const pResult = evaluateHand(player);
        const dResult = evaluateHand(dealer);
        setPlayerResult(pResult);
        setDealerResult(dResult);
        setIsRevealed(true);

        if (pResult.value > dResult.value) {
            const multiplier = MULTIPLIERS[Math.floor(Math.random() * MULTIPLIERS.length)];
            const winAmount = bet * multiplier;
            setWinnings(winAmount);
            updateBalance(winAmount);
            setGameMessage(`You win! x${multiplier} Multiplier!`);
        } else if (pResult.value < dResult.value) {
            setGameMessage("Dealer wins!");
        } else {
            updateBalance(bet); // Return bet on tie
            setGameMessage("It's a tie!");
        }
    }, 1500);
  }, [bet, balance, updateBalance]);

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Teen Patti</h2>
      
      {/* Game Board */}
      <div className="w-full max-w-4xl bg-green-800/50 border-4 border-yellow-600 rounded-3xl p-4 md:p-8 space-y-4">
        {/* Dealer Area */}
        <div>
          <h3 className="text-xl font-bold text-gray-300 mb-2">Dealer's Hand</h3>
          <div className="flex justify-center items-center gap-2 min-h-[120px] md:min-h-[160px]">
             {dealerHand.length > 0 ? dealerHand.map((card, i) => (
                <PlayingCard key={i} card={card} isFaceUp={isRevealed} />
             )) : <div className="text-gray-400">Waiting for deal...</div>}
          </div>
          {isRevealed && dealerResult && <p className="mt-2 text-lg font-semibold text-white">{dealerResult.description}</p>}
        </div>

        {/* Game Message */}
        <div className="py-4">
            <p className={`text-2xl md:text-4xl font-bold transition-all duration-500 ${winnings > 0 ? 'text-yellow-400 animate-pulse' : 'text-white'}`}>
                {winnings > 0 ? `+${winnings}` : gameMessage}
            </p>
        </div>

        {/* Player Area */}
        <div>
           {isRevealed && playerResult && <p className="mb-2 text-lg font-semibold text-white">{playerResult.description}</p>}
           <div className="flex justify-center items-center gap-2 min-h-[120px] md:min-h-[160px]">
             {playerHand.length > 0 ? playerHand.map((card, i) => (
                <PlayingCard key={i} card={card} isFaceUp={true} />
             )) : <div className="text-gray-400">Your cards will appear here.</div>}
          </div>
          <h3 className="text-xl font-bold text-gray-300 mt-2">Your Hand</h3>
        </div>
      </div>
      
      {/* Controls */}
      <div className="w-full max-w-md bg-black/30 p-4 rounded-xl flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {BET_AMOUNTS.map(amount => (
                <button 
                    key={amount}
                    onClick={() => setBet(amount)}
                    disabled={isRevealed && gameMessage !== "Place your bet!"}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${bet === amount ? 'bg-yellow-500 text-black scale-110' : 'bg-purple-700 text-white hover:bg-purple-600'}`}
                >
                    {amount}
                </button>
            ))}
          </div>
          <button
            onClick={handleDeal}
            disabled={balance < bet || (playerHand.length > 0 && !isRevealed)}
            className="w-full text-2xl font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300
                       bg-gradient-to-r from-pink-500 to-orange-500 text-white
                       hover:from-pink-600 hover:to-orange-600 hover:shadow-orange-500/50
                       disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {playerHand.length > 0 && !isRevealed ? 'Dealing...' : 'Deal'}
          </button>
      </div>

    </div>
  );
};

export default TeenPatti;
