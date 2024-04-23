import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { env } from "@/env";
import { connectDatabase } from "@/lib/database";
import User from "@/models/user.model";
import { loginSchema } from "@/schema/login.schema";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = loginSchema.parse(await request.json());

    await connectDatabase();

    const user = await User.findOne({
      username,
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }

    const payload = {
      _id: user._id,
    };

    const response: BaseResponse<Auth> = {
      success: true,
      message: "เข้าสู่ระบบสำเร็จ",
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
