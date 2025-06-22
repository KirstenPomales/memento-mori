import { useState, useEffect, useRef } from "react";
// import { ZKPassport } from "@zkpassport/sdk";
import { ZKPassport as ZKP, EU_COUNTRIES } from "@zkpassport/sdk";
import qrcode from "qrcode";

export function ZKPassport() {
  const [proofs, setProofs] = useState([]);
  const [url, setUrl] = useState("");

  // Use useRef to maintain the same instance across renders
  const zkPassportRef = useRef(null);

  // Initialize ZKPassport instance only once
  if (!zkPassportRef.current) {
    zkPassportRef.current = new ZKP();
  }

  useEffect(() => {
    const onStart = async () => {
      try {
        const queryBuilder = await zkPassportRef.current.request({
          name: "Your App Name",
          // A path to your app's logo
          logo: "https://your-domain.com/logo.png",
          // A description of the purpose of the request
          purpose:
            "Prove you are an adult from the EU but not from Scandinavia",
          // Optional scope for the user's unique identifier
          scope: "eu-adult-not-scandinavia",
        });

        const {
          url: generatedUrl,
          requestId,
          onRequestReceived,
          onGeneratingProof,
          onProofGenerated,
          onResult,
          onReject,
          onError,
        } = queryBuilder
          // Disclose the user's firstname
          .disclose("firstname")
          // Verify the user's age is greater than or equal to 18
          .gte("age", 18)
          // Verify the user's nationality is in the European Union
          // EU_COUNTRIES is a constant exported by the SDK containing all the EU countries
          .in("nationality", EU_COUNTRIES)
          // Verify the user's nationality is not from a Scandinavian country
          // Note: Norway is not an EU country
          .out("nationality", ["Sweden", "Denmark"])
          // Finalize the query
          .done();

        // Store the URL in state
        setUrl(generatedUrl);

        // Generate QR code
        const canvas = document.getElementById("canvas");
        if (canvas) {
          qrcode.toCanvas(canvas, generatedUrl);
        }

        // Set up event listeners
        onProofGenerated((proof) => {
          console.log("Proof generated:", proof);
          setProofs((prevProofs) => {
            console.log("Previous proofs:", prevProofs);
            const newProofs = [...prevProofs, proof];
            console.log("New proofs:", newProofs);
            return newProofs;
          });
        });

        onResult(({ verified, result }) => {
          console.log("Verification result:", verified);
          console.log("Current proofs:", proofs);
          console.log("Result data:", result);
          if (verified) {
            // const isOver18 = result.age.gte.result;
            // console.log("User is 18+ years old", isOver18);
          } else {
            console.log("Verification failed");
          }
        });

        // Optional: Add error handling
        onError((error) => {
          console.error("ZKPassport error:", error);
        });

        onReject(() => {
          console.log("User rejected the request");
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onStart();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">ZKPassport</h1>

      {url && (
        <div className="mb-4">
          <a
            href={url}
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify with ZKPassport
          </a>
        </div>
      )}

      <canvas id="canvas" className="mb-4"></canvas>

      {proofs.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Generated Proofs ({proofs.length})
          </h2>
          <div className="space-y-2">
            {proofs.map((proof, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-3 rounded border"
              >
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(proof, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ZKPassport;
