import { NextRequest, NextResponse } from "next/server";

import Comment from "@/models/comment.model";
import { commentSchema } from "@/schema/comment.schema";

export async function GET(request: NextRequest) {
  const catId = request.nextUrl.searchParams.get("catId");

  if (!catId) {
    return NextResponse.json<BaseResponse>({
      success: false,
      message: "Missing catId in query params",
    });
  }

  const comments: Comment[] = await Comment.find(
    {
      cat: catId,
    },
    "text createdAt"
  )
    .sort("-createdAt")
    .populate("user", "username");

  return NextResponse.json<BaseResponse<Comment[]>>({
    success: true,
    data: comments,
  });
}

export async function POST(request: NextRequest) {
  const comment = commentSchema.parse(await request.json());

  await Comment.create({
    text: comment.text,
    cat: comment.catId,
    user: request.headers.get("userId"),
  });

  return NextResponse.json<BaseResponse>({
    success: true,
    message: "Comment created",
  });
}
