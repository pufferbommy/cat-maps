import { NextRequest, NextResponse } from "next/server";

import Like from "@/models/like";
import Cat from "@/models/cat.model";
import { connectDatabase } from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    await connectDatabase();

    const userId = request.headers.get("userId");

    const cat = await Cat.findById(
      params.catId,
      "imageUrl comments createdAt"
    ).populate("uploader");

    if (!cat) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Cat not found" },
        { status: 404 }
      );
    }

    const liked = userId
      ? Boolean(
          await Like.findOne({
            cat: cat._id,
            user: userId,
          })
        )
      : false;

    const totalLikes = await Like.countDocuments({ cat: cat._id });

    return NextResponse.json<BaseResponse<Cat>>({
      success: true,
      data: { ...cat.toObject(), liked, totalLikes },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch cat" },
      { status: 500 }
    );
  }
}
