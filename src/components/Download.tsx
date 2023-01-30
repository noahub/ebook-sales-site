import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "./LoadingSpinner";
import { usePaymentIntentStatus } from "./usePaymentIntentStatus";

export default function Download() {
  const [data, setData] = useState<string>();

  const { status, clientSecret } = usePaymentIntentStatus();

  useEffect(() => {
    if (status === "succeeded" && clientSecret) {
      fetch("/api/get-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intentId: clientSecret.split("_secret")[0] }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          const file = window.URL.createObjectURL(blob);
          setData(file);
        })
        .catch((e) => console.log(e.message));
    }
  }, [status, clientSecret]);

  return (
    <>
      {status === "succeeded" && (
        <div>
          <h1 className="text-4xl mb-2 font-bold">Payment Success!</h1>
          <p className="mb-12 text-lg">
            Thanks for your interest. Here&apos;s a copy of the ebook:
          </p>
          <a
            href={data}
            download={"ebook.pdf"}
            id="submit"
            className="py-4 px-12 border-2 font-bold text-indigo-800 border-indigo-600 hover:bg-indigo-200 transition-all duration-200 self-center rounded-full inline-flex justify-center gap-4"
          >
            Download{" "}
            <Image
              height={24}
              width={24}
              src="/download.svg"
              alt="download icon"
            />
          </a>
        </div>
      )}
      {status === "processing" && (
        <div>
          <h1 className="text-4xl mb-4 font-bold">Processing transaction</h1>
          <LoadingSpinner />
        </div>
      )}
      {(status === "error" || status === "requires_payment_method") && (
        <div>
          <h1 className="text-4xl mb-2 font-bold">Something Went Wrong</h1>
          <p className="mb-12 text-lg">
            It looks like there was an issue with this payment. Please try
            again!
          </p>
          <Link
            href="/"
            className="py-4 px-12 border-2 font-bold text-indigo-800 border-indigo-600 hover:bg-indigo-200 transition-all duration-200 self-center rounded-full w-full mt-4"
          >
            Back to Ebook
          </Link>
        </div>
      )}
    </>
  );
}
