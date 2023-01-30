import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export type Status =
  | "canceled"
  | "processing"
  | "requires_action"
  | "requires_capture"
  | "requires_confirmation"
  | "requires_payment_method"
  | "succeeded"
  | "error";

export const usePaymentIntentStatus = () => {
  const stripe = useStripe();

  const [status, setStatus] = useState<Status | null>("processing");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecretParam = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    setClientSecret(clientSecretParam);

    if (!clientSecretParam) {
      setStatus("error");
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecretParam)
      .then(({ paymentIntent }) => setStatus(paymentIntent?.status || null))
      .catch((e) => {
        setStatus("error");
        console.log({ e });
      });
  }, [stripe]);

  return { status, clientSecret };
};
