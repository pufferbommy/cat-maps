import { Toaster } from "sonner";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CatMaps: Explore the World Through Feline Eyes",
  description:
    "CatMaps is a revolutionary app that allows users to map and share the locations of feline friends they encounter. Discover the secret lives of cats, contribute to a global cat-tracking community, and embark on a journey of feline adventure.",
  keywords:
    "cat mapping, cat locator, feline tracking, interactive cat app, cat sighting, cat encounter, pet mapping, feline location, feline finder, cat spotting, cat tracker, cat explorer, cat discovery, cat adventure, global cat community, feline exploration, cat enthusiasts, pet lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-lato">
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
