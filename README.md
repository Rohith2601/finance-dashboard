# FinVue — Finance Dashboard UI

A modern, frontend-only personal finance dashboard built to demonstrate strong UI/UX, state management, and frontend engineering practices. FinVue provides users with clear financial insights, role-based access, and seamless transaction management.

🔗 **Live Demo:** [https://finance-dashboard-eight-virid.vercel.app/](https://finance-dashboard-eight-virid.vercel.app/)  
🔗 **Repository:** [https://github.com/Rohith2601/finance-dashboard](https://github.com/Rohith2601/finance-dashboard)

## ✨ Features

### Dashboard & Analytics
- **Summary Overview:** Quick glance at total balance, income, expenses, and transaction count with month-over-month KPI deltas.
- **Visual Insights:** Interactive balance trend area charts and categorized spending breakdown donut charts.
- **Smart Observations:** Automated, data-driven insights (e.g., spending velocity, largest expenses, savings rate).

### Transaction Management
- **Robust Data Grid:** View, search, filter (by type, category, month), and sort transactions.
- **CRUD Operations:** Add, edit, and delete transactions with immediate UI feedback and animated transitions.
- **Data Portability:** Export transactions instantly to CSV or JSON formats.

### Core Experience
- **Role-based Access Control:** Toggle between 'Admin' (full access) and 'Viewer' (read-only) modes.
- **Premium UX/UI:** Fluid page transitions, staggered entrance animations, and micro-interactions powered by Framer Motion.
- **Persistence:** State is persisted locally via `localStorage` to ensure data remains between sessions.
- **Theming:** Seamless dark mode toggle.

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** React Context API + `useReducer`
- **Routing:** React Router v7
- **Data Visualization:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🧠 Product & Design Decisions

### Information Architecture
The dashboard is structured to prioritize the most critical data first. Key performance indicators (KPIs) sit at the top, followed by macro-trends (balance over time), and micro-breakdowns (category spending). This progressive disclosure prevents cognitive overload.

### Role-Based Interface
The dual-role system (Admin vs. Viewer) was implemented to demonstrate dynamic UI adaptation without a backend authentication layer. In Viewer mode, destructive actions are disabled, and clear visual indicators prevent user confusion.

### Visual Polish
Instead of relying solely on static components, Framer Motion sequence animations guide the user's eye to newly loaded data. A custom toast notification system provides immediate, non-intrusive feedback for user actions, ensuring the application feels responsive and alive.

## ⚙️ Technical Architecture

### State Management
The application employs `Context API` paired with `useReducer` to manage global state. This pattern avoids prop drilling and centralizes business logic (filtering, sorting, aggregations) in a predictable manner without the boilerplate of Redux or the external dependency of Zustand.

### Component Philosophy
Components are highly modularized:
- **Smart Containers:** Pages (`DashboardPage`, `TransactionsPage`) handle data retrieval from context.
- **Dumb Presentational Components:** UI blocks (`SummaryCards`, `TransactionTable`) receive data and focus solely on rendering and interactions.

## 📁 Project Structure

```text
finance-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BalanceTrendChart.jsx
│   │   ├── PageTransition.jsx  # Framer motion wrapper
│   │   ├── RecentTransactions.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── SpendingBreakdownChart.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── Toast.jsx           # Custom notification system
│   │   ├── TransactionModal.jsx
│   │   └── TransactionTable.jsx
│   ├── context/
│   │   └── AppContext.jsx  # Global state management
│   ├── data/
│   │   └── mockData.js     # Initial seed data
│   ├── pages/              # Route components
│   │   ├── DashboardPage.jsx
│   │   ├── InsightsPage.jsx
│   │   └── TransactionsPage.jsx
│   ├── utils/
│   │   └── helpers.js      # Formatting and logic utilities
│   ├── App.jsx             # Main application layout and routes
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles and Tailwind directives
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rohith2601/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🔮 Future Improvements

While this project focuses heavily on frontend architecture and UX, a production-ready iteration would include:
- **API Integration:** Connect to a real REST or GraphQL backend using React Query for server state management.
- **Authentication:** Implement JWT-based auth (e.g., via Supabase or Auth0) to replace the mocked role-toggle.
- **Advanced Analytics:** Integrate custom date-range pickers and deeper historical comparisons.
- **Performance:** Implement component lazy-loading and memoize derived data calculations for larger datasets.

---
*This project prioritizes UX, clarity, and solid frontend architecture over backend complexity.*