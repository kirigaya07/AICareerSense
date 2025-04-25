"use client";

export default function DashboardLoader() {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 mb-6">
        {/* Main dashboard card */}
        <div className="absolute inset-0 rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-800 shadow-md animate-pulse">
          {/* Chart visualization */}
          <div className="absolute top-3 left-3 right-3 h-12 rounded-md overflow-hidden">
            <div className="flex h-full items-end justify-between px-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 bg-blue-400 dark:bg-blue-600 rounded-t"
                  style={{
                    height: `${Math.max(
                      20,
                      Math.min(100, 30 + Math.sin(i * 0.8) * 60)
                    )}%`,
                    animationDelay: `${i * 0.1}s`,
                    animation: "pulse 1.5s infinite ease-in-out alternate",
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="absolute top-18 inset-x-3 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded bg-gray-100 dark:bg-gray-700 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>

          {/* Data table */}
          <div className="absolute bottom-3 inset-x-3 h-10 rounded bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
        </div>

        {/* Secondary dashboard elements */}
        <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        </div>

        {/* Decorative element */}
        <div className="absolute -right-2 -top-2 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      </div>

      {/* Dashboard sections loading animation */}
      <div className="w-full max-w-3xl mx-auto space-y-4 px-4">
        <div className="h-8 w-1/2 mx-auto bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-800 rounded animate-pulse"></div>

        {/* Stat cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-3 space-y-3"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-between">
                <div className="h-4 w-1/2 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse"></div>
                <div className="h-4 w-4 rounded-full bg-blue-200 dark:bg-blue-800 animate-pulse"></div>
              </div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/70 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="h-72 w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="h-48 w-full flex items-end justify-between px-2 gap-1">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-full">
                <div
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-500 rounded-t animate-pulse"
                  style={{
                    height: `${Math.max(
                      20,
                      Math.min(100, 40 + Math.sin(i * 0.9) * 50)
                    )}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center">
          Loading Industry Insights
          <span className="inline-flex ml-1">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Analyzing industry data and market trends
        </p>
      </div>

      {/* Add custom animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scaleY(0.7);
            opacity: 0.6;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
