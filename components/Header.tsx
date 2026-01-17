
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { HomeIcon, ArrowLeftIcon, WalletIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const { getTotalBalanceUSD } = useApp();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="bg-black/30 backdrop-blur-sm p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {!isDashboard ? (
            <Link to="/dashboard" className="text-white hover:text-purple-400 transition-colors">
              <ArrowLeftIcon className="h-8 w-8" />
            </Link>
          ) : (
            <div className="h-8 w-8"></div> // Placeholder for alignment
          )}
           <h1 className="text-xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            RK Exchange
           </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-purple-900/50 border border-purple-600 rounded-full px-4 py-2 flex items-center gap-2">
            <WalletIcon className="h-6 w-6 text-yellow-400" />
            <span className="font-bold text-sm md:text-lg">
                {getTotalBalanceUSD().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </span>
          </div>
          <Link to="/dashboard" className="text-white hover:text-purple-400 transition-colors p-2 rounded-full bg-purple-900/50 border border-purple-600">
            <HomeIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
