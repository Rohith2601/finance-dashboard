import InsightsPanel from '../components/InsightsPanel';

const InsightsPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Insights</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Smart analysis and observations from your financial data
        </p>
      </div>

      {/* Insights Content */}
      <InsightsPanel />
    </div>
  );
};

export default InsightsPage;
