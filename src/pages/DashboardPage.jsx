import SummaryCards from '../components/SummaryCards';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingBreakdownChart from '../components/SpendingBreakdownChart';
import RecentTransactions from '../components/RecentTransactions';
import PageTransition from '../components/PageTransition';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const DashboardPage = () => {
  const { state } = useApp();
  const greeting = getGreeting();

  return (
    <PageTransition className="space-y-5">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20"
          >
            <Activity size={22} className="text-white" strokeWidth={2.5} />
          </motion.div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {greeting}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              Here's an overview of your finances
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="xl:col-span-2">
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </PageTransition>
  );
};

export default DashboardPage;
