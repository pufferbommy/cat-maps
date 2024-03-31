import Map from "@/components/map";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <main className="h-screen">
      <Map />
      <Navbar />
    </main>
  );
}
