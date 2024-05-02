import { NextRequest } from "next/server";

import { signJwt, verifyJwt } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const refreshToken = json.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const { payload } = await verifyJwt(refreshToken);

    const userId = (payload.payload as AuthPayload).userId;

    const newPayload: AuthPayload = {
      userId,
    };

    const response: BaseResponse<Auth> = {
      success: true,
      data: {
        accessToken: await signJwt(newPayload, "15m"),
        refreshToken: await signJwt(newPayload, "15 days"),
      },
    };

    return Response.json(response);
  } catch (error) {
    const response: BaseResponse = {
      success: false,
      message: (error as Error).message || "An error occurred",
    };
    return Response.json(response, {
      status: 500,
    });
  }
}
