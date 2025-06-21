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
      <div
        className="hidden md:block fixed left-0 top-0 h-full z-10 bg-background"
        style={{ width: "var(--mystical-border-width)" }}
      >
        <div
          className="w-full h-full flex flex-col justify-between items-center py-16 px-4"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {/* Top Image - Candle */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/candle.png"
              alt="Candle"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>

          {/* Middle Image - Bird */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/rose.png"
              alt="Bird"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>

          {/* Bottom Image - Bug */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/bug.png"
              alt="Bug"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Right Border */}
      <div
        className="hidden md:block fixed right-0 top-0 h-full z-10 bg-background"
        style={{ width: "var(--mystical-border-width)" }}
      >
        <div
          className="w-full h-full flex flex-col justify-between items-center py-16 px-4"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {/* Top Image - Flower */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/flower.png"
              alt="Flower"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>

          {/* Middle Image - Skull */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/skull.png"
              alt="Skull"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>

          {/* Bottom Image - Time */}
          <div className="w-full max-w-[120px] h-[120px] relative group">
            <img
              src="/images/time.png"
              alt="Time"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen md:ml-[var(--mystical-border-width)] md:mr-[var(--mystical-border-width)]">
        {children}
      </div>
    </div>
  );
}
