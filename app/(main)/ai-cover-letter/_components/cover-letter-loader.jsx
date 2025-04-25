export default function CoverLetterLoader() {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="relative w-28 h-36 mb-6">
        {/* Envelope animation */}
        <div className="absolute inset-0 rounded-md border-2 border-blue-300 dark:border-blue-700 animate-pulse">
          {/* Envelope flap */}
          <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
            <div className="w-full h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full transform -translate-y-8 animate-pulse"></div>
          </div>

          {/* Letter peeking out */}
          <div className="absolute top-3 left-3 right-3 bottom-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center p-2">
            <div className="h-2 w-3/4 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
            <div className="h-2 w-4/5 bg-gray-200 dark:bg-gray-700 mt-2 rounded animate-pulse"></div>
            <div className="h-2 w-4/5 bg-gray-200 dark:bg-gray-700 mt-1 rounded animate-pulse"></div>
            <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 mt-1 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Seal/stamp animation */}
        <div className="absolute -right-3 -bottom-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Cover letter list loading animation */}
      <div className="w-full max-w-2xl mx-auto space-y-4 px-4">
        <div className="h-8 w-3/4 mx-auto bg-gradient-to-r from-blue-300 to-blue-200 dark:from-blue-700 dark:to-blue-800 rounded animate-pulse"></div>

        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="space-y-2 flex-1">
              <div className="h-5 w-1/3 bg-blue-200 dark:bg-blue-700 rounded animate-pulse"></div>
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center">
          Loading Cover Letters
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
          Preparing your professional correspondence
        </p>
      </div>
    </div>
  );
}
