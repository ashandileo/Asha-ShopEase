import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createBaseResponse } from "@/lib/baseResponse";
import { asc, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Handler function for GET requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "2");

  const getUsers = async () => {
    return await db
      .select()
      .from(usersTable)
      .orderBy(asc(usersTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  };

  const filteredUsers = await getUsers();

  const totalUsers = await db.select({ count: count() }).from(usersTable);
  const totalItems = totalUsers[0].count;
  const totalPages = Math.ceil(totalItems / pageSize);

  const response = {
    users: filteredUsers,
    totalItems: totalItems,
    currentPage: page,
    nextPage: page < totalPages ? page + 1 : null,
  };

  return NextResponse.json(createBaseResponse(200, "Success", response), {
    status: 200,
  });
}
