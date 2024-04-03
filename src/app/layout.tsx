import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Maps",
  description:
    "Cat Maps is a fun and interactive app that allows users to capture and map the locations of cats they encounter. Explore the world through the lens of our feline friends!",
  keywords:
    "cat mapping, cat locator, feline tracking, interactive cat app, cat sighting, cat encounter, pet mapping, feline location, feline finder, cat spotting, cat tracker, cat explorer, cat discovery, cat adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
