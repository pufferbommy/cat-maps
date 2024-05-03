"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/navbar";
import { useCats } from "@/hooks/useCats";
import { Sidebar } from "@/components/sidebar";
import { useProfile } from "@/hooks/useProfile";
import FullLoader from "@/components/full-loader";
import { setIsLoadingProfile } from "@/store/profile";
import CameraButton from "@/components/camera-button";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});

export default function Home() {
  const { getCats } = useCats();
  const { getProfile } = useProfile();

  useEffect(() => {
    const abortController = new AbortController();

    getCats(abortController.signal);

    return () => abortController.abort();
  }, [getCats]);

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
