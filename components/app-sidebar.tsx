import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { AudioLines, Mic, MicVocal } from "lucide-react";
import { UserAccount } from "./user-account";

const routes = [
  {
    title: "Text to Speech",
    icon: Mic,
    url: "/app/text-to-speech",
    isBeta: false,
  },
  {
    title: "Voices",
    icon: MicVocal,
    url: "/app/voices",
    isBeta: true,
  },
  {
    title: "Sound Effects",
    icon: AudioLines,
    url: "/app/sound-effects",
    isBeta: true,
  },
];

export async function AppSidebar() {
  const user = await currentUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <span className="text-lg font-bold text-black">Text to Spech AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CREATE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton asChild>
                    <a aria-disabled={route.isBeta} href={route.url}>
                      <route.icon />
                      <span>{route.title}</span>
                      {route.isBeta && (
                        <span className="inline-flex items-center rounded-full border-transparent px-2 py-0.5 font-medium transition-colors whitespace-nowrap bg-gray-200 text-black text-xs">
                          Beta
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>{/* <FreeCounter /> */}</SidebarMenuItem>
          <SidebarMenuItem>
            {user && (
              <UserAccount
                user={{
                  avatar: user?.imageUrl,
                  email: user?.emailAddresses[0].emailAddress,
                  name: user?.firstName
                    ? `${user.firstName} ${user.lastName && user.lastName}`
                    : "",
                }}
              />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
