"use client";

import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import Header from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { ActiveCatContextProvider } from "@/contexts/active-cat-context";
import CameraButton from "@/components/layout/header/components/camera-button";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-none" />,
});

export const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="font-lato h-screen flex flex-col">
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
      </body>
    </html>
  );
}
