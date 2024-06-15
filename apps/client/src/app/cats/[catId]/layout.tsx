import Link from "next/link";
import { ChevronLeft, Share } from "lucide-react";

import { env } from "@/env";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  params: { catId: string };
}

async function getCat(catId: string) {
  const response = await fetch(`${env.URL}/api/cats/${catId}`, {
    cache: "no-store",
  });
  const result: BaseResponse<Cat> = await response.json();
  return result.data!;
}

export default async function Layout({ children, params }: LayoutProps) {
  const catId = params.catId;

  if (!catId) {
    return <div className="py-4">Cat not found</div>;
  }

  const cat = await getCat(catId);

  if (!cat) {
    return <div className="py-4">Cat not found</div>;
  }

  return (
    <div className="container py-4">
      <div className="flex gap-2 justify-between">
        <Link href="/">
          <Button variant="secondary" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <Share className="w-4 h-4" />
          Share
        </Button>
      </div>
      {children}
    </div>
  );
}
