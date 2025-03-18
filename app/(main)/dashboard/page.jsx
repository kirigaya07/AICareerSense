import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";
import { Suspense } from "react";
import DashboardLoader from "./_components/dashboard-loader";
import DelayedLoader from "@/components/delayed-loader";

// Separate content component that fetches data
const DashboardContent = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

const IndustryInsight = () => {
  return (
    <DelayedLoader delay={5000} fallback={<DashboardLoader />}>
      <DashboardContent />
    </DelayedLoader>
  );
};

export default IndustryInsight;
