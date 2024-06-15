import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1, "Please enter a comment"),
  catId: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
