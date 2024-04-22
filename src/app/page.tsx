"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { Sidebar } from "@/components/sidebar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});
import Camera from "@/components/camera";
import { clearProfile, setIsLoading, setProfile } from "@/store/profile";

export default function Home() {
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const result: BaseResponse<Profile> = await response.json();
        if (!result.success) throw new Error(result.message);
        setProfile(result.data!);
      } catch (error) {
        if (error instanceof Error && "jwt expired" === error.message) {
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            body: JSON.stringify({
              refreshToken: localStorage.getItem("refreshToken"),
            }),
          });
          const result = await response.json();
          if (!result.success) {
            clearProfile();
            return;
          }
          localStorage.setItem("accessToken", result.data!.accessToken);
          localStorage.setItem("refreshToken", result.data!.refreshToken);
          getProfile();
        }
        clearProfile();
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  return (
    <main className="h-screen flex overflow-y-hidden">
      <Sidebar />
      <Map />
      <Camera />
    </main>
  );
}
