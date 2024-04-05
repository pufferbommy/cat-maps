import dynamic from "next/dynamic";

import Header from "@/components/header";
import { Navbar } from "@/components/navbar";
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen">
      {/* <Header /> */}
      <Map />
      <Navbar />
    </main>
  );
}
