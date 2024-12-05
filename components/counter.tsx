'use client'

import { Sparkles } from "lucide-react";
import { CreditsRemaining } from "./credits-remaining";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createStripeSession } from "@/app/app/actions";

interface Props {
  isPremium: boolean;
  apiLimitCount: number
  maxLimitCount: number
}

export function Counter({ isPremium = false, apiLimitCount = 0, maxLimitCount }: Props) {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
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
    setMounted(true)
  }, [])
  return (
    <div>
      <Card className="bg-white/10 border-0 shadow-none p-0">
        <CardContent className="px-4">
          <div className="text-center text-sm mb-4 space-y-2">
            <CreditsRemaining credits={maxLimitCount - apiLimitCount} maxCredits={maxLimitCount} />
          </div>

          {!isPremium && <Button disabled={isLoading} onClick={e => {
            e.preventDefault()
            handleCreateStripeSession()
          }}
            className="w-full"
          >
            <Sparkles />  
            Upgrade to Pro
          </Button>}
        </CardContent>
      </Card>
    </div>
  )
}