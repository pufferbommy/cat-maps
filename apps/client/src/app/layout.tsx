"use client";

import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import Navbar from "@/components/site/navbar";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-lato">
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="top-center" />
          <Navbar />
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
