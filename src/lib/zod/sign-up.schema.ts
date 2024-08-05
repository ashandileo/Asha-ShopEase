"use client";

import { z } from "zod";

const signUpSchema = z
  .object({
    fullname: z.string().min(1, { message: "Fullname is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export default signUpSchema;
