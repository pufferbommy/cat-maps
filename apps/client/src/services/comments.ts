import axios from "@/lib/axios";
import { Comment } from "@/schema/comment.schema";

export const createComment = async (comment: Comment) => {
  const response = await axios.post("comments", comment);
  return response.data.data!;
};
