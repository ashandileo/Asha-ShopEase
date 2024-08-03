"use client";

import { z } from "zod";

const productsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export default productsSchema;
