"use client";

import { z } from "zod";

const usersSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  role: z.enum(["admin", "manager", "user"]),
  status: z.enum(["active", "inactive"]),
  password: z.string().min(1, { message: "Password is required" }),
});

export default usersSchema;
