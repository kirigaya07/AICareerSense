import { Suspense } from "react";

// Customizable theme loader - adjust the colors to match your theme
const ThemedLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer spinning ring with custom color */}
        <div
          className="absolute inset-0 border-4 rounded-full animate-spin"
          style={{
            borderColor: 'transparent',
            borderTopColor: '#4A83FF',    // Your exact brand color
            borderRightColor: '#783DFB',  // Your exact secondary color
            animationDuration: '1.5s'
          }}
        ></div>

        {/* Inner circle with custom gradient */}
        <div
          className="absolute inset-3 rounded-full opacity-75 animate-pulse"
          style={{
            background: 'linear-gradient(to top right, #4A83FF, #783DFB)',
            animationDuration: '2s'
          }}
        ></div>

        {/* Center dot */}
        <div className="absolute inset-[38%] bg-white rounded-full shadow-md"></div>
      </div>

      {/* Loading text with your brand color */}
      <div className="flex space-x-1 items-center text-lg font-medium">
        <span style={{ color: '#333333' }}>Loading</span>
        <span className="animate-bounce" style={{ color: '#4A83FF', animationDelay: '0s' }}>.</span>
        <span className="animate-bounce" style={{ color: '#4A83FF', animationDelay: '0.2s' }}>.</span>
        <span className="animate-bounce" style={{ color: '#4A83FF', animationDelay: '0.4s' }}>.</span>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <Suspense fallback={<ThemedLoader />}>
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
