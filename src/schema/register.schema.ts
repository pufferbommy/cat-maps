import { z } from "zod";

export const registerSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  password: z.string(),
});

export type Register = z.infer<typeof registerSchema>;
