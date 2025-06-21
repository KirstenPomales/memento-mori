import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleCreateTrustClick = () => {
    navigate("/config");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header showCreateTrustButton={false} />

        {/* Centered Create Trust Button */}
        <div className="flex justify-center items-center min-h-[60vh]">
          <button
            onClick={handleCreateTrustClick}
            className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Create a Trust
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
