import Razorpay from "razorpay";

// Initialize Razorpay with your key ID and secret
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Token package options
export const TOKEN_PACKAGES = [
  { id: "basic", tokens: 10000, amount: 499, description: "Basic Package" },
  {
    id: "standard",
    tokens: 25000,
    amount: 999,
    description: "Standard Package",
  },
  {
    id: "premium",
    tokens: 50000,
    amount: 1799,
    description: "Premium Package",
  },
];

// Get package details by ID
export function getPackageById(packageId) {
  return TOKEN_PACKAGES.find((pkg) => pkg.id === packageId);
}
