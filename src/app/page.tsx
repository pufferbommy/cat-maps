"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/sidebar";
import CameraButton from "@/components/camera-button";
import { setIsLoadingPreviewCats, setPreviewCats } from "@/store/preview-cats";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});
import { usePreviewCats } from "@/hooks/usePreviewCats";

export default function Home() {
  const { getProfile } = useAuth();
  const { previewCats, isLoadingPreviewCats } = usePreviewCats();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    setPreviewCats(previewCats);
  }, [previewCats]);

  useEffect(() => {
    setIsLoadingPreviewCats(isLoadingPreviewCats);
  }, [isLoadingPreviewCats]);

  return (
    <main className="h-screen flex overflow-y-hidden">
      <Sidebar />
      <Map />
      <CameraButton />
    </main>
  );
}
