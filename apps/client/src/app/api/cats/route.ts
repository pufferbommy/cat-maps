import { Document } from "mongoose";
import { NextResponse, type NextRequest } from "next/server";

import Cat from "@/models/cat.model";
import { getLikeInfo } from "@/utils";
import { connectDatabase } from "@/lib/database";
import { cloudinary, configCloudinary } from "@/lib/cloudinary";

configCloudinary();

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    const userId = request.headers.get("userId")!;

    const cats: Document[] = await Cat.find({}, "imageUrl latitude longitude");

    const catsDto: CatDto[] = [];

    for (const cat of cats) {
      const { liked, totalLikes } = await getLikeInfo(userId, cat);
      catsDto.push({ ...cat.toObject(), liked, totalLikes });
    }

    return NextResponse.json<BaseResponse<CatDto[]>>({
      success: true,
      data: catsDto,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch cats" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, image } = await request.json();

    const uploadResponse = await cloudinary.uploader.upload(image, {
      transformation: {
        width: 500,
        height: 500,
      },
    });

    await connectDatabase();

    const userId = request.headers.get("userId");

    await Cat.create({
      latitude,
      longitude,
      imageUrl: uploadResponse.secure_url,
      uploader: userId,
    });

    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Upload cat success",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error uploading cat:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload cat" },
      { status: 500 }
    );
  }
}
