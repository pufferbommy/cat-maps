"use client";

import { toast } from "sonner";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import AuthButton from "../auth/auth-button";
import { getProfile } from "@/services/auth";
import { clearMyLikedCats } from "@/store/cats";
import { setFullLoader } from "@/store/full-loader";
import { $isLoadingProfile, $profile, clearProfile } from "@/store/profile";
import Link from "next/link";

const Navbar = () => {
  const profile = useStore($profile);
  const isLoadingProfile = useStore($isLoadingProfile);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isCatDetailPage = pathname.includes("/cats/");

  const logout = () => {
    setFullLoader(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Log out successful");
      clearMyLikedCats();
      clearProfile();
      setFullLoader(false);
    }, 250);
  };

  useEffect(() => {
    const getProfileAbortController = new AbortController();

    (async () => {
      setFullLoader(true);
      await getProfile(getProfileAbortController.signal);
      setFullLoader(false);
    })();

    return () => {
      getProfileAbortController.abort();
    };
  }, []);

  return (
    <div className="border-b border-b-gray-100 h-[77px]">
      <div
        className={cn(
          "flex p-4  justify-between flex-shrink-0 gap-4 h-full items-center",
          isCatDetailPage && "container"
        )}
      >
        <div className="flex flex-shrink-0 justify-between items-center">
          <Link href="/">
            <h1 className="inline-flex items-center gap-2 font-bold bg-gradient-to-br text-transparent bg-clip-text from-orange-500 to-pink-500">
              <Logo />
              Cat Maps
            </h1>
          </Link>
        </div>
        {!isLoadingProfile ? (
          <>
            {!profile ? (
              <div className="flex gap-2">
                <AuthButton variant="outline" initialAction="login" />
                <AuthButton initialAction="register" />
              </div>
            ) : (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={!open ? "ghost" : "secondary"}
                    className="gap-2 h-full"
                  >
                    <Avatar variant="beam" size={28} name={profile?.username} />
                    <span className="capitalize">{profile?.username}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="w-10 h-3 rounded-full" />
            <Skeleton className="w-3 h-3 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
