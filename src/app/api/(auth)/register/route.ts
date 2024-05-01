import argon2 from "argon2";
import { NextRequest } from "next/server";

import { signJwt } from "@/lib/jwt";
import User from "@/models/user.model";
import { connectDatabase } from "@/lib/database";
import { registerSchema } from "@/schema/register.schema";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = registerSchema.parse(await request.json());

    await connectDatabase();

    const user = await User.findOne({
      username,
    });

    if (user) {
      throw new Error("Username has already been taken");
    }

    const createdUser: { _id: string; username: string; password: string } =
      await User.create({
        username,
        password: await argon2.hash(password),
      });

    const payload: AuthPayload = {
      userId: createdUser._id,
    };

    const response: BaseResponse<Auth> = {
      success: true,
      message: "Register successfully",
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
