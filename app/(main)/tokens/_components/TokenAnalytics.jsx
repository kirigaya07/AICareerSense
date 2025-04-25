"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the chart component with no SSR
const TokenUsageChart = dynamic(() => import("./TokenUsageChart"), {
  ssr: false,
});

export default function TokenAnalytics({ transactions }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
        Usage Analytics
      </h2>
      <TokenUsageChart transactions={transactions} />
    </div>
  );
}
