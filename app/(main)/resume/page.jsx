import { getResume } from "@/actions/resume";
import React, { Suspense } from "react";
import ResumeBuilder from "./_components/resume-builder";
import LoadingWrapper from "./_components/loading-wrapper";

// Custom loader component for Resume page
const ResumeLoader = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="relative w-20 h-20 mb-8">
        {/* Document outline animation */}
        <div className="absolute inset-0 rounded-md border-2 border-blue-300 dark:border-blue-700 animate-pulse">
          {/* Content lines animation */}
          <div
            className="absolute left-3 top-3 right-3 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="absolute left-3 top-8 right-8 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute left-3 top-13 right-5 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute left-3 top-18 right-10 h-2 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Animated pen/pencil icon */}
        <div className="absolute -right-2 -top-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      </div>

      {/* Resume sections loading animation */}
      <div className="w-full max-w-md mx-auto space-y-3 px-4">
        <div className="h-6 w-3/4 mx-auto bg-gradient-to-r from-blue-300 to-blue-200 dark:from-blue-700 dark:to-blue-800 rounded animate-pulse"></div>

        <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-md p-3 space-y-2">
          <div className="h-4 w-1/2 bg-blue-200 dark:bg-blue-700 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-md p-3 space-y-2">
          <div className="h-4 w-2/5 bg-blue-200 dark:bg-blue-700 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center">
          Loading Resume Builder
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
          Preparing your professional resume editor
        </p>
      </div>
    </div>
  );
};

// Resume page that ensures the loader is shown for at least 5 seconds
const ResumePage = async () => {
  // Fetch the data on the server side
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      {/* LoadingWrapper will ensure the loading animation shows for at least 5 seconds */}
      <LoadingWrapper minLoadingTime={5000} fallback={<ResumeLoader />}>
        <ResumeBuilder initialContent={resume?.content} />
      </LoadingWrapper>
    </div>
  );
};

export default ResumePage;
