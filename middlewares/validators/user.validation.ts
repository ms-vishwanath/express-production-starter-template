import { z } from "zod";

export const createUser = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});

export type CreateUserInputType = z.infer<typeof createUser>;