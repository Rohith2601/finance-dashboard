import { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getMonthKey, formatCurrency } from '../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-3 !rounded-xl !shadow-lg border border-[var(--color-border)]">
      <p className="text-xs text-[var(--color-text-muted)] mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const BalanceTrendChart = () => {
  const { state } = useApp();

  const chartData = useMemo(() => {
    const monthlyData = {};

    state.transactions.forEach((t) => {
      const monthKey = getMonthKey(t.date);
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expense += t.amount;
      }
    });

    const months = Object.keys(monthlyData).sort();
    const monthNames = {
      '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
      '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
      '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
    };

    let cumulativeBalance = 0;
    return months.map((m) => {
      const { income, expense } = monthlyData[m];
      cumulativeBalance += income - expense;
      const monthNum = m.split('-')[1];
      return {
        month: monthNames[monthNum] + ' ' + m.split('-')[0],
        Income: income,
        Expenses: expense,
        Balance: cumulativeBalance,
      };
    });
  }, [state.transactions]);

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 transition-theme">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Balance Trend</h3>
        <div className="flex items-center justify-center h-48 text-[var(--color-text-muted)] text-sm">
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 transition-theme">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Balance Trend</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500" /> Balance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-income)]" /> Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-expense)]" /> Expenses
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#incomeGradient)"
            dot={{ r: 3, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
