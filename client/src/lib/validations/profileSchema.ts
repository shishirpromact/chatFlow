import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().optional(),
  image: z.string().url("Must be a valid URL"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
