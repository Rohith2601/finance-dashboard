import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

const App = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface-alt)] transition-theme">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-0 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
