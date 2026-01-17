
import React from 'react';
import { Currency } from '../types';
import { CURRENCY_METADATA, formatCurrency } from '../utils/currency';

interface WalletCardProps {
  currency: Currency;
  balance: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ currency, balance }) => {
  const metadata = CURRENCY_METADATA[currency];

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-lg flex items-center space-x-4">
      <div className="text-4xl">{metadata.flag}</div>
      <div>
        <div className="text-lg font-bold text-gray-200">{currency}</div>
        <div className="text-xl font-mono font-semibold text-white">{formatCurrency(balance, currency)}</div>
        <div className="text-sm text-gray-400">{metadata.name}</div>
      </div>
    </div>
  );
};

export default WalletCard;
