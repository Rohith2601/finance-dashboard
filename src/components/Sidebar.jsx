import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
  ChevronDown,
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

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleIcon = state.role === 'admin' ? Shield : Eye;
  const RoleIcon = roleIcon;

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
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)]
          flex flex-col transition-all duration-300 ease-in-out transition-theme
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
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
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Controls */}
        <div className="px-4 pb-5 space-y-3">
          {/* Role Selector */}
          <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
              Role
            </label>
            <div className="relative">
              <RoleIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <select
                id="role-selector"
                value={state.role}
                onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
                className="w-full pl-8 pr-8 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                {Object.entries(ROLES).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-all duration-200"
          >
            {state.darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {state.darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
