import { toast } from "sonner";
import Avatar from "boring-avatars";
import { useStore } from "@nanostores/react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

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
import { clearMyLikedCats } from "@/store/cats";
import { setFullLoader } from "@/store/full-loader";
import { $isLoadingProfile, $profile, clearProfile } from "@/store/profile";
import Logo from "./logo";

const Navbar = () => {
  const profile = useStore($profile);
  const isLoadingProfile = useStore($isLoadingProfile);

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

  return (
    <div className="p-4 flex border-l border-l-gray-100 justify-between flex-shrink-0 gap-4 h-20 items-center">
      <div className="flex flex-shrink-0 justify-between items-center">
        <h1 className="inline-flex items-center gap-2 font-bold bg-gradient-to-br text-transparent bg-clip-text from-orange-500 to-pink-500">
          <Logo />
          Cat Maps
        </h1>
      </div>
      {!isLoadingProfile ? (
        <>
          {!profile ? (
            <div className="flex gap-2">
              <AuthButton initialAction="login" />
              <AuthButton initialAction="register" />
            </div>
          ) : (
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 h-full">
                    <Avatar variant="beam" size={32} name={profile?.username} />
                    <span className="capitalize">{profile?.username}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
            </div>
          )}
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-10 h-3 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
