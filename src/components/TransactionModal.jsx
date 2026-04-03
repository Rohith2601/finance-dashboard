import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { generateId } from '../utils/helpers';
import { X, Plus, Save } from 'lucide-react';

const TransactionModal = () => {
  const { state, dispatch } = useApp();
  const { showAddModal, editingTransaction } = state;
  const isEditing = !!editingTransaction;

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'food',
    type: 'expense',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        amount: editingTransaction.amount.toString(),
        category: editingTransaction.category,
        type: editingTransaction.type,
        description: editingTransaction.description,
      });
    } else {
      setForm({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'food',
        type: 'expense',
        description: '',
      });
    }
    setErrors({});
  }, [editingTransaction, showAddModal]);

  if (!showAddModal) return null;

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Date is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      errs.amount = 'Valid positive amount is required';
    }
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const txn = {
      id: isEditing ? editingTransaction.id : generateId(),
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      description: form.description.trim(),
    };

    dispatch({
      type: isEditing ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION',
      payload: txn,
    });
  };

  const filteredCategories = Object.entries(CATEGORIES).filter(
    ([_, cat]) => cat.type === form.type
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card !rounded-2xl p-6 animate-fade-in-up !shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setForm((f) => ({
                      ...f,
                      type: t,
                      category: t === 'income' ? 'salary' : 'food',
                    }));
                  }}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all border
                    ${form.type === t
                      ? t === 'income'
                        ? 'bg-[var(--color-income)]/10 border-[var(--color-income)]/30 text-[var(--color-income)]'
                        : 'bg-[var(--color-expense)]/10 border-[var(--color-expense)]/30 text-[var(--color-expense)]'
                      : 'bg-[var(--color-surface-alt)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
                    }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Amount ($)</label>
            <input
              id="modal-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 transition-all
                ${errors.amount ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/30' : 'border-[var(--color-border)] focus:ring-primary-500/30'}`}
            />
            {errors.amount && <p className="text-xs text-[var(--color-expense)] mt-1">{errors.amount}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Date</label>
            <input
              id="modal-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 transition-all
                ${errors.date ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/30' : 'border-[var(--color-border)] focus:ring-primary-500/30'}`}
            />
            {errors.date && <p className="text-xs text-[var(--color-expense)] mt-1">{errors.date}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Category</label>
            <select
              id="modal-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
            >
              {filteredCategories.map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Description</label>
            <input
              id="modal-description"
              type="text"
              placeholder="e.g., Monthly rent payment"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 transition-all
                ${errors.description ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/30' : 'border-[var(--color-border)] focus:ring-primary-500/30'}`}
            />
            {errors.description && <p className="text-xs text-[var(--color-expense)] mt-1">{errors.description}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 active:scale-[0.98] transition-all"
          >
            {isEditing ? <Save size={16} /> : <Plus size={16} />}
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
