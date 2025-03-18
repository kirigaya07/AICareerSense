"use client";

import { useState, useEffect } from "react";

export default function DelayedLoader({ children, fallback, delay = 5000 }) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!showContent) {
        return fallback;
    }

    return children;
} 