import Component from "../components/multi-step-form";
import Header from "../components/Header";

export function Config() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header showCreateTrustButton={false} />
        <Component />
      </div>
    </div>
  );
}

export default Config;
