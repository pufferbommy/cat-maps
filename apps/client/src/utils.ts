import { Document } from "mongoose";

import Like from "./models/like";

export const getLikeInfo = async (userId: string, cat: Document) => {
  let liked = false;
  if (userId) {
    liked = (await Like.exists({ cat: cat._id, user: userId })) !== null;
  }
  const totalLikes = await Like.countDocuments({ cat: cat._id });
  return {
    liked,
    totalLikes,
  };
};
