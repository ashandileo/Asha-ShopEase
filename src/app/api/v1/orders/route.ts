import { db } from "@/db";
import { ordersTable, productsTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { and, asc, count, eq, like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newOrder = {
    userId: body.userId,
    productId: body.productId,
    orderDate: body.orderDate,
    status: body.status,
    paymentMethod: body.paymentMethod,
    shippingAddress: body.shippingAddress,
    quantity: body.quantity,
    totalAmount: body.totalAmount,
  };

  const [insertedOrder] = await db
    .insert(ordersTable)
    .values(newOrder)
    .returning();

  return NextResponse.json(
    createBaseResponse(201, "Order created successfully", {
      order: insertedOrder,
    }),
    { status: 201 }
  );
}
