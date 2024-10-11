import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import NotificationComponent from "@/components/commons/Notification";
import { Next13NProgress, Link } from "nextjs13-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickCv - A simple AI CV builder",
  description: "Generated your next ATS friendly CV with QuickCv",
  openGraph: {
    title: "QuickCv - A simple AI CV builder",
    description: "Generated your next ATS friendly CV with QuickCv",
    type: "website",
    url: "https://quickcv.me",
    siteName: 'QuickCv - A simple AI CV builder',
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
      <body className={inter.className}>
        {/* light green */}
        <Next13NProgress color="#10B981" height={5} />
        <header className="w-full shadow-md flex items-center justify-between px-4 py-6">
          <h1 className="text-lg font-semibold">
            <Link href="/">QuickCv</Link>
            {/* a credit with link to my github something that is small and say by codad5 then with link to my portfolio codad5.me */}
            <span className="text-sm ml-2">
              by{" "}
              <a
                href="https://github.com/codad5"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
              >
                codad5
              </a>
              {" | "}
              <a
                href="https://codad5.me"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
              >
                codad5.me
              </a>
            </span>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <NotificationComponent />
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
