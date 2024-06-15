import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, "Please enter a username"),
    password: z.string().min(1, "Please enter a password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Register = z.infer<typeof registerSchema>;
