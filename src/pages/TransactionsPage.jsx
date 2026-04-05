import { useApp } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Plus, Eye, Lock } from 'lucide-react';

const TransactionsPage = () => {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';

  return (
    <PageTransition className="space-y-5">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Transactions</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {isAdmin ? 'View, add, and manage your transactions' : 'Browse and explore your transaction history'}
          </p>
        </div>
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="add-transaction-btn"
            onClick={() => dispatch({ type: 'TOGGLE_ADD_MODAL' })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Transaction</span>
          </motion.button>
        )}
      </motion.div>

      {/* Viewer notice */}
      {!isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Eye size={18} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Viewing in read-only mode
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              Switch to Admin role in the sidebar to add, edit, or delete transactions
            </p>
          </div>
          <Lock size={14} className="text-amber-400 ml-auto flex-shrink-0" />
        </motion.div>
      )}

      {/* Transaction Table */}
      <TransactionTable />

      {/* Modal */}
      <TransactionModal />
    </PageTransition>
  );
};

export default TransactionsPage;
