
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ui/ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a0128] via-[#2a0750] to-[#010a20] text-white font-sans overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
