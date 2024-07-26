"use client";

import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { queryClient } from "@/lib/react-query";
import { ActiveCatContextProvider } from "@/contexts/active-cat-context";

// components
import Header from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/layout/sidebar";
import CameraButton from "@/components/camera-button";
import { ThemeProvider } from "@/components/theme-provider";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-none" />,
});

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-lato h-screen">
        <ThemeProvider attribute="class">
          <QueryClientProvider client={queryClient}>
            <ActiveCatContextProvider>
              <Toaster richColors position="top-center" />
              <Header />
              <main className="flex h-[calc(100%-77px)]">
                <Sidebar />
                <Map />
              </main>
              <CameraButton />
            </ActiveCatContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
