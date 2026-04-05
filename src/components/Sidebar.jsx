import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
  Shield,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { ROLES } from '../data/mockData';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

const sidebarVariants = {
  closed: { x: '-100%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
  open: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const Sidebar = () => {
  const { state, dispatch, showToast } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isAdmin = state.role === 'admin';

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    dispatch({ type: 'SET_ROLE', payload: newRole });
    showToast(
      `Switched to ${newRole === 'admin' ? 'Admin' : 'Viewer'} mode`,
      'info'
    );
  };

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)] transition-theme">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-semibold text-[var(--color-text-primary)]">FinVue</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar — Desktop: always visible, Mobile: animated slide */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 bottom-0 z-50 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex-col transition-theme lg:static lg:z-auto"
      >
        <SidebarContent
          state={state}
          dispatch={dispatch}
          isAdmin={isAdmin}
          handleRoleChange={handleRoleChange}
          location={location}
          onNavClick={() => setMobileOpen(false)}
        />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col transition-theme"
          >
            <SidebarContent
              state={state}
              dispatch={dispatch}
              isAdmin={isAdmin}
              handleRoleChange={handleRoleChange}
              location={location}
              onNavClick={() => setMobileOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const SidebarContent = ({ state, dispatch, isAdmin, handleRoleChange, location, onNavClick }) => {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--color-border)]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/20">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <div>
          <h1 className="font-bold text-lg text-[var(--color-text-primary)] leading-tight">FinVue</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Finance Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onNavClick}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary-500/10 rounded-xl shadow-sm"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon size={18} />
                {label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="px-4 pb-5 space-y-3">
        {/* Role Selector */}
        <div className={`p-3 rounded-xl border transition-all duration-300 ${
          isAdmin
            ? 'bg-primary-50/50 dark:bg-primary-500/5 border-primary-200 dark:border-primary-500/20'
            : 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20'
        }`}>
          <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
            Role
          </label>
          <div className="relative">
            {isAdmin ? (
              <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
            ) : (
              <Eye size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
            )}
            <select
              id="role-selector"
              value={state.role}
              onChange={handleRoleChange}
              className="w-full pl-8 pr-8 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
            >
              {Object.entries(ROLES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5">
            {isAdmin ? 'Full access — can add, edit, delete' : 'Read-only — view data only'}
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <button
          id="dark-mode-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-all duration-200"
        >
          <motion.div
            key={state.darkMode ? 'sun' : 'moon'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {state.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
          {state.darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
