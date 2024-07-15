"use client";

import Link from "next/link";
import Avatar from "boring-avatars";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserQuery } from "@/hooks/use-user-query";
import AuthButton from "@/components/auth/auth-button";
import { LogoutButton } from "./components/logout-button";

const Navbar = () => {
  const { data: userProfile, isLoading } = useQuery(useUserQuery());

  return (
    <header className="border-b border-b-gray-100 h-[77px] flex-shrink-0">
      <div className="flex p-4 justify-between flex-shrink-0 gap-4 h-full items-center">
        <Link className="font-bold text-lg" href="/">
          Cat Maps
        </Link>
        {!isLoading ? (
          <>
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
          </>
        ) : (
          <div className="flex gap-2 items-center *:rounded-full">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-12 h-4" />
            <Skeleton className="size-4" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
