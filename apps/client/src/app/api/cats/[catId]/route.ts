import { NextRequest, NextResponse } from "next/server";

import Cat from "@/models/cat.model";
import { getLikeInfo } from "@/utils";
import { connectDatabase } from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  try {
    await connectDatabase();

    const userId = request.headers.get("userId")!;

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

    const { liked, totalLikes } = await getLikeInfo(userId, cat);

    const catDto: CatDto = { ...cat.toObject(), liked, totalLikes };

    return NextResponse.json<BaseResponse<Cat>>({
      success: true,
      data: catDto,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch cat" },
      { status: 500 }
    );
  }
}
