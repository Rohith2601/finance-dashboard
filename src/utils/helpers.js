/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string into human-readable format
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Format date for short display
 */
export const formatDateShort = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Get month name from date string
 */
export const getMonthName = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
};

/**
 * Get month-year key (YYYY-MM) from date string
 */
export const getMonthKey = (dateStr) => {
  return dateStr.substring(0, 7);
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return 't' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Calculate percentage change between two values
 */
export const calcPercentChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Export transactions as CSV string
 */
export const exportToCSV = (transactions, categories) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    categories[t.category]?.label || t.category,
    t.type,
    t.amount.toFixed(2),
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

/**
 * Export transactions as JSON string
 */
export const exportToJSON = (transactions) => {
  return JSON.stringify(transactions, null, 2);
};

/**
 * Download a string as a file
 */
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
