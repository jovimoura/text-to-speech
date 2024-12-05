"use server";

import { PLANS } from "@/config/stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Client, Storage } from "appwrite";

const envprice =
  process.env.NODE_ENV === "production"
    ? PLANS.find((plan) => plan.slug === "pro")?.price.priceIds.production
    : PLANS.find((plan) => plan.slug === "pro")?.price.priceIds.production;

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
  .setProject(process.env.APPWRITE_PROJECT as string);

export async function getHistoryFiles(clerkId: string) {
  const historyFiles = await prisma.audio.findMany({
    where: {
      clerkId,
    },
  });
  return historyFiles;
}

export async function handleDownloadAudioFile(fileId: string) {
  const storage = new Storage(client);

  const result = storage.getFileDownload(
    process.env.APPWRITE_STORAGE as string,
    fileId
  );

  return result;
}

export async function createStripeSession() {
  const { userId: clerkId } = await auth();
  const user = await currentUser();

  const billingUrl = absoluteUrl("/app/billing");
  const successBillingUrl = absoluteUrl("/app/billing?success=true");

  if (!clerkId || !user) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const userSubscription = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: billingUrl,
    });
    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: successBillingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price: envprice,
        quantity: 1,
      },
    ],
    metadata: {
      userId: clerkId,
    },
  });

  return { url: stripeSession.url };
}