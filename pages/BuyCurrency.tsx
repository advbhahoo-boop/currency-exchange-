
import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { Currency, CURRENCIES } from '../types';
import { convert, CURRENCY_METADATA, formatCurrency } from '../utils/currency';
import Modal from '../components/ui/Modal';

const QUICK_AMOUNTS_USD = [10, 50, 100, 500, 1000];

const BuyCurrency: React.FC = () => {
  const { wallet, buyCurrency } = useApp();
  const [targetCurrency, setTargetCurrency] = useState<Currency>('AED');
  const [usdAmount, setUsdAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const purchasedAmount = useMemo(() => {
    const amount = parseFloat(usdAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    return convert(amount, 'USD', targetCurrency);
  }, [usdAmount, targetCurrency]);

  const handleBuy = () => {
    const amount = parseFloat(usdAmount);
    if (isNaN(amount) || amount <= 0) {
      setModalContent({ title: 'Error', message: 'Please enter a valid amount.' });
      setIsModalOpen(true);
      return;
    }

    if (buyCurrency(targetCurrency, amount)) {
      setModalContent({ title: 'Success', message: `Successfully purchased ${formatCurrency(purchasedAmount, targetCurrency)} ${targetCurrency}.` });
      setUsdAmount('');
    } else {
      setModalContent({ title: 'Error', message: 'Insufficient USD balance or invalid transaction.' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-2xl shadow-purple-900/50">
      <h2 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Buy Currency</h2>
      <p className="text-center mb-6 text-gray-300">Your USD Balance: <span className="font-bold text-yellow-400">{formatCurrency(wallet.USD, 'USD')}</span></p>

      <div className="space-y-6">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">Currency to Buy</label>
          <select
            id="currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value as Currency)}
            className="w-full bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {CURRENCIES.filter(c => c !== 'USD').map(c => (
              <option key={c} value={c}>{CURRENCY_METADATA[c].flag} {c} - {CURRENCY_METADATA[c].name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount to Spend (USD)</label>
          <input
            type="number"
            id="amount"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            placeholder="e.g., 100"
            className="w-full bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS_USD.map(amount => (
                <button key={amount} onClick={() => setUsdAmount(String(amount))} className="flex-grow bg-purple-800/70 hover:bg-purple-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors">
                    ${amount}
                </button>
            ))}
        </div>

        {purchasedAmount > 0 && (
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <p className="text-gray-300">You will receive approx.</p>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(purchasedAmount, targetCurrency)} {targetCurrency}</p>
          </div>
        )}

        <button
          onClick={handleBuy}
          disabled={!usdAmount || parseFloat(usdAmount) <= 0}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Confirm Purchase
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
      >
        <p>{modalContent.message}</p>
      </Modal>
    </div>
  );
};

export default BuyCurrency;
