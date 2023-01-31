import Download from "@/components/Download";
import { Layout } from "@/components/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Complete() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setClientSecret(clientSecret || "");
  }, []);

  return (
    <Layout>
      <section className="flex lg:flex-row flex-col items-center w-full justify-center">
        <div className="basis-1/2 flex flex-col justify-center items-center self-center lg:py-0 py-12">
          {clientSecret ? (
            <Elements
              options={{ clientSecret, appearance: { theme: "stripe" } }}
              stripe={stripePromise}
            >
              <Download />
            </Elements>
          ) : (
            <div>
              <h1 className="text-4xl mb-2 font-bold">Something went wrong</h1>
              <p className="mb-12 text-lg">
                We could not process your transaction. Please try again!
              </p>
              <Link
                href={"/"}
                className="py-4 px-12 border-2 font-bold text-indigo-800 border-indigo-600 hover:bg-indigo-200 transition-all duration-200 self-center rounded-full w-full mt-4"
              >
                Back to Ebook
              </Link>
            </div>
          )}
        </div>
        <Image
          className="basis-1/2"
          src={"/ebook.png"}
          priority
          height={300}
          width={600}
          alt="ebook"
        />
      </section>
    </Layout>
  );
}
