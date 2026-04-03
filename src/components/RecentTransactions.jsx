import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions = () => {
  const { state } = useApp();

  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="glass-card p-6 transition-theme">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Recent Transactions</h3>
        <div className="flex items-center justify-center h-32 text-[var(--color-text-muted)] text-sm">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 transition-theme">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {recent.map((t) => {
          const cat = CATEGORIES[t.category];
          const isIncome = t.type === 'income';
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors group"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;
