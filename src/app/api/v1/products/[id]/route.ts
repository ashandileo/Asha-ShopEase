import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, route: any) {
  const { id } = route.params;
  const body = await request.json();
  const userId = parseInt(id);

  const updateData = {
    categoryId: 1,
    name: body.name,
    color: body.color,
    description: body.description,
    price: body.price,
  };

  const [updatedProduct] = await db
    .update(productsTable)
    .set(updateData)
    .where(eq(productsTable.id, userId))
    .returning();

  return NextResponse.json(
    createBaseResponse(200, "Product updated successfully", {
      product: updatedProduct,
    }),
    { status: 200 }
  );
}
