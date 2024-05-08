import { Sidebar } from "@/components/site/sidebar";
import CameraButton from "@/components/site/camera-button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row h-[calc(100dvh-77px)]">
      <Sidebar />
      <div className="h-1/2 sm:h-full w-full">{children}</div>
      <CameraButton />
    </div>
  );
}
