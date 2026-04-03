// Category definitions with colors and icons
export const CATEGORIES = {
  salary: { label: 'Salary', color: '#6366f1', type: 'income' },
  freelance: { label: 'Freelance', color: '#8b5cf6', type: 'income' },
  investments: { label: 'Investments', color: '#06b6d4', type: 'income' },
  gifts: { label: 'Gifts', color: '#f59e0b', type: 'income' },
  food: { label: 'Food & Dining', color: '#ef4444', type: 'expense' },
  transport: { label: 'Transport', color: '#f97316', type: 'expense' },
  shopping: { label: 'Shopping', color: '#ec4899', type: 'expense' },
  entertainment: { label: 'Entertainment', color: '#8b5cf6', type: 'expense' },
  utilities: { label: 'Utilities', color: '#64748b', type: 'expense' },
  healthcare: { label: 'Healthcare', color: '#14b8a6', type: 'expense' },
  education: { label: 'Education', color: '#3b82f6', type: 'expense' },
  rent: { label: 'Rent', color: '#a855f7', type: 'expense' },
  subscriptions: { label: 'Subscriptions', color: '#f43f5e', type: 'expense' },
};

// Generate realistic mock transactions
export const generateMockTransactions = () => {
  const transactions = [
    // January 2026
    { id: 't001', date: '2026-01-05', amount: 5200, category: 'salary', type: 'income', description: 'Monthly salary — January' },
    { id: 't002', date: '2026-01-07', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent payment' },
    { id: 't003', date: '2026-01-08', amount: 45.50, category: 'food', type: 'expense', description: 'Grocery shopping — Whole Foods' },
    { id: 't004', date: '2026-01-10', amount: 800, category: 'freelance', type: 'income', description: 'Web design project — Client A' },
    { id: 't005', date: '2026-01-12', amount: 32, category: 'transport', type: 'expense', description: 'Uber rides — weekly' },
    { id: 't006', date: '2026-01-14', amount: 120, category: 'utilities', type: 'expense', description: 'Electricity bill' },
    { id: 't007', date: '2026-01-15', amount: 65, category: 'subscriptions', type: 'expense', description: 'Netflix + Spotify + iCloud' },
    { id: 't008', date: '2026-01-18', amount: 250, category: 'shopping', type: 'expense', description: 'Winter jacket — Nike' },
    { id: 't009', date: '2026-01-20', amount: 38, category: 'food', type: 'expense', description: 'Restaurant dinner — Italian place' },
    { id: 't010', date: '2026-01-22', amount: 150, category: 'healthcare', type: 'expense', description: 'Doctor visit — annual checkup' },
    { id: 't011', date: '2026-01-25', amount: 500, category: 'investments', type: 'income', description: 'Stock dividend — AAPL' },
    { id: 't012', date: '2026-01-28', amount: 89, category: 'entertainment', type: 'expense', description: 'Concert tickets — local venue' },

    // February 2026
    { id: 't013', date: '2026-02-03', amount: 5200, category: 'salary', type: 'income', description: 'Monthly salary — February' },
    { id: 't014', date: '2026-02-05', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent payment' },
    { id: 't015', date: '2026-02-07', amount: 52, category: 'food', type: 'expense', description: 'Grocery shopping — Trader Joe\'s' },
    { id: 't016', date: '2026-02-10', amount: 1500, category: 'freelance', type: 'income', description: 'App development — Client B' },
    { id: 't017', date: '2026-02-12', amount: 28, category: 'transport', type: 'expense', description: 'Gas station fill-up' },
    { id: 't018', date: '2026-02-14', amount: 180, category: 'shopping', type: 'expense', description: 'Valentine\'s Day gift' },
    { id: 't019', date: '2026-02-15', amount: 95, category: 'utilities', type: 'expense', description: 'Internet + Phone bill' },
    { id: 't020', date: '2026-02-18', amount: 200, category: 'education', type: 'expense', description: 'Online course — React Advanced' },
    { id: 't021', date: '2026-02-20', amount: 62, category: 'food', type: 'expense', description: 'Team lunch — coworkers' },
    { id: 't022', date: '2026-02-22', amount: 45, category: 'entertainment', type: 'expense', description: 'Movie night + popcorn' },
    { id: 't023', date: '2026-02-25', amount: 300, category: 'gifts', type: 'income', description: 'Birthday gift from family' },
    { id: 't024', date: '2026-02-28', amount: 65, category: 'subscriptions', type: 'expense', description: 'Netflix + Spotify + iCloud' },

    // March 2026
    { id: 't025', date: '2026-03-03', amount: 5200, category: 'salary', type: 'income', description: 'Monthly salary — March' },
    { id: 't026', date: '2026-03-05', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent payment' },
    { id: 't027', date: '2026-03-06', amount: 68, category: 'food', type: 'expense', description: 'Grocery shopping — Costco' },
    { id: 't028', date: '2026-03-08', amount: 350, category: 'shopping', type: 'expense', description: 'New headphones — Sony WH-1000XM5' },
    { id: 't029', date: '2026-03-10', amount: 42, category: 'transport', type: 'expense', description: 'Monthly metro pass top-up' },
    { id: 't030', date: '2026-03-12', amount: 2000, category: 'freelance', type: 'income', description: 'UI/UX consulting — Startup C' },
    { id: 't031', date: '2026-03-14', amount: 110, category: 'utilities', type: 'expense', description: 'Electricity + Water bill' },
    { id: 't032', date: '2026-03-16', amount: 75, category: 'healthcare', type: 'expense', description: 'Pharmacy — prescriptions' },
    { id: 't033', date: '2026-03-18', amount: 55, category: 'food', type: 'expense', description: 'Sushi restaurant — date night' },
    { id: 't034', date: '2026-03-20', amount: 120, category: 'entertainment', type: 'expense', description: 'Gaming — new release purchase' },
    { id: 't035', date: '2026-03-22', amount: 750, category: 'investments', type: 'income', description: 'ETF dividend payout' },
    { id: 't036', date: '2026-03-25', amount: 65, category: 'subscriptions', type: 'expense', description: 'Netflix + Spotify + iCloud' },
    { id: 't037', date: '2026-03-27', amount: 85, category: 'food', type: 'expense', description: 'Grocery + snacks weekly haul' },
    { id: 't038', date: '2026-03-30', amount: 450, category: 'education', type: 'expense', description: 'Conference pass — DevConnect' },
  ];

  return transactions;
};

export const ROLES = {
  viewer: { label: 'Viewer', description: 'Can view data only' },
  admin: { label: 'Admin', description: 'Can add and edit transactions' },
};
