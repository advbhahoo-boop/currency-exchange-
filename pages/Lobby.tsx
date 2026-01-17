
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';

const games = [
  { name: 'Teen Patti', image: 'https://picsum.photos/seed/teenpatti/400/300', enabled: true, path: '/game/teen-patti' },
  { name: 'Slots', image: 'https://picsum.photos/seed/slots/400/300', enabled: false },
  { name: 'Dragon vs Tiger', image: 'https://picsum.photos/seed/dragontiger/400/300', enabled: false },
  { name: 'Crash', image: 'https://picsum.photos/seed/crash/400/300', enabled: false },
  { name: 'Roulette', image: 'https://picsum.photos/seed/roulette/400/300', enabled: false },
];

const Lobby: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <button 
              onClick={() => navigate('/wallet/deposit')}
              className="group flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg shadow-lg hover:shadow-green-400/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              <ArrowDownTrayIcon className="h-10 w-10 text-white mb-2" />
              <span className="text-xl font-bold">Deposit</span>
            </button>
            <button 
              onClick={() => navigate('/wallet/withdraw')}
              className="group flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-500 to-rose-700 rounded-lg shadow-lg hover:shadow-red-400/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              <ArrowUpTrayIcon className="h-10 w-10 text-white mb-2" />
              <span className="text-xl font-bold">Withdraw</span>
            </button>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {games.map(game => (
          <GameCard
            key={game.name}
            name={game.name}
            image={game.image}
            enabled={game.enabled}
            onClick={() => game.enabled && navigate(game.path!)}
          />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
