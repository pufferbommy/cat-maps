"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { getCats } from "@/services/cats";
import Navbar from "@/components/site/navbar";
import { useProfile } from "@/hooks/useProfile";
import { Sidebar } from "@/components/site/sidebar";
import { setIsLoadingProfile } from "@/store/profile";
import FullLoader from "@/components/site/full-loader";
import CameraButton from "@/components/site/camera-button";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});

export default function Home() {
  const { getProfile } = useProfile();

  useEffect(() => {
    const abortController = new AbortController();

    getCats(abortController.signal);

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const hasAccessToken = Boolean(localStorage.getItem("accessToken"));
    if (hasAccessToken) {
      const abortController = new AbortController();

      getProfile(abortController.signal);

      return () => abortController.abort();
    } else {
      setIsLoadingProfile(false);
    }
  }, [getProfile]);

  return (
    <main className="h-dvh flex overflow-y-hidden">
      <FullLoader />
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Map />
      </div>
      <CameraButton />
    </main>
  );
}
