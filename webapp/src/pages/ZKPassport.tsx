import { useState, useEffect } from "react";
// import { ZKPassport } from "@zkpassport/sdk";
import { ZKPassport as ZKP, EU_COUNTRIES } from "@zkpassport/sdk";
import qrcode from "qrcode";

export function ZKPassport() {
  const zkPassport = new ZKP();

  let queryBuilder;
  useEffect(() => {
    const onStart = async () => {
      try {
        queryBuilder = await zkPassport.request({
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
          url,
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

        qrcode.toCanvas(document.getElementById("canvas"), url);

        onResult(({ verified, result }) => {
          console.log(verified);
          console.log(result);
          if (verified) {
            // const isOver18 = result.age.gte.result;
            // console.log("User is 18+ years old", isOver18);
          } else {
            console.log("Verification failed");
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onStart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      ZKPassport
      <a href="{url}">Verify with ZKPassport</a>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default ZKPassport;
