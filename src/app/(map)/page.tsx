"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { getCats } from "@/services/cats";
import { setFullLoader } from "@/store/full-loader";
import { Skeleton } from "@/components/ui/skeleton";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Home() {
  useEffect(() => {
    const getCatsAbortController = new AbortController();

    (async () => {
      setFullLoader(true);
      await getCats(getCatsAbortController.signal);
      setFullLoader(false);
    })();

    return () => {
      getCatsAbortController.abort();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Map />
    </div>
  );
}
