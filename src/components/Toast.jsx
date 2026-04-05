import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const variants = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20',
    iconColor: 'text-emerald-500',
    text: 'text-emerald-800 dark:text-emerald-300',
  },
  error: {
    icon: XCircle,
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-200 dark:border-rose-500/20',
    iconColor: 'text-rose-500',
    text: 'text-rose-800 dark:text-rose-300',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
    iconColor: 'text-blue-500',
    text: 'text-blue-800 dark:text-blue-300',
  },
};

const ToastItem = ({ toast }) => {
  const { dispatch } = useApp();
  const config = variants[toast.variant] || variants.info;
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'DISMISS_TOAST', payload: toast.id });
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${config.bg} ${config.border}`}
    >
      <Icon size={18} className={config.iconColor} />
      <p className={`text-sm font-medium flex-1 ${config.text}`}>{toast.message}</p>
      <button
        onClick={() => dispatch({ type: 'DISMISS_TOAST', payload: toast.id })}
        className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${config.text}`}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

const Toast = () => {
  const { state } = useApp();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 min-w-[280px] max-w-[360px]">
      <AnimatePresence mode="popLayout">
        {state.toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
