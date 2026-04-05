const SkeletonCard = () => (
  <div className="glass-card p-5 space-y-3">
    <div className="flex items-center justify-between">
      <div className="skeleton w-11 h-11 rounded-xl" />
      <div className="skeleton w-16 h-6 rounded-lg" />
    </div>
    <div className="skeleton h-3 w-24 rounded" />
    <div className="skeleton h-7 w-32 rounded" />
  </div>
);

const SkeletonChart = ({ height = 280 }) => (
  <div className="glass-card p-6">
    <div className="skeleton h-4 w-32 mb-6 rounded" />
    <div className="skeleton rounded-xl" style={{ height }} />
  </div>
);

const SkeletonTableRow = () => (
  <div className="flex items-center gap-4 px-5 py-3.5">
    <div className="skeleton h-4 w-20 rounded" />
    <div className="skeleton h-4 w-48 rounded flex-1" />
    <div className="skeleton h-6 w-20 rounded-lg" />
    <div className="skeleton h-4 w-16 rounded" />
    <div className="skeleton h-4 w-20 rounded" />
  </div>
);

const SkeletonInsightCard = () => (
  <div className="glass-card p-5 space-y-3">
    <div className="flex items-center gap-2">
      <div className="skeleton w-9 h-9 rounded-xl" />
      <div className="skeleton h-3 w-24 rounded" />
    </div>
    <div className="skeleton h-5 w-28 rounded" />
    <div className="skeleton h-3 w-20 rounded" />
  </div>
);

export { SkeletonCard, SkeletonChart, SkeletonTableRow, SkeletonInsightCard };
