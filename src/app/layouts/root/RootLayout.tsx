import type { Metadata } from "next";
import React from "react";
import { Geist } from "next/font/google";

import "@app/styles/globals.css";

import { geistSans, geistMono } from "@shared/config/fonts";
import { cn } from "@shared/lib/utils";
import { QueryProvider } from "@app/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Book Tracker",
    template: "%s | Book Tracker",
  },
  description: "Track your books",
  icons: {
    icon: "/book.svg",
  },
};

type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Props) {
  return (
    <html
      lang="ru"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        "dark",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
