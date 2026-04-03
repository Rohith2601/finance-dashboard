import SummaryCards from '../components/SummaryCards';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingBreakdownChart from '../components/SpendingBreakdownChart';
import RecentTransactions from '../components/RecentTransactions';
import { useApp } from '../context/AppContext';

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {greeting} 👋
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Here's an overview of your finances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            {state.role === 'admin' ? 'Admin' : 'Viewer'} Mode
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="xl:col-span-2">
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
