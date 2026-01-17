
import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Modal from '../components/ui/Modal';

type PaymentMethod = 'JazzCash' | 'EasyPaisa' | 'Bank Transfer';

const amounts = [100, 200, 500, 600, 800, 1000, 2000, 5000, 10000];

const Deposit: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('JazzCash');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deposit } = useGame();

  const handleDeposit = (amount: number) => {
    deposit(amount);
    setIsModalOpen(true);
  };

  const renderDepositSection = (method: PaymentMethod) => (
    <div className="bg-white/10 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-purple-300">{method}</h3>
      <div className="grid grid-cols-3 gap-4">
        {amounts.map(amount => (
          <button
            key={amount}
            onClick={() => handleDeposit(amount)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all"
          >
            {amount}
          </button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Deposit Coins</h2>
      
      <div className="flex justify-center mb-6 border-b-2 border-purple-800">
        {(['JazzCash', 'EasyPaisa', 'Bank Transfer'] as PaymentMethod[]).map(method => (
          <button 
            key={method}
            onClick={() => setActiveMethod(method)}
            className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${activeMethod === method ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
          >
            {method}
          </button>
        ))}
      </div>

      {renderDepositSection(activeMethod)}
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success"
      >
        <p>Demo Deposit Successful! Coins have been added to your balance.</p>
      </Modal>
    </div>
  );
};

export default Deposit;
