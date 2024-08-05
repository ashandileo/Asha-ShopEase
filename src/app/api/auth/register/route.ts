import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { generateToken, hashPassword } from "@/lib/auth";
import { createBaseResponse } from "@/lib/baseResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Check if email already exists
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email))
    .limit(1);

  if (existingUser?.length > 0) {
    return NextResponse.json(
      createBaseResponse(409, "Email already exists", null),
      { status: 409 }
    );
  }

  const newUser = {
    fullname: body.fullname,
    email: body.email,
    role: "user" as any,
    status: "active" as any,
    password: await hashPassword(body.password),
  };

  const [insertedUser] = await db.insert(usersTable).values(newUser).returning({
    id: usersTable.id,
    email: usersTable.email,
  });

  const token = generateToken({
    id: insertedUser.id,
    email: insertedUser.email,
  });

  const response = NextResponse.json(
    createBaseResponse(200, "Success", { token })
  );

  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000).toUTCString();
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Expires=${expires}; Path=/`
  );

  return response;
}
