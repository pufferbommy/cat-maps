"use client";

import Avatar from "boring-avatars";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserProfile } from "@/hooks/use-user";
import { ModeToggle } from "@/components/mode-toggle";
import AuthDialog from "@/components/auth/auth-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { LogoutButton } from "./components/logout-button";

const Header = () => {
  const { data: userProfile, isLoading } = useGetUserProfile();

  return (
    <header className="border-b border-b-gray-100 dark:border-b-gray-800 h-[77px] flex-shrink-0">
      <div className="flex p-4 justify-between flex-shrink-0 gap-4 h-full items-center">
        <h1 className="font-bold">Cat Maps 🐱</h1>
        <div className="flex gap-4">
          <ModeToggle />
          {!isLoading ? (
            <div className="flex gap-4 items-center">
              {!userProfile ? (
                <div className="flex gap-2">
                  <AuthDialog
                    initialAction="login"
                    trigger={
                      <DialogTrigger asChild>
                        <Button variant="outline">Log in</Button>
                      </DialogTrigger>
                    }
                  />
                  <AuthDialog
                    initialAction="register"
                    trigger={
                      <DialogTrigger asChild>
                        <Button>Register</Button>
                      </DialogTrigger>
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar
                      variant="beam"
                      size={32}
                      name={userProfile.username}
                    />
                    <span className="capitalize text-sm">
                      {userProfile.username}
                    </span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
