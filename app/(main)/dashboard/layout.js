import { Suspense } from "react";
import DashboardLoader from "./_components/dashboard-loader";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insight</h1>
      </div>
      <Suspense fallback={<DashboardLoader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
