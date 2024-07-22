"use client";

import Image from "next/image";
import { useContext } from "react";

import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import { Card, CardContent } from "../ui/card";
import { ActiveCatContext } from "@/contexts/active-cat-context";

interface CatCardProps {
  cat: Cat;
}

const CatCard = ({ cat }: CatCardProps) => {
  const activeCatContext = useContext(ActiveCatContext);

  const isActiveCat = activeCatContext?.id === cat.id;

  return (
    <Card
      id={`cat-${cat.id}`}
      className={cn(
        "w-full ring-offset-4 ring-offset-primary-foreground ring-primary aspect-square overflow-hidden relative transition-shadow",
        isActiveCat && "ring-2"
      )}
    >
      <CardContent className="relative">
        <Image src={cat.image} alt="cat" width={500} height={500} />
        <div className="bg-gradient-to-b pointer-events-none from-black/75 via-black/0 to-transparent absolute inset-0" />
        <LikeButton cat={cat} />
      </CardContent>
    </Card>
  );
};

export default CatCard;
