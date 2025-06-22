import Component from "../components/multi-step-form";
import Header from "../components/Header";

export function Config() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Component />
      </div>
    </div>
  );
}

export default Config;
