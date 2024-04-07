import dynamic from "next/dynamic";

import { Navbar } from "@/components/navbar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen">
      <Map />
      <Navbar />
    </main>
  );
}
