import TrustList from "../components/TrustList";
import Header from "../components/Header";

export function FunderTrusts() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <TrustList />
      </div>
    </div>
  );
}

export default FunderTrusts;
