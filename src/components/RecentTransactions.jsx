import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';
import { ArrowUpRight, ArrowDownRight, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
};

const rowVariants = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const RecentTransactions = () => {
  const { state } = useApp();

  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-card p-6 transition-theme"
      >
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Recent Transactions</h3>
        <div className="flex flex-col items-center justify-center h-32 text-[var(--color-text-muted)]">
          <Inbox size={32} className="mb-2 opacity-40" />
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs mt-1">Add your first transaction to get started</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="glass-card p-6 transition-theme"
    >
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Recent Transactions</h3>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-1"
      >
        {recent.map((t) => {
          const cat = CATEGORIES[t.category];
          const isIncome = t.type === 'income';
          return (
            <motion.div
              key={t.id}
              variants={rowVariants}
              whileHover={{ x: 4, backgroundColor: 'var(--color-surface-hover)' }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-xl transition-colors group cursor-default"
            >
              {/* Category dot */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: (cat?.color || '#94a3b8') + '18' }}
              >
                {isIncome ? (
                  <ArrowUpRight size={16} className="text-[var(--color-income)]" />
                ) : (
                  <ArrowDownRight size={16} className="text-[var(--color-expense)]" />
                )}
              </div>

              {/* Description */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {t.description}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {cat?.label || t.category} · {formatDate(t.date)}
                </p>
              </div>

              {/* Amount */}
              <span
                className={`text-sm font-semibold tabular-nums ${
                  isIncome ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'
                }`}
              >
                {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default RecentTransactions;
