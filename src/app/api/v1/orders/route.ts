import { db } from "@/db";
import { ordersTable, productsTable, usersTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { and, asc, count, eq, like, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "100");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const conditions = [];

  if (search) {
    conditions.push(like(ordersTable.shippingAddress, `%${search}%`));
  }

  if (status) {
    conditions.push(sql`${ordersTable.status} = ${status}`);
  }

  const orders = await db
    .select({
      order: ordersTable,
      user: usersTable,
      product: productsTable,
    })
    .from(ordersTable)
    .leftJoin(usersTable, eq(ordersTable.userId, usersTable.id))
    .leftJoin(productsTable, eq(ordersTable.productId, productsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(ordersTable.createdAt);

  const totalOrders = await db
    .select({ count: sql<number>`cast(count(${ordersTable.id}) as int)` })
    .from(ordersTable);
  const totalItems = totalOrders[0].count;
  const totalPages = Math.ceil(totalItems / pageSize);

  const response = {
    orders,
    totalItems,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };

  return NextResponse.json(createBaseResponse(200, "Success", response), {
    status: 200,
  });
}

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
