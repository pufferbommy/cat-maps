"use client";

import Avatar from "boring-avatars";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserProfile } from "@/hooks/use-user";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/auth/auth-button";
import { LogoutButton } from "./components/logout-button";

const Navbar = () => {
  const { data: userProfile, isLoading } = useGetUserProfile();

  return (
    <header className="border-b border-b-gray-100 h-[77px] flex-shrink-0">
      <div className="flex p-4 justify-between flex-shrink-0 gap-4 h-full items-center">
        <h1 className="font-bold">Cat Maps</h1>
        <div className="flex gap-4">
          {!isLoading ? (
            <div className="flex gap-4 items-center">
              {!userProfile ? (
                <div className="flex gap-2">
                  <AuthButton variant="outline" initialAction="login" />
                  <AuthButton initialAction="register" />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar
                      variant="beam"
                      size={32}
                      name={userProfile.username}
                    />
                    <span className="capitalize">{userProfile.username}</span>
                  </div>
                  <LogoutButton />
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2 items-center *:rounded-full">
              <Skeleton className="w-8 h-8" />
              <Skeleton className="w-12 h-4" />
              <Skeleton className="size-4" />
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
