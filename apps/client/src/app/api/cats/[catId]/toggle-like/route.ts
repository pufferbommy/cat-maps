import { NextRequest, NextResponse } from "next/server";

import Like from "@/models/like";
import { connectDatabase } from "@/lib/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    const { catId } = params;

    await connectDatabase();

    const userId = request.headers.get("userId");

    const liked = await Like.exists({ cat: catId, user: userId });

    if (liked) {
      await Like.deleteOne({ cat: catId, user: userId });
    } else {
      await Like.create({ cat: catId, user: userId });
    }

    const response: BaseResponse<Like> = {
      success: true,
      data: {
        liked: !liked,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
