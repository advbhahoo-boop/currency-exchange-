
import React from 'react';

interface GameCardProps {
  name: string;
  image: string;
  enabled: boolean;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ name, image, enabled, onClick }) => {
  const cardClasses = `
    relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg 
    transition-all duration-300 transform 
    ${enabled ? 'cursor-pointer hover:scale-105 hover:shadow-purple-500/50 border-2 border-transparent hover:border-purple-400' : 'cursor-not-allowed'}
  `;

  return (
    <div className={cardClasses} onClick={enabled ? onClick : undefined}>
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-lg font-bold text-center text-white drop-shadow-md">{name}</h3>
      </div>
      {!enabled && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <span className="text-xl font-bold text-gray-300 tracking-wider">Coming Soon</span>
        </div>
      )}
    </div>
  );
};

export default GameCard;
