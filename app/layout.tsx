import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google"

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
        <body
          className={font.className}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
