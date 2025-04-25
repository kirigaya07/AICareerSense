import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import Razorpay from "razorpay";
import { getTokenPackages } from "@/actions/payments";

// Initialize Razorpay with your key ID and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get package details by ID
async function getPackageById(packageId) {
  const packages = await getTokenPackages();
  return packages.find((pkg) => pkg.id === packageId);
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { packageId } = await request.json();
    const tokenPackage = await getPackageById(packageId);

    if (!tokenPackage) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: tokenPackage.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.id,
        packageId: tokenPackage.id,
        tokens: tokenPackage.tokens,
      },
    });

    // Create a pending payment record
    await db.payment.create({
      data: {
        userId: user.id,
        amount: tokenPackage.amount,
        razorpayId: order.id,
        tokensAdded: tokenPackage.tokens,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
