import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { SplashCursor } from "@/components/ui/splash-cursor";
import logoImage from "/images/logo.png";
import mementoMoriImage from "/images/memento-header.png";
import zkPassportImage from "/images/zk-passport.png";
import hyliImage from "/images/hyli.png";
import aztecImage from "/images/aztec.png";

export function Home() {
  const navigate = useNavigate();

  const handleCreateTrustClick = () => {
    navigate("/config");
  };

  return (
    <div className="min-h-screen bg-background">
      <SplashCursor />
      <div className="container mx-auto px-4 py-8">
        <Header />

        {/* Centered Content */}
        <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-8">
          {/* Memento Mori Image */}
          <h1 className="text-6xl md:text-8xl mb-5 font-bold text-center text-foreground">
            You Will Die
          </h1>
          <img
            src={mementoMoriImage}
            alt="Memento Mori"
            className="w-full max-w-3xl h-auto mb-8"
          />

          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            Death is inevitable.
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            When you are gone, what will happen to your crypto wealth?
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            Will it be confiscated by the government?
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            Will it go to your loved ones?
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            Will it be lost forever?
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            We need a decentralized, privacy-preserving way to pass on our
            crypto.
          </p>
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Memento Mori Logo"
              className="h-12 w-auto"
            />
            <h2 className="text-5xl md:text-5xl font-bold text-center text-foreground">
              Memento Mori
            </h2>
          </div>

          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl">
            Memento Mori is a trust management system that allows you to create
            on-chain verafiable trusts that help your wealth go to the people
            you want it to.
          </p>

          <button
            onClick={handleCreateTrustClick}
            className="px-8 py-4 bg-primary text-primary-foreground text-xl font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Create a Trust
          </button>

          {/* Crafted With Devotion Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Crafted With Devotion Using...
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* ZK Passport */}
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={zkPassportImage}
                  alt="ZK Passport"
                  className="h-16 w-auto"
                />
                <p className="text-sm text-muted-foreground max-w-48 text-center">
                  Zero-knowledge proofs for privacy-preserving identity
                  verification. Ensures your trust beneficiaries can securley
                  access funds.
                </p>
              </div>

              {/* Hyli 1 */}
              <div className="flex flex-col items-center space-y-3">
                <img src={hyliImage} alt="Hyli" className="h-16 w-auto" />
                <p className="text-sm text-muted-foreground max-w-48 text-center">
                  ZK proofs on Hyli for name and secret password verification.
                  Provides reliable and tamper-proof trust claiming on-chain.
                </p>
              </div>

              {/* Hyli 2 */}
              <div className="flex flex-col items-center space-y-3">
                <img src={aztecImage} alt="Aztec" className="h-16 w-auto" />
                <p className="text-sm text-muted-foreground max-w-48 text-center">
                  Trustless management of funds inside each trust, and releases
                  to benefactors based on verified triggers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
