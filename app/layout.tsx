import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickCv - A simple AI CV builder",
  description: "Generated your next ATS friendly CV with QuickCv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full shadow-md flex items-center justify-between px-4 py-6">
         <h1 className="text-lg font-semibold">
          QuickCv
          {/* a credit with link to my github something that is small and say by codad5 then with link to my portfolio codad5.me */}
          <span className="text-sm ml-2">
            by <a href="https://github.com/codad5" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">codad5</a>
            {" | "}
            <a href="https://codad5.me" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">codad5.me</a>
          </span>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
        {children}
        <Analytics  />
      </body>
    </html>
  );
}
