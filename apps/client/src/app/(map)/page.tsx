"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Home() {
  return (
    <div className="w-full h-full">
      <Map />
    </div>
  );
}
