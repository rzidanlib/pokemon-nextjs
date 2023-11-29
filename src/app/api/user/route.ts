import { getUser } from "@/lib/mongodb/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (userId) {
    const user = await getUser(userId);
    if (user) {
      return NextResponse.json({
        status: 200,
        message: "success",
        data: user,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "not found",
      data: {},
    });
  }
}
