import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { createBaseResponse } from "@/lib/baseResponse";
import { asc, count, sql, like, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Handler function for GET requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "2");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const getUsers = async () => {
    let query = db
      .select({
        id: usersTable.id,
        fullname: usersTable.fullname,
        email: usersTable.email,
        role: usersTable.role,
        status: usersTable.status,
        createdAt: usersTable.createdAt,
        updateAt: usersTable.updateAt,
      })
      .from(usersTable)
      .orderBy(asc(usersTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const conditions = [];

    if (search) {
      conditions.push(like(usersTable.fullname, `%${search}%`));
    }

    if (status) {
      conditions.push(sql`${usersTable.status} = ${status}`);
    }

    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return await query;
  };

  const filteredUsers = await getUsers();

  const totalUsers = await db.select({ count: count() }).from(usersTable);
  const totalItems = totalUsers[0].count;
  const totalPages = Math.ceil(totalItems / pageSize);

  const response = {
    users: filteredUsers,
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

  const newUser = {
    fullname: body.fullname,
    email: body.email,
    role: body.role,
    status: body.status,
    password: await hashPassword(body.password),
  };

  const [insertedUser] = await db.insert(usersTable).values(newUser).returning({
    id: usersTable.id,
    fullname: usersTable.fullname,
    email: usersTable.email,
    role: usersTable.role,
    status: usersTable.status,
    createdAt: usersTable.createdAt,
    updateAt: usersTable.updateAt,
  });

  return NextResponse.json(
    createBaseResponse(201, "User created successfully", {
      user: insertedUser,
    }),
    { status: 201 }
  );
}
