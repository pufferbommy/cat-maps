import { type NextRequest } from "next/server";

import Cat from "@/models/cat.model";
import { cloudinary } from "@/lib/cloudinary";
import { connectDatabase } from "@/lib/database";

export async function GET() {
  await connectDatabase();

  const previewCats: PreviewCat[] = await Cat.find({}, [
    "imageUrl",
    "latitude",
    "longitude",
  ]);

  const response: BaseResponse<PreviewCat[]> = {
    success: true,
    data: previewCats,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const { latitude, longitude, image } = await request.json();

  const uploadResponse = await cloudinary.uploader.upload(image);

  await connectDatabase();

  const cat = new Cat({
    latitude,
    longitude,
    imageUrl: uploadResponse.secure_url,
    uploader: request.headers.get("userId"),
  });

  await cat.save();

  return Response.json({
    m: "Upload cat success",
  });
}
