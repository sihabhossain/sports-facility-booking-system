import { z } from "zod";
import { USER_Role } from "./user.constant";

const createUserValidation = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(255, "Name cannot exceed 255 characters"),
    email: z
      .string()
      .email("Invalid email format")
      .trim()
      .max(255, "Email cannot exceed 255 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .trim()
      .max(128, "Password cannot exceed 128 characters"),
    phone: z.string().trim().optional(),
    role: z
      .nativeEnum(USER_Role, {
        errorMap: () => ({ message: "Invalid role" }),
      })
      .default(USER_Role.USER),
    address: z
      .string()
      .trim()
      .max(512, "Address cannot exceed 512 characters")
      .optional(),
  }),
});

export const UserValidations = {
  createUserValidation,
};
