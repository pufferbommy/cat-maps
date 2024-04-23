"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import Camera from "@/components/camera";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/sidebar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});

export default function Home() {
  const { getProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <main className="h-screen flex overflow-y-hidden">
      <Sidebar />
      <Map />
      <Camera />
    </main>
  );
}
