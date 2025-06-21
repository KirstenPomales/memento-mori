import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-background border-t border-border">
      <div className="flex justify-center items-center space-x-2 px-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="w-6 h-6 relative group">
            <img
              src="/images/walnut.png"
              alt="Walnut"
              className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </footer>
  );
}
