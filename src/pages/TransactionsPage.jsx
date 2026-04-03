import { useApp } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import { Plus } from 'lucide-react';

const TransactionsPage = () => {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Transactions</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {isAdmin ? 'View, add, and manage your transactions' : 'Browse and explore your transaction history'}
          </p>
        </div>
        {isAdmin && (
          <button
            id="add-transaction-btn"
            onClick={() => dispatch({ type: 'TOGGLE_ADD_MODAL' })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 active:scale-[0.98] transition-all"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}
      </div>

      {/* Viewer notice */}
      {!isAdmin && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span className="text-amber-600 text-sm">
            👀 You're viewing as <strong>Viewer</strong>. Switch to <strong>Admin</strong> to add or edit transactions.
          </span>
        </div>
      )}

      {/* Transaction Table */}
      <TransactionTable />

      {/* Modal */}
      <TransactionModal />
    </div>
  );
};

export default TransactionsPage;
