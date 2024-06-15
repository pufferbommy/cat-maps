import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyJwt } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const { pathname } = request.nextUrl;

  const authorization = requestHeaders.get("Authorization");

  if (authorization) {
    const accessToken = authorization.split(" ")[1];
    if (accessToken) {
      try {
        const { payload } = await verifyJwt(accessToken);
        requestHeaders.set("userId", (payload.payload as AuthPayload).userId);
      } catch (error) {
        if (
          pathname !== "/api/refresh" &&
          (error as Error).name === "JWTExpired"
        ) {
          return NextResponse.json(
            {
              succuss: false,
            },
            {
              status: 401,
            }
          );
        }
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
