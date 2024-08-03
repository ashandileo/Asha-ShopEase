import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { createBaseResponse } from "@/lib/baseResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, route: any) {
  const { id } = route.params;
  const body = await request.json();
  const userId = parseInt(id);

  const updateData = {
    fullname: body.fullname,
    email: body.email,
    role: body.role,
    status: body.status,
    password: await hashPassword(body.password),
  };

  const [updatedUser] = await db
    .update(usersTable)
    .set(updateData)
    .where(eq(usersTable.id, userId))
    .returning({
      id: usersTable.id,
      fullname: usersTable.fullname,
      email: usersTable.email,
      role: usersTable.role,
      status: usersTable.status,
      createdAt: usersTable.createdAt,
      updateAt: usersTable.updateAt,
    });

  if (!updatedUser) {
    return NextResponse.json(createBaseResponse(404, "User not found"), {
      status: 404,
    });
  }

  return NextResponse.json(
    createBaseResponse(200, "User updated successfully", { user: updatedUser }),
    { status: 200 }
  );
}
