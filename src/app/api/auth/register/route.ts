import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { registerSchema } from "@/schema/register.schema";
import { capitalize } from "@/utils/string";

export async function POST(request: NextRequest) {
  try {
    const { displayName, username, password } = registerSchema.parse(
      await request.json()
    );

    await connectDB();

    const user = await User.findOne({
      username,
    });

    if (user) {
      throw new Error("User is already taken");
    }

    const createdUser = await User.create({
      displayName,
      username,
      password: await argon2.hash(password),
    });

    const payload = {
      _id: createdUser._id,
      displayName: createdUser.displayName,
    };

    const response: BaseResponse<AuthResponseData> = {
      success: true,
      message: `Registration successful! Meow, you're in, ${capitalize(createdUser.displayName)}! 🐱`,
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
