
import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Modal from '../components/ui/Modal';

const MIN_WITHDRAWAL = 5;

const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('JazzCash');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: ''});
  const { balance, withdraw } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setModalContent({ title: 'Error', message: 'Please enter a valid amount.'});
      setIsModalOpen(true);
      return;
    }

    if (withdrawAmount < MIN_WITHDRAWAL) {
      setModalContent({ title: 'Error', message: `Minimum withdrawal is ${MIN_WITHDRAWAL} coins.`});
      setIsModalOpen(true);
      return;
    }

    if (withdrawAmount > balance) {
        setModalContent({ title: 'Error', message: 'Insufficient balance.'});
        setIsModalOpen(true);
        return;
    }

    if (withdraw(withdrawAmount)) {
      setModalContent({ title: 'Success', message: 'Withdrawal Request Submitted (Demo).'});
      setAmount('');
    } else {
        // This case should be covered by the balance check above, but as a fallback
        setModalContent({ title: 'Error', message: 'Withdrawal failed. Please try again.'});
    }
    setIsModalOpen(true);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-2xl shadow-purple-900/50">
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Withdraw Coins</h2>
      <p className="text-center mb-4 text-gray-300">Your balance: <span className="font-bold text-yellow-400">{balance}</span></p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Min ${MIN_WITHDRAWAL} coins`}
            className="w-full bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-gray-900/50 border border-purple-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>JazzCash</option>
            <option>EasyPaisa</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all"
        >
          Submit Request
        </button>
      </form>
      
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

export default Withdraw;
