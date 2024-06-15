import { Toaster } from "sonner";
import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/site/navbar";
import FullLoader from "@/components/site/full-loader";

export const metadata: Metadata = {
  title: "Cat Maps",
  description:
    "A community-driven platform for cat lovers to share cat sightings",
  keywords:
    "cats, cat maps, cat tracking, cat locations, cat sightings, cat community, cat lovers, cat enthusiasts",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-lato">
        <Toaster richColors position="top-center" />
        <FullLoader />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
