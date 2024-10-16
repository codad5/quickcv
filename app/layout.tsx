import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import NotificationComponent from "@/components/commons/Notification";
import Header from "@/components/commons/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickCv - A simple AI CV builder",
  description: "Generated your next ATS friendly CV with QuickCv",
  openGraph: {
    title: "QuickCv - A simple AI CV builder",
    description: "Generated your next ATS friendly CV with QuickCv",
    type: "website",
    url: "https://quickcv.me",
    siteName: "QuickCv - A simple AI CV builder",
    images: [
      {
        url: "https://quickcv.me/quickcv-banner.png",
        width: 1500,
        height: 500,
        alt: "QuickCv - A simple AI CV builder",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-dvw bg-deep-blue text-light-gray h-dvh flex flex-col relative overflow-x-hidden md:overflow-x-visible`}
      >
        <Header />
        <main className="w-full flex-grow grid place-items-center px-10">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
