"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { Heart } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Skeleton } from "./ui/skeleton";
import { $profile } from "@/store/profile";
import * as catsService from "@/services/cats";
import { Card, CardContent } from "@/components/ui/card";
import { $isLoadingCats, $cats, updateLike } from "@/store/cats";

const Sidebar = () => {
  const profile = useStore($profile);

  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  const toggleLike = async (liked: boolean, catId: string) => {
    if (!profile) {
      alert("Please log in first");
      return;
    }
    const newLiked = !liked;
    updateLike(catId, newLiked);
    await catsService.toggleLike(catId);
  };

  return (
    <div className="max-w-[300px] w-full shadow flex flex-col h-full">
      <div className="flex px-3 h-16 flex-shrink-0 justify-between items-center">
        <h1 className="font-bold bg-gradient-to-br text-lg text-transparent bg-clip-text from-orange-500 to-pink-500">
          Cat Maps
        </h1>
        <h2 className="before:mr-2 before:content-['🐱']">
          <CountUp start={0} end={cats.length} />
        </h2>
      </div>
      <div className="flex px-3 pb-3 overflow-y-auto flex-col gap-2 h-full">
        {isLoadingCats
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full shrink-0 aspect-square" />
            ))
          : cats.map((cat) => (
              <Card key={cat._id}>
                <CardContent className="relative rounded-lg overflow-hidden">
                  <div className="cursor-pointer aspect-square relative">
                    <Image
                      sizes="100%"
                      priority
                      src={cat.imageUrl}
                      alt="preview cat"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gradient-to-b from-black/50 via-black/0 to-transparent absolute inset-0" />
                  <button
                    aria-label="toggle like button"
                    onClick={() => toggleLike(cat.liked, cat._id)}
                    className="hover:bg-transparent hover:scale-110 active:scale-95 transition-transform absolute right-4 top-4"
                  >
                    <Heart
                      className={`text-red-300 ${cat.liked && "fill-red-300"}`}
                      size={18}
                    />
                  </button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export { Sidebar };
