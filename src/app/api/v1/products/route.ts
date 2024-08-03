import { db } from "@/db";
import { categoriesTable, productsTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { asc, count, eq, like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "2");
  const search = searchParams.get("search") || "";

  const getUsers = async () => {
    let query = db
      .select()
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .orderBy(asc(productsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const conditions = [];

    if (search) {
      conditions.push(like(productsTable.name, `%${search}%`));
    }

    return await query;
  };

  const filteredProducts = await getUsers();

  const totalProducts = await db.select({ count: count() }).from(productsTable);
  const totalItems = totalProducts[0].count;
  const totalPages = Math.ceil(totalItems / pageSize);

  const response = {
    products: filteredProducts,
    totalItems: totalItems,
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
