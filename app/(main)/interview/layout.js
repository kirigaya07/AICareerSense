import { Suspense } from "react";
import DelayedLoader from "@/components/delayed-loader";

// Interview-themed loading animation
const InterviewLoader = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-6">
        {/* Interview cards animation */}
        <div className="absolute inset-0 rounded-md border-2 border-blue-300 dark:border-blue-700 animate-pulse bg-white dark:bg-gray-800 shadow-md">
          {/* Question marks */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl font-bold text-blue-400 dark:text-blue-500 animate-pulse">
            ?
          </div>

          {/* Card lines */}
          <div className="absolute left-3 right-3 bottom-12 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
          <div className="absolute left-3 right-6 bottom-8 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
          <div className="absolute left-3 right-10 bottom-4 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
        </div>

        {/* Secondary card (offset) */}
        <div className="absolute inset-0 rounded-md border-2 border-indigo-300 dark:border-indigo-700 animate-pulse bg-white dark:bg-gray-800 shadow-md -rotate-6 -translate-x-3 -translate-y-3">
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl font-bold text-indigo-400 dark:text-indigo-500 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            ?
          </div>
        </div>

        {/* Third card (offset in other direction) */}
        <div className="absolute inset-0 rounded-md border-2 border-purple-300 dark:border-purple-700 animate-pulse bg-white dark:bg-gray-800 shadow-md rotate-12 translate-x-3 -translate-y-1">
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl font-bold text-purple-400 dark:text-purple-500 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            ?
          </div>
        </div>

        {/* Graduation cap icon */}
        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
      </div>

      {/* Question list loading animation */}
      <div className="w-full max-w-2xl mx-auto space-y-4 px-4">
        <div className="h-8 w-2/3 mx-auto bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-800 rounded animate-pulse"></div>

        <div className="h-40 w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <div className="space-y-3">
            <div className="h-5 w-full bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse"></div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-8 w-40 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center">
          Loading Interview Prep
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
          Preparing your interview practice questions
        </p>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <DelayedLoader delay={5000} fallback={<InterviewLoader />}>
        {children}
      </DelayedLoader>
    </div>
  );
};

export default Layout;
