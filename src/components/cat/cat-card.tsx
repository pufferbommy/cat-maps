"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@nanostores/react";

import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import { $focusedCatId } from "@/store/cats";
import { Card, CardContent } from "../ui/card";

interface CatCardProps {
  cat: Cat;
  inCatPage?: boolean;
}

const CatCard = ({ cat, inCatPage }: CatCardProps) => {
  const focusedCatId = useStore($focusedCatId);
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        if (inCatPage) return;
        router.push(`/cats/${cat._id}`);
      }}
      id={`cat-${cat._id}`}
      className={cn(
        "ring-offset-2 shrink-0 rounded-lg shadow overflow-hidden relative transition-transform",
        focusedCatId === cat._id && "ring-2 ring-offset-4 ring-orange-500",
        !inCatPage && "cursor-pointer"
      )}
    >
      <CardContent>
        <div className="aspect-square relative">
          <Image
            sizes="100%"
            priority
            src={cat.imageUrl}
            alt="cat"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-gradient-to-b pointer-events-none from-black/75 via-black/0 to-transparent absolute inset-0" />
        {!inCatPage && <LikeButton cat={cat} />}
      </CardContent>
    </Card>
  );
};

export default CatCard;
