
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AppContextType, Wallet, Currency, CURRENCIES } from '../types';
import { convert } from '../utils/currency';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialWallet: Wallet = CURRENCIES.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
}, {} as Wallet);
initialWallet.USD = 1000;


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet>(() => {
    try {
        const storedWallet = localStorage.getItem('rk-exchange-wallet');
        return storedWallet ? JSON.parse(storedWallet) : initialWallet;
    } catch (error) {
        console.error("Failed to parse wallet from localStorage", error);
        return initialWallet;
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('rk-exchange-wallet', JSON.stringify(wallet));
    } catch (error) {
        console.error("Failed to save wallet to localStorage", error);
    }
  }, [wallet]);


  const buyCurrency = (currency: Currency, usdAmount: number): boolean => {
    if (wallet.USD < usdAmount || currency === 'USD') {
        return false;
    }

    const purchasedAmount = convert(usdAmount, 'USD', currency);

    setWallet(prev => ({
        ...prev,
        USD: prev.USD - usdAmount,
        [currency]: prev[currency] + purchasedAmount
    }));

    return true;
  };

  const convertCurrency = (from: Currency, to: Currency, fromAmount: number): boolean => {
    if (wallet[from] < fromAmount || from === to) {
        return false;
    }
    
    const convertedAmount = convert(fromAmount, from, to);

    setWallet(prev => ({
        ...prev,
        [from]: prev[from] - fromAmount,
        [to]: prev[to] + convertedAmount
    }));

    return true;
  };

  const getTotalBalanceUSD = (): number => {
    return CURRENCIES.reduce((total, currency) => {
        const amountInCurrency = wallet[currency];
        return total + convert(amountInCurrency, currency, 'USD');
    }, 0);
  };


  return (
    <AppContext.Provider value={{ wallet, buyCurrency, convertCurrency, getTotalBalanceUSD }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
