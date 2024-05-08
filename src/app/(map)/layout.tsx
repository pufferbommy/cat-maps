import { Sidebar } from "@/components/site/sidebar";
import CameraButton from "@/components/site/camera-button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-[calc(100dvh-77px)]">
      <Sidebar />
      <div className="h-full w-full">{children}</div>
      <CameraButton />
    </div>
  );
}
