
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import LoadingScreen from './pages/LoadingScreen';
import Dashboard from './pages/Dashboard';
import BuyCurrency from './pages/BuyCurrency';
import ConvertCurrency from './pages/ConvertCurrency';
import Layout from './components/Layout';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/buy" element={<Layout><BuyCurrency /></Layout>} />
          <Route path="/convert" element={<Layout><ConvertCurrency /></Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
