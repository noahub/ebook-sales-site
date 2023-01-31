import CheckoutForm from "@/components/Checkout";

import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Home() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent on mount
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: "ebook" }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <Layout className="flex flex-col gap-8 bg-white relative min-h-screen">
      <section className="flex flex-col justify-center w-full p-12 lg:px-24 lg:py-12">
        <div className="">
          <h1 className="text-8xl mb-4">
            Your{" "}
            <span className="bg-heading-gradient text-transparent bg-clip-text font-bold">
              Ebook
            </span>{" "}
            Landing Page
          </h1>
          <p className="text-xl">
            A compelling description of your ebook to persuade leads and make
            sales!
          </p>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row justify-center w-full">
        <div className="basis-1/2 flex justify-center">
          <div className="bg-white border border-gray-100 p-12 py-8 shadow-xl min-w-[350px] min-h-[350px] h-fit transition-all duration-200">
            <div className="mb-4">
              <h2 className="text-xl">Get Ebook for</h2>
              <span className="text-4xl font-bold">$19.99</span>
            </div>
            {clientSecret ? (
              <Elements
                options={{ clientSecret, appearance: { theme: "stripe" } }}
                stripe={stripePromise}
              >
                <CheckoutForm />
              </Elements>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        <div className="relative w-full basis-1/2">
          <Image
            src="/ebook.png"
            alt="ebook"
            height={800}
            width={800}
            className="w-full"
          />
        </div>
      </section>
    </Layout>
  );
}
