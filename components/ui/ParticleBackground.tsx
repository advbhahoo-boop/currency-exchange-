
import React, { useMemo } from 'react';

const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        opacity: Math.random() * 0.7,
      };
      return <div key={i} className="absolute rounded-full bg-white/30 animate-pulse" style={style} />;
    });
  }, []);

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

export default ParticleBackground;
