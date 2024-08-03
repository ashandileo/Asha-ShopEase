import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, route: any) {
  const { id } = route.params;
  const body = await request.json();
  const orderId = parseInt(id);

  const updateData = {
    userId: body.userId,
    productId: body.productId,
    orderDate: body.orderDate,
    status: body.status,
    paymentMethod: body.paymentMethod,
    shippingAddress: body.shippingAddress,
    quantity: body.quantity,
    totalAmount: body.totalAmount,
  };

  const [updatedOrder] = await db
    .update(ordersTable)
    .set(updateData)
    .where(eq(ordersTable.id, orderId))
    .returning();

  return NextResponse.json(
    createBaseResponse(200, "Order updated successfully", {
      order: updatedOrder,
    }),
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest, route: any) {
  const { id } = route.params;
  const orderId = parseInt(id);

  const deletedProduct = await db
    .delete(ordersTable)
    .where(eq(ordersTable.id, orderId))
    .returning();

  if (!deletedProduct) {
    return NextResponse.json(createBaseResponse(404, "Order not found", null), {
      status: 404,
    });
  }

  return NextResponse.json(
    createBaseResponse(200, "Order deleted successfully", {
      user: deletedProduct,
    }),
    { status: 200 }
  );
}
