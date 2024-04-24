"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import * as authService from "@/services/auth";
import { Sidebar } from "@/components/sidebar";
import CameraButton from "@/components/camera-button";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});
import { usePreviewCats } from "@/hooks/usePreviewCats";
import { setIsLoadingProfile, setProfile } from "@/store/profile";
import { setIsLoadingPreviewCats, setPreviewCats } from "@/store/preview-cats";

export default function Home() {
  const { previewCats, isLoadingPreviewCats } = usePreviewCats();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setIsLoadingProfile(true);
        const data = await authService.getProfile(abortController.signal);
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProfile(false);
      }
    })();

    return () => abortController.abort();
  }, []);

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
