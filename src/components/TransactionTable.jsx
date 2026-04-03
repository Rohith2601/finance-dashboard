import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency, formatDate, exportToCSV, exportToJSON, downloadFile } from '../utils/helpers';
import {
  Search, Filter, ArrowUpDown, ArrowUpRight, ArrowDownRight,
  Pencil, Trash2, Download, X, SlidersHorizontal, ChevronDown,
} from 'lucide-react';

const TransactionTable = () => {
  const { state, dispatch, getFilteredTransactions } = useApp();
  const { filters, role } = state;
  const filtered = getFilteredTransactions();
  const [showFilters, setShowFilters] = useState(false);
  const isAdmin = role === 'admin';

  // Get unique months from transactions
  const months = useMemo(() => {
    const set = new Set(state.transactions.map((t) => t.date.substring(0, 7)));
    return [...set].sort().reverse();
  }, [state.transactions]);

  const monthLabels = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December',
  };

  const activeFilterCount = [
    filters.type !== 'all',
    filters.category !== 'all',
    filters.month !== 'all',
  ].filter(Boolean).length;

  const handleExport = (format) => {
    const timestamp = new Date().toISOString().slice(0, 10);
    if (format === 'csv') {
      const csv = exportToCSV(filtered, CATEGORIES);
      downloadFile(csv, `finvue-transactions-${timestamp}.csv`, 'text/csv');
    } else {
      const json = exportToJSON(filtered);
      downloadFile(json, `finvue-transactions-${timestamp}.json`, 'application/json');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            id="transaction-search"
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: '' } })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle + Export */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
              ${showFilters
                ? 'bg-primary-500/10 border-primary-400 text-primary-600'
                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary-300'
              }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative group">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:border-primary-300 transition-all"
            >
              <Download size={16} />
              Export
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 py-1 glass-card !rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 !shadow-lg">
              <button
                onClick={() => handleExport('csv')}
                className="w-full px-4 py-2 text-left text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                className="w-full px-4 py-2 text-left text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-card p-4 transition-theme animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Type</label>
              <select
                id="filter-type"
                value={filters.type}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { key: 'type', value: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Category</label>
              <select
                id="filter-category"
                value={filters.category}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { key: 'category', value: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORIES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Month</label>
              <select
                id="filter-month"
                value={filters.month}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { key: 'month', value: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                <option value="all">All Months</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {monthLabels[m.split('-')[1]]} {m.split('-')[0]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Sort By</label>
              <div className="flex gap-2">
                <select
                  id="sort-by"
                  value={filters.sortBy}
                  onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { key: 'sortBy', value: e.target.value } })}
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'SET_FILTER',
                      payload: { key: 'sortOrder', value: filters.sortOrder === 'desc' ? 'asc' : 'desc' },
                    })
                  }
                  className="px-3 py-2 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-all"
                  title={filters.sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                >
                  <ArrowUpDown size={16} />
                </button>
              </div>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
              className="mt-3 text-xs text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
          {activeFilterCount > 0 && ' (filtered)'}
        </p>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center transition-theme">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-surface-alt)] flex items-center justify-center">
            <Search size={24} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-[var(--color-text-secondary)] font-medium mb-1">No transactions found</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Try adjusting your search or filters
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
              className="mt-4 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-600 text-sm font-medium hover:bg-primary-500/20 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block glass-card overflow-hidden transition-theme">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Description</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Type</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Amount</th>
                  {isAdmin && (
                    <th className="text-right px-5 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const cat = CATEGORIES[t.category];
                  const isIncome = t.type === 'income';
                  return (
                    <tr
                      key={t.id}
                      className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                        {formatDate(t.date)}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[var(--color-text-primary)] font-medium max-w-xs truncate">
                        {t.description}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: (cat?.color || '#94a3b8') + '18',
                            color: cat?.color || '#94a3b8',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat?.color || '#94a3b8' }} />
                          {cat?.label || t.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${isIncome ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'}`}>
                          {isIncome ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {isIncome ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className={`px-5 py-3.5 text-sm font-semibold text-right tabular-nums ${isIncome ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'}`}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => dispatch({ type: 'SET_EDITING_TRANSACTION', payload: t })}
                              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-primary-500 hover:bg-primary-500/10 transition-all"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Delete this transaction?')) {
                                  dispatch({ type: 'DELETE_TRANSACTION', payload: t.id });
                                }
                              }}
                              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-expense)] hover:bg-[var(--color-expense-light)] transition-all"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((t) => {
              const cat = CATEGORIES[t.category];
              const isIncome = t.type === 'income';
              return (
                <div key={t.id} className="glass-card p-4 transition-theme">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{t.description}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{formatDate(t.date)}</p>
                    </div>
                    <span className={`text-sm font-semibold tabular-nums ml-3 ${isIncome ? 'text-[var(--color-income)]' : 'text-[var(--color-expense)]'}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: (cat?.color || '#94a3b8') + '18',
                        color: cat?.color || '#94a3b8',
                      }}
                    >
                      {cat?.label || t.category}
                    </span>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => dispatch({ type: 'SET_EDITING_TRANSACTION', payload: t })}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-primary-500 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this transaction?')) {
                              dispatch({ type: 'DELETE_TRANSACTION', payload: t.id });
                            }
                          }}
                          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-expense)] transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionTable;
