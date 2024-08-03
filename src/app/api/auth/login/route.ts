import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { generateToken, verifyPassword } from "@/lib/auth";
import { createBaseResponse } from "@/lib/baseResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, body.email),
  });

  if (!user) {
    return NextResponse.json(createBaseResponse(404, "Not Found", null));
  }

  const password = user.password;
  const isPasswordValid = await verifyPassword(body.password, password);

  if (isPasswordValid) {
    const token = generateToken({ id: user.id, email: user.email });

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
}
