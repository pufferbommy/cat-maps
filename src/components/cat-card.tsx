import Image from "next/image";
import { Heart } from "lucide-react";
import { useStore } from "@nanostores/react";

import { cn } from "@/lib/utils";
import { $profile } from "@/store/profile";
import { Card, CardContent } from "./ui/card";
import * as catsService from "@/services/cats";
import { $focusedCatId, updateLike } from "@/store/cats";

interface CatCardProps {
  cat: Cat;
}

const CatCard = ({ cat }: CatCardProps) => {
  const profile = useStore($profile);
  const focusedCatId = useStore($focusedCatId);

  const toggleLike = async (liked: boolean, catId: string) => {
    if (!profile) {
      alert("Please log in first");
      return;
    }
    const newLiked = !liked;
    updateLike(catId, newLiked);
    await catsService.toggleLike(catId);
  };

  return (
    <Card
      id={`cat-${cat._id}`}
      className={cn(
        "ring-offset-2 shrink-0 rounded-lg shadow overflow-hidden cursor-pointer relative transition-transform",
        focusedCatId === cat._id && "ring-2 ring-offset-4 ring-orange-500"
      )}
    >
      <CardContent>
        <div className="aspect-square relative">
          <Image
            sizes="100%"
            priority
            src={cat.imageUrl}
            alt="cat"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-gradient-to-b from-black/75 via-black/0 to-transparent absolute inset-0" />
        <button
          aria-label="toggle like button"
          onClick={() => toggleLike(cat.liked, cat._id)}
          className="hover:bg-transparent hover:scale-110 inline-flex gap-2 items-center active:scale-95 transition-transform absolute right-4 top-4"
        >
          <Heart
            className={`text-red-300 ${cat.liked && "fill-red-300"}`}
            size={18}
          />
          <span className="text-red-300 text-sm">{cat.totalLikes}</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default CatCard;
