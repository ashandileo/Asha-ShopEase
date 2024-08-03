import { createBaseResponse } from "@/lib/baseResponse";
import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json(
    createBaseResponse(200, "Success Logout User", null)
  );

  response.headers.set(
    "Set-Cookie",
    `token=; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  );

  return response;
}
