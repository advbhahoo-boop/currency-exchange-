
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ui/ParticleBackground';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate('/dashboard');
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#0a0128] via-[#2a0750] to-[#010a20] text-white font-sans overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">
                RK Currency Exchange
            </h1>
            <p className="mt-4 text-lg text-gray-300">Loading Exchange...</p>
            <div className="w-64 md:w-96 mt-8 bg-gray-700 rounded-full h-4 mx-auto overflow-hidden border-2 border-purple-500 shadow-lg">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-2 text-xl font-bold text-white">{progress}%</p>
        </div>
    </div>
  );
};

export default LoadingScreen;
