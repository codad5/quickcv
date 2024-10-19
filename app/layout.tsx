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
        className={`${inter.className} w-dvw bg-deep-blue text-light-gray h-max flex flex-col relative overflow-x-clip md:overflow-x-clip`}
      >
        <Header />
        <main className="w-full h-max max-w-vw flex-grow grid place-items-center px-3  md:px-10 overflow-x-auto">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
