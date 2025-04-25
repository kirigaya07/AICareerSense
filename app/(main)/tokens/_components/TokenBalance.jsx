"use client";

import { useState, useEffect } from "react";
import { getUserTokenInfo } from "@/actions/payments";

export default function TokenBalance() {
  const [tokenInfo, setTokenInfo] = useState({ tokens: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTokenInfo() {
      try {
        const info = await getUserTokenInfo();
        setTokenInfo(info);
      } catch (error) {
        console.error("Error loading token info:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTokenInfo();
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-10 w-32 rounded"></div>;
  }

  return (
    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">
        {tokenInfo.tokens.toLocaleString()} tokens
      </span>
    </div>
  );
}
