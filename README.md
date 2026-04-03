# FinVue — Personal Finance Dashboard

A modern, responsive personal finance dashboard built with React, Vite, and Tailwind CSS. This project demonstrates strong frontend skills through clean architecture, thoughtful UI/UX decisions, and comprehensive state management — all powered by mock data with no backend required.

![Dashboard](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![Recharts](https://img.shields.io/badge/Recharts-3-22B5BF)

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses, and Transaction count at a glance
- **Balance Trend Chart** — Area chart tracking cumulative balance, income, and expenses over time
- **Spending Breakdown** — Interactive donut chart showing expense distribution by category
- **Recent Transactions** — Quick view of the 5 most recent transactions with color-coded amounts

### 💳 Transactions Management
- **Full Data Table** — Sortable table with Date, Description, Category, Type, and Amount
- **Search** — Real-time search across descriptions and categories
- **Advanced Filters** — Filter by type (income/expense), category, and month
- **Sort Controls** — Sort by date, amount, or category in ascending/descending order
- **Add & Edit** — Modal form with validation for creating and editing transactions (Admin only)
- **Delete** — Remove transactions with confirmation dialog (Admin only)
- **Export** — Download filtered data as CSV or JSON
- **Empty States** — Graceful handling of no-data and no-results scenarios
- **Mobile Cards** — Responsive card layout on smaller screens

### 🔐 Role-Based UI
- **Viewer Mode** — Read-only access; Add/Edit/Delete controls are hidden
- **Admin Mode** — Full CRUD access with action buttons and modals
- **Role Switcher** — Dropdown in the sidebar to toggle between roles
- **Contextual Notices** — Informational banner when in Viewer mode

### 💡 Insights Section
- **Key Metrics** — Highest spending category, savings rate, expense trend, daily average
- **Monthly Comparison** — Bar chart comparing income vs expenses by month
- **Top Categories** — Horizontal bar chart of top expense categories
- **Key Observations** — Data-driven analysis cards covering biggest expense, income vs expenses, spending velocity, and month-over-month trends

### 🎨 UI/UX Polish
- **Dark Mode** — Full dark theme toggle with smooth transitions
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Animations** — Staggered fade-in animations, hover effects, and smooth transitions
- **Color Semantics** — Green for income, red for expenses, neutral backgrounds
- **Custom Design System** — CSS custom properties for theming consistency
- **Mobile Navigation** — Slide-out drawer with backdrop overlay

### 💾 Persistence & Export
- **localStorage** — Transactions, role preference, and dark mode persist across sessions
- **CSV Export** — Download filtered transactions as spreadsheet-compatible CSV
- **JSON Export** — Download raw data as formatted JSON

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library with hooks and Context API |
| **Vite 8** | Fast build tool with HMR |
| **Tailwind CSS 4** | Utility-first CSS with custom theme |
| **Recharts 3** | Composable chart components |
| **React Router 7** | Client-side routing |
| **Lucide React** | Modern icon set |
| **localStorage API** | Client-side persistence |

---

## 📁 Project Structure

```
finance-dashboard/
├── public/
│   └── favicon.svg              # Custom branded favicon
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           # Navigation, role switcher, dark mode
│   │   ├── SummaryCards.jsx      # Balance/Income/Expense/Count cards
│   │   ├── BalanceTrendChart.jsx # Area chart for balance over time
│   │   ├── SpendingBreakdownChart.jsx # Donut chart for categories
│   │   ├── RecentTransactions.jsx # Latest 5 transactions list
│   │   ├── TransactionTable.jsx  # Full table with search/filter/sort
│   │   ├── TransactionModal.jsx  # Add/Edit form modal
│   │   └── InsightsPanel.jsx     # Metrics, charts, observations
│   ├── context/
│   │   └── AppContext.jsx        # Global state with useReducer
│   ├── data/
│   │   └── mockData.js           # 38 realistic transactions, categories
│   ├── pages/
│   │   ├── DashboardPage.jsx     # Dashboard overview layout
│   │   ├── TransactionsPage.jsx  # Transaction management page
│   │   └── InsightsPage.jsx      # Insights & analytics page
│   ├── utils/
│   │   └── helpers.js            # Formatting, export, utility functions
│   ├── App.jsx                   # Root layout with routing
│   ├── main.jsx                  # Entry point with providers
│   └── index.css                 # Tailwind imports + custom styles
├── index.html                    # HTML template with SEO meta
├── vite.config.js                # Vite + React + Tailwind plugins
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 Design Decisions & Approach

### State Management
- Used React's **`useReducer` + Context API** for centralized state — clean, predictable, and framework-standard without extra dependencies
- Actions are explicit and descriptive (`SET_FILTER`, `ADD_TRANSACTION`, `TOGGLE_DARK_MODE`)
- Memoized computed values (`getFilteredTransactions`, `getSummary`) to avoid unnecessary recalculations

### Component Architecture
- **Separation of concerns** — Pages compose components; components are self-contained
- **Single responsibility** — Each component handles one feature area
- **Prop minimization** — Components pull from context rather than prop-drilling

### Styling Strategy
- **Tailwind CSS v4** with CSS custom properties for theme tokens
- Explicit dark mode support via `.dark` class toggle on `<html>`
- Custom utility classes for glass-card effects, animations, and scrollbar styling

### Mock Data
- **38 transactions** across 3 months (Jan–Mar 2026) with 13 categories
- Realistic descriptions, varied amounts, and mixed income/expense distribution
- Designed to produce meaningful charts and non-trivial insights

### UX Considerations
- **Graceful empty states** — Every component handles zero-data scenarios
- **Progressive disclosure** — Filters panel is collapsible with active count badge
- **Confirmation dialogs** — Delete actions require explicit confirmation
- **Form validation** — Real-time feedback on the add/edit modal
- **Responsive breakpoints** — Mobile card layout, tablet adjustments, desktop table

---

## 🎯 Assessment Alignment

| Requirement | Implementation |
|---|---|
| Dashboard with summary cards | ✅ 4 cards: Balance, Income, Expenses, Count |
| Time-based visualization | ✅ Area chart with cumulative balance trend |
| Categorical visualization | ✅ Donut chart with spending breakdown |
| Transaction table with date/amount/category/type | ✅ Full table + mobile cards |
| Search, filter, sort | ✅ Text search, type/category/month filters, multi-sort |
| Empty states | ✅ Every section handles no-data gracefully |
| Role-based UI (Viewer/Admin) | ✅ Sidebar toggle, conditional CRUD controls |
| Insights with observations | ✅ Metrics, charts, and 4 data-driven observations |
| Clean state management | ✅ useReducer + Context, modular and readable |
| Responsive design | ✅ Mobile drawer, card layout, fluid grid |
| Dark mode | ✅ Full theme toggle with localStorage persistence |
| localStorage persistence | ✅ Transactions, role, and theme persist |
| CSV/JSON export | ✅ Export filtered data in both formats |
| Animations | ✅ Staggered fade-in, hover effects, smooth transitions |

---

## 📝 License

This project was built as an internship assessment submission. Feel free to reference the architecture and patterns.
#   f i n a n c e - d a s h b o a r d  
 