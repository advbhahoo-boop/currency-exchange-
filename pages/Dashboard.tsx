
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CURRENCIES } from '../types';
import WalletCard from '../components/WalletCard';
import RateTable from '../components/RateTable';
import { ShoppingCartIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const Dashboard: React.FC = () => {
  const { wallet } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/buy')}
          className="group flex items-center justify-center p-6 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg shadow-lg hover:shadow-green-400/50 transform hover:-translate-y-1 transition-all duration-300"
        >
          <ShoppingCartIcon className="h-10 w-10 text-white mr-4" />
          <span className="text-2xl font-bold">Buy Currency</span>
        </button>
        <button
          onClick={() => navigate('/convert')}
          className="group flex items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg shadow-lg hover:shadow-blue-400/50 transform hover:-translate-y-1 transition-all duration-300"
        >
          <ArrowPathIcon className="h-10 w-10 text-white mr-4" />
          <span className="text-2xl font-bold">Convert Currency</span>
        </button>
      </div>

      {/* Wallet Balances */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Your Wallet</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CURRENCIES.map(currency => (
            <WalletCard
              key={currency}
              currency={currency}
              balance={wallet[currency]}
            />
          ))}
        </div>
      </div>

      {/* Exchange Rates */}
      <div>
         <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Today's Rates</h2>
         <RateTable />
      </div>

    </div>
  );
};

export default Dashboard;
