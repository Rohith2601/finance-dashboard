import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, fill } = payload[0].payload;
  return (
    <div className="glass-card px-4 py-3 !rounded-xl !shadow-lg border border-[var(--color-border)]">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: fill }} />
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{name}</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">{formatCurrency(value)}</p>
    </div>
  );
};

const SpendingBreakdownChart = () => {
  const { state } = useApp();

  const chartData = useMemo(() => {
    const categoryTotals = {};

    state.transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const cat = CATEGORIES[t.category];
        const label = cat?.label || t.category;
        if (!categoryTotals[t.category]) {
          categoryTotals[t.category] = { name: label, value: 0, fill: cat?.color || '#94a3b8' };
        }
        categoryTotals[t.category].value += t.amount;
      });

    return Object.values(categoryTotals)
      .sort((a, b) => b.value - a.value);
  }, [state.transactions]);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  if (chartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card p-6 transition-theme h-full"
      >
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Spending Breakdown</h3>
        <div className="flex flex-col items-center justify-center h-48 text-[var(--color-text-muted)]">
          <PieChartIcon size={32} className="mb-2 opacity-40" />
          <p className="text-sm">No expense data to display</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6 transition-theme h-full"
    >
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Spending Breakdown</h3>
      
      {/* Donut Chart — centered */}
      <div className="flex justify-center mb-5">
        <div className="relative">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationDuration={1000}
                animationEasing="ease-in-out"
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Total</span>
            <span className="text-base font-bold text-[var(--color-text-primary)]">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Legend List with progress bars */}
      <div className="space-y-2">
        {chartData.map((item, i) => {
          const pct = total > 0 ? ((item.value / total) * 100) : 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
              className="group"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.fill }} />
                <span className="flex-1 text-[13px] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors truncate">
                  {item.name}
                </span>
                <span className="text-[13px] font-semibold text-[var(--color-text-primary)] tabular-nums whitespace-nowrap">
                  {formatCurrency(item.value)}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] w-10 text-right tabular-nums flex-shrink-0">
                  {pct.toFixed(1)}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="ml-4 h-1 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: item.fill }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SpendingBreakdownChart;
