import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency, getMonthKey, calcPercentChange } from '../utils/helpers';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Zap, PiggyBank, ShoppingBag } from 'lucide-react';

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-3 !rounded-xl !shadow-lg border border-[var(--color-border)]">
      <p className="text-xs text-[var(--color-text-muted)] mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.fill || entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const InsightsPanel = () => {
  const { state } = useApp();

  const insights = useMemo(() => {
    const txns = state.transactions;
    if (txns.length === 0) return null;

    // Category spending totals
    const categoryTotals = {};
    txns
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
        categoryTotals[t.category] += t.amount;
      });

    // Highest spending category
    let highestCategory = null;
    let highestAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      if (amount > highestAmount) {
        highestCategory = cat;
        highestAmount = amount;
      }
    });

    // Monthly income/expense breakdown
    const monthlyData = {};
    txns.forEach((t) => {
      const mk = getMonthKey(t.date);
      if (!monthlyData[mk]) monthlyData[mk] = { income: 0, expense: 0 };
      if (t.type === 'income') monthlyData[mk].income += t.amount;
      else monthlyData[mk].expense += t.amount;
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const monthNames = {
      '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
      '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
      '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
    };

    const monthlyChart = sortedMonths.map((m) => ({
      month: monthNames[m.split('-')[1]] + ' ' + m.split('-')[0].slice(2),
      Income: monthlyData[m].income,
      Expenses: monthlyData[m].expense,
      Savings: monthlyData[m].income - monthlyData[m].expense,
    }));

    // Month-over-month comparison
    let expenseChange = 0;
    let incomeChange = 0;
    if (sortedMonths.length >= 2) {
      const curr = monthlyData[sortedMonths[sortedMonths.length - 1]];
      const prev = monthlyData[sortedMonths[sortedMonths.length - 2]];
      expenseChange = calcPercentChange(curr.expense, prev.expense);
      incomeChange = calcPercentChange(curr.income, prev.income);
    }

    // Average daily spending in current month
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const currentMonthExpenses = txns
      .filter((t) => t.type === 'expense' && t.date.startsWith(currentMonth));
    const avgDailySpend = currentMonthExpenses.length > 0
      ? currentMonthExpenses.reduce((s, t) => s + t.amount, 0) /
        new Set(currentMonthExpenses.map((t) => t.date)).size
      : 0;

    // Savings rate
    const totalIncome = txns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = txns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    // Largest single transaction
    const largestExpense = txns
      .filter((t) => t.type === 'expense')
      .reduce((max, t) => (t.amount > (max?.amount || 0) ? t : max), null);

    // Top 5 categories for bar chart
    const topCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([cat, amount]) => ({
        name: CATEGORIES[cat]?.label || cat,
        amount,
        color: CATEGORIES[cat]?.color || '#94a3b8',
      }));

    return {
      highestCategory,
      highestAmount,
      monthlyChart,
      expenseChange,
      incomeChange,
      avgDailySpend,
      savingsRate,
      largestExpense,
      topCategories,
      currentMonth: monthNames[currentMonth?.split('-')[1]] + ' ' + currentMonth?.split('-')[0],
    };
  }, [state.transactions]);

  if (!insights) {
    return (
      <div className="glass-card p-12 text-center transition-theme">
        <AlertCircle size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
        <p className="text-[var(--color-text-secondary)] font-medium">No data available for insights</p>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Add some transactions to see your financial insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 stagger-children">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Highest Spending Category */}
        <div className="glass-card p-5 transition-theme">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-[var(--color-expense-light)]">
              <ShoppingBag size={18} className="text-[var(--color-expense)]" />
            </div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Top Spending</span>
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)]">
            {CATEGORIES[insights.highestCategory]?.label || insights.highestCategory}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatCurrency(insights.highestAmount)}</p>
        </div>

        {/* Savings Rate */}
        <div className="glass-card p-5 transition-theme">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-[var(--color-income-light)]">
              <PiggyBank size={18} className="text-[var(--color-income)]" />
            </div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Savings Rate</span>
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)]">{insights.savingsRate.toFixed(1)}%</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {insights.savingsRate > 20 ? 'Great savings!' : insights.savingsRate > 0 ? 'Room to improve' : 'Overspending'}
          </p>
        </div>

        {/* Expense Trend */}
        <div className="glass-card p-5 transition-theme">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-xl ${insights.expenseChange <= 0 ? 'bg-[var(--color-income-light)]' : 'bg-[var(--color-expense-light)]'}`}>
              {insights.expenseChange <= 0 ? (
                <TrendingDown size={18} className="text-[var(--color-income)]" />
              ) : (
                <TrendingUp size={18} className="text-[var(--color-expense)]" />
              )}
            </div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Expense Trend</span>
          </div>
          <p className={`text-lg font-bold ${insights.expenseChange <= 0 ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'}`}>
            {insights.expenseChange > 0 ? '+' : ''}{insights.expenseChange.toFixed(1)}%
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">vs previous month</p>
        </div>

        {/* Avg Daily Spend */}
        <div className="glass-card p-5 transition-theme">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30">
              <Zap size={18} className="text-amber-500" />
            </div>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Daily Average</span>
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)]">{formatCurrency(insights.avgDailySpend)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">spending in {insights.currentMonth}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Comparison Bar Chart */}
        <div className="glass-card p-6 transition-theme">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-6">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={insights.monthlyChart} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[var(--color-income)]" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[var(--color-expense)]" /> Expenses
            </span>
          </div>
        </div>

        {/* Top Categories Bar Chart */}
        <div className="glass-card p-6 transition-theme">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-6">Top Expense Categories</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={insights.topCategories}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="amount" name="Spent" radius={[0, 4, 4, 0]} barSize={20}>
                {insights.topCategories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Observations */}
      <div className="glass-card p-6 transition-theme">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="w-1 rounded-full bg-primary-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Biggest Expense</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {insights.largestExpense
                  ? `Your largest single expense was ${formatCurrency(insights.largestExpense.amount)} on "${insights.largestExpense.description}".`
                  : 'No expense data available.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="w-1 rounded-full bg-[var(--color-income)] flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Income vs Expenses</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {insights.savingsRate > 0
                  ? `You're saving ${insights.savingsRate.toFixed(0)}% of your income — ${insights.savingsRate > 30 ? 'excellent discipline!' : 'keep it up!'}`
                  : 'Your expenses exceed your income. Time to review your spending.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="w-1 rounded-full bg-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Spending Velocity</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                You spend an average of {formatCurrency(insights.avgDailySpend)} per day.
                {insights.avgDailySpend > 100
                  ? ' Consider budgeting for non-essentials.'
                  : ' Good control over daily spending.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="w-1 rounded-full bg-[var(--color-expense)] flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Month-over-Month</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {insights.expenseChange > 0
                  ? `Expenses increased ${insights.expenseChange.toFixed(1)}% vs last month. Watch for recurring overspends.`
                  : `Expenses decreased by ${Math.abs(insights.expenseChange).toFixed(1)}%. Nice cost control!`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
