import { NextRequest } from "next/server";

import { connectDatabase } from "@/lib/database";

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

  console.log({ id });

  await connectDatabase();

  // return boolean of latest value to update at client
}
