import jwt from "jsonwebtoken";

import { env } from "@/env";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("Authorization");

    if (!authorization) {
      throw new Error("ไม่พบ Token");
    }

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      throw new Error("ไม่พบ Token");
    }

    const decoded = jwt.verify(accessToken, env.JWT_SECRET);

    await connectDB();

    const user = await User.findById(decoded);

    if (!user) throw new Error("ไม่พบผู้ใช้");

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
      message: (error as Error).message || "เกิดข้อผิดพลาด",
    };
    return Response.json(response);
  }
}
