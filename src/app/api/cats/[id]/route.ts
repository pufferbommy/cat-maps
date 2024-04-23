import { NextRequest } from "next/server";

import { connectDatabase, disconnectDatabase } from "@/lib/database";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  const searchParams = request.nextUrl.searchParams;
  const rating = searchParams.get("rating");

  console.log({ id, rating });

  await connectDatabase();

  await disconnectDatabase();
}
