import BeneficiaryTrustList from "../components/BeneficiaryTrustList";
import Header from "../components/Header";

export function BeneficiaryTrusts() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header showCreateTrustButton={false} />
        <BeneficiaryTrustList />
      </div>
    </div>
  );
}

export default BeneficiaryTrusts;
