"use client";

import { Heart } from "lucide-react";
import { MouseEvent, useRef } from "react";

import { cn } from "@/lib/utils";
import LoginRequiredAlertDialog, {
  LoginRequiredAlertDialogHandle,
} from "../auth/login-required-dialog";
import { useToggleLikeCat } from "@/hooks/use-cats";
import { useGetUserProfile } from "@/hooks/use-user";

interface LikeButtonProps {
  cat: Cat;
}

const LikeButton = ({ cat }: LikeButtonProps) => {
  const { data: userProfile } = useGetUserProfile();

  const toggleLikeCat = useToggleLikeCat();

  const loginRequiredAlertDialogRef =
    useRef<LoginRequiredAlertDialogHandle>(null);

  const handleToggleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!userProfile) {
      return loginRequiredAlertDialogRef.current?.open();
    }

    toggleLikeCat.mutate({ catId: cat.id });
  };

  return (
    <>
      <LoginRequiredAlertDialog
        ref={loginRequiredAlertDialogRef}
        description="You need to login to like a cat"
      />
      <button
        aria-label="toggle like button"
        onClick={handleToggleLike}
        className="hover:bg-transparent hover:scale-110 inline-flex gap-2 items-center active:scale-95 transition-transform absolute right-4 top-4"
      >
        <Heart
          className={cn(
            "text-red-300",
            cn(cat.currentUserLiked && "fill-red-300")
          )}
          size={18}
        />
        <span className="text-red-300 text-sm">{cat.totalLikes}</span>
      </button>
    </>
  );
};

export default LikeButton;
