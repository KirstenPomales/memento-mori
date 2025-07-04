import BeneficiaryTrustList from "../components/BeneficiaryTrustList";
import Header from "../components/Header";

export function BeneficiaryTrusts() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <BeneficiaryTrustList />
      </div>
    </div>
  );
}

export default BeneficiaryTrusts;
