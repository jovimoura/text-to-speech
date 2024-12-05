'use client'

import { ChevronDown, CreditCard, LogOut, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { useClerk } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createStripeSession } from "@/app/app/actions";
import { useRouter } from "next/navigation";

interface Props {
  isPremium: boolean
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function UserAccount({ user, isPremium }: Props) {
  const { isMobile } = useSidebar()
  const { signOut } = useClerk()

  const router = useRouter()

  const { toast } = useToast()
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
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
            <SidebarMenuButton size='lg' className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent 
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {!isPremium ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push('/app/pricing')}
                  >
                    <Sparkles />
                    Upgrade to pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => router.push('/app/billing')}
                    >
                       <CreditCard />
                       Billing
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              
            )}
            <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/' })}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}