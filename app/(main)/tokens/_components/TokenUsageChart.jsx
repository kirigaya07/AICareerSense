"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TokenUsageChart({ transactions }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#3B82F6", // blue
          "#10B981", // green
          "#F59E0B", // amber
          "#EF4444", // red
          "#8B5CF6", // purple
          "#EC4899", // pink
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Only process consumption transactions (negative amounts)
    const consumptionTransactions = transactions.filter((t) => t.amount < 0);

    // Group by feature type
    const featureUsage = {};
    consumptionTransactions.forEach((transaction) => {
      const featureType = transaction.featureType || "Other";
      if (!featureUsage[featureType]) {
        featureUsage[featureType] = 0;
      }
      // Use absolute value for the chart
      featureUsage[featureType] += Math.abs(transaction.amount);
    });

    // Convert to chart data
    const labels = Object.keys(featureUsage);
    const data = Object.values(featureUsage);

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#3B82F6", // blue
            "#10B981", // green
            "#F59E0B", // amber
            "#EF4444", // red
            "#8B5CF6", // purple
            "#EC4899", // pink
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [transactions]);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()} tokens`;
          },
        },
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
  };

  // If no consumption data, show a message
  if (chartData.labels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white p-6 rounded-lg shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-gray-500 text-center">
          No token usage data available yet. Start using AI features to see your
          usage breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-500">
        Token Usage Breakdown
      </h2>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
