"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { Sidebar } from "@/components/sidebar";
import FullLoader from "@/components/full-loader";
import CameraButton from "@/components/camera-button";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});
import { useCats } from "@/hooks/useCats";
import { useProfile } from "@/hooks/useProfile";
import { setIsLoadingProfile } from "@/store/profile";

export default function Home() {
  useCats();
  const { getProfile } = useProfile();

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
    <main className="h-screen flex overflow-y-hidden">
      <Sidebar />
      <Map />
      <CameraButton />
      <FullLoader />
    </main>
  );
}
