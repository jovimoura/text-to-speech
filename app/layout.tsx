import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Text to Speech AI"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <TooltipProvider>
          <body
            className={font.className}
          >
            <Toaster />
            {children}
          </body>
        </TooltipProvider>
      </html>
    </ClerkProvider>
  );
}
