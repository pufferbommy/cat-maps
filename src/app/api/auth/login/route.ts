import argon2 from "argon2";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { env } from "@/env";
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
      _id: user._id,
    };

    const response: BaseResponse<Auth> = {
      success: true,
      message: "Login successfully",
      data: {
        accessToken: await new jose.SignJWT({ payload })
          .setProtectedHeader({
            alg: "HS256",
          })
          .setExpirationTime("15m")
          .sign(new TextEncoder().encode(env.JWT_SECRET)),
        refreshToken: jwt.sign(payload, env.JWT_SECRET, {
          expiresIn: "15 days",
        }),
      },
    };

    return Response.json(response);
  } catch (error) {
    const response: BaseResponse = {
      success: false,
      message: (error as Error).message || "An error occurred",
    };
    return Response.json(response);
  }
}
