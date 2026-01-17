
import React from 'react';
import { CURRENCIES } from '../types';
import { RATES_VS_USD, CURRENCY_METADATA } from '../utils/currency';

const RateTable: React.FC = () => {
  return (
    <div className="bg-white/10 p-4 rounded-lg overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-purple-800">
            <th className="p-2 text-gray-300">Currency</th>
            <th className="p-2 text-gray-300">Rate vs USD</th>
            <th className="p-2 text-gray-300 text-right">1 USD Buys</th>
          </tr>
        </thead>
        <tbody>
          {CURRENCIES.filter(c => c !== 'USD').map(currency => (
            <tr key={currency} className="border-b border-purple-900/50">
              <td className="p-2 font-semibold">
                <span className="mr-2">{CURRENCY_METADATA[currency].flag}</span>{currency}
              </td>
              <td className="p-2 font-mono">
                1 {currency} = {(1 / RATES_VS_USD[currency]).toFixed(4)} USD
              </td>
              <td className="p-2 font-mono text-right">
                {RATES_VS_USD[currency].toFixed(2)} {currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RateTable;
