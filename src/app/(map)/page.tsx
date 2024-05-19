"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { setCats } from "@/store/cats";
import { getCats } from "@/services/cats";
import { setFullLoader } from "@/store/full-loader";
import { Skeleton } from "@/components/ui/skeleton";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Home() {
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setFullLoader(true);
        const cats = await getCats(abortController.signal);
        setCats(cats || []);
      } catch (error) {
        console.error(error);
      } finally {
        setFullLoader(false);
      }
    })();

    return () => abortController.abort();
  }, []);

  return (
    <div className="w-full h-full">
      <Map />
    </div>
  );
}
