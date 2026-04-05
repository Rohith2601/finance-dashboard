import { useApp } from '../context/AppContext';
import { formatCurrency, calcPercentChange } from '../utils/helpers';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    getValue: (s) => s.totalBalance,
    getDelta: (d) => calcPercentChange(d.currBalance, d.prevBalance),
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'border-l-indigo-500',
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    getValue: (s) => s.totalIncome,
    getDelta: (d) => calcPercentChange(d.currIncome, d.prevIncome),
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'border-l-emerald-500',
  },
  {
    key: 'expenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    getValue: (s) => s.totalExpense,
    getDelta: (d) => calcPercentChange(d.currExpense, d.prevExpense),
    invertDelta: true,
    iconBg: 'bg-rose-100 dark:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    accent: 'border-l-rose-500',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    icon: Receipt,
    getValue: (s) => s.transactionCount,
    getDelta: (d) => calcPercentChange(d.currCount, d.prevCount),
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'border-l-amber-500',
    isCounted: true,
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const SummaryCards = () => {
  const { getSummary, getPreviousMonthSummary } = useApp();
  const summary = getSummary();
  const deltas = getPreviousMonthSummary();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {cards.map(({ key, label, icon: Icon, getValue, getDelta, invertDelta, iconBg, iconColor, accent, isCounted }) => {
        const value = getValue(summary);
        const delta = getDelta ? getDelta(deltas) : null;
        const isDeltaPositive = invertDelta ? delta < 0 : delta > 0;
        const isDeltaNegative = invertDelta ? delta > 0 : delta < 0;

        return (
          <motion.div
            key={key}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`glass-card p-5 border-l-4 ${accent} transition-theme cursor-default`}
            id={`summary-card-${key}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center transition-colors`}>
                <Icon size={20} className={iconColor} strokeWidth={2.2} />
              </div>
              {delta !== null && delta !== 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-semibold ${
                    isDeltaPositive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                      : isDeltaNegative
                      ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
                      : 'text-[var(--color-text-muted)] bg-[var(--color-surface-alt)]'
                  }`}
                >
                  {isDeltaPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(delta).toFixed(1)}%
                </motion.div>
              )}
            </div>
            <p className="text-[12px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-[24px] font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
              {isCounted ? value : formatCurrency(value)}
            </p>
            {delta !== null && delta !== 0 && (
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                vs last month
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SummaryCards;
