import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import Toast from './components/Toast';

const App = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-alt)] transition-theme">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-0 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      <Toast />
    </div>
  );
};

export default App;
