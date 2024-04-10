import dynamic from "next/dynamic";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen overflow-y-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Map />
      </div>
      <Navbar />
    </main>
  );
}
