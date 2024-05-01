"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { Heart } from "lucide-react";
import { useStore } from "@nanostores/react";

import AuthButton from "./auth-button";
import { Skeleton } from "./ui/skeleton";
import LogoutButton from "./logout-button";
import * as catsService from "@/services/cats";
import { $isLoadingCats, $cats } from "@/store/cats";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { $isLoadingProfile, $profile } from "@/store/profile";

const Sidebar = () => {
  const profile = useStore($profile);
  const isLoadingProfile = useStore($isLoadingProfile);

  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  const toggleLike = async (catId: string) => {
    if (!profile) {
      alert("Please login first");
      return;
    }
    await catsService.toggleLike(catId);
  };

  return (
    <div className="max-w-[300px] w-full shadow flex flex-col h-full">
      <div className="flex px-4 mb-6 pt-4 justify-between items-center">
        <h1 className="font-bold text-xl">CatMaps</h1>
        <h2 className="before:mr-2 text-lg before:content-['🐱']">
          <CountUp start={0} end={cats.length} />
        </h2>
      </div>
      <div className="flex px-4 mb-4 overflow-y-auto flex-col gap-4 h-full">
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
                    onClick={() => toggleLike(cat._id)}
                    className="hover:bg-transparent hover:scale-110 active:scale-95 transition-transform absolute right-4 top-4"
                  >
                    <Heart className="text-red-300" size={18} />
                  </button>
                </CardContent>
              </Card>
            ))}
      </div>
      <div className="px-4 pb-4">
        {!isLoadingProfile ? (
          <>
            {!profile ? (
              <div className="w-full flex gap-2">
                <AuthButton initialAction="login" />
                <AuthButton initialAction="register" />
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="flex items-center gap-2 w-full overflow-x-hidden">
                  <Avatar>
                    <AvatarFallback>
                      {profile?.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="truncate w-full">{profile?.username}</p>
                </div>
                <LogoutButton />
              </div>
            )}
          </>
        ) : (
          <p className="h-10 flex items-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export { Sidebar };
