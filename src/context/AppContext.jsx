import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { generateMockTransactions } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'finvue_state';

// Load state from localStorage
const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load persisted state:', e);
  }
  return null;
};

const initialState = {
  transactions: generateMockTransactions(),
  role: 'admin',
  darkMode: false,
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    month: 'all',
  },
  editingTransaction: null,
  showAddModal: false,
  toasts: [],
};

// Try to restore from localStorage
const getInitialState = () => {
  const persisted = loadPersistedState();
  if (persisted) {
    return {
      ...initialState,
      transactions: persisted.transactions || initialState.transactions,
      role: persisted.role || initialState.role,
      darkMode: persisted.darkMode ?? initialState.darkMode,
    };
  }
  return initialState;
};

let toastIdCounter = 0;

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };

    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        showAddModal: false,
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        editingTransaction: null,
        showAddModal: false,
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'SET_EDITING_TRANSACTION':
      return { ...state, editingTransaction: action.payload, showAddModal: true };

    case 'TOGGLE_ADD_MODAL':
      return {
        ...state,
        showAddModal: !state.showAddModal,
        editingTransaction: state.showAddModal ? null : state.editingTransaction,
      };

    case 'CLOSE_MODAL':
      return { ...state, showAddModal: false, editingTransaction: null };

    case 'SHOW_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { id: ++toastIdCounter, ...action.payload }],
      };

    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          transactions: state.transactions,
          role: state.role,
          darkMode: state.darkMode,
        })
      );
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  }, [state.transactions, state.role, state.darkMode]);

  // Dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, variant: type } });
  }, []);

  // Filtered & sorted transactions
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...state.transactions];
    const { search, type, category, sortBy, sortOrder, month } = state.filters;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter((t) => t.type === type);
    }

    if (category !== 'all') {
      filtered = filtered.filter((t) => t.category === category);
    }

    if (month !== 'all') {
      filtered = filtered.filter((t) => t.date.startsWith(month));
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortBy === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state.transactions, state.filters]);

  // Summary calculations
  const getSummary = useCallback(() => {
    const txns = state.transactions;
    const totalIncome = txns
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = txns
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
      transactionCount: txns.length,
    };
  }, [state.transactions]);

  // Previous month summary for KPI deltas
  const getPreviousMonthSummary = useCallback(() => {
    const txns = state.transactions;
    const monthKeys = [...new Set(txns.map((t) => t.date.substring(0, 7)))].sort();
    
    if (monthKeys.length < 2) {
      return { prevIncome: 0, prevExpense: 0, prevBalance: 0, prevCount: 0 };
    }

    const currentMonth = monthKeys[monthKeys.length - 1];
    const previousMonth = monthKeys[monthKeys.length - 2];

    const currentTxns = txns.filter((t) => t.date.startsWith(currentMonth));
    const prevTxns = txns.filter((t) => t.date.startsWith(previousMonth));

    const calc = (arr) => ({
      income: arr.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expense: arr.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      count: arr.length,
    });

    const curr = calc(currentTxns);
    const prev = calc(prevTxns);

    return {
      currIncome: curr.income,
      currExpense: curr.expense,
      currBalance: curr.income - curr.expense,
      currCount: curr.count,
      prevIncome: prev.income,
      prevExpense: prev.expense,
      prevBalance: prev.income - prev.expense,
      prevCount: prev.count,
    };
  }, [state.transactions]);

  const value = {
    state,
    dispatch,
    getFilteredTransactions,
    getSummary,
    getPreviousMonthSummary,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
