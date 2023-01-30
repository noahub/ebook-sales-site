import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
  typescript: true,
});

const prices = { ebook: Number(process.env.NEXT_PUBLIC_EBOOK_PRICE) };

const calculateOrderAmount = (item: string) => {
  return prices[item as keyof typeof prices];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { item } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(item),
    currency: process.env.NEXT_PUBLIC_CURRENCY || "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
