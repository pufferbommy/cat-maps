import { NextResponse, type NextRequest } from "next/server";

import Like from "@/models/like";
import Cat from "@/models/cat.model";
import { connectDatabase } from "@/lib/database";
import { cloudinary, configCloudinary } from "@/lib/cloudinary";

configCloudinary();

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    const userId = request.headers.get("userId");

    const cats: Cat[] = await Promise.all(
      (await Cat.find({}, "imageUrl latitude longitude").lean()).map(
        async (cat) => {
          const liked = userId
            ? Boolean(
                await Like.findOne({
                  cat: cat._id,
                  user: request.headers.get("userId"),
                })
              )
            : false;
          const totalLikes = await Like.countDocuments({ cat: cat._id });
          return { ...cat, liked, totalLikes } as Cat;
        }
      )
    );

    return NextResponse.json<BaseResponse<Cat[]>>({
      success: true,
      data: cats,
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
        format: "jpg",
        quality: 75,
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
