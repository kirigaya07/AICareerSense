"use client";

import React, { useState, useEffect } from "react";

const LoadingWrapper = ({ children, fallback, minLoadingTime = 5000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout for the minimum loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  // Show fallback while loading
  if (isLoading) {
    return fallback;
  }

  // Show the actual content after loading
  return children;
};

export default LoadingWrapper;
