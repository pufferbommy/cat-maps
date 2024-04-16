import dynamic from "next/dynamic";

import { Sidebar } from "@/components/sidebar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="p-4">Loading...</div>,
});
import Camera from "@/components/camera";

export default function Home() {
  return (
    <main className="h-screen flex overflow-y-hidden">
      <Sidebar />
      <Map />
      <Camera />
    </main>
  );
}
