import { env } from "@/env";
import { connectDatabase } from "@/lib/database";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const refreshToken = json.refreshToken;

    if (!refreshToken) {
      throw new Error("ไม่พบ Refresh Token");
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

    await connectDatabase();

    const user = await User.findById(decoded);

    if (!user) throw new Error("ไม่พบผู้ใช้");

    const payload = {
      _id: user._id,
    };

    const response: BaseResponse<Auth> = {
      success: true,
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
