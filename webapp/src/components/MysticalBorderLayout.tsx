import { useEffect, useState } from "react";

interface MysticalBorderLayoutProps {
  children: React.ReactNode;
}

export default function MysticalBorderLayout({
  children,
}: MysticalBorderLayoutProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Left Border */}
      <div className="hidden md:block fixed left-0 top-0 w-[200px] h-full z-10 bg-background">
        <div
          className="w-full h-full flex items-center justify-center p-4"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="w-full h-full max-w-[180px] max-h-[600px] relative group">
            {/* Placeholder for left border image */}
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">☠️</div>
                  <div className="text-xs font-medium">Left Border</div>
                  <div className="text-xs opacity-60">Image Placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Border */}
      <div className="hidden md:block fixed right-0 top-0 w-[200px] h-full z-10 bg-background">
        <div
          className="w-full h-full flex items-center justify-center p-4"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="w-full h-full max-w-[180px] max-h-[600px] relative group">
            {/* Placeholder for right border image */}
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">🦅</div>
                  <div className="text-xs font-medium">Right Border</div>
                  <div className="text-xs opacity-60">Image Placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-[200px] md:mr-[200px] min-h-screen">{children}</div>
    </div>
  );
}
