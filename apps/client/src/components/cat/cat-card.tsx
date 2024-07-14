"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import { Card, CardContent } from "../ui/card";

interface CatCardProps {
  cat: CatDto;
  inCatPage?: boolean;
}

const CatCard = ({ cat, inCatPage }: CatCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        if (inCatPage) return;
        router.push(`/cats/${cat.id}`);
      }}
      id={`cat-${cat.id}`}
      className={cn(
        "ring-offset-2 shrink-0 w-full rounded-lg max-w-[300px] md:max-w-full shadow overflow-hidden relative transition-transform",
        // focusedCatId === cat.id && "ring-2 ring-offset-4 ring-orange-500",
        !inCatPage && "cursor-pointer",
        inCatPage && "max-w-full"
      )}
    >
      <CardContent>
        <div className="aspect-square  relative">
          <Image sizes="100%" priority src={cat.imageUrl} alt="cat" fill />
        </div>
        <div className="bg-gradient-to-b pointer-events-none from-black/75 via-black/0 to-transparent absolute inset-0" />
        {!inCatPage && <LikeButton cat={cat} />}
      </CardContent>
    </Card>
  );
};

export default CatCard;
