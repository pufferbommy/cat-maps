import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "./env";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const authHeader = requestHeaders.get("Authorization");

  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    if (accessToken) {
      try {
        const { payload } = await jose.jwtVerify<AuthPayload>(
          accessToken,
          new TextEncoder().encode(env.JWT_SECRET)
        );
        requestHeaders.set("userId", payload._id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}
