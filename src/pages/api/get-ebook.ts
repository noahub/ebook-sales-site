import { createReadStream, existsSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refUrl = new URL(req.headers.referer || "");

  if (
    req.method !== "POST" ||
    !(process.env.NEXT_PUBLIC_RETURN_DOMAIN || "").includes(refUrl.host)
  ) {
    res.status(400).json({ message: "Not allowed" });
    return;
  }

  const { intentId } = req.body;

  if (!intentId) {
    res.status(401).json({ message: "Access denied!" });
    return;
  }

  let status;

  try {
    const intent = await stripe.paymentIntents.retrieve(intentId);
    status = intent.status;
  } catch (e) {
    console.log("Error fetching payment intent");
  }

  if (status !== "succeeded") {
    res.status(404).json({ message: "Not found" });
    return;
  }

  try {
    const ebookDir = path.join(process.cwd(), "ebooks");
    const filePath = path.join(ebookDir, "sample-ebook.pdf");

    if (!existsSync(filePath)) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=sample-ebook.pdf`
    );

    createReadStream(filePath).pipe(res);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
