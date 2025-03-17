"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { getTokenPackages, getPaymentHistory } from "@/actions/payments";
import BuyTokens from "./BuyTokens";
import { BarLoader } from "react-spinners";

// Format date for display
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid date";
        }

        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        // Check if date is today
        if (date.toDateString() === now.toDateString()) {
            return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }

        // Check if date is yesterday
        if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }

        // Otherwise return formatted date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
}

export default function TokensContent() {
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Fetch payment history
    const {
        loading: loadingPayments,
        data: payments,
        error: paymentsError,
        fn: fetchPayments
    } = useFetch(getPaymentHistory);

    // Fetch token packages
    const {
        loading: loadingPackages,
        data: packages,
        error: packagesError,
        fn: fetchPackages
    } = useFetch(getTokenPackages);

    useEffect(() => {
        // Only fetch payment history and packages
        const fetchData = async () => {
            try {
                await Promise.all([fetchPayments(), fetchPackages()]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsInitialLoad(false);
            }
        };

        fetchData();
    }, []);

    // Show loading state only on initial load
    if (isInitialLoad) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <BarLoader width={200} color="#3B82F6" />
                <p className="mt-4 text-gray-500">Loading payment information...</p>
            </div>
        );
    }

    // Show error state if any of the fetches failed with a specific error
    if (paymentsError || packagesError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-red-600">Error Loading Payment Information</h1>
                <p className="mt-2">There was a problem loading your payment information. Please try again later.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-sm">
                    {paymentsError && <p>Payments error: {paymentsError.message}</p>}
                    {packagesError && <p>Packages error: {packagesError.message}</p>}
                </div>
                <button
                    onClick={() => {
                        setIsInitialLoad(true);
                        Promise.all([fetchPayments(), fetchPackages()]).finally(() => {
                            setIsInitialLoad(false);
                        });
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Ensure we have arrays even if the API returns null or undefined
    const safePayments = Array.isArray(payments) ? payments : [];
    const safePackages = Array.isArray(packages) ? packages : [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v3m0 4.5V12m0 4.5V18m-6-6H3m4.5-6L6 4.5m12 3L19.5 6M6 19.5L7.5 18m9 0l1.5 1.5M16.5 7.5L18 6M16.5 16.5L18 18M7.5 16.5L6 18m0-13.5L7.5 6M21 12h-3"></path>
                </svg>
                <h1 className="text-3xl font-bold">Token Management</h1>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-8">
                <p className="text-gray-700">
                    Tokens power all AI features in AspireAI. Each user starts with 10,000 tokens and can purchase more when needed.
                </p>
            </div>

            {/* Payment History */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                    Payment History
                </h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {loadingPayments ? (
                        <div className="p-8 flex justify-center">
                            <BarLoader width={150} color="#3B82F6" />
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {safePayments.length > 0 ? (
                                    safePayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(payment.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                                {payment.currency} {payment.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                                                +{payment.tokensAdded.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'COMPLETED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : payment.status === 'PENDING'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="font-medium">No payment history found</p>
                                                <p className="mt-1 text-gray-400">Purchase tokens to see your payment history here</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Purchase Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                    Purchase Tokens
                </h2>
                {loadingPackages ? (
                    <div className="bg-white p-8 rounded-lg shadow-md flex justify-center">
                        <BarLoader width={150} color="#3B82F6" />
                    </div>
                ) : safePackages.length > 0 ? (
                    <BuyTokens packages={safePackages} />
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No token packages available</p>
                        <p className="mt-1 text-gray-400">Please try again later or contact support</p>
                        <button
                            onClick={() => {
                                fetchPackages();
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Refresh Packages
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 