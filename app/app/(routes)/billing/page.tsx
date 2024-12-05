import { getUserSubscriptionPlan } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"
import { BillingForm } from "./_components/billing-form"

export default async function Page() {
  const { userId } = await auth()
  const subscriptionPlan = await getUserSubscriptionPlan(userId!)

  return <BillingForm subscriptionPlan={subscriptionPlan} />
}