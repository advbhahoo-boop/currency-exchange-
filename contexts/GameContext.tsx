
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GameContextType } from '../types';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(100);

  const deposit = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const withdraw = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return (
    <GameContext.Provider value={{ balance, deposit, withdraw, updateBalance }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
