import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="h-screen">
      <Map />
      <Navbar />
    </main>
  );
}
