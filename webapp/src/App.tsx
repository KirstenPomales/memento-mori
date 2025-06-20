import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import ZKPassport from "./pages/ZKPassport";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zk" element={<ZKPassport />} />
      </Routes>
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
