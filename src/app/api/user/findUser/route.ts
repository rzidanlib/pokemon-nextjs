import { findNearbyUser } from "@/lib/mongodb/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await findNearbyUser(req);
  return NextResponse.json(
    { status: res.status, message: res.message, data: res },
    { status: res.statusCode }
  );
}
