"use client";

import { useState, useEffect } from "react";
import { getTokenTransactions } from "@/actions/payments";

export default function TokenHistory({ transactions, isLoading }) {
  if (isLoading) {
    return (
      <div className="text-center py-4">Loading transaction history...</div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-4">No transaction history found.</div>
    );
  }

  // Get only token consumption transactions (negative amounts)
  const consumptionTransactions = transactions.filter((t) => t.amount < 0);

  if (consumptionTransactions.length === 0) {
    return <div className="text-center py-4">No token usage recorded yet.</div>;
  }

  const formatFeatureName = (name) => {
    if (!name) return "N/A";
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tokens Used
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {consumptionTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFeatureName(transaction.featureType || "N/A")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-red-600">
                  {Math.abs(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
