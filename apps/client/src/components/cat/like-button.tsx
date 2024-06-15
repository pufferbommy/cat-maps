"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useStore } from "@nanostores/react";

import { updateLike } from "@/store/cats";
import { $profile } from "@/store/profile";
import * as catsService from "@/services/cats";
import LoginRequiredAlertDialog from "../auth/login-required-dialog";

interface LikeButtonProps {
  cat: Cat;
}

const LikeButton = ({ cat }: LikeButtonProps) => {
  const profile = useStore($profile);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLike = async (liked: boolean, catId: string) => {
    if (!profile) {
      setIsOpen(true);
      return;
    }
    const newLiked = !liked;
    updateLike(catId, newLiked);
    await catsService.toggleLike(catId);
  };

  return (
    <>
      <button
        aria-label="toggle like button"
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(cat.liked, cat._id);
        }}
        className="hover:bg-transparent hover:scale-110 inline-flex gap-2 items-center active:scale-95 transition-transform absolute right-4 top-4"
      >
        <Heart
          className={`text-red-300 ${cat.liked && "fill-red-300"}`}
          size={18}
        />
        <span className="text-red-300 text-sm">{cat.totalLikes}</span>
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
