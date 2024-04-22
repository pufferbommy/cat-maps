"use client";

import { toast } from "sonner";
import Image from "next/image";
import CountUp from "react-countup";
import { Heart, LogOut } from "lucide-react";
import { useStore } from "@nanostores/react";

import AuthButton from "./auth-button";
import { useCats } from "@/hooks/useCats";
import { $isLoading, $profile, clearProfile } from "@/store/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const Sidebar = () => {
  const profile = useStore($profile);
  const isProfileLoading = useStore($isLoading);

  const { cats, isLoading } = useCats();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    clearProfile();
    toast.success("ออกจากระบบแล้ว");
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
        {isLoading && (
          <div>
            Loading...
            {/* <Skeleton className="w-full" /> */}
          </div>
        )}
        {cats.map((cat) => (
          <Card key={cat._id}>
            <CardContent className="relative rounded-lg overflow-hidden">
              <div className="cursor-pointer aspect-square">
                <Image
                  sizes="100%"
                  priority
                  src={cat.imageUrl}
                  alt="cat"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gradient-to-b from-black/50 via-black/0 to-transparent absolute inset-0" />
              <button className="hover:bg-transparent hover:scale-110 transition-transform absolute right-4 top-4">
                <Heart className="text-red-300" size={18} />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="px-4 pb-4 gap-4 grid grid-cols-2">
        {isProfileLoading ? (
          <div className="flex flex-col justify-center h-10">Loading...</div>
        ) : (
          <>
            {!profile ? (
              <>
                <AuthButton initialAction="login" />
                <AuthButton initialAction="register" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {profile.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="truncate">{profile.username}</p>
                </div>
                <Button onClick={logout} variant="secondary" className="gap-2">
                  ออกจากระบบ
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Sidebar };
