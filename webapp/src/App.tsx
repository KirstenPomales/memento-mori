import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ZKPassport from "./pages/ZKPassport";
import Config from "./pages/Config";
import FunderTrusts from "./pages/FunderTrusts";
import BeneficiaryTrusts from "./pages/BeneficiaryTrusts";
import TrustDetail from "./pages/TrustDetail";
import MysticalBorderLayout from "./components/MysticalBorderLayout";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col">
      <MysticalBorderLayout>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zk" element={<ZKPassport />} />
            <Route path="/config" element={<Config />} />
            <Route path="/fundertrusts" element={<FunderTrusts />} />
            <Route path="/beneficiarytrusts" element={<BeneficiaryTrusts />} />
            <Route path="/trust/:trustId" element={<TrustDetail />} />
          </Routes>
        </div>
        <Footer />
      </MysticalBorderLayout>
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
