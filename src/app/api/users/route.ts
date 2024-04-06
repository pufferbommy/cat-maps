import User from "@/models/user.model";
import { NextRequest } from "next/server";
import argon2 from "argon2";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { displayName, password, username } = await request.json();
  // const uploadResponse = await cloudinary.uploader.upload(image);
  // console.log(uploadResponse);
  await connectDB();
  await User.create({
    displayName: "test",
    password: await argon2.hash("test"),
    username: "test",
  });

  return Response.json({
    items: [],
  });
}
