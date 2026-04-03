import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react';

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    getValue: (s) => s.totalBalance,
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'border-l-indigo-500',
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    getValue: (s) => s.totalIncome,
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'border-l-emerald-500',
    trendIcon: ArrowUpRight,
    trendColor: 'text-emerald-500',
    trendBg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    key: 'expenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    getValue: (s) => s.totalExpense,
    iconBg: 'bg-rose-100 dark:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    accent: 'border-l-rose-500',
    trendIcon: ArrowDownRight,
    trendColor: 'text-rose-500',
    trendBg: 'bg-rose-50 dark:bg-rose-500/10',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    icon: Receipt,
    getValue: (s) => s.transactionCount,
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'border-l-amber-500',
    isCounted: true,
  },
];

const SummaryCards = () => {
  const { getSummary } = useApp();
  const summary = getSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 stagger-children">
      {cards.map(({ key, label, icon: Icon, getValue, iconBg, iconColor, accent, trendIcon: TrendIcon, trendColor, trendBg, isCounted }) => {
        const value = getValue(summary);
        return (
          <div
            key={key}
            className={`glass-card p-5 border-l-4 ${accent} transition-theme group hover:scale-[1.02]`}
            id={`summary-card-${key}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center transition-colors`}>
                <Icon size={22} className={iconColor} strokeWidth={2.2} />
              </div>
              {TrendIcon && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trendColor} ${trendBg}`}>
                  <TrendIcon size={14} />
                </div>
              )}
            </div>
            <p className="text-[13px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              {label}
            </p>
            <p className="text-[26px] font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
              {isCounted ? value : formatCurrency(value)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
