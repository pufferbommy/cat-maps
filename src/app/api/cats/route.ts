import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import Cat from "@/models/cat.model";
import User from "@/models/user.model";
import { connectDatabase } from "@/lib/database";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
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

  // const uploadResponse = await cloudinary.uploader.upload(image);
  const uploadResponse = {
    secure_url:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1686&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    throw new Error("ไม่พบ Token");
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    throw new Error("ไม่พบ Token");
  }

  const decoded = jwt.verify(accessToken, env.JWT_SECRET);

  await connectDatabase();

  const user = await User.findById(decoded);

  if (!user) throw new Error("ไม่พบผู้ใช้");

  const cat = new Cat({
    latitude,
    longitude,
    imageUrl: uploadResponse.secure_url,
    uploader: user._id,
  });

  await cat.save();

  return Response.json({
    m: "55",
  });
}
