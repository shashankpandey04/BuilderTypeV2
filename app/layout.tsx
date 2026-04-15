import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SidebarLayout } from "@/components/SidebarLayout";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuilderType",
  description: "A 45-second typing game in just 1 hour using Kiro featuring a real-time typing speed test, live leaderboard, and top 10 player highlights, all wrapped in an AWS Builder Center inspired theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}