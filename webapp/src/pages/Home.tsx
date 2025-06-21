import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleCreateTrustClick = () => {
    navigate("/config");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Header />

        {/* Centered Create Trust Button */}
        <div className="flex justify-center items-center min-h-[60vh]">
          <button
            onClick={handleCreateTrustClick}
            className="px-8 py-4 bg-primary text-primary-foreground text-xl font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Create a Trust
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
