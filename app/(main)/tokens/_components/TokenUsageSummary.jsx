"use client";

export default function TokenUsageSummary({ transactions }) {
  // Calculate total tokens consumed
  const totalConsumed = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Calculate total tokens purchased
  const totalPurchased = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // Get the most used feature
  const featureUsage = {};
  transactions
    .filter((t) => t.amount < 0 && t.featureType)
    .forEach((t) => {
      if (!featureUsage[t.featureType]) {
        featureUsage[t.featureType] = 0;
      }
      featureUsage[t.featureType] += Math.abs(t.amount);
    });

  const mostUsedFeature =
    Object.entries(featureUsage).sort((a, b) => b[1] - a[1])[0] || [];

  const formatFeatureName = (name) => {
    if (!name) return "N/A";
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-1">
          Total Consumed
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {totalConsumed.toLocaleString()}
        </p>
        <p className="text-xs text-blue-500 mt-1">tokens used</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-800 mb-1">
          Total Purchased
        </h3>
        <p className="text-2xl font-bold text-green-600">
          {totalPurchased.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 mt-1">tokens added</p>
      </div>

      {mostUsedFeature.length > 0 ? (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-1">
            Most Used Feature
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatFeatureName(mostUsedFeature[0])}
          </p>
          <p className="text-xs text-purple-500 mt-1">
            {mostUsedFeature[1].toLocaleString()} tokens
          </p>
        </div>
      ) : (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-1">
            Most Used Feature
          </h3>
          <p className="text-2xl font-bold text-purple-600">N/A</p>
          <p className="text-xs text-purple-500 mt-1">No usage data yet</p>
        </div>
      )}
    </div>
  );
}
