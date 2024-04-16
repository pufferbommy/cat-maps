import { v2 as cloudinary } from "cloudinary";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { connectDB } from "@/lib/db";
import Cat from "@/models/cat.model";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  return Response.json([
    {
      _id: "sad2123",
      description: "This cat is so cuteeeeeeeeeeeeeeeeeee long text",
      latitude: 51.505,
      longitude: -0.09,
      comments: [],
      imageUrl:
        "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdByUser: {
        _id: "123",
        displayName: "John Doe",
      },
      createdAt: "2024-11-01T00:00:00.000Z",
    },
    {
      _id: "sad21233",
      description: "A cat",
      latitude: 51.505,
      longitude: -0.09,
      comments: [],
      imageUrl:
        "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdByUser: {
        _id: "123",
        displayName: "John Doe",
      },
      createdAt: "2024-11-01T00:00:00.000Z",
    },
    {
      _id: "sad212333",
      description: "A cat",
      latitude: 51.505,
      longitude: -0.09,
      comments: [],
      imageUrl:
        "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdByUser: {
        _id: "123",
        displayName: "John Doe",
      },
      createdAt: "2024-11-01T00:00:00.000Z",
    },
    {
      _id: "sad21233443",
      description: "A cat",
      latitude: 51.505,
      longitude: -0.09,
      comments: [],
      imageUrl:
        "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdByUser: {
        _id: "123",
        displayName: "John Doe",
      },
      createdAt: "2024-11-01T00:00:00.000Z",
    },
  ]);
}

export async function POST(request: NextRequest) {
  const { image } = await request.json();
  // const uploadResponse = await cloudinary.uploader.upload(image);
  // console.log();
  await connectDB();
  Cat.create({
    // imageUrl: uploadResponse.secure_url,
    // createdByUserId
  });

  return Response.json({
    m: "55",
  });
}
