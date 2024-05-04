"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { getCats } from "@/services/cats";
import { getProfile } from "@/services/auth";
import Navbar from "@/components/site/navbar";
import { Sidebar } from "@/components/site/sidebar";
import FullLoader from "@/components/site/full-loader";
import CameraButton from "@/components/site/camera-button";
import { setFullLoader } from "@/store/full-loader";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});

export default function Home() {
  useEffect(() => {
    const getCatsAbortController = new AbortController();
    const getProfileAbortController = new AbortController();

    (async () => {
      setFullLoader(true);
      await Promise.all([
        getProfile(getProfileAbortController.signal),
        getCats(getCatsAbortController.signal),
      ]);
      setFullLoader(false);
    })();

    return () => {
      getProfileAbortController.abort();
      getCatsAbortController.abort();
    };
  }, []);

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
