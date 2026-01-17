
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-[#2a0750] to-[#010a20] rounded-lg shadow-2xl shadow-purple-500/50 border border-purple-600 p-6 w-11/12 max-w-md text-white"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-300">{title}</h2>
        <div className="text-gray-200 mb-6">{children}</div>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
