import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyJwt } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const authorization = requestHeaders.get("Authorization");

  if (authorization) {
    const accessToken = authorization.split(" ")[1];
    if (accessToken) {
      try {
        const { payload } = await verifyJwt(accessToken);
        requestHeaders.set("userId", (payload.payload as AuthPayload)._id);
      } catch (error) {
        // console.error(error);
      }
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: "/api/:path*",
};
