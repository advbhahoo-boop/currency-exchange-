
import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { Currency, CURRENCIES } from '../types';
import { convert, CURRENCY_METADATA, formatCurrency } from '../utils/currency';
import Modal from '../components/ui/Modal';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const ConvertCurrency: React.FC = () => {
  const { wallet, convertCurrency } = useApp();
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('AED');
  const [fromAmount, setFromAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const convertedAmount = useMemo(() => {
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    return convert(amount, fromCurrency, toCurrency);
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleConvert = () => {
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) {
      setModalContent({ title: 'Error', message: 'Please enter a valid amount.' });
      setIsModalOpen(true);
      return;
    }
     if (fromCurrency === toCurrency) {
        setModalContent({ title: 'Error', message: 'Cannot convert to the same currency.' });
        setIsModalOpen(true);
        return;
    }

    if (convertCurrency(fromCurrency, toCurrency, amount)) {
      setModalContent({ title: 'Success', message: `Successfully converted to ${formatCurrency(convertedAmount, toCurrency)} ${toCurrency}.` });
      setFromAmount('');
    } else {
      setModalContent({ title: 'Error', message: `Insufficient ${fromCurrency} balance or invalid transaction.` });
    }
    setIsModalOpen(true);
  };
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-2xl shadow-purple-900/50">
      <h2 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Convert Currency</h2>

      <div className="space-y-4">
        {/* From */}
        <div className="bg-black/20 p-4 rounded-lg">
          <label htmlFor="from-currency" className="block text-sm font-medium text-gray-400 mb-1">From</label>
          <div className="flex gap-2">
            <select
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as Currency)}
              className="w-2/5 bg-gray-900/50 border border-purple-700 rounded-lg px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{CURRENCY_METADATA[c].flag} {c}</option>)}
            </select>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-3/5 bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-3 text-white text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-right text-xs text-gray-400 mt-1">Balance: {formatCurrency(wallet[fromCurrency], fromCurrency)}</p>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
            <button onClick={handleSwap} className="p-2 rounded-full bg-purple-700/50 hover:bg-purple-600/50 border border-purple-500 transition-transform duration-300 hover:rotate-180">
                <ArrowPathIcon className="h-6 w-6 text-purple-300" />
            </button>
        </div>

        {/* To */}
         <div className="bg-black/20 p-4 rounded-lg">
          <label htmlFor="to-currency" className="block text-sm font-medium text-gray-400 mb-1">To</label>
          <div className="flex gap-2">
            <select
              id="to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as Currency)}
              className="w-2/5 bg-gray-900/50 border border-purple-700 rounded-lg px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{CURRENCY_METADATA[c].flag} {c}</option>)}
            </select>
            <input
              type="text"
              readOnly
              value={convertedAmount > 0 ? formatCurrency(convertedAmount, toCurrency) : ''}
              placeholder="0.00"
              className="w-3/5 bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-3 text-white text-right focus:outline-none"
            />
          </div>
           <p className="text-right text-xs text-gray-400 mt-1">Balance: {formatCurrency(wallet[toCurrency], toCurrency)}</p>
        </div>
        
        <button
          onClick={handleConvert}
          disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all mt-4 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Convert
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

export default ConvertCurrency;
