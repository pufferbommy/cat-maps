export const dynamic = "force-dynamic";

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { env } from "@/env";
import User from "@/models/user.model";
import { connectDatabase } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("Authorization");

    if (!authorization) {
      throw new Error();
    }

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      throw new Error();
    }

    const decoded = jwt.verify(accessToken, env.JWT_SECRET) as { _id: string };

    await connectDatabase();

    const user = await User.findById(decoded._id);

    if (!user) throw new Error();

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
    return Response.json(response);
  }
}
