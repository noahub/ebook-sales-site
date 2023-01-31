import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { FormEventHandler, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_RETURN_DOMAIN}${process.env.NEXT_PUBLIC_RETURN_PATH}`,
        receipt_email: email,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setHint(error.message || null);
    } else {
      setHint("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="py-4 px-12 border-2 font-bold text-indigo-800 border-indigo-600 hover:bg-indigo-200 transition-all duration-200 self-center rounded-full w-full mt-4"
      >
        <span id="button-text" className="font-bold inline-flex justify-center">
          {isLoading ? <LoadingSpinner /> : "Pay now"}
        </span>
      </button>
      <span className="text-sm text-gray-400 flex gap-2 justify-center my-2">
        <Image alt="lock icon" src="/lock.svg" width={15} height={15} />
        Payments are secure and encrypted
      </span>
      {hint && (
        <div
          id="payment-message"
          className="text-sm text-gray-700 self-center mt-4"
        >
          {hint}
        </div>
      )}
    </form>
  );
}
