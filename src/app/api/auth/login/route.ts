import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { capitalize } from "@/utils/string";
import { loginSchema } from "@/schema/login.schema";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = loginSchema.parse(await request.json());

    await connectDB();

    const user = await User.findOne({
      username,
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new Error("Username or password is incorrect");
    }

    const payload = {
      _id: user._id,
      displayName: user.displayName,
    };

    const response: BaseResponse<AuthResponseData> = {
      success: true,
      message: `Welcome back, ${capitalize(user.displayName)}! Logged in successfully`,
      data: {
        accessToken: jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "15m",
        }),
        refreshToken: jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "15 days",
        }),
      },
    };

    return Response.json(response);
  } catch (error) {
    const response: BaseResponse = {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
    return Response.json(response);
  }
}
