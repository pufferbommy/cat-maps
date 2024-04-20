import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { env } from "@/env";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { registerSchema } from "@/schema/register.schema";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = registerSchema.parse(await request.json());

    await connectDB();

    const user = await User.findOne({
      username,
    });

    if (user) {
      throw new Error("ชื่อผู้ใช้นี้มีอยู่แล้ว");
    }

    const createdUser: { _id: string; username: string; password: string } =
      await User.create({
        username,
        password: await argon2.hash(password),
      });

    const payload = {
      _id: createdUser._id,
    };

    const response: BaseResponse<AuthResponseData> = {
      success: true,
      message: "สมัครสมาชิกสำเร็จ",
      data: {
        accessToken: jwt.sign(payload, env.JWT_SECRET, {
          expiresIn: "15m",
        }),
        refreshToken: jwt.sign(payload, env.JWT_SECRET, {
          expiresIn: "15 days",
        }),
      },
    };

    return Response.json(response);
  } catch (error) {
    const response: BaseResponse = {
      success: false,
      message: (error as Error).message || "เกิดข้อผิดพลาด",
    };
    return Response.json(response);
  }
}
