import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newProduct = {
    categoryId: body.categoryId,
    name: body.name,
    color: body.color,
    description: body.description,
    price: body.price,
  };

  const [insertedProduct] = await db
    .insert(productsTable)
    .values(newProduct)
    .returning();

  return NextResponse.json(
    createBaseResponse(201, "Product created successfully", {
      product: insertedProduct,
    }),
    { status: 201 }
  );
}
