"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyTokens({ packages }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setIsLoading(true);
    try {
      // Create order
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selectedPackage.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "AspireAI",
        description: `Purchase ${selectedPackage.tokens} tokens`,
        order_id: data.orderId,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              packageId: selectedPackage.id,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            router.refresh();
            alert("Payment successful! Tokens added to your account.");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-500">Purchase Tokens</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPackage?.id === pkg.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <h3 className="font-bold text-lg text-gray-500">
              {pkg.description}
            </h3>
            <p className="text-2xl font-bold text-blue-600">₹{pkg.amount}</p>
            <p className="text-gray-600">
              {pkg.tokens.toLocaleString()} tokens
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handlePurchase}
        disabled={!selectedPackage || isLoading}
        className={`w-full py-3 rounded-lg font-medium ${
          !selectedPackage || isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Processing..." : "Purchase Tokens"}
      </button>

      {/* <p className="text-sm text-gray-500 mt-4">
        <br />
        <code>{`<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`}</code>
      </p> */}
    </div>
  );
}
