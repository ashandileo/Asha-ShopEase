"use client";

import { z } from "zod";

const ordersSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  productId: z.string().min(1, { message: "Product is required" }),
  orderDate: z
    .union([z.date(), z.null(), z.string()])
    .refine((date) => date !== null, {
      message: "Order Date is required",
    }),
  status: z.enum(["pending", "shipped", "delivered"]),
  paymentMethod: z.string().min(1, { message: "Payment Method is required" }),
  shippingAddress: z
    .string()
    .min(1, { message: "Shipping Address is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  totalAmount: z.string().min(1, { message: "Total Amount is required" }),
});

export default ordersSchema;
