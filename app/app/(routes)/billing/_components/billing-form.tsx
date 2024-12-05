'use client'

import { createStripeSession } from "@/app/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useToast } from "@/hooks/use-toast";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from 'date-fns'

interface Props { subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>> }

export function BillingForm({ subscriptionPlan }: Props) {
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('sucess')

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateStripeSession = async () => {
    setIsLoading(true)
    const { url, error } = await createStripeSession()

    if (error) {
      toast({
        title: 'Error in upgrade button',
        description: "Please try again",
        variant: "destructive"
      })
      setIsLoading(false)
    }
    setIsLoading(false)
    window.location.href = url ?? "/app/billing"
  }

  useEffect(() => {
    if (params === "true") {
      router.refresh()
      toast({
        title: "Congrats!",
        description: "Enjoy the most of TextToSpeechAI"
      })
    }
  }, [])

  return(
    <MaxWidthWrapper>
      <form className="mt-12" onSubmit={e => {
        e.preventDefault()
        handleCreateStripeSession()
      }}>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the plan:{" "}
              <strong>{subscriptionPlan.name}</strong>
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-coll items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
            <Button type="submit">
              {isLoading ? (
                <Loader2 className="size-4 mr-4 animate-spin" />
              ) : null}
              {subscriptionPlan.isSubscribed ? "Manage Subscription" : "Upgrade to Pro"}
            </Button>

            {subscriptionPlan.isSubscribed && (
              <p className="rounded-full text-xs font-medium">
                {subscriptionPlan.isCanceled ? "Your plan will be cancelled on" : "Your plan renews on "}
                {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yy")}
              </p>
            )}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  )
}