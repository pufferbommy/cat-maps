export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";

import User from "@/models/user.model";
import { connectDatabase } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("userId");
    if (!userId) throw new Error();
    await connectDatabase();
    const user = await User.findById(userId);
    const response: BaseResponse<Profile> = {
      success: true,
      data: {
        username: user.username,
      },
    };

    return Response.json(response);
  } catch (error) {
    const response: BaseResponse = {
      success: false,
      message: (error as Error).message,
    };
    return Response.json(response, {
      status: 500,
    });
  }
}
