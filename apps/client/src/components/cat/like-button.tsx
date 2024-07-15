"use client";

import { Heart } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useUserQuery } from "@/hooks/use-user-query";
import LoginRequiredAlertDialog from "../auth/login-required-dialog";

interface LikeButtonProps {
  cat: Cat;
}

const LikeButton = ({ cat }: LikeButtonProps) => {
  const { data: userProfile } = useQuery(useUserQuery());

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // toggleLike(cat.liked, cat._id);
  };

  const isCurrentUserLiked =
    !!userProfile && cat.likedByUsers.includes(userProfile.id);

  return (
    <>
      <button
        aria-label="toggle like button"
        onClick={handleToggleLike}
        className="hover:bg-transparent hover:scale-110 inline-flex gap-2 items-center active:scale-95 transition-transform absolute right-4 top-4"
      >
        <Heart
          className={cn(
            "text-red-300",
            cn(isCurrentUserLiked && "fill-red-300")
          )}
          size={18}
        />
        <span className="text-red-300 text-sm">{cat.likedByUsers.length}</span>
      </button>
      <LoginRequiredAlertDialog
        description="You need to login to like a cat."
        isAlertDialogOpen={isOpen}
        setIsAlertDialogOpen={setIsOpen}
      />
    </>
  );
};

export default LikeButton;
