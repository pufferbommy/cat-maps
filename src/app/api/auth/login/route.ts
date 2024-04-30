import argon2 from "argon2";
import { NextRequest } from "next/server";

import { signJwt } from "@/lib/jwt";
import User from "@/models/user.model";
import { connectDatabase } from "@/lib/database";
import { loginSchema } from "@/schema/login.schema";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = loginSchema.parse(await request.json());

    await connectDatabase();

    const user = await User.findOne({
      username,
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new Error("Username or password is incorrect");
    }

    const payload: AuthPayload = {
      userId: user._id,
    };

    const response: BaseResponse<Auth> = {
      success: true,
      message: "Login successfully",
      data: {
        accessToken: await signJwt(payload, "15m"),
        refreshToken: await signJwt(payload, "15 days"),
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
