import { type NextRequest } from "next/server";

import Cat from "@/models/cat.model";
import { connectDatabase } from "@/lib/database";
import { cloudinary, configCloudinary } from "@/lib/cloudinary";

configCloudinary();

export async function GET() {
  await connectDatabase();

  const cats: Cat[] = await Cat.find({}, ["imageUrl", "latitude", "longitude"]);

  const response: BaseResponse<Cat[]> = {
    success: true,
    data: cats,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const { latitude, longitude, image } = await request.json();

  const uploadResponse = await cloudinary.uploader.upload(image);

  await connectDatabase();

  await Cat.create({
    latitude,
    longitude,
    imageUrl: uploadResponse.secure_url,
    uploader: request.headers.get("userId"),
  });

  const response: BaseResponse = {
    success: true,
    message: "Upload cat success",
  };

  return Response.json(response);
}
