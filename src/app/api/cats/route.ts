import { connectDB } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { type NextRequest } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  return Response.json([
    {
      id: "sad2123",
      position: {
        lat: 51.505,
        lng: -0.09,
      },
    },
    {
      id: "123124#",
      position: {
        lat: 61.505,
        lng: -0.09,
      },
    },
    {
      id: "123123124#",
      position: {
        lat: 20.505,
        lng: -0.09,
      },
    },
    {
      id: "1231sa223124#",
      position: {
        lat: 20.505,
        lng: 40.09,
      },
    },
    {
      id: "12311223124#",
      position: {
        lat: 15.505,
        lng: 10.09,
      },
    },
    {
      id: "12s311223124#",
      position: {
        lat: 15.505,
        lng: 100.09,
      },
    },
  ]);
}

export async function POST(request: NextRequest) {
  const { image } = await request.json();
  // const uploadResponse = await cloudinary.uploader.upload(image);
  // console.log(uploadResponse);
  await connectDB();

  return Response.json({
    m: "55",
  });
}
